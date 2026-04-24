import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { InstitutionalService } from '../services/institutional.service'
import { AssetService } from '../services/asset.service'
import { ComplianceService } from '../services/compliance.service'
import { HumanCapitalService } from '../services/human-capital.service'
import { IntegrationService } from '../services/integration.service'
import { WisdomEngineService, WisdomContext } from '../services/wisdom-engine.service'
import { TaskOrchestrator } from '../services/task-orchestrator.service'
import { ProjectService } from '../services/project.service'
import { AcademyService } from '../services/academy.service'
import { IntegrationRegistry } from '../integrations/registry'
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

  // 7. Digital Ecosystem (Pillar VIII)
  typedFastify.get('/integrations/:orgId', {
    schema: { params: OrgParamsSchema }
  }, async (request) => {
    const service = new IntegrationService(request.server.prisma)
    const { orgId } = request.params
    return await service.getIntegrationsOverview(orgId)
  })

  typedFastify.post('/integrations/webhook', async (request, reply) => {
    const service = new IntegrationService(request.server.prisma)
    const webhook = await service.registerWebhook(request.body as any)
    return reply.code(201).send(webhook)
  })

  // 8. Vedic Wisdom Pulse
  typedFastify.get('/wisdom/pulse', async (request) => {
    const service = new WisdomEngineService(request.server.prisma)
    const { context } = request.query as { context: WisdomContext }
    return await service.getWisdomPulse(context || 'GOVERNANCE')
  })

  // 9. Institutional Task Monitor
  typedFastify.get('/system/tasks', async (request) => {
    const service = new TaskOrchestrator(request.server.prisma)
    return await service.getTaskPulse()
  })

  typedFastify.post('/system/tasks/trigger', async (request, reply) => {
    const service = new TaskOrchestrator(request.server.prisma)
    const { type, payload } = request.body as any
    await service.enqueue(type, payload)
    return reply.code(201).send({ status: 'ENQUEUED' })
  })

  // 10. Institutional Blueprint (Projects)
  typedFastify.get('/projects', async (request) => {
    const service = new ProjectService(request.server.prisma)
    const { orgId } = request.query as { orgId: string }
    return await service.getInstitutionalBlueprint(orgId)
  })

  typedFastify.post('/projects', async (request, reply) => {
    const service = new ProjectService(request.server.prisma)
    const project = await service.createProject(request.body as any)
    return reply.code(201).send(project)
  })

  // 11. Seeker Academy (Community Progress)
  typedFastify.get('/academy/pulse', async (request) => {
    const service = new AcademyService(request.server.prisma)
    const { orgId } = request.query as { orgId: string }
    return await service.getCommunityPulse(orgId)
  })

  typedFastify.get('/academy/seeker/:userId', async (request) => {
    const service = new AcademyService(request.server.prisma)
    const { userId } = request.params as { userId: string }
    return await service.getSeekerProfile(userId)
  })

  // 12. Institutional Proclamation (Email Test)
  typedFastify.post('/system/proclaim', async (request, reply) => {
    const { email } = request.body as { email: string }
    const service = IntegrationRegistry.getEmailService()
    
    const success = await service.sendEmail({
      to: email || 'vikas@test.com',
      subject: '🏛️ Institutional Proclamation: The Voice is Live',
      body: 'The Vedic Institutional Operating System has successfully manifest its communication pillar. All systems go.',
      html: `
        <div style="font-family: serif; background: #0f172a; color: #f1f5f9; padding: 40px; border-radius: 20px;">
          <h1 style="color: #818cf8; font-style: italic;">Institutional Proclamation</h1>
          <p style="font-size: 16px; line-height: 1.6;">
            The <b>Vedic Institutional Operating System (VIOS)</b> has successfully manifest its communication pillar. 
          </p>
          <div style="margin-top: 40px; border-top: 1px solid #334155; pt: 20px; font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; color: #64748b;">
            System State: Booming • Provider: Resend • Identity: ${process.env.INSTITUTIONAL_EMAIL_FROM || 'onboarding@resend.dev'}
          </div>
        </div>
      `
    })

    return { success }
  })

  // 13. Content Inventory & Health
  typedFastify.get('/content/health', async (request) => {
    const service = new InstitutionalService(request.server.prisma)
    return await service.getContentHealth()
  })
}
