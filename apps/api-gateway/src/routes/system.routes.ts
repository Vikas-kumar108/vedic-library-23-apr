import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { TaskOrchestrator } from '../services/task-orchestrator.service'
import { IntegrationRegistry } from '../integrations/registry'

export default async function systemRoutes(fastify: FastifyInstance) {
  const typedFastify = fastify.withTypeProvider<ZodTypeProvider>()

  // 1. Task Monitor
  typedFastify.get('/tasks', async (request) => {
    const service = new TaskOrchestrator(request.server.prisma)
    return await service.getTaskPulse()
  })

  // 2. Task Trigger
  typedFastify.post('/tasks/trigger', async (request, reply) => {
    const service = new TaskOrchestrator(request.server.prisma)
    const { type, payload } = request.body as any
    await service.enqueue(type, payload)
    return reply.code(201).send({ status: 'ENQUEUED' })
  })

  // 3. Proclamation (Email)
  typedFastify.post('/proclaim', async (request, reply) => {
    const { email } = request.body as { email: string }
    const service = IntegrationRegistry.getEmailService()
    
    const success = await service.sendEmail({
      to: email || 'test@test.com',
      subject: '🏛️ Institutional Proclamation',
      body: 'VIOS Communication Pillar is Live.',
      html: `<h1>Institutional Proclamation</h1><p>The system is operational.</p>`
    })

    return { success }
  })
}
