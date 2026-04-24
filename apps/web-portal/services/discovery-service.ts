const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4444'

export interface Recommendation {
  id: string
  slug: string
  title: string
  shastra: string
  text: string
  type: string
}

export const DiscoveryService = {
  async getRecommendations(stage: number, tags: string[] = []): Promise<Recommendation[]> {
    const tagQuery = tags.length > 0 ? `&tags=${tags.join(',')}` : ''
    const res = await fetch(`${API_URL}/discovery/recommend?stage=${stage}${tagQuery}`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch recommendations')
    return res.json()
  }
}
