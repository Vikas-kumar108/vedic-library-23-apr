'use client'

import React from 'react'
import { useAdaptive } from '@/hooks/useAdaptive'
import { Brain, Sparkles, Heart, Activity, Waves } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * 🧠 Adaptive Insights Widget Component
 * Responsibility: Display qualitative insights into the seeker's resonance with guidance.
 * Aesthetics: Reflective, subtle, non-technical.
 */
export function AdaptiveInsightsWidget() {
  const { insights, loading, error } = useAdaptive()

  if (loading) {
    return (
      <div className="p-8 bg-white border border-slate-100 rounded-[32px] animate-pulse space-y-4 shadow-xl">
        <div className="h-4 w-32 bg-slate-100 rounded-full" />
        <div className="h-12 w-full bg-slate-50 rounded-2xl" />
      </div>
    )
  }

  if (error || insights.length === 0) return null

  return (
    <div className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
      {/* 1. Header & Context */}
      <div className="relative space-y-6">
        <div className="space-y-2 text-left">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-indigo-50 text-indigo-500 rounded-lg">
              <Brain size={18} />
            </div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Resonance & Growth</h3>
          </div>
          <h2 className="text-xl font-serif font-bold text-slate-900 italic">Your Growth Pattern</h2>
        </div>

        {/* 2. Qualitative Insights */}
        <div className="space-y-4">
          {insights.map((insight, i) => (
            <div key={i} className="flex items-start gap-4 p-5 bg-slate-50/50 border border-slate-100/50 rounded-3xl transition-all hover:bg-white hover:border-indigo-100 hover:shadow-sm">
              <div className="p-2 bg-white rounded-xl text-indigo-400 shrink-0 shadow-sm">
                <Waves size={16} />
              </div>
              <div className="space-y-1 text-left">
                <p className="text-[13px] font-medium text-slate-700 italic leading-relaxed">
                  {insight}
                </p>
                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Personal Resonance</p>
              </div>
            </div>
          ))}
        </div>

        {/* 3. Subtle Closing */}
        <div className="pt-2 text-center">
           <p className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.2em] italic">
             Guidance evolves in harmony with your journey.
           </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -top-12 -right-12 size-32 bg-indigo-500/5 rounded-full blur-2xl" />
      <div className="absolute -bottom-8 -left-8 size-24 bg-emerald-500/5 rounded-full blur-2xl" />
    </div>
  )
}
