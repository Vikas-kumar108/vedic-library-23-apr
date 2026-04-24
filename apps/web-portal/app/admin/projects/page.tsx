'use client'

import React, { useState, useEffect } from 'react'
import { 
  Hammer, 
  Map, 
  Construction, 
  CheckCircle2, 
  Clock, 
  IndianRupee, 
  ArrowRight, 
  Plus,
  Layout,
  HardHat,
  Eye
} from 'lucide-react'
import { InstitutionalService } from '@/services/institutional-service'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

export default function InstitutionalBlueprintPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const orgId = '75d867c4-f25b-419b-9a84-0a373b5c1c8a' // Mock Org ID

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const data = await InstitutionalService.getProjects(orgId)
      setProjects(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 p-8 space-y-10 animate-in fade-in duration-700">
      
      {/* Blueprint Header */}
      <header className="flex justify-between items-end">
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-rose-500">
            <Map className="w-8 h-8" />
            <div className="h-[2px] w-20 bg-rose-500/20" />
          </div>
          <h1 className="text-4xl font-serif font-bold italic text-slate-100">Institutional <span className="text-rose-500">Blueprint</span></h1>
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.4em]">Infrastructure & Manifestation • Pillar VII</p>
        </div>
        <Button className="bg-rose-600 hover:bg-rose-500 text-white rounded-full px-8 py-6 h-auto shadow-xl shadow-rose-500/20 group">
          <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
          Manifest New Project
        </Button>
      </header>

      {/* Blueprint Grid: Architecture Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Active Manifestations */}
        <div className="lg:col-span-2 space-y-8">
          {projects.map((project) => (
            <div key={project.id} className="group relative bg-slate-900/40 border border-slate-800 rounded-[3rem] p-10 hover:border-rose-500/30 transition-all overflow-hidden">
               {/* Technical Background Lines */}
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#e11d48 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
               
               <div className="relative z-10 space-y-8">
                 <div className="flex justify-between items-start">
                    <div className="space-y-2">
                       <Badge variant="outline" className="border-rose-500/30 text-rose-400 text-[8px] font-black uppercase tracking-widest px-3 py-1">
                         {project.status}
                       </Badge>
                       <h2 className="text-3xl font-serif font-bold italic text-slate-100">{project.name}</h2>
                    </div>
                    <div className="text-right">
                       <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Utilized Capital</p>
                       <p className="text-xl font-black text-rose-500">₹{Number(project.stats.utilizedAmount).toLocaleString()}</p>
                    </div>
                 </div>

                 <p className="text-slate-400 text-sm leading-relaxed max-w-xl">{project.description}</p>

                 <div className="space-y-4">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                       <span>Construction Progress</span>
                       <span className="text-slate-100">{Math.round(project.stats.progressPercent)}%</span>
                    </div>
                    <Progress value={project.stats.progressPercent} className="h-2 bg-slate-800" indicatorClassName="bg-rose-500 shadow-[0_0_15px_rgba(225,29,72,0.5)]" />
                 </div>

                 <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-800/50">
                    <div>
                       <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Total Budget</p>
                       <p className="text-sm font-bold text-slate-300">₹{Number(project.totalBudget).toLocaleString()}</p>
                    </div>
                    <div>
                       <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Milestones</p>
                       <p className="text-sm font-bold text-slate-300">4 / 6 Verified</p>
                    </div>
                    <div className="flex justify-end items-center">
                       <Button variant="ghost" className="text-rose-500 text-[10px] font-black uppercase tracking-widest hover:bg-rose-500/10 rounded-full">
                          View Site Logs <ArrowRight className="w-4 h-4 ml-2" />
                       </Button>
                    </div>
                 </div>
               </div>
            </div>
          ))}

          {projects.length === 0 && !loading && (
            <div className="h-[400px] rounded-[3rem] border-2 border-dashed border-slate-800 flex flex-col items-center justify-center space-y-6">
               <Construction className="w-16 h-16 text-slate-800" />
               <p className="text-slate-600 italic font-serif">No physical manifestations currently in progress.</p>
               <Button variant="outline" className="border-slate-800 text-slate-400 rounded-full text-[10px] font-black uppercase tracking-widest">Initialize First Project</Button>
            </div>
          )}
        </div>

        {/* Right Column: Infrastructure Pulse */}
        <div className="space-y-8">
           <div className="bg-slate-900/60 border border-slate-800 rounded-[2.5rem] p-8 space-y-8">
              <h3 className="text-lg font-serif font-bold italic text-slate-100">Capital Conversion</h3>
              
              <div className="space-y-6">
                 {[
                   { label: 'Digital Library', value: 85, color: 'rose' },
                   { label: 'Physical Heritage', value: 32, color: 'indigo' },
                   { label: 'Outreach Centers', value: 12, color: 'emerald' }
                 ].map((stat) => (
                   <div key={stat.label} className="space-y-2">
                      <div className="flex justify-between items-end">
                         <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</span>
                         <span className="text-xs font-bold text-slate-300">{stat.value}%</span>
                      </div>
                      <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                         <div className={cn("h-full transition-all duration-1000", `bg-${stat.color}-500`)} style={{ width: `${stat.value}%` }} />
                      </div>
                   </div>
                 ))}
              </div>

              <div className="pt-6 border-t border-slate-800">
                 <p className="text-[10px] text-slate-500 italic leading-relaxed">
                   "Vāstu is the science of manifesting the Divine will into physical form. Every project here is a sanctuary for the eternal wisdom."
                 </p>
              </div>
           </div>

           {/* Quick Actions */}
           <div className="grid grid-cols-2 gap-4">
              <button className="p-6 bg-slate-900/40 border border-slate-800 rounded-3xl hover:border-indigo-500/50 transition-all flex flex-col items-center gap-3">
                 <HardHat className="w-6 h-6 text-indigo-400" />
                 <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Manage Site</span>
              </button>
              <button className="p-6 bg-slate-900/40 border border-slate-800 rounded-3xl hover:border-emerald-500/50 transition-all flex flex-col items-center gap-3">
                 <Layout className="w-6 h-6 text-emerald-400" />
                 <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Asset Mapping</span>
              </button>
           </div>
        </div>

      </div>

    </div>
  )
}
