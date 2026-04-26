import { PrismaClient, TransactionType, TransactionStatus, PaymentMethod, ContributionType, ComplianceStatus, CampaignStatus, UserRole, AgeGroup, LibraryType, Language, CommunicationChannel, CommunicationStatus, StorageProvider, FileCategory } from '@prisma/client'
import dotenv from 'dotenv'

dotenv.config()
const prisma = new PrismaClient()

async function main() {
  console.log('🚀 INITIATING MASTER SEEDING V7 (WISDOM FLOW EDITION)...')

  // 0. CREATE ROOT ORGANIZATION
  console.log('🏗️ Seeding Organization...')
  const org = await prisma.organization.create({
    data: {
      id: '00000000-0000-0000-0000-000000000001',
      name: 'Vedic Operating System Global',
      type: 'Trust',
      registrationNo: 'VIOS-108',
      pan: 'AAAA0000A',
    }
  })

  // 1. CREATE USERS (Diverse Roles)
  console.log('👥 Seeding Institutional Users...')
  const admin = await prisma.user.create({
    data: {
      id: '00000000-0000-0000-0000-a00000000001',
      email: 'acharya@vios.org',
      roles: [UserRole.admin, UserRole.teacher],
      profile: { create: { full_name: 'Acharya Satyananda', city: 'Varanasi' } },
      spiritual: { create: { eligibilityLevel: 5 } }
    }
  })

  const donor = await prisma.user.create({
    data: {
      id: '00000000-0000-0000-0000-d00000000001',
      email: 'donor@gmail.com',
      roles: [UserRole.donor],
      profile: { create: { full_name: 'Bhaktivedanta Dasa', city: 'Mumbai' } }
    }
  })

  // 2. SEED DONATION CAUSES (Hierarchical)
  console.log('💰 Seeding Hierarchical Causes...')
  const templeCause = await prisma.donationCause.create({
    data: {
      orgId: org.id,
      name: 'Temple Construction',
      slug: 'temple-construction',
      description: 'Major building fund for the main sanctum.',
    }
  })
  
  // Update path using raw SQL since ltree is Unsupported
  await prisma.$executeRawUnsafe(`UPDATE donation_causes SET path = 'temple' WHERE id = '${templeCause.id}'`)

  const brickCause = await prisma.donationCause.create({
    data: {
      orgId: org.id,
      parentId: templeCause.id,
      name: 'Sponsored Bricks',
      slug: 'temple-bricks',
      level: 1,
    }
  })
  await prisma.$executeRawUnsafe(`UPDATE donation_causes SET path = 'temple.bricks' WHERE id = '${brickCause.id}'`)

  await prisma.donationCauseOption.create({
    data: {
      causeId: brickCause.id,
      name: '108 Sacred Bricks',
      suggestedAmount: 51000
    }
  })

  // 3. SEED FAMILY LINEAGE
  console.log('🧬 Seeding Family Lineage...')
  const grandfather = await prisma.familyNode.create({
    data: { familyGroupId: '00000000-0000-0000-0000-f00000000001', level: 0 }
  })
  await prisma.$executeRawUnsafe(`UPDATE family_nodes SET path = 'node_${grandfather.id.replace(/-/g, '_')}' WHERE id = '${grandfather.id}'`)

  const father = await prisma.familyNode.create({
    data: { 
      userId: donor.id, 
      parentId: grandfather.id, 
      familyGroupId: '00000000-0000-0000-0000-f00000000001',
      level: 1 
    }
  })
  await prisma.$executeRawUnsafe(`UPDATE family_nodes SET path = 'node_${grandfather.id.replace(/-/g, '_')}.node_${father.id.replace(/-/g, '_')}' WHERE id = '${father.id}'`)

  // 4. SEED LIBRARY ITEMS (Books/Articles)
  console.log('📚 Seeding Library & Wisdom Distribution...')
  const gitaPdf = await prisma.fileAsset.create({
    data: {
      orgId: org.id,
      fileName: 'Bhagavad Gita As It Is',
      fileType: 'pdf',
      mimeType: 'application/pdf',
      fileUrl: 'https://cdn.vios.org/books/gita.pdf',
      storageProvider: StorageProvider.R2,
      objectKey: 'books/gita.pdf',
      category: FileCategory.DOCUMENT,
      securityLevel: 'PUBLIC'
    }
  })

  const libraryItem = await prisma.libraryItem.create({
    data: {
      orgId: org.id,
      title: 'Bhagavad Gita Essentials',
      slug: 'gita-essentials',
      type: LibraryType.BOOK,
      language: Language.en,
      author: 'A.C. Bhaktivedanta Swami',
      fileId: gitaPdf.id,
      isPublic: true
    }
  })

  // 5. SEED TRANSACTIONS & CONTRIBUTIONS
  console.log('💸 Seeding Hardened Financials...')
  const trans = await prisma.transaction.create({
    data: {
      orgId: org.id,
      amount: 51000,
      type: TransactionType.INCOME,
      category: 'Donation',
      purpose: 'Sponsored 108 Sacred Bricks',
      paymentMethod: PaymentMethod.BANK_TRANSFER,
      recordedById: admin.id,
      status: TransactionStatus.APPROVED
    }
  })

  await prisma.contribution.create({
    data: {
      orgId: org.id,
      userId: donor.id,
      transactionId: trans.id,
      amount: 51000,
      type: ContributionType.FINANCIAL,
      causeId: brickCause.id,
      purpose: 'Temple Brick Sponsorship'
    }
  })

  // 6. SEED COMMUNICATION WITH LIBRARY ATTACHMENT
  console.log('📡 Seeding Communication Flow...')
  await prisma.communicationLog.create({
    data: {
      orgId: org.id,
      userId: donor.id,
      channel: CommunicationChannel.EMAIL,
      status: CommunicationStatus.SENT,
      recipient: 'donor@gmail.com',
      subject: 'Thank you for your contribution!',
      message: 'Here is your welcome booklet.',
      libraryItemId: libraryItem.id
    }
  })

  console.log('✅ MASTER SEEDING V7 COMPLETE. Institutional Universe is Live.')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
