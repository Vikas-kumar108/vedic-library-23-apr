'use client'

import React from 'react'
import { useSeekerGuidance } from '@/hooks/useSeekerGuidance'
import { Scale, Info, CheckCircle2, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * 📊 Purushartha Dashboard
 * Responsibility: Provide a high-fidelity visualization of the four aims of life.
 */
export function PurusharthaDashboard() {
  const { purushartha, loading, error } = useSeekerGuidance()

  if (loading) {
    return (
      <div className="p-8 bg-white border border-slate-100 rounded-[32px] animate-pulse space-y-6 shadow-xl">
        <div className="h-4 w-40 bg-slate-100 rounded-full" />
        <div className="space-y-4">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-10 w-full bg-slate-50 rounded-xl" />)}
        </div>
      </div>
    )
  }

  if (error || !purushartha) return null

  return (
    <div className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
      {/* 1. Background Decoration */}
      <div className="absolute top-0 right-0 p-8 text-slate-50 group-hover:text-primary/5 transition-colors">
        <Scale size={140} />
      </div>

      <div className="relative space-y-8">
        {/* 2. Header Section */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-primary/10 text-primary rounded-lg">
                <TrendingUp size={16} />
              </div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Life Balance Profile</h3>
            </div>
            <h2 className="text-2xl font-serif font-bold text-slate-900 italic">{purushartha.insight}</h2>
          </div>
          
          <div className="px-4 py-2 bg-slate-900 text-white rounded-full border border-slate-800 shadow-lg shrink-0">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{purushartha.balance_type.replace(/_/g, ' ')}</span>
          </div>
        </div>

        {/* 3. The 4 Pillars (Purusharthas) */}
        <div className="grid grid-cols-1 gap-6">
          <PurusharthaBar 
            label="Dharma" 
            emoji="📊" 
            value={purushartha.dharma} 
            description="Duty, Morality, and Ethics"
            color="bg-indigo-500" 
          />
          <PurusharthaBar 
            label="Artha" 
            emoji="💰" 
            value={purushartha.artha} 
            description="Prosperity and Practicality"
            color="bg-sky-500" 
          />
          <PurusharthaBar 
            label="Kama" 
            emoji="🎨" 
            value={purushartha.kama} 
            description="Regulated Enjoyment and Desire"
            color="bg-rose-500" 
          />
          <PurusharthaBar 
            label="Moksha" 
            emoji="🕉️" 
            value={purushartha.moksha} 
            description="Spiritual Liberation and Growth"
            color="bg-amber-500" 
          />
        </div>

        {/* 4. Footer Insight */}
        <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <Info size={16} className="text-primary shrink-0" />
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            This balance is computed from your current inner state, practice consistency, and worldly stability.
          </p>
        </div>
      </div>
    </div>
  )
}

function PurusharthaBar({ label, emoji, value, description, color }: { label: string, emoji: string, value: number, description: string, color: string }) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-end">
        <div className="flex items-center gap-2">
          <span className="text-xl">{emoji}</span>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-800 tracking-tight">{label}</span>
            <span className="text-[10px] text-slate-400 font-medium">{description}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold font-mono text-slate-900">{value}%</span>
          {value >= 80 && <CheckCircle2 size={14} className="text-emerald-500" />}
        </div>
      </div>
      
      <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
        <div 
          className={cn("h-full transition-all duration-1000 ease-out shadow-sm", color)}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}
