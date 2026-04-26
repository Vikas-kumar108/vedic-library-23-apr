import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Inserting test data...')
  
  // 1. Gita 1.1 Translations (Bengali, Marathi, Kannada)
  const gita1_1_Id = 'bg-1-v1'
  
  const translations = [
    {
      verseId: gita1_1_Id,
      authorName: 'Traditional (Bengali)',
      language: 'bengali',
      description: 'ধৃতরাষ্ট্র বললেন: হে সঞ্জয়, ধর্মভূমি কুরুক্ষেত্রে যুদ্ধের জন্য সমবেত হয়ে আমার পুত্রগণ এবং পাণ্ডুপুত্রগণ কি করল?'
    },
    {
      verseId: gita1_1_Id,
      authorName: 'Traditional (Marathi)',
      language: 'marathi',
      description: 'धृतराष्ट्र म्हणाला: हे संजया, धर्मभूमी कুরুक्षेत्रावर युद्धासाठी एकत्र आलेल्या माझ्या मुलांनी आणि पांडुपुत्रांनी काय केले?'
    },
    {
      verseId: gita1_1_Id,
      authorName: 'Traditional (Kannada)',
      language: 'kannada',
      description: 'ಧೃತರಾಷ್ಟ್ರನು ಹೇಳಿದನು: ಎಲೈ ಸಂಜಯನೇ, ಧರ್ಮಕ್ಷೇತ್ರವಾದ ಕುರುಕ್ಷೇತ್ರದಲ್ಲಿ ಯುದ್ಧಕ್ಕಾಗಿ ಸೇರಿದ ನನ್ನ ಮತ್ತು ಪಾಂಡುವಿನ ಪುತ್ರರು ಏನು ಮಾಡಿದರು?'
    }
  ]

  for (const t of translations) {
    await prisma.translation.create({ data: t })
    console.log(`Created ${t.language} translation for ${gita1_1_Id}`)
  }

  // 2. Gita 2.47 Commentary (Russian)
  const gita2_47_Id = 'bg-2-v47'
  
  // First ensure Gita 2.47 exists (it might not be in the DB if only 1.1 was loaded)
  // Actually, I'll check if it exists first.
  const v2_47 = await prisma.verse.findUnique({ where: { id: gita2_47_Id } })
  if (!v2_47) {
    console.log(`Verse ${gita2_47_Id} not found, creating a placeholder...`)
    await prisma.verse.create({
      data: {
        id: gita2_47_Id,
        chapterNumber: 2,
        verseNumber: 47,
        scripts: { devanagari: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मফলहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि।।', iast: 'karmaṇy-evādhikāras te mā phaleṣhu kadāchana' }
      }
    })
  }

  await prisma.commentary.create({
    data: {
      verseId: gita2_47_Id,
      authorName: 'Иван Иванов (Ivan Ivanov)',
      language: 'russian',
      description: 'Ваше право — только на действие, но никогда — на его плоды. Пусть плоды действий не будут вашим мотивом, и пусть у вас не будет привязанности к бездействию.'
    }
  })
  console.log(`Created Russian commentary for ${gita2_47_Id}`)

  console.log('Test data insertion complete.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
