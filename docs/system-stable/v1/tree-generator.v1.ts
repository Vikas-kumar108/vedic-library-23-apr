// docs/system-stable/v1/tree-generator.v1.ts

import { TreeNode } from '@/lib/types'
import { CORPUS_REGISTRY } from '@/data/corpus/registry'

/**
 * 🔒 LOCKED TREE GENERATOR v1
 *
 * Source of truth: CORPUS (not verse count)
 * This guarantees:
 * - No missing verses
 * - No mismatch bugs
 * - Auto-sync with dataset
 */

export function generateGitaTree(): TreeNode {
  const corpus = CORPUS_REGISTRY['gita']

  if (!corpus) {
    throw new Error('Gita corpus not found')
  }

  const chaptersMap: Record<number, number[]> = {}

  // 🧠 Step 1: Parse all verse keys
  Object.keys(corpus).forEach((key) => {
    // format: bg-2-v47
    const match = key.match(/bg-(\d+)-v(\d+)/)
    if (!match) return

    const chapter = parseInt(match[1])
    const verse = parseInt(match[2])

    if (!chaptersMap[chapter]) {
      chaptersMap[chapter] = []
    }

    chaptersMap[chapter].push(verse)
  })

  // 🧠 Step 2: Build chapter nodes
  const chapters: TreeNode[] = Object.entries(chaptersMap)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([chapterStr, verses]) => {
      const chapter = Number(chapterStr)

      const verseNodes: TreeNode[] = verses
        .sort((a, b) => a - b)
        .map((v) => ({
          id: `bg-${chapter}-v${v}`,
          name: `${v}`,
          type: 'verse',
          meta: {
            corpus: 'gita',
            chapter,
            verse: v,
          },
        }))

      return {
        id: `bg-${chapter}`,
        name: `Chapter ${chapter}`,
        type: 'chapter',
        children: verseNodes,
      }
    })

  // 🧠 Step 3: Root node
  return {
    id: 'gita-root',
    name: 'Bhagavad Gita',
    type: 'corpus',
    children: chapters,
  }
}