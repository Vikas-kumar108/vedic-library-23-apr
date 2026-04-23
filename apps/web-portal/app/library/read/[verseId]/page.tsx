'use client'

import React, { useState } from 'react'
import { 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Search, 
  Bookmark, 
  Share2, 
  MoreVertical,
  ChevronDown,
  MessageSquare,
  PenTool,
  Zap,
  Lock
} from 'lucide-react'
import { Button } from '@/components/atoms/button'
import { Badge } from '@/components/atoms/badge'
import { useVerse } from '@/features/library/hooks/useVerses'
import { useAccess } from '@/features/auth/hooks/useAccess'
import { cn } from '@/lib/utils'
import { useParams } from 'next/navigation'

/**
 * Integrated Library Study Experience
 * Responsibility: Provide a scholarly, restricted-access reading room.
 * Purpose: Connects the deep-reading UI to the Vedic-Aware access system.
 */
export default function LibraryStudyPage() {
  const params = useParams()
  const verseId = params.verseId as string
  const { verse, isLoading: verseLoading } = useVerse(verseId)
  const { canAccess, reason } = useAccess({ id: verseId, type: 'GRIHASTHA_DHARMA' }) // Example context

  const [isStudyMode, setIsStudyMode] = useState(false)
  const [activeTab, setActiveTab] = useState<'TRANS' | 'PURP' | 'ALL'>('ALL')

  if (verseLoading) return <div className="h-screen flex items-center justify-center font-serif italic text-slate-400">Opening the Shastra...</div>

  // RESTRICTION UI (Vedic-Aware Gating)
  if (!canAccess) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#F8F7F4] p-6">
        <div className="max-w-md w-full bg-white p-12 rounded-[4rem] border border-slate-100 shadow-soft text-center space-y-8 animate-in zoom-in duration-700">
          <div className="w-20 h-20 bg-slate-900 rounded-[2.5rem] flex items-center justify-center mx-auto text-primary">
            <Lock className="w-10 h-10" />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-serif font-bold text-slate-900 leading-tight">Wisdom <span className="text-primary italic">Preserved</span></h2>
            <p className="text-sm text-slate-500 leading-relaxed italic">
              "{reason}"
            </p>
          </div>
          <div className="pt-4 flex flex-col gap-4">
            <Button className="w-full h-14 rounded-2xl bg-slate-900 text-white font-bold shadow-xl shadow-slate-900/10">
              Complete Pre-requisites
            </Button>
            <Button variant="ghost" className="w-full text-xs text-primary font-bold">Consult a Mentor</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn(
      "min-h-screen bg-[#F8F7F4] transition-colors duration-1000",
      isStudyMode ? "bg-white" : "bg-[#F8F7F4]"
    )}>
      <div className="flex h-screen overflow-hidden">
        
        {/* 1. LEFT NAV (SCHOLARLY STRUCTURE - Hidden on Mobile) */}
        {!isStudyMode && (
          <aside className="hidden lg:flex w-64 border-r border-slate-100 bg-white flex-col animate-in slide-in-from-left duration-500 overflow-hidden">
            <div className="p-6 border-b border-slate-50 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-[10px] uppercase tracking-[0.2em] text-slate-400">Structural Nav</h2>
                <div className="flex gap-2">
                  <button className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400"><Search className="w-3.5 h-3.5" /></button>
                  <button className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400"><Bookmark className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="text" placeholder="Jump to (e.g. 2.47)" className="flex-1 h-9 px-3 text-[11px] rounded-lg border border-slate-100 bg-slate-50 outline-none" />
                <Button size="icon" className="h-9 w-9 rounded-lg bg-slate-900"><ChevronRight className="w-4 h-4" /></Button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-8 scrollbar-thin">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary font-bold px-2">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-sm font-serif italic">{verse?.book}</span>
                </div>
                <div className="grid grid-cols-4 gap-1 p-2 bg-slate-50/50 rounded-2xl">
                  {[45, 46, 47, 48, 49, 50, 51, 52].map(v => (
                    <button key={v} className={cn(
                      "h-8 flex items-center justify-center rounded-lg text-[10px] font-bold transition-all border border-transparent",
                      v === 47 ? "bg-primary text-white shadow-md" : "text-slate-400 hover:bg-white hover:border-slate-100"
                    )}>{v}</button>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* 2. CENTER READING AREA (Full width on Mobile) */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          <header className="h-16 md:h-20 border-b border-slate-100 bg-white/80 backdrop-blur-md flex items-center justify-between px-4 md:px-10 z-10">
            <div className="flex items-center gap-2 md:gap-6">
              <button className="p-2 hover:bg-slate-50 rounded-xl transition-all"><ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-slate-400" /></button>
              <div className="space-y-0.5">
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
            <div className={cn(
              "max-w-3xl mx-auto py-12 md:py-24 px-6 md:px-8 space-y-12 md:space-y-20 transition-all duration-1000",
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
          </div>
        </main>

        {/* 3. RIGHT INTELLIGENCE PANEL (Hidden on Mobile) */}
        {!isStudyMode && (
          <aside className="hidden xl:flex w-80 border-l border-slate-100 bg-white flex-col animate-in slide-in-from-right duration-500">
            <div className="p-8 space-y-10">
              <div className="space-y-6">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <PenTool className="w-3 h-3" /> Personal Realizations
                </h3>
                <textarea className="w-full h-40 p-4 rounded-2xl bg-slate-50 border-none text-sm font-serif italic focus:ring-2 focus:ring-primary/10 outline-none transition-all" placeholder="Write your realization here..." />
                <Button className="w-full rounded-xl h-12 bg-slate-900 text-white font-bold">Save Reflection</Button>
              </div>

              <div className="space-y-6 pt-6 border-t border-slate-50">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <MessageSquare className="w-3 h-3" /> Sangha Discussion
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-primary/20" />
                      <span className="text-[10px] font-bold text-slate-900">Dr. Keshav Dev</span>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-relaxed italic">"How does the concept of detached action apply to corporate leadership?"</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}
