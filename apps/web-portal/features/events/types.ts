/**
 * Event Types
 * Responsibility: Define the UI contracts for live sessions and events.
 */

export interface VedicEvent {
  id: string
  title: string
  description: string
  host: {
    name: string
    avatar: string
    role: 'MENTOR' | 'TEACHER'
  }
  startTime: string
  endTime: string
  type: 'LIVE_SATSANG' | 'WORKSHOP' | 'GROUP_MEDITATION'
  category: 'PHILOSOPHY' | 'PRACTICE' | 'LIFE_SKILLS'
  platform: 'ZOOM' | 'YOUTUBE_LIVE' | 'IN_PERSON'
  isRegistered?: boolean
  link?: string
}
