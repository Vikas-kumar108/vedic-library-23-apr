import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()
const DATA_DIR = './data/ks-prakarana-output'

async function main() {
  console.log('Kama Sutra Content Importer (Content Only)...')
  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json') && !f.includes('-v2') && !f.includes('-v3'))
  
  for (const file of files) {
    const data = JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf-8'))
    for (const sutra of data.sutras) {
      const sutraId = `ks-${data.global_prakarana_id}-${sutra.number.replace(/\./g, '-')}`
      await prisma.verse.upsert({
        where: { id: sutraId },
        update: { chapterNumber: data.adhyaya_number, verseNumber: parseInt(sutra.number.split('.').pop() || '0'), unitType: 'sutra', scripts: { devanagari: sutra.text } },
        create: { id: sutraId, chapterNumber: data.adhyaya_number, verseNumber: parseInt(sutra.number.split('.').pop() || '0'), unitType: 'sutra', scripts: { devanagari: sutra.text } }
      })
    }
  }
  console.log('Kama Sutra content import complete.')
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect())
