import { PrismaClient } from '@dharma/data-access'
const prisma = new PrismaClient()

async function audit() {
  console.log('🚀 INSTITUTIONAL DATA AUDIT...')
  
  const tables = [
    'user', 'organization', 'orgMember', 'financialAccount', 
    'transaction', 'contribution', 'legalDocument', 
    'complianceRecord', 'project', 'communicationCampaign'
  ]

  const results = await Promise.all(
    tables.map(async (table) => {
      const count = await (prisma as any)[table].count()
      return { table, count }
    })
  )

  console.table(results)
  
  const empty = results.filter(r => r.count < 20)
  if (empty.length > 0) {
    console.log('\n⚠️ THE FOLLOWING TABLES NEED 20 DATA ROWS FOR MANIFESTATION:')
    empty.forEach(e => console.log(`- ${e.table} (Current: ${e.count})`))
  }
}

audit().catch(console.error)
