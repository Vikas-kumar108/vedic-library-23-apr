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
  const [verse, setVerse] = useState<Verse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!verseId) return

    setIsLoading(true)
    // Mock: Fetch from API
    setTimeout(() => {
      setVerse({
        id: verseId,
        book: "Bhagavad Gita",
        chapter: 2,
        verse: 47,
        sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥ ४७ ॥",
        translation: "You have a right to perform your prescribed duty, but you are not entitled to the fruits of action...",
        purport: "There are three considerations here: prescribed duties, capricious work, and inaction..."
      })
      setIsLoading(false)
    }, 500)
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
