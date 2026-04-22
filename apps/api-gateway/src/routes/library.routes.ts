import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { LibraryService } from '../services/library.service'
import { searchByKeyword } from '@dharma/search-domain'
import { VerseParamsSchema, SearchQuerySchema } from '../schemas/library.schema'

export default async function libraryRoutes(fastify: FastifyInstance) {
  const typedFastify = fastify.withTypeProvider<ZodTypeProvider>()

  // 1. Get Tree
  typedFastify.get('/tree', async (request) => {
    const libraryService = new LibraryService(request.server.prisma)
    return await libraryService.getTree()
  })

  // 2. Get Verse
  typedFastify.get('/verse/:id', {
    schema: { params: VerseParamsSchema }
  }, async (request, reply) => {
    const libraryService = new LibraryService(request.server.prisma)
    const { id } = request.params
    const verse = await libraryService.getVerse(id)
    if (!verse) return reply.status(404).send({ error: 'Verse not found' })
    return verse
  })

  // 3. Search
  typedFastify.get('/search', {
    schema: { querystring: SearchQuerySchema }
  }, async (request) => {
    const { q } = request.query
    const results = await searchByKeyword(q)
    return results
  })
}
