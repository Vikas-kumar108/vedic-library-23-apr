/**
 * Community Types
 * Responsibility: Define the UI contracts for social engagement and group dynamics.
 */

export interface Circle {
  id: string
  name: string
  description: string
  avatar: string
  memberCount: number
  type: 'REGIONAL' | 'STUDY_GROUP' | 'MENTOR_CIRCLE'
  location?: string
  mentorId?: string
  isJoined?: boolean
  recentActivity?: string
}

export interface CirclePost {
  id: string
  circleId: string
  author: {
    id: string
    name: string
    avatar: string
    role: 'USER' | 'MENTOR'
  }
  content: string
  timestamp: string
  likes: number
  replies: number
}

export interface CircleMember {
  id: string
  name: string
  avatar: string
  role: 'USER' | 'MENTOR' | 'MODERATOR'
  joinedDate: string
}
