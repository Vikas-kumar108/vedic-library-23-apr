'use client'

import React from 'react'
import { useCommunity } from '@/hooks/useCommunity'
import { Users, Heart, Sparkles, AlertCircle, Info, ArrowRight, Home, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CommunityDashboardProps {
  communityId?: string;
}

/**
 * 🏘️ Community Dashboard Component
 * Responsibility: Display the collective Dharmic health of our community.
 * Aesthetics: Warm, collective, focused on unity and shared progress.
 */
export function CommunityDashboard({ communityId }: CommunityDashboardProps) {
  const { community, loading, error } = useCommunity(communityId)

  if (loading) {
    return (
      <div className="p-8 bg-white border border-slate-100 rounded-[32px] animate-pulse space-y-8 shadow-xl">
        <div className="h-6 w-48 bg-slate-100 rounded-full" />
        <div className="grid grid-cols-3 gap-6">
          {[1, 2, 3].map(i => <div key={i} className="h-24 bg-slate-50 rounded-2xl" />)}
        </div>
      </div>
    )
  }

  if (error || !community) return null

  return (
    <div className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
      {/* 1. Header */}
      <div className="relative space-y-10">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-indigo-50 text-indigo-500 rounded-lg">
                <Users size={18} />
              </div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Our Shared Path</h3>
            </div>
            <h2 className="text-2xl font-serif font-bold text-slate-900 italic">Community Harmony</h2>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-full border border-slate-100">
            <Home size={16} className="text-slate-400" />
            <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">{community.population} Seekers</span>
          </div>
        </div>

        {/* 2. Metrics (Collective Progress) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-emerald-50 rounded-[2rem] border border-emerald-100/50 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Shared Dharma</span>
              <ShieldCheck size={18} className="text-emerald-400" />
            </div>
            <div className="space-y-1 text-left">
              <p className="text-3xl font-serif font-bold text-emerald-900 italic">{community.dharma_score}%</p>
              <p className="text-[10px] font-bold text-emerald-600/60 uppercase tracking-widest">Collective Alignment</p>
            </div>
          </div>

          <div className="p-6 bg-amber-50 rounded-[2rem] border border-amber-100/50 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">Shared Moksha</span>
              <Sparkles size={18} className="text-amber-400" />
            </div>
            <div className="space-y-1 text-left">
              <p className="text-3xl font-serif font-bold text-amber-900 italic">{community.moksha_score}%</p>
              <p className="text-[10px] font-bold text-amber-600/60 uppercase tracking-widest">Collective Aim</p>
            </div>
          </div>

          <div className="p-6 bg-rose-50 rounded-[2rem] border border-rose-100/50 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-rose-600 uppercase tracking-widest">Shared Harmony</span>
              <Heart size={18} className="text-rose-400" />
            </div>
            <div className="space-y-1 text-left">
              <p className="text-3xl font-serif font-bold text-rose-900 italic">{community.harmony_score}%</p>
              <p className="text-[10px] font-bold text-rose-600/60 uppercase tracking-widest">Communal Unity</p>
            </div>
          </div>
        </div>

        {/* 3. Collective Observations & Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">
              <AlertCircle size={12} /> Collective Observations
            </div>
            <div className="space-y-3">
              {community.risk_flags.map((flag, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                  <div className="size-2 bg-indigo-400 rounded-full animate-pulse" />
                  <p className="text-xs font-medium text-slate-600">{flag}</p>
                </div>
              ))}
              {community.insights.map((insight, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-indigo-50/50 border border-indigo-100/50 rounded-2xl">
                  <Info size={16} className="text-indigo-400 shrink-0 mt-0.5" />
                  <p className="text-xs font-medium text-slate-700 italic leading-relaxed">{insight}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Shared Recommendations */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">
              <ArrowRight size={12} /> Opportunities for Shared Progress
            </div>
            <div className="space-y-4">
              {community.recommendations.map((rec, i) => (
                <div key={i} className="p-6 bg-slate-900 rounded-3xl text-white shadow-xl shadow-slate-900/20 group hover:bg-indigo-600 transition-colors">
                  <p className="text-sm font-bold leading-tight mb-2 italic">"{rec}"</p>
                  <p className="text-[10px] font-bold text-slate-400 group-hover:text-indigo-200 uppercase tracking-widest">Collective Support</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Aura */}
      <div className="absolute -bottom-12 -right-12 size-48 bg-indigo-500/5 rounded-full blur-3xl" />
    </div>
  )
}
