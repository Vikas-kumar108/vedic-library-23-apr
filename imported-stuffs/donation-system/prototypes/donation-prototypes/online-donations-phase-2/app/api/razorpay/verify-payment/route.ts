import { NextRequest, NextResponse } from "next/server"
import { verifyPaymentSignature, fetchPayment } from "@/lib/razorpay"
import { connectToDatabase } from "@/lib/db"
import { Donation } from "@/lib/models/donation"
import { Receipt, generateReceiptNumber } from "@/lib/models"
import { generateReceipt } from "@/lib/pdf"
import { sendReceiptEmail } from "@/lib/email"
import { sendReceiptSMS } from "@/lib/sms"
import { z } from "zod"

const verifySchema = z.object({
  razorpay_order_id: z.string(),
  razorpay_payment_id: z.string(),
  razorpay_signature: z.string(),
  donationId: z.string(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, donationId } = 
      verifySchema.parse(body)

    // Verify signature
    const isValid = verifyPaymentSignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    )

    if (!isValid) {
      return NextResponse.json(
        { error: "Payment verification failed" },
        { status: 400 }
      )
    }

    await connectToDatabase()

    // Update donation status
    const donation = await Donation.findById(donationId)
    
    if (!donation) {
      return NextResponse.json(
        { error: "Donation not found" },
        { status: 404 }
      )
    }

    // Fetch payment details from Razorpay
    const paymentDetails = await fetchPayment(razorpay_payment_id)
    
    // Update donation
    donation.status = "confirmed"
    donation.confirmedAt = new Date()
    donation.transactionRef = razorpay_payment_id
    donation.method = paymentDetails?.method || "UPI"
    await donation.save()

    // Generate receipt
    const receiptNumber = await generateReceiptNumber()
    
    const pdfBase64 = await generateReceipt({
      receiptNumber,
      donorName: donation.donorName,
      donorEmail: donation.donorEmail,
      donorAddress: donation.donorAddress,
      donorPAN: donation.donorPAN,
      amount: donation.amount,
      date: new Date(),
      transactionRef: razorpay_payment_id,
    })

    // Save receipt
    const receipt = await Receipt.create({
      donationId: donation._id,
      receiptNumber,
      issuedDate: new Date(),
      pdfBase64,
    })

    // Send confirmation email with receipt (non-blocking)
    sendReceiptEmail({
      email: donation.donorEmail,
      name: donation.donorName,
      amount: donation.amount,
      receiptNumber,
      pdfBase64,
    }).catch((err) => console.error("Receipt email failed:", err))

    // Send SMS if phone provided
    if (donation.donorPhone) {
      sendReceiptSMS(
        donation.donorPhone,
        donation.donorName,
        donation.amount,
        receiptNumber
      ).catch((err) => console.error("Receipt SMS failed:", err))
    }

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
      donation: {
        id: donation._id.toString(),
        amount: donation.amount,
        status: donation.status,
        receiptNumber,
      },
      receiptId: receipt._id.toString(),
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error("[Razorpay] Verify payment error:", error)
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 500 }
    )
  }
}
