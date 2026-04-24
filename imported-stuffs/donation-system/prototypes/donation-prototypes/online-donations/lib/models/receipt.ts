import mongoose, { Schema, Document, Model } from "mongoose"

export interface IReceipt extends Document {
  _id: mongoose.Types.ObjectId
  donationId: mongoose.Types.ObjectId
  receiptNumber: string
  issuedDate: Date
  createdAt: Date
  updatedAt: Date
}

const ReceiptSchema = new Schema<IReceipt>(
  {
    donationId: {
      type: Schema.Types.ObjectId,
      ref: "Donation",
      required: true,
      unique: true,
    },
    receiptNumber: {
      type: String,
      required: true,
      unique: true,
    },
    issuedDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
)

// Index for efficient queries
ReceiptSchema.index({ donationId: 1 })
ReceiptSchema.index({ receiptNumber: 1 })

export const Receipt: Model<IReceipt> =
  mongoose.models.Receipt || mongoose.model<IReceipt>("Receipt", ReceiptSchema)
