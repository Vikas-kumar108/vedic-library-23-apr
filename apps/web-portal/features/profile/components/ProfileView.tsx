'use client'

import React from 'react'
import { 
  ShieldCheck, 
  Map, 
  Trophy, 
  BookOpen, 
  History, 
  MessageSquare, 
  Zap,
  ExternalLink,
  Settings
} from 'lucide-react'
import { Button, Badge } from '@/components'
import { useProfile } from '../hooks/useProfile'
import { GrowthTree } from './GrowthTree'
import { cn } from '@/lib/utils'

/**
 * ProfileView Component
 * Responsibility: Provide a comprehensive view of the seeker's identity, progress, and achievements.
 * Purpose: A place for deep reflection on one's own journey and evolution.
 */
export function ProfileView() {
  const { profile, isLoading } = useProfile()

  if (isLoading || !profile) return null

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-fade-in pb-24">
      {/* Identity Header */}
      <header className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-soft flex flex-col md:flex-row items-center gap-12 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
          <Map className="w-48 h-48" />
        </div>
        
        <div className="w-48 h-48 rounded-[3rem] bg-slate-50 border-4 border-white shadow-xl overflow-hidden relative z-10">
          <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
        </div>

        <div className="flex-1 space-y-6 relative z-10 text-center md:text-left">
          <div className="space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">{profile.name}</h1>
              <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
            <p className="text-xl text-primary font-serif italic">{profile.stage}</p>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
            <Badge variant="outline" className="h-10 px-6 rounded-xl border-slate-100 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
              Sankalpa: {profile.sankalpa}
            </Badge>
            <Button variant="ghost" size="sm" className="h-10 px-4 rounded-xl text-slate-400">
              <Settings className="w-4 h-4 mr-2" /> Settings
            </Button>
          </div>
        </div>
      </header>

      <div className="grid lg:grid-cols-[400px_1fr] gap-12">
        {/* Left: Growth & Evolution */}
        <div className="space-y-12">
          <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-soft space-y-8">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
              <Zap className="w-5 h-5 text-primary" /> Spiritual Evolution
            </h3>
            <GrowthTree level={profile.growthLevel} />
          </section>

          <section className="bg-slate-900 p-10 rounded-[3rem] text-white space-y-8 shadow-2xl relative overflow-hidden">
            <h3 className="text-lg font-bold flex items-center gap-3">
              <Trophy className="w-5 h-5 text-primary" /> Mastery Badges
            </h3>
            <div className="grid grid-cols-3 gap-6">
              {profile.badges.map(badge => (
                <div key={badge.id} className="flex flex-col items-center gap-3 group">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-3xl group-hover:bg-white/20 transition-all border border-white/5">
                    {badge.icon}
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] font-bold text-white leading-tight">{badge.label}</div>
                    <div className="text-[8px] font-bold text-white/30 uppercase tracking-widest mt-1">{badge.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right: Detailed Journey Stats */}
        <div className="space-y-12">
          <section className="grid md:grid-cols-2 gap-8">
            {[
              { label: 'Courses Completed', value: profile.stats.coursesCompleted, icon: <History className="w-5 h-5" />, color: 'bg-blue-50 text-blue-500' },
              { label: 'Verses Read', value: profile.stats.versesRead, icon: <BookOpen className="w-5 h-5" />, color: 'bg-orange-50 text-orange-500' },
              { label: 'Japa Rounds', value: profile.stats.japaRounds, icon: <Zap className="w-5 h-5" />, color: 'bg-primary/5 text-primary' },
              { label: 'Community Input', value: profile.stats.communityContributions, icon: <MessageSquare className="w-5 h-5" />, color: 'bg-slate-50 text-slate-500' }
            ].map((stat, i) => (
              <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-soft space-y-4 hover-lift">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", stat.color)}>
                  {stat.icon}
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{stat.label}</div>
                </div>
              </div>
            ))}
          </section>

          {/* Recent Journey Events */}
          <section className="bg-white rounded-[3rem] border border-slate-100 shadow-soft overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/20">
              <h3 className="font-bold text-sm uppercase tracking-widest text-slate-900">Your Journey Log</h3>
              <ExternalLink className="w-4 h-4 text-slate-300" />
            </div>
            <div className="divide-y divide-slate-50">
              {[
                { event: 'Unlocked badge "Shastra Scholar"', date: 'Apr 20, 2026', type: 'BADGE' },
                { event: 'Completed Module 2 of Gita Foundations', date: 'Apr 18, 2026', type: 'COURSE' },
                { event: 'Hit 12-day Sadhana Streak', date: 'Apr 16, 2026', type: 'STREAK' }
              ].map((log, i) => (
                <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-primary/40" />
                    <span className="text-sm font-medium text-slate-600">{log.event}</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{log.date}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
