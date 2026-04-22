import { CORPUS_REGISTRY } from '@/data/corpus/registry'
import { normalizeVerse } from './normalizers/verse'
import { Verse, TreeNode } from '@/lib/types'

const DEBUG = false

function log(...args: any[]) {
  if (DEBUG) console.log(...args)
}

function warn(...args: any[]) {
  if (DEBUG) console.warn(...args)
}

export function getVerseFromNode(node: TreeNode | null): Verse | null {
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  log('📍 RESOLVER START')

  if (!node) {
    warn('❌ No node received')
    return null
  }

  log('📦 NODE:', node)

  // ✅ Only resolve verse nodes
  if (node.type !== 'verse') {
    warn('⛔ Not a verse node → skipping resolver')
    return null
  }

  const meta = node.meta
  log('🧠 META:', meta)

  if (!meta?.corpus) {
    warn('❌ Missing meta.corpus → cannot resolve')
    return null
  }

  const corpus = (CORPUS_REGISTRY as Record<string, Record<string, any>>)[meta.corpus]
  if (!corpus) {
    warn('❌ Corpus not found:', meta.corpus)
    return null
  }

  log('📚 CORPUS FOUND:', meta.corpus)

  const key = node.id
  log('🔎 LOOKING FOR KEY:', key)

  const raw = corpus[key]

  // ✅ SAFE FALLBACK — return a valid Verse shape
  if (!raw) {
    warn('❌ Verse not found in corpus:', key)

    return {
      id: node.id,
      reference: {
        text: meta.corpus,
        chapter: meta.chapter ?? 0,
        verse: meta.verse ?? 0,
      },
      text: {
        devanagari: '',
        iast: '',
      },
      meanings: {
        synonyms: [],
        translations: {
          en: 'This verse is not yet available in the dataset.',
        },
      },
      commentary: [],
      relations: {
        related_verses: [],
        courses: [],
        guidance: [],
        seva_domains: [],
      },
    }
  }

  log('✅ RAW VERSE FOUND:', raw)

  const normalized = normalizeVerse(raw)
  log('✨ NORMALIZED VERSE:', normalized)

  return normalized
}