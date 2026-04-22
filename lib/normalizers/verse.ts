import { Verse } from '@/lib/types'

/**
 * Normalizes raw corpus data into the canonical Verse shape used by
 * all content-engine components.
 */
export function normalizeVerse(raw: any): Verse {
  if (!raw) return raw

  // ---------- SAFETY WARNINGS ----------
  if (!raw.translations?.en) {
    console.warn(`Missing English translation for ${raw.id}`)
  }

  // ---------- NORMALIZATION ----------
  return {
    id: raw.id,

    reference: {
      text: raw.text ?? 'gita',
      chapter: raw.chapter,
      verse: raw.verse,
    },

    text: {
      devanagari: raw.sanskrit ?? '',
      iast: raw.transliteration ?? '',
      telugu: raw.telugu ?? undefined,
    },

    meanings: {
      synonyms: raw.synonyms ?? [],

      translations: raw.translations ?? {},

      segmentation: raw.segmentation ?? '',

      anvaya: raw.anvaya ?? '',

      anvayaTranslation: raw.anvayaTranslation ?? {},
    },

    // Keep per-author translations for the translation section
    translationsByAuthor: raw.translationsByAuthor ?? [],

    // Word meanings string (raw format from JSON)
    wordMeanings: raw.word_meanings ?? '',

    commentary: (raw.commentaries ?? []).map((c: any) => ({
      sampradaya: c.sampradaya ?? 'general',

      author: c.author ?? 'Unknown',

      content: c.content ?? {},

      subCommentaries: c.subCommentaries ?? [],
    })),

    meta: {
      meter: raw.meter ?? 'Anushtup',
      theme: raw.theme ?? '',
    },

    relations: raw.relations ?? {
      related_verses: [],
      courses: [],
      guidance: [],
      seva_domains: [],
    },
  }
}