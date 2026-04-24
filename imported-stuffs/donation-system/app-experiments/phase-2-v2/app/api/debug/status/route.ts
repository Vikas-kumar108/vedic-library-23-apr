import { NextResponse } from "next/server"

// Debug endpoint to check configuration status
// Remove in production
export async function GET() {
  return NextResponse.json({
    timestamp: new Date().toISOString(),
    environment: {
      mongodb: !!process.env.MONGODB_URI,
      resend: !!process.env.RESEND_API_KEY,
      msg91: !!process.env.MSG91_AUTH_KEY,
      razorpay: !!process.env.RAZORPAY_KEY_ID,
      nextauth: !!process.env.NEXTAUTH_SECRET,
      blob: !!process.env.BLOB_READ_WRITE_TOKEN,
    },
    configured: {
      email: !!process.env.RESEND_API_KEY ? "Ready" : "Not configured - emails will be skipped",
      sms: !!process.env.MSG91_AUTH_KEY ? "Ready" : "Not configured - SMS will be skipped",
      payments: !!process.env.RAZORPAY_KEY_ID ? "Ready" : "Test mode - mock payments",
      database: !!process.env.MONGODB_URI ? "Ready" : "Not configured",
    },
  })
}
