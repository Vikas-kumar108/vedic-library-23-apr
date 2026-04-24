'use client'

import { useState, useEffect } from 'react'
import { useAppStore } from '@/lib/store'

export function useLibraryTree() {
  const { setTree, tree } = useAppStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Only fetch if tree is empty
    if (tree.length > 0) return

    async function fetchTree() {
      try {
        setLoading(true)
        const res = await fetch('/api/library/tree')
        if (res.ok) {
          const data = await res.json()
          setTree(data)
        } else {
          setError('Failed to manifest shastra tree')
        }
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchTree()
  }, [setTree, tree.length])

  return { tree, loading, error }
}
