import mongoose, { Schema, Document, Model } from "mongoose"

export interface IDonation extends Document {
  _id: mongoose.Types.ObjectId
  userId?: mongoose.Types.ObjectId
  donorName: string
  donorEmail: string
  donorPhone?: string
  amount: number
  method: "UPI" | "Bank"
  status: "pending" | "confirmed"
  transactionRef?: string
  isPublic: boolean
  message?: string
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
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [1, "Amount must be at least 1"],
    },
    method: {
      type: String,
      enum: ["UPI", "Bank"],
      required: [true, "Payment method is required"],
    },
    status: {
      type: String,
      enum: ["pending", "confirmed"],
      default: "pending",
    },
    transactionRef: {
      type: String,
      trim: true,
    },
    isPublic: {
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
