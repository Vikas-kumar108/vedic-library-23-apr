import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import { Donation } from "@/lib/models/donation"
import { Receipt } from "@/lib/models/receipt"
import { generateReceiptNumber } from "@/lib/models/counter"
import { auth } from "@/lib/auth"
import { generateReceiptPDF } from "@/lib/pdf"
import { sendReceiptEmail } from "@/lib/email"
import { sendReceiptSMS } from "@/lib/sms"

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

    // Generate receipt number
    const receiptNumber = await generateReceiptNumber()

    // Generate PDF receipt
    const pdfBase64 = await generateReceiptPDF({
      receiptNumber,
      donorName: donation.donorName,
      donorEmail: donation.donorEmail,
      donorPhone: donation.donorPhone,
      donorAddress: donation.donorAddress,
      donorPAN: donation.donorPAN,
      amount: donation.amount,
      donationDate: donation.createdAt,
      confirmationDate: new Date(),
      paymentMethod: donation.method,
      transactionRef: donation.transactionRef,
    })

    // Save receipt record
    const receipt = await Receipt.create({
      donationId: donation._id,
      receiptNumber,
      issuedDate: new Date(),
      pdfBase64, // Store PDF for later download
    })

    // Send receipt email with PDF attachment (non-blocking)
    sendReceiptEmail({
      email: donation.donorEmail,
      name: donation.donorName,
      amount: donation.amount,
      receiptNumber,
      pdfBase64,
    }).catch((err) => console.error("Receipt email send failed:", err))

    // Send receipt SMS if phone provided (non-blocking)
    if (donation.donorPhone) {
      sendReceiptSMS(
        donation.donorPhone,
        donation.donorName,
        donation.amount,
        receiptNumber
      ).catch((err) => console.error("Receipt SMS send failed:", err))
    }

    return NextResponse.json({
      message: "Donation confirmed successfully. Receipt has been sent to the donor.",
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
