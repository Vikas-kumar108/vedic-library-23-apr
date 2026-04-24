import { Metadata } from "next"
import { auth } from "@/lib/auth"
import { connectToDatabase } from "@/lib/db"
import { Donation } from "@/lib/models/donation"
import { Receipt } from "@/lib/models/receipt"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Download, IndianRupee } from "lucide-react"

export const metadata: Metadata = {
  title: "Receipts",
  description: "Download your donation receipts",
}

async function getUserReceipts(userId: string) {
  await connectToDatabase()

  const confirmedDonations = await Donation.find({
    userId,
    status: "confirmed",
  })
    .sort({ confirmedAt: -1 })
    .lean()

  const receipts = await Receipt.find({
    donationId: { $in: confirmedDonations.map((d) => d._id) },
  }).lean()

  const receiptMap = new Map(
    receipts.map((r) => [r.donationId.toString(), r])
  )

  return confirmedDonations.map((d) => ({
    id: d._id.toString(),
    amount: d.amount,
    method: d.method,
    donorName: d.donorName,
    confirmedAt: d.confirmedAt,
    receipt: receiptMap.get(d._id.toString())
      ? {
          id: receiptMap.get(d._id.toString())!._id.toString(),
          receiptNumber: receiptMap.get(d._id.toString())!.receiptNumber,
          issuedDate: receiptMap.get(d._id.toString())!.issuedDate,
        }
      : null,
  }))
}

export default async function ReceiptsPage() {
  const session = await auth()

  if (!session?.user?.id) {
    return null
  }

  const donationsWithReceipts = await getUserReceipts(session.user.id)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Donation Receipts</h1>
        <p className="text-muted-foreground mt-1">
          Download receipts for your confirmed donations
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Receipts</CardTitle>
          <CardDescription>
            Receipts are generated once your donation is confirmed
          </CardDescription>
        </CardHeader>
        <CardContent>
          {donationsWithReceipts.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="size-12 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">No receipts available yet</p>
              <p className="text-sm text-muted-foreground mt-2">
                Receipts will appear here once your donations are confirmed
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {donationsWithReceipts.map((donation) => (
                <div
                  key={donation.id}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card"
                >
                  <div className="flex items-center gap-4">
                    <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <FileText className="size-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">
                          {donation.receipt?.receiptNumber || "Pending"}
                        </p>
                        {donation.receipt && (
                          <Badge variant="default">Available</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <IndianRupee className="size-3" />
                        {donation.amount.toLocaleString("en-IN")} •{" "}
                        {donation.confirmedAt &&
                          new Date(donation.confirmedAt).toLocaleDateString(
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
                  {donation.receipt && (
                    <Button variant="outline" size="sm">
                      <Download className="size-4 mr-2" />
                      Download
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
