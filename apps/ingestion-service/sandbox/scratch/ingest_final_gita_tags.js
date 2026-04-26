const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

const GITA_TAGS_DIR = '/Users/ppublications/Workspace/system/ui-lab/playground/ui-vedic-library-frontend-v2/docs/bg-tags-subtags'

async function main() {
  console.log('🌱 MANIFESTING THE EXHAUSTIVE NESTED GĪTĀ TAG CORPUS...')

  // 1. Ensure 'Bhagavad Gita' Structural Tag exists
  const gitaRoot = await prisma.tags.upsert({
    where: { slug: 'bhagavad-gita' },
    update: {},
    create: {
      slug: 'bhagavad-gita',
      name: 'Bhagavad Gītā',
      sanskrit_name: 'भगवद् गीता',
      type: 'STRUCTURAL'
    }
  })

  const files = fs.readdirSync(GITA_TAGS_DIR).filter(f => f.endsWith('.json'))
  console.log(`Found ${files.length} tag files.`)

  for (const file of files) {
    const filePath = path.join(GITA_TAGS_DIR, file)
    const rawData = fs.readFileSync(filePath, 'utf-8')
    if (!rawData || rawData.trim() === '') continue
    
    let categories
    try {
      categories = JSON.parse(rawData)
      if (!Array.isArray(categories)) categories = [categories]
    } catch (e) { 
      console.error(`❌ JSON PARSE ERROR in ${file}:`, e.message)
      continue 
    }

    for (const category of categories) {
      const categoryId = category.id || category.title.toLowerCase().replace(/ /g, '_')
      console.log(`⚖️ Processing Category: ${category.title || categoryId} under Bhagavad Gītā...`)

      // 2. Process Category Tag (Nested under Gītā Root)
      const categoryTag = await prisma.tags.upsert({
        where: { slug: categoryId.toLowerCase() },
        update: {
          parent_id: gitaRoot.id,
          name: category.title || categoryId,
          description: category.description || '',
          keywords: category.keywords || [],
          type: 'GITA_CATEGORY'
        },
        create: {
          slug: categoryId.toLowerCase(),
          name: category.title || categoryId,
          description: category.description || '',
          keywords: category.keywords || [],
          type: 'GITA_CATEGORY',
          parent_id: gitaRoot.id
        }
      })

      // 3. Process Subtags (Nested under Category)
      if (category.subtags && Array.isArray(category.subtags)) {
        for (const st of category.subtags) {
          const subtagSlug = st.id.toLowerCase()
          const fullDescription = `${st.description || ''}${st.examples ? '\n\nExamples:\n- ' + st.examples.join('\n- ') : ''}`

          await prisma.tags.upsert({
            where: { slug: subtagSlug },
            update: {
              parent_id: categoryTag.id,
              description: fullDescription,
              keywords: st.keywords || [],
              sanskrit_name: st.sanskrit || null,
              type: 'GITA_TOPIC'
            },
            create: {
              slug: subtagSlug,
              name: st.id.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
              description: fullDescription,
              keywords: st.keywords || [],
              type: 'GITA_TOPIC',
              parent_id: categoryTag.id,
              sanskrit_name: st.sanskrit || null
            }
          })
        }
      }
    }
  }

  console.log('✅ THE NESTED GĪTĀ SEMANTIC TAG CORPUS HAS BEEN MANIFESTED.')
}

main()
  .catch((e) => {
    console.error('❌ INGESTION FAILURE:', e.message)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
