"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Spinner } from "@/components/ui/spinner"
import { CheckCircle, Clock, IndianRupee } from "lucide-react"

interface Donation {
  id: string
  donorName: string
  donorEmail: string
  donorPhone?: string
  amount: number
  method: "UPI" | "Bank"
  status: "pending" | "confirmed"
  transactionRef?: string
  createdAt: string
  confirmedAt?: string
}

interface DonationTableProps {
  donations: Donation[]
}

export function DonationTable({ donations }: DonationTableProps) {
  const router = useRouter()
  const [confirmingId, setConfirmingId] = useState<string | null>(null)
  const [isConfirming, setIsConfirming] = useState(false)

  const handleConfirm = async () => {
    if (!confirmingId) return

    setIsConfirming(true)
    try {
      const response = await fetch(`/api/donations/${confirmingId}/confirm`, {
        method: "POST",
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to confirm donation")
      }

      const data = await response.json()
      toast.success("Donation confirmed!", {
        description: `Receipt ${data.receipt.receiptNumber} generated`,
      })
      router.refresh()
    } catch (error) {
      toast.error("Failed to confirm donation", {
        description:
          error instanceof Error ? error.message : "Please try again",
      })
    } finally {
      setIsConfirming(false)
      setConfirmingId(null)
    }
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Donor</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Transaction Ref</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {donations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <p className="text-muted-foreground">No donations found</p>
                </TableCell>
              </TableRow>
            ) : (
              donations.map((donation) => (
                <TableRow key={donation.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{donation.donorName}</p>
                      <p className="text-sm text-muted-foreground">
                        {donation.donorEmail}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1 font-semibold">
                      <IndianRupee className="size-3" />
                      {donation.amount.toLocaleString("en-IN")}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{donation.method}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-mono">
                      {donation.transactionRef || "-"}
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Date(donation.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        donation.status === "confirmed" ? "default" : "secondary"
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
                  </TableCell>
                  <TableCell className="text-right">
                    {donation.status === "pending" && (
                      <Button
                        size="sm"
                        onClick={() => setConfirmingId(donation.id)}
                      >
                        Confirm
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog
        open={!!confirmingId}
        onOpenChange={() => !isConfirming && setConfirmingId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Donation</AlertDialogTitle>
            <AlertDialogDescription>
              This will mark the donation as confirmed and generate a receipt.
              Make sure you have verified the payment before confirming.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isConfirming}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm} disabled={isConfirming}>
              {isConfirming ? (
                <>
                  <Spinner className="size-4 mr-2" />
                  Confirming...
                </>
              ) : (
                "Confirm Donation"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
