'use client'

import React from 'react'
import { Book, Zap, Languages, Activity } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ContentStatsProps {
  healthData: any
}

export function ContentStats({ healthData }: ContentStatsProps) {
  const stats = [
    { label: 'Core Shastras', count: healthData?.shastras?.length || 0, icon: Book, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { label: 'Total Nodes', count: healthData?.shastras?.reduce((acc: any, s: any) => acc + s.nodeCount, 0) || 0, icon: Zap, color: 'text-orange-500', bg: 'bg-orange-50' },
    { label: 'Languages', count: healthData?.languages?.length || 0, icon: Languages, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Health Score', count: '98%', icon: Activity, color: 'text-purple-500', bg: 'bg-purple-50' },
  ]

  return (
    <div className="grid md:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <div key={i} className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all group">
           <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform", stat.bg, stat.color)}>
              <stat.icon className="w-6 h-6" />
           </div>
           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{stat.label}</p>
           <h3 className="text-2xl font-black text-slate-900 mt-1 tracking-tighter">{stat.count}</h3>
        </div>
      ))}
    </div>
  )
}
