const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

const PROJECT_ROOT = '/Users/ppublications/Workspace/system/ui-lab/playground/ui-vedic-library-frontend-v2'
const GITA_JSON_PATH = path.join(PROJECT_ROOT, 'apps/ingestion-service/data/gita-data/verse.json')

async function main() {
  console.log('🚀 MANIFESTING EXHAUSTIVE GITA (700 SLOKAS)...')

  // 1. Get or Create Gita Shastra
  const gita = await prisma.shastras.upsert({
    where: { slug: 'bhagavad-gita' },
    update: {},
    create: {
      name: 'Bhagavad Gita',
      slug: 'bhagavad-gita',
      structure_type: 'chapter-verse',
      status: 'ACTIVE'
    }
  })

  // 2. Clean existing Gita nodes to prevent duplicates
  console.log('Cleaning existing Gita nodes...')
  await prisma.node_tags.deleteMany({ where: { nodes: { shastra_id: gita.id } } })
  await prisma.texts.deleteMany({ where: { nodes: { shastra_id: gita.id } } })
  await prisma.nodes.deleteMany({ where: { shastra_id: gita.id } })

  // 3. Create Root Node for Gita
  const gitaRoot = await prisma.nodes.create({
    data: {
      shastra_id: gita.id,
      slug: 'bhagavad-gita-root',
      level: 'text',
      canonical_ref: 'Bhagavad Gita',
      sensitivity: 1,
      order_index: 0
    }
  })

  // 4. Load Verses
  if (!fs.existsSync(GITA_JSON_PATH)) {
    throw new Error(`Gita JSON not found at ${GITA_JSON_PATH}`)
  }

  const verses = JSON.parse(fs.readFileSync(GITA_JSON_PATH, 'utf-8'))
  console.log(`Loaded ${verses.length} verses from JSON.`)

  const chapterNodes = {}

  for (const v of verses) {
    const chNum = v.chapter_number
    const vsNum = v.verse_number

    // Ensure Chapter Node exists
    if (!chapterNodes[chNum]) {
      const chNode = await prisma.nodes.create({
        data: {
          shastra_id: gita.id,
          parent_id: gitaRoot.id,
          level: 'chapter',
          slug: `bg-ch-${chNum}`,
          order_index: chNum,
          canonical_ref: `Chapter ${chNum}`
        }
      })
      chapterNodes[chNum] = chNode.id
      console.log(`Manifested Chapter ${chNum}`)
    }

    // Create Verse Node
    const vsNode = await prisma.nodes.create({
      data: {
        shastra_id: gita.id,
        parent_id: chapterNodes[chNum],
        level: 'verse',
        slug: `bg-${chNum}-${vsNum}`,
        order_index: vsNum,
        canonical_ref: `BG ${chNum}.${vsNum}`,
        sensitivity: 1
      }
    })

    // Create Sanskrit Text
    await prisma.texts.create({
      data: {
        node_id: vsNode.id,
        content: v.text,
        language: 'sa',
        content_type: 'sutra',
        script: 'devanagari'
      }
    })

    // Create Transliteration
    if (v.transliteration) {
      await prisma.texts.create({
        data: {
          node_id: vsNode.id,
          content: v.transliteration,
          language: 'sa',
          content_type: 'sutra',
          script: 'latin'
        }
      })
    }
    
    if (vsNum % 50 === 0) {
       console.log(`Progress: Manifested up to BG ${chNum}.${vsNum}`)
    }
  }

  console.log('✅ THE EXHAUSTIVE GITA HAS BEEN MANIFESTED.')
}

main()
  .catch((e) => {
    console.error('❌ MANIFESTATION FAILURE:', e.message)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
