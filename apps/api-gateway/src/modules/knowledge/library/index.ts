import { PrismaClient } from '@dharma/data-access'
import { LibraryRepository } from './library.repository'
import { LibraryService } from './library.service'

export const createLibraryModule = (prisma: PrismaClient) => {
  const repository = new LibraryRepository(prisma)
  const service = new LibraryService(repository)

  return {
    repository,
    service
  }
}