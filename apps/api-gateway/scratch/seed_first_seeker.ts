import { PrismaClient } from '@dharma/data-access'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 SEEDING THE FIRST SEEKER...')

  const email = 'admin@vedic.io'
  const password = 'Password108'
  const hashedPassword = await bcrypt.hash(password, 10)

  // 1. Create User (Golden 18)
  const user = await prisma.users.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password: hashedPassword,
      roles: ['admin'],
      status: 'ACTIVE',
      email_verified: new Date(),
    }
  })

  // 2. Create Profile
  await prisma.user_profiles.upsert({
    where: { user_id: user.id },
    update: {},
    create: {
      user_id: user.id,
      full_name: 'Vedic Administrator',
      village: 'Mayapur',
      city: 'Nadia',
      state: 'West Bengal',
      gender: 'male'
    }
  })

  console.log('✅ FIRST SEEKER MANIFESTED:', user.email)
}

main()
  .catch((e) => {
    console.error('❌ SEED FAILURE:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
