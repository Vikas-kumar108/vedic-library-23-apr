import { Metadata } from "next"
import Link from "next/link"
import { auth } from "@/lib/auth"
import { connectToDatabase } from "@/lib/db"
import { Donation } from "@/lib/models/donation"
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
  Heart,
  Clock,
  CheckCircle,
  ArrowRight,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "View your donation history and manage your account",
}

async function getUserDonations(userId: string) {
  await connectToDatabase()

  const donations = await Donation.find({ userId })
    .sort({ createdAt: -1 })
    .limit(10)
    .lean()

  const totalConfirmed = await Donation.aggregate([
    { $match: { userId, status: "confirmed" } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ])

  const pendingCount = await Donation.countDocuments({
    userId,
    status: "pending",
  })

  const confirmedCount = await Donation.countDocuments({
    userId,
    status: "confirmed",
  })

  return {
    donations: donations.map((d) => ({
      id: d._id.toString(),
      amount: d.amount,
      method: d.method,
      status: d.status,
      createdAt: d.createdAt,
      confirmedAt: d.confirmedAt,
    })),
    totalAmount: totalConfirmed[0]?.total || 0,
    pendingCount,
    confirmedCount,
  }
}

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user?.id) {
    return null
  }

  const { donations, totalAmount, pendingCount, confirmedCount } =
    await getUserDonations(session.user.id)

  const stats = [
    {
      title: "Total Contributions",
      value: `₹${totalAmount.toLocaleString("en-IN")}`,
      description: "Confirmed donations",
      icon: IndianRupee,
    },
    {
      title: "Total Donations",
      value: confirmedCount + pendingCount,
      description: "All time",
      icon: Heart,
    },
    {
      title: "Pending",
      value: pendingCount,
      description: "Awaiting confirmation",
      icon: Clock,
    },
    {
      title: "Confirmed",
      value: confirmedCount,
      description: "Successfully verified",
      icon: CheckCircle,
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome, {session.user.name}</h1>
        <p className="text-muted-foreground mt-1">
          Thank you for supporting Vedic knowledge preservation
        </p>
      </div>

      <StatsCards stats={stats} />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Donations</CardTitle>
              <CardDescription>Your latest contribution history</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/donate">
                Make Donation
                <ArrowRight className="size-4 ml-2" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {donations.length === 0 ? (
              <div className="text-center py-8">
                <Heart className="size-12 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">No donations yet</p>
                <Button className="mt-4" asChild>
                  <Link href="/donate">Make Your First Donation</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {donations.map((donation) => (
                  <div
                    key={donation.id}
                    className="flex items-center justify-between p-4 rounded-lg border bg-card"
                  >
                    <div className="flex items-center gap-4">
                      <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <IndianRupee className="size-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">
                          ₹{donation.amount.toLocaleString("en-IN")}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {donation.method} •{" "}
                          {new Date(donation.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        donation.status === "confirmed"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {donation.status === "confirmed" ? (
                        <>
                          <CheckCircle className="size-3 mr-1" />
                          Confirmed
                        </>
                      ) : (
                        <>
                          <Clock className="size-3 mr-1" />
                          Pending
                        </>
                      )}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/donate">
                <Heart className="size-4 mr-2" />
                Make a Donation
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/dashboard/receipts">
                <CheckCircle className="size-4 mr-2" />
                View Receipts
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
