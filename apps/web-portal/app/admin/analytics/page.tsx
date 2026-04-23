'use client'

import React from 'react'
import { 
  Activity, 
  TrendingUp, 
  Users, 
  BookOpen, 
  Clock, 
  MapPin, 
  Calendar,
  Zap,
  BarChart3
} from 'lucide-react'
import { Button } from '@/components/atoms/button'
import { cn } from '@/lib/utils'

/**
 * Admin Analytics Page
 * Responsibility: Provide deep insights into seeker behavior and content popularity.
 * Purpose: Allows administrators to make data-driven decisions about content creation and community growth.
 */
export default function AdminAnalyticsPage() {
  const topShastras = [
    { title: 'Bhagavad Gītā', readers: '8.4K', growth: '+22%' },
    { title: 'Yoga Sūtras', readers: '3.2K', growth: '+15%' },
    { title: 'Rāmāyaṇa', readers: '2.1K', growth: '+45%' },
  ]

  return (
    <div className="p-10 space-y-10 max-w-7xl mx-auto animate-fade-in">
      <header className="flex items-end justify-between border-b border-slate-200 pb-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                <BarChart3 className="w-5 h-5" />
             </div>
             <h1 className="text-4xl font-serif font-bold text-slate-900">Platform <span className="text-primary italic">Intelligence</span></h1>
          </div>
          <p className="text-sm text-slate-500 italic">Visualize the pulse of the global Vedic community.</p>
        </div>
        <div className="flex gap-4">
           <Button variant="outline" className="h-12 rounded-xl px-6 border-slate-200">Last 30 Days</Button>
           <Button className="h-12 rounded-xl px-6 bg-slate-900 text-white hover:bg-slate-800">Generate Report</Button>
        </div>
      </header>

      {/* BEHAVIOR GRID */}
      <div className="grid lg:grid-cols-[1fr_400px] gap-10">
        <div className="space-y-10">
           {/* Main Activity Chart Placeholder */}
           <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-soft min-h-[400px] flex flex-col justify-between">
              <div className="flex items-center justify-between">
                 <h2 className="text-xl font-bold text-slate-900">Engagement Velocity</h2>
                 <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                       <div className="w-3 h-3 bg-primary rounded-full" />
                       <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Library</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <div className="w-3 h-3 bg-blue-500 rounded-full" />
                       <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Courses</span>
                    </div>
                 </div>
              </div>
              <div className="flex-1 flex items-center justify-center">
                 <div className="text-center space-y-4">
                    <Activity className="w-16 h-16 text-slate-100 mx-auto" />
                    <p className="text-slate-300 font-serif italic">Real-time engagement graph syncing...</p>
                 </div>
              </div>
           </section>

           <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-soft space-y-6">
                 <h3 className="font-bold text-xs uppercase tracking-widest text-slate-400">Top Geographies</h3>
                 <div className="space-y-4">
                    {['India', 'USA', 'UK', 'Germany'].map((loc, i) => (
                       <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                             <MapPin className="w-4 h-4 text-slate-200" />
                             <span className="text-sm font-bold text-slate-700">{loc}</span>
                          </div>
                          <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                             <div className="h-full bg-primary" style={{ width: `${100 - (i * 20)}%` }} />
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-soft space-y-6">
                 <h3 className="font-bold text-xs uppercase tracking-widest text-slate-400">Popular Study Times</h3>
                 <div className="space-y-4">
                    {['Morning (Sadhana)', 'Evening (Reflection)', 'Late Night'].map((time, i) => (
                       <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                             <Clock className="w-4 h-4 text-slate-200" />
                             <span className="text-sm font-bold text-slate-700">{time}</span>
                          </div>
                          <span className="text-xs font-bold text-primary">{45 - (i * 10)}%</span>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        {/* Popular Content Sidebar */}
        <aside className="space-y-8">
           <section className="bg-slate-900 p-10 rounded-[3rem] text-white space-y-8 shadow-2xl">
              <h3 className="text-2xl font-serif font-bold italic leading-tight">Wisdom <br/> Popularity</h3>
              <div className="space-y-6">
                 {topShastras.map((s, i) => (
                    <div key={i} className="space-y-2 group cursor-pointer">
                       <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-slate-400 group-hover:text-white transition-colors">{s.title}</span>
                          <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{s.growth}</span>
                       </div>
                       <div className="flex items-center justify-between">
                          <span className="text-xl font-bold">{s.readers}</span>
                          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Readers</span>
                       </div>
                       <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${80 - (i * 20)}%` }} />
                       </div>
                    </div>
                 ))}
              </div>
              <Button variant="outline" className="w-full h-14 rounded-2xl border-white/10 hover:bg-white/5 text-white font-bold">Full Content Audit</Button>
           </section>

           <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-soft space-y-6">
              <div className="flex items-center gap-3 text-orange-500">
                 <Zap className="w-6 h-6 fill-current" />
                 <h3 className="font-bold text-[10px] uppercase tracking-[0.2em]">Real-time Pulsar</h3>
              </div>
              <div className="space-y-4">
                 {[
                    'Seeker #1240 just finished Gita 4.18',
                    'New Practitioner from New Delhi joined',
                    'Bulk Ingestion of Ramayana completed'
                 ].map((msg, i) => (
                    <div key={i} className="flex gap-4 items-start">
                       <div className="w-1.5 h-1.5 rounded-full bg-slate-200 mt-1.5" />
                       <p className="text-xs text-slate-500 leading-relaxed italic">"{msg}"</p>
                    </div>
                 ))}
              </div>
           </section>
        </aside>
      </div>
    </div>
  )
}
