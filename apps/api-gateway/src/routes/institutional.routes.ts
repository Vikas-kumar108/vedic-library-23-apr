import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { InstitutionalService } from '../services/institutional.service'
import { OrgParamsSchema, LedgerQuerySchema } from '../schemas/institutional.schema'

export default async function institutionalRoutes(fastify: FastifyInstance) {
  const typedFastify = fastify.withTypeProvider<ZodTypeProvider>()

  // 1. Institutional Overview
  typedFastify.get('/overview/:orgId', {
    schema: { params: OrgParamsSchema }
  }, async (request) => {
    const service = new InstitutionalService(request.server.prisma)
    const { orgId } = request.params
    return await service.getOverview(orgId)
  })

  // 2. Grant Management
  typedFastify.get('/grants/:orgId', {
    schema: { params: OrgParamsSchema }
  }, async (request) => {
    const service = new InstitutionalService(request.server.prisma)
    const { orgId } = request.params
    return await service.getGrants(orgId)
  })

  // 3. Audit Ledger
  typedFastify.get('/ledger/:orgId', {
    schema: { 
      params: OrgParamsSchema,
      querystring: LedgerQuerySchema
    }
  }, async (request) => {
    const service = new InstitutionalService(request.server.prisma)
    const { orgId } = request.params
    const { limit, offset } = request.query
    return await service.getLedger(orgId, limit, offset)
  })
}
