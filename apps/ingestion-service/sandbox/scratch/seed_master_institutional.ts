import { PrismaClient, TransactionType, TransactionStatus, PaymentMethod, ContributionType, ComplianceStatus, CampaignStatus, UserRole, AgeGroup } from '@dharma/data-access'
import dotenv from 'dotenv'

dotenv.config()
const prisma = new PrismaClient()

async function main() {
  console.log('🚀 INITIATING MASTER INSTITUTIONAL SEEDING...')

  // 0. CREATE ROOT ORGANIZATION
  console.log('🏗️ Seeding Organization...')
  const org = await prisma.organization.create({
    data: {
      id: '00000000-0000-0000-0000-000000000001',
      name: 'Vedic Institute Global',
      type: 'Trust',
      registrationNo: 'REG-108',
      pan: 'AAAA0000A',
    }
  })

  // 1. CREATE ROOT ADMIN (Vertically Partitioned)
  console.log('👑 Seeding Root Admin...')
  const adminId = '00000000-0000-0000-0000-a00000000001'
  const admin = await prisma.user.create({
    data: {
      id: adminId,
      email: 'admin@vedicinstitute.org',
      roles: [UserRole.admin],
      status: 'ACTIVE',
      profile: {
        create: { full_name: 'Acharya Vidyasagar', phoneNumber: '+919999999999' }
      },
      spiritual: {
        create: { ageGroup: AgeGroup.adult_25_40, eligibilityLevel: 5 }
      },
      preferences: {
        create: { notificationPrefs: { email: true, sms: true } }
      }
    }
  })

  await prisma.orgMember.create({
    data: { orgId: org.id, userId: admin.id, role: 'Director' }
  })

  // 2. CREATE 20 MEMBERS
  console.log('👥 Seeding 20 Institutional Members...')
  const users = []
  for (let i = 1; i <= 20; i++) {
    const u = await prisma.user.create({
      data: {
        email: `member${i}@vedicinstitute.org`,
        roles: [UserRole.student],
        status: 'ACTIVE',
        profile: {
          create: { full_name: `Vedic Scholar ${i}`, city: ['Vrindavan', 'Rishikesh', 'Pune', 'Udupi'][i % 4] }
        },
        spiritual: {
          create: { eligibilityLevel: (i % 3) + 1 }
        },
        preferences: {
          create: {}
        }
      }
    })
    users.push(u)
    await prisma.orgMember.create({
      data: { orgId: org.id, userId: u.id, role: 'Member' }
    })
  }

  // 3. CREATE 5 PROJECTS
  console.log('🏗️ Seeding 5 Projects...')
  const projects = []
  const projectNames = ['Temple Construction', 'Gurukul Renovation', 'Library Digitization', 'Anna Daanam', 'Gaushala Expansion']
  for (let i = 0; i < 5; i++) {
    const p = await prisma.project.create({
      data: {
        orgId: org.id,
        name: projectNames[i],
        description: `Mission critical project phase ${i + 1}`,
        totalBudget: 500000 + (i * 100000),
        status: 'ACTIVE'
      }
    })
    projects.push(p)
  }

  // 4. CREATE 5 FINANCIAL ACCOUNTS
  console.log('🏦 Seeding 5 Financial Accounts...')
  const accounts = []
  const accTypes = ['BANK', 'BANK', 'CASH', 'WALLET', 'BANK']
  for (let i = 0; i < 5; i++) {
    const acc = await prisma.financialAccount.create({
      data: {
        orgId: org.id,
        name: `Vedic Trust ${accTypes[i]} ${i + 1}`,
        type: accTypes[i],
        balance: 100000 + (i * 50000),
        currency: 'INR'
      }
    })
    accounts.push(acc)
  }

  // 5. CREATE 50 TRANSACTIONS (Enforcing CHECK Constraints)
  console.log('💸 Seeding 50 Zero-Trust Transactions...')
  for (let i = 1; i <= 50; i++) {
    const typeInt = i % 3
    let tType = TransactionType.INCOME
    if (typeInt === 1) tType = TransactionType.EXPENSE
    if (typeInt === 2) tType = TransactionType.TRANSFER

    const sourceAcc = accounts[i % accounts.length]
    let destAcc = accounts[(i + 1) % accounts.length]
    // Prevent self-transfer constraint
    if (sourceAcc.id === destAcc.id) {
      destAcc = accounts[(i + 2) % accounts.length]
    }

    const t = await prisma.transaction.create({
      data: {
        orgId: org.id,
        amount: 1000 + (i * 100), // Must be > 0
        type: tType,
        category: tType === TransactionType.INCOME ? 'Donation' : (tType === TransactionType.EXPENSE ? 'Maintenance' : 'Internal'),
        purpose: `${tType} entry ${i} for compliance audit`,
        programId: projects[i % projects.length].id,
        paymentMethod: PaymentMethod.BANK_TRANSFER,
        recordedById: admin.id,
        approvedById: i % 2 === 0 ? admin.id : undefined,
        status: i % 2 === 0 ? TransactionStatus.APPROVED : TransactionStatus.PENDING,
        sourceAccountId: tType === TransactionType.EXPENSE || tType === TransactionType.TRANSFER ? sourceAcc.id : null,
        destinationAccountId: tType === TransactionType.INCOME || tType === TransactionType.TRANSFER ? destAcc.id : null,
      }
    })

    // If Income, add a Contribution record
    if (tType === TransactionType.INCOME) {
      await prisma.contribution.create({
        data: {
          orgId: org.id,
          userId: users[i % users.length].id,
          transactionId: t.id,
          amount: t.amount,
          type: ContributionType.FINANCIAL,
          projectId: t.programId,
          purpose: t.purpose
        }
      })
    }
  }

  // 6. CREATE 20 LEGAL DOCUMENTS (with Versions & Access)
  console.log('📄 Seeding 20 Legal Documents & Versions...')
  const docs = []
  for (let i = 1; i <= 20; i++) {
    const d = await prisma.legalDocument.create({
      data: {
        orgId: org.id,
        title: `Institutional Audit Document ${i}`,
        category: 'Financial',
        fileUrl: `https://storage.vedicinstitute.org/docs/audit_${i}.pdf`,
        sensitivity: 'RESTRICTED',
        status: 'ACTIVE',
        createdById: admin.id,
        versions: {
          create: [{
            fileUrl: `https://storage.vedicinstitute.org/docs/audit_${i}_v1.pdf`,
            versionNumber: 1,
            createdById: admin.id
          }]
        },
        accessRules: {
          create: [{
            roleId: 'auditor',
            permission: 'READ'
          }]
        }
      }
    })
    docs.push(d)
  }

  // 7. CREATE 20 SECURE SHARE LINKS (Using N:M Join Table)
  console.log('🔗 Seeding 20 Secure Share Links...')
  for (let i = 1; i <= 20; i++) {
    await prisma.secureShareLink.create({
      data: {
        orgId: org.id,
        token: `token-sec-${i}-${Date.now()}`,
        purpose: 'Annual Compliance Audit',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        documents: {
          create: [{
            documentId: docs[i % docs.length].id,
            accessLevel: 'READ'
          }]
        }
      }
    })
  }

  // 8. CREATE 20 COMPLIANCE RECORDS
  console.log('⚖️ Seeding 20 Compliance Records...')
  for (let i = 1; i <= 20; i++) {
    await prisma.complianceRecord.create({
      data: {
        orgId: org.id,
        name: `Quarterly Filing ${i}`,
        type: 'Tax',
        frequency: 'Quarterly',
        dueDate: new Date(Date.now() + (i * 24 * 60 * 60 * 1000)), // Future dates
        status: ComplianceStatus.UPCOMING,
        responsibleId: admin.id,
        createdById: admin.id
      }
    })
  }

  // 9. CREATE 20 COMMUNICATION CAMPAIGNS
  console.log('📢 Seeding 20 Communication Campaigns...')
  for (let i = 1; i <= 20; i++) {
    await prisma.communicationCampaign.create({
      data: {
        orgId: org.id,
        title: `Kartik Masa Newsletter ${i}`,
        content: `Join us for the special evening kirtan session ${i}.`,
        type: 'EMAIL',
        status: CampaignStatus.SENT,
        sentAt: new Date()
      }
    })
  }

  console.log('✅ MASTER INSTITUTIONAL SEEDING COMPLETE. Vault is populated.')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
