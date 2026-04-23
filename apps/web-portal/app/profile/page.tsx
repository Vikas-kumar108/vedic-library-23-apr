'use client'

import React from 'react'
import { 
  User, 
  MapPin, 
  Mail, 
  ShieldCheck, 
  TrendingUp, 
  Settings, 
  LogOut, 
  Award, 
  BookOpen, 
  Flame,
  Zap,
  Leaf
} from 'lucide-react'
import { Button } from '@/components/atoms/button'
import { Badge } from '@/components/atoms/badge'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { usePermissions } from '@/features/auth/hooks/useAccess'
import { useSadhana } from '@/features/practice/hooks/useSadhana'
import { cn } from '@/lib/utils'

/**
 * Integrated Seeker Profile
 * Responsibility: Display the seeker's spiritual identity and growth.
 * Purpose: Visualizes the 'Vedic-Aware' attributes (Life Stage, Roles) and practice consistency.
 */
export default function ProfilePage() {
  const { user, isLoading: authLoading } = useAuth()
  const { canEditContent, canGuideStudents } = usePermissions()
  const { stats } = useSadhana()

  if (authLoading) return <div className="p-12 animate-pulse text-slate-400 font-serif italic text-xl text-center">Identifying the Seeker...</div>

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-fade-in pb-24">
      
      {/* 1. IDENTITY CARD */}
      <section className="bg-white rounded-[4rem] border border-slate-100 shadow-soft overflow-hidden">
        <div className="h-40 bg-slate-900 relative">
          <div className="absolute -bottom-16 left-12 p-2 bg-white rounded-[2.5rem]">
            <div className="w-32 h-32 bg-primary/10 rounded-[2rem] flex items-center justify-center text-primary border-4 border-white shadow-lg overflow-hidden">
               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="absolute bottom-6 right-12 flex gap-4">
            <Button variant="ghost" className="h-10 px-6 rounded-xl bg-white/10 text-white hover:bg-white/20 font-bold text-[10px] uppercase tracking-widest backdrop-blur-md">
              <Settings className="w-4 h-4 mr-2" /> Edit Profile
            </Button>
            <Button variant="ghost" className="h-10 px-6 rounded-xl bg-red-500/20 text-red-100 hover:bg-red-500/30 font-bold text-[10px] uppercase tracking-widest backdrop-blur-md">
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </div>
        
        <div className="pt-24 pb-12 px-12 grid md:grid-cols-[1fr_300px] gap-12">
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-serif font-bold text-slate-900">{user?.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-slate-400">
                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest"><ShieldCheck className="w-4 h-4 text-primary" /> {user?.role}</span>
                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest"><MapPin className="w-4 h-4" /> Mumbai, India</span>
                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest"><Mail className="w-4 h-4" /> {user?.email}</span>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Badge className="bg-primary/5 text-primary rounded-lg text-[10px] font-bold uppercase tracking-widest py-1.5 px-4">
                Life Stage: {user?.stage}
              </Badge>
              <Badge variant="outline" className="rounded-lg text-[10px] font-bold uppercase tracking-widest py-1.5 px-4 border-slate-100 text-slate-500">
                Seeker Level 2
              </Badge>
            </div>

            <p className="text-sm text-slate-500 italic leading-relaxed max-w-xl border-l-2 border-primary/20 pl-6">
              "Seeking to balance a professional career with deep Shastric study. Currently focused on the Bhagavad Gītā's teachings on detached action."
            </p>
          </div>

          <div className="space-y-6 bg-slate-50 p-8 rounded-[3rem] border border-slate-100">
            <h3 className="text-[10px] font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-primary" /> Capabilities
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Edit Content</span>
                {canEditContent ? <Zap className="w-4 h-4 text-green-500" /> : <Lock className="w-4 h-4 text-slate-200" />}
              </li>
              <li className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Guide Students</span>
                {canGuideStudents ? <Zap className="w-4 h-4 text-green-500" /> : <Lock className="w-4 h-4 text-slate-200" />}
              </li>
              <li className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Public Circles</span>
                <Zap className="w-4 h-4 text-green-500" />
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 2. GROWTH TREE (Visual Metaphor) */}
      <section className="grid md:grid-cols-[1fr_350px] gap-10">
        <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-soft space-y-10 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
               <h2 className="text-2xl font-serif font-bold text-slate-900">Spiritual <span className="text-primary italic">Growth Tree</span></h2>
               <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Visualizing your realization</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">64%</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Realization Index</div>
            </div>
          </div>
          
          <div className="h-80 flex items-center justify-center bg-slate-50/50 rounded-[3rem] border border-dashed border-slate-200">
             <div className="text-center space-y-4">
                <Leaf className="w-20 h-20 text-primary mx-auto animate-bounce" />
                <p className="text-sm text-slate-400 italic">Your tree is flourishing in the 'Gita' branch.</p>
             </div>
          </div>
        </div>

        <aside className="space-y-10">
          <div className="bg-slate-900 p-10 rounded-[4rem] text-white space-y-8 shadow-2xl relative overflow-hidden group">
             <div className="relative z-10 space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-primary">
                  <Flame className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold">{stats?.currentStreak || 0}</div>
                  <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Day Sadhana Streak</div>
                </div>
                <div className="pt-4 space-y-4">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                    <span>Consistency</span>
                    <span>88%</span>
                  </div>
                  <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '88%' }} />
                  </div>
                </div>
             </div>
             <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
          </div>

          <div className="bg-white p-10 rounded-[4rem] border border-slate-100 shadow-soft space-y-6 text-center">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Next Milestone</h3>
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-50">
              <div className="text-xl font-bold text-slate-900">Gita Praveen</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 italic">Master of the 18 Chapters</div>
            </div>
            <Button variant="ghost" className="w-full text-xs text-primary font-bold">View Roadmap →</Button>
          </div>
        </aside>
      </section>
    </div>
  )
}

function Lock(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}
