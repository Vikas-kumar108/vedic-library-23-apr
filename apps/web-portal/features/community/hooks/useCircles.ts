'use client'

import { useState, useEffect } from 'react'
import { Circle } from '../types'

/**
 * useCircles Hook
 * Responsibility: Manage the discovery and enrollment state of community circles.
 */
export function useCircles() {
  const [circles, setCircles] = useState<Circle[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    // Mock: Fetching circles directory
    setTimeout(() => {
      setCircles([
        {
          id: 'c1',
          name: 'Mumbai Bhakti Sangha',
          description: 'A regional circle for seekers in Mumbai to connect and study the Bhagavatam together.',
          avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=MB',
          memberCount: 156,
          type: 'REGIONAL',
          location: 'Mumbai, India',
          isJoined: true,
          recentActivity: 'Satsang scheduled for Sunday'
        },
        {
          id: 'c2',
          name: 'Early Morning Gita Study',
          description: 'A global study group focused on the first 6 chapters of the Bhagavad Gita.',
          avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=EG',
          memberCount: 842,
          type: 'STUDY_GROUP',
          isJoined: false,
          recentActivity: '34 new posts today'
        },
        {
          id: 'c3',
          name: 'Mentor Circle: Dharma in Business',
          description: 'A focused group for professionals to discuss applying Vedic ethics in corporate environments.',
          avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=DB',
          memberCount: 24,
          type: 'MENTOR_CIRCLE',
          mentorId: 'm1',
          isJoined: false,
          recentActivity: 'Dr. Keshav shared a new article'
        }
      ])
      setIsLoading(false)
    }, 500)
  }, [])

  const joinCircle = async (id: string) => {
    setCircles(prev => prev.map(c => c.id === id ? { ...c, isJoined: true, memberCount: c.memberCount + 1 } : c))
  }

  return { circles, isLoading, joinCircle }
}
