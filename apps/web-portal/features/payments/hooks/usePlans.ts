'use client'

import { useState, useEffect } from 'react'

export interface PricingPlan {
  id: string
  name: string
  price: number
  currency: string
  interval: 'month' | 'year'
  features: string[]
  isPremium: boolean
}

/**
 * usePlans Hook
 * Responsibility: Fetch and expose available pricing/commitment plans.
 */
export function usePlans() {
  const [plans, setPlans] = useState<PricingPlan[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Mock: Plans definition
    setPlans([
      {
        id: 'free',
        name: 'Seeker',
        price: 0,
        currency: 'INR',
        interval: 'month',
        features: ['Basic Library Access', 'Daily Reflections', 'Community Feed'],
        isPremium: false
      },
      {
        id: 'premium',
        name: 'Dedicated',
        price: 999,
        currency: 'INR',
        interval: 'month',
        features: ['Full Shastra Access', 'Mentor Guidance', 'Live Sessions', 'Adhikara Content'],
        isPremium: true
      }
    ])
    setIsLoading(false)
  }, [])

  return { plans, isLoading }
}

/**
 * useSubscription Hook
 * Responsibility: Check the current user's subscription status.
 */
export function useSubscription() {
  const [subscription, setSubscription] = useState<{ status: string; planId: string } | null>(null)
  
  useEffect(() => {
    // Mock: Checking user subscription
    setSubscription({ status: 'active', planId: 'free' })
  }, [])

  return { 
    subscription, 
    isPremium: subscription?.planId === 'premium'
  }
}
