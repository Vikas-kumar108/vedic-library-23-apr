'use client'

import React, { useState, useEffect } from 'react'
import { 
  IndianRupee, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Wallet, 
  Banknote, 
  Search, 
  Plus, 
  History, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  FileText,
  Filter,
  BarChart3,
  ChevronRight,
  ShieldCheck,
  Lock,
  Download
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { toast } from 'sonner'
import { useFinance } from '@/hooks/use-finance'
import { useInstitutional } from '@/hooks/use-institutional'

export default function FinanceDashboard() {
  const { ledger, fetchLedger, loading: financeLoading, error: financeError } = useFinance()
  const { overview, fetchOverview, loading: instLoading, error: instError } = useInstitutional()

  // Mock Org ID
  const orgId = '5d97f5d9-7e5d-4d97-b5d9-7e5d4d97b5d9'

  useEffect(() => {
    fetchLedger(orgId)
    fetchOverview(orgId)
  }, [fetchLedger, fetchOverview, orgId])

  useEffect(() => {
    if (financeError || instError) {
      toast.error('Financial Dharma Sync Interrupted')
    }
  }, [financeError, instError])

  // Mock accounts for visualization (Can be moved to a service later)
  const accounts = [
    { name: 'SBI Institutional A/C', balance: 4500000, type: 'BANK' },
    { name: 'HDFC Grant Reserve', balance: 1200000, type: 'BANK' },
    { name: 'Petty Cash - Main Office', balance: 25000, type: 'CASH' },
  ]

  const loading = financeLoading || instLoading
  const transactions = ledger

  const totalBalance = accounts.reduce((acc, curr) => acc + Number(curr.balance), 0)
  const pendingTransactions = transactions.filter(t => t.status === 'PENDING')

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 p-10 space-y-10">
      
      {/* Premium Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-900 pb-10">
        <div className="space-y-4">
           <h1 className="text-4xl font-serif font-bold text-slate-100 tracking-tight italic">Financial <span className="text-indigo-500">Dharma</span></h1>
           <div className="flex items-center gap-4">
              <Badge variant="outline" className="h-8 px-4 rounded-full border-slate-800 bg-indigo-500/5 text-indigo-400 font-bold uppercase tracking-widest text-[9px]">
                Audit Integrity Active
              </Badge>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> Total Capital: ₹{totalBalance.toLocaleString()}
              </p>
           </div>
        </div>
        <div className="flex gap-4">
           <Button variant="outline" className="h-14 px-8 border-slate-800 bg-slate-900/50 text-slate-300 font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-slate-800">
             <Plus className="w-4 h-4 mr-2" /> Add Transaction
           </Button>
           <Button className="h-14 px-8 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-2xl shadow-indigo-500/20 transition-all">
             <BarChart3 className="w-4 h-4 mr-2" /> Financial Reports
           </Button>
        </div>
      </header>

      {/* Account Overview Cards */}
      <div className="grid md:grid-cols-3 gap-6">
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

      {/* Main Content Area: Tabs for Auditor and Admin */}
      <Tabs defaultValue="ledger" className="space-y-8">
        <TabsList className="bg-slate-900/50 border border-slate-800 p-1 rounded-2xl h-14">
          <TabsTrigger value="ledger" className="rounded-xl px-8 data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
            <History className="w-4 h-4 mr-2" /> Journal Ledger
          </TabsTrigger>
          <TabsTrigger value="compliance" className="rounded-xl px-8 data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
            <ShieldCheck className="w-4 h-4 mr-2" /> Compliance Vault
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ledger">
          <div className="grid lg:grid-cols-[1fr_400px] gap-10">
            {/* Transaction Ledger */}
            <section className="space-y-6">
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

            {/* Right: Approval & Audit Center */}
            <aside className="space-y-8">
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
          </div>
        </TabsContent>

        <TabsContent value="compliance">
          <ComplianceVault data={overview?.compliance} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
