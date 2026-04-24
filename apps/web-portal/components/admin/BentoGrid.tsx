'use client'

import React from 'react'
import Link from 'next/link'
import { 
  ArrowUpRight, 
  Database, 
  ShieldCheck, 
  Package, 
  Users, 
  Globe, 
  Hammer, 
  MessageSquareHeart, 
  FileText 
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { InstitutionalService } from '@/services/institutional-service'

interface BentoGridProps {
  stats: {
    totalNodes: number
    shastraCount: number
    netCapital: number
    seekerCount: number
  }
}

export function BentoGrid({ stats }: BentoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {/* 1. Shastra Gold */}
      <Link href="/admin/content" className="md:col-span-2 lg:col-span-3 h-[300px] group relative overflow-hidden rounded-[2.5rem] border border-slate-800 bg-slate-900/40 p-10 flex flex-col justify-between hover:border-indigo-500/50 transition-all">
        <div className="relative z-10">
          <Badge variant="outline" className="border-indigo-500/30 text-indigo-400 text-[8px] font-black uppercase tracking-widest mb-4">Pillar I: Content</Badge>
          <h2 className="text-3xl font-serif font-bold italic text-slate-100 leading-tight">Shastra <br/>Gold Library</h2>
          <p className="text-xs text-slate-500 mt-4 max-w-[200px] leading-relaxed">
            {stats.totalNodes.toLocaleString()} Nodes verified across {stats.shastraCount} scriptures.
          </p>
        </div>
        <Database className="absolute -right-10 -bottom-10 w-64 h-64 text-indigo-500/5 group-hover:text-indigo-500/10 transition-colors" />
        <div className="flex justify-end relative z-10">
          <ArrowUpRight className="w-8 h-8 text-slate-700 group-hover:text-indigo-400 transition-colors" />
        </div>
      </Link>

      {/* 2. Financial Dharma */}
      <Link href="/admin/finance" className="md:col-span-2 lg:col-span-3 h-[300px] group relative overflow-hidden rounded-[2.5rem] border border-slate-800 bg-slate-900/40 p-10 flex flex-col justify-between hover:border-emerald-500/50 transition-all">
        <div className="relative z-10">
          <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 text-[8px] font-black uppercase tracking-widest mb-4">Pillar III: Finance</Badge>
          <h2 className="text-3xl font-serif font-bold italic text-slate-100 leading-tight">Financial <br/>Dharma</h2>
          <div className="mt-6 flex items-center gap-6">
            <div>
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Net Capital</p>
              <p className="text-xl font-black text-emerald-400">₹{(stats.netCapital / 10000000).toFixed(2)} Cr</p>
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

      {/* 3. Assets */}
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

      {/* 4. Human Capital */}
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

      {/* 5. Ecosystem */}
      <div className="md:col-span-2 lg:col-span-2 h-[240px] group relative overflow-hidden rounded-[2.5rem] border border-slate-800 bg-slate-900/40 p-8 flex flex-col justify-between hover:border-indigo-500/50 transition-all text-left">
         <div>
            <Globe className="w-8 h-8 text-indigo-400 mb-4" />
            <h3 className="text-lg font-serif font-bold italic text-slate-100">Ecosystem</h3>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Webhooks & API • VIII</p>
         </div>
         <div className="space-y-2">
            <div className="flex items-center justify-between pt-2">
               <Button 
                 onClick={() => {
                   InstitutionalService.issueProclamation('vikas@test.com')
                     .then(() => alert('Proclamation Issued!'))
                 }}
                 variant="ghost" 
                 className="text-[8px] font-black uppercase tracking-[0.2em] text-indigo-400 hover:text-white p-0 h-auto"
               >
                 Issue Proclamation
               </Button>
               <ArrowUpRight className="w-4 h-4 text-slate-700 group-hover:text-indigo-400 transition-colors" />
            </div>
         </div>
      </div>
      
      {/* 6. Projects */}
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

      {/* 7. Community */}
      <Link href="/admin/community" className="md:col-span-2 lg:col-span-2 h-[240px] group relative overflow-hidden rounded-[2.5rem] border border-slate-800 bg-slate-900/40 p-8 flex flex-col justify-between hover:border-violet-500/50 transition-all">
         <div>
            <MessageSquareHeart className="w-8 h-8 text-violet-400 mb-4" />
            <h3 className="text-lg font-serif font-bold italic text-slate-100">Community</h3>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Circles & Vows • Pillar IV</p>
         </div>
         <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">{stats.seekerCount.toLocaleString()} Seekers</span>
            <ArrowUpRight className="w-5 h-5 text-slate-700 group-hover:text-violet-400 transition-colors" />
         </div>
      </Link>

      {/* 8. Legal */}
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
  )
}
