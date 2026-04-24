'use client'

import React, { useEffect } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TaskMonitor } from '@/components/organisms/task-monitor'
import { useInstitutional } from '@/hooks/use-institutional'
import { useAcademy } from '@/hooks/use-academy'
import { useFinance } from '@/hooks/use-finance'
import { DashboardHeader } from '@/components/admin/DashboardHeader'
import { BentoGrid } from '@/components/admin/BentoGrid'
import { QuickActions } from '@/components/admin/QuickActions'
import { RecentActivity } from '@/components/admin/RecentActivity'

export default function AdminDashboardPage() {
  const { health, overview, fetchOverview, fetchContentHealth } = useInstitutional()
  const { pulse, fetchPulse } = useAcademy()
  const { fetchLedger } = useFinance()

  const orgId = '75d867c4-f25b-419b-9a84-0a373b5c1c8a' // Root Org

  useEffect(() => {
    fetchOverview(orgId)
    fetchContentHealth()
    fetchPulse(orgId)
    fetchLedger(orgId)
  }, [fetchOverview, fetchContentHealth, fetchPulse, fetchLedger, orgId])

  // Aggregate stats for BentoGrid
  const stats = {
    totalNodes: health?.shastras?.reduce((acc: number, s: any) => acc + s.nodeCount, 0) || 0,
    shastraCount: health?.shastras?.length || 0,
    netCapital: overview?.stats?.totalFunding || 0,
    seekerCount: pulse?.circles?.reduce((acc: number, c: any) => acc + c._count.members, 0) || 0
  }

  return (
    <div className="min-h-screen bg-slate-950 p-8 space-y-8 animate-in fade-in duration-1000">
      
      {/* 1. Modular Header */}
      <DashboardHeader />

      {/* 2. Modular Bento Grid (Stats equivalent) */}
      <BentoGrid stats={stats} />
      
      {/* 3. New Governance Corridors */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <QuickActions />
        </div>
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
      </div>

      {/* 4. System Heartbeat */}
      <div className="w-full">
         <TaskMonitor />
      </div>

      {/* 5. Modular Footer */}
      <footer className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] flex items-center justify-between mt-12">
        <div className="flex items-center gap-4">
          <ActivityIcon className="w-5 h-5 text-indigo-400" />
          <p className="text-xs font-bold text-slate-300">Live Audit Trail:</p>
          <p className="text-xs text-slate-500 italic">"Vidura Dharma" approved a payroll disbursement for April cycle (2 mins ago)</p>
        </div>
        <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-indigo-400">
          View Full Audit <ArrowUpRight className="ml-2 w-4 h-4" />
        </Button>
      </footer>
    </div>
  )
}

function ActivityIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </svg>
  )
}
