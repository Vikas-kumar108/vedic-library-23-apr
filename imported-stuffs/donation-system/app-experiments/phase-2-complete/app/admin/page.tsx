import { Metadata } from "next"
import Link from "next/link"
import { connectToDatabase } from "@/lib/db"
import { Donation } from "@/lib/models/donation"
import { User } from "@/lib/models/user"
import { StatsCards } from "@/components/stats-cards"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  IndianRupee,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Manage donations and users",
}

async function getAdminStats() {
  await connectToDatabase()

  const [
    totalConfirmed,
    totalPending,
    pendingCount,
    confirmedCount,
    userCount,
    recentDonations,
  ] = await Promise.all([
    Donation.aggregate([
      { $match: { status: "confirmed" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]),
    Donation.aggregate([
      { $match: { status: "pending" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]),
    Donation.countDocuments({ status: "pending" }),
    Donation.countDocuments({ status: "confirmed" }),
    User.countDocuments(),
    Donation.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .lean(),
  ])

  return {
    totalConfirmed: totalConfirmed[0]?.total || 0,
    totalPending: totalPending[0]?.total || 0,
    pendingCount,
    confirmedCount,
    userCount,
    recentDonations: recentDonations.map((d) => ({
      id: d._id.toString(),
      donorName: d.donorName,
      donorEmail: d.donorEmail,
      amount: d.amount,
      method: d.method,
      status: d.status,
      createdAt: d.createdAt,
    })),
  }
}

export default async function AdminDashboardPage() {
  const stats = await getAdminStats()

  const statCards = [
    {
      title: "Total Confirmed",
      value: `₹${stats.totalConfirmed.toLocaleString("en-IN")}`,
      description: `${stats.confirmedCount} donations`,
      icon: CheckCircle,
    },
    {
      title: "Pending Amount",
      value: `₹${stats.totalPending.toLocaleString("en-IN")}`,
      description: `${stats.pendingCount} awaiting confirmation`,
      icon: Clock,
    },
    {
      title: "Total Users",
      value: stats.userCount,
      description: "Registered accounts",
      icon: Users,
    },
    {
      title: "Total Donations",
      value: stats.confirmedCount + stats.pendingCount,
      description: "All time",
      icon: IndianRupee,
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of donations and platform activity
        </p>
      </div>

      <StatsCards stats={statCards} />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Donations</CardTitle>
              <CardDescription>Latest donation submissions</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/donations">
                View All
                <ArrowRight className="size-4 ml-2" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentDonations.map((donation) => (
                <div
                  key={donation.id}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div>
                    <p className="font-medium">{donation.donorName}</p>
                    <p className="text-sm text-muted-foreground">
                      {donation.donorEmail}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      ₹{donation.amount.toLocaleString("en-IN")}
                    </p>
                    <Badge
                      variant={
                        donation.status === "confirmed"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {donation.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common admin tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/admin/donations?status=pending">
                <Clock className="size-4 mr-2" />
                Review Pending Donations ({stats.pendingCount})
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/admin/users">
                <Users className="size-4 mr-2" />
                Manage Users
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
