import { Verse } from '@/lib/types'

export const sampleVerse: Verse = {
  id: 'bg-2-47',
  reference: {
    text: 'gita',
    chapter: 2,
    verse: 47,
  },
  text: {
    devanagari: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥ ४७ ॥',
    iast: 'karmaṇy evādhikāras te mā phaleṣu kadācana |\nmā karmaphalahetur bhūr mā te saṅgo\'stv akarmaṇi || 47 ||',
  },
  meanings: {
    synonyms: [
      { word: 'karmani', meaning: 'in prescribed duties' },
      { word: 'eva', meaning: 'certainly' },
      { word: 'adhikarah', meaning: 'right' },
    ],
    translations: {
      en: 'You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions.',
      hi: 'तुम्हें केवल कर्म करने का अधिकार है, फल पर कभी नहीं।',
    }
  },
  commentary: [
    {
      sampradaya: 'general',
      author: 'General Commentary',
      content: {
        en: 'This verse encapsulates the essence of Karma Yoga.',
      }
    }
  ],
  relations: {
    related_verses: [],
    courses: [],
    guidance: [],
    seva_domains: [],
  }
}
