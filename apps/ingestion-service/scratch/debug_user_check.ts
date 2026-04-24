import { PrismaClient } from '@dharma/data-access'
import dotenv from 'dotenv'

dotenv.config()
const prisma = new PrismaClient()

async function main() {
  const email = 'vkdas.rns@gmail.com'
  const user = await prisma.user.findUnique({
    where: { email },
  })
  console.log('USER_CHECK:', user)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
