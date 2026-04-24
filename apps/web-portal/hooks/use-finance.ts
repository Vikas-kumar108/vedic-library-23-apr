import { create } from 'zustand'
import { InstitutionalService } from '@/services/institutional-service'

interface FinanceState {
  ledger: any[]
  grants: any[]
  loading: boolean
  error: string | null

  fetchLedger: (orgId: string) => Promise<void>
  fetchGrants: (orgId: string) => Promise<void>
}

export const useFinance = create<FinanceState>((set) => ({
  ledger: [],
  grants: [],
  loading: false,
  error: null,

  fetchLedger: async (orgId) => {
    set({ loading: true, error: null })
    try {
      const data = await InstitutionalService.getLedger(orgId)
      set({ ledger: data, loading: false })
    } catch (err: any) {
      set({ error: err.message, loading: false })
    }
  },

  fetchGrants: async (orgId) => {
    set({ loading: true, error: null })
    try {
      const data = await InstitutionalService.getGrants(orgId)
      set({ grants: data, loading: false })
    } catch (err: any) {
      set({ error: err.message, loading: false })
    }
  }
}))
