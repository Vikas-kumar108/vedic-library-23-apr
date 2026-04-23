'use client'

import React from 'react'
import { 
  BookOpen, 
  Flame, 
  Search, 
  Bell, 
  TrendingUp, 
  Calendar,
  Zap,
  ArrowRight,
  Sparkles,
  ChevronRight
} from 'lucide-react'
import { Button } from '@/components/atoms/button'
import { Badge } from '@/components/atoms/badge'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useCourses } from '@/features/courses/hooks/useCourses'
import { useSadhana } from '@/features/practice/hooks/useSadhana'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { FinancialTransparency } from '@/components/organisms/crm/financial-transparency'
import { MemberJourney } from '@/components/organisms/crm/member-journey'
import { ActivityFeed } from '@/components/organisms/crm/activity-feed'

/**
 * Integrated Dashboard
 * Responsibility: The central hub of the seeker's journey.
 * Purpose: Answers "What now?", "Where next?", and "How is my progress?".
 */
export default function DashboardPage() {
  const { user, isLoading: authLoading } = useAuth()
  const { courses, isLoading: coursesLoading } = useCourses()
  const { stats, isLoading: sadhanaLoading } = useSadhana()

  if (authLoading) return <div className="p-12 animate-pulse text-slate-400 font-serif italic text-xl">Entering the Gurukulam...</div>

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-fade-in">
      
      {/* 1. SEEKER HEADER (Identity + Sankalpa) */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-slate-100">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 tracking-tight">
              Welcome back, <span className="text-primary italic">{user?.name || 'Seeker'}</span>
            </h1>
            <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="h-10 px-6 rounded-xl border-slate-100 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
              Stage: {user?.stage || 'Sadhaka'}
            </Badge>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic flex items-center gap-2">
              <Zap className="w-3 h-3 text-primary" /> {stats?.currentStreak || 0} Day Sadhana Streak
            </div>
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
            <input 
              type="text" 
              placeholder="Search wisdom..." 
              className="h-14 pl-12 pr-6 rounded-2xl border border-slate-100 bg-white shadow-soft outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-sm w-64"
            />
          </div>
          <Button variant="outline" size="icon" className="h-14 w-14 rounded-2xl border-slate-100 relative group">
            <Bell className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
            <div className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full ring-4 ring-white" />
          </Button>
        </div>
      </header>

      <div className="grid lg:grid-cols-[1fr_400px] gap-10">
        
        {/* LEFT: THE JOURNEY (Learning + Discovery) */}
        <div className="space-y-12">
          
          {/* 2. DYNAMIC CONTENT BASED ON ROLE */}
          {user?.roles?.includes('donor') ? (
            <section className="space-y-6">
               <FinancialTransparency contributions={user.contributions || []} />
            </section>
          ) : (
            <section className="space-y-6">
               <MemberJourney member={user} />
            </section>
          )}

          {/* 3. LIVE FROM THE FIELD (Social Transparency) */}
          <section className="space-y-6">
             <ActivityFeed />
          </section>

          {/* Continue Learning (Optional for Donors) */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-[0.2em]">Resume Journey</h2>
              <Link href="/courses" className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline transition-all">View All Paths →</Link>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {courses.slice(0, 2).map((course) => (
                <div key={course.id} className="group bg-white p-8 rounded-[3rem] border border-slate-100 shadow-soft hover:shadow-2xl hover:shadow-slate-200/50 transition-all flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-primary/5 text-primary rounded-lg text-[8px] uppercase tracking-widest font-bold">
                        {course.level}
                      </Badge>
                      <span className="text-[10px] text-slate-300 font-bold">{course.progress || 0}% Complete</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 leading-snug group-hover:text-primary transition-colors">{course.title}</h3>
                    <div className="h-1 w-full bg-slate-50 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${course.progress || 0}%` }} />
                    </div>
                  </div>
                  <Button asChild variant="ghost" className="mt-8 justify-between h-12 rounded-xl text-primary font-bold">
                    <Link href={`/courses/${course.id}`}>
                      Continue <ChevronRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </section>

          {/* Recommended Readings (Semantic Guidance) */}
          <section className="space-y-6">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-[0.2em]">Recommended Wisdom</h2>
            <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden group">
              <div className="relative z-10 space-y-8">
                <div className="space-y-2">
                  <div className="text-primary font-bold text-[10px] uppercase tracking-widest flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" /> Based on your Stage: {user?.stage || 'Sadhaka'}
                  </div>
                  <h3 className="text-3xl font-serif font-bold italic leading-tight max-w-lg">
                    Balance & Duty: Navigating the Grihastha Life
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed max-w-md italic">
                    A collection of verses from Bhagavad Gītā Chapter 3, specifically curated for your current life path.
                  </p>
                </div>
                <Button className="h-14 px-8 rounded-2xl bg-white text-slate-900 font-bold shadow-xl shadow-white/10 group/btn">
                  Open Collection <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Button>
              </div>
              <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform">
                <BookOpen className="w-48 h-48" />
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT: THE PRACTICE (Sadhana + Community) */}
        <aside className="space-y-10">
          
          {/* Daily Sadhana Tracker (Simplified for Dashboard) */}
          <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-soft space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Today's Vow</h2>
              <Flame className="w-5 h-5 text-orange-500 fill-current animate-pulse" />
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">Japa Meditation</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">16 Rounds Scheduled</div>
                  </div>
                </div>
                <div className="text-slate-200 group-hover:text-primary transition-all"><ChevronRight className="w-5 h-5" /></div>
              </div>

              <div className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">Shastra Study</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">30 Mins Scheduled</div>
                  </div>
                </div>
                <div className="text-slate-200 group-hover:text-orange-500 transition-all"><ChevronRight className="w-5 h-5" /></div>
              </div>
            </div>

            <Button asChild variant="outline" className="w-full h-12 rounded-xl border-slate-100 text-xs font-bold uppercase tracking-widest hover:border-primary/20 hover:text-primary transition-all">
              <Link href="/practice">Open Tracker</Link>
            </Button>
          </section>

          {/* Upcoming Sangha Sessions */}
          <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-soft space-y-6">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" /> Live Sessions
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-50 hover:border-primary/20 transition-all cursor-pointer group">
                <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Today, 6 PM</div>
                <div className="text-xs font-bold text-slate-900 group-hover:text-primary transition-colors">Gita Satsang: Karma & Duty</div>
                <div className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mt-1">with Dr. Keshav Dev</div>
              </div>
            </div>
            <Button asChild variant="ghost" className="w-full text-xs text-primary font-bold">
               <Link href="/guidance">View Calendar →</Link>
            </Button>
          </section>

        </aside>
      </div>
    </div>
  )
}
