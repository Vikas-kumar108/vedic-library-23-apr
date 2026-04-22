'use client'

import { Copy, Share2, Bookmark } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ActionBar() {
  return (
    <div className="flex items-center justify-center gap-2 py-4 border-t border-border mt-4">
      <Button variant="outline" size="sm" className="gap-2">
        <Copy className="w-4 h-4" />
        Copy
      </Button>

      <Button variant="outline" size="sm" className="gap-2">
        <Bookmark className="w-4 h-4" />
        Save
      </Button>

      <Button variant="outline" size="sm" className="gap-2">
        <Share2 className="w-4 h-4" />
        Share
      </Button>
    </div>
  )
}