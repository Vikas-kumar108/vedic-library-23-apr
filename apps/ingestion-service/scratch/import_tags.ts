import { PrismaClient } from '@dharma/data-access'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()
const TAGS_DIR = '/Users/ppublications/Workspace/system/ui-lab/playground/ui-vedic-library-frontend-v2/apps/ingestion-service/data/ks-tags-subtags'

async function main() {
  console.log('🏷️ Importing Tags and Subtags...')

  const files = fs.readdirSync(TAGS_DIR).filter(f => f.endsWith('.json') && !f.startsWith('@'))

  for (const file of files) {
    const filePath = path.join(TAGS_DIR, file)
    const stats = fs.statSync(filePath)
    if (stats.size === 0) {
      console.warn(`  ! Skipping empty file: ${file}`)
      continue
    }
    
    const content = fs.readFileSync(filePath, 'utf-8')
    if (!content.trim()) continue
    
    const data = JSON.parse(content)

    console.log(`  > Processing ${data.id}...`)

    // Create Parent Tag
    const parentTag = await prisma.tag.upsert({
      where: { slug: data.id },
      update: {
        name: data.title,
        description: data.description,
        keywords: data.keywords || [],
      },
      create: {
        slug: data.id,
        name: data.title,
        description: data.description,
        keywords: data.keywords || [],
      },
    })

    if (data.subtags && Array.isArray(data.subtags)) {
      for (const sub of data.subtags) {
        await prisma.tag.upsert({
          where: { slug: sub.id },
          update: {
            name: sub.id.split('_').map((s: string) => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
            description: sub.description,
            sanskritName: sub.sanskrit,
            keywords: sub.keywords || [],
            parentId: parentTag.id,
          },
          create: {
            slug: sub.id,
            name: sub.id.split('_').map((s: string) => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
            description: sub.description,
            sanskritName: sub.sanskrit,
            keywords: sub.keywords || [],
            parentId: parentTag.id,
          },
        })
      }
    }
  }

  console.log('✅ Tags Ingestion Complete.')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
