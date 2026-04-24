'use client'

import React, { useEffect } from 'react'
import { GraduationCap, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAcademy } from '@/hooks/use-academy'
import { toast } from 'sonner'
import { AcademyStats } from '@/components/academy/AcademyStats'
import { CircleGrid } from '@/components/academy/CircleGrid'
import { SeekerStream } from '@/components/academy/SeekerStream'

export default function SeekerAcademyPage() {
  const { pulse, loading, error, fetchPulse } = useAcademy()
  const orgId = '75d867c4-f25b-419b-9a84-0a373b5c1c8a' // Mock Org

  useEffect(() => {
    fetchPulse(orgId)
  }, [fetchPulse])

  if (error) {
    toast.error('Failed to manifest community pulse: ' + error)
  }

  if (loading && !pulse) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-violet-500 border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 p-8 space-y-10 animate-in fade-in duration-1000">
      
      {/* 1. Academy Header */}
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* 2. Modular Engagement Stats */}
        <AcademyStats 
          vowStats={pulse?.vowStats} 
          circleCount={pulse?.circles?.length || 0} 
        />

        {/* 3. Modular Community Pulse */}
        <div className="lg:col-span-3 space-y-8">
           <CircleGrid circles={pulse?.circles || []} />
           <SeekerStream activities={pulse?.recentActivity || []} />
        </div>
      </div>
    </div>
  )
}
