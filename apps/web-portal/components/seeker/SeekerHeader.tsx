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
            Welcome back, <span className="text-primary italic">{user?.name || 'Seeker'}</span>
          </h1>
          <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="h-10 px-6 rounded-xl border-slate-100 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
            Stage: {user?.spiritual?.ageGroup || 'Sadhaka'}
          </Badge>
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic flex items-center gap-2">
            <Zap className="w-3 h-3 text-primary" /> {stats?.currentStreak || 0} Day Sadhana Streak
          </div>
        </div>
      </div>
      
      <div className="flex gap-4">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
          <input 
            type="text" 
            placeholder="Search wisdom..." 
            className="h-14 pl-12 pr-6 rounded-2xl border border-slate-100 bg-white shadow-soft outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-sm w-64"
          />
        </div>
        <Button variant="outline" size="icon" className="h-14 w-14 rounded-2xl border-slate-100 relative group">
          <Bell className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
          <div className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full ring-4 ring-white" />
        </Button>
      </div>
    </header>
  )
}
