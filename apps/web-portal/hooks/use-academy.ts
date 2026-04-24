import { create } from 'zustand'
import { InstitutionalService } from '@/services/institutional-service'

interface AcademyState {
  pulse: any | null
  currentSeeker: any | null
  loading: boolean
  error: string | null

  fetchPulse: (orgId: string) => Promise<void>
  fetchSeeker: (userId: string) => Promise<void>
}

export const useAcademy = create<AcademyState>((set) => ({
  pulse: null,
  currentSeeker: null,
  loading: false,
  error: null,

  fetchPulse: async (orgId) => {
    set({ loading: true, error: null })
    try {
      const data = await InstitutionalService.getAcademyPulse(orgId)
      set({ pulse: data, loading: false })
    } catch (err: any) {
      set({ error: err.message, loading: false })
    }
  },

  fetchSeeker: async (userId) => {
    set({ loading: true, error: null })
    try {
      const data = await InstitutionalService.getSeekerProfile(userId)
      set({ currentSeeker: data, loading: false })
    } catch (err: any) {
      set({ error: err.message, loading: false })
    }
  }
}))
