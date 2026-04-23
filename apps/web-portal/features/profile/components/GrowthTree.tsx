'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { Sparkles, Leaf } from 'lucide-react'

/**
 * GrowthTree Component
 * Responsibility: Provide a visual representation of the seeker's spiritual evolution.
 * Purpose: Instead of a progress bar, use a growing tree to symbolize depth and life.
 */
export function GrowthTree({ level }: { level: number }) {
  return (
    <div className="relative h-64 w-full flex flex-col items-center justify-end group">
      {/* Soil / Roots */}
      <div className="w-32 h-4 bg-slate-200 rounded-full blur-xl opacity-50 mb-[-8px]" />
      <div className="w-16 h-4 bg-slate-900 rounded-full" />
      
      {/* Trunk */}
      <div 
        className={cn(
          "w-3 bg-slate-900 rounded-full transition-all duration-1000 origin-bottom",
          level >= 1 ? "h-12" : "h-4"
        )} 
      />

      {/* Branches & Leaves (Representing Growth) */}
      <div className="relative w-full flex justify-center">
        {level >= 2 && (
          <div className="absolute -top-8 -left-4 animate-in fade-in zoom-in duration-700 delay-100">
            <Leaf className="w-8 h-8 text-primary rotate-[-45deg] fill-primary/10" />
          </div>
        )}
        {level >= 3 && (
          <div className="absolute -top-12 right-4 animate-in fade-in zoom-in duration-700 delay-300">
            <Leaf className="w-10 h-10 text-primary rotate-[45deg] fill-primary/20" />
          </div>
        )}
        {level >= 4 && (
          <div className="absolute -top-24 left-8 animate-in fade-in zoom-in duration-700 delay-500">
            <Leaf className="w-12 h-12 text-primary rotate-[-15deg] fill-primary/30" />
          </div>
        )}
        {level >= 5 && (
          <div className="absolute -top-32 -right-6 animate-in fade-in zoom-in duration-700 delay-700 text-primary">
            <Sparkles className="w-16 h-16 animate-pulse" />
          </div>
        )}
      </div>

      <div className="mt-8 text-center">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-1">Growth Stage</div>
        <div className="text-sm font-bold text-slate-900 font-serif italic">
          {level === 1 && "Sprouting Faith"}
          {level === 2 && "Firm Roots"}
          {level === 3 && "Growing Branches"}
          {level === 4 && "Flourishing Realization"}
          {level === 5 && "Fruit of Wisdom"}
        </div>
      </div>
    </div>
  )
}
