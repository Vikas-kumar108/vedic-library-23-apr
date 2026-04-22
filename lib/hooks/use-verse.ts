'use client'

import { useEffect, useState } from 'react'
import { Verse } from '@/lib/types'
import { useAppStore } from '@/lib/store'

/**
 * Reactively resolves a Verse from the currently selected tree node.
 * Fetches from the API if not already cached in the store.
 */
export function useVerse(): { verse: Verse | null; isLoading: boolean; error: string | null } {
  const currentNode = useAppStore((s) => s.currentNode)
  const cachedVerse = useAppStore((s) => currentNode ? s.verses[currentNode.id] : null)
  const cacheVerse = useAppStore((s) => s.cacheVerse)
  const setCurrentVerse = useAppStore((s) => s.setCurrentVerse)
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!currentNode || currentNode.type !== 'verse') {
      setCurrentVerse(null)
      return
    }

    if (cachedVerse) {
      setCurrentVerse(cachedVerse)
      setIsLoading(false)
      setError(null)
      return
    }

    const fetchVerse = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch(`/api/verse/${encodeURIComponent(currentNode.id)}`)
        if (!response.ok) {
          throw new Error(`Failed to fetch verse: ${response.statusText}`)
        }
        const data = await response.json()
        cacheVerse(currentNode.id, data)
        setCurrentVerse(data)
      } catch (err: any) {
        console.error('Error fetching verse:', err)
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchVerse()
  }, [currentNode, cachedVerse, cacheVerse, setCurrentVerse])

  return { 
    verse: cachedVerse || null, 
    isLoading: isLoading && !cachedVerse, 
    error 
  }
}
