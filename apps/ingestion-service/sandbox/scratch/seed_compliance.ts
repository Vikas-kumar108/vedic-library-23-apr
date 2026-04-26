import { PrismaClient } from '@dharma/data-access'
import crypto from 'crypto'

const prisma = new PrismaClient()

async function main() {
  console.log('⚖️ SEEDING INSTITUTIONAL COMPLIANCE VAULT...')

  const org = await prisma.organization.findFirst()
  if (!org) {
    console.log('❌ No organization found.')
    return
  }

  // 1. Create a Partner Organization
  const partnerId = crypto.randomUUID()
  await prisma.$executeRawUnsafe(
    `INSERT INTO partner_organizations (id, name, type, contact_person, registration_number) VALUES ($1::uuid, 'Universal Shastra Foundation', 'NGO'::partner_type_enum, 'Sri Krishna Das', 'REG-USF-2024')`,
    partnerId
  )

  // 2. Create a Partnership
  const pId = crypto.randomUUID()
  await prisma.$executeRawUnsafe(
    `INSERT INTO partnerships (id, org_id, partner_id, title, status, start_date) VALUES ($1::uuid, $2::uuid, $3::uuid, 'Vedic Heritage Preservation Deed', 'ACTIVE'::grant_status_enum, '2024-01-01'::date)`,
    pId, org.id, partnerId
  )

  // 3. Create a Grant linked to this partnership
  const grantId = crypto.randomUUID()
  await prisma.$executeRawUnsafe(
    `INSERT INTO grants (id, partnership_id, amount, purpose, status) VALUES ($1::uuid, $2::uuid, 2500000, 'Digitization of Bhagavad Gītā Manuscripts', 'ACTIVE'::grant_status_enum)`,
    grantId, pId
  )

  // 4. Create a Utilization Certificate (UC)
  const ucId = crypto.randomUUID()
  await prisma.$executeRawUnsafe(
    `INSERT INTO utilization_certificates (id, grant_id, status, submitted_at, total_received, total_utilized, unspent_amount) VALUES ($1::uuid, $2::uuid, 'COMPLETED'::compliance_status_enum, NOW(), 2500000, 2000000, 500000)`,
    ucId, grantId
  )

  // 5. Compliance Tasks
  const taskId = crypto.randomUUID()
  await prisma.$executeRawUnsafe(
    `INSERT INTO compliance_tasks (id, org_id, title, type, due_date, status) VALUES ($1::uuid, $2::uuid, 'Annual FCRA Return Filing', 'TAXATION', '2024-12-31'::date, 'UPCOMING'::compliance_status_enum)`,
    taskId, org.id
  )

  console.log('✅ Compliance Vault Seeded.')
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())
