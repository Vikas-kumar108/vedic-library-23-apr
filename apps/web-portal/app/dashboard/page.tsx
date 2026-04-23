'use client'

import React, { useState } from 'react'
import { Sparkles, Sun, MessageSquare, PenTool, CheckCircle2 } from 'lucide-react'
import { 
  DashboardSidebar, 
  CourseCardProgress, 
  WisdomCard,
  Button
} from '@/components'
import { cn } from '@/lib/utils'

/**
 * User Dashboard Page
 * Responsibility: Command center for the logged-in seeker.
 * Purpose: Centralizes learning progress, recommendations, and reflection.
 */
export default function DashboardPage() {
  const [reflection, setReflection] = useState('')
  const userName = "Nitai" // Aligned with request

  return (
    <div className="min-h-screen bg-[#F8F7F4] flex">
      <DashboardSidebar />
      
      <main className="flex-1 max-w-7xl mx-auto flex flex-col">
        {/* Top Header (VERY CLEAN) */}
        <header className="px-10 py-6 flex items-center justify-between border-b border-slate-100 bg-white/50 backdrop-blur-md sticky top-0 z-40">
          <div className="space-y-1">
            <h1 className="text-2xl font-serif font-bold text-slate-900">
              Welcome back, <span className="text-primary italic">{userName}</span>
            </h1>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Sun className="w-3 h-3 text-orange-500" /> Shuddha Ekadashi • 23 April
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Global Search */}
            <div className="relative group hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search teachings..." 
                className="h-10 w-64 pl-11 pr-4 rounded-xl border border-slate-200 bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all text-xs"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 rounded-xl hover:bg-white border border-transparent hover:border-slate-100 flex items-center justify-center text-slate-400 relative transition-all">
                <Bell className="w-5 h-5" />
                <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-primary rounded-full border-2 border-[#F8F7F4]" />
              </button>
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-xs cursor-pointer overflow-hidden">
                <div className="w-full h-full bg-[url('https://api.dicebear.com/7.x/avataaars/svg?seed=Nitai')] bg-cover" />
              </div>
            </div>
          </div>
        </header>

        <div className="p-10 space-y-10">
          {/* Section: 3 Questions Layer */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Q1: What should I do now? (Sadhana) */}
            <div className="bg-primary rounded-[2.5rem] p-8 text-white shadow-2xl shadow-primary/20 relative overflow-hidden group hover-lift">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                <Sparkles className="w-20 h-20" />
              </div>
              <div className="relative z-10 space-y-6">
                <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Sadhana Tracker</div>
                <h3 className="text-2xl font-serif font-bold italic leading-tight">Begin your daily <br />chanting meditation</h3>
                <Button className="bg-white text-primary hover:bg-white/90 w-full h-12 rounded-xl font-bold">Start Practice</Button>
              </div>
            </div>

            {/* Q2: Where did I leave off? (Resume) */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-soft relative group hover-lift">
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Continue Learning</div>
                  <div className="text-[10px] font-bold text-primary px-2 py-1 bg-primary/5 rounded-full">25% Done</div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 leading-tight">Bhagavad Gita <br />Foundations</h3>
                <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-1/4 rounded-full" />
                </div>
                <Button variant="outline" className="w-full h-12 rounded-xl border-slate-100 hover:bg-slate-50">Resume Lesson 4</Button>
              </div>
            </div>

            {/* Q3: What is my next step? (Journey) */}
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-soft relative overflow-hidden group hover-lift">
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
              <div className="relative z-10 space-y-6">
                <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Your Path</div>
                <h3 className="text-xl font-bold leading-tight">Transitioning to <br />Householder Life</h3>
                <p className="text-xs text-slate-400 leading-relaxed">Stage 4 of 28: Harmonizing Dharma with Responsibility.</p>
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest cursor-pointer group/link">
                  View Path Map <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_400px] gap-12">
            {/* Recommended Feed */}
            <section className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">Recommended for your Stage</h2>
                <Button variant="ghost" className="text-xs font-bold text-primary">See All</Button>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <WisdomCard 
                  id="w1"
                  title="The Grihastha Manual"
                  type="Lesson"
                  duration="15 min"
                  level="Intermediate"
                  tags={['Dharma', 'Life']}
                  href="/learn/grihastha"
                />
                <WisdomCard 
                  id="w2"
                  title="Leadership in Service"
                  type="Article"
                  duration="10 min"
                  level="Advanced"
                  tags={['Leadership']}
                  href="/blog/leadership"
                />
              </div>
            </section>

            {/* Daily Reflection (Hriday-Manthan) */}
            <section className="space-y-8">
              <h2 className="text-xl font-bold text-slate-900">Hriday-Manthan</h2>
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-soft space-y-6">
                <div className="flex items-center gap-3 text-primary mb-2">
                  <MessageSquare className="w-5 h-5" />
                  <h3 className="font-bold text-xs uppercase tracking-widest">Today's Reflection</h3>
                </div>
                <textarea 
                  className="w-full min-h-[140px] p-6 text-sm rounded-2xl border border-slate-50 bg-slate-50 focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all placeholder:italic"
                  placeholder="Record your realization..."
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                />
                <Button className="w-full h-14 rounded-2xl bg-slate-900 text-white font-bold">
                  Save to Soul-Log
                </Button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

import { Search, Bell, ChevronRight } from "lucide-react"
