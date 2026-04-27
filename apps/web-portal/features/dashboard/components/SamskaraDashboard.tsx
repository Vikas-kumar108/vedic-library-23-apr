'use client'

import React from 'react'
import { useSamskara } from '@/hooks/useSamskara'
import { Leaf, Clock, CheckCircle2, AlertCircle, Flower2, Sprout } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * 🌿 Samskara Dashboard Component
 * Responsibility: Display the seeker's spiritual milestones and life-stage transitions with gentle guidance.
 * Aesthetics: Sacred, calm, utilizing earth tones (green/amber). Guiding, not prescribing.
 */
export function SamskaraDashboard() {
  const { upcoming, overdue, completed, loading, error } = useSamskara()

  if (loading) {
    return (
      <div className="p-8 bg-stone-50 border border-stone-100 rounded-[32px] animate-pulse space-y-6 shadow-xl">
        <div className="h-4 w-40 bg-stone-100 rounded-full" />
        <div className="h-2 w-full bg-stone-50 rounded-full" />
        <div className="space-y-4">
          {[1, 2].map(i => <div key={i} className="h-20 w-full bg-stone-50 rounded-2xl" />)}
        </div>
      </div>
    )
  }

  if (error || (upcoming.length === 0 && overdue.length === 0 && completed.length === 0)) return null

  return (
    <div className="bg-stone-50 border border-emerald-100/50 rounded-[32px] p-8 shadow-xl shadow-emerald-900/5 relative overflow-hidden group">
      {/* 1. Header */}
      <div className="relative space-y-8">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-emerald-100 text-emerald-600 rounded-lg">
                <Leaf size={18} />
              </div>
              <h3 className="text-xs font-bold text-emerald-700/50 uppercase tracking-widest">Life Journey</h3>
            </div>
            <h2 className="text-2xl font-serif font-bold text-stone-900 italic">Sacred Milestones</h2>
          </div>
          <Flower2 size={24} className="text-emerald-200" />
        </div>

        {/* 2. Overdue Section (Gentle Highlight) */}
        {overdue.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[10px] font-bold text-amber-600 uppercase tracking-widest px-2">
              <Clock size={12} /> Institutional Observations
            </div>
            <div className="space-y-3">
              {overdue.map((item, i) => (
                <div key={i} className="p-5 bg-white border border-amber-100 rounded-3xl shadow-sm flex items-start gap-4">
                  <div className="p-2 bg-amber-50 text-amber-500 rounded-xl">
                    <AlertCircle size={18} />
                  </div>
                  <div className="space-y-1 text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-stone-800 uppercase tracking-tight">{item.type.replace(/_/g, ' ')}</span>
                      <span className="text-[10px] font-bold text-amber-400">Past traditional window</span>
                    </div>
                    <p className="text-[11px] font-medium text-stone-500 italic leading-relaxed">{item.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Upcoming Section */}
        {upcoming.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-600 uppercase tracking-widest px-2">
              <Sprout size={12} /> Emerging Opportunities
            </div>
            <div className="space-y-3">
              {upcoming.map((item, i) => (
                <div key={i} className="p-5 bg-white border border-emerald-50 rounded-3xl shadow-sm flex items-start gap-4 hover:border-emerald-100 transition-colors">
                  <div className="p-2 bg-emerald-50 text-emerald-500 rounded-xl">
                    <Leaf size={18} />
                  </div>
                  <div className="space-y-1 text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-stone-800 uppercase tracking-tight">{item.type.replace(/_/g, ' ')}</span>
                      <div className={cn(
                        "px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest",
                        item.urgency === 'medium' ? "bg-emerald-50 text-emerald-600" : "bg-stone-50 text-stone-400"
                      )}>
                        Traditional window
                      </div>
                    </div>
                    <p className="text-[11px] font-medium text-stone-500 italic leading-relaxed">{item.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. Completed Section (Timeline Style) */}
        {completed.length > 0 && (
          <div className="pt-6 border-t border-stone-200/60">
            <div className="flex items-center gap-2 text-[10px] font-bold text-stone-400 uppercase tracking-widest px-2 mb-6 text-left">
              <CheckCircle2 size={12} /> Realized Milestones
            </div>
            <div className="flex flex-wrap gap-3">
              {completed.map((type, i) => (
                <div key={i} className="px-4 py-2 bg-stone-100 border border-stone-200 rounded-full flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  <span className="text-[10px] font-bold text-stone-600 uppercase tracking-widest">{type.replace(/_/g, ' ')}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Decorative Aura */}
      <div className="absolute -bottom-12 -right-12 size-48 bg-emerald-500/5 rounded-full blur-3xl" />
    </div>
  )
}
