const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

const TAGS_DIR = '/Users/ppublications/Workspace/system/ui-lab/playground/ui-vedic-library-frontend-v2/apps/ingestion-service/data/ks-tags-subtags'

async function main() {
  console.log('🌱 INGESTING THE EXHAUSTIVE SEMANTIC TAG CORPUS...')

  const files = fs.readdirSync(TAGS_DIR).filter(f => f.endsWith('.json'))
  console.log(`Found ${files.length} tag files.`)

  for (const file of files) {
    const filePath = path.join(TAGS_DIR, file)
    console.log(`📂 READING FILE: ${file}...`)
    const rawData = fs.readFileSync(filePath, 'utf-8')
    if (!rawData || rawData.trim() === '') {
      console.warn(`⚠️ SKIPPING EMPTY FILE: ${file}`)
      continue
    }
    
    let data
    try {
      data = JSON.parse(rawData)
    } catch (e) {
      console.error(`❌ JSON PARSE ERROR in ${file}:`, e.message)
      continue
    }

    const groupId = data.id || file.replace('.json', '')
    console.log(`⚖️ Processing Group: ${groupId}...`)

    // 1. Process Group Tag (The File itself)
    const groupTag = await prisma.tags.upsert({
      where: { slug: groupId.toLowerCase() },
      update: {},
      create: {
        slug: groupId.toLowerCase(),
        name: data.title || groupId,
        description: data.description || '',
        keywords: data.keywords || [],
        type: 'GROUP',
        sanskrit_name: data.sanskrit || null
      }
    })

    // 2. Process Subtags
    if (data.subtags && Array.isArray(data.subtags)) {
      for (const st of data.subtags) {
        const subtagSlug = st.id.toLowerCase()
        const fullDescription = `${st.description || ''}${st.examples ? '\n\nExamples:\n- ' + st.examples.join('\n- ') : ''}`

        await prisma.tags.upsert({
          where: { slug: subtagSlug },
          update: {
            parent_id: groupTag.id,
            description: fullDescription,
            keywords: st.keywords || [],
            sanskrit_name: st.sanskrit || null
          },
          create: {
            slug: subtagSlug,
            name: st.id.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            description: fullDescription,
            keywords: st.keywords || [],
            type: groupId,
            parent_id: groupTag.id,
            sanskrit_name: st.sanskrit || null
          }
        })
      }
    }
  }

  console.log('✅ THE SEMANTIC TAG CORPUS HAS BEEN MANIFESTED.')
}

main()
  .catch((e) => {
    console.error('❌ INGESTION FAILURE:', e.message)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
