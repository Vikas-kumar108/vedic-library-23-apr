'use client'

import React from 'react'
import { useSeekerGuidance } from '@/hooks/useSeekerGuidance'
import { 
  Sparkles, ArrowRight, Info, Moon, BookOpen, 
  Brain, Shield, Zap, Home, Briefcase, Heart, AlertTriangle, Scale
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

/**
 * 🏛️ Guidance Widget (Ultimate Intelligence Edition)
 * Responsibility: Display seeker's complete spiritual roadmap and life balance profile.
 */
export function GuidanceWidget() {
  const { guidance, sadhana, grihastha, purushartha, loading, error } = useSeekerGuidance()
  const router = useRouter()

  if (loading) {
    return (
      <div className="p-8 bg-white border border-slate-100 rounded-[32px] animate-pulse space-y-8">
        <div className="h-4 w-32 bg-slate-100 rounded-full" />
        <div className="h-12 w-full bg-slate-100 rounded-2xl" />
        <div className="grid grid-cols-2 gap-4">
          <div className="h-24 bg-slate-50 rounded-2xl" />
          <div className="h-24 bg-slate-50 rounded-2xl" />
        </div>
      </div>
    )
  }

  if (error || !guidance || !sadhana || !grihastha || !purushartha) return null

  const handleAction = () => {
    if (guidance.recommended_node_id) {
      router.push(`/library/node/${guidance.recommended_node_id}`)
    } else {
      router.push('/library')
    }
  }

  return (
    <div className="relative group overflow-hidden bg-white border border-slate-200 rounded-[32px] p-8 transition-all hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 shadow-xl shadow-slate-200/40">
      {/* 1. Background Aura */}
      <div className="absolute -top-24 -right-24 size-96 bg-primary/5 rounded-full blur-3xl transition-all group-hover:bg-primary/10" />
      
      <div className="relative space-y-12">
        {/* 2. Top Header & Primary Message */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 text-primary rounded-2xl shadow-inner">
              <Sparkles size={20} />
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Institutional Guidance</span>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-serif font-bold text-slate-900 leading-tight italic">
              {guidance.message}
            </h2>
            <div className="flex items-center gap-2 text-slate-400">
              <Info size={14} className="flex-shrink-0" />
              <p className="text-[11px] font-medium leading-relaxed">
                Directed action: <span className="text-slate-600 font-bold uppercase tracking-widest">{guidance.next_action.replace(/_/g, ' ')}</span>
              </p>
            </div>
          </div>
        </div>

        {/* 3. Purushartha Balance Analyzer (New Section) */}
        <section className="p-8 bg-slate-900 rounded-[32px] text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10"><Scale size={120} /></div>
          
          <div className="relative space-y-8">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-xs font-bold text-primary uppercase tracking-widest">⚖️ Purushartha Balance</h3>
                <p className="text-xl font-medium text-slate-200">{purushartha.insight}</p>
              </div>
              <div className="px-4 py-2 bg-white/10 rounded-full border border-white/10 backdrop-blur-md">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{purushartha.balance_type.replace(/_/g, ' ')}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <BalanceMeter label="Dharma" value={purushartha.dharma} color="bg-indigo-500" />
              <BalanceMeter label="Artha" value={purushartha.artha} color="bg-sky-500" />
              <BalanceMeter label="Kama" value={purushartha.kama} color="bg-rose-500" />
              <BalanceMeter label="Moksha" value={purushartha.moksha} color="bg-amber-500" />
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* 4. Sadhana Section (Internal Practice) */}
          <section className="space-y-6 p-6 bg-slate-50/50 rounded-3xl border border-slate-100">
            <div className="flex items-center gap-2">
              <div className="size-1.5 rounded-full bg-primary animate-pulse" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">🧘 Today’s Sadhana</h3>
            </div>

            <div className="space-y-4">
              <SadhanaItem icon={<Moon size={16} />} title="Morning" text={sadhana.morning_practice} color="amber" />
              <SadhanaItem icon={<BookOpen size={16} />} title="Study" text={sadhana.study_focus} color="blue" />
              <SadhanaItem icon={<Brain size={16} />} title="Reflection" text={sadhana.reflection} color="purple" />
              <SadhanaItem icon={<Zap size={16} />} title="Discipline" text={sadhana.discipline} color="emerald" />
              <SadhanaItem icon={<Shield size={16} />} title="Avoid" text={sadhana.avoidance} color="rose" isAlert />
            </div>
          </section>

          {/* 5. Life Alignment Section (External Duty) */}
          <section className="space-y-6 p-6 bg-indigo-50/30 rounded-3xl border border-indigo-100/50">
            <div className="flex items-center gap-2">
              <div className="size-1.5 rounded-full bg-indigo-500 animate-pulse" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">🏛️ Life Alignment</h3>
            </div>

            <div className="space-y-4">
              <SadhanaItem icon={<Heart size={16} />} title="Spiritual Duty" text={grihastha.spiritual_duty} color="indigo" />
              <SadhanaItem icon={<Home size={16} />} title="Family Duty" text={grihastha.family_duty} color="violet" />
              <SadhanaItem icon={<Briefcase size={16} />} title="Livelihood" text={grihastha.livelihood_focus} color="sky" />
              <SadhanaItem icon={<Zap size={16} />} title="Lifestyle" text={grihastha.lifestyle_guidance} color="cyan" />
              
              {grihastha.risk_flags.length > 0 && (
                <div className="flex gap-4 p-4 bg-rose-50 rounded-2xl border border-rose-100">
                  <div className="p-2 bg-rose-100 text-rose-500 rounded-lg h-fit"><AlertTriangle size={18} /></div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-rose-400 uppercase tracking-tighter">Warnings</p>
                    <div className="flex flex-wrap gap-2">
                      {grihastha.risk_flags.map(flag => (
                        <span key={flag} className="text-[10px] font-bold bg-rose-200/50 text-rose-700 px-2 py-0.5 rounded-md uppercase tracking-wider">
                          {flag.replace(/_/g, ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* 6. Footer & Action */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-100">
          <p className="text-[11px] text-slate-400 italic font-medium">Guided by the institutional intelligence layer.</p>
          <button
            onClick={handleAction}
            className="group/btn relative inline-flex items-center justify-center gap-3 h-14 px-10 bg-slate-900 text-white rounded-2xl font-bold text-sm uppercase tracking-widest transition-all hover:bg-primary hover:shadow-2xl hover:shadow-primary/25 active:scale-[0.98]"
          >
            {guidance.recommended_node_id ? 'Continue Journey' : 'Explore Library'}
            <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  )
}

function BalanceMeter({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-end">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</span>
        <span className="text-xs font-bold font-mono">{value}%</span>
      </div>
      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
        <div 
          className={cn("h-full transition-all duration-1000 ease-out", color)}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

function SadhanaItem({ icon, title, text, color, isAlert = false }: { icon: React.ReactNode, title: string, text: string, color: string, isAlert?: boolean }) {
  const colors: Record<string, string> = {
    amber: 'bg-amber-50 text-amber-500 border-amber-100',
    blue: 'bg-blue-50 text-blue-500 border-blue-100',
    purple: 'bg-purple-50 text-purple-500 border-purple-100',
    emerald: 'bg-emerald-50 text-emerald-500 border-emerald-100',
    rose: 'bg-rose-50 text-rose-500 border-rose-100',
    indigo: 'bg-indigo-50 text-indigo-500 border-indigo-100',
    violet: 'bg-violet-50 text-violet-500 border-violet-100',
    sky: 'bg-sky-50 text-sky-500 border-sky-100',
    cyan: 'bg-cyan-50 text-cyan-500 border-cyan-100',
  }

  return (
    <div className={cn(
      "flex gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md",
      isAlert && "bg-rose-50/30 border-rose-100"
    )}>
      <div className={cn("p-2 rounded-lg h-fit", colors[color])}>{icon}</div>
      <div className="space-y-1">
        <p className={cn("text-[10px] font-bold uppercase tracking-tighter", isAlert ? "text-rose-400" : "text-slate-400")}>
          {title}
        </p>
        <p className={cn("text-sm font-medium leading-snug", isAlert ? "text-rose-700 font-bold" : "text-slate-700")}>
          {text}
        </p>
      </div>
    </div>
  )
}
