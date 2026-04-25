const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

const TAGS_DIR = '/Users/ppublications/Workspace/system/ui-lab/playground/ui-vedic-library-frontend-v2/apps/ingestion-service/data/ks-tags-subtags'

async function main() {
  console.log('🌱 MANIFESTING THE EXHAUSTIVE NESTED TAG CORPUS...')

  // 1. Ensure 'Kamasutra' Structural Tag exists
  const ksRoot = await prisma.tags.upsert({
    where: { slug: 'kama-sutra' },
    update: {},
    create: {
      slug: 'kama-sutra',
      name: 'Kāmasūtra',
      sanskrit_name: 'कामसूत्र',
      type: 'STRUCTURAL'
    }
  })

  const files = fs.readdirSync(TAGS_DIR).filter(f => f.endsWith('.json'))
  console.log(`Found ${files.length} tag files.`)

  for (const file of files) {
    const filePath = path.join(TAGS_DIR, file)
    const rawData = fs.readFileSync(filePath, 'utf-8')
    if (!rawData || rawData.trim() === '') continue
    
    let data
    try {
      data = JSON.parse(rawData)
    } catch (e) { continue }

    const groupId = data.id || file.replace('.json', '')
    console.log(`⚖️ Processing Category: ${data.title || groupId} under Kāmasūtra...`)

    // 2. Process Category Tag (Nested under KS Root)
    const categoryTag = await prisma.tags.upsert({
      where: { slug: groupId.toLowerCase() },
      update: {
        parent_id: ksRoot.id,
        name: data.title || groupId,
        description: data.description || '',
        keywords: data.keywords || [],
        type: 'CATEGORY',
        sanskrit_name: data.sanskrit || null
      },
      create: {
        slug: groupId.toLowerCase(),
        name: data.title || groupId,
        description: data.description || '',
        keywords: data.keywords || [],
        type: 'CATEGORY',
        parent_id: ksRoot.id,
        sanskrit_name: data.sanskrit || null
      }
    })

    // 3. Process Subtags (Nested under Category)
    if (data.subtags && Array.isArray(data.subtags)) {
      for (const st of data.subtags) {
        const subtagSlug = st.id.toLowerCase()
        const fullDescription = `${st.description || ''}${st.examples ? '\n\nExamples:\n- ' + st.examples.join('\n- ') : ''}`

        await prisma.tags.upsert({
          where: { slug: subtagSlug },
          update: {
            parent_id: categoryTag.id,
            description: fullDescription,
            keywords: st.keywords || [],
            sanskrit_name: st.sanskrit || null,
            type: 'TOPIC'
          },
          create: {
            slug: subtagSlug,
            name: st.id.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            description: fullDescription,
            keywords: st.keywords || [],
            type: 'TOPIC',
            parent_id: categoryTag.id,
            sanskrit_name: st.sanskrit || null
          }
        })
      }
    }
  }

  console.log('✅ THE NESTED SEMANTIC TAG CORPUS HAS BEEN MANIFESTED.')
}

main()
  .catch((e) => {
    console.error('❌ INGESTION FAILURE:', e.message)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
