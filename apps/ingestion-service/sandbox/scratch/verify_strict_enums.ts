import { PrismaClient, TransactionType, PaymentMethod, TransactionStatus } from '@dharma/data-access'
import dotenv from 'dotenv'

dotenv.config()
const prisma = new PrismaClient()

async function testEnums() {
  console.log('🧪 TESTING STRICT ENUM ENFORCEMENT')
  console.log('--------------------------------------------------')

  try {
    // Attempting to create an organization to link to
    const org = await prisma.organization.create({
      data: {
        name: 'Test Org for Enum Check',
        type: 'Trust',
      }
    })

    const user = await prisma.user.create({
      data: {
        email: 'testenum@example.com',
        full_name: 'Enum Tester'
      }
    })

    console.log('✅ Base entities created.')

    console.log('\n[TEST 1] Attempting to create Transaction with INVALID type "Inflow"...')
    try {
      // We have to use 'any' or ignore typescript because TS will block 'Inflow' before Prisma even gets to it.
      // To test Prisma's runtime engine enforcement, we force it:
      const badData: any = {
        orgId: org.id,
        amount: 1000,
        type: 'Inflow', // INVALID
        category: 'Donation',
        purpose: 'Test',
        paymentMethod: PaymentMethod.CASH,
        recordedById: user.id
      }
      await prisma.transaction.create({ data: badData })
      console.log('❌ FAILED: Prisma allowed an invalid type!')
    } catch (e: any) {
      console.log('✅ SUCCESS: Prisma rejected invalid type. Error:', e.message.split('\n')[0])
    }

    console.log('\n[TEST 2] Attempting to create Transaction with VALID type (INCOME)...')
    try {
      await prisma.transaction.create({
        data: {
          orgId: org.id,
          amount: 1000,
          type: TransactionType.INCOME, // VALID
          category: 'Donation',
          purpose: 'Test',
          paymentMethod: PaymentMethod.CASH,
          recordedById: user.id,
          status: TransactionStatus.PENDING
        }
      })
      console.log('✅ SUCCESS: Valid transaction created.')
    } catch (e: any) {
      console.log('❌ FAILED: Prisma rejected valid data!', e)
    }

  } catch (e) {
    console.error('Fatal error during test setup:', e)
  } finally {
    await prisma.$disconnect()
  }
}

testEnums()
