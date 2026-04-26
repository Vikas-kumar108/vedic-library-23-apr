import { PrismaClient } from '@dharma/data-access'
import dotenv from 'dotenv'

dotenv.config()
const prisma = new PrismaClient()

async function main() {
  console.log('🔍 COMMENCING FINAL INSTITUTIONAL AUDIT...')
  console.log('------------------------------------------')

  const tables = [
    { name: 'Community Members', model: prisma.user },
    { name: 'Financial Transactions', model: prisma.transaction },
    { name: 'Legal Documents (Vault)', model: prisma.legalDocument },
    { name: 'Compliance Records (Heartbeat)', model: prisma.complianceRecord },
    { name: 'Communication Campaigns (Voice)', model: prisma.communicationCampaign },
    { name: 'Organizations', model: prisma.organization },
    { name: 'Financial Accounts', model: prisma.financialAccount }
  ]

  let totalDeficiency = 0

  for (const table of tables) {
    const count = await (table.model as any).count()
    const status = count >= 20 ? '✅ MANIFEST' : count > 0 ? '⚠️ PARTIAL' : '❌ EMPTY'
    
    console.log(`${table.name.padEnd(35)}: ${count} rows [${status}]`)
    
    if (count < 20 && table.name !== 'Organizations' && table.name !== 'Financial Accounts') {
      totalDeficiency++
    }
  }

  console.log('------------------------------------------')
  if (totalDeficiency === 0) {
    console.log('🌟 AUDIT COMPLETE: THE INSTITUTION IS 100% MANIFEST! 🌟')
  } else {
    console.log(`⚠️ AUDIT COMPLETE: ${totalDeficiency} MODULES REQUIRE MORE DATA.`)
  }
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
