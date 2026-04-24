'use client'

import React from 'react'
import { AlertCircle, FileText, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ApprovalQueueProps {
  pendingTransactions: any[]
}

export function ApprovalQueue({ pendingTransactions }: ApprovalQueueProps) {
  return (
    <aside className="space-y-8 text-left">
      <section className="bg-slate-900 p-10 rounded-[3rem] text-white space-y-6 relative overflow-hidden group border border-indigo-500/20 shadow-2xl shadow-indigo-500/10">
        <div className="relative z-10 space-y-6">
          <h2 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2">
            <AlertCircle className="w-4 h-4" /> Director Approval Queue
          </h2>
          <h3 className="text-2xl font-serif font-bold italic leading-tight">{pendingTransactions.length} Pending Approval</h3>
          <div className="space-y-4">
            {pendingTransactions.map((pt) => (
              <div key={pt.id} className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                <p className="text-xs font-bold">{pt.purpose}</p>
                <div className="flex gap-2 mt-4">
                  <Button className="h-8 flex-1 bg-indigo-600 text-[9px] font-black uppercase tracking-widest hover:bg-indigo-500">Approve</Button>
                  <Button variant="ghost" className="h-8 px-3 bg-white/5 text-[9px] hover:bg-white/10">Reject</Button>
                </div>
              </div>
            ))}
            {pendingTransactions.length === 0 && (
              <p className="text-xs text-white/40 italic">All transactions are audit-cleared.</p>
            )}
          </div>
        </div>
      </section>

      <div className="p-10 bg-slate-900/40 rounded-[3rem] border border-slate-900 space-y-6 group">
        <h3 className="text-xl font-serif font-bold italic text-slate-100 flex items-center gap-3">
          <FileText className="w-5 h-5 text-indigo-400" /> Audit Ready
        </h3>
        <p className="text-[11px] text-slate-500 italic leading-relaxed">Full institutional transparency mode enabled. Download signed ledgers for regulatory filing.</p>
        <Button variant="ghost" className="w-full h-12 bg-white text-slate-900 font-black text-[10px] uppercase tracking-widest rounded-xl shadow-sm hover:bg-slate-200 transition-all">
          Download Audit Ledger <Download className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </aside>
  )
}
