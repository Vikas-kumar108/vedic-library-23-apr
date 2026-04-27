"use client"
import React from 'react'
import Link from 'next/link'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { SeekerHeader } from '@/components/seeker/SeekerHeader'
import { Sparkles, ArrowRight, BookOpen, Search } from 'lucide-react'
import { GuruWidget } from '@/features/dashboard/components/GuruWidget'
import { PurusharthaDashboard } from '@/features/dashboard/components/PurusharthaDashboard'
import { FamilyDashboard } from '@/features/dashboard/components/FamilyDashboard'
import { HarmonyDashboard } from '@/features/dashboard/components/HarmonyDashboard'
import { MentorWidget } from '@/features/dashboard/components/MentorWidget'
import { SamskaraDashboard } from '@/features/dashboard/components/SamskaraDashboard'
import { LineageDashboard } from '@/features/dashboard/components/LineageDashboard'
import { CommunityDashboard } from '@/features/dashboard/components/CommunityDashboard'
import { JyotishWidget } from '@/features/dashboard/components/JyotishWidget'
import { KarmaInsightsWidget } from '@/features/dashboard/components/KarmaInsightsWidget'

export default function DashboardPage() {
  const { user, isLoading: authLoading, checkAuth } = useAuth()
  React.useEffect(() => {
    checkAuth()
  }, [])

  if (authLoading) return <div className="p-12 animate-pulse text-primary font-serif italic text-2xl font-bold text-center">Entering the Sanctuary...</div>

  return (
    <div className="max-w-5xl mx-auto space-y-20 pb-24 animate-in fade-in duration-1000 text-center">
      
      {/* 1. Minimal Shastric Header */}
      <SeekerHeader user={user} />

      {/* 2. Institutional Guidance Orchestrator */}
      <GuruWidget />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
        {/* 3. Left Column: Mentorship & Reflection */}
        <div className="lg:col-span-7 space-y-12">
          <MentorWidget />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <JyotishWidget />
            <KarmaInsightsWidget />
          </div>
        </div>

        {/* 3. Right Column: Life Balance Analytics */}
        <div className="lg:col-span-5 space-y-12">
          <PurusharthaDashboard />
          <SamskaraDashboard />
        </div>
      </div>

      {/* 4. Family & Household Intelligence */}
      <section className="space-y-10">
        <div className="space-y-2 text-left">
          <div className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">👪 Collective Dharma</div>
          <h2 className="text-3xl font-serif font-bold text-slate-900 italic">Household Governance</h2>
        </div>
        <FamilyDashboard familyId={user?.family_id} />
        <HarmonyDashboard familyId={user?.family_id} />
        <LineageDashboard />
        {user?.community_members?.[0]?.community_id && (
          <CommunityDashboard communityId={user.community_members[0].community_id} />
        )}
      </section>

      {/* 5. ADVANCED ACCESS: For Scholars & Researchers */}
      <section className="pt-20 border-t border-slate-50 flex flex-col items-center gap-6">
        <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Advanced Study</div>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="rounded-2xl h-14 px-8 text-slate-400 hover:text-primary hover:bg-primary/5 group flex items-center gap-3">
            <Search className="size-4 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-widest">Research Workbench</span>
          </button>
          <button className="rounded-2xl h-14 px-8 text-slate-400 hover:text-orange-500 hover:bg-orange-50 group flex items-center gap-3">
            <BookOpen className="size-4 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-widest">Full Library</span>
          </button>
        </div>
      </section>

      {/* 6. MEDITATIVE FOOTER */}
      <footer className="pt-10 opacity-30 italic text-slate-400 font-serif text-sm">
        "One step at a time, the seeker reaches the infinite."
      </footer>

    </div>
  )
}
