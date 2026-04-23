'use client'

import React from 'react'
import { 
  Users, 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  Plus, 
  BarChart3, 
  ShieldCheck, 
  MessageSquare,
  ArrowUpRight,
  MoreVertical,
  Layout,
  PlusCircle
} from 'lucide-react'
import { Button, Badge } from '@/components'
import { useCreatorStats } from '../hooks/useCreatorStats'
import { cn } from '@/lib/utils'

/**
 * CreatorDashboard Component
 * Responsibility: Provide a powerful 'Control Tower' for mentors to manage teachings and seekers.
 * Purpose: Empowers teachers to scale their vision and track the spiritual evolution of their students.
 */
export function CreatorDashboard() {
  const { stats, courses, isLoading } = useCreatorStats()

  if (isLoading || !stats) return null

  return (
    <div className="space-y-12 animate-fade-in pb-24">
      {/* Teacher Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-slate-100">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" /> Mentor Portal
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
            Creator <span className="text-primary italic">Dashboard</span>
          </h1>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="rounded-xl border-slate-200 text-xs font-bold uppercase tracking-widest">
            <BarChart3 className="w-4 h-4 mr-2" /> Detailed Analytics
          </Button>
          <Button className="rounded-xl bg-slate-900 text-white text-xs font-bold uppercase tracking-widest shadow-xl shadow-slate-900/20">
            <Plus className="w-4 h-4 mr-2" /> Create New Teaching
          </Button>
        </div>
      </header>

      {/* Metrics Grid */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Total Students', value: stats.totalStudents, icon: <Users className="w-5 h-5" />, trend: '+12%' },
          { label: 'Active Seekers', value: stats.activeSeekers, icon: <TrendingUp className="w-5 h-5" />, trend: '+5%' },
          { label: 'Engagement Rate', value: `${stats.engagementRate}%`, icon: <MessageSquare className="w-5 h-5" />, trend: '+8%' },
          { label: 'Average Rating', value: stats.averageRating, icon: <ShieldCheck className="w-5 h-5" />, trend: 'Stable' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-soft space-y-4 hover-lift">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                {stat.icon}
              </div>
              <Badge variant="ghost" className="text-[10px] font-bold text-green-500 uppercase tracking-widest">
                {stat.trend}
              </Badge>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{stat.label}</div>
            </div>
          </div>
        ))}
      </section>

      <div className="grid lg:grid-cols-[1fr_400px] gap-12">
        {/* Main: Content Management */}
        <div className="space-y-10">
          <section className="bg-white rounded-[3rem] border border-slate-100 shadow-soft overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/20">
              <h3 className="font-bold text-sm uppercase tracking-widest text-slate-900">Active Teachings</h3>
              <Button variant="ghost" className="text-xs text-primary font-bold">View All →</Button>
            </div>
            <div className="divide-y divide-slate-50">
              {courses.map((course) => (
                <div key={course.id} className="p-8 flex items-center justify-between hover:bg-slate-50/50 transition-colors group">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">{course.title}</h4>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                        {course.students} Students Enrolled • <span className={cn("font-bold", course.status === 'PUBLISHED' ? 'text-green-500' : 'text-slate-300')}>{course.status}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="p-2 text-slate-300 hover:text-slate-600"><ArrowUpRight className="w-5 h-5" /></button>
                    <button className="p-2 text-slate-300 hover:text-slate-600"><MoreVertical className="w-5 h-5" /></button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Creator Tools */}
          <section className="grid md:grid-cols-2 gap-8">
            <div className="p-10 bg-slate-900 rounded-[3rem] text-white space-y-6 shadow-2xl relative overflow-hidden group cursor-pointer hover:scale-[1.02] transition-all">
              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-primary">
                  <Calendar className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-serif font-bold">Schedule Satsang</h4>
                <p className="text-xs text-slate-400 leading-relaxed">Broadcast a live wisdom transmission to your students.</p>
              </div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
            </div>
            <div className="p-10 bg-primary rounded-[3rem] text-white space-y-6 shadow-2xl shadow-primary/20 relative overflow-hidden group cursor-pointer hover:scale-[1.02] transition-all">
               <div className="relative z-10 space-y-4">
                 <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white">
                   <PlusCircle className="w-6 h-6" />
                 </div>
                 <h4 className="text-xl font-serif font-bold">Upload Shastra</h4>
                 <p className="text-xs text-white/60 leading-relaxed">Add new verses, purports, or commentaries to the library.</p>
               </div>
               <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
            </div>
          </section>
        </div>

        {/* Sidebar: Activity & Evolution Feed */}
        <aside className="space-y-10">
          <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-soft space-y-8">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b border-slate-50 pb-4">Student Evolution</h3>
            <div className="space-y-6">
              {stats.recentActivity.map((activity, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="w-1 h-12 bg-slate-50 rounded-full flex-shrink-0 overflow-hidden">
                    <div className="w-full bg-primary h-1/2 group-hover:h-full transition-all duration-700" />
                  </div>
                  <div className="space-y-1 pt-1">
                    <p className="text-xs font-bold text-slate-700 leading-relaxed">{activity.event}</p>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full text-xs text-primary font-bold">View Full Activity Log →</Button>
          </section>

          <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
              <Layout className="w-4 h-4" /> Creator Tip
            </h4>
            <p className="text-[10px] text-slate-500 leading-relaxed italic">
              "Regular live engagement increases student completion rates by up to 40%. Consider scheduling a Q&A session for your 'Gita Foundations' course."
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
