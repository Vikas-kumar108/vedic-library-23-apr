'use client'

import React, { useState } from 'react'
import { 
  Search, 
  BookOpen, 
  PlayCircle, 
  Book, 
  PenTool, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  X
} from 'lucide-react'
import { Button, Badge } from '@/components'
import { useSearch, SearchResult } from '../hooks/useSearch'
import { cn } from '@/lib/utils'

/**
 * SearchResults Component
 * Responsibility: Provide a high-end, semantic search interface that unifies the platform.
 * Purpose: Transforms a simple search query into a guided discovery of multi-format wisdom.
 */
export function SearchResults() {
  const [query, setQuery] = useState('')
  const { results, isLoading } = useSearch(query)
  const [filter, setFilter] = useState('ALL')

  const filteredResults = filter === 'ALL' 
    ? results 
    : results.filter(r => r.type === filter)

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-fade-in pb-24">
      {/* Search Command Bar */}
      <div className="relative group">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 group-focus-within:text-primary transition-colors" />
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search deep concepts (e.g. 'karma in household life')..." 
          className="w-full h-20 pl-16 pr-8 rounded-[2.5rem] border border-slate-100 bg-white shadow-2xl shadow-slate-200/50 focus:ring-8 focus:ring-primary/5 focus:border-primary outline-none transition-all text-xl font-serif italic"
        />
        {query && (
          <button 
            onClick={() => setQuery('')}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-50 rounded-full text-slate-300"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {query.length >= 3 && (
        <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
          {/* Header & Filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-50 pb-6">
            <div className="flex items-center gap-3 text-slate-400">
              <Sparkles className={cn("w-5 h-5", isLoading ? "animate-spin text-primary" : "text-primary")} />
              <span className="text-sm font-bold uppercase tracking-widest">
                {isLoading ? 'Seeking wisdom...' : `Found ${results.length} related teachings`}
              </span>
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {['ALL', 'VERSE', 'LECTURE', 'COURSE', 'NOTE'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
                    filter === f ? "bg-primary text-white shadow-md" : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                  )}
                >
                  {f === 'VERSE' ? 'Shastra' : f === 'NOTE' ? 'Personal' : f}
                </button>
              ))}
            </div>
          </div>

          {/* Results Feed */}
          <div className="space-y-6">
            {filteredResults.map((result) => (
              <div key={result.id} className="group bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-soft hover:border-primary/20 hover:shadow-xl transition-all cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors",
                      result.type === 'VERSE' ? 'bg-orange-50 text-orange-500' :
                      result.type === 'LECTURE' ? 'bg-blue-50 text-blue-500' :
                      result.type === 'COURSE' ? 'bg-primary/5 text-primary' : 'bg-slate-50 text-slate-500'
                    )}>
                      {result.type === 'VERSE' && <BookOpen className="w-6 h-6" />}
                      {result.type === 'LECTURE' && <PlayCircle className="w-6 h-6" />}
                      {result.type === 'COURSE' && <Book className="w-6 h-6" />}
                      {result.type === 'NOTE' && <PenTool className="w-6 h-6" />}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">{result.title}</h3>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                        {result.author || result.book || 'Internal Wisdom'} • {result.type}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1 bg-green-50 rounded-full text-[10px] font-bold text-green-600 uppercase tracking-widest">
                    <TrendingUp className="w-3 h-3" /> {result.relevance}% Match
                  </div>
                </div>

                <p className="text-slate-600 leading-relaxed font-serif italic line-clamp-2 mb-6">
                  "{result.snippet}"
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">
                    {result.type === 'VERSE' ? 'Scholarly Context' : 'Learning Module'}
                  </div>
                  <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                    Enter Teaching <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}

            {filteredResults.length === 0 && !isLoading && (
              <div className="text-center py-20 space-y-6">
                <Search className="w-16 h-16 text-slate-100 mx-auto" />
                <div className="space-y-2">
                  <h4 className="text-xl font-serif font-bold text-slate-400 italic">No specific wisdom matches this query...</h4>
                  <p className="text-sm text-slate-400">Try searching for broader concepts like 'Dharma', 'Peace', or 'Yoga'.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Discovery Prompt (Empty State) */}
      {!query && (
        <div className="grid md:grid-cols-2 gap-8 pt-10">
          <div className="p-10 bg-primary/5 rounded-[3rem] border border-primary/10 space-y-6">
            <h4 className="text-lg font-bold text-primary flex items-center gap-2">
              <Sparkles className="w-5 h-5" /> Guided Discovery
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed italic">"The Shastras respond to the sincerity of the seeker. Query for clarity on your current life challenges."</p>
            <div className="flex flex-wrap gap-2">
              {['Karma & Duty', 'Peace in Crisis', 'The Nature of Soul', 'Family Balance'].map(t => (
                <button 
                  key={t}
                  onClick={() => setQuery(t)}
                  className="px-4 py-2 bg-white rounded-xl text-[10px] font-bold text-slate-400 uppercase tracking-widest border border-slate-50 hover:border-primary/20 hover:text-primary transition-all"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="bg-slate-900 p-10 rounded-[3rem] text-white space-y-6 shadow-2xl relative overflow-hidden group">
             <div className="relative z-10 space-y-4">
               <h4 className="text-lg font-bold">Search Tip</h4>
               <p className="text-xs text-slate-400 leading-relaxed">Our semantic engine searches beyond keywords. Try asking complex questions about your specific life stage.</p>
             </div>
             <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
          </div>
        </div>
      )}

    </div>
  )
}
