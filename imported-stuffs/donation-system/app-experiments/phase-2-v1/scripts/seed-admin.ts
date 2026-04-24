/**
 * Script to create a super admin user
 * Run with: npx ts-node scripts/seed-admin.ts
 * Or via API: POST /api/admin/seed (temporary endpoint)
 */

import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const MONGODB_URI = process.env.MONGODB_URI

async function seedAdmin() {
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is not set")
    process.exit(1)
  }

  try {
    await mongoose.connect(MONGODB_URI)
    console.log("Connected to MongoDB")

    const UserSchema = new mongoose.Schema({
      name: String,
      email: { type: String, unique: true },
      phone: String,
      password: String,
      role: String,
      isMember: Boolean,
    }, { timestamps: true })

    const User = mongoose.models.User || mongoose.model("User", UserSchema)

    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: "super_admin" })
    if (existingAdmin) {
      console.log("Super admin already exists:", existingAdmin.email)
      await mongoose.disconnect()
      return
    }

    // Create super admin
    const hashedPassword = await bcrypt.hash("admin123", 12)
    const admin = await User.create({
      name: "Super Admin",
      email: "admin@vedicskills.org",
      password: hashedPassword,
      role: "super_admin",
      isMember: false,
    })

    console.log("Super admin created successfully!")
    console.log("Email: admin@vedicskills.org")
    console.log("Password: admin123")
    console.log("Role: super_admin")
    console.log("Please change the password after first login.")

    await mongoose.disconnect()
  } catch (error) {
    console.error("Error seeding admin:", error)
    process.exit(1)
  }
}

seedAdmin()
