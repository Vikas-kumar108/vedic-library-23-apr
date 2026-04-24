import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { BroadcastService } from '../services/broadcast.service'
import { IntegrationRegistry } from '../integrations/registry'
import { z } from 'zod'

export default async function broadcastRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  const emailService = IntegrationRegistry.getEmailService()
  const broadcastService = new BroadcastService(fastify.prisma, emailService)

  const broadcastSchema = z.object({
    contentId: z.string(),
    criteria: z.object({
      role: z.string().optional(),
      stage: z.string().optional(),
      userIds: z.array(z.string()).optional(),
      allUsers: z.boolean().optional()
    })
  })

  fastify.post('/broadcast', async (request, reply) => {
    const { contentId, criteria } = broadcastSchema.parse(request.body)
    
    try {
      const result = await broadcastService.broadcastWisdom(contentId, criteria)
      return reply.code(200).send(result)
    } catch (error: any) {
      return reply.code(400).send({ error: error.message })
    }
  })
}
