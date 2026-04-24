import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import { Donation } from "@/lib/models/donation"
import { auth } from "@/lib/auth"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    await connectToDatabase()

    const donation = await Donation.findById(id).lean()

    if (!donation) {
      return NextResponse.json({ error: "Donation not found" }, { status: 404 })
    }

    // Check if user can access this donation
    if (
      session.user.role !== "admin" &&
      donation.userId?.toString() !== session.user.id
    ) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    return NextResponse.json({
      donation: {
        id: donation._id.toString(),
        donorName: donation.donorName,
        donorEmail: donation.donorEmail,
        donorPhone: donation.donorPhone,
        amount: donation.amount,
        method: donation.method,
        status: donation.status,
        transactionRef: donation.transactionRef,
        isPublic: donation.isPublic,
        message: donation.message,
        createdAt: donation.createdAt,
        confirmedAt: donation.confirmedAt,
      },
    })
  } catch (error) {
    console.error("Get donation error:", error)
    return NextResponse.json(
      { error: "Failed to fetch donation" },
      { status: 500 }
    )
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const { id } = await params
    const body = await req.json()

    await connectToDatabase()

    const donation = await Donation.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    ).lean()

    if (!donation) {
      return NextResponse.json({ error: "Donation not found" }, { status: 404 })
    }

    return NextResponse.json({
      message: "Donation updated successfully",
      donation: {
        id: donation._id.toString(),
        status: donation.status,
      },
    })
  } catch (error) {
    console.error("Update donation error:", error)
    return NextResponse.json(
      { error: "Failed to update donation" },
      { status: 500 }
    )
  }
}
