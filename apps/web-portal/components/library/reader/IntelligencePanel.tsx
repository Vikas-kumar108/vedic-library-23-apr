'use client'

import React from 'react'
import { PenTool, MessageSquare } from 'lucide-react'
import { Button } from '@/components/atoms/button'

export function IntelligencePanel() {
  return (
    <aside className="hidden xl:flex w-80 border-l border-slate-100 bg-white flex-col animate-in slide-in-from-right duration-500 text-left">
      <div className="p-8 space-y-10">
        <div className="space-y-6">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <PenTool className="w-3 h-3" /> Personal Realizations
          </h3>
          <textarea className="w-full h-40 p-4 rounded-2xl bg-slate-50 border-none text-sm font-serif italic focus:ring-2 focus:ring-primary/10 outline-none transition-all" placeholder="Write your realization here..." />
          <Button className="w-full rounded-xl h-12 bg-slate-900 text-white font-bold">Save Reflection</Button>
        </div>

        <div className="space-y-6 pt-6 border-t border-slate-50">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <MessageSquare className="w-3 h-3" /> Sangha Discussion
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-primary/20" />
                <span className="text-[10px] font-bold text-slate-900">Dr. Keshav Dev</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed italic">"How does the concept of detached action apply to corporate leadership?"</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
