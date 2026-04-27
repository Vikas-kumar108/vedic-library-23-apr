import { PrismaClient } from '@dharma/data-access'
import { DiscoveryRepository } from './discovery.repository'
import { DiscoveryService } from './discovery.service'
import { SeekerRecommendationService } from './recommendation.service'

export const createDiscoveryModule = (prisma: PrismaClient) => {
  const repository = new DiscoveryRepository(prisma)
  const service = new DiscoveryService(repository)
  const recommendationService = new SeekerRecommendationService(repository)
  return { service, recommendationService }
}
