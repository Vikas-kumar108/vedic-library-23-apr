import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { createLibraryModule } from '../modules/knowledge/library'
import { searchByKeyword } from '@dharma/search-domain'
import { VerseParamsSchema, SearchQuerySchema } from '../schemas/library.schema'
import { AuthService } from '../services/auth.service'
import { IntegrationRegistry } from '../integrations/registry'

export default async function libraryRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  const typedFastify = fastify.withTypeProvider<ZodTypeProvider>()
  const emailService = IntegrationRegistry.getEmailService()
  const authService = new AuthService(fastify.prisma, emailService)

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
      
      // Security Layer: Extract identity for history tracking
      let userId: string | undefined = undefined
      const authHeader = request.headers.authorization
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1]
        try {
          const decoded = await authService.validateToken(token)
          userId = decoded.id
        } catch (e) {
          // Proceed as anonymous if token is invalid
        }
      }

      const verse = await service.getVerse(id, userId)

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