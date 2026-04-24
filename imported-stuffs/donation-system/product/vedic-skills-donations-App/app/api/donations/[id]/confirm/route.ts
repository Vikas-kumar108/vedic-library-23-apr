import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import { Donation } from "@/lib/models/donation"
import { Receipt } from "@/lib/models/receipt"
import { generateReceiptNumber } from "@/lib/models/counter"
import { auth } from "@/lib/auth"

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (session.user.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const { id } = await params

    await connectToDatabase()

    const donation = await Donation.findById(id)

    if (!donation) {
      return NextResponse.json({ error: "Donation not found" }, { status: 404 })
    }

    if (donation.status === "confirmed") {
      return NextResponse.json(
        { error: "Donation already confirmed" },
        { status: 400 }
      )
    }

    // Update donation status
    donation.status = "confirmed"
    donation.confirmedAt = new Date()
    await donation.save()

    // Generate receipt
    const receiptNumber = await generateReceiptNumber()
    const receipt = await Receipt.create({
      donationId: donation._id,
      receiptNumber,
      issuedDate: new Date(),
    })

    return NextResponse.json({
      message: "Donation confirmed successfully",
      donation: {
        id: donation._id.toString(),
        status: donation.status,
        confirmedAt: donation.confirmedAt,
      },
      receipt: {
        id: receipt._id.toString(),
        receiptNumber: receipt.receiptNumber,
      },
    })
  } catch (error) {
    console.error("Confirm donation error:", error)
    return NextResponse.json(
      { error: "Failed to confirm donation" },
      { status: 500 }
    )
  }
}
