import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { ProjectService } from '../services/project.service'

export default async function projectRoutes(fastify: FastifyInstance) {
  const typedFastify = fastify.withTypeProvider<ZodTypeProvider>()

  // 1. Institutional Blueprint (Projects)
  typedFastify.get('/', async (request) => {
    const service = new ProjectService(request.server.prisma)
    const { orgId } = request.query as { orgId: string }
    return await service.getInstitutionalBlueprint(orgId)
  })

  // 2. Create Project
  typedFastify.post('/', async (request, reply) => {
    const service = new ProjectService(request.server.prisma)
    const project = await service.createProject(request.body as any)
    return reply.code(201).send(project)
  })
}
