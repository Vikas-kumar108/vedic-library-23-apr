'use client'

import React from 'react'
import Link from 'next/link'
import { Calendar } from 'lucide-react'
import { Button } from '@/components/atoms/button'

export function SanghaSessions() {
  return (
    <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-soft space-y-6 text-left">
      <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
        <Calendar className="w-4 h-4 text-primary" /> Live Sessions
      </h2>
      <div className="space-y-4">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-50 hover:border-primary/20 transition-all cursor-pointer group">
          <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Today, 6 PM</div>
          <div className="text-xs font-bold text-slate-900 group-hover:text-primary transition-colors">Gita Satsang: Karma & Duty</div>
          <div className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mt-1">with Dr. Keshav Dev</div>
        </div>
      </div>
      <Button asChild variant="ghost" className="w-full text-xs text-primary font-bold">
         <Link href="/guidance">View Calendar →</Link>
      </Button>
    </section>
  )
}
