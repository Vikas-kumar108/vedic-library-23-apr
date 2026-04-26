import { PrismaClient } from '@dharma/data-access'
import dotenv from 'dotenv'

dotenv.config()
const prisma = new PrismaClient()

async function enforceConstraints() {
  console.log('🛡️ INJECTING NATIVE SQL CONSTRAINTS...')
  
  try {
    // 1. Enforce Amount Positivity
    console.log('Applying "transactions_amount_check"...')
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "transactions" 
      DROP CONSTRAINT IF EXISTS "transactions_amount_check";
    `)
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "transactions" 
      ADD CONSTRAINT "transactions_amount_check" 
      CHECK (
        (type IN ('INCOME', 'EXPENSE') AND amount > 0)
        OR
        (type = 'TRANSFER' AND amount > 0)
        OR
        (type = 'ADJUSTMENT')
      );
    `)
    console.log('✅ Amount constraint applied.')

    // 2. Enforce Self-Transfer Prevention
    console.log('Applying "transactions_self_transfer_check"...')
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "transactions" 
      DROP CONSTRAINT IF EXISTS "transactions_self_transfer_check";
    `)
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "transactions" 
      ADD CONSTRAINT "transactions_self_transfer_check" 
      CHECK (source_account_id IS DISTINCT FROM destination_account_id);
    `)
    console.log('✅ Self-transfer constraint applied.')

  } catch (error) {
    console.error('❌ Failed to inject constraints:', error)
  } finally {
    await prisma.$disconnect()
  }
}

enforceConstraints()
