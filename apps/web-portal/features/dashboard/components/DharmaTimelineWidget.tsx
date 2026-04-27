'use client'

import React from 'react'
import { useDharmaTimeline } from '@/hooks/useDharmaTimeline'
import { History, Target, Sparkles, AlertCircle, Compass, ArrowUpRight, Calendar, Activity, Waves, Heart, ShieldCheck, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'

/**
 * ⏳ Dharma Timeline Widget Component
 * Responsibility: Display a longitudinal, sacred vertical timeline of the seeker's journey.
 * Aesthetics: Reflective, sacred, soft glows, traditional icons.
 */
export function DharmaTimelineWidget() {
  const { past, present, future, loading, error } = useDharmaTimeline()

  const getEventIcon = (type: string, impact: number) => {
    switch (type) {
      case 'samskara': return '🕉️';
      case 'milestone': return '📿';
      case 'shift': return impact > 0 ? '🌿' : '⚡';
      case 'insight': return '🔥';
      case 'stabilization': return '🌿';
      default: return '✨';
    }
  }

  if (loading) {
    return (
      <div className="p-10 bg-white border border-slate-100 rounded-[40px] animate-pulse space-y-8 shadow-xl">
        <div className="h-6 w-48 bg-slate-100 rounded-full" />
        <div className="h-64 w-full bg-slate-50 rounded-3xl" />
      </div>
    )
  }

  if (error) return null

  return (
    <div className="bg-white border border-slate-200 rounded-[40px] p-10 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
      {/* 1. Header */}
      <div className="relative space-y-12">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3 text-left">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-indigo-50 text-indigo-500 rounded-xl">
                <Compass size={20} />
              </div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Sacred Evolution</h3>
            </div>
            <h2 className="text-3xl font-serif font-bold text-slate-900 italic">Dharma Timeline</h2>
          </div>
          <div className="px-6 py-3 bg-slate-900 rounded-full shadow-lg shadow-slate-900/10 flex items-center gap-3 group/traj">
             <Waves size={16} className="text-indigo-300 group-hover/traj:animate-pulse" />
             <div className="text-left">
               <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Current Trajectory</p>
               <span className="text-xs font-bold text-white italic">{future.trajectory}</span>
             </div>
          </div>
        </div>

        {/* 2. Temporal Arc Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-left relative">
          {/* Vertical Separators (Desktop) */}
          <div className="hidden lg:block absolute left-1/3 top-0 bottom-0 w-px bg-slate-100" />
          <div className="hidden lg:block absolute left-2/3 top-0 bottom-0 w-px bg-slate-100" />

          {/* 🔙 THE PAST: "Your Journey" */}
          <div className="space-y-8">
            <div className="flex items-center gap-2 text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">
              Your Journey
            </div>
            <div className="space-y-6">
              <div className="relative border-l border-slate-100 space-y-10 pb-4 ml-2">
                {past.events.length > 0 ? past.events.slice(-5).map((event, i) => (
                  <div key={i} className="relative pl-10 group/ev">
                    {/* Soft Glow Marker */}
                    <div className="absolute -left-[16px] top-0 size-8 flex items-center justify-center">
                       <div className={cn(
                         "absolute inset-0 rounded-full blur-md opacity-20 transition-opacity group-hover/ev:opacity-40",
                         event.impact > 0 ? "bg-emerald-400" : "bg-amber-400"
                       )} />
                       <div className="relative z-10 text-lg drop-shadow-sm select-none">
                         {getEventIcon(event.type, event.impact)}
                       </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">
                        {format(new Date(event.event_date), 'MMMM yyyy')}
                      </p>
                      <p className="text-sm font-bold text-slate-800 italic leading-tight group-hover/ev:text-indigo-600 transition-colors">{event.title}</p>
                      {event.description && <p className="text-[11px] text-slate-400 leading-relaxed italic">{event.description}</p>}
                    </div>
                  </div>
                )) : (
                  <div className="relative pl-8 italic text-slate-300 text-xs">
                     Your sacred history is being written...
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 🟢 THE PRESENT: "Where You Stand" */}
          <div className="space-y-8">
            <div className="flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em]">
              Where You Stand
            </div>
            {present && (
              <div className="space-y-8">
                {/* State Card */}
                <div className="p-8 bg-slate-50 border border-slate-100 rounded-[3rem] space-y-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <History size={80} />
                  </div>
                  
                  <div className="flex items-center justify-between relative z-10">
                    <div className="space-y-1">
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Life Phase</p>
                      <p className="text-sm font-bold text-slate-900 uppercase tracking-tight italic">Active Realization</p>
                    </div>
                    <div className={cn(
                      "px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border shadow-sm",
                      present.state === 'stable' ? "bg-white text-emerald-600 border-emerald-100" : "bg-white text-amber-600 border-amber-100"
                    )}>
                      {present.state}
                    </div>
                  </div>
                  
                  <div className="space-y-6 relative z-10">
                    <div className="space-y-3">
                       <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                         <span className="text-slate-400">Dharma</span>
                         <span className="text-indigo-600">{present.purushartha.dharma}%</span>
                       </div>
                       <div className="h-1.5 w-full bg-white rounded-full overflow-hidden p-0.5 shadow-inner">
                         <div className="h-full bg-indigo-400 rounded-full" style={{ width: `${present.purushartha.dharma}%` }} />
                       </div>
                    </div>
                    <div className="space-y-3">
                       <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                         <span className="text-slate-400">Moksha</span>
                         <span className="text-emerald-600">{present.purushartha.moksha}%</span>
                       </div>
                       <div className="h-1.5 w-full bg-white rounded-full overflow-hidden p-0.5 shadow-inner">
                         <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${present.purushartha.moksha}%` }} />
                       </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 px-8 py-5 bg-white border border-slate-100 rounded-[2rem] shadow-sm group/item hover:border-indigo-100 transition-all">
                   <div className="p-2 bg-indigo-50 text-indigo-500 rounded-xl group-hover/item:scale-110 transition-transform">
                     <ShieldCheck size={20} />
                   </div>
                   <div className="space-y-0.5 text-left">
                     <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Behavioral Rhythm</p>
                     <p className="text-sm font-bold text-slate-700 italic tracking-tight">{present.karma_summary}</p>
                   </div>
                </div>
              </div>
            )}
          </div>

          {/* 🔮 THE FUTURE: "Where This Path Leads" */}
          <div className="space-y-8">
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-900 uppercase tracking-[0.3em]">
              Where This Path Leads
            </div>
            <div className="space-y-8">
              {/* Opportunities */}
              <div className="space-y-4">
                <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest px-2">Rising Realization</p>
                <div className="space-y-4">
                  {future.opportunities.map((opp, i) => (
                    <div key={i} className="flex items-start gap-4 p-6 bg-emerald-50/40 border border-emerald-100/30 rounded-[2.5rem] hover:bg-white hover:border-emerald-200 hover:shadow-md transition-all group/opp">
                      <div className="p-2 bg-white rounded-xl text-emerald-500 shadow-sm group-hover/opp:scale-110 transition-transform">
                        <Sparkles size={16} />
                      </div>
                      <p className="text-xs font-medium text-emerald-950 italic leading-relaxed">{opp}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risks */}
              {future.risks.length > 0 && (
                <div className="space-y-4">
                  <p className="text-[9px] font-bold text-amber-600 uppercase tracking-widest px-2">Subtle Tensions</p>
                  <div className="space-y-4">
                    {future.risks.map((risk, i) => (
                      <div key={i} className="flex items-start gap-4 p-6 bg-amber-50/40 border border-amber-100/30 rounded-[2.5rem] hover:bg-white hover:border-amber-200 hover:shadow-md transition-all group/risk">
                        <div className="p-2 bg-white rounded-xl text-amber-500 shadow-sm group-hover/risk:scale-110 transition-transform">
                          <AlertCircle size={16} />
                        </div>
                        <p className="text-xs font-medium text-amber-950 italic leading-relaxed">{risk}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Aura */}
      <div className="absolute -top-12 -right-12 size-80 bg-indigo-500/5 rounded-full blur-[120px]" />
      <div className="absolute -bottom-12 -left-12 size-80 bg-emerald-500/5 rounded-full blur-[120px]" />
    </div>
  )
}
