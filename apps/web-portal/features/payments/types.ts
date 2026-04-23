/**
 * Payment & Membership Types
 * Responsibility: Define the UI contracts for financial transactions and seeker tiers.
 */

export interface MembershipPlan {
  id: string
  name: string
  price: number
  interval: 'MONTHLY' | 'YEARLY'
  features: string[]
  isPopular?: boolean
  tier: 'SEEKER' | 'PRACTITIONER' | 'SCHOLAR'
}

export interface PaymentIntent {
  id: string
  amount: number
  currency: string
  status: 'PENDING' | 'SUCCESS' | 'FAILED'
}
