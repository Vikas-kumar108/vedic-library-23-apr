'use client'

import React, { useState } from 'react'
import { 
  ChevronLeft, 
  ChevronRight, 
} from 'lucide-react'
import { Button } from '@/components/atoms/button'
import { useVerse } from '@/features/library/hooks/useVerses'
import { useAccess } from '@/features/auth/hooks/useAccess'
import { cn } from '@/lib/utils'
import { useParams } from 'next/navigation'
import { AccessGating } from '@/components/library/reader/AccessGating'
import { VerseDisplay } from '@/components/library/reader/VerseDisplay'
import { IntelligencePanel } from '@/components/library/reader/IntelligencePanel'

/**
 * Integrated Library Study Experience
 * Responsibility: Provide a scholarly, restricted-access reading room.
 */
export default function LibraryStudyPage() {
  const params = useParams()
  const verseId = params.verseId as string
  const { verse, isLoading: verseLoading } = useVerse(verseId)
  const { canAccess, reason } = useAccess({ id: verseId, type: 'GRIHASTHA_DHARMA' })

  const [isStudyMode, setIsStudyMode] = useState(false)
  const [activeTab, setActiveTab] = useState<'TRANS' | 'PURP' | 'ALL'>('ALL')

  if (verseLoading) return <div className="h-screen flex items-center justify-center font-serif italic text-slate-400">Opening the Shastra...</div>

  // 1. Modular Access Gating
  if (!canAccess) return <AccessGating reason={reason || 'Vedic-Aware Access System'} />

  return (
    <div className={cn(
      "min-h-screen bg-[#F8F7F4] transition-colors duration-1000",
      isStudyMode ? "bg-white" : "bg-[#F8F7F4]"
    )}>
      <div className="flex h-screen overflow-hidden">
        
        {/* 2. Main Reading Area */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          <header className="h-16 md:h-20 border-b border-slate-100 bg-white/80 backdrop-blur-md flex items-center justify-between px-4 md:px-10 z-10">
            <div className="flex items-center gap-2 md:gap-6">
              <button className="p-2 hover:bg-slate-50 rounded-xl transition-all"><ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-slate-400" /></button>
              <div className="space-y-0.5 text-left">
                <h1 className="font-serif font-bold text-sm md:text-lg text-slate-900">{verse?.book} {verse?.chapter}.{verse?.verse}</h1>
                <div className="hidden md:block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sanskrit • Translation • Purport</div>
              </div>
              <button className="p-2 hover:bg-slate-50 rounded-xl transition-all"><ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-slate-400" /></button>
            </div>

            <div className="flex items-center gap-2 md:gap-6">
              <div className="hidden sm:flex p-1 bg-slate-50 rounded-xl">
                {(['ALL', 'TRANS', 'PURP'] as const).map(t => (
                  <button key={t} onClick={() => setActiveTab(t)} className={cn(
                    "px-3 md:px-4 py-1.5 rounded-lg text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all",
                    activeTab === t ? "bg-white text-primary shadow-sm" : "text-slate-400 hover:text-slate-600"
                  )}>{t}</button>
                ))}
              </div>
              <Button 
                onClick={() => setIsStudyMode(!isStudyMode)}
                variant={isStudyMode ? 'primary' : 'outline'}
                className={cn("rounded-xl h-9 md:h-11 px-4 md:px-6 font-bold text-[10px] md:text-xs uppercase tracking-widest", isStudyMode && "shadow-lg shadow-primary/20")}
              >
                {isStudyMode ? 'Exit' : 'Study Mode'}
              </Button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto scrollbar-thin">
            <VerseDisplay verse={verse} activeTab={activeTab} isStudyMode={isStudyMode} />
          </div>
        </main>

        {/* 3. Modular Intelligence Panel */}
        {!isStudyMode && <IntelligencePanel />}

      </div>
    </div>
  )
}
