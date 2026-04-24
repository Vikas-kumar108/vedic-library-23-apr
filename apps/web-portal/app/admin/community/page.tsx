'use client'

import React, { useState, useEffect } from 'react'
import { 
  HeartHandshake, 
  Flame, 
  GraduationCap, 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Award,
  CircleDot,
  CheckCircle2,
  Calendar,
  Search
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAcademy } from '@/hooks/use-academy'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function SeekerAcademyPage() {
  const { pulse, loading, error, fetchPulse } = useAcademy()
  const orgId = '75d867c4-f25b-419b-9a84-0a373b5c1c8a' // Mock Org

  useEffect(() => {
    fetchPulse(orgId)
  }, [fetchPulse])

  if (error) {
    toast.error('Failed to manifest community pulse: ' + error)
  }

  return (
    <div className="min-h-screen bg-slate-950 p-8 space-y-10 animate-in fade-in duration-1000">
      
      {/* Academy Header */}
      <header className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 bg-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/20">
                <GraduationCap className="w-6 h-6 text-white" />
             </div>
             <h1 className="text-3xl font-serif font-bold italic text-slate-100">Seeker's <span className="text-violet-400">Academy</span></h1>
          </div>
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.4em] ml-1">Spiritual Progress & Community • Pillar IV</p>
        </div>
        <div className="flex gap-4">
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input className="bg-slate-900 border border-slate-800 rounded-full pl-10 pr-6 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-violet-500/50 transition-all w-64" placeholder="Search Seeker Profile..." />
           </div>
           <Button className="bg-violet-600 hover:bg-violet-500 text-white rounded-full px-6">
              Launch New Circle
           </Button>
        </div>
      </header>

      {/* Community Pulse: The Heatmap of Wisdom */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left: Engagement Stats */}
        <div className="lg:col-span-1 space-y-6">
           <Card className="bg-slate-900/40 border-slate-800 rounded-[2.5rem] p-8 space-y-8">
              <div className="space-y-1">
                 <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest">Active Vows</h3>
                 <p className="text-4xl font-serif font-bold italic text-slate-100">{pulse?.vowStats?.ACTIVE || 0}</p>
              </div>
              <div className="space-y-4">
                 <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-500 italic">Vow Continuity</span>
                    <span className="text-emerald-400">92%</span>
                 </div>
                 <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: '92%' }} />
                 </div>
              </div>
              <div className="pt-4 grid grid-cols-2 gap-4">
                 <div className="p-4 bg-white/5 rounded-2xl text-center">
                    <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Circles</p>
                    <p className="text-xl font-bold text-slate-300">{pulse?.circles?.length || 0}</p>
                 </div>
                 <div className="p-4 bg-white/5 rounded-2xl text-center">
                    <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Realizations</p>
                    <p className="text-xl font-bold text-slate-300">142</p>
                 </div>
              </div>
           </Card>

           <Card className="bg-slate-900/40 border-slate-800 rounded-[2.5rem] p-8">
              <div className="flex items-center gap-3 text-amber-400 mb-6">
                 <Flame className="w-5 h-5 animate-pulse" />
                 <span className="text-xs font-black uppercase tracking-widest">Wisdom Streak</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed italic">
                "The Brahmachari circle has maintained a daily Gita realization streak for 12 days."
              </p>
           </Card>
        </div>

        {/* Center: Community Activity Stream */}
        <div className="lg:col-span-3 space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pulse?.circles?.map((circle: any) => (
                <div key={circle.id} className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8 hover:border-violet-500/30 transition-all group">
                   <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-violet-400">
                         <CircleDot className="w-6 h-6" />
                      </div>
                      <Badge variant="outline" className="border-slate-800 text-slate-500 text-[8px] font-black uppercase tracking-widest px-2">{circle.type}</Badge>
                   </div>
                   <h3 className="text-xl font-serif font-bold italic text-slate-100 group-hover:text-violet-400 transition-colors">{circle.name}</h3>
                   <p className="text-xs text-slate-500 mt-2 line-clamp-2">{circle.description}</p>
                   
                   <div className="mt-8 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                         <div className="flex items-center gap-1.5">
                            <Users className="w-3 h-3 text-slate-600" />
                            <span className="text-[10px] font-bold text-slate-400">{circle._count.members}</span>
                         </div>
                         <div className="flex items-center gap-1.5">
                            <MessageSquare className="w-3 h-3 text-slate-600" />
                            <span className="text-[10px] font-bold text-slate-400">{circle._count.posts}</span>
                         </div>
                      </div>
                      <Button variant="ghost" className="text-violet-400 text-[10px] font-black uppercase tracking-widest hover:bg-violet-500/10 rounded-full">
                         View Circle
                      </Button>
                   </div>
                </div>
              ))}
           </div>

           {/* Learning Progress: Seeker Journeys */}
           <div className="bg-slate-900/40 border border-slate-800 rounded-[3rem] overflow-hidden">
              <div className="p-8 border-b border-slate-800 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-lg font-serif font-bold italic text-slate-100">Seeker Progress Stream</h3>
                 </div>
                 <Button variant="ghost" className="text-slate-500 text-[9px] font-black uppercase tracking-widest">View All Seekers</Button>
              </div>
              <div className="divide-y divide-slate-800">
                 {pulse?.recentActivity?.map((activity: any) => (
                   <div key={activity.id} className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 font-bold text-xs uppercase">
                            {activity.user.profile?.full_name?.charAt(0) || 'S'}
                         </div>
                         <div>
                            <p className="text-sm font-bold text-slate-100">{activity.user.profile?.full_name || 'Anonymous Seeker'}</p>
                            <p className="text-[10px] text-slate-500">Mastering: <span className="text-violet-400 italic font-bold">{activity.curve.title}</span></p>
                         </div>
                      </div>
                      <div className="flex items-center gap-8">
                         <div className="text-right">
                            <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Current Step</p>
                            <p className="text-[10px] font-bold text-slate-300">Section {activity.currentStepId ? '2' : '1'} Verified</p>
                         </div>
                         <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[9px] font-black px-3 py-1">In Progress</Badge>
                      </div>
                   </div>
                 ))}
                 {(!pulse?.recentActivity || pulse.recentActivity.length === 0) && (
                   <div className="p-20 text-center text-xs text-slate-600 italic">No spiritual progress logs recorded today.</div>
                 )}
              </div>
           </div>
        </div>

      </div>

    </div>
  )
}
