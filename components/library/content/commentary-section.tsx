'use client'

import { useState, useMemo } from 'react'
import { Volume2 } from 'lucide-react'
import { Verse } from '@/lib/types'
import { useAppStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { CollapsibleSection } from '@/components/molecules/collapsible-section'

interface Props {
  verse: Verse
}

export function CommentarySection({ verse }: Props) {
  const availableLangs = useMemo(() => {
    const langs = new Set<string>()
    verse?.commentary?.forEach((c) => {
      Object.keys(c.content || {}).forEach((k) => langs.add(k))
    })
    return Array.from(langs)
  }, [verse?.commentary])

  const [activeLang, setActiveLang] = useState(availableLangs[0] || 'en')

  const getLabel = (lang: string) => {
    const map: Record<string, string> = {
      en: 'English',
      hi: 'Hindi',
      sa: 'Sanskrit',
      ru: 'Russian',
      bn: 'Bengali',
      mr: 'Marathi',
      kn: 'Kannada',
    }
    return map[lang] || lang.toUpperCase()
  }

  // ✅ Use verse.commentary (the canonical field name)
  const commentaries = verse?.commentary ?? []

  // Filter by language — each commentary has content like { hi: "..." } or { en: "..." }
  const filtered = useMemo(() => {
    return commentaries.filter((c) => {
      // Check if this commentary has content in the active language
      return c.content?.[activeLang as keyof typeof c.content]
    })
  }, [commentaries, activeLang])

  // If no commentaries match the language, show all that have any content
  const displayList = useMemo(() => {
    if (filtered.length > 0) return filtered
    // Fallback: show all commentaries with any content
    return commentaries.filter((c) => {
      return Object.values(c.content || {}).some(Boolean)
    })
  }, [filtered, commentaries])

  return (
    <CollapsibleSection
      title="Commentary"
      rightSlot={<Volume2 className="w-4 h-4" />}
    >
      {/* Language tabs */}
      <div
        className="flex border-b border-border overflow-x-auto"
        style={{ backgroundColor: 'var(--knowledge-blue)' }}
      >
        {availableLangs.map((lang) => (
          <button
            key={lang}
            onClick={() => setActiveLang(lang)}
            className={cn(
              'px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap',
              activeLang === lang
                ? 'bg-white/20 text-white'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            )}
          >
            {getLabel(lang)}
          </button>
        ))}
      </div>

      {/* Commentary list */}
      {displayList.length === 0 ? (
        <div className="p-4 text-sm text-muted-foreground">
          No commentary available yet for this verse.
        </div>
      ) : (
        <div className="divide-y divide-border">
          {displayList.map((c, i) => {
            // Get content for the active language, or fallback to any language
            const text =
              c.content?.[activeLang as keyof typeof c.content] ??
              Object.values(c.content || {})[0] ??
              ''

            return (
              <div key={i} className="p-4 bg-card">
                <div className="mb-2 text-sm font-medium text-primary">
                  {c.author}
                </div>
                <p className="text-foreground/90 leading-relaxed whitespace-pre-line text-sm">
                  {text}
                </p>
              </div>
            )
          })}
        </div>
      )}

      {/* Count indicator */}
      {commentaries.length > 0 && (
        <div className="px-4 py-2 text-xs text-muted-foreground bg-secondary/20 border-t border-border">
          {commentaries.length} commentaries available · Showing {displayList.length} in {getLabel(activeLang)}
        </div>
      )}
    </CollapsibleSection>
  )
}