import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { AcademyService } from '../services/academy.service'
import { OrgParamsSchema } from '../schemas/institutional.schema'

export default async function academyRoutes(fastify: FastifyInstance) {
  const typedFastify = fastify.withTypeProvider<ZodTypeProvider>()

  // 1. Seeker Academy Pulse
  typedFastify.get('/pulse', async (request) => {
    const service = new AcademyService(request.server.prisma)
    const { orgId } = request.query as { orgId: string }
    return await service.getCommunityPulse(orgId)
  })

  // 2. Individual Seeker Profile
  typedFastify.get('/seeker/:userId', async (request) => {
    const service = new AcademyService(request.server.prisma)
    const { userId } = request.params as { userId: string }
    return await service.getSeekerProfile(userId)
  })

  // 3. Mentor Profile
  typedFastify.get('/mentor/:id', async (request) => {
    const service = new AcademyService(request.server.prisma)
    const { id } = request.params as { id: string }
    return await service.getMentorProfile(id)
  })
}
