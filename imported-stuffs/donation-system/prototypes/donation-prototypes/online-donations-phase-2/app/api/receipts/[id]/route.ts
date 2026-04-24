import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import { Receipt } from "@/lib/models/receipt"
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

    const receipt = await Receipt.findById(id)

    if (!receipt) {
      return NextResponse.json({ error: "Receipt not found" }, { status: 404 })
    }

    // Check if user has access (admin or donation owner)
    if (session.user.role !== "admin") {
      const donation = await Donation.findById(receipt.donationId)
      if (!donation || donation.userId?.toString() !== session.user.id) {
        return NextResponse.json({ error: "Access denied" }, { status: 403 })
      }
    }

    if (!receipt.pdfBase64) {
      return NextResponse.json(
        { error: "Receipt PDF not available" },
        { status: 404 }
      )
    }

    // Return PDF as base64 data
    return NextResponse.json({
      receiptNumber: receipt.receiptNumber,
      pdfBase64: receipt.pdfBase64,
      issuedDate: receipt.issuedDate,
    })
  } catch (error) {
    console.error("Fetch receipt error:", error)
    return NextResponse.json(
      { error: "Failed to fetch receipt" },
      { status: 500 }
    )
  }
}

// Download receipt as PDF file
export async function HEAD(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()

    if (!session?.user) {
      return new NextResponse(null, { status: 401 })
    }

    const { id } = await params

    await connectToDatabase()

    const receipt = await Receipt.findById(id)

    if (!receipt || !receipt.pdfBase64) {
      return new NextResponse(null, { status: 404 })
    }

    return new NextResponse(null, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Receipt-${receipt.receiptNumber}.pdf"`,
      },
    })
  } catch (error) {
    console.error("Receipt HEAD error:", error)
    return new NextResponse(null, { status: 500 })
  }
}
