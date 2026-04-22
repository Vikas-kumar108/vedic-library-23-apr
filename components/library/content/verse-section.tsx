'use client'

import { useState, useMemo } from 'react'
import { ChevronDown, Volume2 } from 'lucide-react'
import { Verse } from '@/lib/types'
import { cn } from '@/lib/utils'
import { SCRIPTS, ScriptKey } from '@/data/config/scripts'
import { CollapsibleSection } from '@/components/molecules/collapsible-section'

interface Props {
  verse: Verse
}

export function VerseSection({ verse }: Props) {
  const availableScripts = useMemo(() => {
    if (!verse.text || typeof verse.text !== 'object') return []
    return Object.keys(verse.text)
  }, [verse.text])
  const [script, setScript] = useState<string>(availableScripts[0] || 'devanagari')

  // ---------- TEXT RESOLVER ----------
  const text = verse.text?.[script] ?? 'Text not available'

  const getLabel = (key: string) => {
    const config = SCRIPTS.find((s) => s.key === key)
    return config ? config.label : key.charAt(0).toUpperCase() + key.slice(1)
  }

  return (
    <CollapsibleSection
      title={verse.unitType ? verse.unitType.charAt(0).toUpperCase() + verse.unitType.slice(1) : "Verse"}
      rightSlot={<Volume2 className="w-4 h-4" />}
    >
      {/* SCRIPT SELECTOR */}
      {availableScripts.length > 1 && (
        <div
          className="flex border-b border-border"
          style={{ backgroundColor: 'var(--knowledge-blue)' }}
        >
          {availableScripts.map((sKey) => (
            <button
              key={sKey}
              onClick={() => setScript(sKey)}
              className={cn(
                'px-4 py-2 text-sm font-medium transition-colors',
                script === sKey
                  ? 'bg-white/20 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              )}
            >
              {getLabel(sKey)}
            </button>
          ))}
        </div>
      )}

      {/* TEXT */}
      <div className="p-6 text-center bg-card">
        <p
          className={cn(
            'leading-relaxed whitespace-pre-line',
            script === 'devanagari'
              ? 'font-serif text-xl'
              : 'text-lg italic'
          )}
        >
          {text}
        </p>
      </div>

      {/* META */}
      {verse.meta?.meter && (
        <div className="text-center text-sm text-muted-foreground pb-4">
          {verse.meta.meter}
        </div>
      )}
    </CollapsibleSection>
  )
}