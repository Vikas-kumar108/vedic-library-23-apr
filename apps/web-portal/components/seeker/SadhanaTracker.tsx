'use client'

import React from 'react'
import Link from 'next/link'
import { Flame, Zap, BookOpen, ChevronRight } from 'lucide-react'
import { Button } from '@/components/atoms/button'

export function SadhanaTracker() {
  return (
    <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-soft space-y-8 text-left">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Today's Vow</h2>
        <Flame className="w-5 h-5 text-orange-500 fill-current animate-pulse" />
      </div>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between group cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">Japa Meditation</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">16 Rounds Scheduled</div>
            </div>
          </div>
          <div className="text-slate-200 group-hover:text-primary transition-all"><ChevronRight className="w-5 h-5" /></div>
        </div>

        <div className="flex items-center justify-between group cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">Shastra Study</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">30 Mins Scheduled</div>
            </div>
          </div>
          <div className="text-slate-200 group-hover:text-orange-500 transition-all"><ChevronRight className="w-5 h-5" /></div>
        </div>
      </div>

      <Button asChild variant="outline" className="w-full h-12 rounded-xl border-slate-100 text-xs font-bold uppercase tracking-widest hover:border-primary/20 hover:text-primary transition-all">
        <Link href="/practice">Open Tracker</Link>
      </Button>
    </section>
  )
}
