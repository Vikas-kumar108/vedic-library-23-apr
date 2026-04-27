'use client'

import React from 'react'
import { useMentor } from '@/hooks/useMentor'
import { UserCheck, Sparkles, MessageSquare, ArrowRight, ShieldCheck, Heart } from 'lucide-react'
import { Button } from '@/components/atoms/button'
import { cn } from '@/lib/utils'

/**
 * 🧑‍🏫 Mentor Widget
 * Responsibility: Intelligently notify seekers when human guidance is available to assist them further.
 * Aesthetics: Warm, empowering, and respectful.
 */
export function MentorWidget() {
  const { mentorRequired, reason, urgency, type, suggestedAction, loading } = useMentor()

  if (loading) {
    return (
      <div className="p-8 bg-white border border-slate-100 rounded-[32px] animate-pulse flex items-center gap-6 shadow-xl">
        <div className="size-16 bg-slate-100 rounded-2xl" />
        <div className="space-y-3 flex-1">
          <div className="h-4 w-32 bg-slate-100 rounded-full" />
          <div className="h-3 w-full bg-slate-50 rounded-full" />
        </div>
      </div>
    )
  }

  if (!mentorRequired) {
    return (
      <div className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-xl shadow-slate-200/40 flex items-center justify-between gap-6 group transition-all hover:border-emerald-100">
        <div className="flex items-center gap-6">
          <div className="p-4 bg-emerald-50 text-emerald-500 rounded-2xl transition-colors group-hover:bg-emerald-100">
            <ShieldCheck size={28} />
          </div>
          <div className="space-y-1 text-left">
            <h3 className="text-lg font-serif font-bold text-slate-900 italic">Thriving Autonomously</h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-sm">
              Your practice is steady and inspired. Continue your journey with joyful consistency.
            </p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
          <Sparkles size={14} className="text-amber-300" /> Inspired Path
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 p-8 text-slate-50 group-hover:text-indigo-500/5 transition-colors">
        <UserCheck size={120} />
      </div>

      <div className="relative flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Icon & Status */}
        <div className="relative shrink-0">
          <div className={cn(
            "p-5 rounded-[2rem] shadow-lg transition-transform group-hover:scale-105",
            urgency === 'high' ? "bg-amber-500 text-white" : "bg-indigo-500 text-white"
          )}>
            <MessageSquare size={32} />
          </div>
          {urgency === 'high' && (
            <div className="absolute -top-2 -right-2 p-1.5 bg-white rounded-full shadow-md border border-slate-100">
              <Heart size={14} className="text-rose-500 animate-pulse" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-6 text-center md:text-left">
          <div className="space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className={cn(
                "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em]",
                urgency === 'high' ? "bg-amber-100 text-amber-700" : "bg-indigo-50 text-indigo-500"
              )}>
                {urgency === 'high' ? 'Priority Support Available' : 'Guidance Available'}
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">{type.replace(/_/g, ' ')} alignment</span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-slate-900 leading-tight italic">A Mentor can assist you further</h2>
            <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-xl">
              {reason}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button size="lg" className="h-14 px-10 rounded-2xl bg-slate-900 text-white font-bold shadow-xl shadow-slate-900/20 hover:bg-primary transition-all flex items-center gap-3">
              Request Guidance <ArrowRight size={18} />
            </Button>
            <button className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest border-b border-transparent hover:border-slate-200 pb-1">
              Continue Self Practice
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
