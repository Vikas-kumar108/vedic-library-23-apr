import { PrismaClient } from '@dharma/data-access'
import dotenv from 'dotenv'

dotenv.config()
const prisma = new PrismaClient()

async function main() {
  console.log('📊 AUDITING USER-DASHBOARD DATA DENSITY...')
  console.log('------------------------------------------')

  const tables = [
    { name: 'Users', model: prisma.user },
    { name: 'Nodes (Books/Verses)', model: prisma.node },
    { name: 'Learning Curves (Courses)', model: prisma.learningCurve },
    { name: 'Learning Curve Steps', model: prisma.learningCurveStep },
    { name: 'Contributions (In-Kind/Cash)', model: prisma.contribution },
    { name: 'Vedic Events (Sangha)', model: prisma.vedicEvent },
    { name: 'User Statistics', model: prisma.userStatistics },
    { name: 'Audit Logs (Transparency)', model: prisma.auditLog },
    { name: 'Communication Campaigns', model: prisma.communicationCampaign },
    { name: 'Life Journey Stages', model: prisma.lifeJourneyStage }
  ]

  for (const table of tables) {
    // @ts-ignore
    const count = await table.model.count()
    const status = count >= 20 ? '✅ MANIFEST' : count > 0 ? '⚠️ PARTIAL' : '❌ EMPTY'
    console.log(`${table.name.padEnd(30)}: ${count} rows [${status}]`)
  }

  console.log('------------------------------------------')
  console.log('✅ DASHBOARD AUDIT COMPLETE.')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
