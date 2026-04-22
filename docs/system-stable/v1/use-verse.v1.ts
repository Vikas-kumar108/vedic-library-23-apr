// docs/system-stable/v1/use-verse.v1.ts

'use client'

import { useMemo } from 'react'
import { TreeNode, Verse } from '@/lib/types'
import { getVerseFromNode } from '@/lib/data-resolver'

export function useVerse(node: TreeNode | null): Verse | null {
  return useMemo(() => {
    if (!node) return null
    if (node.type !== 'verse') return null
    return getVerseFromNode(node)
  }, [node])
}