import { Metadata } from "next"
import Link from "next/link"
import { connectToDatabase } from "@/lib/db"
import { Donation } from "@/lib/models/donation"
import { DonationTable } from "@/components/donation-table"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Manage Donations",
  description: "View and manage all donations",
}

interface PageProps {
  searchParams: Promise<{ status?: string; page?: string }>
}

async function getDonations(status?: string, page = 1) {
  await connectToDatabase()

  const query: Record<string, unknown> = {}
  if (status && (status === "pending" || status === "confirmed")) {
    query.status = status
  }

  const limit = 20
  const skip = (page - 1) * limit

  const [donations, total] = await Promise.all([
    Donation.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Donation.countDocuments(query),
  ])

  return {
    donations: donations.map((d) => ({
      id: d._id.toString(),
      donorName: d.donorName,
      donorEmail: d.donorEmail,
      donorPhone: d.donorPhone,
      amount: d.amount,
      method: d.method as "UPI" | "Bank",
      status: d.status as "pending" | "confirmed",
      transactionRef: d.transactionRef,
      createdAt: d.createdAt.toISOString(),
      confirmedAt: d.confirmedAt?.toISOString(),
    })),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  }
}

export default async function AdminDonationsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const status = params.status
  const page = parseInt(params.page || "1", 10)

  const { donations, pagination } = await getDonations(status, page)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Manage Donations</h1>
        <p className="text-muted-foreground mt-1">
          View and confirm donation submissions
        </p>
      </div>

      <div className="flex gap-2">
        <Button
          variant={!status ? "default" : "outline"}
          size="sm"
          asChild
        >
          <Link href="/admin/donations">All</Link>
        </Button>
        <Button
          variant={status === "pending" ? "default" : "outline"}
          size="sm"
          asChild
        >
          <Link href="/admin/donations?status=pending">Pending</Link>
        </Button>
        <Button
          variant={status === "confirmed" ? "default" : "outline"}
          size="sm"
          asChild
        >
          <Link href="/admin/donations?status=confirmed">Confirmed</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {status
              ? `${status.charAt(0).toUpperCase() + status.slice(1)} Donations`
              : "All Donations"}
          </CardTitle>
          <CardDescription>
            {pagination.total} donation{pagination.total !== 1 ? "s" : ""} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DonationTable donations={donations} />

          {pagination.totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <Button
                    key={pageNum}
                    variant={pageNum === page ? "default" : "outline"}
                    size="sm"
                    asChild
                  >
                    <Link
                      href={`/admin/donations?${status ? `status=${status}&` : ""}page=${pageNum}`}
                    >
                      {pageNum}
                    </Link>
                  </Button>
                )
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
