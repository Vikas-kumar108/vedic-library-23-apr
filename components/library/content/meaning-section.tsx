'use client'

import { useState, useMemo } from 'react'
import { Verse } from '@/lib/types'
import { cn } from '@/lib/utils'
import { LANGUAGES, LanguageKey } from '@/data/config/languages'
import { CollapsibleSection } from '@/components/molecules/collapsible-section'

interface Props {
  verse: Verse
}

type TabKey =
  | 'synonyms'
  | 'segmentation'
  | 'anvaya'
  | 'anvaya-translation'

export function MeaningSection({ verse }: Props) {
  const [tab, setTab] = useState<TabKey>('synonyms')

  const m = verse?.meanings ?? {
    synonyms: {},
    translations: {},
    segmentation: {},
    anvaya: {},
    anvayaTranslation: {},
  }

  // Helper to get available languages for a specific field
  const getAvailableLangs = (field: any) => {
    if (!field || typeof field !== 'object') return []
    if (Array.isArray(field)) return ['en']
    const keys = Object.keys(field).filter((k) => field[k])
    if (keys.length > 0 && keys.every(k => !isNaN(Number(k)))) return ['en']
    return keys
  }

  const currentTabLangs = useMemo(() => {
    switch (tab) {
      case 'synonyms':
        return getAvailableLangs(m.synonyms)
      case 'segmentation':
        return getAvailableLangs(m.segmentation)
      case 'anvaya':
        return getAvailableLangs(m.anvaya)
      case 'anvaya-translation':
        return getAvailableLangs(m.anvayaTranslation)
      default:
        return []
    }
  }, [tab, m])

  const [language, setLanguage] = useState<string>('')

  // Update language when tab changes if current language is not available
  useMemo(() => {
    if (currentTabLangs.length > 0 && !currentTabLangs.includes(language)) {
      setLanguage(currentTabLangs[0])
    }
  }, [currentTabLangs, language])

  // Parse word_meanings from the raw verse data if synonyms are empty for all languages
  const fallbackSynonyms = useMemo(() => {
    if (verse.wordMeanings) {
      const parts = verse.wordMeanings
        .split(/[;\n]/)
        .map((s) => s.trim())
        .filter(Boolean)

      return parts.map((part) => {
        const dashIdx = part.indexOf('—')
        if (dashIdx > 0) {
          return {
            word: part.substring(0, dashIdx).trim(),
            meaning: part.substring(dashIdx + 1).trim(),
          }
        }
        return { word: part, meaning: '' }
      })
    }
    return []
  }, [verse.wordMeanings])

  const getLangLabel = (lang: string) => {
    const map: Record<string, string> = {
      en: 'English',
      hi: 'Hindi',
      sa: 'Sanskrit',
      te: 'Telugu',
      mr: 'Marathi',
      bn: 'Bengali',
      or: 'Odia',
      ru: 'Russian',
      de: 'German',
      fr: 'French',
      es: 'Spanish',
      it: 'Italian',
      ja: 'Japanese',
      kn: 'Kannada',
      ml: 'Malayalam',
    }
    return map[lang] || lang.toUpperCase()
  }

  return (
    <CollapsibleSection title="Word Analysis">
      {/* TAB SELECTOR */}
      <div className="flex border-b border-border bg-secondary/20 overflow-x-auto">
        {[
          { key: 'synonyms', label: 'Word Meaning' },
          { key: 'segmentation', label: 'Segmentation' },
          { key: 'anvaya', label: 'Prose Order' },
          { key: 'anvaya-translation', label: 'Prose Meaning' },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key as TabKey)}
            className={cn(
              'px-4 py-2.5 text-sm border-b-2 transition-colors whitespace-nowrap',
              tab === t.key
                ? 'border-primary text-primary font-medium'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* LANGUAGE SELECTOR (Dynamic) */}
      {currentTabLangs.length > 0 && (
        <div
          className="flex border-b border-border overflow-x-auto"
          style={{ backgroundColor: 'var(--knowledge-blue)' }}
        >
          {currentTabLangs.map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={cn(
                'px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap',
                language === lang
                  ? 'bg-white/20 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              )}
            >
              {getLangLabel(lang)}
            </button>
          ))}
        </div>
      )}

      {/* CONTENT */}
      <div className="p-4 bg-card">
        {/* 1️⃣ SYNONYMS */}
        {tab === 'synonyms' && (
          <div className="space-y-2">
            {(Array.isArray(m.synonyms) ? m.synonyms : (m.synonyms?.[language] || [])).length > 0 ? (
              (Array.isArray(m.synonyms) ? m.synonyms : m.synonyms[language]).map((s, i) => (
                <div
                  key={i}
                  className="flex items-baseline gap-2 py-1 border-b border-border/50"
                >
                  <span className="font-medium text-primary min-w-[120px]">
                    {s.word}
                  </span>
                  {s.meaning && (
                    <>
                      <span className="text-muted-foreground">—</span>
                      <span>{s.meaning}</span>
                    </>
                  )}
                </div>
              ))
            ) : fallbackSynonyms.length > 0 ? (
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground mb-2 italic">
                  Showing default word meanings:
                </div>
                {fallbackSynonyms.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-baseline gap-2 py-1 border-b border-border/50"
                  >
                    <span className="font-medium text-primary min-w-[120px]">
                      {s.word}
                    </span>
                    {s.meaning && (
                      <>
                        <span className="text-muted-foreground">—</span>
                        <span>{s.meaning}</span>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground italic">
                Word meanings not available for this verse.
              </p>
            )}
          </div>
        )}

        {/* 2️⃣ SEGMENTATION */}
        {tab === 'segmentation' && (
          <p className="text-foreground/90 leading-relaxed">
            {m.segmentation?.[language] ||
              m.segmentation?.sa ||
              Object.values(m.segmentation || {})[0] ||
              'Not available'}
          </p>
        )}

        {/* 3️⃣ ANVAYA */}
        {tab === 'anvaya' && (
          <p className="text-foreground/90 leading-relaxed">
            {m.anvaya?.[language] ||
              m.anvaya?.sa ||
              Object.values(m.anvaya || {})[0] ||
              'Not available'}
          </p>
        )}

        {/* 4️⃣ ANVAYA TRANSLATION */}
        {tab === 'anvaya-translation' && (
          <p className="text-foreground/90 leading-relaxed">
            {m.anvayaTranslation?.[language] ||
              m.anvayaTranslation?.en ||
              Object.values(m.anvayaTranslation || {})[0] ||
              'Not available'}
          </p>
        )}
      </div>
    </CollapsibleSection>
  )
}