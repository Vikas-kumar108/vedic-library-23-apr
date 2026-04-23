'use client'

import React, { useState } from 'react'
import { 
  Bookmark, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown,
  Highlighter,
  MessageSquare,
  BookOpen,
  Sun,
  PenTool
} from 'lucide-react'
import { Button, StandardPage, Breadcrumb } from '@/components/index'
import { cn } from '@/lib/utils'

/**
 * Deep Reading Experience Page
 * Responsibility: Provide a distraction-free environment for shastra study.
 * Purpose: Centered on the sacred text, with tools for reflection.
 */
export default function ReadingExperiencePage() {
  const [showPurport, setShowPurport] = useState(true)
  const [activeChapter, setActiveChapter] = useState(2)
  const [reflection, setReflection] = useState('')

  const chapters = [
    { id: 1, title: 'Observing the Armies' },
    { id: 2, title: 'Contents of the Gita Summarized', active: true },
    { id: 3, title: 'Karma Yoga' },
    { id: 4, title: 'Transcendental Knowledge' },
    { id: 5, title: 'Karma-yoga—Action in Kṛṣṇa Consciousness' },
  ]

  return (
    <div className="min-h-screen bg-[#F8F7F4] flex flex-col">
      {/* Top Sticky Controls */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/library" className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
              <ChevronLeft className="w-5 h-5 text-slate-400" />
            </Link>
            <div className="h-6 w-px bg-slate-200" />
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-all border border-slate-100">
              <span className="text-sm font-bold text-slate-900">Chapter {activeChapter}</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>
          </div>

          <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl">
            <button 
              onClick={() => setShowPurport(false)}
              className={cn("px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-xl transition-all", !showPurport ? "bg-white text-primary shadow-sm" : "text-slate-400")}
            >
              Verse Only
            </button>
            <button 
              onClick={() => setShowPurport(true)}
              className={cn("px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-xl transition-all", showPurport ? "bg-white text-primary shadow-sm" : "text-slate-400")}
            >
              Full Purport
            </button>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-primary/5 text-slate-400 hover:text-primary transition-all">
              <Bookmark className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-primary/5 text-slate-400 hover:text-primary transition-all">
              <Highlighter className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 container mx-auto px-4 grid lg:grid-cols-[280px_1fr_320px] gap-8 py-12">
        
        {/* Left Sidebar: Chapters */}
        <aside className="hidden lg:block">
          <div className="sticky top-32 space-y-8">
            <div className="flex items-center gap-2 text-primary">
              <BookOpen className="w-5 h-5" />
              <h3 className="font-bold text-sm uppercase tracking-widest">Chapters</h3>
            </div>
            <nav className="space-y-1">
              {chapters.map((ch) => (
                <button 
                  key={ch.id}
                  onClick={() => setActiveChapter(ch.id)}
                  className={cn(
                    "w-full text-left px-4 py-4 rounded-2xl text-sm transition-all flex items-start gap-3",
                    activeChapter === ch.id ? "bg-primary text-white shadow-lg shadow-primary/20 font-bold" : "text-slate-500 hover:bg-white hover:shadow-sm"
                  )}
                >
                  <span className={cn("opacity-50", activeChapter === ch.id && "opacity-100")}>{ch.id}</span>
                  <span className="leading-tight">{ch.title}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Center: Main Reading Experience */}
        <main className="max-w-3xl mx-auto w-full space-y-16">
          <div className="space-y-12">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-700 text-[10px] font-bold uppercase tracking-widest rounded-full">
                <Sun className="w-3 h-3" /> Bhagavad Gita 2.47
              </div>
              <p className="text-3xl md:text-5xl font-serif text-slate-900 leading-snug animate-fade-in text-center px-4">
                कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।<br />
                मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥ ४७ ॥
              </p>
            </div>

            <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-soft space-y-8">
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2">Translation</h4>
                <p className="text-xl md:text-2xl text-slate-800 leading-relaxed font-serif italic">
                  "You have a right to perform your prescribed duty, but you are not entitled to the fruits of action. Never consider yourself the cause of the results of your activities, and never be attached to not doing your duty."
                </p>
              </div>

              {showPurport && (
                <div className="space-y-4 animate-fade-in pt-8 border-t border-slate-50">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest pb-2">Purport</h4>
                  <div className="text-lg text-slate-600 leading-relaxed space-y-6">
                    <p>There are three considerations here: prescribed duties, capricious work, and inaction. Prescribed duties are activities enjoined according to one's conditioned qualities. Capricious work means actions without the sanction of authority, and inaction means not performing one's prescribed duties.</p>
                    <p>The Lord advised that Arjuna not be inactive, but that he perform his prescribed duty without being attached to the result. One who is attached to the result of his work is also the cause of the action. Thus he is the enjoyer or sufferer of the fruits of such actions.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Controls */}
          <footer className="flex items-center justify-between pt-12 border-t border-slate-200">
            <Button variant="outline" size="lg" className="h-16 px-10 rounded-2xl group">
              <ChevronLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" /> 2.46
            </Button>
            <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Progress: 24/72</div>
            <Button variant="primary" size="lg" className="h-16 px-10 rounded-2xl group shadow-xl shadow-primary/20">
              2.48 <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </footer>
        </main>

        {/* Right Sidebar: Personal Workspace */}
        <aside className="hidden lg:block">
          <div className="sticky top-32 space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-soft space-y-6">
              <div className="flex items-center gap-3 text-primary">
                <PenTool className="w-5 h-5" />
                <h3 className="font-bold text-sm uppercase tracking-widest">Your Notes</h3>
              </div>
              <textarea 
                className="w-full min-h-[160px] p-4 text-sm rounded-2xl border border-slate-50 bg-slate-50 focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all placeholder:italic"
                placeholder="What realization stirrred in your heart?"
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
              />
              <Button className="w-full h-12 rounded-xl bg-slate-900 text-white font-bold">Save Insight</Button>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-soft space-y-6">
              <div className="flex items-center gap-3 text-orange-500">
                <Highlighter className="w-5 h-5" />
                <h3 className="font-bold text-sm uppercase tracking-widest">Highlights</h3>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-orange-50/50 rounded-xl border-l-4 border-orange-400">
                  <p className="text-xs text-slate-600 leading-relaxed italic line-clamp-2">"...not entitled to the fruits of action."</p>
                </div>
                <Button variant="ghost" className="w-full text-xs text-slate-400 hover:text-primary">View All Highlights</Button>
              </div>
            </div>
          </div>
        </aside>

      </div>
    </div>
  )
}

import Link from 'next/link'
