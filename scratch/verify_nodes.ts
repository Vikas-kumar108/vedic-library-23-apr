import { PrismaClient } from '@prisma/client'

async function main() {
  const prisma = new PrismaClient()
  try {
    const count = await prisma.libraryNode.count()
    console.log(`Total LibraryNodes: ${count}`)
    const samples = await prisma.libraryNode.findMany({ take: 5 })
    console.log('Samples:', JSON.stringify(samples, null, 2))
  } catch (err) {
    console.error('Error in verification:', err)
  } finally {
    await prisma.$disconnect()
  }
}

main()
