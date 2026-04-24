import { PrismaClient } from '@dharma/data-access'
import crypto from 'crypto'

const prisma = new PrismaClient()

async function main() {
  console.log('👥 SEEDING INSTITUTIONAL HUMAN CAPITAL...')

  const org = await prisma.organization.findFirst()
  const period = await prisma.financialPeriod.findFirst()
  
  if (!org || !period) {
    console.log('❌ No organization or financial period found.')
    return
  }

  const suffix = Date.now().toString().slice(-4)
  const staff = [
    { name: 'Arjuna Pandava', role: 'CHIEF_ADMINISTRATOR', email: `arjuna.${suffix}@vedic.org` },
    { name: 'Vidura Dharma', role: 'ETHICS_OFFICER', email: `vidura.${suffix}@vedic.org` }
  ]

  const orgMemberIds = []
  const staffUserIds = []

  for (const s of staff) {
    const userId = crypto.randomUUID()
    const memberId = crypto.randomUUID()

    await prisma.$executeRawUnsafe(
        `INSERT INTO users (id, email, roles, status) VALUES ($1::uuid, $2, ARRAY['admin'::user_role_enum], 'ACTIVE')`,
        userId, s.email
    )
    await prisma.$executeRawUnsafe(
        `INSERT INTO user_profiles (user_id, full_name) VALUES ($1::uuid, $2)`,
        userId, s.name
    )
    await prisma.$executeRawUnsafe(
        `INSERT INTO org_members (id, org_id, user_id, role) VALUES ($1::uuid, $2::uuid, $3::uuid, $4)`,
        memberId, org.id, userId, s.role
    )
    orgMemberIds.push(memberId)
    staffUserIds.push(userId)
  }

  // 2. Create Payroll Records
  for (const memberId of orgMemberIds) {
    await prisma.$executeRawUnsafe(
        `INSERT INTO payroll_records (id, org_member_id, period_id, amount, status, type) VALUES ($1::uuid, $2::uuid, $3::uuid, 125000, 'PROCESSED', 'SALARY')`,
        crypto.randomUUID(), memberId, period.id
    )
  }

  // 3. Create Spiritual Guidance Data
  const mentorId = staffUserIds[1] // Vidura
  const seekerId = crypto.randomUUID()
  const assignmentId = crypto.randomUUID()

  await prisma.$executeRawUnsafe(
    `INSERT INTO users (id, email, roles, status) VALUES ($1::uuid, $2, ARRAY['student'::user_role_enum], 'ACTIVE')`,
    seekerId, `seeker.${suffix}@wisdom.org`
  )
  await prisma.$executeRawUnsafe(
    `INSERT INTO user_profiles (user_id, full_name) VALUES ($1::uuid, 'Yudhisthira Seeker')`,
    seekerId
  )

  await prisma.$executeRawUnsafe(
    `INSERT INTO guidance_assignments (id, guide_id, student_id, assignment_type, subject, status) VALUES ($1::uuid, $2::uuid, $3::uuid, 'mentor'::assignment_type_enum, 'Dharma & Governance', 'ACTIVE'::guidance_status_enum)`,
    assignmentId, mentorId, seekerId
  )

  await prisma.$executeRawUnsafe(
    `INSERT INTO guidance_sessions (id, assignment_id, topic, session_date) VALUES ($1::uuid, $2::uuid, 'Introduction to Raja Dharma', NOW() + interval '2 days')`,
    crypto.randomUUID(), assignmentId
  )

  console.log('✅ Human Capital Seeded.')
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())
