const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4444'

export interface InstitutionalOverview {
  stats: {
    activeGrants: number
    totalFunding: number
    pendingTasks: number
  }
  recentActivity: any[]
}

export const InstitutionalService = {
  async getOverview(orgId: string): Promise<InstitutionalOverview> {
    const res = await fetch(`${API_URL}/institutional/overview/${orgId}`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch overview')
    return res.json()
  },

  async getGrants(orgId: string): Promise<any[]> {
    const res = await fetch(`${API_URL}/institutional/grants/${orgId}`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch grants')
    return res.json()
  },

  async getLedger(orgId: string): Promise<any[]> {
    const res = await fetch(`${API_URL}/institutional/ledger/${orgId}`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch ledger')
    return res.json()
  }
}
