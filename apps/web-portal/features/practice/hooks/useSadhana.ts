'use client'

import { useState, useEffect } from 'react'

export interface SadhanaEntry {
  id: string
  date: string
  rounds: number
  readingMinutes: number
  reflectionDone: boolean
  meditationMinutes: number
}

export interface SadhanaStats {
  currentStreak: number
  bestStreak: number
  totalRounds: number
  avgReadingTime: number
}

/**
 * useSadhana Hook
 * Responsibility: Manage the logic for daily practice tracking and statistics.
 */
export function useSadhana() {
  const [entries, setEntries] = useState<SadhanaEntry[]>([])
  const [stats, setStats] = useState<SadhanaStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    // Mock: Fetching sadhana history
    setTimeout(() => {
      setEntries([
        { id: '1', date: '2026-04-22', rounds: 16, readingMinutes: 30, reflectionDone: true, meditationMinutes: 20 },
        { id: '2', date: '2026-04-21', rounds: 16, readingMinutes: 45, reflectionDone: true, meditationMinutes: 15 }
      ])
      setStats({
        currentStreak: 12,
        bestStreak: 45,
        totalRounds: 1840,
        avgReadingTime: 35
      })
      setIsLoading(false)
    }, 500)
  }, [])

  const logSadhana = async (entry: Omit<SadhanaEntry, 'id' | 'date'>) => {
    // Logic: Update local state or call API
    console.log('Logging sadhana:', entry)
  }

  return { entries, stats, isLoading, logSadhana }
}
