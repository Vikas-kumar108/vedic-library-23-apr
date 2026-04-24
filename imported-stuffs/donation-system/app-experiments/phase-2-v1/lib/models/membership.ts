import mongoose, { Document, Schema } from 'mongoose'

export type MembershipTier = 'SHISHYA' | 'SADHAKA' | 'SEVAK'
export type MembershipStatus = 'active' | 'expired' | 'cancelled' | 'pending'
export type PaymentFrequency = 'monthly' | 'quarterly' | 'yearly'

export interface IMembership extends Document {
  _id: mongoose.Types.ObjectId
  userId: mongoose.Types.ObjectId
  tier: MembershipTier
  status: MembershipStatus
  frequency: PaymentFrequency
  amount: number
  startDate: Date
  endDate: Date
  autoRenew: boolean
  lastPaymentDate?: Date
  nextPaymentDate?: Date
  totalContributed: number
  createdAt: Date
  updatedAt: Date
}

// Membership tier configuration
export const MEMBERSHIP_TIERS = {
  SHISHYA: {
    name: 'Shishya',
    description: 'Student tier - Begin your journey',
    monthlyAmount: 108,
    quarterlyAmount: 300,
    yearlyAmount: 1008,
    benefits: [
      'Access to basic courses',
      'Monthly newsletter',
      'Community forum access',
    ],
    color: '#C4A484', // Bronze/tan
  },
  SADHAKA: {
    name: 'Sadhaka',
    description: 'Practitioner tier - Deepen your practice',
    monthlyAmount: 501,
    quarterlyAmount: 1400,
    yearlyAmount: 5001,
    benefits: [
      'All Shishya benefits',
      'Advanced course access',
      'Monthly live sessions',
      'Priority support',
    ],
    color: '#C0C0C0', // Silver
  },
  SEVAK: {
    name: 'Sevak',
    description: 'Devotee tier - Support the mission',
    monthlyAmount: 1001,
    quarterlyAmount: 2800,
    yearlyAmount: 10001,
    benefits: [
      'All Sadhaka benefits',
      'One-on-one guidance sessions',
      'Exclusive retreats access',
      'Recognition on donors page',
      '80G tax benefits',
    ],
    color: '#FFD700', // Gold
  },
}

const membershipSchema = new Schema<IMembership>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tier: {
      type: String,
      enum: ['SHISHYA', 'SADHAKA', 'SEVAK'],
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'expired', 'cancelled', 'pending'],
      default: 'pending',
    },
    frequency: {
      type: String,
      enum: ['monthly', 'quarterly', 'yearly'],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    autoRenew: {
      type: Boolean,
      default: true,
    },
    lastPaymentDate: {
      type: Date,
    },
    nextPaymentDate: {
      type: Date,
    },
    totalContributed: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

// Index for efficient queries
membershipSchema.index({ userId: 1, status: 1 })
membershipSchema.index({ endDate: 1, status: 1 }) // For expiry checks
membershipSchema.index({ nextPaymentDate: 1, autoRenew: 1 }) // For renewal reminders

// Helper to calculate end date based on frequency
export function calculateEndDate(startDate: Date, frequency: PaymentFrequency): Date {
  const endDate = new Date(startDate)
  switch (frequency) {
    case 'monthly':
      endDate.setMonth(endDate.getMonth() + 1)
      break
    case 'quarterly':
      endDate.setMonth(endDate.getMonth() + 3)
      break
    case 'yearly':
      endDate.setFullYear(endDate.getFullYear() + 1)
      break
  }
  return endDate
}

// Helper to get amount based on tier and frequency
export function getMembershipAmount(tier: MembershipTier, frequency: PaymentFrequency): number {
  const tierConfig = MEMBERSHIP_TIERS[tier]
  switch (frequency) {
    case 'monthly':
      return tierConfig.monthlyAmount
    case 'quarterly':
      return tierConfig.quarterlyAmount
    case 'yearly':
      return tierConfig.yearlyAmount
  }
}

export const Membership =
  mongoose.models.Membership || mongoose.model<IMembership>('Membership', membershipSchema)
