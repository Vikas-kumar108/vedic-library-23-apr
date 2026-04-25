const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('🌱 DEBUGGING NODE TAGS...')

  // 1. Manifest Shastra
  const gita = await prisma.shastras.upsert({
    where: { slug: 'bhagavad-gita' },
    update: {},
    create: {
      name: 'Bhagavad Gita',
      slug: 'bhagavad-gita',
      structure_type: 'verse-centric'
    }
  })

  // 2. Manifest Node
  const node = await prisma.nodes.create({
    data: {
      shastra_id: gita.id,
      slug: 'debug-node-' + Date.now(),
      level: 'verse',
      sensitivity: 1
    }
  })

  // 3. Manifest Tag
  const tag = await prisma.tags.upsert({
    where: { slug: 'debug-tag' },
    update: {},
    create: {
      name: 'Debug Tag',
      slug: 'debug-tag'
    }
  })

  console.log('Attempting node_tags link...', { node_id: node.id, tag_id: tag.id })

  try {
    await prisma.node_tags.create({
      data: {
        node_id: node.id,
        tag_id: tag.id
      }
    })
    console.log('✅ LINK SUCCESS')
  } catch (e) {
    console.error('❌ LINK FAILURE:', e.message)
    console.error('FULL ERROR:', JSON.stringify(e, null, 2))
  }
}

main()
  .catch((e) => {
    console.error('❌ FATAL:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
