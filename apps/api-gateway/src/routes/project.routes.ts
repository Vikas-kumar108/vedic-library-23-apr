import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { ProjectService } from '../services/project.service'
import { OrgParamsSchema } from '../schemas/institutional.schema'
import { z } from 'zod'

export default async function projectRoutes(fastify: FastifyInstance) {
  const typedFastify = fastify.withTypeProvider<ZodTypeProvider>()

  // 1. Institutional Blueprint (Projects)
  typedFastify.get('/', {
    schema: { querystring: OrgParamsSchema }
  }, async (request) => {
    const service = new ProjectService(request.server.prisma)
    const { orgId } = request.query
    return await service.getInstitutionalBlueprint(orgId)
  })

  // 2. Create Project
  typedFastify.post('/', async (request, reply) => {
    const schema = z.object({
      org_id: z.string().uuid(),
      name: z.string().min(1),
      description: z.string().optional(),
      total_budget: z.number().min(0)
    })
    
    const body = schema.parse(request.body)
    const service = new ProjectService(request.server.prisma)
    const project = await service.createProject(body)
    return reply.code(201).send(project)
  })
}
