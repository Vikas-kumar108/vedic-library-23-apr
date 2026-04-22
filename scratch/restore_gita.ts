import { PrismaClient } from '@prisma/client'
import fs from 'fs'

const prisma = new PrismaClient()

async function main() {
  console.log('Restoring Gita Content Only...')
  const content = fs.readFileSync('scratch/verse_texts_backup.txt', 'utf-8')
  const lines = content.split('\n')
  
  for (const line of lines) {
    if (!line.trim()) continue
    const [id, devanagari, iast] = line.split('|')
    if (!id || !devanagari) continue

    const cleanId = id.replace('-v', '-')
    const parts = cleanId.split('-')
    const chNum = parseInt(parts[1])
    const vNum = parseInt(parts[2])

    await prisma.verse.upsert({
      where: { id: cleanId },
      update: { scripts: { devanagari, iast }, chapterNumber: chNum, verseNumber: vNum, unitType: 'sloka' },
      create: { id: cleanId, chapterNumber: chNum, verseNumber: vNum, unitType: 'sloka', scripts: { devanagari, iast } }
    })
  }
  console.log('Gita Content restoration complete.')
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect())
