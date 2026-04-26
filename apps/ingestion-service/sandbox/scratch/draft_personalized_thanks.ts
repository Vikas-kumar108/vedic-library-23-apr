import { PrismaClient } from '@dharma/data-access'
import dotenv from 'dotenv'

dotenv.config()
const prisma = new PrismaClient()

async function main() {
  console.log('📝 DRAFTING PERSONALIZED THANKS CAMPAIGNS...')

  const rootOrgId = '00000000-0000-0000-0000-000000000001'
  
  // 1. Fetch In-Kind Donations from last month
  const now = new Date()
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0)

  const donations = await prisma.contribution.findMany({
    where: {
      type: 'IN_KIND',
      date: { gte: startOfLastMonth, lte: endOfLastMonth }
    },
    include: {
      user: { include: { journeyStage: true } },
      project: true
    }
  })

  // Group by user to avoid duplicate campaigns for same user if they donated twice
  const userDonations = new Map()
  donations.forEach(d => {
    if (!userDonations.has(d.userId)) {
      userDonations.set(d.userId, d)
    }
  })

  for (const [userId, d] of userDonations) {
    const user = d.user
    const item = d.item
    const project = d.project?.name || 'our community projects'
    const stage = user.journeyStage?.name || 'Seeker'

    let subject = ''
    let content = ''
    let tone = ''

    // Personalization Logic
    if (stage === 'Sadhaka') {
      tone = 'Respectful & Deep'
      subject = `Humble Gratitude for your Seva: ${item}`
      content = `Dear ${user.full_name}, Hare Krishna. We are deeply moved by your dedicated seva of ${item} for the ${project}. As a Sadhaka, your commitment to the mission is an inspiration. Your contribution directly supports our spiritual outreach. Thank you for your kindness.`
    } else if (stage === 'Practitioner') {
      tone = 'Warm & Commending'
      subject = `Your Impact on ${project}: Thank You!`
      content = `Dear ${user.full_name}, thank you for your generous gift of ${item}. Your support for the ${project} ensures that our practitioners have the resources they need to thrive. We value your presence in our community.`
    } else {
      tone = 'Welcoming & Encouraging'
      subject = `A Special Thanks for your Contribution`
      content = `Dear ${user.full_name}, welcome to the family! We received your donation of ${item} for the ${project}. It is beautiful to see such generosity as you begin your journey with us. We hope this grain of service grows into a forest of devotion.`
    }

    // Create Draft Campaign
    await prisma.communicationCampaign.create({
      data: {
        orgId: rootOrgId,
        title: `PERSONALIZED THANKS: ${user.full_name}`,
        content: content,
        type: 'EMAIL',
        status: 'DRAFT',
        targetTierId: user.subscriptionTierId // Link to their tier
      }
    })

    console.log(`Drafted for ${user.full_name} (${stage}): ${subject}`)
  }

  console.log('✅ ALL PERSONALIZED DRAFTS CREATED IN COMMUNICATION HUB.')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
