import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function check() {
  try {
    const count = await (prisma as any).node_tags.count()
    console.log('NODE_TAGS_COUNT:', count)
  } catch (e) {
    console.log('NODE_TAGS_ERROR:', e.message)
  } finally {
    await prisma.$disconnect()
  }
}

check()
