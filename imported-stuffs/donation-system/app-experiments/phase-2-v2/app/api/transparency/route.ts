import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import { Donation } from "@/lib/models/donation"

export async function GET() {
  try {
    await connectToDatabase()

    // Get confirmed donations only for transparency
    const confirmedDonations = await Donation.find({ status: "confirmed" })
      .select("donorName amount createdAt isPublic message")
      .sort({ createdAt: -1 })
      .lean()

    // Calculate total stats
    const totalDonations = confirmedDonations.length
    const totalAmount = confirmedDonations.reduce((sum, d) => sum + d.amount, 0)

    // Get unique donors count
    const uniqueEmails = await Donation.distinct("donorEmail", {
      status: "confirmed",
    })
    const totalDonors = uniqueEmails.length

    // Get recent public donations (last 10)
    const recentDonations = confirmedDonations
      .filter((d) => d.isPublic)
      .slice(0, 10)
      .map((d) => ({
        name: d.donorName,
        amount: d.amount,
        date: d.createdAt,
        message: d.message,
      }))

    // Calculate monthly stats (last 6 months)
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const monthlyAggregation = await Donation.aggregate([
      {
        $match: {
          status: "confirmed",
          createdAt: { $gte: sixMonthsAgo },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          amount: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ])

    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ]

    const monthlyStats = monthlyAggregation.map((m) => ({
      month: `${monthNames[m._id.month - 1]} ${m._id.year}`,
      amount: m.amount,
      count: m.count,
    }))

    return NextResponse.json({
      totalDonations,
      totalAmount,
      totalDonors,
      recentDonations,
      monthlyStats,
    })
  } catch (error) {
    console.error("Transparency data error:", error)
    return NextResponse.json(
      { error: "Failed to fetch transparency data" },
      { status: 500 }
    )
  }
}
