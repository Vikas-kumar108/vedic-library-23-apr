import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Inserting robust test data (Content Only)...')

  // Authors
  const sp = await prisma.author.upsert({
    where: { name: 'Śrīla Prabhupāda' },
    update: {},
    create: { name: 'Śrīla Prabhupāda', role: 'translator' }
  })

  // Gita 2.3
  const gita2_3_Id = 'bg-2-3'
  await prisma.verse.upsert({
    where: { id: gita2_3_Id },
    update: { scripts: { devanagari: 'क्लैब्यं मा स्म गमः पार्थ...', bengali: 'ক্লৈব্যং মা স্ম গমঃ পার্থ...' } },
    create: { id: gita2_3_Id, chapterNumber: 2, verseNumber: 3, unitType: 'sloka', scripts: { devanagari: 'क्लैब्यं मा स्म गमः पार्थ...', bengali: 'ক্লৈব্যং মা স্ম গমঃ পার্থ...' } }
  })

  // Gita 1.1
  const gita1_1_Id = 'bg-1-1'
  await prisma.verse.upsert({
    where: { id: gita1_1_Id },
    update: { synonyms: { mr: [{ word: 'धृतराष्ट्र उवाच', meaning: 'धृतराष्ट्र म्हणाला' }] } },
    create: { id: gita1_1_Id, chapterNumber: 1, verseNumber: 1, unitType: 'sloka', synonyms: { mr: [{ word: 'धृतराष्ट्र उवाच', meaning: 'धृतराष्ट्र म्हणाला' }] } }
  })

  console.log('Test data injection complete.')
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect())
