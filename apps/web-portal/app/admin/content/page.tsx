'use client'

import React from 'react'
import { 
  BookPlus, 
  Search, 
  Filter, 
  MoreVertical, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle,
  Database
} from 'lucide-react'
import { Button } from '@/components/atoms/button'
import { Badge } from '@/components/atoms/badge'
import { cn } from '@/lib/utils'

/**
 * Admin Content Management
 * Responsibility: Manage the platform's shastric corpus and courses.
 * Purpose: Provides tools for ingestion status, content auditing, and course creation.
 */
export default function AdminContentPage() {
  const content = [
    { id: '1', title: 'Bhagavad Gītā', type: 'Shastra', nodes: 700, status: 'PUBLISHED', lastSync: '2h ago' },
    { id: '2', title: 'Rāmāyaṇa (Aranya Kanda)', type: 'Shastra', nodes: 4236, status: 'INGESTING', lastSync: 'Just now' },
    { id: '3', title: 'Gita Foundations', type: 'Course', nodes: 12, status: 'DRAFT', lastSync: '1d ago' },
  ]

  return (
    <div className="p-10 space-y-10 max-w-7xl mx-auto animate-fade-in">
      <header className="flex items-end justify-between border-b border-slate-200 pb-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <Database className="w-5 h-5" />
             </div>
             <h1 className="text-4xl font-serif font-bold text-slate-900">Wisdom <span className="text-primary italic">Inventory</span></h1>
          </div>
          <p className="text-sm text-slate-500 italic">Manage the digital preservation of the Vedic corpus.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="h-12 rounded-xl px-6 border-slate-200">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </Button>
          <Button className="h-12 rounded-xl px-8 shadow-xl shadow-primary/20">
            <BookPlus className="w-4 h-4 mr-2" /> New Ingestion
          </Button>
        </div>
      </header>

      {/* SEARCH BAR */}
      <div className="relative group max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
        <input 
          type="text" 
          placeholder="Search by shastra, chapter, or node..." 
          className="w-full h-14 pl-12 pr-6 rounded-2xl border border-slate-200 bg-white shadow-sm outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-sm"
        />
      </div>

      {/* CONTENT TABLE */}
      <section className="bg-white rounded-[3rem] border border-slate-100 shadow-soft overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Title</th>
              <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Type</th>
              <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nodes</th>
              <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Last Sync</th>
              <th className="px-8 py-5 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {content.map((item) => (
              <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-6">
                  <div className="font-bold text-slate-900 group-hover:text-primary transition-colors">{item.title}</div>
                </td>
                <td className="px-8 py-6">
                   <Badge variant="outline" className="rounded-lg text-[9px] border-slate-100 text-slate-500 font-bold">{item.type}</Badge>
                </td>
                <td className="px-8 py-6">
                   <span className="text-sm font-bold text-slate-400">{item.nodes}</span>
                </td>
                <td className="px-8 py-6">
                   <div className="flex items-center gap-2">
                      {item.status === 'PUBLISHED' && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                      {item.status === 'INGESTING' && <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />}
                      {item.status === 'DRAFT' && <AlertCircle className="w-4 h-4 text-slate-300" />}
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-widest",
                        item.status === 'PUBLISHED' ? "text-green-600" : (item.status === 'INGESTING' ? "text-blue-600" : "text-slate-400")
                      )}>
                        {item.status}
                      </span>
                   </div>
                </td>
                <td className="px-8 py-6">
                   <span className="text-xs text-slate-400 italic">{item.lastSync}</span>
                </td>
                <td className="px-8 py-6 text-right">
                   <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-white rounded-xl shadow-sm border border-slate-100 text-slate-400 hover:text-primary transition-all">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-white rounded-xl shadow-sm border border-slate-100 text-slate-400">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <footer className="p-8 bg-slate-50/50 border-t border-slate-50 flex items-center justify-center">
           <Button variant="ghost" className="text-xs font-bold text-slate-400 uppercase tracking-widest">Load More Content</Button>
        </footer>
      </section>
    </div>
  )
}
