import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { InstitutionalService } from '../services/institutional.service'
import { AssetService } from '../services/asset.service'
import { ComplianceService } from '../services/compliance.service'
import { HumanCapitalService } from '../services/human-capital.service'
import { OrgParamsSchema, LedgerQuerySchema, CreateAssetSchema } from '../schemas/institutional.schema'

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

  // 4. Asset Management
  typedFastify.get('/assets/:orgId', {
    schema: { params: OrgParamsSchema }
  }, async (request) => {
    const service = new AssetService(request.server.prisma)
    const { orgId } = request.params
    return await service.listAssets(orgId)
  })

  typedFastify.post('/assets', {
    schema: { body: CreateAssetSchema }
  }, async (request, reply) => {
    const service = new AssetService(request.server.prisma)
    const asset = await service.createAsset(request.body as any)
    return reply.code(201).send(asset)
  })

  // 5. Compliance & Legal Audit
  typedFastify.get('/compliance/:orgId', {
    schema: { params: OrgParamsSchema }
  }, async (request) => {
    const service = new ComplianceService(request.server.prisma)
    const { orgId } = request.params
    return await service.getComplianceOverview(orgId)
  })

  // 6. Human Capital (Pillar VI)
  typedFastify.get('/human-capital/:orgId', {
    schema: { params: OrgParamsSchema }
  }, async (request) => {
    const service = new HumanCapitalService(request.server.prisma)
    const { orgId } = request.params
    return await service.getHROverview(orgId)
  })
}
