'use client'

import React from 'react'
import { LayoutDashboard } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export function DashboardHeader() {
  return (
    <header className="flex justify-between items-center bg-slate-900/40 border border-slate-800 p-6 rounded-[2rem] backdrop-blur-xl">
      <div className="flex items-center gap-6">
        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <LayoutDashboard className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-serif font-bold italic text-slate-100">Institutional <span className="text-indigo-400">Command</span></h1>
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] mt-1">Vedic Operating System • v2.1.0</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
          System Healthy
        </Badge>
        <div className="h-10 w-[1px] bg-slate-800" />
        <p className="text-xs font-bold text-slate-400 italic">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
      </div>
    </header>
  )
}
