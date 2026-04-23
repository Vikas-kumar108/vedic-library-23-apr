'use client'

import { useState, useEffect } from 'react'

export interface UserProfile {
  id: string
  name: string
  avatar: string
  stage: string
  sankalpa: string
  stats: {
    coursesCompleted: number
    versesRead: number
    japaRounds: number
    communityContributions: number
  }
  badges: Badge[]
  growthLevel: number
}

export interface Badge {
  id: string
  label: string
  icon: string
  date: string
}

/**
 * useProfile Hook
 * Responsibility: Fetch and manage the seeker's identity and achievement data.
 */
export function useProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    // Mock: Fetching user profile and journey data
    setTimeout(() => {
      setProfile({
        id: 'u1',
        name: 'Nitai Das',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nitai',
        stage: 'GRIHASTHA (Householder)',
        sankalpa: 'Discovering My Purpose',
        stats: {
          coursesCompleted: 3,
          versesRead: 142,
          japaRounds: 1840,
          communityContributions: 12
        },
        badges: [
          { id: 'b1', label: 'Early Seeker', icon: '🌅', date: '2026-03-01' },
          { id: 'b2', label: 'Dedicated Chanter', icon: '📿', date: '2026-04-15' },
          { id: 'b3', label: 'Shastra Scholar', icon: '📚', date: '2026-04-20' }
        ],
        growthLevel: 4
      })
      setIsLoading(false)
    }, 500)
  }, [])

  return { profile, isLoading }
}
