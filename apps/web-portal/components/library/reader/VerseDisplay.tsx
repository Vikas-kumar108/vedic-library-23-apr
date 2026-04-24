'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface VerseDisplayProps {
  verse: any
  activeTab: 'ALL' | 'TRANS' | 'PURP'
  isStudyMode: boolean
}

export function VerseDisplay({ verse, activeTab, isStudyMode }: VerseDisplayProps) {
  return (
    <div className={cn(
      "max-w-3xl mx-auto py-12 md:py-24 px-6 md:px-8 space-y-12 md:space-y-20 transition-all duration-1000 text-left",
      isStudyMode ? "scale-[1.02]" : "scale-100"
    )}>
      
      {/* Sanskrit Section */}
      <div className="space-y-8 text-center">
        <div className="text-2xl md:text-4xl font-serif leading-[1.8] text-slate-800 whitespace-pre-line animate-in fade-in slide-in-from-bottom duration-1000">
          {verse?.sanskrit}
        </div>
      </div>

      {/* Translation Section */}
      {(activeTab === 'TRANS' || activeTab === 'ALL') && (
        <div className="space-y-6 animate-in fade-in duration-700">
          <div className="flex items-center gap-4 text-primary">
            <div className="h-px flex-1 bg-primary/10" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Translation</span>
            <div className="h-px flex-1 bg-primary/10" />
          </div>
          <p className="text-xl md:text-2xl font-serif italic text-slate-600 leading-relaxed text-center px-2 md:px-8">
            "{verse?.translation}"
          </p>
        </div>
      )}

      {/* Purport Section */}
      {(activeTab === 'PURP' || activeTab === 'ALL') && (
        <div className="space-y-10 animate-in fade-in duration-1000">
          <div className="flex items-center gap-4 text-primary">
            <div className="h-px flex-1 bg-primary/10" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Purport</span>
            <div className="h-px flex-1 bg-primary/10" />
          </div>
          <div className="space-y-8 text-base md:text-lg text-slate-700 leading-[2.2] font-serif">
            <p className="first-letter:text-4xl md:first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-3 first-letter:float-left">
              {verse?.purport}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
