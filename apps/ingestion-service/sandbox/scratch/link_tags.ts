import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🔗 Starting Tag Linking...')

  const tags = await prisma.tag.findMany()
  console.log(`Found ${tags.length} tags to process.`)

  for (const tag of tags) {
    const keywords = tag.keywords || []
    if (keywords.length === 0) continue

    // Find nodes whose texts contain these keywords
    const texts = await prisma.text.findMany({
      where: {
        OR: keywords.map(k => ({
          content: { contains: k, mode: 'insensitive' }
        }))
      },
      select: { nodeId: true },
      take: 20
    })

    const nodeIds = [...new Set(texts.map(t => t.nodeId))]
    
    if (nodeIds.length > 0) {
      console.log(`Tag "${tag.name}": Linking to ${nodeIds.length} nodes...`)
      for (const nodeId of nodeIds) {
        try {
          await prisma.nodeTag.upsert({
            where: {
              nodeId_tagId: {
                nodeId,
                tagId: tag.id
              }
            },
            update: {},
            create: {
              nodeId,
              tagId: tag.id
            }
          })
        } catch (e) {
          // Ignore duplicates or errors
        }
      }
    }
  }

  console.log('✅ Tag Linking Complete!')
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())
