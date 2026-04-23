'use client'

import { useState, useEffect } from 'react'

export interface SearchResult {
  id: string
  title: string
  snippet: string
  type: 'VERSE' | 'LECTURE' | 'COURSE' | 'NOTE'
  author?: string
  book?: string
  relevance: number
  link: string
}

/**
 * useSearch Hook
 * Responsibility: Execute semantic searches and manage diverse result types.
 * Purpose: Provides a single interface for querying the entire Vedic ecosystem.
 */
export function useSearch(query: string) {
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!query || query.length < 3) {
      setResults([])
      return
    }

    setIsLoading(true)
    // Mock: Semantic Search Simulation
    const timer = setTimeout(() => {
      setResults([
        {
          id: 'bg-2-47',
          title: 'Bhagavad Gita 2.47',
          snippet: '...Your right is to the work only, never to its fruits. This is the foundation of karma in household life...',
          type: 'VERSE',
          book: 'Bhagavad Gita',
          relevance: 98,
          link: '/library/read/bg-2-47'
        },
        {
          id: 'l101',
          title: 'Karma Yoga for Modern Families',
          snippet: 'In this lecture, we explore how the principles of detachment apply to the responsibilities of a Grihastha...',
          type: 'LECTURE',
          author: 'Dr. Keshav Dev',
          relevance: 92,
          link: '/learn/karma-yoga'
        },
        {
          id: 'c50',
          title: 'Dharma & Domestic Life',
          snippet: 'A specialized course on balancing spiritual growth with family and social strategy.',
          type: 'COURSE',
          relevance: 85,
          link: '/courses/dharma-domestic'
        },
        {
          id: 'n12',
          title: 'My Reflection on Detached Action',
          snippet: '...I realized that by focusing on the process of serving my family rather than their appreciation...',
          type: 'NOTE',
          relevance: 78,
          link: '/profile/notes/n12'
        }
      ])
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [query])

  return { results, isLoading }
}
