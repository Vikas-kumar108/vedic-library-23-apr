import { PrismaClient } from '@dharma/data-access'
import dotenv from 'dotenv'

dotenv.config()
const prisma = new PrismaClient()

const COMPLIANCE_DATA = [
  { "title": "Annual General Meeting - FY24", "deadlineDate": "2026-09-30", "responsibleRole": "Director" },
  { "title": "Income Tax Return Filing - FY25", "deadlineDate": "2026-07-31", "responsibleRole": "Accountant" },
  { "title": "Audit Report Submission - FY25", "deadlineDate": "2026-09-30", "responsibleRole": "Accountant" },
  { "title": "80G Renewal Filing", "deadlineDate": "2027-12-31", "responsibleRole": "Director" },
  { "title": "12AB Renewal Filing", "deadlineDate": "2027-03-31", "responsibleRole": "Accountant" },
  { "title": "FCRA Annual Return Filing", "deadlineDate": "2026-12-31", "responsibleRole": "Accountant" },
  { "title": "CSR Annual Report Submission", "deadlineDate": "2026-08-31", "responsibleRole": "Director" },
  { "title": "Quarterly Financial Review - Q1", "deadlineDate": "2026-06-30", "responsibleRole": "Accountant" },
  { "title": "Quarterly Financial Review - Q2", "deadlineDate": "2026-09-30", "responsibleRole": "Accountant" },
  { "title": "Quarterly Financial Review - Q3", "deadlineDate": "2026-12-31", "responsibleRole": "Accountant" },
  { "title": "Quarterly Financial Review - Q4", "deadlineDate": "2027-03-31", "responsibleRole": "Accountant" },
  { "title": "Board Meeting - First Half", "deadlineDate": "2026-07-15", "responsibleRole": "Director" },
  { "title": "Board Meeting - Second Half", "deadlineDate": "2026-12-15", "responsibleRole": "Director" },
  { "title": "GST Return Filing - Q1", "deadlineDate": "2026-07-20", "responsibleRole": "Accountant" },
  { "title": "GST Return Filing - Q2", "deadlineDate": "2026-10-20", "responsibleRole": "Accountant" },
  { "title": "GST Return Filing - Q3", "deadlineDate": "2027-01-20", "responsibleRole": "Accountant" },
  { "title": "GST Return Filing - Q4", "deadlineDate": "2027-04-20", "responsibleRole": "Accountant" },
  { "title": "Annual Activity Report Submission", "deadlineDate": "2026-08-15", "responsibleRole": "Director" },
  { "title": "Donor Transparency Report Release", "deadlineDate": "2026-09-10", "responsibleRole": "Director" },
  { "title": "Internal Policy Review and Update", "deadlineDate": "2026-11-30", "responsibleRole": "Director" }
]

async function main() {
  console.log('📅 MANIFESTING COMPLIANCE HEARTBEAT...')
  
  // 1. Fetch Root Organization
  const org = await prisma.organization.findUnique({
    where: { id: '00000000-0000-0000-0000-000000000001' }
  })

  if (!org) {
    console.error('❌ ROOT ORGANIZATION NOT FOUND.')
    process.exit(1)
  }

  // 2. Seed Compliance Records
  for (const c of COMPLIANCE_DATA) {
    let type = 'GOVERNANCE'
    if (c.title.includes('Tax') || c.title.includes('GST') || c.title.includes('80G') || c.title.includes('12AB') || c.title.includes('FCRA')) type = 'TAX'
    if (c.title.includes('Audit') || c.title.includes('Review') || c.title.includes('Report')) type = 'AUDIT'

    let frequency = 'ANNUAL'
    if (c.title.includes('Quarterly') || c.title.includes('GST')) frequency = 'QUARTERLY'
    if (c.title.includes('Renewal')) frequency = 'ONCE'

    await prisma.complianceRecord.create({
      data: {
        orgId: org.id,
        name: c.title,
        type: type,
        frequency: frequency,
        dueDate: new Date(c.deadlineDate),
        status: 'PENDING'
      }
    })
    console.log(`Pulsing: ${c.title} (${type} - ${frequency})`)
  }

  console.log('✅ COMPLIANCE HEARTBEAT MANIFESTED.')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
