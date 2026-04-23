'use client'

import { useState, useEffect } from 'react'

export interface Post {
  id: string
  author: {
    name: string
    avatar?: string
    role: 'USER' | 'MENTOR' | 'ADMIN'
  }
  content: string
  category: 'REALIZATION' | 'QUESTION' | 'ANNOUNCEMENT'
  likes: number
  replies: number
  timestamp: string
  isPinned?: boolean
}

export interface CommunityGroup {
  id: string
  name: string
  members: number
  description: string
  type: 'REGIONAL' | 'STUDY_GROUP' | 'MENTOR_CIRCLE'
}

/**
 * usePosts Hook
 * Responsibility: Fetch and manage the community feed.
 */
export function usePosts(category?: string) {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    // Mock: Fetching posts
    setTimeout(() => {
      setPosts([
        {
          id: 'p1',
          author: { name: 'Dr. Keshav Dev', role: 'MENTOR' },
          content: 'The essence of Bhagavad Gita 2.47 is not just work, but the freedom that comes from offering the result. How has this applied to your week?',
          category: 'ANNOUNCEMENT',
          likes: 42,
          replies: 12,
          timestamp: '2h ago',
          isPinned: true
        },
        {
          id: 'p2',
          author: { name: 'Radha K.', role: 'USER' },
          content: 'Found a beautiful parallel between today’s lesson and the Ishopanishad. Has anyone else noticed the connection between Isavasyam and Nishkama Karma?',
          category: 'REALIZATION',
          likes: 18,
          replies: 5,
          timestamp: '5h ago'
        }
      ])
      setIsLoading(false)
    }, 500)
  }, [category])

  return { posts, isLoading }
}

/**
 * useGroups Hook
 * Responsibility: Fetch available community circles.
 */
export function useGroups() {
  const [groups, setGroups] = useState<CommunityGroup[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setGroups([
      { id: 'g1', name: 'Gita Study Group (Mumbai)', members: 120, description: 'Weekly deep dives into the Gita.', type: 'REGIONAL' },
      { id: 'g2', name: 'Early Morning Sadhana', members: 450, description: 'Connecting for daily chanting.', type: 'STUDY_GROUP' },
      { id: 'g3', name: 'Mentor Circle: Applied Ethics', members: 45, description: 'Exclusive circle for deep discussions.', type: 'MENTOR_CIRCLE' }
    ])
    setIsLoading(false)
  }, [])

  return { groups, isLoading }
}
