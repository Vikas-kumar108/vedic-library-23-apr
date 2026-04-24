import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import { Donation } from "@/lib/models/donation"
import { auth } from "@/lib/auth"

export async function GET() {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()

    // Get monthly trends (last 12 months)
    const twelveMonthsAgo = new Date()
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12)

    const monthlyAggregation = await Donation.aggregate([
      {
        $match: {
          status: "confirmed",
          createdAt: { $gte: twelveMonthsAgo },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          donations: { $sum: 1 },
          amount: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ])

    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ]

    const monthlyTrends = monthlyAggregation.map((m) => ({
      month: `${monthNames[m._id.month - 1]} ${m._id.year}`,
      donations: m.donations,
      amount: Math.round(m.amount / 1000), // Convert to thousands
    }))

    // Payment methods distribution
    const paymentMethods = await Donation.aggregate([
      { $match: { status: "confirmed" } },
      {
        $group: {
          _id: "$method",
          count: { $sum: 1 },
          amount: { $sum: "$amount" },
        },
      },
    ])

    const paymentMethodsData = paymentMethods.map((m) => ({
      method: m._id || "Unknown",
      count: m.count,
      amount: m.amount,
    }))

    // Donation size distribution
    const donationSizes = await Donation.aggregate([
      { $match: { status: "confirmed" } },
      {
        $bucket: {
          groupBy: "$amount",
          boundaries: [0, 100, 500, 1000, 5000, 10000, 50000, 100000],
          default: "100000+",
          output: {
            count: { $sum: 1 },
          },
        },
      },
    ])

    const sizeRanges: Record<string, string> = {
      "0": "₹0-100",
      "100": "₹100-500",
      "500": "₹500-1K",
      "1000": "₹1K-5K",
      "5000": "₹5K-10K",
      "10000": "₹10K-50K",
      "50000": "₹50K-1L",
      "100000+": "₹1L+",
    }

    const donationSizesData = donationSizes.map((s) => ({
      range: sizeRanges[s._id.toString()] || s._id.toString(),
      count: s.count,
    }))

    // Conversion rate
    const [pendingCount, confirmedCount] = await Promise.all([
      Donation.countDocuments({ status: "pending" }),
      Donation.countDocuments({ status: "confirmed" }),
    ])

    const totalSubmissions = pendingCount + confirmedCount
    const conversionRate =
      totalSubmissions > 0 ? (confirmedCount / totalSubmissions) * 100 : 0

    // Average donation
    const avgResult = await Donation.aggregate([
      { $match: { status: "confirmed" } },
      { $group: { _id: null, avg: { $avg: "$amount" } } },
    ])

    const averageDonation = avgResult[0]?.avg || 0

    // Growth rate (this month vs last month)
    const now = new Date()
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0)

    const [thisMonthTotal, lastMonthTotal] = await Promise.all([
      Donation.aggregate([
        {
          $match: {
            status: "confirmed",
            createdAt: { $gte: thisMonthStart },
          },
        },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      Donation.aggregate([
        {
          $match: {
            status: "confirmed",
            createdAt: { $gte: lastMonthStart, $lte: lastMonthEnd },
          },
        },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
    ])

    const thisMonth = thisMonthTotal[0]?.total || 0
    const lastMonth = lastMonthTotal[0]?.total || 0
    const growthRate =
      lastMonth > 0 ? ((thisMonth - lastMonth) / lastMonth) * 100 : 0

    // Top donors
    const topDonors = await Donation.aggregate([
      { $match: { status: "confirmed" } },
      {
        $group: {
          _id: "$donorEmail",
          name: { $first: "$donorName" },
          email: { $first: "$donorEmail" },
          totalAmount: { $sum: "$amount" },
          donationCount: { $sum: 1 },
        },
      },
      { $sort: { totalAmount: -1 } },
      { $limit: 10 },
    ])

    const topDonorsData = topDonors.map((d) => ({
      name: d.name,
      email: d.email,
      totalAmount: d.totalAmount,
      donationCount: d.donationCount,
    }))

    return NextResponse.json({
      monthlyTrends,
      paymentMethods: paymentMethodsData,
      donationSizes: donationSizesData,
      conversionRate,
      averageDonation: Math.round(averageDonation),
      growthRate,
      topDonors: topDonorsData,
    })
  } catch (error) {
    console.error("Analytics error:", error)
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    )
  }
}
