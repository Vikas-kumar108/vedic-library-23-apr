import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Injecting sample data for multi-ontology support...')

  const samples = [
    {
      id: 'rv-1-1-1',
      chapterNumber: 1,
      verseNumber: 1,
      unitType: 'mantra',
      scripts: JSON.stringify({
        devanagari: 'अग्निमीळे पुरोहितं यज्ञस्य देवमृत्विजम् । होतारं रत्नधातमम् ॥',
        iast: 'agnimīḷe purohitaṁ yajñasya devamṛtvijam | hotāraṁ ratnadhātamam ||'
      })
    },
    {
      id: 'ys-1-1',
      chapterNumber: 1,
      verseNumber: 1,
      unitType: 'sutra',
      scripts: JSON.stringify({
        devanagari: 'अथ योगानुशासनम्',
        iast: 'atha yogānuśāsanam'
      })
    },
    {
      id: 'sb-1-1-1',
      chapterNumber: 1,
      verseNumber: 1,
      unitType: 'sloka',
      scripts: JSON.stringify({
        devanagari: 'जन्माद्यस्य यतोऽन्वयादितरतश्चार्थेष्वभिज्ञ: स्वराट् ...',
        iast: 'janmādy asya yato \'nvayād itarataś cārtheṣv abhijñaḥ svarāṭ ...'
      })
    }
  ]

  for (const s of samples) {
    await prisma.verse.upsert({
      where: { id: s.id },
      update: s,
      create: s
    })
  }

  console.log('Sample data injection complete.')
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect())
