import { useState, useEffect } from 'react'
import { DiscoveryService, Recommendation } from '@/services/discovery-service'

export function useRecommendations(stage: number = 1) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [version, setVersion] = useState(0)

  const refresh = () => setVersion(v => v + 1)

  useEffect(() => {
    async function fetchRecs() {
      try {
        setIsLoading(true)
        const data = await DiscoveryService.getRecommendations(stage)
        setRecommendations(data)
      } catch (err) {
        console.error('Failed to fetch recommendations:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecs()
  }, [stage, version])

  return { recommendations, isLoading, refresh }
}
