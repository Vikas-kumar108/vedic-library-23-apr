import { apiFetch } from '@/lib/api'

export interface Recommendation {
  id: string
  slug: string
  title: string
  shastra: string
  text: string
  type: string
  node?: any
  category?: string
  reason?: string
}

export const DiscoveryService = {
  async getRecommendations(stage: number, tags: string[] = []): Promise<Recommendation[]> {
    const tagQuery = tags.length > 0 ? `&tags=${tags.join(',')}` : ''
    const res = await apiFetch(`/discovery/recommend?stage=${stage}${tagQuery}`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch recommendations')
    return res.json()
  }
}
