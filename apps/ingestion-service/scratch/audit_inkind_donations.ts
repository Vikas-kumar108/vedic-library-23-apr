import { PrismaClient } from '@dharma/data-access'
import dotenv from 'dotenv'

dotenv.config()
const prisma = new PrismaClient()

async function main() {
  console.log('🔍 AUDITING IN-KIND DONATIONS (LAST MONTH)...')

  const now = new Date()
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0)

  const inKindDonations = await prisma.contribution.findMany({
    where: {
      type: 'IN_KIND',
      date: {
        gte: startOfLastMonth,
        lte: endOfLastMonth
      }
    },
    include: {
      user: true,
      project: true
    }
  })

  console.log(`Found ${inKindDonations.length} in-kind donations.`)

  for (const donation of inKindDonations) {
    // Check for communication logs to this user
    // Assuming CommunicationLog exists or we check CommunicationCampaign reach
    // Let's check for a general CommunicationLog or AuditLog
    const thanksLogs = await prisma.auditLog.findMany({
      where: {
        performedById: donation.userId,
        action: { contains: 'THANKS', mode: 'insensitive' }
      }
    })

    const hasReceivedThanks = thanksLogs.length > 0
    
    console.log('------------------------------------------')
    console.log(`Donor: ${donation.user.full_name}`)
    console.log(`Item: ${donation.item}`)
    console.log(`Project: ${donation.project?.name || 'General'}`)
    console.log(`Date: ${donation.date.toDateString()}`)
    console.log(`Thanks Received: ${hasReceivedThanks ? '✅ YES' : '❌ NO'}`)
  }

  console.log('------------------------------------------')
  console.log('✅ AUDIT COMPLETE.')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
