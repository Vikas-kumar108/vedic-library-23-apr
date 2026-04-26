import { createDiscoveryModule } from '../modules/knowledge/discovery'
import { z } from 'zod'

export default async function discoveryRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  const { service: discoveryService } = createDiscoveryModule(fastify.prisma)

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
    const { stage, tags } = z.object({
      stage: z.string().optional(),
      tags: z.string().optional() // Comma separated
    }).parse(request.query)

    try {
      const tagList = tags ? tags.split(',') : []
      const results = await discoveryService.getRecommended(Number(stage) || 1, tagList)
      return reply.send(results)
    } catch (error: any) {
      return reply.code(400).send({ error: error.message })
    }
  })
}
