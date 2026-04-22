// docs/system-stable/v1/data-resolver.v1.ts

import { CORPUS_REGISTRY } from '@/data/corpus/registry'
import { normalizeVerse } from '@/lib/normalizers/verse'
import { Verse, TreeNode } from '@/lib/types'

export function getVerseFromNode(node: TreeNode | null): Verse | null {
  if (!node) return null

  if (node.type !== 'verse') return null

  const meta = node.meta
  if (!meta?.corpus) return null

  const corpus = CORPUS_REGISTRY[meta.corpus]
  if (!corpus) return null

  const raw = corpus[node.id]

  if (!raw) {
    return {
      id: node.id,
      reference: {
        chapter: meta.chapter!,
        verse: meta.verse!,
      },
      text: {
        sanskrit: '',
        transliteration: 'Text not available',
      },
      meanings: [],
      translations: {
        en: 'This verse is not yet available in the dataset.',
      },
      commentaries: [],
      relations: {},
    }
  }

  return normalizeVerse(raw)
}