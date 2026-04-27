'use client'

import React from 'react'
import { Sparkles, Zap, Search, Bell } from 'lucide-react'
import { Badge } from '@/components/atoms/badge'
import { Button } from '@/components/atoms/button'

interface SeekerHeaderProps {
  user: any
  stats: any
}

export function SeekerHeader({ user, stats }: SeekerHeaderProps) {
  return (
    <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-slate-100 text-left">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            Pranams, <span className="text-primary italic">{user?.name || 'Seeker'}</span>
          </h1>
          <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="h-10 px-6 rounded-xl border-slate-100 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
            Path Focus: {user?.spiritual_profile?.current_focus || 'Seeking'}
          </Badge>
          <Badge className="h-10 px-6 rounded-xl bg-primary/5 text-primary border-none font-bold uppercase tracking-widest text-[10px]">
            Eligibility Level {user?.spiritual_profile?.eligibility_level || 1}
          </Badge>
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic flex items-center gap-2">
            <Zap className="w-3 h-3 text-primary" /> {stats?.currentStreak || 0} Day Sadhana Streak
          </div>
        </div>
      </div>
    </header>
  )
}
