'use client'

import React, { useState } from 'react'
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  BookOpen, 
  MessageSquare, 
  PenTool, 
  Sparkles,
  Bookmark,
  Share2,
  Highlighter,
  Link as LinkIcon,
  Eye,
  EyeOff
} from 'lucide-react'
import { Button, DashboardSidebar } from '@/components'
import { cn } from '@/lib/utils'

/**
 * Library Study Experience (Deep Read)
 * Responsibility: Provide a meditative, scholarly environment for shastra study.
 * Purpose: Transform content consumption into wisdom realization.
 */
export default function LibraryStudyPage() {
  const [activeModes, setActiveModes] = useState(['sanskrit', 'translation', 'purport'])
  const [isStudyMode, setIsStudyMode] = useState(false)
  const [reflection, setReflection] = useState('')

  const toggleMode = (mode: string) => {
    setActiveModes(prev => 
      prev.includes(mode) ? prev.filter(m => m !== mode) : [...prev, mode]
    )
  }

  const verseData = {
    id: "bg-2-47",
    title: "Bhagavad Gītā — Chapter 2, Verse 47",
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥ ४७ ॥",
    translation: "You have a right to perform your prescribed duty, but you are not entitled to the fruits of action. Never consider yourself the cause of the results of your activities, and never be attached to not doing your duty.",
    purport: "There are three considerations here: prescribed duties, capricious work, and inaction. Prescribed duties are activities enjoined according to one's conditioned qualities. Capricious work means actions without the sanction of authority, and inaction means not performing one's prescribed duties...",
    insights: ["Detached action leads to freedom.", "Anxiety stems from attachment to results."],
    prompt: "Where in my current life am I overly attached to results?"
  }

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-1000",
      isStudyMode ? "bg-[#FDFCFB]" : "bg-[#F8F7F4]"
    )}>
      <div className="flex h-screen overflow-hidden">
        
        {/* 1. LEFT NAV (SCHOLARLY STRUCTURE) - w-64 */}
        {!isStudyMode && (
          <aside className="w-64 border-r border-slate-100 bg-white flex flex-col animate-in slide-in-from-left duration-500 overflow-hidden">
            <div className="p-6 border-b border-slate-50 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-[10px] uppercase tracking-[0.2em] text-slate-400">Structural Nav</h2>
                <div className="flex gap-2">
                  <button className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400"><Search className="w-3.5 h-3.5" /></button>
                  <button className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400"><Bookmark className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              
              {/* Quick Jump Verse Selector */}
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  placeholder="Jump to (e.g. 2.47)" 
                  className="flex-1 h-9 px-3 text-[11px] rounded-lg border border-slate-100 bg-slate-50 focus:ring-2 focus:ring-primary/10 outline-none transition-all font-bold"
                />
                <Button size="icon" className="h-9 w-9 rounded-lg bg-slate-900"><ChevronRight className="w-4 h-4" /></Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-8 scrollbar-thin">
              {/* Recently Viewed (Scholar Context) */}
              <div className="space-y-3">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-2">Recently Studied</h3>
                <div className="space-y-1">
                  {['BG 2.45', 'BG 3.19', 'SB 1.1.1'].map(r => (
                    <button key={r} className="w-full text-left px-2 py-1.5 text-[11px] text-slate-500 hover:text-primary transition-colors flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-slate-200" /> {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hierarchy Tree */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary font-bold px-2">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-sm font-serif italic">Bhagavad Gītā</span>
                </div>
                
                <div className="space-y-1">
                  {/* Canto/Volume Level (if applicable) */}
                  <div className="px-2 py-2 flex items-center justify-between group cursor-pointer hover:bg-slate-50 rounded-xl">
                    <span className="text-xs font-bold text-slate-600">Chapter 2: Summary</span>
                    <ChevronDown className="w-3 h-3 text-slate-300 group-hover:text-primary" />
                  </div>
                  
                  {/* Verse Level (Dense Scholarly Grid) */}
                  <div className="grid grid-cols-4 gap-1 p-2 bg-slate-50/50 rounded-2xl">
                    {[45, 46, 47, 48, 49, 50, 51, 52].map(v => (
                      <button key={v} className={cn(
                        "h-8 flex items-center justify-center rounded-lg text-[10px] font-bold transition-all border border-transparent",
                        v === 47 ? "bg-primary text-white shadow-md" : "text-slate-400 hover:bg-white hover:border-slate-100 hover:text-slate-900"
                      )}>
                        {v}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Other Shastras */}
              <div className="space-y-2 pt-4 border-t border-slate-50">
                {['Śrīmad Bhāgavatam', 'Īśopaniṣad'].map(s => (
                  <div key={s} className="px-2 py-2 flex items-center justify-between text-slate-400 hover:text-slate-600 cursor-pointer text-xs font-medium">
                    {s} <ChevronRight className="w-3 h-3" />
                  </div>
                ))}
              </div>
            </div>
          </aside>
        )}

        {/* 2. CENTER: READING EXPERIENCE - max-w-3xl */}
        <main className="flex-1 overflow-y-auto relative scroll-smooth bg-white/30 backdrop-blur-sm">
          {/* CONTENT HEADER */}
          <header className="sticky top-0 z-30 px-10 py-6 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-lg font-bold text-slate-900 font-serif leading-tight">
                {verseData.title}
              </h1>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Source: Krishna-Dvaipayana Vyasa
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsStudyMode(!isStudyMode)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
                  isStudyMode ? "bg-slate-900 text-white" : "bg-white border border-slate-100 text-slate-400 hover:text-primary"
                )}
              >
                {isStudyMode ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                Study Mode {isStudyMode ? 'ON' : 'OFF'}
              </button>
            </div>
          </header>

          <div className={cn(
            "mx-auto px-10 py-20 space-y-16 transition-all duration-700",
            isStudyMode ? "max-w-4xl" : "max-w-3xl"
          )}>
            
            {/* MODE SWITCHER */}
            {!isStudyMode && (
              <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl w-fit mx-auto mb-16 shadow-inner">
                {['sanskrit', 'translation', 'purport'].map(mode => (
                  <button
                    key={mode}
                    onClick={() => toggleMode(mode)}
                    className={cn(
                      "px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
                      activeModes.includes(mode) ? "bg-white text-primary shadow-sm scale-105" : "text-slate-400 hover:text-slate-600"
                    )}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            )}

            {/* READING BODY */}
            <div className="space-y-20">
              {activeModes.includes('sanskrit') && (
                <div className="text-center space-y-6 group animate-fade-in">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex justify-center gap-4 mb-4">
                    <button className="p-2 bg-yellow-100 rounded-full"><Highlighter className="w-3 h-3 text-yellow-600" /></button>
                    <button className="p-2 bg-blue-100 rounded-full"><Highlighter className="w-3 h-3 text-blue-600" /></button>
                  </div>
                  <p className="text-3xl md:text-5xl font-serif text-slate-900 leading-snug tracking-wide italic">
                    {verseData.sanskrit.split('\n').map((line, i) => (
                      <span key={i} className="block">{line}</span>
                    ))}
                  </p>
                </div>
              )}

              {activeModes.includes('translation') && (
                <div className="space-y-4 animate-fade-in">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2">Translation</h4>
                  <p className="text-xl md:text-2xl text-slate-800 leading-relaxed font-serif italic max-w-[65ch] mx-auto text-center">
                    "{verseData.translation}"
                  </p>
                </div>
              )}

              {activeModes.includes('purport') && (
                <div className="space-y-6 animate-fade-in pt-12 border-t border-slate-50">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Purport</h4>
                  <div className="text-lg md:text-xl text-slate-600 leading-[2.2rem] font-sans max-w-[65ch] mx-auto space-y-8">
                    <p>There are three considerations here: prescribed duties, capricious work, and inaction. Prescribed duties are activities enjoined according to one's conditioned qualities. Capricious work means actions without the sanction of authority, and inaction means not performing one's prescribed duties...</p>
                    <p>The Lord advised that Arjuna not be inactive, but that he perform his prescribed duty without being attached to the result. One who is attached to the result of his work is also the cause of the action. Thus he is the enjoyer or sufferer of the fruits of such actions.</p>
                  </div>
                </div>
              )}

              {/* STUDY MODE EXTRAS */}
              {isStudyMode && (
                <div className="mt-20 pt-20 border-t border-slate-100 grid md:grid-cols-2 gap-12 animate-in fade-in zoom-in duration-1000">
                  <div className="space-y-6">
                    <h5 className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                      <Sparkles className="w-4 h-4" /> Key Insights
                    </h5>
                    <ul className="space-y-4">
                      {verseData.insights.map((ins, i) => (
                        <li key={i} className="p-4 bg-primary/5 rounded-2xl border-l-4 border-primary text-slate-900 font-bold italic">
                          "{ins}"
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-6">
                    <h5 className="flex items-center gap-2 text-orange-500 font-bold text-xs uppercase tracking-widest">
                      <PenTool className="w-4 h-4" /> Reflection Prompt
                    </h5>
                    <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                      <p className="text-orange-900 font-serif italic mb-4">"{verseData.prompt}"</p>
                      <textarea 
                        className="w-full h-32 p-4 rounded-xl border border-orange-200 bg-white/50 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all placeholder:italic text-sm"
                        placeholder="Write your realization here..."
                        value={reflection}
                        onChange={(e) => setReflection(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* CONTINUITY NAVIGATION */}
            <div className="sticky bottom-10 left-0 right-0 py-8 flex items-center justify-between bg-[#F8F7F4]/80 backdrop-blur-md rounded-[2.5rem] px-8 border border-slate-100 shadow-2xl animate-in slide-in-from-bottom-10">
              <button className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-primary transition-all">
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </div>
                <div className="text-left hidden md:block">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Previous</div>
                  <div className="text-sm font-bold text-slate-900">Verse 2.46</div>
                </div>
              </button>

              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Studying Gita 2.47</span>
              </div>

              <button className="flex items-center gap-4 group">
                <div className="text-right hidden md:block">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Next</div>
                  <div className="text-sm font-bold text-slate-900">Verse 2.48</div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-primary transition-all">
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>
          </div>
        </main>

        {/* 3. RIGHT PANEL (STUDY INTELLIGENCE) - w-80 */}
        {!isStudyMode && (
          <aside className="w-80 border-l border-slate-100 bg-white flex flex-col p-8 space-y-10 animate-in slide-in-from-right duration-500">
            {/* NOTES PANEL */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-widest">
                  <PenTool className="w-4 h-4 text-primary" /> Your Notes
                </h3>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Synced</span>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 cursor-pointer hover:border-primary/20 transition-all">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Highlight at 2.47</p>
                  <p className="text-xs text-slate-600 leading-relaxed italic line-clamp-2">"You have a right to perform your prescribed duty..."</p>
                  <div className="text-[10px] text-primary font-bold">Read Note →</div>
                </div>
                <Button variant="outline" className="w-full h-12 rounded-xl border-slate-100 text-xs text-slate-400 hover:text-primary">
                  + Create New Note
                </Button>
              </div>
            </div>

            {/* CROSS REFERENCES */}
            <div className="space-y-6">
              <h3 className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-widest">
                <LinkIcon className="w-4 h-4 text-primary" /> Related Wisdom
              </h3>
              <div className="space-y-3">
                {[
                  { title: 'Bhagavad Gītā 3.19', type: 'Shastra' },
                  { title: 'The Science of Duty', type: 'Lecture' },
                  { title: 'Karma vs Akarma', type: 'Article' }
                ].map((ref, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-slate-200 group-hover:bg-primary transition-colors" />
                      <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">{ref.title}</span>
                    </div>
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-primary">{ref.type}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* DISCUSSION PREVIEW */}
            <div className="space-y-6 pt-6 border-t border-slate-50">
              <h3 className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-widest">
                <MessageSquare className="w-4 h-4 text-primary" /> Discuss (12)
              </h3>
              <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                <p className="text-xs text-slate-600 leading-relaxed italic mb-4">"The distinction between results and duty is the core of mental peace..."</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-slate-200 rounded-full" />
                    <span className="text-[10px] font-bold text-slate-400">Gaurav S.</span>
                  </div>
                  <span className="text-[10px] font-bold text-primary cursor-pointer hover:underline">View Thread</span>
                </div>
              </div>
            </div>
          </aside>
        )}

      </div>
    </div>
  )
}
