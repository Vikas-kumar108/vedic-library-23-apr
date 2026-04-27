import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { createDiscoveryModule } from '../modules/knowledge/discovery'
import { AuthService } from '../services/auth.service'
import { IntegrationRegistry } from '../integrations/registry'
import { z } from 'zod'

export default async function discoveryRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  const { service: discoveryService } = createDiscoveryModule(fastify.prisma)
  const emailService = IntegrationRegistry.getEmailService()
  const authService = new AuthService(fastify.prisma, emailService)

  fastify.get('/search', async (request, reply) => {
    const { q, stage } = z.object({
      q: z.string().min(1),
      stage: z.string().optional(),
    }).parse(request.query)

    try {
      const results = await discoveryService.searchPractical(q, Number(stage) || 1)
      return reply.send(results)
    } catch (error: any) {
      return reply.code(400).send({ error: error.message })
    }
  })

  fastify.get('/tag/:id', async (request, reply) => {
    const { id } = z.object({ id: z.string() }).parse(request.params)
    try {
      const nodes = await discoveryService.getNodesByTag(id)
      return reply.send(nodes)
    } catch (error: any) {
      return reply.code(400).send({ error: error.message })
    }
  })

  fastify.get('/recommend', async (request, reply) => {
    const { stage, tags, userId: queryUserId } = z.object({
      stage: z.string().optional(),
      tags: z.string().optional(), // Comma separated
      userId: z.string().optional()
    }).parse(request.query)

    let finalUserId: string | undefined = undefined

    // 1. Security Layer: Identity Enforcement
    const authHeader = request.headers.authorization
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1]
      try {
        const decoded = await authService.validateToken(token)
        const tokenUserId = decoded.id

        // Prevent cross-user enumeration
        if (queryUserId && queryUserId !== tokenUserId) {
          return reply.code(403).send({ error: 'Access Denied: You can only fetch recommendations for your own profile.' })
        }
        
        finalUserId = tokenUserId
      } catch (e) {
        // Treat invalid tokens as anonymous requests
        finalUserId = undefined
      }
    }

    // 2. Fetch Results (Service handles anonymous vs personalized logic)
    try {
      const tagList = tags ? tags.split(',') : []
      const results = await discoveryService.getRecommended(finalUserId, tagList, Number(stage) || undefined)
      return reply.send(results)
    } catch (error: any) {
      return reply.code(400).send({ error: error.message })
    }
  })
}
