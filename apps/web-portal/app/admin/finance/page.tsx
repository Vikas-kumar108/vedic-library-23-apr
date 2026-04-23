import React from 'react'
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
  ChevronRight
} from 'lucide-react'
import { Button } from '@/components/atoms/button'
import { Badge } from '@/components/atoms/badge'
import { cn } from '@/lib/utils'
import { getTransactions, getFinancialAccounts } from './actions'
import { format } from 'date-fns'

/**
 * Financial Dharma Dashboard
 * Responsibility: Complete financial transparency, audit trails, and income/expense tracking.
 */

export default async function FinanceDashboard() {
  const transactions = await getTransactions()
  const accounts = await getFinancialAccounts()

  const totalBalance = accounts.reduce((acc, curr) => acc + Number(curr.balance), 0)

  const pendingTransactions = transactions.filter(t => t.status === 'PENDING')

  return (
    <div className="p-10 space-y-10 animate-in fade-in duration-700">
      
      {/* Header Section */}
      <header className="flex justify-between items-end border-b border-slate-100 pb-10">
        <div className="space-y-4">
           <h1 className="text-4xl font-serif font-bold text-slate-900 tracking-tight italic">Financial <span className="text-blue-600">Dharma</span></h1>
           <div className="flex items-center gap-4">
              <Badge variant="outline" className="h-8 px-4 rounded-full border-slate-200 text-slate-500 font-bold uppercase tracking-widest text-[9px]">
                Audit Integrity Active
              </Badge>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-green-500" /> Total Balance: {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(totalBalance)}
              </p>
           </div>
        </div>
        <div className="flex gap-4">
           <Button variant="outline" className="h-14 px-8 border-slate-200 text-slate-900 font-black text-xs uppercase tracking-widest rounded-2xl">
             <IndianRupee className="w-4 h-4 mr-2" /> Add Transaction
           </Button>
           <Button className="h-14 px-8 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl transition-all">
             <BarChart3 className="w-4 h-4 mr-2" /> Financial Reports
           </Button>
        </div>
      </header>

      {/* Account Overview Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {accounts.map((acc, i) => (
          <div key={i} className="p-8 bg-white border border-slate-100 rounded-[3rem] shadow-sm flex flex-col justify-between group hover:border-blue-200 transition-all">
             <div className="flex justify-between items-start">
                <div className={cn(
                   "w-12 h-12 rounded-2xl flex items-center justify-center",
                   acc.type === 'BANK' ? "bg-blue-50 text-blue-600" : "bg-orange-50 text-orange-600"
                )}>
                   {acc.type === 'BANK' ? <Banknote className="w-6 h-6" /> : <Wallet className="w-6 h-6" />}
                </div>
                <Badge variant="outline" className="text-[8px] font-black tracking-widest text-slate-400">
                  {acc.type}
                </Badge>
             </div>
             <div className="mt-6">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{acc.name}</p>
                <p className="text-2xl font-black text-slate-900 mt-1">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(acc.balance))}</p>
             </div>
          </div>
        ))}
      </div>

      {/* Main Journal + Audit Queue */}
      <div className="grid lg:grid-cols-[1fr_350px] gap-10">
        
        {/* Transaction Ledger */}
        <section className="space-y-6">
           <div className="flex items-center justify-between">
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] flex items-center gap-2">
                <History className="w-4 h-4 text-slate-400" /> Transaction Ledger
              </h2>
              <div className="flex items-center gap-3">
                 <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-300" />
                    <input type="text" placeholder="Search ledger..." className="h-9 pl-9 pr-4 bg-slate-50 border border-slate-100 rounded-xl text-[10px] outline-none" />
                 </div>
                 <Button variant="outline" className="h-9 px-4 rounded-xl border-slate-100 text-[10px] font-bold">
                    <Filter className="w-3 h-3 mr-2" /> Filter
                 </Button>
              </div>
           </div>

           <div className="bg-white border border-slate-100 rounded-[3rem] overflow-hidden shadow-sm">
              <table className="w-full text-left">
                 <thead>
                    <tr className="border-b border-slate-50">
                       <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Transaction Story</th>
                       <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Program Tag</th>
                       <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Account</th>
                       <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Amount</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                    {transactions.map((t) => (
                       <tr key={t.id} className="group hover:bg-slate-50/50 transition-colors cursor-pointer">
                          <td className="px-8 py-6">
                             <div className="flex items-center gap-4">
                                <div className={cn(
                                  "w-10 h-10 rounded-xl flex items-center justify-center",
                                  t.type === 'INCOME' ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                                )}>
                                   {t.type === 'INCOME' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownLeft className="w-4 h-4" />}
                                </div>
                                <div>
                                   <p className="text-sm font-bold text-slate-900">{t.purpose}</p>
                                   <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1 flex items-center gap-2 italic">
                                     <Clock className="w-3 h-3" /> {format(new Date(t.date), 'MMM d, yyyy')} • {t.recordedBy?.full_name || 'System'}
                                   </p>
                                </div>
                             </div>
                          </td>
                          <td className="px-8 py-6">
                             <Badge variant="outline" className="rounded-full px-3 py-1 bg-slate-50 text-[8px] font-bold border-slate-100">
                                {t.category}
                             </Badge>
                          </td>
                          <td className="px-8 py-6 text-xs font-bold text-slate-500">
                            {t.type === 'EXPENSE' ? t.sourceAccount?.name : t.destinationAccount?.name}
                          </td>
                          <td className="px-8 py-6 text-right">
                             <p className={cn(
                               "text-sm font-black",
                               t.type === 'INCOME' ? "text-green-600" : "text-red-600"
                             )}>{t.type === 'INCOME' ? '+' : '-'} {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(t.amount))}</p>
                             <div className="flex items-center justify-end gap-1 mt-1">
                                {t.status === 'APPROVED' ? <CheckCircle2 className="w-3 h-3 text-emerald-500" /> : <Clock className="w-3 h-3 text-orange-500" />}
                                <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">{t.status}</span>
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </section>

        {/* Right: Action Center */}
        <aside className="space-y-8">
           <section className="bg-slate-900 p-10 rounded-[3rem] text-white space-y-6 relative overflow-hidden group">
              <div className="relative z-10 space-y-6">
                 <h2 className="text-[10px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" /> Director Approval
                 </h2>
                 <h3 className="text-2xl font-serif font-bold italic leading-tight">{pendingTransactions.length} Transactions Pending</h3>
                 <div className="space-y-4">
                    {pendingTransactions.map((pt) => (
                      <div key={pt.id} className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                         <p className="text-xs font-bold">{pt.purpose}</p>
                         <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest mt-1">
                           {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(pt.amount))} • {pt.category}
                         </p>
                         <div className="flex gap-2 mt-4">
                            <Button className="h-8 flex-1 bg-blue-600 text-[9px] font-black uppercase tracking-widest">Approve</Button>
                            <Button variant="ghost" className="h-8 px-3 bg-white/5 text-[9px]">Reject</Button>
                         </div>
                      </div>
                    ))}
                    {pendingTransactions.length === 0 && (
                      <p className="text-xs text-white/40 italic">No transactions awaiting approval.</p>
                    )}
                 </div>
              </div>
           </section>

           <div className="p-10 bg-blue-50 rounded-[3rem] border border-blue-100 space-y-6 group">
              <h3 className="text-xl font-serif font-bold italic text-slate-900 flex items-center gap-3">
                 <FileText className="w-5 h-5 text-blue-600" /> Audit Ready
              </h3>
              <p className="text-[11px] text-slate-500 italic leading-relaxed">Download a full audit-ready transaction report with linked proofs and bill scans for your taxation officer.</p>
              <Button variant="ghost" className="w-full h-12 bg-white text-blue-600 font-black text-[10px] uppercase tracking-widest rounded-xl shadow-sm hover:shadow-xl transition-all">
                 Generate Audit Report <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
           </div>
        </aside>

      </div>
    </div>
  )
}
