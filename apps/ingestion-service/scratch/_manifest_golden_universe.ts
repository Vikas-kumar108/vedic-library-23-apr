import { PrismaClient } from '@dharma/data-access'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 MANIFESTING THE GOLDEN UNIVERSE (REFINED)...')

  // 1. Manifest Shastras
  const gita = await prisma.shastras.upsert({
    where: { slug: 'bhagavad-gita' },
    update: {},
    create: {
      name: 'Bhagavad Gita',
      slug: 'bhagavad-gita',
      description: 'The Song of God',
      category: 'Smriti'
    }
  })

  // 2. Manifest Nodes (Sample Verses)
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
  await prisma.texts.createMany({
    data: [
      {
        node_id: gita1_1.id,
        content: 'dhṛtarāṣṭra uvāca\ndharmakṣetre kurukṣetre samavetā yuyutsavaḥ\nmāmakāḥ pāṇḍavāścaiva kimakurvata sañjaya',
        language: 'sa',
        type: 'sutra'
      },
      {
        node_id: gita1_1.id,
        content: 'Dhritarashtra said: O Sanjaya, after my sons and the sons of Pandu assembled in the place of pilgrimage at Kurukshetra, desiring to fight, what did they do?',
        language: 'en',
        type: 'translation'
      },
      {
        node_id: gita2_13.id,
        content: 'dehino ’smin yathā dehe kaumāraṃ yauvanaṃ jarā\ntathā dehāntara-prāptir dhīras tatra na muhyati',
        language: 'sa',
        type: 'sutra'
      },
      {
        node_id: gita2_13.id,
        content: 'As the embodied soul continuously passes, in this body, from boyhood to youth to old age, the soul similarly passes into another body at death. A sober person is not bewildered by such a change.',
        language: 'en',
        type: 'translation'
      }
    ]
  })

  // 4. Manifest Tags
  const wisdomTag = await prisma.tags.upsert({
    where: { slug: 'daily-wisdom' },
    update: {},
    create: {
      name: 'Daily Wisdom',
      slug: 'daily-wisdom',
      description: 'Practical wisdom for daily life'
    }
  })

  await prisma.node_tags.createMany({
    data: [
      { node_id: gita1_1.id, tag_id: wisdomTag.id },
      { node_id: gita2_13.id, tag_id: wisdomTag.id }
    ]
  })

  console.log('✅ THE GOLDEN UNIVERSE HAS BEEN MANIFESTED.')
}

main()
  .catch((e) => {
    console.error('❌ MANIFESTATION FAILURE:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
