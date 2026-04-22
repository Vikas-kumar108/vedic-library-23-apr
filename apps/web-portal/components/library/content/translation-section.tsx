'use client'

import { useState, useMemo } from 'react'
import { Volume2 } from 'lucide-react'
import { Verse } from '@/lib/types'
import { cn } from '@/lib/utils'
import { CollapsibleSection } from '@/components/molecules/collapsible-section'

interface Props {
  verse: Verse
}

export function TranslationSection({ verse }: Props) {
  const availableLangs = useMemo(() => {
    const langs = new Set<string>()
    verse.translationsByAuthor?.forEach((t) => langs.add(t.lang))
    // Also include simple translations
    Object.keys(verse.meanings?.translations || {}).forEach((k) => {
      const fullLang = k === 'hi' ? 'hindi' : k === 'en' ? 'english' : 'sanskrit'
      langs.add(fullLang)
    })
    return Array.from(langs)
  }, [verse.translationsByAuthor, verse.meanings?.translations])

  const [activeLang, setActiveLang] = useState(availableLangs[0] || 'english')

  const getLabel = (lang: string) => lang.charAt(0).toUpperCase() + lang.slice(1)

  // Get per-author translations filtered by language
  const authorTranslations = useMemo(() => {
    const list = verse.translationsByAuthor ?? []
    return list.filter((t) => t.lang === activeLang)
  }, [verse.translationsByAuthor, activeLang])

  // Fallback to simple translations map
  const simpleFallback = useMemo(() => {
    const langKey = activeLang === 'hindi' ? 'hi' : activeLang === 'english' ? 'en' : 'sa'
    return verse.meanings?.translations?.[langKey as keyof typeof verse.meanings.translations] ?? null
  }, [verse.meanings?.translations, activeLang])

  const hasContent = authorTranslations.length > 0 || simpleFallback

  return (
    <CollapsibleSection
      title="Translation"
      rightSlot={<Volume2 className="w-4 h-4" />}
    >
      {/* Language Tabs */}
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

      {/* Translations by author */}
      <div className="divide-y divide-border">
        {authorTranslations.length > 0 ? (
          authorTranslations.map((t, i) => (
            <div key={i} className="p-4 bg-card">
              <div className="mb-2 text-sm font-medium text-primary">
                {t.author}
              </div>
              <p className="text-foreground/90 leading-relaxed whitespace-pre-line">
                {t.text}
              </p>
            </div>
          ))
        ) : simpleFallback ? (
          <div className="p-4 bg-card">
            <p className="text-foreground/90 leading-relaxed whitespace-pre-line">
              {simpleFallback}
            </p>
          </div>
        ) : (
          <div className="p-4 bg-card text-sm text-muted-foreground">
            No translation available in this language.
          </div>
        )}
      </div>
    </CollapsibleSection>
  )
}