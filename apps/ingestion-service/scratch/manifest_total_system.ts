import { PrismaClient } from '@dharma/data-access'
import dotenv from 'dotenv'

dotenv.config()
const prisma = new PrismaClient()

async function main() {
  console.log('🚀 FINALIZING TOTAL INSTITUTIONAL MANIFESTATION...')

  const rootOrgId = '00000000-0000-0000-0000-000000000001'
  const users = await prisma.user.findMany({ take: 20 })
  const projects = await prisma.project.findMany()

  // 1. MANIFEST PROJECTS - Reach 20
  console.log('🏗️ Manifesting Projects...')
  const projCount = await prisma.project.count()
  for (let i = 1; i <= (20 - projCount); i++) {
    await prisma.project.create({
      data: {
        orgId: rootOrgId,
        name: `Institutional Project ${i + projCount}: ${['Temple Renovation', 'Organic Farm', 'Library Digitization', 'Education Wing'][i % 4]}`,
        description: `Mission-critical project focusing on ${i}th stage of growth.`,
        status: 'ACTIVE',
        totalBudget: 100000 + (i * 10000)
      }
    })
  }

  // 2. MANIFEST EXPENSES - Reach 20
  console.log('💸 Manifesting Expenses...')
  const updatedProjects = await prisma.project.findMany()
  for (let i = 1; i <= 20; i++) {
    const project = updatedProjects[i % updatedProjects.length]
    await prisma.expense.create({
      data: {
        projectId: project.id,
        amount: 500 + (i * 100),
        category: ['Utilities', 'Maintenance', 'Salaries', 'Materials'][i % 4],
        description: `Monthly institutional expense for ${project.name}`,
        date: new Date()
      }
    })
  }

  // 3. MANIFEST FINANCIAL ACCOUNTS - Reach 20
  console.log('🏦 Manifesting Financial Accounts...')
  const accCount = await prisma.financialAccount.count()
  for (let i = 1; i <= (20 - accCount); i++) {
    await prisma.financialAccount.create({
      data: {
        orgId: rootOrgId,
        name: `Vedic Trust Account ${i + accCount}`,
        type: ['BANK', 'CASH', 'WALLET'][i % 3],
        balance: 10000 + (i * 5000),
        currency: 'INR'
      }
    })
  }

  // 4. MANIFEST GUIDANCE SESSIONS - Reach 20
  console.log('🧘 Manifesting Guidance Sessions...')
  for (let i = 1; i <= 20; i++) {
    const user = users[i % users.length]
    await prisma.guidanceSession.create({
      data: {
        guideId: users[0].id, // Admin as guide
        studentId: user.id,
        topic: `Spiritual Guidance ${i}: ${['Japa technique', 'Sastra study', 'Life Balance'][i % 3]}`,
        notes: `Fruitful session with ${user.full_name}`,
        date: new Date()
      }
    })
  }

  // 5. MANIFEST ORG MEMBERS - Reach 20
  console.log('👥 Manifesting Org Members...')
  const orgCount = await prisma.orgMember.count()
  for (let i = 1; i <= (20 - orgCount); i++) {
    const user = users[i % users.length]
    await prisma.orgMember.create({
      data: {
        orgId: rootOrgId,
        userId: user.id,
        role: i % 5 === 0 ? 'ADMIN' : 'MEMBER'
      }
    })
  }

  // 6. MANIFEST SECURE SHARE LINKS - Reach 20
  console.log('🔗 Manifesting Secure Share Links...')
  const docs = await prisma.legalDocument.findMany({ take: 20 })
  for (let i = 1; i <= 20; i++) {
    const doc = docs[i % docs.length]
    await prisma.secureShareLink.create({
      data: {
        orgId: rootOrgId,
        documentId: doc.id,
        token: `share-token-${i}-${Date.now()}`,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    })
  }

  console.log('✅ TOTAL INSTITUTIONAL MANIFESTATION COMPLETE.')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
