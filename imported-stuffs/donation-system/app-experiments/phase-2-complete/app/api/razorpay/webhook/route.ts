import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { connectToDatabase } from "@/lib/db"
import { Donation } from "@/lib/models/donation"

const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET

// Verify webhook signature
function verifyWebhookSignature(body: string, signature: string): boolean {
  if (!RAZORPAY_WEBHOOK_SECRET) {
    console.log("[Razorpay Webhook] No webhook secret configured")
    return true // Allow in development
  }

  const expectedSignature = crypto
    .createHmac("sha256", RAZORPAY_WEBHOOK_SECRET)
    .update(body)
    .digest("hex")

  return expectedSignature === signature
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const signature = req.headers.get("x-razorpay-signature") || ""

    // Verify signature
    if (!verifyWebhookSignature(body, signature)) {
      console.error("[Razorpay Webhook] Invalid signature")
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    const event = JSON.parse(body)
    const eventType = event.event

    console.log(`[Razorpay Webhook] Received event: ${eventType}`)

    await connectToDatabase()

    switch (eventType) {
      case "payment.captured": {
        // Payment was successful
        const payment = event.payload.payment.entity
        const orderId = payment.order_id
        const paymentId = payment.id

        // Find and update donation
        const donation = await Donation.findOne({ transactionRef: orderId })
        if (donation && donation.status === "pending") {
          donation.status = "confirmed"
          donation.confirmedAt = new Date()
          donation.transactionRef = paymentId
          donation.method = payment.method || "UPI"
          await donation.save()
          console.log(`[Razorpay Webhook] Donation ${donation._id} confirmed via webhook`)
        }
        break
      }

      case "payment.failed": {
        // Payment failed
        const payment = event.payload.payment.entity
        const orderId = payment.order_id

        const donation = await Donation.findOne({ transactionRef: orderId })
        if (donation && donation.status === "pending") {
          donation.status = "rejected"
          await donation.save()
          console.log(`[Razorpay Webhook] Donation ${donation._id} marked as failed`)
        }
        break
      }

      case "subscription.activated": {
        // Subscription started
        const subscription = event.payload.subscription.entity
        console.log(`[Razorpay Webhook] Subscription activated: ${subscription.id}`)
        // TODO: Update membership status
        break
      }

      case "subscription.charged": {
        // Recurring payment received
        const subscription = event.payload.subscription.entity
        const payment = event.payload.payment.entity
        console.log(`[Razorpay Webhook] Subscription charged: ${subscription.id}, payment: ${payment.id}`)
        // TODO: Create recurring donation record
        break
      }

      case "subscription.cancelled": {
        // Subscription cancelled
        const subscription = event.payload.subscription.entity
        console.log(`[Razorpay Webhook] Subscription cancelled: ${subscription.id}`)
        // TODO: Update membership status
        break
      }

      case "refund.created": {
        // Refund initiated
        const refund = event.payload.refund.entity
        console.log(`[Razorpay Webhook] Refund created: ${refund.id}`)
        break
      }

      default:
        console.log(`[Razorpay Webhook] Unhandled event type: ${eventType}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("[Razorpay Webhook] Error:", error)
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    )
  }
}
