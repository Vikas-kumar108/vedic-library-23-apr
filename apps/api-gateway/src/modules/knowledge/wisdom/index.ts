import { PrismaClient } from '@dharma/data-access'
import { WisdomRepository } from './wisdom.repository'
import { WisdomEngineService } from './wisdom-engine.service'

export const createWisdomModule = (prisma: PrismaClient) => {
  const repository = new WisdomRepository(prisma)
  const service = new WisdomEngineService(repository)
  return { service }
}
