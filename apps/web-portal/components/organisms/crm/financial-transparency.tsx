'use client'

import React from 'react'
import { 
  Heart, 
  ArrowUpRight, 
  PieChart, 
  Wallet, 
  Target,
  ArrowRight,
  Package,
  CheckCircle2
} from 'lucide-react'
import { Button } from '@/components/atoms/button'
import { cn } from '@/lib/utils'

/**
 * Donor Transparency Module
 * Responsibility: Show exactly how funds were utilized.
 */

interface TransparencyProps {
  contributions: any[]
}

export function FinancialTransparency({ contributions }: TransparencyProps) {
  const totalDonated = contributions.reduce((acc, c) => acc + Number(c.amount), 0)
  
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif font-bold text-slate-900 italic">Financial <span className="text-emerald-600">Transparency</span></h2>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Real-time utilization of your seva</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Seva</p>
          <p className="text-2xl font-black text-slate-900">₹{totalDonated.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { label: 'Utilized Funds', value: '82%', icon: Target, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'Project Growth', value: '+14%', icon: ArrowUpRight, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Transparency Score', value: 'A+', icon: Shield, color: 'text-orange-500', bg: 'bg-orange-50' },
        ].map((stat, i) => (
          <div key={i} className="p-6 bg-white border border-slate-100 rounded-[2rem] shadow-sm flex items-center gap-4">
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", stat.bg, stat.color)}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{stat.label}</p>
              <p className="text-xl font-black text-slate-900 mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* In-Kind Impact Section */}
      <div className="bg-white border border-slate-100 rounded-[3rem] p-10 space-y-8 shadow-sm">
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 shadow-sm">
               <Package className="w-6 h-6" />
            </div>
            <div>
               <h3 className="text-xl font-bold text-slate-900 tracking-tight">Material (In-Kind) Impact</h3>
               <p className="text-xs text-slate-400 font-medium">Physical items contributed and utilized in the field.</p>
            </div>
         </div>

         <div className="grid md:grid-cols-2 gap-6">
            {[
              { item: 'Srimad Bhagavatam Sets', qty: '10 Sets', date: 'April 18, 2026', status: 'Distributed to Library' },
              { item: 'Fine Rice (Sona Masuri)', qty: '50 Kg', date: 'April 12, 2026', status: 'Utilized in Prasadam Seva' },
            ].map((ik, i) => (
              <div key={i} className="p-5 bg-slate-50 border border-slate-50 rounded-2xl flex justify-between items-center group hover:bg-white hover:shadow-xl hover:border-amber-200 transition-all">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-amber-500 shadow-sm">
                      <CheckCircle2 className="w-5 h-5" />
                   </div>
                   <div>
                      <p className="text-sm font-bold text-slate-800">{ik.item}</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{ik.date}</p>
                   </div>
                </div>
                <div className="text-right">
                   <p className="text-xs font-black text-slate-900">{ik.qty}</p>
                   <p className="text-[8px] font-black text-amber-600 uppercase tracking-widest mt-0.5">{ik.status}</p>
                </div>
              </div>
            ))}
         </div>
      </div>

      <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden group shadow-2xl">
        <div className="relative z-10 grid md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] border border-white/5">
              Live Project Tracking
            </div>
            <h3 className="text-3xl font-serif font-bold italic leading-tight">Where your money goes.</h3>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm">Every rupee is tracked from the moment of donation to its final utility in our village projects.</p>
            <Button className="h-12 px-8 rounded-xl bg-white text-slate-900 font-black text-xs uppercase tracking-widest shadow-xl group/btn">
              Download Full Audit <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-all" />
            </Button>
          </div>
          
          <div className="space-y-4">
             {[
               { project: 'Mayapur School Building', amount: '₹4,500', use: 'Construction Material', status: '80% Utilized' },
               { project: 'Daily Prasadam Seva', amount: '₹2,000', use: 'Food Logistics', status: '100% Utilized' },
               { project: 'Vedic Library Digitization', amount: '₹1,500', use: 'Cloud Storage', status: '20% Utilized' },
             ].map((p, idx) => (
               <div key={idx} className="p-5 bg-white/5 border border-white/5 rounded-2xl flex justify-between items-center group/item hover:bg-white/10 transition-all">
                 <div>
                   <p className="text-xs font-bold text-white group-hover/item:text-emerald-400 transition-colors">{p.project}</p>
                   <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-0.5">{p.use}</p>
                 </div>
                 <div className="text-right">
                   <p className="text-xs font-black text-white">{p.amount}</p>
                   <p className="text-[8px] font-black text-emerald-500 uppercase tracking-widest mt-0.5">{p.status}</p>
                 </div>
               </div>
             ))}
          </div>
        </div>
        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
           <Wallet className="w-64 h-64" />
        </div>
      </div>
    </div>
  )
}

function Shield(props: any) {
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
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
  )
}
