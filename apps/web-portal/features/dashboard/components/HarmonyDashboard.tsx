'use client'

import React from 'react'
import { useHarmonyEngine } from '@/hooks/useHarmonyEngine'
import { Scale, Heart, AlertCircle, Info, ArrowRightCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface HarmonyDashboardProps {
  familyId: string | undefined
}

/**
 * 🧘 Harmony Dashboard Component
 * Responsibility: Display relational harmony analytics and subtle alignment detection.
 * Aesthetics: Calm, non-alarming, using warm amber and slate tones. Zero "conflict" or "failure" language.
 */
export function HarmonyDashboard({ familyId }: HarmonyDashboardProps) {
  const { tensions, harmonyScore, summary, loading, error } = useHarmonyEngine(familyId)

  if (loading) {
    return (
      <div className="p-8 bg-white border border-slate-100 rounded-[32px] animate-pulse space-y-6 shadow-xl">
        <div className="h-4 w-40 bg-slate-100 rounded-full" />
        <div className="h-2 w-full bg-slate-50 rounded-full" />
        <div className="space-y-4">
          {[1, 2].map(i => <div key={i} className="h-20 w-full bg-slate-50 rounded-2xl" />)}
        </div>
      </div>
    )
  }

  if (error || (tensions.length === 0 && harmonyScore === 100)) return null

  return (
    <div className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
      {/* 1. Header & Harmony Scale */}
      <div className="relative space-y-8">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-amber-50 text-amber-500 rounded-lg">
                <Scale size={18} />
              </div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Household Harmony</h3>
            </div>
            <h2 className="text-2xl font-serif font-bold text-slate-900 italic">Relational Alignment</h2>
          </div>
          
          <div className="text-right space-y-1">
            <div className="text-3xl font-bold font-mono text-amber-500">{harmonyScore}%</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Harmony Score</div>
          </div>
        </div>

        {/* 2. Harmony Progress Bar */}
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-50">
          <div 
            className="h-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(245,158,11,0.2)]"
            style={{ width: `${harmonyScore}%` }}
          />
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3 text-left">
          <Info size={16} className="text-amber-500 shrink-0" />
          <p className="text-xs font-medium text-slate-500 italic leading-relaxed">{summary}</p>
        </div>

        {/* 3. Tension List */}
        <div className="space-y-4">
          {tensions.map((tension, i) => (
            <div key={i} className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-all hover:border-amber-100/50">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                    tension.severity === 'high' ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-500"
                  )}>
                    {tension.severity} Alignment Need
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">{tension.type.replace(/_/g, ' ')} Tension</span>
                </div>
                <Heart size={16} className="text-amber-200" />
              </div>

              <div className="space-y-3 text-left">
                <p className="text-sm font-bold text-slate-800 italic leading-tight">
                  "{tension.signal}"
                </p>
                <div className="flex items-start gap-2 pt-2 border-t border-slate-50">
                  <ArrowRightCircle size={14} className="text-amber-500 mt-0.5 shrink-0" />
                  <p className="text-[11px] font-medium text-slate-500 leading-relaxed">
                    <span className="font-bold text-slate-700 uppercase tracking-tighter mr-1">Institutional Support:</span>
                    {tension.suggestion}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Aura */}
      <div className="absolute -top-12 -left-12 size-48 bg-amber-500/5 rounded-full blur-3xl" />
    </div>
  )
}
