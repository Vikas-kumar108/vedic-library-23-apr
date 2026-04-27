'use client'

import { useState, useEffect } from 'react'

export interface Verse {
  id: string
  book: string
  chapter: number
  verse: number
  sanskrit: string
  translation: string
  purport: string
}

/**
 * useVerse Hook
 * Responsibility: Fetch and manage state for a single specific verse.
 */
export function useVerse(verseId: string) {
  const [verse, setVerse] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!verseId) return

    const fetchVerse = async () => {
      try {
        setIsLoading(true)
        // Get token from cookie (simplest for this architecture)
        const res = await fetch(`/api/verse/${verseId}`)
        const data = await res.json()
        
        if (res.ok) {
          setVerse(data)
        } else {
          setError(data.error || 'Failed to fetch verse')
        }
      } catch (err) {
        setError('Network error')
      } finally {
        setIsLoading(false)
      }
    }

    fetchVerse()
  }, [verseId])

  return { verse, isLoading, error }
}

/**
 * useVerses Hook
 * Responsibility: List and filter verses within a specific book/chapter.
 */
export function useVerses(bookId: string, chapterId: number) {
  const [verses, setVerses] = useState<Verse[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    // Mock: Fetching chapter verses
    setTimeout(() => {
      setVerses(
        Array.from({ length: 10 }, (_, i) => ({
          id: `${bookId}-${chapterId}-${i + 40}`,
          book: bookId,
          chapter: chapterId,
          verse: i + 40,
          sanskrit: "...",
          translation: "...",
          purport: "..."
        }))
      )
      setIsLoading(false)
    }, 500)
  }, [bookId, chapterId])

  return { verses, isLoading }
}
