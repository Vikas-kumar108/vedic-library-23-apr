import { PrismaClient } from '@dharma/data-access'
import dotenv from 'dotenv'

dotenv.config()
const prisma = new PrismaClient()

async function main() {
  console.log('🔍 AUDITING AUDITOR/CA APPOINTMENTS & COMPLIANCE COMMUNICATIONS...')
  console.log('------------------------------------------------------------------')

  // 1. Find Organizations with Auditors/CAs/Accountants
  const members = await prisma.orgMember.findMany({
    where: {
      role: {
        in: ['AUDITOR', 'CA', 'ACCOUNTANT', 'ADVISOR', 'FINANCIAL_ADVISOR'],
        mode: 'insensitive' as any
      }
    },
    include: {
      organization: true,
      user: true
    }
  })

  console.log(`\n📋 APPOINTED PROFESSIONALS (${members.length}):`)
  if (members.length === 0) {
    console.log('  (None found with explicit CA/Auditor roles)')
  } else {
    members.forEach(m => {
      console.log(`  - Org: ${m.organization.name.padEnd(25)} | Role: ${m.role.padEnd(12)} | User: ${m.user.full_name || m.user.email}`)
    })
  }

  // 2. Check Upcoming/Overdue Compliances
  const compliances = await prisma.complianceRecord.findMany({
    where: {
      status: { in: ['UPCOMING', 'OVERDUE'] }
    },
    include: {
      organization: true,
      responsible: true,
      supervisor: true
    }
  })

  console.log(`\n⚖️ COMPLIANCE STATUS (${compliances.length}):`)
  compliances.forEach(c => {
    const responsible = c.responsible ? (c.responsible.full_name || c.responsible.email) : 'Unassigned'
    console.log(`  - Org: ${c.organization.name.padEnd(25)} | Name: ${c.name.padEnd(20)} | Due: ${c.dueDate.toISOString().split('T')[0]} | Status: ${c.status.padEnd(10)} | Resp: ${responsible}`)
  })

  // 3. Check for Communications sent for Compliances
  // We'll look for Communications or AuditLogs mentioning compliance
  const communications = await prisma.communicationCampaign.findMany({
    where: {
      OR: [
        { title: { contains: 'Compliance', mode: 'insensitive' as any } },
        { title: { contains: 'Reminder', mode: 'insensitive' as any } },
        { title: { contains: 'Due', mode: 'insensitive' as any } }
      ]
    },
    include: {
      organization: true
    }
  })

  console.log(`\n📢 COMPLIANCE COMMUNICATIONS (${communications.length}):`)
  communications.forEach(comm => {
    console.log(`  - Org: ${comm.organization.name.padEnd(25)} | Campaign: ${comm.title.padEnd(30)} | Status: ${comm.status}`)
  })

  // 4. Audit Log for Compliance actions
  const auditLogs = await prisma.auditLog.findMany({
    where: {
      OR: [
        { action: { contains: 'Compliance', mode: 'insensitive' as any } },
        { action: { contains: 'Reminder', mode: 'insensitive' as any } }
      ]
    },
    take: 10
  })

  console.log(`\n📜 RECENT COMPLIANCE AUDIT LOGS (${auditLogs.length}):`)
  auditLogs.forEach(log => {
    console.log(`  - Action: ${log.action.padEnd(20)} | Time: ${log.createdAt.toISOString()}`)
  })

  console.log('\n------------------------------------------------------------------')
  console.log('✅ AUDIT COMPLETE.')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
