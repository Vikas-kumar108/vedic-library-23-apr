'use client'

import React from 'react'
import { 
  Building2, 
  ArrowRight, 
  ShieldCheck, 
  LogOut, 
  Users,
  Search,
  Sparkles
} from 'lucide-react'
import { Button } from '@/components/atoms/button'
import { Badge } from '@/components/atoms/badge'
import { cn } from '@/lib/utils'

/**
 * Organization Selector
 * Responsibility: Allow users belonging to multiple tenants to choose their active context.
 */

const USER_ORGS = [
  { id: '1', name: 'Vedic Library Main', role: 'Director', members: '1.2k', type: 'Public Trust' },
  { id: '2', name: 'Gita Outreach Ranaghat', role: 'Trustee', members: '450', type: 'NGO' },
  { id: '3', name: 'Dharma Foundation', role: 'Advisor', members: '2.8k', type: 'Section 8' },
]

export default function SelectOrganization() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-10 font-sans">
      
      <div className="max-w-4xl w-full space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-1000">
         
         {/* Branding & Welcome */}
         <div className="text-center space-y-6">
            <div className="inline-flex w-16 h-16 bg-slate-900 rounded-3xl items-center justify-center text-white font-bold text-2xl shadow-2xl shadow-slate-300">
               V
            </div>
            <div className="space-y-2">
               <h1 className="text-5xl font-serif font-bold text-slate-900 tracking-tight italic">Choose your <span className="text-blue-600">Sanctuary.</span></h1>
               <p className="text-slate-400 text-lg font-bold uppercase tracking-[0.2em] italic">Select the organization you wish to manage today</p>
            </div>
         </div>

         {/* Organization Cards */}
         <div className="grid md:grid-cols-1 gap-6">
            {USER_ORGS.map((org) => (
               <div key={org.id} className="group p-8 bg-white border border-slate-100 rounded-[3rem] shadow-sm hover:shadow-2xl hover:border-blue-100 transition-all cursor-pointer flex items-center justify-between">
                  <div className="flex items-center gap-8">
                     <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
                        <Building2 className="w-10 h-10" />
                     </div>
                     <div>
                        <h3 className="text-2xl font-bold text-slate-900 leading-tight">{org.name}</h3>
                        <div className="flex items-center gap-3 mt-1">
                           <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-100 text-[9px] font-black tracking-widest px-3 py-1">
                              {org.role}
                           </Badge>
                           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic flex items-center gap-2">
                              {org.type} • <Users className="w-3 h-3" /> {org.members} Members
                           </p>
                        </div>
                     </div>
                  </div>
                  <Button variant="ghost" className="h-14 w-14 rounded-2xl bg-slate-50 border border-slate-100 text-slate-400 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all">
                     <ArrowRight className="w-6 h-6" />
                  </Button>
               </div>
            ))}
         </div>

         {/* Footer Actions */}
         <div className="flex justify-between items-center pt-10 border-t border-slate-200">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-500">
                  <ShieldCheck className="w-4 h-4" />
               </div>
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Signed in as vikas@vedic.com</p>
            </div>
            <button className="text-[10px] text-red-400 font-black uppercase tracking-widest flex items-center gap-2 hover:text-red-600 transition-colors">
               <LogOut className="w-4 h-4" /> Sign Out
            </button>
         </div>

      </div>

      {/* Decorative Intelligence */}
      <div className="fixed bottom-10 right-10 flex items-center gap-3 p-4 bg-white/50 backdrop-blur-xl border border-white/50 rounded-2xl shadow-xl">
         <Sparkles className="w-4 h-4 text-blue-400" />
         <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Multi-Tenant Engine v2.4 Active</p>
      </div>

    </div>
  )
}
