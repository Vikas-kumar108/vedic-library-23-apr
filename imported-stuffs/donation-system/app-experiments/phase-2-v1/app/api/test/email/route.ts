import { NextRequest, NextResponse } from "next/server"
import { sendDonationCreatedEmail, sendWelcomeEmail } from "@/lib/email"

// Test endpoint for email - remove in production
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { type, email, name } = body

    if (!email || !name) {
      return NextResponse.json(
        { error: "Email and name are required" },
        { status: 400 }
      )
    }

    let result

    switch (type) {
      case "welcome":
        result = await sendWelcomeEmail({ email, name })
        break
      case "donation":
        result = await sendDonationCreatedEmail({
          email,
          name,
          amount: 1000,
          donationId: "test_" + Date.now(),
        })
        break
      default:
        return NextResponse.json(
          { error: "Invalid email type. Use 'welcome' or 'donation'" },
          { status: 400 }
        )
    }

    return NextResponse.json({
      message: "Email test completed",
      result,
    })
  } catch (error) {
    console.error("Test email error:", error)
    return NextResponse.json(
      { error: "Email test failed", details: String(error) },
      { status: 500 }
    )
  }
}

// GET method with instructions
export async function GET() {
  return NextResponse.json({
    instructions: "POST to this endpoint with { type: 'welcome' | 'donation', email: 'your@email.com', name: 'Your Name' }",
    example: {
      type: "donation",
      email: "test@example.com",
      name: "Test User",
    },
  })
}
