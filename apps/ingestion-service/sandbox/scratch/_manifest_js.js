const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('🌱 MANIFESTING THE GOLDEN UNIVERSE (SCRIPT FIX)...')

  // 0. Clean Slate
  await prisma.node_tags.deleteMany({})
  await prisma.texts.deleteMany({})
  await prisma.nodes.deleteMany({})
  await prisma.shastras.deleteMany({})
  await prisma.tags.deleteMany({})

  // 1. Manifest Shastras
  const gita = await prisma.shastras.create({
    data: {
      name: 'Bhagavad Gita',
      slug: 'bhagavad-gita',
      structure_type: 'verse-centric',
      status: 'ACTIVE'
    }
  })

  console.log('Created Shastra:', gita.name)

  // 2. Manifest Nodes
  const gita1_1 = await prisma.nodes.create({
    data: {
      shastra_id: gita.id,
      slug: 'bg-1-1',
      level: 'verse',
      canonical_ref: 'BG 1.1',
      sensitivity: 1,
      order_index: 1
    }
  })

  const gita2_13 = await prisma.nodes.create({
    data: {
      shastra_id: gita.id,
      slug: 'bg-2-13',
      level: 'verse',
      canonical_ref: 'BG 2.13',
      sensitivity: 2,
      order_index: 13
    }
  })

  // 3. Manifest Texts
  const texts = [
    { node_id: gita1_1.id, content: 'dhṛtarāṣṭra uvāca\ndharmakṣetre kurukṣetre samavetā yuyutsavaḥ\nmāmakāḥ pāṇḍavāścaiva kimakurvata sañjaya', language: 'sa', content_type: 'sutra', script: 'devanagari' },
    { node_id: gita1_1.id, content: 'Dhritarashtra said: O Sanjaya, after my sons and the sons of Pandu assembled in the place of pilgrimage at Kurukshetra, desiring to fight, what did they do?', language: 'en', content_type: 'translation', script: 'latin' },
    { node_id: gita2_13.id, content: 'dehino ’smin yathā dehe kaumāraṃ yauvanaṃ jarā\ntathā dehāntara-prāptir dhīras tatra na muhyati', language: 'sa', content_type: 'sutra', script: 'devanagari' },
    { node_id: gita2_13.id, content: 'As the embodied soul continuously passes, in this body, from boyhood to youth to old age, the soul similarly passes into another body at death. A sober person is not bewildered by such a change.', language: 'en', content_type: 'translation', script: 'latin' }
  ]

  for (const t of texts) {
    await prisma.texts.create({ data: t })
  }

  // 4. Manifest Tags
  const wisdomTag = await prisma.tags.create({
    data: {
      name: 'Daily Wisdom',
      slug: 'daily-wisdom',
      description: 'Practical wisdom for daily life'
    }
  })

  // 5. Manifest Node Tags
  await prisma.node_tags.create({ data: { node_id: gita1_1.id, tag_id: wisdomTag.id } })
  await prisma.node_tags.create({ data: { node_id: gita2_13.id, tag_id: wisdomTag.id } })

  console.log('✅ THE GOLDEN UNIVERSE HAS BEEN MANIFESTED.')
}

main()
  .catch((e) => {
    console.error('❌ MANIFESTATION FAILURE:', e.message)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
