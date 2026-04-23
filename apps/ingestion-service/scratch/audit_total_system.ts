import { PrismaClient } from '@dharma/data-access'
import dotenv from 'dotenv'

dotenv.config()
const prisma = new PrismaClient()

async function main() {
  console.log('🌐 TOTAL WEB-PORTAL SYSTEM AUDIT...')
  console.log('------------------------------------------')

  const groups = [
    {
      name: '🏛️ CORE INFRASTRUCTURE',
      tables: [
        { name: 'Organizations', model: prisma.organization },
        { name: 'Org Members', model: prisma.orgMember },
        { name: 'Subscription Tiers', model: prisma.subscriptionTier },
      ]
    },
    {
      name: '🤝 COMMUNITY & CRM',
      tables: [
        { name: 'Users (Seekers/Donors)', model: prisma.user },
        { name: 'User Statistics', model: prisma.userStatistics },
        { name: 'Life Journey Stages', model: prisma.lifeJourneyStage },
        { name: 'Family Links', model: prisma.familyLink },
      ]
    },
    {
      name: '💰 FINANCIAL MANAGEMENT',
      tables: [
        { name: 'Transactions', model: prisma.transaction },
        { name: 'Contributions', model: prisma.contribution },
        { name: 'Expenses', model: prisma.expense },
        { name: 'Projects', model: prisma.project },
        { name: 'Financial Accounts', model: prisma.financialAccount },
      ]
    },
    {
      name: '⚖️ GOVERNANCE & VAULT',
      tables: [
        { name: 'Legal Documents', model: prisma.legalDocument },
        { name: 'Compliance Records', model: prisma.complianceRecord },
        { name: 'Audit Logs', model: prisma.auditLog },
        { name: 'Secure Share Links', model: prisma.secureShareLink },
      ]
    },
    {
      name: '📢 COMMUNICATION HUB',
      tables: [
        { name: 'Campaigns', model: prisma.communicationCampaign },
        { name: 'Vedic Events', model: prisma.vedicEvent },
      ]
    },
    {
      name: '📚 WISDOM & LEARNING',
      tables: [
        { name: 'Nodes (Books/Verses)', model: prisma.node },
        { name: 'Learning Curves', model: prisma.learningCurve },
        { name: 'Learning Curve Steps', model: prisma.learningCurveStep },
        { name: 'Guidance Sessions', model: prisma.guidanceSession },
      ]
    }
  ]

  for (const group of groups) {
    console.log(`\n${group.name}`)
    for (const table of group.tables) {
      // @ts-ignore
      const count = await table.model.count()
      const status = count >= 20 ? '✅ MANIFEST' : count > 0 ? '⚠️ PARTIAL' : '❌ EMPTY'
      console.log(`  ${table.name.padEnd(25)}: ${count} rows [${status}]`)
    }
  }

  console.log('\n------------------------------------------')
  console.log('✅ TOTAL SYSTEM AUDIT COMPLETE.')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
