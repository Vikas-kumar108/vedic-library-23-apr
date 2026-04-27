'use client'

import React from 'react'
import { useLineage } from '@/hooks/useLineage'
import { GitBranch, User, GraduationCap, Link2, Anchor, Star, ChevronDown, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * 🌳 Lineage Dashboard Component
 * Responsibility: Display biological and spiritual heritage in a reverent, tree-like UI.
 * Aesthetics: Minimal lines, sacred feel, respectful tone. Zero ego comparison.
 */
export function LineageDashboard() {
  const { familyTree, mentors, disciples, parampara, loading, error } = useLineage()
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({
    family: true,
    mentorship: true,
    parampara: true
  })

  const toggle = (section: string) => setExpanded(prev => ({ ...prev, [section]: !prev[section] }))

  if (loading) {
    return (
      <div className="p-8 bg-white border border-slate-100 rounded-[32px] animate-pulse space-y-6 shadow-xl">
        <div className="h-4 w-40 bg-slate-100 rounded-full" />
        <div className="space-y-4">
          {[1, 2, 3].map(i => <div key={i} className="h-12 w-full bg-slate-50 rounded-2xl" />)}
        </div>
      </div>
    )
  }

  if (error || (familyTree.parents.length === 0 && mentors.length === 0 && parampara.length === 0)) return null

  return (
    <div className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
      {/* 1. Header */}
      <div className="relative space-y-10">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-slate-50 text-slate-400 rounded-lg">
                <GitBranch size={18} />
              </div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Heritage</h3>
            </div>
            <h2 className="text-2xl font-serif font-bold text-slate-900 italic text-left">Connections & Successions</h2>
          </div>
          <Anchor size={24} className="text-slate-100" />
        </div>

        {/* 2. Family Heritage Section */}
        <section className="space-y-4">
          <button 
            onClick={() => toggle('family')}
            className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors"
          >
            {expanded.family ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
            Family Heritage
          </button>
          
          {expanded.family && (
            <div className="pl-4 border-l border-slate-100 space-y-6">
              {familyTree.parents.map(p => (
                <div key={p.id} className="relative flex items-center gap-3">
                  <div className="absolute -left-4 w-4 h-px bg-slate-100" />
                  <div className="p-2 bg-indigo-50 text-indigo-500 rounded-full shadow-sm">
                    <User size={14} />
                  </div>
                  <div className="text-left">
                    <p className="text-[11px] font-bold text-slate-700 uppercase tracking-tight">{p.name}</p>
                    <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest italic">Connection</p>
                  </div>
                </div>
              ))}

              <div className="relative flex items-center gap-3">
                <div className="absolute -left-4 w-4 h-px bg-indigo-200" />
                <div className="p-2.5 bg-indigo-500 text-white rounded-full shadow-lg shadow-indigo-200 scale-110">
                  <Star size={16} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-900 italic">Current Node</p>
                </div>
              </div>

              {familyTree.children.map(c => (
                <div key={c.id} className="relative flex items-center gap-3">
                  <div className="absolute -left-4 w-4 h-px bg-slate-100" />
                  <div className="p-2 bg-slate-50 text-slate-400 rounded-full">
                    <User size={14} />
                  </div>
                  <div className="text-left">
                    <p className="text-[11px] font-bold text-slate-600 uppercase tracking-tight">{c.name}</p>
                    <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest italic">Connection</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 3. Guidance Chain Section */}
        <section className="space-y-4">
          <button 
            onClick={() => toggle('mentorship')}
            className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors"
          >
            {expanded.mentorship ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
            Guidance Chain
          </button>

          {expanded.mentorship && (
            <div className="pl-4 border-l border-slate-100 space-y-6">
              {mentors.map(m => (
                <div key={m.id} className="relative flex items-center gap-3">
                  <div className="absolute -left-4 w-4 h-px bg-slate-100" />
                  <div className="p-2 bg-amber-50 text-amber-500 rounded-xl">
                    <GraduationCap size={16} />
                  </div>
                  <div className="text-left">
                    <p className="text-[11px] font-bold text-slate-700 uppercase tracking-tight">{m.name}</p>
                    <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest italic">Institutional Guide</p>
                  </div>
                </div>
              ))}

              <div className="relative flex items-center gap-3">
                <div className="absolute -left-4 w-4 h-px bg-amber-200" />
                <div className="p-2 bg-amber-500 text-white rounded-xl shadow-lg shadow-amber-200">
                  <Link2 size={16} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-900 italic">Active Link</p>
                </div>
              </div>

              {disciples.map(d => (
                <div key={d.id} className="relative flex items-center gap-3">
                  <div className="absolute -left-4 w-4 h-px bg-slate-100" />
                  <div className="p-2 bg-slate-50 text-slate-400 rounded-xl">
                    <User size={16} />
                  </div>
                  <div className="text-left">
                    <p className="text-[11px] font-bold text-slate-600 uppercase tracking-tight">{d.name}</p>
                    <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest italic">Seeker</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 4. Parampara Section (Sacred Heritage) */}
        <section className="space-y-4">
          <button 
            onClick={() => toggle('parampara')}
            className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors"
          >
            {expanded.parampara ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
            Institutional Heritage
          </button>

          {expanded.parampara && (
            <div className="flex flex-col items-center gap-4 py-4">
              {parampara.map((p, i) => (
                <React.Fragment key={i}>
                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl min-w-40 text-center shadow-sm hover:shadow-md transition-all">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1 italic">Link {p.level}</p>
                    <p className="text-sm font-serif font-bold text-slate-900 italic">{p.guru}</p>
                  </div>
                  {i < parampara.length - 1 && (
                    <div className="w-px h-6 bg-slate-100" />
                  )}
                </React.Fragment>
              ))}
              <div className="w-px h-6 bg-indigo-200" />
              <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl min-w-40 text-center shadow-md">
                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em] mb-1 italic">Seeker</p>
                <p className="text-sm font-serif font-bold text-indigo-900 italic">You</p>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Decorative Aura */}
      <div className="absolute -top-12 -right-12 size-48 bg-indigo-500/5 rounded-full blur-3xl" />
    </div>
  )
}
