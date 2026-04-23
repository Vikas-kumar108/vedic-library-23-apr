import { PrismaClient, TransactionType, PaymentMethod } from '@dharma/data-access'
import dotenv from 'dotenv'

dotenv.config()
const prisma = new PrismaClient()

const TRANSACTION_DATA = [
  { "type": "INCOME", "amount": 25000, "category": "Donation", "purpose": "Donation received from devotee for temple food distribution program", "paymentMode": "UPI" },
  { "type": "EXPENSE", "amount": 8000, "category": "Food", "purpose": "Purchased vegetables and grains for weekly prasadam distribution", "paymentMode": "CASH" },
  { "type": "INCOME", "amount": 50000, "category": "CSR", "purpose": "CSR contribution from company for girls education initiative", "paymentMode": "Bank Transfer" },
  { "type": "EXPENSE", "amount": 15000, "category": "Construction", "purpose": "Buying 1000 bricks for the village school extension", "paymentMode": "Bank Transfer" },
  { "type": "EXPENSE", "amount": 3000, "category": "Travel", "purpose": "Travel expenses for outreach program in nearby village", "paymentMode": "CASH" },
  { "type": "INCOME", "amount": 12000, "category": "Book Sales", "purpose": "Income from sale of Bhagavad-gita booklets", "paymentMode": "UPI" },
  { "type": "EXPENSE", "amount": 5000, "category": "Books", "purpose": "Printing of 200 spiritual booklets for distribution", "paymentMode": "Bank Transfer" },
  { "type": "EXPENSE", "amount": 2200, "category": "Utilities", "purpose": "Electricity bill payment for temple premises", "paymentMode": "UPI" },
  { "type": "INCOME", "amount": 18000, "category": "Donation", "purpose": "Donation received for festival आयोजन", "paymentMode": "CASH" },
  { "type": "EXPENSE", "amount": 9000, "category": "Event", "purpose": "Arrangements for Janmashtami festival decoration and setup", "paymentMode": "CASH" },
  { "type": "EXPENSE", "amount": 4000, "category": "Food", "purpose": "Cooking supplies for youth retreat camp", "paymentMode": "UPI" },
  { "type": "INCOME", "amount": 35000, "category": "Donation", "purpose": "Contribution from donor for medical support program", "paymentMode": "Bank Transfer" },
  { "type": "EXPENSE", "amount": 7000, "category": "Medical", "purpose": "Medicine purchase for village health camp", "paymentMode": "CASH" },
  { "type": "EXPENSE", "amount": 6000, "category": "Maintenance", "purpose": "Repair work for temple roof leakage", "paymentMode": "Bank Transfer" },
  { "type": "INCOME", "amount": 10000, "category": "Course Fee", "purpose": "Collected fees for online spiritual course", "paymentMode": "UPI" },
  { "type": "EXPENSE", "amount": 2500, "category": "Stationery", "purpose": "Purchased notebooks and pens for student program", "paymentMode": "CASH" },
  { "type": "INCOME", "amount": 42000, "category": "Donation", "purpose": "Temple development fund contribution", "paymentMode": "Bank Transfer" },
  { "type": "EXPENSE", "amount": 11000, "category": "Construction", "purpose": "Cement purchase for temple construction", "paymentMode": "Bank Transfer" },
  { "type": "EXPENSE", "amount": 3200, "category": "Travel", "purpose": "Fuel expenses for volunteer transportation", "paymentMode": "UPI" },
  { "type": "EXPENSE", "amount": 4800, "category": "Books", "purpose": "Purchase of scriptures for distribution program", "paymentMode": "UPI" }
]

async function main() {
  console.log('💰 MANIFESTING INSTITUTIONAL FINANCE...')
  
  // 1. Create Root Organization
  const org = await prisma.organization.upsert({
    where: { id: '00000000-0000-0000-0000-000000000001' }, // Hardcoded static ID for Root
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000001',
      name: 'Vedic Institution Global',
      type: 'Trust',
      registrationNo: 'ROOT-001',
      pan: 'ABCDE1234F'
    }
  })

  // 2. Create Accounts
  async function getOrCreateAccount(name: string, type: string, balance: number) {
    let acc = await prisma.financialAccount.findFirst({
      where: { orgId: org.id, name: name }
    })
    if (!acc) {
      acc = await prisma.financialAccount.create({
        data: { orgId: org.id, name: name, type: type, balance: balance }
      })
    }
    return acc
  }

  const accounts = {
    BANK: await getOrCreateAccount('HDFC Main Institutional', 'BANK', 500000),
    CASH: await getOrCreateAccount('Petty Cash Box', 'CASH', 50000),
    UPI: await getOrCreateAccount('UPI / Digital Gateway', 'DIGITAL', 100000)
  }

  // 3. Find a Witness (Admin/Director)
  const witness = await prisma.user.findFirst({
    where: { roles: { has: 'director' } }
  })

  if (!witness) {
    console.error('❌ NO DIRECTOR FOUND. PLEASE RUN seed_batch_20.ts FIRST.')
    process.exit(1)
  }

  // 4. Create Transactions
  for (const t of TRANSACTION_DATA) {
    const accType = t.paymentMode === 'CASH' ? 'CASH' : t.paymentMode === 'UPI' ? 'UPI' : 'BANK'
    const account = (accounts as any)[accType]
    const method = t.paymentMode === 'Bank Transfer' ? 'BANK_TRANSFER' : t.paymentMode

    await prisma.transaction.create({
      data: {
        orgId: org.id,
        type: t.type,
        amount: t.amount,
        category: t.category,
        purpose: t.purpose,
        paymentMethod: method,
        status: 'APPROVED',
        sourceAccountId: t.type === 'EXPENSE' ? account.id : null,
        destinationAccountId: t.type === 'INCOME' ? account.id : null,
        recordedById: witness.id,
        date: new Date()
      }
    })
    console.log(`Recorded: ${t.type} of ₹${t.amount} by ${witness.full_name}`)
  }

  console.log('✅ FINANCIAL MANIFESTATION COMPLETE.')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
