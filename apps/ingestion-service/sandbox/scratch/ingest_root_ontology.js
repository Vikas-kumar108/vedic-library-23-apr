const { PrismaClient } = require('@prisma/client')
const fs = require('fs')

const prisma = new PrismaClient()

const ONTOLOGY_PATH = '/Users/ppublications/Workspace/system/ui-lab/playground/ui-vedic-library-frontend-v2/docs/rules/exhaustive_vedic_ontology.json'

async function ingestStructuralNode(node, key, parentId = null) {
  const slug = key.toLowerCase().replace(/_/g, '-')
  const name = node.name || key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  const sanskrit = node.sanskrit || null

  console.log(`⚖️ Ingesting ROOT Structural Tag: ${name} (${slug})...`)

  const tag = await prisma.tags.upsert({
    where: { slug: slug },
    update: {
      parent_id: parentId,
      sanskrit_name: sanskrit,
      type: 'STRUCTURAL'
    },
    create: {
      slug: slug,
      name: name,
      sanskrit_name: sanskrit,
      type: 'STRUCTURAL',
      parent_id: parentId
    }
  })

  // Recurse through children in 'vedic_universe' structure
  for (const [childKey, childValue] of Object.entries(node)) {
    if (childKey === 'name' || childKey === 'sanskrit' || childKey === 'ontology' || childKey === 'structure' || childKey === 'list') continue
    
    if (typeof childValue === 'object' && !Array.isArray(childValue)) {
      await ingestStructuralNode(childValue, childKey, tag.id)
    } else if (Array.isArray(childValue)) {
      for (const item of childValue) {
        if (typeof item === 'string') {
          const itemSlug = item.toLowerCase().replace(/_/g, '-')
          const itemName = item.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
          
          await prisma.tags.upsert({
            where: { slug: itemSlug },
            update: { parent_id: tag.id, type: 'STRUCTURAL' },
            create: {
              slug: itemSlug,
              name: itemName,
              type: 'STRUCTURAL',
              parent_id: tag.id
            }
          })
        }
      }
    }
  }
}

async function main() {
  console.log('🌱 MANIFESTING THE ABSOLUTE VEDIC ONTOLOGY...')
  const data = JSON.parse(fs.readFileSync(ONTOLOGY_PATH, 'utf-8'))

  for (const [key, value] of Object.entries(data.vedic_universe)) {
    await ingestStructuralNode(value, key)
  }

  console.log('✅ THE ABSOLUTE ONTOLOGY HAS BEEN MANIFESTED.')
}

main()
  .catch((e) => {
    console.error('❌ INGESTION FAILURE:', e.message)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
