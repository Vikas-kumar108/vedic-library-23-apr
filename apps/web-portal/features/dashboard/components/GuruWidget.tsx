'use client'

import React, { useState } from 'react'
import { useGuru } from '@/hooks/useGuru'
import { apiFetch } from '@/lib/api'
import { Sparkles, ArrowRight, Activity, AlertCircle, ListTodo, ChevronDown, ChevronUp, ScrollText, Heart, ThumbsUp, ThumbsDown } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * 🕉️ Guru Widget Component
 * Responsibility: Display unified institutional guidance with a deeply human and reflective tone.
 * Aesthetics: Minimal, reverent, supportive. Zero technical jargon.
 */
export function GuruWidget() {
  const { message, nextAction, priorities, warnings, layers, loading, error } = useGuru()
  const [isExpanded, setIsExpanded] = useState(false)
  const [feedbackSent, setFeedbackSent] = useState(false)

  const sendFeedback = async (rating: number) => {
    await apiFetch('/intelligence/feedback', {
      method: 'POST',
      body: JSON.stringify({
        guidance_type: 'guru',
        rating,
        outcome: 'Quick dashboard feedback'
      })
    })
    setFeedbackSent(true)
    setTimeout(() => setFeedbackSent(false), 3000)
  }

  // Human mapping for internal layer keys
  const layerLabels: Record<string, string> = {
    sadhana: 'Daily Practice',
    grihastha: 'Social Duties',
    purushartha: 'Life Balance',
    karma: 'Behavioral Rhythm',
    jyotish: 'Temporal Phase',
    samskara: 'Life Milestones',
    mentor: 'Guidance Chain'
  }

  if (loading) {
    return (
      <div className="p-10 bg-white border border-slate-100 rounded-[40px] animate-pulse space-y-8 shadow-xl text-left">
        <div className="h-6 w-48 bg-slate-100 rounded-full" />
        <div className="h-20 w-full bg-slate-50 rounded-3xl" />
        <div className="space-y-4">
          {[1, 2, 3].map(i => <div key={i} className="h-12 w-full bg-slate-50 rounded-2xl" />)}
        </div>
      </div>
    )
  }

  if (error) return null

  return (
    <div className="bg-white border border-slate-200 rounded-[40px] p-10 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
      {/* 1. Header & Primary Message */}
      <div className="relative space-y-10">
        <div className="flex items-start justify-between gap-4 text-left">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-indigo-50 text-indigo-500 rounded-xl">
                <ScrollText size={20} />
              </div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Institutional Support</h3>
            </div>
            <h2 className="text-3xl font-serif font-bold text-slate-900 leading-tight italic">
              {message}
            </h2>
          </div>
          
          {/* Feedback UI (Reflective) */}
          <div className="hidden sm:flex flex-col items-end gap-2 shrink-0">
            {feedbackSent ? (
              <div className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-widest animate-in fade-in zoom-in duration-300">
                Shared Reflection
              </div>
            ) : (
              <>
                <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Does this resonate?</p>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => sendFeedback(5)}
                    className="p-2 hover:bg-emerald-50 text-slate-300 hover:text-emerald-500 rounded-lg transition-colors"
                    title="Resonates"
                  >
                    <ThumbsUp size={16} />
                  </button>
                  <button 
                    onClick={() => sendFeedback(1)}
                    className="p-2 hover:bg-rose-50 text-slate-300 hover:text-rose-500 rounded-lg transition-colors"
                    title="Does not resonate"
                  >
                    <ThumbsDown size={16} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* 2. Next Action (Supportive Direction) */}
        <div className="p-1 bg-slate-900 rounded-full flex items-center justify-between group/btn hover:bg-indigo-600 transition-all cursor-pointer shadow-lg shadow-slate-900/10">
          <div className="px-8 py-3 text-white text-sm font-bold italic tracking-wide">
            {nextAction}
          </div>
          <div className="size-10 bg-white rounded-full flex items-center justify-center text-slate-900 group-hover/btn:scale-95 transition-transform">
            <ArrowRight size={18} />
          </div>
        </div>

        {/* 3. Directions & Awareness */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">
              <ListTodo size={12} /> Auspicious Focus
            </div>
            <div className="space-y-3">
              {priorities.map((item, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl group/item hover:border-indigo-100 hover:bg-white transition-all">
                  <div className="size-1.5 bg-indigo-400 rounded-full group-hover/item:scale-125 transition-transform" />
                  <p className="text-xs font-medium text-slate-600">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
             <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">
               <Activity size={12} /> Points of Contemplation
             </div>
             <div className="space-y-3">
               {warnings.length > 0 ? warnings.map((item, i) => (
                 <div key={i} className="flex items-center gap-3 px-4 py-3 bg-amber-50/30 border border-amber-100/50 rounded-2xl">
                   <AlertCircle size={14} className="text-amber-500" />
                   <p className="text-xs font-medium text-amber-700 italic">{item}</p>
                 </div>
               )) : (
                 <div className="flex items-center gap-3 px-4 py-3 bg-emerald-50/30 border border-emerald-100/50 rounded-2xl">
                   <Heart size={14} className="text-emerald-500" />
                   <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Steady Harmony</p>
                 </div>
               )}
             </div>
          </div>
        </div>

        {/* 4. Deep Layer Expansion (Optional) */}
        {layers && (
          <div className="pt-6 border-t border-slate-100">
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 mx-auto text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] hover:text-indigo-400 transition-colors"
            >
              {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              {isExpanded ? 'Conceal Depth' : 'Observe Supporting Dimensions'}
            </button>
            
            {isExpanded && (
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
                {Object.keys(layers).map((key) => (
                  <div key={key} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-center space-y-1">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{layerLabels[key] || key}</p>
                    <div className="size-1 mx-auto bg-indigo-300 rounded-full" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Decorative Aura */}
      <div className="absolute -bottom-24 -left-24 size-64 bg-indigo-500/5 rounded-full blur-[80px]" />
    </div>
  )
}
