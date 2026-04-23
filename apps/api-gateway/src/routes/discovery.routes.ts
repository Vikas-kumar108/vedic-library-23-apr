import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { DiscoveryService } from '../services/discovery.service'
import { z } from 'zod'

export default async function discoveryRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  const discoveryService = new DiscoveryService(fastify.prisma)

  fastify.get('/search', async (request, reply) => {
    const { q, stage } = z.object({
      q: z.string().min(1),
      stage: z.string().optional(),
    }).parse(request.query)

    try {
      const results = await discoveryService.searchPractical(q, stage ? parseInt(stage) : 1)
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
}
