import mongoose, { Schema, Document, Model } from "mongoose"
import bcrypt from "bcryptjs"

// Role definitions with hierarchy
export const USER_ROLES = {
  DONOR: "donor",           // Individual donor - can view own donations
  AUDITOR: "auditor",       // Can view all donations (read-only)
  CSR_PARTNER: "csr_partner", // CSR partner - can view donations, add CSR donations
  CA: "ca",                 // Chartered Accountant - can view finances, generate reports
  DIRECTOR: "director",     // Director - full access except user management
  SUPER_ADMIN: "super_admin", // Super admin - full system access
} as const

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES]

// Role permissions
export const ROLE_PERMISSIONS = {
  [USER_ROLES.DONOR]: {
    canViewOwnDonations: true,
    canViewOwnReceipts: true,
    canMakeDonations: true,
  },
  [USER_ROLES.AUDITOR]: {
    canViewOwnDonations: true,
    canViewOwnReceipts: true,
    canMakeDonations: true,
    canViewAllDonations: true,
    canViewReports: true,
  },
  [USER_ROLES.CSR_PARTNER]: {
    canViewOwnDonations: true,
    canViewOwnReceipts: true,
    canMakeDonations: true,
    canViewAllDonations: true,
    canAddCSRDonations: true,
    canViewReports: true,
  },
  [USER_ROLES.CA]: {
    canViewOwnDonations: true,
    canViewOwnReceipts: true,
    canMakeDonations: true,
    canViewAllDonations: true,
    canViewReports: true,
    canExportData: true,
    canGenerateReceipts: true,
  },
  [USER_ROLES.DIRECTOR]: {
    canViewOwnDonations: true,
    canViewOwnReceipts: true,
    canMakeDonations: true,
    canViewAllDonations: true,
    canViewReports: true,
    canExportData: true,
    canGenerateReceipts: true,
    canConfirmDonations: true,
    canManageMemberships: true,
    canViewAnalytics: true,
  },
  [USER_ROLES.SUPER_ADMIN]: {
    canViewOwnDonations: true,
    canViewOwnReceipts: true,
    canMakeDonations: true,
    canViewAllDonations: true,
    canViewReports: true,
    canExportData: true,
    canGenerateReceipts: true,
    canConfirmDonations: true,
    canManageMemberships: true,
    canViewAnalytics: true,
    canManageUsers: true,
    canManageRoles: true,
    canAccessSettings: true,
  },
}

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId
  name: string
  email: string
  phone?: string
  password: string
  role: UserRole
  // Legacy field for backward compatibility
  legacyRole?: "user" | "admin"
  isMember: boolean
  address?: string
  city?: string
  state?: string
  pincode?: string
  country?: string
  panNumber?: string
  organization?: string
  profileImage?: string
  // Communication preferences
  dateOfBirth?: Date
  anniversary?: Date
  preferredLanguage?: "en" | "hi"
  communicationPreferences?: {
    newsletter: boolean
    festivalGreetings: boolean
    birthdayGreetings: boolean
    donationUpdates: boolean
    smsNotifications: boolean
  }
  // Tags for segmentation
  tags?: string[]
  notes?: string
  createdAt: Date
  updatedAt: Date
  comparePassword(candidatePassword: string): Promise<boolean>
  hasPermission(permission: string): boolean
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.DONOR,
    },
    legacyRole: {
      type: String,
      enum: ["user", "admin"],
    },
    isMember: {
      type: Boolean,
      default: false,
    },
    address: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    pincode: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
      default: "India",
    },
    panNumber: {
      type: String,
      trim: true,
      uppercase: true,
    },
    organization: {
      type: String,
      trim: true,
    },
    profileImage: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    anniversary: {
      type: Date,
    },
    preferredLanguage: {
      type: String,
      enum: ["en", "hi"],
      default: "en",
    },
    communicationPreferences: {
      newsletter: { type: Boolean, default: true },
      festivalGreetings: { type: Boolean, default: true },
      birthdayGreetings: { type: Boolean, default: true },
      donationUpdates: { type: Boolean, default: true },
      smsNotifications: { type: Boolean, default: false },
    },
    tags: [{
      type: String,
      trim: true,
    }],
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()
  
  const salt = await bcrypt.genSalt(12)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// Compare password method
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password)
}

// Check permission method
UserSchema.methods.hasPermission = function (permission: string): boolean {
  const permissions = ROLE_PERMISSIONS[this.role as UserRole]
  return permissions ? (permissions as Record<string, boolean>)[permission] === true : false
}

// Helper to check if user is admin-level
export function isAdminRole(role: UserRole): boolean {
  return [USER_ROLES.DIRECTOR, USER_ROLES.SUPER_ADMIN].includes(role)
}

// Helper to check if user can access admin panel
export function canAccessAdminPanel(role: UserRole): boolean {
  return [
    USER_ROLES.AUDITOR,
    USER_ROLES.CSR_PARTNER,
    USER_ROLES.CA,
    USER_ROLES.DIRECTOR,
    USER_ROLES.SUPER_ADMIN,
  ].includes(role)
}

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema)
