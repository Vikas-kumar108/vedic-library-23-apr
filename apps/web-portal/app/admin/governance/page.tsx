'use client'

import React from 'react'
import { 
  Shield, 
  FileCheck, 
  Clock, 
  Users, 
  Plus, 
  Search, 
  AlertTriangle, 
  Share2,
  Lock,
  ChevronRight,
  ExternalLink,
  Calendar
} from 'lucide-react'
import { Button } from '@/components/atoms/button'
import { Badge } from '@/components/atoms/badge'
import { cn } from '@/lib/utils'

/**
 * Institutional Governance Dashboard
 * Responsibility: Manage Organizations, Compliances, and Legal Vaults.
 */

const ORGANIZATIONS = [
  { id: '1', name: 'Vedic Wisdom Trust', type: 'Public Trust', status: 'Active', compliance: '92%' },
  { id: '2', name: 'Dharma Outreach NGO', type: 'NGO', status: 'Audit Pending', compliance: '75%' }
]

const UPCOMING_COMPLIANCE = [
  { id: '1', name: '12AB Renewal', type: 'Tax', due: '15 May 2026', status: 'URGENT', responsible: 'Amit (Accountant)' },
  { id: '2', name: 'Annual Audit Filing', type: 'Financial', due: '30 Jun 2026', status: 'UPCOMING', responsible: 'Suresh (Director)' },
  { id: '3', name: 'CSR-1 Filing', type: 'Regulatory', due: '10 May 2026', status: 'CRITICAL', responsible: 'Amit (Accountant)' }
]

export default function GovernanceDashboard() {
  return (
    <div className="p-10 space-y-10 animate-in fade-in duration-700">
      
      {/* Header Section */}
      <header className="flex justify-between items-end border-b border-slate-100 pb-10">
        <div className="space-y-4">
           <h1 className="text-4xl font-serif font-bold text-slate-900 tracking-tight italic">Institutional <span className="text-blue-600">Governance</span></h1>
           <div className="flex items-center gap-4">
              <Badge variant="outline" className="h-8 px-4 rounded-full border-slate-200 text-slate-500 font-bold uppercase tracking-widest text-[9px]">
                Multi-Org Management Active
              </Badge>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
                <Lock className="w-3 text-blue-500" /> Vault Security: High
              </p>
           </div>
        </div>
        <div className="flex gap-4">
           <Button variant="outline" className="h-14 px-8 border-slate-200 text-slate-900 font-black text-xs uppercase tracking-widest rounded-2xl shadow-sm">
             <Plus className="w-4 h-4 mr-2" /> Add Organization
           </Button>
           <Button className="h-14 px-8 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl transition-all">
             <Share2 className="w-4 h-4 mr-2" /> Generate CSR Link
           </Button>
        </div>
      </header>

      {/* Main Grid: Compliance + Organizations */}
      <div className="grid lg:grid-cols-[1fr_400px] gap-10">
        
        {/* LEFT: COMPLIANCE HEARTBEAT */}
        <div className="space-y-10">
           <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-500" /> Compliance Timeline
                </h2>
                <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">View Calendar</button>
              </div>

              <div className="space-y-4">
                 {UPCOMING_COMPLIANCE.map((c) => (
                    <div key={c.id} className="p-6 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm flex items-center justify-between group hover:border-blue-200 transition-all">
                       <div className="flex items-center gap-6">
                          <div className={cn(
                            "w-14 h-14 rounded-2xl flex items-center justify-center",
                            c.status === 'CRITICAL' ? "bg-red-50 text-red-500" : "bg-blue-50 text-blue-500"
                          )}>
                             <Calendar className="w-6 h-6" />
                          </div>
                          <div>
                             <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-slate-900">{c.name}</span>
                                <Badge className={cn(
                                  "text-[8px] font-black tracking-widest",
                                  c.status === 'CRITICAL' ? "bg-red-500" : "bg-blue-500"
                                )}>{c.status}</Badge>
                             </div>
                             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 flex items-center gap-2">
                               <Users className="w-3 h-3" /> Responsible: {c.responsible}
                             </p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Due Date</p>
                          <p className="text-sm font-black text-slate-900">{c.due}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </section>

           {/* Organizations Registry */}
           <section className="space-y-6">
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em]">Institutional Registry</h2>
              <div className="grid md:grid-cols-2 gap-6">
                 {ORGANIZATIONS.map((org) => (
                    <div key={org.id} className="p-8 bg-slate-50 border border-slate-100 rounded-[3rem] space-y-6 group hover:bg-white hover:shadow-2xl transition-all">
                       <div className="flex justify-between items-start">
                          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-900 shadow-sm">
                             <Shield className="w-6 h-6" />
                          </div>
                          <Badge variant="outline" className="rounded-full px-3 py-1 bg-white text-[8px] font-black uppercase tracking-widest text-emerald-600 border-emerald-100">
                             {org.status}
                          </Badge>
                       </div>
                       <div>
                          <h3 className="text-xl font-bold text-slate-900 leading-tight">{org.name}</h3>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{org.type}</p>
                       </div>
                       <div className="pt-4 border-t border-slate-200/50 flex justify-between items-center">
                          <div>
                             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Compliance</p>
                             <p className="text-xs font-black text-slate-900">{org.compliance}</p>
                          </div>
                          <Button size="icon" variant="ghost" className="rounded-full hover:bg-blue-50 hover:text-blue-600">
                             <ChevronRight className="w-5 h-5" />
                          </Button>
                       </div>
                    </div>
                 ))}
              </div>
           </section>
        </div>

        {/* RIGHT: DIGITAL VAULT PREVIEW */}
        <aside className="space-y-10">
           <section className="bg-slate-900 p-10 rounded-[3rem] text-white space-y-8 relative overflow-hidden group">
              <div className="relative z-10 space-y-6">
                 <div className="flex items-center justify-between">
                    <h2 className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Secure Document Vault</h2>
                    <Lock className="w-4 h-4 text-blue-400" />
                 </div>
                 <h3 className="text-2xl font-serif font-bold italic leading-tight">Digital Locker for Legal Records</h3>
                 <div className="space-y-4">
                    {[
                      { name: 'Trust Deed.pdf', status: 'Valid', category: 'Registration' },
                      { name: '80G_Certificate.pdf', status: 'Expires in 2m', category: 'Tax' },
                      { name: 'Audit_Report_2024.pdf', status: 'Valid', category: 'Financial' },
                    ].map((doc, i) => (
                      <div key={i} className="flex justify-between items-center p-4 bg-white/5 border border-white/5 rounded-2xl group/item hover:bg-white/10 transition-all">
                         <div className="flex items-center gap-3">
                            <FileCheck className="w-4 h-4 text-blue-400" />
                            <div>
                               <p className="text-xs font-bold text-white group-hover/item:text-blue-400 transition-colors">{doc.name}</p>
                               <p className="text-[8px] text-white/40 font-bold uppercase tracking-widest">{doc.category}</p>
                            </div>
                         </div>
                         <span className={cn(
                           "text-[8px] font-black uppercase tracking-widest",
                           doc.status.includes('Expires') ? "text-orange-400" : "text-emerald-400"
                         )}>{doc.status}</span>
                      </div>
                    ))}
                 </div>
                 <Button variant="ghost" className="w-full h-12 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all">
                    Enter Secure Vault
                 </Button>
              </div>
           </section>

           {/* Shared Access Intelligence */}
           <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-soft space-y-6">
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                 <Share2 className="w-4 h-4 text-blue-600" /> Shared Access
              </h2>
              <div className="p-4 bg-blue-50 rounded-2xl space-y-3">
                 <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">Active Shared Link</p>
                 <div className="flex justify-between items-center">
                    <p className="text-xs font-bold text-slate-900 truncate max-w-[150px]">csr_partner_access_v4</p>
                    <Badge className="bg-white text-blue-600 text-[8px]">Expires in 4h</Badge>
                 </div>
                 <div className="pt-2 flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 bg-white"><ExternalLink className="w-3 h-3 text-slate-400" /></Button>
                    <Button variant="ghost" className="h-8 flex-1 bg-white text-[9px] font-bold">Manage Access</Button>
                 </div>
              </div>
           </section>
        </aside>
      </div>
    </div>
  )
}
