'use client'

import React from 'react'
import { useFamilyDashboard } from '@/hooks/useFamilyDashboard'
import { Home, Users, ShieldAlert, ScrollText, CheckCircle2, AlertTriangle, User } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FamilyDashboardProps {
  familyId: string | undefined
}

/**
 * 🏠 Family Dashboard Component
 * Responsibility: Display collective spiritual and dharmic intelligence for a household unit.
 */
export function FamilyDashboard({ familyId }: FamilyDashboardProps) {
  const { family, loading, error } = useFamilyDashboard(familyId)

  if (loading) {
    return (
      <div className="p-8 bg-white border border-slate-100 rounded-[32px] animate-pulse space-y-8 shadow-xl">
        <div className="h-4 w-48 bg-slate-100 rounded-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-32 bg-slate-50 rounded-3xl" />
          <div className="h-32 bg-slate-50 rounded-3xl" />
        </div>
      </div>
    )
  }

  if (error || !family) return null

  return (
    <div className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-xl shadow-slate-200/40 relative overflow-hidden group transition-all hover:border-indigo-100">
      {/* 1. Header & Aggregate Scores */}
      <div className="relative space-y-10">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-indigo-50 text-indigo-500 rounded-lg">
                <Home size={18} />
              </div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Household Intelligence</h3>
            </div>
            <h2 className="text-2xl font-serif font-bold text-slate-900 italic">Family Overview</h2>
          </div>
          
          <div className="flex gap-6">
            <ScoreCircle label="Collective Dharma" value={family.family_dharma_score} color="text-indigo-500" />
            <ScoreCircle label="Collective Moksha" value={family.family_moksha_score} color="text-amber-500" />
          </div>
        </div>

        {/* 2. Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {family.members.map((member) => (
            <div key={member.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-4 transition-all hover:bg-white hover:shadow-md hover:border-indigo-100">
              <div className={cn(
                "p-2.5 rounded-xl",
                member.risk_flags.length > 0 ? "bg-rose-50 text-rose-500" : "bg-indigo-50 text-indigo-500"
              )}>
                <User size={20} />
              </div>
              <div className="space-y-1 min-w-0">
                <p className="text-sm font-bold text-slate-900 truncate">{member.name}</p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[9px] font-bold uppercase tracking-wider bg-white px-2 py-0.5 rounded-md border border-slate-200 text-slate-400">{member.role}</span>
                  <span className="text-[9px] font-bold uppercase tracking-wider bg-white px-2 py-0.5 rounded-md border border-slate-200 text-slate-400">{member.life_stage}</span>
                </div>
                <div className="pt-2 flex items-center gap-1.5">
                  <div className={cn("size-1.5 rounded-full", member.risk_flags.length > 0 ? "bg-rose-500 animate-pulse" : "bg-emerald-500")} />
                  <span className={cn("text-[10px] font-bold uppercase tracking-widest", member.risk_flags.length > 0 ? "text-rose-500" : "text-emerald-500")}>
                    {member.risk_flags.length > 0 ? 'At Risk' : 'Stable'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 3. Alerts & Recommendation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Alerts List */}
          {family.alerts.length > 0 && (
            <div className="p-6 bg-rose-50 rounded-3xl border border-rose-100 space-y-4">
              <div className="flex items-center gap-2 text-rose-600">
                <ShieldAlert size={18} />
                <h4 className="text-xs font-bold uppercase tracking-widest">Active Alerts</h4>
              </div>
              <ul className="space-y-2">
                {family.alerts.map((alert, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs font-medium text-rose-700">
                    <div className="size-1 bg-rose-400 rounded-full mt-1.5 shrink-0" />
                    {alert}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Recommendation */}
          <div className="p-6 bg-indigo-50 rounded-3xl border border-indigo-100 space-y-4">
            <div className="flex items-center gap-2 text-indigo-600">
              <ScrollText size={18} />
              <h4 className="text-xs font-bold uppercase tracking-widest">Collective Directive</h4>
            </div>
            <p className="text-sm font-medium text-indigo-900 italic leading-relaxed">
              "{family.recommendation}"
            </p>
            <div className="pt-2 flex items-center gap-2 text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
              <CheckCircle2 size={12} /> Institutional Best Practice
            </div>
          </div>
        </div>
      </div>

      {/* Background Aura Decoration */}
      <div className="absolute -bottom-12 -left-12 size-48 bg-indigo-500/5 rounded-full blur-3xl" />
    </div>
  )
}

function ScoreCircle({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div className="text-center space-y-1">
      <div className={cn("text-xl font-bold font-mono", color)}>{value}%</div>
      <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{label}</div>
    </div>
  )
}
