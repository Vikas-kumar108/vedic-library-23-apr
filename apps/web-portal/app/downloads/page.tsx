'use client'

import React from 'react'
import { 
  BookOpen, 
  Download, 
  Search, 
  Filter, 
  ArrowRight,
  ShieldCheck,
  Star,
  FileText
} from 'lucide-react'
import { Button } from '@/components/atoms/button'
import { Badge } from '@/components/atoms/badge'
import { cn } from '@/lib/utils'

/**
 * Seeker's Download Center (Frontend)
 * Responsibility: Provide a premium experience for browsing and downloading spiritual content.
 */

const CATEGORIES = ['All', 'Books', 'Booklets', 'Articles', 'Guides']

const LIBRARY = [
  { id: '1', title: 'Bhagavad Gita Simplified', author: 'Vedic Library', type: 'Book', size: '2.4 MB', premium: false },
  { id: '2', title: 'Sadhana Guide for Beginners', author: 'Outreach Team', type: 'Booklet', size: '1.2 MB', premium: true },
  { id: '3', title: 'The Science of Self-Realization', author: 'Srila Prabhupada', type: 'Book', size: '4.8 MB', premium: false },
  { id: '4', title: 'Daily Prayer Booklet', author: 'Dharma Foundation', type: 'Booklet', size: '0.8 MB', premium: false },
  { id: '5', title: 'Institutional Governance 101', author: 'Admin Team', type: 'Article', size: '0.5 MB', premium: true },
]

export default function DownloadCenter() {
  return (
    <div className="min-h-screen bg-slate-50 p-10 space-y-12 animate-in fade-in duration-1000">
      
      {/* Search & Intro */}
      <header className="max-w-6xl mx-auto space-y-8 text-center pt-10">
         <div className="space-y-4">
            <h1 className="text-6xl font-serif font-bold text-slate-900 tracking-tight italic">Wisdom <span className="text-blue-600">Vault.</span></h1>
            <p className="text-slate-400 text-lg font-bold uppercase tracking-[0.2em] italic max-w-2xl mx-auto">Access the eternal library of booklets, guides, and articles to support your spiritual journey.</p>
         </div>

         <div className="max-w-3xl mx-auto relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-hover:text-blue-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search for a book, guide, or article..." 
              className="w-full h-20 pl-16 pr-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-xl text-lg outline-none focus:border-blue-400 transition-all placeholder:text-slate-200"
            />
         </div>

         <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map((cat, i) => (
               <button key={i} className={cn(
                 "px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                 i === 0 ? "bg-slate-900 text-white" : "bg-white text-slate-400 border border-slate-100 hover:bg-blue-50 hover:text-blue-600"
               )}>
                  {cat}
               </button>
            ))}
         </div>
      </header>

      {/* Library Grid */}
      <main className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
         {LIBRARY.map((book) => (
            <div key={book.id} className="group p-10 bg-white border border-slate-100 rounded-[3rem] shadow-sm hover:shadow-2xl hover:border-blue-100 transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden">
               
               <div className="space-y-6 relative z-10">
                  <div className="flex justify-between items-start">
                     <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
                        {book.type === 'Book' ? <BookOpen className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
                     </div>
                     {book.premium && (
                        <Badge className="bg-orange-50 text-orange-600 border-orange-100 text-[8px] font-black tracking-widest px-3 py-1">
                           <Star className="w-3 h-3 mr-1 fill-orange-500" /> PREMIUM
                        </Badge>
                     )}
                  </div>

                  <div className="space-y-2">
                     <h3 className="text-2xl font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">{book.title}</h3>
                     <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">{book.author}</p>
                  </div>

                  <div className="pt-6 border-t border-slate-50 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                     <span>{book.type}</span>
                     <span className="flex items-center gap-2 italic">
                        <Download className="w-3 h-3" /> {book.size}
                     </span>
                  </div>

                  <Button className="w-full h-14 rounded-2xl bg-slate-50 text-slate-900 font-black text-xs uppercase tracking-widest group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                     {book.premium ? 'Unlock Wisdom' : 'Download Now'} <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
               </div>

               {/* Background Decorative Element */}
               <BookOpen className="absolute -bottom-10 -right-10 w-48 h-48 opacity-5 text-slate-900 group-hover:scale-110 transition-transform duration-1000" />
            </div>
         ))}
      </main>

      {/* Integrity Badge */}
      <footer className="max-w-6xl mx-auto text-center py-20 space-y-4">
         <div className="flex justify-center items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-blue-500" />
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.3em]">Institutional Integrity & Wisdom Verified</p>
         </div>
         <p className="text-[10px] text-slate-300 italic tracking-widest">&copy; 2026 VEDIC LIBRARY GLOBAL REPOSITORY</p>
      </footer>

    </div>
  )
}
