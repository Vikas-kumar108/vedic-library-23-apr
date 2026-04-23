import { PrismaClient } from '@dharma/data-access'
import dotenv from 'dotenv'

dotenv.config()
const prisma = new PrismaClient()

const CAMPAIGN_DATA = [
  { "title": "Gita Jayanti Special Broadcast", "content": "Join us in celebrating Gita Jayanti with special readings and reflections on Bhagavad-gita. Let us deepen our understanding together.", "channel": "WhatsApp" },
  { "title": "Weekly Spiritual Reminder", "content": "Take a moment today for chanting and reflection. Even a few minutes of devotion brings clarity and peace.", "channel": "SMS" },
  { "title": "New Booklet Release Announcement", "content": "Our new booklet on 'Dharma in Daily Life' is now available. Download and begin your journey today.", "channel": "Email" },
  { "title": "Youth Program Invitation", "content": "We are आयोजन a youth development program this weekend. Join us for learning, growth, and connection.", "channel": "WhatsApp" },
  { "title": "Donor Appreciation Message", "content": "We sincerely thank you for your generous support. Your contribution is making a real difference in the community.", "channel": "Email" },
  { "title": "Festival Announcement - Janmashtami", "content": "Celebrate Janmashtami with us! Join for kirtan, prasadam, and spiritual festivities.", "channel": "WhatsApp" },
  { "title": "Daily Thought Message", "content": "Remember: true happiness comes from service and devotion. Stay connected to your spiritual purpose.", "channel": "SMS" },
  { "title": "Course Enrollment Open", "content": "Registrations are now open for our online Bhagavad-gita course. Secure your seat today.", "channel": "Email" },
  { "title": "Village Outreach Update", "content": "Our recent village outreach program benefited over 200 families. Thank you for being part of this mission.", "channel": "WhatsApp" },
  { "title": "Volunteer Call", "content": "We are looking for volunteers for upcoming events. Your service can create meaningful impact.", "channel": "Email" },
  { "title": "Monthly Newsletter", "content": "Explore this month’s highlights, teachings, and activities. Stay connected with our growing community.", "channel": "Email" },
  { "title": "Meditation Session Reminder", "content": "Join our guided meditation session this evening and experience inner calm and clarity.", "channel": "WhatsApp" },
  { "title": "Book Distribution Drive", "content": "Participate in our book distribution drive and help spread spiritual knowledge in your community.", "channel": "SMS" },
  { "title": "Special Donation Appeal", "content": "Support our education initiative for village children. Your contribution can transform lives.", "channel": "Email" },
  { "title": "Event Reminder Notification", "content": "Reminder: Our community event is happening tomorrow. We look forward to your presence.", "channel": "SMS" },
  { "title": "Health Camp Announcement", "content": "A free medical camp is being आयोजित this week. Inform your community and join us.", "channel": "WhatsApp" },
  { "title": "Spiritual Quote of the Day", "content": "“One who is devoted to the Lord finds peace within.” Reflect on this today.", "channel": "SMS" },
  { "title": "CSR Impact Report Sharing", "content": "We are pleased to share our latest CSR impact report. See how your support is creating change.", "channel": "Email" },
  { "title": "Festival Seva Opportunity", "content": "Offer your service in upcoming festival preparations. Seva brings joy and purification.", "channel": "WhatsApp" },
  { "title": "New Article Notification", "content": "A new article on 'Balancing Dharma and Daily Life' is now available on our platform. Read and reflect.", "channel": "Email" }
]

async function main() {
  console.log('📬 MANIFESTING MULTI-CHANNEL VOICE...')
  
  // 1. Fetch Root Organization
  const org = await prisma.organization.findUnique({
    where: { id: '00000000-0000-0000-0000-000000000001' }
  })

  if (!org) {
    console.error('❌ ROOT ORGANIZATION NOT FOUND.')
    process.exit(1)
  }

  // 2. Seed Campaigns
  for (const c of CAMPAIGN_DATA) {
    await prisma.communicationCampaign.create({
      data: {
        orgId: org.id,
        title: c.title,
        content: c.content,
        type: c.channel.toUpperCase(),
        status: 'DRAFT'
      }
    })
    console.log(`Drafted: ${c.title} via ${c.channel}`)
  }

  console.log('✅ OUTREACH MANIFESTATION COMPLETE.')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
