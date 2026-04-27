'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  ChevronLeft, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2,
  BookOpen,
  Sun
} from 'lucide-react'
import { Button } from '@/components/atoms/button'
import { useVerse } from '@/features/library/hooks/useVerses'
import { cn } from '@/lib/utils'

/**
 * Guided Reading Experience
 * Purpose: A minimalist, distraction-free reader for seekers on the Guided Path.
 * Rule: Auto-records view and triggers path completion milestones.
 */
export default function GuidedReadingPage() {
  const { id } = useParams()
  const router = useRouter()
  const { verse, isLoading, error } = useVerse(id as string)
  const [isCompleted, setIsCompleted] = useState(false)

  // Completion trigger when scrolled to bottom or after a short delay
  useEffect(() => {
    if (verse && !isCompleted) {
      const timer = setTimeout(() => {
        setIsCompleted(true)
      }, 5000) // 5 seconds delay to signify "Read"
      return () => clearTimeout(timer)
    }
  }, [verse, isCompleted])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center">
        <div className="space-y-6 text-center">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto" />
          <p className="font-serif italic text-slate-400 animate-pulse">Illuminating the Path...</p>
        </div>
      </div>
    )
  }

  if (error || !verse) {
    return (
      <div className="min-h-screen bg-[#FDFCFB] flex flex-col items-center justify-center p-10 text-center space-y-6">
        <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center text-rose-500">
           <BookOpen className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-serif font-bold text-slate-900 italic">The text is temporarily veiled.</h1>
        <p className="text-slate-500 max-w-sm">We couldn't retrieve this specific node. Please return to your path.</p>
        <Button asChild variant="outline" className="rounded-xl px-8 h-12">
           <Link href="/dashboard">Return to Dashboard</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-900 selection:bg-primary/10">
      
      {/* 1. MINIMAL NAVIGATION */}
      <header className="fixed top-0 left-0 right-0 h-20 flex items-center justify-between px-8 bg-[#FDFCFB]/80 backdrop-blur-md z-50">
        <Link 
          href="/dashboard" 
          className="group flex items-center gap-3 text-slate-400 hover:text-slate-900 transition-colors"
        >
          <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center group-hover:border-slate-200 transition-all">
            <ChevronLeft className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest">End Session</span>
        </Link>

        <div className="flex items-center gap-3">
           <div className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{verse.meta?.canonicalRef || 'Sacred Text'}</div>
        </div>
      </header>

      {/* 2. GUIDED READING CONTENT */}
      <main className="max-w-3xl mx-auto pt-32 pb-40 px-6 space-y-24">
        
        {/* Sanskrit & Mula */}
        <section className="text-center space-y-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
            <Sun className="w-3.5 h-3.5" /> Revelation
          </div>
          <div className="space-y-12">
            <div className="text-3xl md:text-5xl font-serif leading-snug text-slate-900">
              {verse.text?.devanagari}
            </div>
            <div className="text-base md:text-lg font-serif italic text-slate-400 max-w-2xl mx-auto leading-relaxed">
              {verse.text?.iast}
            </div>
          </div>
        </section>

        {/* Translation */}
        <section className="bg-white p-12 md:p-20 rounded-[4rem] border border-slate-100/50 shadow-2xl shadow-slate-200/30 space-y-8">
           <div className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] text-center border-b border-slate-50 pb-6">Translation</div>
           <p className="text-2xl md:text-4xl font-serif text-slate-900 leading-tight italic text-center px-4">
             "{verse.meanings?.translations?.en || verse.translationsByAuthor?.[0]?.text}"
           </p>
        </section>

        {/* Purport / Deep Insight */}
        <section className="max-w-2xl mx-auto space-y-10">
           <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-100" />
              <div className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">Deep Insight</div>
              <div className="h-px flex-1 bg-slate-100" />
           </div>
           <div className="text-lg md:text-xl text-slate-600 leading-relaxed font-serif space-y-8 first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-3 first-letter:float-left">
              {verse.commentary?.[0]?.content?.en?.split('\n').map((p: string, i: number) => (
                <p key={i}>{p}</p>
              )) || verse.purport}
           </div>
        </section>

        {/* 3. COMPLETION STATE */}
        <section className={cn(
          "transition-all duration-1000 transform",
          isCompleted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        )}>
          <div className="bg-slate-900 rounded-[4rem] p-16 text-white text-center space-y-10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-[0.05] rotate-12 group-hover:scale-110 transition-transform">
               <CheckCircle2 className="w-64 h-64" />
            </div>
            
            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-[0.2em]">
                 <Sparkles className="w-4 h-4" /> Path Progressed
              </div>
              <h2 className="text-4xl font-serif font-bold italic">You have completed your step.</h2>
              <p className="text-slate-400 max-w-md mx-auto text-sm leading-relaxed">
                The shastra has been revealed. Your realization is deepening. Take a moment to reflect before moving forward.
              </p>
            </div>

            <Button asChild size="lg" className="relative z-10 h-16 px-12 rounded-2xl bg-primary text-white font-bold shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all">
              <Link href="/dashboard" className="flex items-center gap-3">
                Continue Your Path <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </section>

      </main>

      {/* Aesthetic Progress Bar (Floating) */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 px-6 py-3 bg-white/80 backdrop-blur-xl border border-slate-100 rounded-full shadow-2xl flex items-center gap-4 z-50">
         <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Session Focus</div>
         <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className={cn("h-full bg-primary transition-all duration-1000", isCompleted ? "w-full" : "w-1/3")} />
         </div>
      </div>

    </div>
  )
}
