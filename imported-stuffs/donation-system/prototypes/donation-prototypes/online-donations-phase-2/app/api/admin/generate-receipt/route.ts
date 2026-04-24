import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import { Donation } from "@/lib/models/donation"
import { Receipt } from "@/lib/models/receipt"
import { generateReceiptNumber } from "@/lib/models/counter"
import { auth } from "@/lib/auth"
import { generateReceiptPDF } from "@/lib/pdf"
import { sendReceiptEmail } from "@/lib/email"
import { sendReceiptSMS } from "@/lib/sms"
import { z } from "zod"

const generateReceiptSchema = z.object({
  donationId: z.string().min(1, "Donation ID is required"),
  sendNotification: z.boolean().default(true),
})

export async function POST(req: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (session.user.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const body = await req.json()
    const { donationId, sendNotification } = generateReceiptSchema.parse(body)

    await connectToDatabase()

    const donation = await Donation.findById(donationId)

    if (!donation) {
      return NextResponse.json({ error: "Donation not found" }, { status: 404 })
    }

    // Check if receipt already exists
    const existingReceipt = await Receipt.findOne({ donationId: donation._id })
    if (existingReceipt) {
      return NextResponse.json(
        { 
          error: "Receipt already exists",
          receipt: {
            id: existingReceipt._id.toString(),
            receiptNumber: existingReceipt.receiptNumber,
          }
        },
        { status: 400 }
      )
    }

    // Ensure donation is confirmed
    if (donation.status !== "confirmed") {
      donation.status = "confirmed"
      donation.confirmedAt = new Date()
      await donation.save()
    }

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
      pdfBase64,
    })

    // Send notifications if requested
    if (sendNotification) {
      // Send receipt email (non-blocking)
      sendReceiptEmail({
        email: donation.donorEmail,
        name: donation.donorName,
        amount: donation.amount,
        receiptNumber,
        pdfBase64,
      }).catch((err) => console.error("Receipt email send failed:", err))

      // Send SMS if phone provided (non-blocking)
      if (donation.donorPhone) {
        sendReceiptSMS(
          donation.donorPhone,
          donation.donorName,
          donation.amount,
          receiptNumber
        ).catch((err) => console.error("Receipt SMS send failed:", err))
      }
    }

    return NextResponse.json({
      message: "Receipt generated successfully",
      receipt: {
        id: receipt._id.toString(),
        receiptNumber: receipt.receiptNumber,
        issuedDate: receipt.issuedDate,
      },
      notificationsSent: sendNotification,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error("Generate receipt error:", error)
    return NextResponse.json(
      { error: "Failed to generate receipt" },
      { status: 500 }
    )
  }
}
