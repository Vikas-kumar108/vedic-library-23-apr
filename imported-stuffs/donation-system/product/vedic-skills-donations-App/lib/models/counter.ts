import mongoose, { Schema, Document, Model } from "mongoose"

export interface ICounter extends Document {
  name: string
  value: number
}

const CounterSchema = new Schema<ICounter>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: Number,
    default: 0,
  },
})

export const Counter: Model<ICounter> =
  mongoose.models.Counter || mongoose.model<ICounter>("Counter", CounterSchema)

// Helper function to get next sequence value
export async function getNextSequence(name: string): Promise<number> {
  const counter = await Counter.findOneAndUpdate(
    { name },
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  )
  return counter.value
}

// Helper to generate receipt number
export async function generateReceiptNumber(): Promise<string> {
  const year = new Date().getFullYear()
  const seq = await getNextSequence(`receipt-${year}`)
  return `VS-${year}-${String(seq).padStart(5, "0")}`
}
