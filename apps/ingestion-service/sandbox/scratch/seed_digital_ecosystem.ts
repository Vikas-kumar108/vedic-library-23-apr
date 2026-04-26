import { PrismaClient } from '@dharma/data-access'
import crypto from 'crypto'

const prisma = new PrismaClient()

async function main() {
  console.log('🛰️ SEEDING INSTITUTIONAL DIGITAL ECOSYSTEM...')

  const org = await prisma.organization.findFirst()
  if (!org) {
    console.log('❌ No organization found.')
    return
  }

  // 1. Create External Integrations
  const integrations = [
    { service: 'SENDGRID', is_active: true },
    { service: 'TWILIO', is_active: true },
    { service: 'GITA_API', is_active: true }
  ]

  for (const item of integrations) {
    await prisma.$executeRawUnsafe(
      `INSERT INTO external_integrations (id, org_id, service, is_active, config) VALUES ($1::uuid, $2::uuid, $3::integration_service_enum, $4, '{}'::jsonb)`,
      crypto.randomUUID(), org.id, item.service, item.is_active
    )
  }

  // 2. Create Webhook Event Logs (Incoming for now)
  const events = [
    { provider: 'Stripe', type: 'payment_intent.succeeded', extId: 'evt_123' },
    { provider: 'Twilio', type: 'message.delivered', extId: 'msg_456' },
    { provider: 'SendGrid', type: 'email.opened', extId: 'sg_789' }
  ]

  for (const e of events) {
    await prisma.$executeRawUnsafe(
      `INSERT INTO webhook_events (id, provider, event_type, external_id, payload, status) VALUES ($1::uuid, $2, $3, $4, '{}'::jsonb, 'PROCESSED'::webhook_status_enum)`,
      crypto.randomUUID(), e.provider, e.type, e.extId
    )
  }

  console.log('✅ Digital Ecosystem Seeded.')
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())
