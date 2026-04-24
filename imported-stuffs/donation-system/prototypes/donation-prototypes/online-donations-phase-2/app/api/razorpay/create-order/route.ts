import { NextRequest, NextResponse } from "next/server"
import { createOrder, isRazorpayConfigured, getRazorpayKeyId } from "@/lib/razorpay"
import { connectToDatabase } from "@/lib/db"
import { Donation } from "@/lib/models/donation"
import { auth } from "@/lib/auth"
import { z } from "zod"

const orderSchema = z.object({
  amount: z.number().min(1, "Amount must be at least 1"),
  donorName: z.string().min(2),
  donorEmail: z.string().email(),
  donorPhone: z.string().optional(),
  donorAddress: z.string().optional(),
  donorPAN: z.string().optional(),
  isPublic: z.boolean().default(false),
  message: z.string().optional(),
  purpose: z.string().optional(),
  membershipId: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const validatedData = orderSchema.parse(body)

    // Check if Razorpay is configured
    if (!isRazorpayConfigured()) {
      // In development, create a mock order
      console.log('[Razorpay] Creating mock order for development')
    }

    await connectToDatabase()

    // Get user session if logged in
    const session = await auth()

    // Create a pending donation record first
    const donation = await Donation.create({
      userId: session?.user?.id,
      donorName: validatedData.donorName,
      donorEmail: validatedData.donorEmail,
      donorPhone: validatedData.donorPhone,
      donorAddress: validatedData.donorAddress,
      donorPAN: validatedData.donorPAN,
      amount: validatedData.amount,
      currency: "INR",
      method: "pending", // Will be updated after payment
      paymentMethod: "razorpay",
      status: "pending",
      isPublic: validatedData.isPublic,
      message: validatedData.message,
      purpose: validatedData.purpose || "General Donation",
    })

    // Create Razorpay order
    const order = await createOrder({
      amount: validatedData.amount * 100, // Convert to paise
      currency: "INR",
      receipt: `donation_${donation._id}`,
      notes: {
        donationId: donation._id.toString(),
        donorName: validatedData.donorName,
        donorEmail: validatedData.donorEmail,
      },
    })

    if (!order) {
      return NextResponse.json(
        { error: "Failed to create payment order" },
        { status: 500 }
      )
    }

    // Store Razorpay order ID in donation
    donation.transactionRef = order.id
    await donation.save()

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      donationId: donation._id.toString(),
      keyId: getRazorpayKeyId() || "rzp_test_placeholder",
      prefill: {
        name: validatedData.donorName,
        email: validatedData.donorEmail,
        contact: validatedData.donorPhone,
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error("[Razorpay] Create order error:", error)
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    )
  }
}
