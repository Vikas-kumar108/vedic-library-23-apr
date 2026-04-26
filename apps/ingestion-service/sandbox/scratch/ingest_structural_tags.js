const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

const ONTOLOGY_PATH = '/Users/ppublications/Workspace/system/ui-lab/playground/ui-vedic-library-frontend-v2/docs/rules/exhaustive_vedic_ontology.json'

async function ingestNode(node, key, parentId = null) {
  const slug = key.toLowerCase().replace(/_/g, '-')
  const name = node.name || key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  const sanskrit = node.sanskrit || null

  console.log(`⚖️ Ingesting Structural Tag: ${name} (${slug})...`)

  const tag = await prisma.tags.upsert({
    where: { slug: slug },
    update: {
      parent_id: parentId,
      sanskrit_name: sanskrit
    },
    create: {
      slug: slug,
      name: name,
      sanskrit_name: sanskrit,
      type: 'STRUCTURAL',
      parent_id: parentId
    }
  })

  // Recurse through children
  for (const [childKey, childValue] of Object.entries(node)) {
    if (childKey === 'name' || childKey === 'sanskrit' || childKey === 'ontology' || childKey === 'structure' || childKey === 'list') continue
    
    if (typeof childValue === 'object' && !Array.isArray(childValue)) {
      await ingestNode(childValue, childKey, tag.id)
    } else if (Array.isArray(childValue)) {
      for (const item of childValue) {
        if (typeof item === 'string') {
          await ingestNode({}, item, tag.id)
        } else if (typeof item === 'object') {
          // Handle complex items like { "bhaktivinoda_thakura": [...] }
          for (const [subKey, subVal] of Object.entries(item)) {
            await ingestNode({ name: subKey.replace(/_/g, ' '), children: subVal }, subKey, tag.id)
          }
        }
      }
    }
  }
}

async function main() {
  console.log('🌱 MANIFESTING THE EXHAUSTIVE STRUCTURAL TAGS...')
  const ontology = JSON.parse(fs.readFileSync(ONTOLOGY_PATH, 'utf-8'))

  for (const [key, value] of Object.entries(ontology.vedic_universe)) {
    await ingestNode(value, key)
  }

  console.log('✅ THE STRUCTURAL TAGS HAVE BEEN MANIFESTED.')
}

main()
  .catch((e) => {
    console.error('❌ INGESTION FAILURE:', e.message)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
