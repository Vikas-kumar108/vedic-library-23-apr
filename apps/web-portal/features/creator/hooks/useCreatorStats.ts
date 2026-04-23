'use client'

import { useState, useEffect } from 'react'

export interface CreatorStats {
  totalStudents: number
  activeSeekers: number
  totalContentHours: number
  averageRating: number
  engagementRate: number
  recentActivity: {
    event: string
    time: string
  }[]
}

export interface TeacherCourse {
  id: string
  title: string
  students: number
  status: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED'
}

/**
 * useCreatorStats Hook
 * Responsibility: Manage the analytical and operational data for mentors and teachers.
 */
export function useCreatorStats() {
  const [stats, setStats] = useState<CreatorStats | null>(null)
  const [courses, setCourses] = useState<TeacherCourse[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    // Mock: Fetching teacher analytics
    setTimeout(() => {
      setStats({
        totalStudents: 1420,
        activeSeekers: 580,
        totalContentHours: 124,
        averageRating: 4.9,
        engagementRate: 72,
        recentActivity: [
          { event: '32 students completed "Gita Foundations"', time: '2h ago' },
          { event: 'New reflection submitted in Mumbai Circle', time: '5h ago' },
          { event: 'Satsang registration hit 150 limit', time: '1d ago' }
        ]
      })
      setCourses([
        { id: 'c1', title: 'Bhagavad Gita Foundations', students: 840, status: 'PUBLISHED' },
        { id: 'c2', title: 'The Path of Devotion', students: 420, status: 'PUBLISHED' },
        { id: 'c3', title: 'Advanced Sanskrit Grammar', students: 0, status: 'DRAFT' }
      ])
      setIsLoading(false)
    }, 500)
  }, [])

  return { stats, courses, isLoading }
}
