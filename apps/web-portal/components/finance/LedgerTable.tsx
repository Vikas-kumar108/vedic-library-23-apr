'use client'

import React from 'react'
import { History, Search, Filter, ArrowUpRight, ArrowDownLeft, Clock, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

interface LedgerTableProps {
  transactions: any[]
}

export function LedgerTable({ transactions }: LedgerTableProps) {
  return (
    <section className="space-y-6 text-left">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
          <History className="w-4 h-4 text-slate-600" /> Transaction Ledger
        </h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-600" />
            <input type="text" placeholder="Search ledger..." className="h-10 pl-9 pr-4 bg-slate-950 border border-slate-900 rounded-xl text-xs text-slate-300 outline-none focus:border-indigo-500 transition-colors" />
          </div>
          <Button variant="outline" className="h-10 px-4 rounded-xl border-slate-900 bg-slate-900/50 text-slate-400 text-xs font-bold">
            <Filter className="w-3 h-3 mr-2" /> Filter
          </Button>
        </div>
      </div>

      <div className="bg-slate-900/40 border border-slate-900 rounded-[3rem] overflow-hidden shadow-sm backdrop-blur-xl">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="px-8 py-6 text-[10px] font-black text-slate-600 uppercase tracking-widest">Transaction Story</th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-600 uppercase tracking-widest">Program Tag</th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-600 uppercase tracking-widest text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {transactions.map((t) => (
              <tr key={t.id} className="group hover:bg-white/5 transition-colors cursor-pointer">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center",
                      t.type === 'INCOME' ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
                    )}>
                      {t.type === 'INCOME' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownLeft className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-100">{t.purpose}</p>
                      <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1 flex items-center gap-2 italic">
                        <Clock className="w-3 h-3" /> {format(new Date(t.date), 'MMM d, yyyy')}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <Badge variant="outline" className="rounded-full px-3 py-1 bg-slate-800/50 text-[8px] font-bold border-slate-800 text-slate-400">
                    {t.category}
                  </Badge>
                </td>
                <td className="px-8 py-6 text-right">
                  <p className={cn(
                    "text-sm font-black",
                    t.type === 'INCOME' ? "text-emerald-400" : "text-rose-400"
                  )}>{t.type === 'INCOME' ? '+' : '-'} ₹{Number(t.amount).toLocaleString()}</p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    {t.status === 'APPROVED' ? <CheckCircle2 className="w-3 h-3 text-emerald-500" /> : <Clock className="w-3 h-3 text-amber-500" />}
                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">{t.status}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
