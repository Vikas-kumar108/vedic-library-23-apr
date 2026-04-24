import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import { Donation } from "@/lib/models/donation"
import { User } from "@/lib/models/user"
import { auth } from "@/lib/auth"

export async function GET() {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (session.user.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    await connectToDatabase()

    // Get current month's start date
    const now = new Date()
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)

    // Aggregate stats in parallel
    const [
      totalConfirmedAmount,
      totalPendingAmount,
      pendingCount,
      confirmedCount,
      totalUsers,
      thisMonthAmount,
      recentDonations,
    ] = await Promise.all([
      // Total confirmed donations amount
      Donation.aggregate([
        { $match: { status: "confirmed" } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      // Total pending donations amount
      Donation.aggregate([
        { $match: { status: "pending" } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      // Pending donations count
      Donation.countDocuments({ status: "pending" }),
      // Confirmed donations count
      Donation.countDocuments({ status: "confirmed" }),
      // Total users count
      User.countDocuments(),
      // This month's confirmed amount
      Donation.aggregate([
        { 
          $match: { 
            status: "confirmed",
            confirmedAt: { $gte: monthStart }
          } 
        },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      // Recent donations
      Donation.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .lean(),
    ])

    return NextResponse.json({
      stats: {
        totalConfirmedAmount: totalConfirmedAmount[0]?.total || 0,
        totalPendingAmount: totalPendingAmount[0]?.total || 0,
        pendingCount,
        confirmedCount,
        totalDonations: pendingCount + confirmedCount,
        totalUsers,
        thisMonthAmount: thisMonthAmount[0]?.total || 0,
      },
      recentDonations: recentDonations.map((d) => ({
        id: d._id.toString(),
        donorName: d.donorName,
        amount: d.amount,
        status: d.status,
        method: d.method,
        createdAt: d.createdAt,
      })),
    })
  } catch (error) {
    console.error("Fetch admin stats error:", error)
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    )
  }
}
