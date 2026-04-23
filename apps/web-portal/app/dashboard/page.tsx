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
  const userName = "Arjuna" // Mock data

  return (
    <div className="min-h-screen bg-[#F8F7F4] flex">
      <DashboardSidebar />
      
      <main className="flex-1 p-12 max-w-7xl mx-auto space-y-16">
        {/* Welcome Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
              <Sun className="w-4 h-4" /> Today is 23 April, 2026
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 tracking-tight">
              Welcome back, <span className="text-primary italic">{userName}</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4 p-4 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Daily Sankalpa</div>
              <div className="text-sm font-bold text-slate-900">12 Day Streak</div>
            </div>
          </div>
        </header>

        {/* Continue Learning Section */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">Continue Learning</h2>
            <Button variant="ghost" className="text-xs font-bold text-primary uppercase tracking-widest">View All My Courses</Button>
          </div>
          <div className="max-w-xl">
            <CourseCardProgress 
              title="Bhagavad Gita Foundations"
              progress={20}
              lastLesson="Context of the Kurukshetra"
              href="/courses/gita-101"
            />
          </div>
        </section>

        <div className="grid lg:grid-cols-[1fr_400px] gap-12">
          {/* Recommended Section */}
          <section className="space-y-8">
            <h2 className="text-2xl font-bold text-slate-900">Recommended for You</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <WisdomCard 
                id="w1"
                title="The Art of Detachment"
                type="Lesson"
                duration="5 min"
                level="Beginner"
                tags={['Karma', 'Peace']}
                href="/library/bg/read"
              />
              <WisdomCard 
                id="w2"
                title="Bhakti: The Yoga of Love"
                type="Article"
                duration="8 min"
                level="Intermediate"
                tags={['Devotion', 'Bhakti']}
                href="/blog/bhakti-yoga"
              />
            </div>
          </section>

          {/* Daily Reflection Section */}
          <section className="space-y-8">
            <h2 className="text-2xl font-bold text-slate-900">Daily Reflection</h2>
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-soft space-y-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform">
                <PenTool className="w-24 h-24" />
              </div>
              
              <div className="flex items-center gap-3 text-primary mb-4 relative z-10">
                <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm uppercase tracking-widest">Today's Realization</h3>
              </div>
              
              <textarea 
                className="w-full min-h-[160px] p-6 text-sm rounded-2xl border border-slate-50 bg-slate-50 focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all placeholder:italic relative z-10"
                placeholder="What did you learn about your Dharma today?"
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
              />
              
              <Button className="w-full h-14 rounded-2xl bg-slate-900 text-white font-bold relative z-10">
                Save Reflection
              </Button>

              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest pt-4 relative z-10">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Notes are encrypted & private</span>
              </div>
            </div>
          </section>
        </div>

      </main>
    </div>
  )
}
