'use client'

import React, { useEffect } from 'react'
import { 
  Plus, 
  BarChart3, 
  History, 
  ShieldCheck
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ComplianceVault } from './components/ComplianceVault'
import { toast } from 'sonner'
import { useFinance } from '@/hooks/use-finance'
import { useInstitutional } from '@/hooks/use-institutional'
import { AccountOverview } from '@/components/finance/AccountOverview'
import { LedgerTable } from '@/components/finance/LedgerTable'
import { ApprovalQueue } from '@/components/finance/ApprovalQueue'

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

  // Mock accounts for visualization
  const accounts = [
    { name: 'SBI Institutional A/C', balance: 4500000, type: 'BANK' },
    { name: 'HDFC Grant Reserve', balance: 1200000, type: 'BANK' },
    { name: 'Petty Cash - Main Office', balance: 25000, type: 'CASH' },
  ]

  const loading = financeLoading || instLoading
  const transactions = ledger
  const totalBalance = accounts.reduce((acc, curr) => acc + Number(curr.balance), 0)
  const pendingTransactions = transactions.filter(t => t.status === 'PENDING')

  if (loading && !ledger.length) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 p-10 space-y-10">
      
      {/* 1. Finance Header */}
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

      {/* 2. Modular Account Overview */}
      <AccountOverview accounts={accounts} />

      {/* 3. Main Content Area */}
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
            {/* 4. Modular Ledger Table */}
            <LedgerTable transactions={transactions} />

            {/* 5. Modular Approval Queue */}
            <ApprovalQueue pendingTransactions={pendingTransactions} />
          </div>
        </TabsContent>

        <TabsContent value="compliance">
          <ComplianceVault data={overview?.compliance} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
