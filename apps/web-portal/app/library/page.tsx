'use client'

import React, { useState } from 'react'
import { 
  Book, 
  Search, 
  ArrowRight, 
  Library as LibraryIcon, 
  Sparkles,
  BookOpen,
  Filter,
  ChevronRight,
  History,
  Compass,
  Scroll
} from 'lucide-react'
import { Button } from '@/components/atoms/button'
import { StandardPage } from '@/components/templates/standard-page'
import { Breadcrumb } from '@/components/molecules/breadcrumb'
import Link from 'next/link'
import { cn } from '@/lib/utils'

/**
 * The Grand Library Catalog
 * Responsibility: Provide the main entry point to the entire Vedic corpus.
 * Purpose: Allows seekers to explore Srutis and Smritis with scholarly precision.
 */
export default function LibraryHomePage() {
  const [activeCategory, setActiveCategory] = useState('ALL')

  const categories = [
    { id: 'ALL', label: 'All Shastras' },
    { id: 'SRUTI', label: 'Śruti (Vedas)' },
    { id: 'SMRITI', label: 'Smṛti (Itihāsa/Purāṇa)' },
    { id: 'DARSHANA', label: 'Darśana (Philosophy)' },
  ]

  const shastras = [
    { id: 'bg', title: 'Bhagavad Gītā', type: 'Smṛti', nodes: 700, progress: 45, color: 'bg-orange-50', icon: BookOpen },
    { id: 'sb', title: 'Śrīmad Bhāgavatam', type: 'Smṛti', nodes: 18000, progress: 12, color: 'bg-blue-50', icon: Scroll },
    { id: 'up', title: 'Īśopaniṣad', type: 'Śruti', nodes: 18, progress: 100, color: 'bg-indigo-50', icon: Sparkles },
    { id: 'rm', title: 'Rāmāyaṇa', type: 'Smṛti', nodes: 24000, progress: 0, color: 'bg-red-50', icon: Compass },
  ]

  return (
    <StandardPage className="pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-7xl space-y-20">
        
        {/* 1. HERO SEARCH SECTION */}
        <header className="text-center space-y-10 max-w-4xl mx-auto">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-[1.5rem] flex items-center justify-center mx-auto text-primary animate-in zoom-in duration-700">
              <LibraryIcon className="w-8 h-8" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-serif text-slate-900 leading-tight">
              The Grand <span className="text-primary italic">Library</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed font-serif italic">
              "Exploring the eternal breath of the Divine through sacred sound."
            </p>
          </div>
          
          <div className="relative group animate-in slide-in-from-bottom duration-1000">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search verses, mantras, or commentaries across the corpus..." 
              className="w-full h-20 pl-16 pr-8 rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-slate-200/50 outline-none focus:ring-8 focus:ring-primary/5 focus:border-primary transition-all text-lg font-serif"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
               <kbd className="hidden sm:flex h-10 px-3 items-center rounded-xl bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">⌘ K</kbd>
               <Button className="h-12 px-8 rounded-xl shadow-lg shadow-primary/20">Search</Button>
            </div>
          </div>
        </header>

        {/* 2. RECENTLY READ & CURATED */}
        <section className="grid lg:grid-cols-[1fr_350px] gap-12">
          <div className="space-y-10">
            <div className="flex items-center justify-between">
               <h2 className="text-2xl font-serif font-bold text-slate-900 flex items-center gap-3">
                  <History className="w-6 h-6 text-primary" /> Pick up where you left off
               </h2>
               <button className="text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-primary transition-colors">View History</button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: 'Bhagavad Gītā 4.18', sub: 'Action in Inaction', date: '2h ago' },
                { title: 'Śrīmad Bhāgavatam 1.1.1', sub: 'The Absolute Truth', date: 'Yesterday' }
              ].map((item, i) => (
                <Link key={i} href="/library/bg/read" className="group bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-soft hover-lift flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-bold text-slate-900 group-hover:text-primary transition-colors">{item.title}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.sub}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-300 italic">{item.date}</div>
                    <ArrowRight className="w-4 h-4 text-slate-200 group-hover:text-primary transition-all mt-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <aside className="bg-slate-900 rounded-[3rem] p-10 text-white space-y-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
              <Sparkles className="w-24 h-24" />
            </div>
            <div className="space-y-4 relative z-10">
              <h3 className="text-2xl font-serif font-bold italic leading-tight">Wisdom <br/>Collections</h3>
              <p className="text-xs text-slate-400 leading-relaxed uppercase tracking-widest font-bold">Thematic Journeys</p>
            </div>
            <ul className="space-y-4 relative z-10">
              {['Leadership', 'Inner Peace', 'Dharma in Crisis'].map((t, i) => (
                <li key={i} className="flex items-center justify-between group/item cursor-pointer">
                  <span className="text-sm font-bold text-slate-300 group-hover/item:text-white transition-colors">{t}</span>
                  <ChevronRight className="w-4 h-4 text-slate-700 group-hover/item:text-primary transition-colors" />
                </li>
              ))}
            </ul>
            <Button variant="outline" className="w-full h-12 rounded-xl border-white/10 hover:bg-white/5 text-white font-bold relative z-10">Explore All</Button>
          </aside>
        </section>

        {/* 3. BROWSE CATALOG */}
        <section className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
             <div className="space-y-2">
               <h2 className="text-4xl font-serif font-bold text-slate-900">Browse the <span className="text-primary italic">Corpus</span></h2>
               <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">Srutis • Smritis • Puranas • Itihasas</p>
             </div>
             <div className="flex p-1 bg-slate-50 rounded-2xl overflow-x-auto no-scrollbar">
                {categories.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      "px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap",
                      activeCategory === cat.id ? "bg-white text-primary shadow-sm" : "text-slate-400 hover:text-slate-600"
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
             </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {shastras.map((shastra) => (
              <div key={shastra.id} className="group bg-white rounded-[3rem] border border-slate-100 shadow-soft hover-lift flex flex-col h-full overflow-hidden">
                <div className={cn("h-48 relative flex items-center justify-center transition-all duration-700 overflow-hidden", shastra.color)}>
                  <shastra.icon className="w-16 h-16 text-slate-900/5 group-hover:scale-125 transition-transform duration-1000" />
                  <div className="absolute top-6 left-6">
                    <span className="px-3 py-1 bg-white/80 backdrop-blur-md rounded-full text-[9px] font-bold text-slate-600 uppercase tracking-widest border border-white/50">{shastra.type}</span>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1 space-y-6">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-slate-900 group-hover:text-primary transition-colors">{shastra.title}</h3>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">{shastra.nodes.toLocaleString()} Nodes</div>
                  </div>
                  
                  {/* Small Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-[8px] font-bold uppercase tracking-widest text-slate-400">
                      <span>Realization Progress</span>
                      <span>{shastra.progress}%</span>
                    </div>
                    <div className="h-1 bg-slate-50 rounded-full overflow-hidden">
                      <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${shastra.progress}%` }} />
                    </div>
                  </div>

                  <Button asChild variant="ghost" className="w-full h-12 rounded-xl group/btn border border-transparent hover:border-slate-100 hover:bg-slate-50">
                    <Link href={`/library/${shastra.id}/read`} className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover/btn:text-primary">
                      Enter Text <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </StandardPage>
  )
}
