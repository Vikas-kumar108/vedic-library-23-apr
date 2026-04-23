'use client'

import React from 'react'
import { 
  Building2, 
  Plus, 
  Search, 
  Settings, 
  Users, 
  CheckCircle2, 
  Globe,
  ArrowRight,
  ShieldAlert,
  MoreVertical,
  ChevronRight
} from 'lucide-react'
import { Button } from '@/components/atoms/button'
import { Badge } from '@/components/atoms/badge'
import { cn } from '@/lib/utils'

/**
 * Super Admin: Organization Management
 * Responsibility: Onboard and manage independent tenants on the platform.
 */

const TENANTS = [
  { 
    id: '1', 
    name: 'Vedic Library Main', 
    type: 'Trust', 
    admins: 2, 
    members: 1200, 
    status: 'ACTIVE',
    modules: ['Finance', 'CRM', 'Vault', 'Outreach']
  },
  { 
    id: '2', 
    name: 'Gita Outreach Ranaghat', 
    type: 'NGO', 
    admins: 1, 
    members: 450, 
    status: 'ACTIVE',
    modules: ['Finance', 'CRM']
  },
  { 
    id: '3', 
    name: 'Dharma Foundation Intl', 
    type: 'Section 8', 
    admins: 3, 
    members: 2800, 
    status: 'PENDING',
    modules: ['Full Access']
  }
]

export default function OrganizationManagement() {
  return (
    <div className="p-10 space-y-10 animate-in fade-in duration-700">
      
      {/* Header Section */}
      <header className="flex justify-between items-end border-b border-slate-100 pb-10">
        <div className="space-y-4">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center text-white">
                 <Globe className="w-5 h-5" />
              </div>
              <h1 className="text-4xl font-serif font-bold text-slate-900 tracking-tight italic">Platform <span className="text-blue-600">Control</span></h1>
           </div>
           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
             <ShieldAlert className="w-3 h-3 text-red-500" /> Super Admin Access Enabled
           </p>
        </div>
        <Button className="h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-200 transition-all">
          <Plus className="w-4 h-4 mr-2" /> Onboard New Organization
        </Button>
      </header>

      {/* Tenant Registry */}
      <section className="space-y-6">
         <div className="flex items-center justify-between">
            <h2 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em]">Independent Organizations (Tenants)</h2>
            <div className="flex items-center gap-3">
               <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-300" />
                  <input type="text" placeholder="Search tenants..." className="h-9 pl-9 pr-4 bg-slate-50 border border-slate-100 rounded-xl text-[10px] outline-none" />
               </div>
               <Button variant="outline" className="h-9 px-4 rounded-xl border-slate-100 text-[10px] font-bold">
                  All Types
               </Button>
            </div>
         </div>

         <div className="grid lg:grid-cols-1 gap-6">
            {TENANTS.map((t) => (
               <div key={t.id} className="p-8 bg-white border border-slate-100 rounded-[3rem] shadow-sm hover:shadow-2xl hover:border-blue-100 transition-all group cursor-pointer">
                  <div className="flex flex-wrap items-center justify-between gap-10">
                     <div className="flex items-center gap-6 flex-1 min-w-[300px]">
                        <div className="w-16 h-16 bg-slate-50 rounded-[1.5rem] flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                           <Building2 className="w-8 h-8" />
                        </div>
                        <div>
                           <div className="flex items-center gap-3">
                              <h3 className="text-xl font-bold text-slate-900">{t.name}</h3>
                              <Badge className={cn(
                                "text-[8px] font-black tracking-widest",
                                t.status === 'ACTIVE' ? "bg-emerald-500" : "bg-orange-500"
                              )}>{t.status}</Badge>
                           </div>
                           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 flex items-center gap-2 italic">
                              {t.type} • <Users className="w-3 h-3" /> {t.members} Members • {t.admins} Admins
                           </p>
                        </div>
                     </div>

                     <div className="flex items-center gap-3 flex-wrap max-w-[400px]">
                        {t.modules.map((m, i) => (
                           <Badge key={i} variant="outline" className="bg-slate-50 border-slate-100 text-[8px] font-black tracking-widest px-3 py-1">
                              {m}
                           </Badge>
                        ))}
                     </div>

                     <div className="flex items-center gap-4">
                        <Button variant="ghost" className="h-12 px-6 rounded-xl border border-slate-100 text-[10px] font-black uppercase tracking-widest group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all">
                           Configure Modules <ChevronRight className="ml-2 w-4 h-4" />
                        </Button>
                        <button className="p-2 text-slate-300 hover:text-slate-600">
                           <MoreVertical className="w-4 h-4" />
                        </button>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </section>

      {/* Global Intelligence Banner */}
      <section className="bg-slate-900 p-12 rounded-[4rem] text-white space-y-8 relative overflow-hidden group">
         <div className="relative z-10 space-y-6 max-w-2xl">
            <h3 className="text-3xl font-serif font-bold italic leading-tight">Empower <span className="text-blue-400">Independent Institutions</span></h3>
            <p className="text-white/40 text-lg leading-relaxed italic">You are building a shared infrastructure. Every improvement you make to the Finance or CRM modules is instantly available to all 100+ organizations on the platform.</p>
            <div className="flex gap-4">
               <Button className="h-14 px-10 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl transition-all">
                  Onboard Friend's NGO
               </Button>
               <Button variant="ghost" className="h-14 px-10 bg-white/5 border border-white/10 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-white hover:text-slate-900 transition-all">
                  View Ecosystem Analytics <ArrowRight className="ml-2 w-4 h-4" />
               </Button>
            </div>
         </div>
         <Globe className="absolute top-0 right-0 p-12 w-96 h-96 opacity-5 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-1000 pointer-events-none" />
      </section>

    </div>
  )
}
