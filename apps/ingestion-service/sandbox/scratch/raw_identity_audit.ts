import { PrismaClient } from '@dharma/data-access'
import dotenv from 'dotenv'

dotenv.config()
const prisma = new PrismaClient()

async function main() {
  console.log('🏛️ VEDIC VAULT: RAW IDENTITY AUDIT')
  console.log('--------------------------------------------------')

  const email = 'vkdas.rns@gmail.com'
  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    console.log(`❌ User with email ${email} not found.`)
    return
  }

  console.log('📍 [DATABASE TABLE: "users"]')
  console.log('--------------------------------------------------')
  
  // Format the output for clarity
  const auditData = {
    "ID (UUID)": user.id,
    "Email": user.email,
    "Password (BCRYPT HASH)": user.password?.substring(0, 30) + '...', // Mask for security but show it's a hash
    "Full Name": user.full_name,
    "Roles": user.roles.join(', '),
    "Verification Token": user.verificationToken ? (user.verificationToken.substring(0, 15) + '...') : 'NULL',
    "Email Verified": user.emailVerified ? user.emailVerified.toISOString() : 'PENDING',
    "Created At": user.createdAt.toISOString()
  }

  console.table(auditData)

  console.log('\n🔒 SECURITY NOTE:')
  console.log('The password column only contains the mathematical hash of your password.')
  console.log('The system verifies you by re-hashing your input and comparing the results.')
  console.log('--------------------------------------------------')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
