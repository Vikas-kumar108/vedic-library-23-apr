import { create } from 'zustand'
import { InstitutionalService, InstitutionalOverview } from '@/services/institutional-service'

interface InstitutionalState {
  overview: InstitutionalOverview | null
  health: any | null
  loading: boolean
  error: string | null
  
  // Actions
  fetchOverview: (orgId: string) => Promise<void>
  fetchContentHealth: () => Promise<void>
  reset: () => void
}

export const useInstitutional = create<InstitutionalState>((set) => ({
  overview: null,
  health: null,
  loading: false,
  error: null,

  fetchOverview: async (orgId) => {
    set({ loading: true, error: null })
    try {
      const data = await InstitutionalService.getOverview(orgId)
      set({ overview: data, loading: false })
    } catch (err: any) {
      set({ error: err.message, loading: false })
    }
  },

  fetchContentHealth: async () => {
    set({ loading: true, error: null })
    try {
      const data = await InstitutionalService.getContentHealth()
      set({ health: data, loading: false })
    } catch (err: any) {
      set({ error: err.message, loading: false })
    }
  },

  reset: () => set({ overview: null, health: null, loading: false, error: null })
}))
