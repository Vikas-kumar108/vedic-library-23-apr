import { TreeNode } from '@/lib/types'

const GITA_VERSE_COUNT: Record<number, number> = {
  1: 47, 2: 72, 3: 43, 4: 42, 5: 29, 6: 47, 7: 30, 8: 28, 9: 34, 10: 42,
  11: 55, 12: 20, 13: 35, 14: 27, 15: 20, 16: 24, 17: 28, 18: 78
}

/**
 * Helper to generate verse nodes for generic works (Vedas, Upanisads, etc.)
 * These don't have full data yet, so they are placeholders.
 */
function generatePlaceholderVerseNodes(chapterId: string, verseCount: number): TreeNode[] {
  return Array.from({ length: Math.min(verseCount, 10) }, (_, i) => ({
    id: `${chapterId}-v${i + 1}`,
    name: `${i + 1}`,
    type: 'verse' as const,
  }))
}

export const VEDIC_TREE: TreeNode[] = [
  {
    id: 'shruti',
    name: 'Shruti',
    sanskrit: 'श्रुति',
    type: 'category',
    meta: {
      authority: 'primary',
      description: 'Revealed knowledge (apaurusheya)'
    },
    children: [
      {
        id: 'vedas',
        name: 'Vedas',
        sanskrit: 'वेद',
        type: 'category',
        children: [
          {
            id: 'rigveda',
            name: 'Rgveda',
            sanskrit: 'ऋग्वेद',
            type: 'text',
            verseCount: 10552,
            children: [
              { id: 'rv-1', name: 'Mandala 1', type: 'chapter', verseCount: 191, children: generatePlaceholderVerseNodes('rv-1', 10) },
              { id: 'rv-2', name: 'Mandala 2', type: 'chapter', verseCount: 43, children: generatePlaceholderVerseNodes('rv-2', 10) },
              { id: 'rv-3', name: 'Mandala 3', type: 'chapter', verseCount: 62, children: generatePlaceholderVerseNodes('rv-3', 10) },
            ]
          },
          { id: 'yajurveda', name: 'Yajurveda', sanskrit: 'यजुर्वेद', type: 'text', verseCount: 1975 },
          { id: 'samaveda', name: 'Samaveda', sanskrit: 'सामवेद', type: 'text', verseCount: 1875 },
          { id: 'atharvaveda', name: 'Atharvaveda', sanskrit: 'अथर्ववेद', type: 'text', verseCount: 5977 }
        ]
      },
      {
        id: 'upanishads',
        name: 'Upanisads',
        sanskrit: 'उपनिषद्',
        type: 'category',
        children: [
          { id: 'isha', name: 'Isha Upanisad', sanskrit: 'ईशोपनिषद्', type: 'text', verseCount: 18, children: generatePlaceholderVerseNodes('isha', 18) },
          { id: 'kena', name: 'Kena Upanisad', sanskrit: 'केनोपनिषद्', type: 'text', verseCount: 35, children: generatePlaceholderVerseNodes('kena', 10) },
          { id: 'katha', name: 'Katha Upanisad', sanskrit: 'कठोपनिषद्', type: 'text', verseCount: 119 },
          { id: 'mundaka', name: 'Mundaka Upanisad', sanskrit: 'मुण्डकोपनिषद्', type: 'text', verseCount: 64 },
          { id: 'mandukya', name: 'Mandukya Upanisad', sanskrit: 'माण्डूक्योपनिषद्', type: 'text', verseCount: 12, children: generatePlaceholderVerseNodes('mandukya', 12) },
          { id: 'chandogya', name: 'Chandogya Upanisad', sanskrit: 'छान्दोग्योपनिषद्', type: 'text', verseCount: 627 },
          { id: 'brihadaranyaka', name: 'Brhadaranyaka Upanisad', sanskrit: 'बृहदारण्यकोपनिषद्', type: 'text', verseCount: 435 },
          { id: 'taittiriya', name: 'Taittiriya Upanisad', sanskrit: 'तैत्तिरीयोपनिषद्', type: 'text', verseCount: 31 },
          { id: 'aitareya', name: 'Aitareya Upanisad', sanskrit: 'ऐतरेयोपनिषद्', type: 'text', verseCount: 33 },
          { id: 'prashna', name: 'Prashna Upanisad', sanskrit: 'प्रश्नोपनिषद्', type: 'text', verseCount: 67 },
        ]
      }
    ]
  },
  {
    id: 'smriti',
    name: 'Smrti',
    sanskrit: 'स्मृति',
    type: 'category',
    meta: {
      authority: 'secondary'
    },
    children: [
      {
        id: 'itihasa',
        name: 'Itihasa',
        sanskrit: 'इतिहास',
        type: 'category',
        children: [
          {
            id: 'mahabharata',
            name: 'Mahabharata',
            sanskrit: 'महाभारत',
            type: 'text',
            verseCount: 100000,
            children: [
              {
                id: 'bhisma-parva',
                name: 'Bhisma Parva',
                sanskrit: 'भीष्म पर्व',
                type: 'section',
                children: [
                  {
                    id: 'bhagavad-gita',
                    name: 'Bhagavad Gita',
                    sanskrit: 'भगवद्गीता',
                    type: 'text',
                    verseCount: 700,
                    meta: {
                      corpus: 'gita',
                      authority: 'smrti',
                      tradition: 'itihasa',
                      structure: {
                        hierarchy: ['adhyaya', 'sloka'],
                        type: 'philosophical-dialogue'
                      },
                      themes: ['dharma', 'bhakti', 'jnana', 'karma-yoga'],
                      format: 'sloka',
                      relationships: {
                        partOf: ['mahabharata', 'bhisma-parva'],
                        references: ['upanisads', 'brahma-sutra'],
                        commentaries: ['sankara-bhasya', 'ramanuja-bhasya', 'madhva-bhasya', 'baladeva-govinda-bhasya']
                      }
                    },
                    children: generateGitaChapters()
                  }
                ]
              }
            ]
          },
          {
            id: 'ramayana',
            name: 'Ramayana',
            sanskrit: 'रामायण',
            type: 'text',
            verseCount: 24000,
            children: [
              { id: 'bala-kanda', name: 'Bala Kanda', sanskrit: 'बाल काण्ड', type: 'section', verseCount: 77 },
              { id: 'ayodhya-kanda', name: 'Ayodhya Kanda', sanskrit: 'अयोध्या काण्ड', type: 'section', verseCount: 119 },
              { id: 'aranya-kanda', name: 'Aranya Kanda', sanskrit: 'आरण्य काण्ड', type: 'section', verseCount: 75 },
              { id: 'kishkindha-kanda', name: 'Kishkindha Kanda', sanskrit: 'किष्किन्धा काण्ड', type: 'section', verseCount: 67 },
              { id: 'sundara-kanda', name: 'Sundara Kanda', sanskrit: 'सुन्दर काण्ड', type: 'section', verseCount: 68 },
              { id: 'yuddha-kanda', name: 'Yuddha Kanda', sanskrit: 'युद्ध काण्ड', type: 'section', verseCount: 128 },
              { id: 'uttara-kanda', name: 'Uttara Kanda', sanskrit: 'उत्तर काण्ड', type: 'section', verseCount: 111 },
            ]
          }
        ]
      },
      {
        id: 'puranas',
        name: 'Puranas',
        sanskrit: 'पुराण',
        type: 'category',
        children: [
          { id: 'bhagavata', name: 'Srimad Bhagavatam', sanskrit: 'श्रीमद्भागवतम्', type: 'text', verseCount: 18000 },
          { id: 'vishnu-purana', name: 'Visnu Purana', sanskrit: 'विष्णु पुराण', type: 'text', verseCount: 23000 },
          { id: 'shiva-purana', name: 'Shiva Purana', sanskrit: 'शिव पुराण', type: 'text', verseCount: 24000 },
          { id: 'garuda-purana', name: 'Garuda Purana', sanskrit: 'गरुड पुराण', type: 'text', verseCount: 19000 },
          { id: 'markandeya-purana', name: 'Markandeya Purana', sanskrit: 'मार्कण्डेय पुराण', type: 'text', verseCount: 9000 },
        ]
      },
      {
        id: 'dharmashastra',
        name: 'Dharmashastra',
        sanskrit: 'धर्मशास्त्र',
        type: 'category',
        children: [
          { id: 'manusmriti', name: 'Manusmrti', sanskrit: 'मनुस्मृति', type: 'text', verseCount: 2694 },
          { id: 'yajnavalkya-smriti', name: 'Yajnavalkya Smrti', sanskrit: 'याज्ञवल्क्य स्मृति', type: 'text', verseCount: 1010 },
        ]
      }
    ]
  },
  {
    id: 'darshana',
    name: 'Darshana',
    sanskrit: 'दर्शन',
    type: 'category',
    children: [
      { id: 'nyaya', name: 'Nyaya', sanskrit: 'न्याय', type: 'category' },
      { id: 'vaisheshika', name: 'Vaisheshika', sanskrit: 'वैशेषिक', type: 'category' },
      { id: 'sankhya', name: 'Sankhya', sanskrit: 'सांख्य', type: 'category' },
      {
        id: 'yoga-darshana',
        name: 'Yoga',
        sanskrit: 'योग',
        type: 'category',
        children: [
          {
            id: 'yoga-sutras',
            name: 'Yoga Sutras',
            sanskrit: 'योग सूत्र',
            type: 'text',
            verseCount: 196,
            children: [
              { id: 'ys-1', name: 'Samadhi Pada', type: 'chapter', verseCount: 51, children: generatePlaceholderVerseNodes('ys-1', 51) },
              { id: 'ys-2', name: 'Sadhana Pada', type: 'chapter', verseCount: 55, children: generatePlaceholderVerseNodes('ys-2', 55) },
              { id: 'ys-3', name: 'Vibhuti Pada', type: 'chapter', verseCount: 56, children: generatePlaceholderVerseNodes('ys-3', 56) },
              { id: 'ys-4', name: 'Kaivalya Pada', type: 'chapter', verseCount: 34, children: generatePlaceholderVerseNodes('ys-4', 34) },
            ]
          }
        ]
      },
      { id: 'mimamsa', name: 'Mimamsa', sanskrit: 'मीमांसा', type: 'category' },
      {
        id: 'vedanta-darshana',
        name: 'Vedanta',
        sanskrit: 'वेदान्त',
        type: 'category',
        children: [
          { id: 'brahma-sutras', name: 'Brahma Sutras', sanskrit: 'ब्रह्म सूत्र', type: 'text', verseCount: 555 }
        ]
      },
    ]
  }
]

function generateGitaVerses(chapter: number): TreeNode[] {
  const verses: TreeNode[] = []
  const total = GITA_VERSE_COUNT[chapter] || 0

  for (let v = 1; v <= total; v++) {
    verses.push({
      id: `bg-${chapter}-v${v}`,
      name: `${v}`,
      type: 'verse' as const,
      meta: {
        corpus: 'gita',
        chapter,
        verse: v
      }
    })
  }

  return verses
}

function generateGitaChapters() {
  const chapters: TreeNode[] = []
  for (let c = 1; c <= 18; c++) {
    chapters.push({
      id: `bg-${c}`,
      name: `Chapter ${c}`,
      type: 'chapter' as const,
      meta: {
        corpus: 'gita'
      },
      children: generateGitaVerses(c)
    })
  }
  return chapters
}