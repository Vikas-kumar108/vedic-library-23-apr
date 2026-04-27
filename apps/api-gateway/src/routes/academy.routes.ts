import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { AcademyService } from '../services/academy.service'
import { OrgParamsSchema } from '../schemas/institutional.schema'
import { z } from 'zod'

export default async function academyRoutes(fastify: FastifyInstance) {
  const typedFastify = fastify.withTypeProvider<ZodTypeProvider>()

  // 1. Seeker Academy Pulse
  typedFastify.get('/pulse', {
    schema: { querystring: OrgParamsSchema }
  }, async (request) => {
    const service = new AcademyService(request.server.prisma)
    const { orgId } = request.query
    return await service.getCommunityPulse(orgId)
  })

  // 2. Individual Seeker Profile
  typedFastify.get('/seeker/:userId', {
    schema: { params: z.object({ userId: z.string().uuid() }) }
  }, async (request) => {
    const service = new AcademyService(request.server.prisma)
    const { userId } = request.params
    return await service.getSeekerProfile(userId)
  })

  // 3. Mentor Profile
  typedFastify.get('/mentor/:id', {
    schema: { params: z.object({ id: z.string().uuid() }) }
  }, async (request) => {
    const service = new AcademyService(request.server.prisma)
    const { id } = request.params
    return await service.getMentorProfile(id)
  })

  // 4. Learning Curves (Courses)
  typedFastify.get('/courses', async (request) => {
    const service = new AcademyService(request.server.prisma)
    return await service.getLearningCurves()
  })
}
