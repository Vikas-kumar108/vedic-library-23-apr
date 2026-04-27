'use client'

import React from 'react'
import { useDharmaGovernance } from '@/hooks/useDharmaGovernance'
import { ShieldCheck, AlertTriangle, Info, ArrowRight, ShieldAlert, HeartHandshake, Scale, Compass } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * ⚖️ Dharma Governance Widget Component
 * Responsibility: Display the seeker's current ethical standing, active violations, and restorative actions.
 * Aesthetics: Authoritative, supportive, clear status signaling.
 */
export function DharmaGovernanceWidget() {
  const { status, violations, actions, loading, error } = useDharmaGovernance()

  if (loading) {
    return (
      <div className="p-10 bg-white border border-slate-100 rounded-[40px] animate-pulse space-y-8 shadow-xl">
        <div className="h-6 w-48 bg-slate-100 rounded-full" />
        <div className="h-32 w-full bg-slate-50 rounded-3xl" />
      </div>
    )
  }

  if (error) return null

  const statusConfig = {
    aligned: {
      label: 'Aligned',
      icon: <ShieldCheck size={20} />,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-100',
      message: 'Your conduct is in harmony with institutional dharma.'
    },
    under_guidance: {
      label: 'Under Guidance',
      icon: <Info size={20} />,
      color: 'text-amber-500',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-100',
      message: 'Minor shifts in alignment suggest a need for restorative focus.'
    },
    at_risk: {
      label: 'At Risk',
      icon: <ShieldAlert size={20} />,
      color: 'text-rose-500',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-100',
      message: 'Significant ethical tension detected. Immediate restoration required.'
    }
  }

  const currentStatus = statusConfig[status]

  return (
    <div className="bg-white border border-slate-200 rounded-[40px] p-10 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
      {/* 1. Header & Status */}
      <div className="relative space-y-10 text-left">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-slate-50 text-slate-400 rounded-xl">
                <Scale size={20} />
              </div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Ethical Governance</h3>
            </div>
            <h2 className="text-3xl font-serif font-bold text-slate-900 italic">Dharma Alignment</h2>
          </div>
          
          <div className={cn(
            "px-6 py-3 rounded-full border flex items-center gap-3 shadow-sm",
            currentStatus.bgColor,
            currentStatus.borderColor,
            currentStatus.color
          )}>
            {currentStatus.icon}
            <span className="text-xs font-bold uppercase tracking-widest">{currentStatus.label}</span>
          </div>
        </div>

        {/* 2. Status Message */}
        <div className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 italic text-slate-600 text-sm leading-relaxed">
           "{currentStatus.message}"
        </div>

        {/* 3. Violations & Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Active Tensions (Violations) */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">
              <AlertTriangle size={12} className="text-amber-500" /> Active Tensions
            </div>
            <div className="space-y-3">
              {violations.filter(v => !v.resolved).length > 0 ? (
                violations.filter(v => !v.resolved).map((v, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 bg-white border border-slate-100 rounded-3xl hover:border-amber-100 transition-colors">
                    <div className="p-2 bg-amber-50 text-amber-500 rounded-xl shrink-0">
                      <Scale size={16} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-800">{v.dharma_rule.title}</p>
                      <p className="text-[11px] text-slate-400 leading-tight italic">{v.dharma_rule.category} domain</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center gap-3 p-5 bg-emerald-50/30 border border-emerald-100/30 rounded-3xl">
                   <ShieldCheck size={16} className="text-emerald-500" />
                   <p className="text-xs font-medium text-emerald-700 italic">No active ethical tensions detected.</p>
                </div>
              )}
            </div>
          </div>

          {/* Restorative Path (Actions) */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">
              <Compass size={12} className="text-indigo-500" /> Restorative Path
            </div>
            <div className="space-y-3">
              {actions.length > 0 ? (
                actions.map((a, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 bg-indigo-50/30 border border-indigo-100/50 rounded-3xl hover:bg-white transition-all group/action">
                    <div className="p-2 bg-white text-indigo-500 rounded-xl shadow-sm group-hover/action:scale-110 transition-transform">
                      <ArrowRight size={16} />
                    </div>
                    <p className="text-xs font-medium text-slate-700 italic leading-relaxed">{a.message}</p>
                  </div>
                ))
              ) : (
                <div className="flex items-center gap-3 p-5 bg-slate-50 border border-slate-100 rounded-3xl">
                   <HeartHandshake size={16} className="text-slate-300" />
                   <p className="text-xs font-medium text-slate-400 italic">Continue steady practice.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Aura */}
      <div className="absolute -top-12 -right-12 size-64 bg-slate-500/5 rounded-full blur-[100px]" />
    </div>
  )
}
