'use client'

import React from 'react'
import Link from 'next/link'
import { Sparkles, Shield, Lock, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const TRUST_SIGNALS = [
  { icon: Shield, text: 'Your data is encrypted end-to-end' },
  { icon: Lock, text: 'We never sell or share your information' },
  { icon: CheckCircle2, text: 'Free forever · No credit card required' },
]

const SOCIAL_PROOF_MINI = [
  { initial: 'A', color: 'bg-blue-500' },
  { initial: 'R', color: 'bg-emerald-500' },
  { initial: 'S', color: 'bg-violet-500' },
  { initial: 'M', color: 'bg-amber-500' },
]

export function SignupBrandingPanel() {
  return (
    <div className="hidden lg:flex lg:w-[45%] bg-amber-900 flex-col justify-between p-14 relative overflow-hidden text-left border-r border-amber-800">
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-amber-700/10 rounded-full blur-[80px]" />

      <div className="relative z-10">
        <Link href="/welcome" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white font-bold">V</div>
          <span className="text-white font-bold text-xl tracking-tight">VedicSkills</span>
        </Link>
      </div>

      <div className="relative z-10 space-y-10">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Your path awaits</span>
          </div>
          <h2 className="text-4xl font-serif text-white leading-snug italic">
            Begin your <span className="text-amber-400 font-bold not-italic">INITIATION PATH</span>
          </h2>
          <p className="text-xs text-slate-500 font-mono">— Bhagavad Gītā 2.23</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {SOCIAL_PROOF_MINI.map((u, i) => (
                <div key={i} className={cn("w-8 h-8 rounded-full border-2 border-slate-900 flex items-center justify-center text-white font-bold text-[10px]", u.color)}>
                  {u.initial}
                </div>
              ))}
              <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-slate-400 text-[10px] font-bold">
                +12k
              </div>
            </div>
            <p className="text-xs text-slate-400 font-bold tracking-tight">Joined this week</p>
          </div>

          <div className="space-y-3">
            {TRUST_SIGNALS.map((t, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-7 h-7 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <t.icon className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="text-xs text-slate-400">{t.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <p className="text-xs text-slate-600 font-bold uppercase tracking-widest">© 2026 Vedic Institutional OS.</p>
      </div>
    </div>
  )
}
