'use client'

import React from 'react'
import { 
  CreditCard, 
  Search, 
  Download, 
  ArrowUpRight, 
  ArrowDownLeft, 
  CheckCircle2, 
  Clock,
  Filter,
  DollarSign
} from 'lucide-react'
import { Button } from '@/components/atoms/button'
import { Badge } from '@/components/atoms/badge'
import { cn } from '@/lib/utils'

/**
 * Admin Payments Page
 * Responsibility: Track financial health and membership transactions.
 * Purpose: Provides a ledger for seeker upgrades and platform revenue.
 */
export default function AdminPaymentsPage() {
  const transactions = [
    { id: '1', user: 'Nitai Das', amount: '₹1,200', plan: 'PRACTITIONER', status: 'SUCCESS', date: '2026-04-10' },
    { id: '2', user: 'Radha K.', amount: '₹2,500', plan: 'SCHOLAR', status: 'SUCCESS', date: '2026-04-12' },
    { id: '3', user: 'Shiva M.', amount: '₹0', plan: 'SEEKER', status: 'FREE', date: '2026-04-15' },
  ]

  return (
    <div className="p-10 space-y-10 max-w-7xl mx-auto animate-fade-in">
      <header className="flex items-end justify-between border-b border-slate-200 pb-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                <DollarSign className="w-5 h-5" />
             </div>
             <h1 className="text-4xl font-serif font-bold text-slate-900">Financial <span className="text-primary italic">Ledger</span></h1>
          </div>
          <p className="text-sm text-slate-500 italic">Audit seeker transactions and platform growth.</p>
        </div>
        <Button variant="outline" className="h-12 rounded-xl px-6 border-slate-200">
          <Download className="w-4 h-4 mr-2" /> Export CSV
        </Button>
      </header>

      {/* REVENUE OVERVIEW */}
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { label: 'Monthly Revenue', value: '₹4.2L', trend: '+15%', color: 'text-green-600' },
          { label: 'Active Subscriptions', value: '1,240', trend: '+8%', color: 'text-blue-600' },
          { label: 'Conversion Rate', value: '12.4%', trend: '+2%', color: 'text-primary' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-soft">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{stat.label}</div>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
              <div className={cn("text-[10px] font-bold px-2 py-1 rounded-full", stat.color, "bg-opacity-10 bg-current")}>
                {stat.trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* TRANSACTIONS TABLE */}
      <section className="bg-white rounded-[3rem] border border-slate-100 shadow-soft overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
           <h2 className="text-xl font-bold text-slate-900">Recent Transactions</h2>
           <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" placeholder="Search..." className="h-10 pl-10 pr-4 bg-slate-50 rounded-xl border-none text-xs outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
              </div>
              <Button size="icon" variant="ghost" className="h-10 w-10 rounded-xl bg-slate-50"><Filter className="w-4 h-4 text-slate-400" /></Button>
           </div>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Seeker</th>
              <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Plan</th>
              <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Amount</th>
              <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-8 py-5 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {transactions.map((tx) => (
              <tr key={tx.id} className="group hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-6">
                  <div className="font-bold text-slate-900">{tx.user}</div>
                  <div className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">{tx.date}</div>
                </td>
                <td className="px-8 py-6">
                   <Badge variant="outline" className="rounded-lg text-[9px] border-slate-100 text-slate-500 font-bold">{tx.plan}</Badge>
                </td>
                <td className="px-8 py-6 font-bold text-slate-900">{tx.amount}</td>
                <td className="px-8 py-6">
                   <div className="flex items-center gap-2">
                      {tx.status === 'SUCCESS' ? <ArrowUpRight className="w-4 h-4 text-green-500" /> : <ArrowDownLeft className="w-4 h-4 text-slate-300" />}
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-widest",
                        tx.status === 'SUCCESS' ? "text-green-600" : "text-slate-400"
                      )}>
                        {tx.status}
                      </span>
                   </div>
                </td>
                <td className="px-8 py-6 text-right">
                   <button className="p-2 hover:bg-white rounded-xl shadow-sm border border-slate-100 text-slate-400 opacity-0 group-hover:opacity-100 transition-all">
                      <MoreVertical className="w-4 h-4" />
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}
