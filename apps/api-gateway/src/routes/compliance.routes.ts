import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { ComplianceService } from '../services/compliance.service'
import { OrgParamsSchema } from '../schemas/institutional.schema'

export default async function complianceRoutes(fastify: FastifyInstance) {
  const typedFastify = fastify.withTypeProvider<ZodTypeProvider>()

  // 1. Compliance & Legal Overview
  typedFastify.get('/overview/:orgId', {
    schema: { params: OrgParamsSchema }
  }, async (request) => {
    const service = new ComplianceService(request.server.prisma)
    const { orgId } = request.params
    return await service.getComplianceOverview(orgId)
  })
}
