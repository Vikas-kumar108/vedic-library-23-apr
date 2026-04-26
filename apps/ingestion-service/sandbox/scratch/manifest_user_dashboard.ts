import { PrismaClient } from '@dharma/data-access'
import dotenv from 'dotenv'

dotenv.config()
const prisma = new PrismaClient()

async function main() {
  console.log('🚀 MANIFESTING USER DASHBOARD UNIVERSE...')

  const rootOrgId = '00000000-0000-0000-0000-000000000001'
  const users = await prisma.user.findMany({ take: 20 })

  // 1. MANIFEST LEARNING CURVES (COURSES) - 20 Records
  console.log('📚 Manifesting 20 Learning Curves...')
  for (let i = 1; i <= 20; i++) {
    const curve = await prisma.learningCurve.create({
      data: {
        title: `Vedic Wisdom Path ${i}: ${['Foundations', 'Philosophy', 'Practice', 'Leadership'][i % 4]}`,
        description: `A deep dive into the ${i}th dimension of Vedic science.`,
        steps: {
          create: [
            { title: 'The Call to Action', stepOrder: 1 },
            { title: 'Deep Reflection', stepOrder: 2 },
            { title: 'Practical Application', stepOrder: 3 }
          ]
        }
      }
    })
    console.log(`Created Path: ${curve.title}`)
  }

  // 2. MANIFEST VEDIC EVENTS (SANGHA) - 20 Records
  console.log('🏛️ Manifesting 20 Sangha Sessions...')
  for (let i = 1; i <= 20; i++) {
    await prisma.vedicEvent.create({
      data: {
        hostId: users[i % users.length].id,
        title: `Sangha Session ${i}: ${['Gita Study', 'Kirtan Night', 'Philosophy Q&A', 'Meditation Circle'][i % 4]}`,
        description: `Join us for our weekly ${i}th spiritual gathering.`,
        link: i % 2 === 0 ? 'https://zoom.us/j/123' : 'Temple Hall',
        startTime: new Date(Date.now() + i * 24 * 60 * 60 * 1000), // Future dates
        endTime: new Date(Date.now() + i * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000)
      }
    })
  }

  // 3. MANIFEST USER STATISTICS (SADHANA) - 20 Records
  console.log('🔥 Manifesting 20 User Statistics...')
  for (const user of users) {
    await prisma.userStatistics.upsert({
      where: { userId: user.id },
      update: {
        nodesReadCount: 50 + Math.floor(Math.random() * 100),
        coursesCompleted: Math.floor(Math.random() * 10),
        contributionPoints: 100 + Math.floor(Math.random() * 1000)
      },
      create: {
        userId: user.id,
        nodesReadCount: 50 + Math.floor(Math.random() * 100),
        coursesCompleted: Math.floor(Math.random() * 10),
        contributionPoints: 100 + Math.floor(Math.random() * 1000)
      }
    })
  }

  // 4. MANIFEST MORE CONTRIBUTIONS (CASH) - Reach 20
  console.log('💰 Manifesting Additional Contributions...')
  const existingContribs = await prisma.contribution.count()
  for (let i = 1; i <= (20 - existingContribs); i++) {
    const user = users[i % users.length]
    await prisma.contribution.create({
      data: {
        orgId: rootOrgId,
        userId: user.id,
        amount: 1000 + (i * 500),
        type: 'FINANCIAL',
        purpose: 'General Maintenance',
        date: new Date()
      }
    })
  }

  // 5. MANIFEST AUDIT LOGS (TRANSPARENCY) - Reach 20
  console.log('📜 Manifesting Audit Logs...')
  const existingLogs = await prisma.auditLog.count()
  for (let i = 1; i <= (20 - existingLogs); i++) {
    const user = users[i % users.length]
    await prisma.auditLog.create({
      data: {
        performedById: user.id,
        action: 'SYSTEM_AUDIT_LOG',
        newData: { event: `Transparency Log Entry ${i}`, status: 'SUCCESS' }
      }
    })
  }

  console.log('✅ USER DASHBOARD MANIFESTATION COMPLETE.')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
