import { PrismaClient } from '@dharma/data-access'

export class IntegrationService {
  constructor(private prisma: PrismaClient) {}

  async getIntegrationsOverview(orgId: string) {
    const [integrations, webhooks] = await Promise.all([
      this.prisma.external_integrations.findMany({
        where: { org_id: orgId }
      }),
      this.prisma.webhook_events.findMany({
        orderBy: { created_at: 'desc' },
        take: 20
      })
    ])

    // Normalize integrations for UI
    const normalizedIntegrations = integrations.map(i => ({
        id: i.id,
        name: i.service,
        type: 'API_INTEGRATION',
        status: i.is_active ? 'ACTIVE' : 'INACTIVE',
        createdAt: i.created_at
    }))

    // Normalize webhooks for UI
    const normalizedEvents = webhooks.map(w => ({
        id: w.id,
        eventType: `${w.provider}: ${w.event_type}`,
        payload: w.payload,
        status: w.status === 'PROCESSED' ? 'SUCCESS' : 'PENDING',
        createdAt: w.created_at
    }))

    return {
      integrations: normalizedIntegrations,
      recentEvents: normalizedEvents,
      stats: {
        activeWebhooks: normalizedIntegrations.length,
        totalEventsLast24h: normalizedEvents.length,
        failureRate: '0.0%'
      }
    }
  }
}
