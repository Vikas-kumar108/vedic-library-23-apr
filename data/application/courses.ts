import { Course } from '@/lib/types'

export const sampleCourses: Course[] = [
  // ✅ COPY sampleCourses EXACTLY

  {
    id: 'intro-gita',
    title: 'Introduction to Bhagavad Gita',
    description: 'A foundational course exploring the timeless wisdom of the Gita for modern life.',
    level: 'beginner',
    ageGroups: ['students', 'professionals'],
    verseCount: 18
  },
  {
    id: 'karma-yoga-deep',
    title: 'Karma Yoga: Path of Action',
    description: 'Deep dive into the philosophy of selfless action and its practical application.',
    level: 'intermediate',
    ageGroups: ['professionals', 'elders'],
    verseCount: 45
  },
  {
    id: 'gita-for-kids',
    title: 'Gita Stories for Kids',
    description: 'Simplified teachings through engaging stories and activities.',
    level: 'beginner',
    ageGroups: ['kids'],
    verseCount: 10
  }
]
