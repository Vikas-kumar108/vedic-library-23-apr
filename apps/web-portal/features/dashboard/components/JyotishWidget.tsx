'use client'

import React from 'react'
import { useJyotish } from '@/hooks/useJyotish'
import { Sparkles, Moon, Sun, Wind, Compass, Zap, HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * 🔮 Jyotish Widget Component
 * Responsibility: Display the seeker's current temporal life phase with wise, grounded alignment.
 * Aesthetics: Calm, mystical, minimalist. Zero fear or prediction.
 */
export function JyotishWidget() {
  const { phase, focus, challenges, opportunities, loading, error } = useJyotish()

  if (loading) {
    return (
      <div className="p-8 bg-white border border-slate-100 rounded-[32px] animate-pulse space-y-6 shadow-xl">
        <div className="h-4 w-32 bg-slate-100 rounded-full" />
        <div className="h-8 w-48 bg-slate-50 rounded-lg" />
        <div className="space-y-4">
          {[1, 2].map(i => <div key={i} className="h-12 w-full bg-slate-50 rounded-2xl" />)}
        </div>
      </div>
    )
  }

  if (error) return null

  return (
    <div className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
      {/* 1. Header & Current Phase */}
      <div className="relative space-y-8">
        <div className="space-y-2 text-left">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-slate-50 text-slate-400 rounded-lg">
              <Moon size={18} />
            </div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Temporal Alignment</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <h2 className="text-3xl font-serif font-bold text-slate-900 italic">{phase}</h2>
            <div className="size-1.5 bg-indigo-400 rounded-full animate-pulse" />
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Current Life Window</p>
        </div>

        {/* 2. Analysis Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {/* Focus */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[10px] font-bold text-indigo-400 uppercase tracking-widest px-1">
              <Compass size={12} /> This phase favors
            </div>
            <div className="flex flex-col gap-2">
              {focus.map((item, i) => (
                <p key={i} className="text-[11px] font-medium text-slate-600 leading-relaxed italic">
                  — {item}
                </p>
              ))}
            </div>
          </div>

          {/* Challenges */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">
              <Wind size={12} /> Be mindful of
            </div>
            <div className="flex flex-col gap-2">
              {challenges.length > 0 ? challenges.map((item, i) => (
                <p key={i} className="text-[11px] font-medium text-slate-500 leading-relaxed italic">
                  — {item}
                </p>
              )) : (
                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest px-1">
                  Balanced Window
                </p>
              )}
            </div>
          </div>

          {/* Opportunities */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[10px] font-bold text-amber-500 uppercase tracking-widest px-1">
              <Sparkles size={12} /> Growth Windows
            </div>
            <div className="flex flex-col gap-2">
              {opportunities.map((item, i) => (
                <p key={i} className="text-[11px] font-medium text-amber-700 leading-relaxed italic">
                  — {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 p-8 text-slate-50 opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none">
        <Sun size={120} strokeWidth={0.5} />
      </div>
      
      {/* Subtle Aura */}
      <div className="absolute -top-12 -right-12 size-48 bg-indigo-500/5 rounded-full blur-3xl" />
    </div>
  )
}
