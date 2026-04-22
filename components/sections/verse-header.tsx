'use client'

import { ChevronLeft, ChevronRight, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Verse } from '@/lib/types'

interface Props {
  verse: Verse
}

export function VerseHeader({ verse }: Props) {
  const ref = verse.reference

  const getDisplayName = (text: string) => {
    const map: Record<string, string> = {
      'gita': 'Bhagavad Gītā',
      'kama-sutra': 'Kāma Sūtra',
    }
    return map[text] || text.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')
  }

  return (
    <div className="border-b border-border pb-4 mb-4">
      {/* Navigation */}
      <div className="flex items-center justify-between mb-3">
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground gap-1">
          <ChevronLeft className="w-4 h-4" />
          Prev
        </Button>

        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold text-foreground">
            {getDisplayName(ref.text)} {ref.chapter}.{ref.verse}
          </h1>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>

        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground gap-1">
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Theme tag */}
      {verse.meta?.theme && (
        <div className="text-center">
          <p className="text-sm italic text-muted-foreground">
            {verse.meta.theme}
          </p>
        </div>
      )}
    </div>
  )
}