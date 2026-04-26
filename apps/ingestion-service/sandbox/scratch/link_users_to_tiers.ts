import { PrismaClient } from '@dharma/data-access'
import dotenv from 'dotenv'

dotenv.config()
const prisma = new PrismaClient()

async function main() {
  console.log('🔗 LINKING USERS TO SUBSCRIPTION TIERS...')

  // 1. Create Tiers if they don't exist
  const rootOrgId = '00000000-0000-0000-0000-000000000001'
  const getOrCreateTier = async (name: string, description: string, level: number) => {
    let tier = await prisma.subscriptionTier.findFirst({ where: { name } })
    if (!tier) {
      tier = await prisma.subscriptionTier.create({
        data: { name, description, level, orgId: rootOrgId }
      })
    }
    return tier
  }

  const seekers = await getOrCreateTier('Gita Seekers', 'Interested in learning Bhagavad-gita.', 1)
  const sadhakas = await getOrCreateTier('Sadhaka Community', 'Daily practitioners of Sadhana.', 3)
  const practitioners = await getOrCreateTier('Dharma Practitioners', 'Advanced practitioners and mentors.', 2)

  // 2. Fetch all users with their journey stages
  const users = await prisma.user.findMany({
    include: { journeyStage: true }
  })

  console.log(`Processing ${users.length} users...`)

  for (const user of users) {
    let tierId = null
    
    if (user.journeyStage) {
      if (user.journeyStage.name === 'Seeker') tierId = seekers.id
      else if (user.journeyStage.name === 'Sadhaka') tierId = sadhakas.id
      else if (user.journeyStage.name === 'Practitioner') tierId = practitioners.id
    }

    if (tierId) {
      await prisma.user.update({
        where: { id: user.id },
        data: { subscriptionTierId: tierId }
      })
      console.log(`Linked ${user.full_name} to ${tierId === seekers.id ? 'Seekers' : tierId === sadhakas.id ? 'Sadhakas' : 'Practitioners'}`)
    }
  }

  // 3. Link Campaigns to Tiers (for better UI)
  const campaigns = await prisma.communicationCampaign.findMany({ where: { targetTierId: null } })
  for (let i = 0; i < campaigns.length; i++) {
    const c = campaigns[i]
    let targetTierId = seekers.id
    if (i % 3 === 1) targetTierId = sadhakas.id
    if (i % 3 === 2) targetTierId = practitioners.id

    await prisma.communicationCampaign.update({
      where: { id: c.id },
      data: { targetTierId }
    })
  }

  console.log('✅ USER-TIER LINKING COMPLETE.')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
