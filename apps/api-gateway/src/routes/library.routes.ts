import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { createLibraryModule } from '../modules/knowledge/library'
import { searchByKeyword } from '@dharma/search-domain'
import { VerseParamsSchema, SearchQuerySchema } from '../schemas/library.schema'

export default async function libraryRoutes(fastify: FastifyInstance) {
  const typedFastify = fastify.withTypeProvider<ZodTypeProvider>()

  // TREE
  typedFastify.get('/tree', async () => {
    const { service } = createLibraryModule(fastify.prisma)
    return await service.getTree()
  })

  // VERSE
  typedFastify.get(
    '/verse/:id',
    { schema: { params: VerseParamsSchema } },
    async (request, reply) => {
      const { service } = createLibraryModule(fastify.prisma)
      const { id } = request.params
      const verse = await service.getVerse(id)

      if (!verse) {
        return reply.status(404).send({ error: 'Verse not found' })
      }

      return verse
    }
  )

  // SEARCH
  typedFastify.get(
    '/search',
    { schema: { querystring: SearchQuerySchema } },
    async (request) => {
      const { q } = request.query
      return await searchByKeyword(q)
    }
  )

  // TAGS
  typedFastify.get('/tags', async () => {
    const { service } = createLibraryModule(fastify.prisma)
    return await service.getTags()
  })

  // RELATED
  typedFastify.get('/related/:id', async (request) => {
    const { id } = request.params as { id: string }
    const { service } = createLibraryModule(fastify.prisma)
    return await service.getRelated(id)
  })
}