import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import { User, USER_ROLES } from "@/lib/models/user"
import { sendWelcomeEmail } from "@/lib/email"
import { z } from "zod"

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export async function POST(req: NextRequest) {
  console.log("[v0] Register API called")
  
  try {
    let body
    try {
      body = await req.json()
      console.log("[v0] Request body parsed:", { name: body.name, email: body.email })
    } catch (parseError) {
      console.error("[v0] JSON parse error:", parseError)
      return NextResponse.json(
        { error: "Invalid request format" },
        { status: 400 }
      )
    }

    const validatedData = registerSchema.parse(body)
    console.log("[v0] Validation passed")

    // Connect to database
    try {
      await connectToDatabase()
      console.log("[v0] Database connected")
    } catch (dbError) {
      console.error("[v0] Database connection error:", dbError)
      return NextResponse.json(
        { error: "Database connection failed. Please check MONGODB_URI." },
        { status: 500 }
      )
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: validatedData.email })
    if (existingUser) {
      console.log("[v0] User already exists:", validatedData.email)
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      )
    }

    // Create new user with donor role by default
    const user = await User.create({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      password: validatedData.password,
      role: USER_ROLES.DONOR,
    })
    console.log("[v0] User created:", user._id.toString())

    // Send welcome email (non-blocking)
    sendWelcomeEmail({
      email: user.email,
      name: user.name,
    }).then((result) => {
      console.log("[v0] Welcome email result:", result)
    }).catch((error) => {
      console.error("[v0] Welcome email error:", error)
    })

    return NextResponse.json(
      {
        message: "Registration successful",
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("[v0] Registration error:", error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    // Handle MongoDB duplicate key error
    if ((error as any)?.code === 11000) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}
