import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import { User, USER_ROLES } from "@/lib/models/user"
import bcrypt from "bcryptjs"

// Temporary endpoint to create super admin
// Should be removed or secured after initial setup
export async function POST() {
  try {
    await connectToDatabase()

    // Check if super admin already exists
    const existingAdmin = await User.findOne({ role: USER_ROLES.SUPER_ADMIN })
    if (existingAdmin) {
      return NextResponse.json(
        { 
          message: "Super admin already exists",
          email: existingAdmin.email,
        },
        { status: 200 }
      )
    }

    // Create super admin with a temporary password
    const tempPassword = "admin123"
    const hashedPassword = await bcrypt.hash(tempPassword, 12)
    
    const admin = await User.create({
      name: "Super Admin",
      email: "admin@vedicskills.org",
      password: hashedPassword,
      role: USER_ROLES.SUPER_ADMIN,
      isMember: false,
    })

    return NextResponse.json(
      {
        message: "Super admin created successfully",
        email: admin.email,
        tempPassword: tempPassword,
        warning: "Please change this password immediately!",
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Seed admin error:", error)
    return NextResponse.json(
      { error: "Failed to create admin" },
      { status: 500 }
    )
  }
}

// GET method to check admin status
export async function GET() {
  try {
    await connectToDatabase()
    
    const adminCount = await User.countDocuments({ 
      role: { $in: [USER_ROLES.SUPER_ADMIN, USER_ROLES.DIRECTOR] } 
    })
    
    return NextResponse.json({
      hasAdmin: adminCount > 0,
      adminCount,
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Database error" },
      { status: 500 }
    )
  }
}
