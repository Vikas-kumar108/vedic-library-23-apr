import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting migration from source JSON...')
  
  const verseJsonPath = path.join(process.cwd(), 'data/gita-data/verse.json')
  const verseData = JSON.parse(fs.readFileSync(verseJsonPath, 'utf-8'))
  
  console.log(`Found ${verseData.length} verses in JSON.`)

  for (const item of verseData) {
    const verseId = `bg-${item.chapter_number}-v${item.verse_number}`
    const scripts: Record<string, string> = {}
    
    if (item.text) scripts.devanagari = item.text.trim()
    if (item.transliteration) scripts.iast = item.transliteration.trim()
    
    // Check if verse exists
    const existing = await prisma.verse.findUnique({ where: { id: verseId } })
    
    if (existing) {
      await prisma.verse.update({
        where: { id: verseId },
        data: {
          scripts: scripts
        }
      })
      // console.log(`Updated verse ${verseId}`)
    } else {
      console.warn(`Verse ${verseId} not found in DB, skipping.`)
    }
  }

  console.log('Migration complete.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
