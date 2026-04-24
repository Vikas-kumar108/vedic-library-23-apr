import mongoose, { Schema, Document, Model } from "mongoose"

export interface IDonation extends Document {
  _id: mongoose.Types.ObjectId
  userId?: mongoose.Types.ObjectId
  donorName: string
  donorEmail: string
  donorPhone?: string
  donorAddress?: string
  donorPAN?: string
  amount: number
  currency: string
  method: "UPI" | "Bank" | "Razorpay" | "pending"
  paymentMethod?: string
  status: "pending" | "confirmed" | "rejected"
  transactionRef?: string
  razorpayOrderId?: string
  razorpayPaymentId?: string
  screenshotPath?: string
  isPublic: boolean
  message?: string
  purpose?: string
  isRecurring: boolean
  needs80G: boolean
  membershipId?: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
  confirmedAt?: Date
}

const DonationSchema = new Schema<IDonation>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    donorName: {
      type: String,
      required: [true, "Donor name is required"],
      trim: true,
    },
    donorEmail: {
      type: String,
      required: [true, "Donor email is required"],
      lowercase: true,
      trim: true,
    },
    donorPhone: {
      type: String,
      trim: true,
    },
    donorAddress: {
      type: String,
      trim: true,
    },
    donorPAN: {
      type: String,
      trim: true,
      uppercase: true,
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [1, "Amount must be at least 1"],
    },
    currency: {
      type: String,
      default: "INR",
    },
    method: {
      type: String,
      enum: ["UPI", "Bank", "Razorpay", "pending"],
      required: [true, "Payment method is required"],
    },
    paymentMethod: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "rejected"],
      default: "pending",
    },
    razorpayOrderId: {
      type: String,
    },
    razorpayPaymentId: {
      type: String,
    },
    screenshotPath: {
      type: String,
    },
    purpose: {
      type: String,
      trim: true,
    },
    isRecurring: {
      type: Boolean,
      default: false,
    },
    membershipId: {
      type: Schema.Types.ObjectId,
      ref: "Membership",
    },
    transactionRef: {
      type: String,
      trim: true,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    needs80G: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    confirmedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
)

// Index for efficient queries
DonationSchema.index({ status: 1, createdAt: -1 })
DonationSchema.index({ userId: 1, createdAt: -1 })
DonationSchema.index({ donorEmail: 1 })

export const Donation: Model<IDonation> =
  mongoose.models.Donation || mongoose.model<IDonation>("Donation", DonationSchema)
