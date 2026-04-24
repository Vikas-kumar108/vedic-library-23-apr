import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import { Donation } from "@/lib/models/donation"
import { auth } from "@/lib/auth"
import { z } from "zod"
import { sendDonationCreatedEmail } from "@/lib/email"
import { sendDonationSMS } from "@/lib/sms"

const donationSchema = z.object({
  donorName: z.string().min(2, "Name must be at least 2 characters"),
  donorEmail: z.string().email("Invalid email address"),
  donorPhone: z.string().optional(),
  donorAddress: z.string().optional(),
  donorPAN: z.string().optional(),
  amount: z.number().min(1, "Amount must be at least 1"),
  method: z.enum(["UPI", "Bank"]),
  transactionRef: z.string().optional(),
  isPublic: z.boolean().default(false),
  message: z.string().max(500).optional(),
})

// Create a new donation
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const validatedData = donationSchema.parse(body)

    await connectToDatabase()

    // Check if user is logged in
    const session = await auth()

    const donation = await Donation.create({
      ...validatedData,
      userId: session?.user?.id,
      status: "pending",
    })

    const donationId = donation._id.toString()

    // Send confirmation email (non-blocking)
    sendDonationCreatedEmail({
      email: validatedData.donorEmail,
      name: validatedData.donorName,
      amount: validatedData.amount,
      donationId,
    }).catch((err) => console.error("Email send failed:", err))

    // Send SMS if phone provided (non-blocking)
    if (validatedData.donorPhone) {
      sendDonationSMS(
        validatedData.donorPhone,
        validatedData.donorName,
        validatedData.amount
      ).catch((err) => console.error("SMS send failed:", err))
    }

    return NextResponse.json(
      {
        message: "Donation recorded successfully. You will receive a confirmation email shortly.",
        donation: {
          id: donationId,
          amount: donation.amount,
          status: donation.status,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error("Donation creation error:", error)
    return NextResponse.json(
      { error: "Failed to record donation. Please try again." },
      { status: 500 }
    )
  }
}

// Get donations (admin only or user's own donations)
export async function GET(req: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()

    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status")
    const page = parseInt(searchParams.get("page") || "1", 10)
    const limit = parseInt(searchParams.get("limit") || "20", 10)

    const query: Record<string, unknown> = {}

    // If not admin, only show user's own donations
    if (session.user.role !== "admin") {
      query.userId = session.user.id
    }

    if (status) {
      query.status = status
    }

    const skip = (page - 1) * limit

    const [donations, total] = await Promise.all([
      Donation.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Donation.countDocuments(query),
    ])

    return NextResponse.json({
      donations: donations.map((d) => ({
        id: d._id.toString(),
        donorName: d.donorName,
        donorEmail: d.donorEmail,
        donorPhone: d.donorPhone,
        donorAddress: d.donorAddress,
        donorPAN: d.donorPAN,
        amount: d.amount,
        method: d.method,
        status: d.status,
        transactionRef: d.transactionRef,
        isPublic: d.isPublic,
        message: d.message,
        createdAt: d.createdAt,
        confirmedAt: d.confirmedAt,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Fetch donations error:", error)
    return NextResponse.json(
      { error: "Failed to fetch donations" },
      { status: 500 }
    )
  }
}
