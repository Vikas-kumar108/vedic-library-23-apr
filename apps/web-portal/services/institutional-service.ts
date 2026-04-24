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
  },

  async getAssets(orgId: string): Promise<any[]> {
    const res = await fetch(`${API_URL}/institutional/assets/${orgId}`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch assets')
    return res.json()
  },

  async createAsset(data: any): Promise<any> {
    const res = await fetch(`${API_URL}/institutional/assets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!res.ok) throw new Error('Failed to create asset')
    return res.json()
  },

  async getCompliance(orgId: string): Promise<any> {
    const res = await fetch(`${API_URL}/institutional/compliance/${orgId}`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch compliance')
    return res.json()
  },

  async getHumanCapital(orgId: string): Promise<any> {
    const res = await fetch(`${API_URL}/institutional/human-capital/${orgId}`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch human capital')
    return res.json()
  },

  async getIntegrations(orgId: string): Promise<any> {
    const res = await fetch(`${API_URL}/institutional/integrations/${orgId}`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch integrations')
    return res.json()
  },

  async registerWebhook(data: any): Promise<any> {
    const res = await fetch(`${API_URL}/institutional/integrations/webhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!res.ok) throw new Error('Failed to register webhook')
    return res.json()
  },

  async getWisdomPulse(context: string): Promise<any> {
    const res = await fetch(`${API_URL}/institutional/wisdom/pulse?context=${context}`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch wisdom pulse')
    return res.json()
  },

  async getProjects(orgId: string): Promise<any> {
    const res = await fetch(`${API_URL}/institutional/projects?orgId=${orgId}`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch projects')
    return res.json()
  },

  async createProject(data: any): Promise<any> {
    const res = await fetch(`${API_URL}/institutional/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!res.ok) throw new Error('Failed to create project')
    return res.json()
  },

  async getAcademyPulse(orgId: string): Promise<any> {
    const res = await fetch(`${API_URL}/institutional/academy/pulse?orgId=${orgId}`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch academy pulse')
    return res.json()
  },

  async getSeekerProfile(userId: string): Promise<any> {
    const res = await fetch(`${API_URL}/institutional/academy/seeker/${userId}`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch seeker profile')
    return res.json()
  }
}
