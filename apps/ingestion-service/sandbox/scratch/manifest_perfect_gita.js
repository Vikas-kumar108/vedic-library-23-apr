const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

const PROJECT_ROOT = '/Users/ppublications/Workspace/system/ui-lab/playground/ui-vedic-library-frontend-v2'
const GITA_JSON_PATH = path.join(PROJECT_ROOT, 'apps/ingestion-service/data/gita-data/verse.json')

async function main() {
  console.log('🌱 MANIFESTING THE PERFECT BHAGAVAD GĪTĀ...')

  // 1. Manifest Shastra
  const gita = await prisma.shastras.create({
    data: {
      name: 'Bhagavad Gītā',
      slug: 'bhagavad-gita',
      structure_type: 'adhyaya-shloka',
      status: 'ACTIVE'
    }
  })

  // 2. Manifest Root Node (Level: text)
  const gitaRoot = await prisma.nodes.create({
    data: {
      shastra_id: gita.id,
      slug: 'bg',
      level: 'shastra',
      canonical_ref: 'Bhagavad Gītā',
      sensitivity: 1,
      order_index: 0
    }
  })
  const rootPath = 'smriti.itihasa.mahabharata.bg'
  await prisma.$executeRawUnsafe(`UPDATE nodes SET path = '${rootPath}'::ltree WHERE id = '${gitaRoot.id}'`)

  // 3. Load Verses
  const verses = JSON.parse(fs.readFileSync(GITA_JSON_PATH, 'utf-8'))
  console.log(`Ingesting ${verses.length} Ślokas...`)

  const adhyayaNodes = {}

  for (const v of verses) {
    const adhyayaNum = v.chapter_number
    const shlokaNum = v.verse_number

    // Ensure Adhyāya Node exists
    if (!adhyayaNodes[adhyayaNum]) {
      const adhyayaNode = await prisma.nodes.create({
        data: {
          shastra_id: gita.id,
          parent_id: gitaRoot.id,
          level: 'adhyaya',
          slug: `bg.adhyaya.${adhyayaNum}`,
          order_index: adhyayaNum,
          canonical_ref: `BG.${adhyayaNum}`
        }
      })
      adhyayaNodes[adhyayaNum] = adhyayaNode.id
      const adhyayaPath = `${rootPath}.adhyaya_${adhyayaNum}`
      await prisma.$executeRawUnsafe(`UPDATE nodes SET path = '${adhyayaPath}'::ltree WHERE id = '${adhyayaNode.id}'`)
      console.log(`Manifested Adhyāya ${adhyayaNum}`)
    }

    // Create Śloka Node
    const shlokaNode = await prisma.nodes.create({
      data: {
        shastra_id: gita.id,
        parent_id: adhyayaNodes[adhyayaNum],
        level: 'shloka',
        slug: `bg.shloka.${adhyayaNum}.${shlokaNum}`,
        order_index: shlokaNum,
        canonical_ref: `BG.${adhyayaNum}.${shlokaNum}`,
        sensitivity: 1
      }
    })
    const shlokaPath = `${rootPath}.adhyaya_${adhyayaNum}.shloka_${shlokaNum}`
    await prisma.$executeRawUnsafe(`UPDATE nodes SET path = '${shlokaPath}'::ltree WHERE id = '${shlokaNode.id}'`)

    // Manifest Śloka Text (Sanskrit)
    await prisma.texts.create({
      data: {
        node_id: shlokaNode.id,
        content: v.text,
        language: 'sa',
        content_type: 'shloka',
        script: 'devanagari'
      }
    })

    // Manifest Anuvāda (Transliteration)
    if (v.transliteration) {
      await prisma.texts.create({
        data: {
          node_id: shlokaNode.id,
          content: v.transliteration,
          language: 'sa',
          content_type: 'anuvada',
          script: 'latin'
        }
      })
    }

    if (shlokaNum % 50 === 0) {
      console.log(`Progress: Manifested up to BG.${adhyayaNum}.${shlokaNum}`)
    }
  }

  console.log('✅ THE PERFECT BHAGAVAD GĪTĀ HAS BEEN MANIFESTED.')
}

main()
  .catch((e) => {
    console.error('❌ MANIFESTATION FAILURE:', e.message)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
