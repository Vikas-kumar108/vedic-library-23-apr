'use client'

import React from 'react'
import { Banknote, Wallet } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface Account {
  name: string
  balance: number
  type: string
}

interface AccountOverviewProps {
  accounts: Account[]
}

export function AccountOverview({ accounts }: AccountOverviewProps) {
  return (
    <div className="grid md:grid-cols-3 gap-6 text-left">
      {accounts.map((acc, i) => (
        <div key={i} className="p-8 bg-slate-900/40 border border-slate-900 rounded-[3rem] shadow-sm flex flex-col justify-between group hover:border-indigo-500/30 transition-all backdrop-blur-xl">
           <div className="flex justify-between items-start">
              <div className={cn(
                 "w-12 h-12 rounded-2xl flex items-center justify-center",
                 acc.type === 'BANK' ? "bg-indigo-500/10 text-indigo-400" : "bg-amber-500/10 text-amber-400"
              )}>
                 {acc.type === 'BANK' ? <Banknote className="w-6 h-6" /> : <Wallet className="w-6 h-6" />}
              </div>
              <Badge variant="outline" className="text-[8px] font-black tracking-widest text-slate-600 border-slate-800">
                {acc.type}
              </Badge>
           </div>
           <div className="mt-8">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{acc.name}</p>
              <p className="text-3xl font-black text-slate-100 mt-1">₹{acc.balance.toLocaleString()}</p>
           </div>
        </div>
      ))}
    </div>
  )
}
