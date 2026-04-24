'use client'

import React from 'react'
import { 
  ShieldCheck, 
  Package, 
  Users, 
  Globe, 
  FileText, 
  TrendingUp, 
  AlertCircle, 
  ArrowUpRight,
  Database,
  LayoutDashboard,
  Hammer,
  MessageSquareHeart,
  Terminal
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TaskMonitor } from '@/components/organisms/task-monitor'
import { cn } from '@/lib/utils'

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-950 p-8 space-y-8 animate-in fade-in duration-1000">
      
      {/* Top Bar: Institutional Status */}
      <header className="flex justify-between items-center bg-slate-900/40 border border-slate-800 p-6 rounded-[2rem] backdrop-blur-xl">
        <div className="flex items-center gap-6">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <LayoutDashboard className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-serif font-bold italic text-slate-100">Institutional <span className="text-indigo-400">Command</span></h1>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] mt-1">Vedic Operating System • v2.1.0</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
            System Healthy
          </Badge>
          <div className="h-10 w-[1px] bg-slate-800" />
          <p className="text-xs font-bold text-slate-400 italic">April 24, 2026</p>
        </div>
      </header>

      {/* The Bento Hub: 8 Pillars in a Small Place */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
        
        {/* 1. Shastra Gold (Large) */}
        <Link href="/admin/content" className="md:col-span-2 lg:col-span-3 h-[300px] group relative overflow-hidden rounded-[2.5rem] border border-slate-800 bg-slate-900/40 p-10 flex flex-col justify-between hover:border-indigo-500/50 transition-all">
          <div className="relative z-10">
            <Badge variant="outline" className="border-indigo-500/30 text-indigo-400 text-[8px] font-black uppercase tracking-widest mb-4">Pillar I: Content</Badge>
            <h2 className="text-3xl font-serif font-bold italic text-slate-100 leading-tight">Shastra <br/>Gold Library</h2>
            <p className="text-xs text-slate-500 mt-4 max-w-[200px] leading-relaxed">2,320 Nodes verified across 12 scriptures. Ingestion engine operational.</p>
          </div>
          <div className="flex items-end justify-between relative z-10">
            <div className="flex -space-x-2">
              {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800" />)}
            </div>
            <ArrowUpRight className="w-8 h-8 text-slate-700 group-hover:text-indigo-400 transition-colors" />
          </div>
          <Database className="absolute -right-10 -bottom-10 w-64 h-64 text-indigo-500/5 group-hover:text-indigo-500/10 transition-colors" />
        </Link>

        {/* 2. Financial Dharma (Medium) */}
        <Link href="/admin/finance" className="md:col-span-2 lg:col-span-3 h-[300px] group relative overflow-hidden rounded-[2.5rem] border border-slate-800 bg-slate-900/40 p-10 flex flex-col justify-between hover:border-emerald-500/50 transition-all">
          <div className="relative z-10">
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 text-[8px] font-black uppercase tracking-widest mb-4">Pillar III: Finance</Badge>
            <h2 className="text-3xl font-serif font-bold italic text-slate-100 leading-tight">Financial <br/>Dharma</h2>
            <div className="mt-6 flex items-center gap-6">
              <div>
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Net Capital</p>
                <p className="text-xl font-black text-emerald-400">₹5.72 Cr</p>
              </div>
              <div className="h-8 w-[1px] bg-slate-800" />
              <div>
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Audit Status</p>
                <p className="text-xl font-black text-slate-100">Verified</p>
              </div>
            </div>
          </div>
          <ShieldCheck className="absolute -right-10 -bottom-10 w-64 h-64 text-emerald-500/5 group-hover:text-emerald-500/10 transition-colors" />
          <div className="flex justify-end relative z-10">
             <ArrowUpRight className="w-8 h-8 text-slate-700 group-hover:text-emerald-400 transition-colors" />
          </div>
        </Link>

        {/* 3. Institutional Assets (Small) */}
        <Link href="/admin/assets" className="md:col-span-2 lg:col-span-2 h-[240px] group relative overflow-hidden rounded-[2.5rem] border border-slate-800 bg-slate-900/40 p-8 flex flex-col justify-between hover:border-blue-500/50 transition-all">
           <div>
              <Package className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-lg font-serif font-bold italic text-slate-100">Asset Inventory</h3>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">QR Tracking • Pillar V</p>
           </div>
           <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400">142 Physical Items</span>
              <ArrowUpRight className="w-5 h-5 text-slate-700 group-hover:text-blue-400 transition-colors" />
           </div>
        </Link>

        {/* 4. Human Capital (Small) */}
        <Link href="/admin/human-capital" className="md:col-span-2 lg:col-span-2 h-[240px] group relative overflow-hidden rounded-[2.5rem] border border-slate-800 bg-slate-900/40 p-8 flex flex-col justify-between hover:border-amber-500/50 transition-all">
           <div>
              <Users className="w-8 h-8 text-amber-400 mb-4" />
              <h3 className="text-lg font-serif font-bold italic text-slate-100">Human Capital</h3>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Payroll & Mentors • VI</p>
           </div>
           <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400">12 Staff • 8 Mentors</span>
              <ArrowUpRight className="w-5 h-5 text-slate-700 group-hover:text-amber-400 transition-colors" />
           </div>
        </Link>

        {/* 5. Digital Ecosystem (Small) */}
        <Link href="/admin/integrations" className="md:col-span-2 lg:col-span-2 h-[240px] group relative overflow-hidden rounded-[2.5rem] border border-slate-800 bg-slate-900/40 p-8 flex flex-col justify-between hover:border-indigo-500/50 transition-all text-left">
           <div>
              <Globe className="w-8 h-8 text-indigo-400 mb-4" />
              <h3 className="text-lg font-serif font-bold italic text-slate-100">Ecosystem</h3>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Webhooks & API • VIII</p>
           </div>
           <div className="space-y-2">
              <div className="flex items-center justify-between">
                 <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Email</span>
                 <Badge variant="outline" className="text-[8px] h-4 bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Operational</Badge>
              </div>
              <div className="flex items-center justify-between">
                 <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Storage</span>
                 <Badge variant="outline" className="text-[8px] h-4 bg-rose-500/10 text-rose-500 border-rose-500/20">Offline</Badge>
              </div>
              <div className="flex items-center justify-between pt-2">
                 <Button 
                   onClick={(e) => {
                     e.preventDefault()
                     fetch('http://localhost:3001/institutional/system/proclaim', { 
                       method: 'POST',
                       headers: { 'Content-Type': 'application/json' },
                       body: JSON.stringify({ email: 'vikas@test.com' })
                     }).then(() => alert('Proclamation Issued!'))
                   }}
                   variant="ghost" 
                   className="text-[8px] font-black uppercase tracking-[0.2em] text-indigo-400 hover:text-white p-0 h-auto"
                 >
                   Issue Proclamation
                 </Button>
                 <ArrowUpRight className="w-4 h-4 text-slate-700 group-hover:text-indigo-400 transition-colors" />
              </div>
           </div>
        </Link>

        {/* 6. Projects & Infrastructure (New - Small) */}
        <Link href="/admin/projects" className="md:col-span-2 lg:col-span-2 h-[240px] group relative overflow-hidden rounded-[2.5rem] border border-slate-800 bg-slate-900/40 p-8 flex flex-col justify-between hover:border-rose-500/50 transition-all">
           <div>
              <Hammer className="w-8 h-8 text-rose-400 mb-4" />
              <h3 className="text-lg font-serif font-bold italic text-slate-100">Projects</h3>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Infrastructure • Pillar VII</p>
           </div>
           <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400">2 Active Builds</span>
              <ArrowUpRight className="w-5 h-5 text-slate-700 group-hover:text-rose-400 transition-colors" />
           </div>
        </Link>

        {/* 7. Community Pulse (New - Small) */}
        <Link href="/admin/community" className="md:col-span-2 lg:col-span-2 h-[240px] group relative overflow-hidden rounded-[2.5rem] border border-slate-800 bg-slate-900/40 p-8 flex flex-col justify-between hover:border-violet-500/50 transition-all">
           <div>
              <MessageSquareHeart className="w-8 h-8 text-violet-400 mb-4" />
              <h3 className="text-lg font-serif font-bold italic text-slate-100">Community</h3>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Circles & Vows • Pillar IV</p>
           </div>
           <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400">1,240 Seekers</span>
              <ArrowUpRight className="w-5 h-5 text-slate-700 group-hover:text-violet-400 transition-colors" />
           </div>
        </Link>

        {/* 8. Legal & Governance (New - Small) */}
        <Link href="/admin/legal" className="md:col-span-2 lg:col-span-2 h-[240px] group relative overflow-hidden rounded-[2.5rem] border border-slate-800 bg-slate-900/40 p-8 flex flex-col justify-between hover:border-slate-400/50 transition-all border-dashed">
           <div>
              <FileText className="w-8 h-8 text-slate-400 mb-4 opacity-50" />
              <h3 className="text-lg font-serif font-bold italic text-slate-400">Legal Vault</h3>
              <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest mt-1">Partnerships • Pillar II</p>
           </div>
           <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600 italic">Coming Soon</span>
              <ArrowUpRight className="w-5 h-5 text-slate-800 transition-colors" />
           </div>
        </Link>

      </div>
      
      {/* Institutional Heartbeat: Booming Backend Monitor */}
      <div className="max-w-4xl mx-auto w-full">
         <TaskMonitor />
      </div>

      {/* Platform Activity Feed */}
      <footer className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Activity className="w-5 h-5 text-indigo-400" />
          <p className="text-xs font-bold text-slate-300">Live Audit Trail:</p>
          <p className="text-xs text-slate-500 italic">"Vidura Dharma" approved a payroll disbursement for April cycle (2 mins ago)</p>
        </div>
        <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-indigo-400">View Full Audit <ArrowUpRight className="ml-2 w-4 h-4" /></Button>
      </footer>
    </div>
  )
}

function Activity({ className }: { className?: string }) {
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
