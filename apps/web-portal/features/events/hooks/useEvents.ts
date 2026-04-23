'use client'

import { useState, useEffect } from 'react'
import { VedicEvent } from '../types'

/**
 * useEvents Hook
 * Responsibility: Manage the retrieval and registration state of live sessions.
 */
export function useEvents() {
  const [events, setEvents] = useState<VedicEvent[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    // Mock: Fetching upcoming events
    setTimeout(() => {
      setEvents([
        {
          id: 'e1',
          title: 'Weekly Gita Satsang: The Art of Duty',
          description: 'A deep dive into Bhagavad Gita 2.47 with live Q&A on applying detachment in modern careers.',
          host: { name: 'Dr. Keshav Dev', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Keshav', role: 'MENTOR' },
          startTime: '2026-04-24T18:00:00',
          endTime: '2026-04-24T19:30:00',
          type: 'LIVE_SATSANG',
          category: 'PHILOSOPHY',
          platform: 'ZOOM',
          isRegistered: true,
          link: 'https://zoom.us/j/123456789'
        },
        {
          id: 'e2',
          title: 'Mindfulness & Japa Workshop',
          description: 'Practical techniques to improve concentration during daily meditation rounds.',
          host: { name: 'Smt. Radharani', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Radha', role: 'TEACHER' },
          startTime: '2026-04-26T10:00:00',
          endTime: '2026-04-26T11:30:00',
          type: 'WORKSHOP',
          category: 'PRACTICE',
          platform: 'YOUTUBE_LIVE',
          isRegistered: false,
          link: 'https://youtube.com/live/xyz'
        },
        {
          id: 'e3',
          title: 'Global Group Meditation',
          description: 'Join seekers from around the world for a synchronous 15-minute guided meditation.',
          host: { name: 'Sri Vaman Das', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vaman', role: 'MENTOR' },
          startTime: '2026-04-25T06:00:00',
          endTime: '2026-04-25T06:30:00',
          type: 'GROUP_MEDITATION',
          category: 'PRACTICE',
          platform: 'ZOOM',
          isRegistered: false,
          link: 'https://zoom.us/j/987654321'
        }
      ])
      setIsLoading(false)
    }, 500)
  }, [])

  const registerForEvent = async (id: string) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, isRegistered: true } : e))
  }

  return { events, isLoading, registerForEvent }
}
