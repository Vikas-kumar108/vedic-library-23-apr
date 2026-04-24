import { PrismaClient, TransactionType, TransactionStatus, PaymentMethod, ContributionType, UserRole, LibraryType, Language, CommunicationChannel, CommunicationStatus, StorageProvider, FileCategory, TaxType, PartnerType, GrantStatus } from '@prisma/client'
import dotenv from 'dotenv'

dotenv.config()
const prisma = new PrismaClient()

async function main() {
  console.log('🚀 INITIATING MASTER SEEDING V8.1 (RESILIENT AUDIT EDITION)...')

  // 0. UPSERT ROOT ORGANIZATION
  console.log('🏗️ Seeding Organization...')
  const org = await prisma.organization.upsert({
    where: { id: '00000000-0000-0000-0000-000000000001' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000001',
      name: 'Vedic Operating System Global',
      type: 'Trust',
      registrationNo: 'VIOS-108',
      pan: 'AAAA0000A',
    }
  })

  // 1. UPSERT USERS
  console.log('👥 Seeding Institutional Users...')
  const admin = await prisma.user.upsert({
    where: { id: '00000000-0000-0000-0000-a00000000001' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-a00000000001',
      email: 'acharya@vios.org',
      roles: [UserRole.admin, UserRole.director],
      status: 'ACTIVE'
    }
  })

  const donor = await prisma.user.upsert({
    where: { id: '00000000-0000-0000-0000-d00000000001' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-d00000000001',
      email: 'bhaktivedanta@gmail.com',
      roles: [UserRole.donor],
      status: 'ACTIVE'
    }
  })

  // 2. SEED FINANCIAL INFRASTRUCTURE
  console.log('🏦 Seeding Financial Pillars...')
  const period = await prisma.financialPeriod.create({
    data: {
      orgId: org.id,
      yearLabel: 'FY 2024-25',
      startDate: new Date('2024-04-01'),
      endDate: new Date('2025-03-31'),
      isClosed: false
    }
  })

  const bankAccount = await prisma.financialAccount.create({
    data: {
      orgId: org.id,
      name: 'HDFC Institutional Main',
      type: 'BANK',
      balance: 0
    }
  })

  // 3. SEED CORPORATE PARTNERSHIP
  console.log('🤝 Seeding CSR Partnership...')
  const corpPartner = await prisma.partnerOrganization.create({
    data: {
      name: 'TechDharma Global Corp',
      type: PartnerType.CORPORATE,
      registrationNumber: 'CSR-999-01',
      contactPerson: 'Sanjay Sharma',
      email: 'csr@techdharma.com'
    }
  })

  const partnership = await prisma.partnership.create({
    data: {
      orgId: org.id,
      partnerId: corpPartner.id,
      title: 'Digital Wisdom Outreach 2024',
      status: GrantStatus.ACTIVE,
      startDate: new Date('2024-06-01')
    }
  })

  // 4. SEED AUDIT-PROOF DONATION
  console.log('🧾 Seeding Double-Entry Donation Flow...')
  const donationTrans = await prisma.transaction.create({
    data: {
      orgId: org.id,
      amount: 108000,
      type: TransactionType.INCOME,
      category: 'Donation',
      purpose: 'General Fund Contribution',
      paymentmethod: PaymentMethod.BANK_TRANSFER,
      destinationAccountId: bankAccount.id,
      recordedById: admin.id,
      status: TransactionStatus.APPROVED,
      isCorpus: true
    }
  })

  await prisma.journalEntry.create({
    data: {
      orgId: org.id,
      transactionId: donationTrans.id,
      description: 'Donation from Bhaktivedanta Dasa (Corpus)',
      status: TransactionStatus.APPROVED,
      createdById: admin.id,
      lines: {
        create: [
          { accountId: bankAccount.id, debit: 108000, credit: 0 }
        ]
      }
    }
  })

  console.log('✅ MASTER SEEDING V8.1 COMPLETE. Institutional Reality Manifested.')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
