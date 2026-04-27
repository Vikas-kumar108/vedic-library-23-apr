import { apiFetch } from '@/lib/api'

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
    const res = await apiFetch(`/institutional/overview/${orgId}`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch overview')
    return res.json()
  },

  async getGrants(orgId: string): Promise<any[]> {
    const res = await apiFetch(`/institutional/grants/${orgId}`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch grants')
    return res.json()
  },

  async getLedger(orgId: string): Promise<any[]> {
    const res = await apiFetch(`/institutional/ledger/${orgId}`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch ledger')
    return res.json()
  },

  async getAssets(orgId: string): Promise<any[]> {
    const res = await apiFetch(`/institutional/assets/${orgId}`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch assets')
    return res.json()
  },

  async createAsset(data: any): Promise<any> {
    const res = await apiFetch('/institutional/assets', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    if (!res.ok) throw new Error('Failed to create asset')
    return res.json()
  },

  async getCompliance(orgId: string): Promise<any> {
    const res = await apiFetch(`/institutional/compliance/${orgId}`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch compliance')
    return res.json()
  },

  async getHumanCapital(orgId: string): Promise<any> {
    const res = await apiFetch(`/institutional/human-capital/${orgId}`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch human capital')
    return res.json()
  },

  async getIntegrations(orgId: string): Promise<any> {
    const res = await apiFetch(`/institutional/integrations/${orgId}`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch integrations')
    return res.json()
  },

  async registerWebhook(data: any): Promise<any> {
    const res = await apiFetch('/institutional/integrations/webhook', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    if (!res.ok) throw new Error('Failed to register webhook')
    return res.json()
  },

  async getWisdomPulse(context: string): Promise<any> {
    const res = await apiFetch(`/institutional/wisdom/pulse?context=${context}`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch wisdom pulse')
    return res.json()
  },

  async getProjects(orgId: string): Promise<any> {
    const res = await apiFetch(`/institutional/projects?orgId=${orgId}`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch projects')
    return res.json()
  },

  async createProject(data: any): Promise<any> {
    const res = await apiFetch('/institutional/projects', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    if (!res.ok) throw new Error('Failed to create project')
    return res.json()
  },

  async getAcademyPulse(orgId: string): Promise<any> {
    const res = await apiFetch(`/institutional/academy/pulse?orgId=${orgId}`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch academy pulse')
    return res.json()
  },

  async getSeekerProfile(userId: string): Promise<any> {
    const res = await apiFetch(`/institutional/academy/seeker/${userId}`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch seeker profile')
    return res.json()
  },

  async getSystemTasks(): Promise<any> {
    const res = await apiFetch('/institutional/system/tasks', { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch system tasks')
    return res.json()
  },

  async triggerTask(type: string, payload: any): Promise<any> {
    const res = await apiFetch('/institutional/system/tasks/trigger', {
      method: 'POST',
      body: JSON.stringify({ type, payload })
    })
    return res.json()
  },

  async issueProclamation(email: string): Promise<any> {
    const res = await apiFetch('/institutional/system/proclaim', {
      method: 'POST',
      body: JSON.stringify({ email })
    })
    return res.json()
  },

  async getContentHealth(): Promise<any> {
    const res = await apiFetch('/institutional/content/health', { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch content health')
    return res.json()
  }
}
