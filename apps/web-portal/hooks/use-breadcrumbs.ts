'use client'

import { useMemo, useCallback } from 'react'
import { useAppStore } from '@/lib/store'
import { findNodePath } from '@/lib/tree-utils'

export function useBreadcrumbs() {
  const { currentNode, setCurrentNode, tree } = useAppStore()

  const breadcrumbPath = useMemo(() => {
    if (!currentNode || tree.length === 0) return []
    const path = findNodePath(tree, currentNode.id)
    return path?.map(node => ({
      id: node.id,
      name: node.name,
    })) || []
  }, [currentNode, tree])

  const navigateToBreadcrumb = useCallback((id: string) => {
    if (id === 'root') {
      setCurrentNode(null)
      return
    }
    const path = findNodePath(tree, id)
    const node = path?.[path.length - 1] || null
    setCurrentNode(node)
  }, [setCurrentNode, tree])

  return { breadcrumbPath, navigateToBreadcrumb }
}
