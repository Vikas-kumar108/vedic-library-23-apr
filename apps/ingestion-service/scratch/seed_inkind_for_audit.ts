import { PrismaClient } from '@dharma/data-access'
import dotenv from 'dotenv'

dotenv.config()
const prisma = new PrismaClient()

async function main() {
  console.log('🌱 SEEDING IN-KIND DONATIONS FOR AUDIT...')

  const users = await prisma.user.findMany({ take: 3 })
  if (users.length < 3) {
    console.error('❌ NOT ENOUGH USERS TO SEED.')
    return
  }

  const lastMonthDate = new Date()
  lastMonthDate.setMonth(lastMonthDate.getMonth() - 1)
  lastMonthDate.setDate(15) // Mid of last month

  // 1. Seed In-Kind Donations
  const donations = [
    { userId: users[0].id, items: '500 Srimad Bhagavatam Sets', project: 'Global Distribution' },
    { userId: users[1].id, items: 'Solar Panels for Mayapur School', project: 'Mayapur School' },
    { userId: users[2].id, items: '1000kg Organic Grains', project: 'Annadan Program' }
  ]

  for (const d of donations) {
    // Create Project if not exists
    let project = await prisma.project.findFirst({ where: { name: d.project } })
    if (!project) {
      project = await prisma.project.create({
        data: {
          orgId: '00000000-0000-0000-0000-000000000001',
          name: d.project,
          description: `Project for ${d.project}`,
          status: 'ACTIVE',
          totalBudget: 0
        }
      })
    }

    await prisma.contribution.create({
      data: {
        orgId: '00000000-0000-0000-0000-000000000001',
        userId: d.userId,
        projectId: project.id,
        type: 'IN_KIND',
        item: d.items,
        date: lastMonthDate
      }
    })

    // Seed "Thanks" for the first two only to test the audit
    if (d.userId !== users[2].id) {
       await prisma.auditLog.create({
         data: {
           performedById: d.userId, 
           action: 'SENT_THANKS_MESSAGE',
           newData: { message: `Thank you for donating ${d.items}` }
         }
       })
    }

    console.log(`Seeded: ${d.items} from ${users.find(u => u.id === d.userId)?.full_name}`)
  }

  console.log('✅ SEED COMPLETE.')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
