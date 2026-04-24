'use client'

import React from 'react'
import { Flame } from 'lucide-react'
import { Card } from '@/components/ui/card'

interface AcademyStatsProps {
  vowStats: any
  circleCount: number
}

export function AcademyStats({ vowStats, circleCount }: AcademyStatsProps) {
  return (
    <div className="lg:col-span-1 space-y-6">
      <Card className="bg-slate-900/40 border-slate-800 rounded-[2.5rem] p-8 space-y-8">
        <div className="space-y-1">
          <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest">Active Vows</h3>
          <p className="text-4xl font-serif font-bold italic text-slate-100">{vowStats?.ACTIVE || 0}</p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-500 italic">Vow Continuity</span>
            <span className="text-emerald-400">92%</span>
          </div>
          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500" style={{ width: '92%' }} />
          </div>
        </div>
        <div className="pt-4 grid grid-cols-2 gap-4">
          <div className="p-4 bg-white/5 rounded-2xl text-center">
            <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Circles</p>
            <p className="text-xl font-bold text-slate-300">{circleCount}</p>
          </div>
          <div className="p-4 bg-white/5 rounded-2xl text-center">
            <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Realizations</p>
            <p className="text-xl font-bold text-slate-300">142</p>
          </div>
        </div>
      </Card>

      <Card className="bg-slate-900/40 border-slate-800 rounded-[2.5rem] p-8">
        <div className="flex items-center gap-3 text-amber-400 mb-6">
          <Flame className="w-5 h-5 animate-pulse" />
          <span className="text-xs font-black uppercase tracking-widest">Wisdom Streak</span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed italic">
          "The Brahmachari circle has maintained a daily Gita realization streak for 12 days."
        </p>
      </Card>
    </div>
  )
}
