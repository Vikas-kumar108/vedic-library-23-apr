import { useState, useEffect } from 'react'
import { DiscoveryService, Recommendation } from '@/services/discovery-service'

export function useRecommendations(stage: number = 1) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchRecs() {
      try {
        const data = await DiscoveryService.getRecommendations(stage)
        setRecommendations(data)
      } catch (err) {
        console.error('Failed to fetch recommendations:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecs()
  }, [stage])

  return { recommendations, isLoading }
}
