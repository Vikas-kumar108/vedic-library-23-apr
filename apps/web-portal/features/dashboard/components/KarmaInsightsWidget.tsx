'use client'

import React from 'react'
import { useKarma } from '@/hooks/useKarma'
import { RefreshCcw, Sparkles, Zap, ShieldAlert, Compass, Lightbulb, ArrowRight, Activity } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * 🌀 Karma Insights Widget Component
 * Responsibility: Display emerging behavioral patterns with an empowering, reflective tone.
 * Aesthetics: Reflective, calm, non-judgmental. Zero blame.
 */
export function KarmaInsightsWidget() {
  const { patterns, dominantPattern, growthDirection, loading, error } = useKarma()

  if (loading) {
    return (
      <div className="p-8 bg-white border border-slate-100 rounded-[32px] animate-pulse space-y-6 shadow-xl">
        <div className="h-4 w-40 bg-slate-100 rounded-full" />
        <div className="space-y-4">
          {[1, 2].map(i => <div key={i} className="h-16 w-full bg-slate-50 rounded-2xl" />)}
        </div>
      </div>
    )
  }

  if (error || (patterns.length === 0 && dominantPattern === 'Steady Practice')) return null

  return (
    <div className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
      {/* 1. Header & Growth Direction */}
      <div className="relative space-y-10">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-slate-50 text-slate-400 rounded-lg">
                <RefreshCcw size={18} />
              </div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Behavioral Trends</h3>
            </div>
            <h2 className="text-2xl font-serif font-bold text-slate-900 italic">Emerging Patterns</h2>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 bg-indigo-50 rounded-full border border-indigo-100/50">
            <Activity size={16} className="text-indigo-400" />
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">{growthDirection}</span>
          </div>
        </div>

        {/* 2. Observed Trends */}
        <div className="space-y-6 text-left">
          {patterns.map((p, i) => (
            <div key={i} className="p-6 bg-slate-50 border border-slate-100 rounded-[2rem] space-y-4 transition-all hover:bg-white hover:border-indigo-100 hover:shadow-lg hover:shadow-indigo-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-2 rounded-xl",
                    p.type.includes('drift') || p.type.includes('hesitation') ? "bg-amber-50 text-amber-500" : "bg-emerald-50 text-emerald-500"
                  )}>
                    {p.type.includes('drift') ? <RefreshCcw size={16} /> : <Sparkles size={16} />}
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{p.type.replace('_', ' ')}</p>
                </div>
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest italic">{p.frequency} cycles</span>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Lightbulb size={16} className="text-indigo-400 shrink-0 mt-0.5" />
                  <p className="text-xs font-medium text-slate-700 italic leading-relaxed">"{p.insight}"</p>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                  <Compass size={16} className="text-indigo-500 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Self-Observation</p>
                    <p className="text-xs font-bold text-indigo-900 italic">{p.suggestion}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 3. Evolution Trajectory */}
        <div className="pt-4 flex items-center justify-center gap-8">
           <div className="flex flex-col items-center gap-1">
             <div className="size-2 bg-indigo-400 rounded-full" />
             <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Steady Observation</p>
           </div>
           <ArrowRight size={14} className="text-slate-200" />
           <div className="flex flex-col items-center gap-1">
             <div className="size-2 bg-emerald-400 rounded-full animate-pulse" />
             <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">Empowered Growth</p>
           </div>
        </div>
      </div>

      {/* Subtle Aura */}
      <div className="absolute -top-12 -right-12 size-48 bg-indigo-500/5 rounded-full blur-3xl" />
    </div>
  )
}
