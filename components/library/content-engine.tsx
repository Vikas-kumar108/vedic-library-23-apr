'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

import { useVerse } from '@/lib/hooks/use-verse'

import { VerseHeader } from '@/components/sections/verse-header'
import { ActionBar } from '@/components/sections/action-bar'

import { VerseSection } from '@/components/library/content/verse-section'
import { MeaningSection } from '@/components/library/content/meaning-section'
import { TranslationSection } from '@/components/library/content/translation-section'
import { CommentarySection } from '@/components/library/content/commentary-section'

interface ContentEngineProps {
  className?: string
}

export function ContentEngine({ className }: ContentEngineProps) {
  const { verse, isLoading, error } = useVerse()

  if (isLoading) {
    return (
      <div className={cn("flex flex-col items-center justify-center h-full space-y-4", className)}>
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-muted-foreground animate-pulse">Loading sacred verse...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className={cn("flex flex-col items-center justify-center h-full text-center p-8", className)}>
        <p className="text-destructive mb-2 font-semibold">Error loading verse</p>
        <p className="text-muted-foreground text-sm">{error}</p>
      </div>
    )
  }

  if (!verse) {
    return (
      <div className={cn("flex items-center justify-center h-full", className)}>
        <EmptyState />
      </div>
    )
  }

  return (
    <ScrollArea className={cn("h-full", className)}>
      <div className="p-4 max-w-4xl mx-auto space-y-4">
        <VerseHeader verse={verse} />
        <VerseSection verse={verse} />
        <MeaningSection verse={verse} />
        <TranslationSection verse={verse} />
        <CommentarySection verse={verse} />
        <ActionBar />
      </div>
    </ScrollArea>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <div className="w-20 h-20 rounded-full bg-accent/50 flex items-center justify-center mb-6">
        <svg
          className="w-10 h-10 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      </div>

      <h3 className="text-xl font-semibold text-foreground mb-2">
        Select a Verse
      </h3>

      <p className="text-muted-foreground max-w-sm">
        Navigate the Vedic corpus tree on the left to explore verses, chapters, and sacred texts.
      </p>
    </div>
  )
}