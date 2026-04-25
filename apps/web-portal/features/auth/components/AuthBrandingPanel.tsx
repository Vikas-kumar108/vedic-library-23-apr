'use client'

import React from 'react'
import Link from 'next/link'
import { Sparkles, Shield, Lock, KeyRound } from 'lucide-react'

const TRUST_SIGNALS = [
  { icon: Shield, text: 'Secure encrypted access' },
  { icon: Lock, text: 'Privacy-first wisdom platform' },
  { icon: KeyRound, text: 'Identity verified by VedicSkills' },
]

export function AuthBrandingPanel() {
  return (
    <div className="hidden lg:flex lg:w-[45%] bg-indigo-950 flex-col justify-between p-14 relative overflow-hidden text-left border-r border-indigo-900">
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-indigo-800/20 rounded-full blur-[80px]" />

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
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Institutional Access</span>
          </div>
          <h2 className="text-4xl font-serif text-white leading-snug italic">
            Access your <span className="text-indigo-400 font-bold not-italic">SACRED SANCTUARY</span>
          </h2>
          <p className="text-xs text-slate-500 font-mono">— Vedic Proverb</p>
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

      <div className="relative z-10">
        <p className="text-xs text-slate-600 font-bold uppercase tracking-widest">© 2026 Vedic Institutional OS.</p>
      </div>
    </div>
  )
}
