'use client'

import { useState, useEffect } from 'react'

export interface Course {
  id: string
  title: string
  description: string
  instructor: string
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
  duration: string
  lessonsCount: number
  progress?: number
  modules: Module[]
}

export interface Module {
  id: string
  title: string
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  title: string
  duration: string
  type: 'VIDEO' | 'TEXT' | 'AUDIO'
  isCompleted?: boolean
  isLocked?: boolean
}

/**
 * useCourses Hook
 * Responsibility: Fetch and filter the course catalog.
 */
export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Mock: Fetch courses
    setTimeout(() => {
      setCourses([
        {
          id: 'bg-101',
          title: 'Bhagavad Gita Foundations',
          description: 'A comprehensive entry into the science of the soul.',
          instructor: 'Dr. Keshav Dev',
          level: 'BEGINNER',
          duration: '12h',
          lessonsCount: 24,
          progress: 20,
          modules: []
        },
        {
          id: 'bhakti-yoga',
          title: 'The Path of Devotion',
          description: 'Exploring the depths of Srimad Bhagavatam.',
          instructor: 'Smt. Radharani',
          level: 'INTERMEDIATE',
          duration: '18h',
          lessonsCount: 32,
          modules: []
        }
      ])
      setIsLoading(false)
    }, 500)
  }, [])

  return { courses, isLoading }
}

/**
 * useCourse Hook
 * Responsibility: Fetch a single course with its module/lesson structure.
 */
export function useCourse(courseId: string) {
  const [course, setCourse] = useState<Course | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!courseId) return
    setIsLoading(true)
    // Mock: Fetch course detail
    setTimeout(() => {
      setCourse({
        id: courseId,
        title: 'Bhagavad Gita Foundations',
        description: '...',
        instructor: 'Dr. Keshav Dev',
        level: 'BEGINNER',
        duration: '12h',
        lessonsCount: 24,
        modules: [
          {
            id: 'm1',
            title: 'The Eternal Soul',
            lessons: [
              { id: 'l1', title: 'Context of Kurukshetra', duration: '15m', type: 'VIDEO', isCompleted: true },
              { id: 'l2', title: 'The Changing Body', duration: '20m', type: 'VIDEO', isCompleted: false },
            ]
          },
          {
            id: 'm2',
            title: 'Yoga of Intelligence',
            lessons: [
              { id: 'l3', title: 'Fixed Intelligence', duration: '12m', type: 'VIDEO', isLocked: true },
            ]
          }
        ]
      })
      setIsLoading(false)
    }, 500)
  }, [courseId])

  return { course, isLoading }
}
