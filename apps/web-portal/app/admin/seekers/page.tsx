'use client'

import React from 'react'
import { useUsers, useUserActions } from '@/hooks/generated'
import { Loader2, AlertCircle, Trash2, RefreshCcw, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * 🏛️ Seeker Management Dashboard (Example)
 * Responsibility: Demonstrate the use of generated hooks for high-fidelity UI binding.
 */
export default function SeekersPage() {
  const { data: seekers, loading, error, refresh } = useUsers()
  const { remove, isProcessing } = useUserActions()

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this seeker from the sanctuary?')) return
    const { error: deleteError } = await remove(id)
    if (deleteError) {
      alert(`Expulsion failed: ${deleteError}`)
    } else {
      refresh()
    }
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* 1. Header Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-serif font-bold text-slate-900 italic">
            Seeker <span className="text-primary">Registry</span>
          </h1>
          <p className="text-slate-500">Manage the digital identities of the institutional community.</p>
        </div>
        
        <button 
          onClick={() => refresh()}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all font-bold text-xs uppercase tracking-widest text-slate-600"
        >
          <RefreshCcw className={cn("size-4", loading && "animate-spin")} />
          Refresh
        </button>
      </div>

      {/* 2. Loading State */}
      {loading && seekers.length === 0 && (
        <div className="h-64 flex flex-col items-center justify-center gap-4 border-2 border-dashed border-slate-100 rounded-3xl">
          <Loader2 className="h-10 w-10 animate-spin text-primary/30" />
          <p className="font-serif italic text-slate-400 text-lg">Consulting the Akasha...</p>
        </div>
      )}

      {/* 3. Error State */}
      {error && (
        <div className="bg-rose-50 border border-rose-100 p-6 rounded-3xl flex items-start gap-4">
          <div className="p-2 bg-rose-100 text-rose-600 rounded-xl">
            <AlertCircle size={24} />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-rose-900">Epistemic Blockage</h3>
            <p className="text-rose-700 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* 4. Data Sanctuary (Table) */}
      {!loading && seekers.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Seeker Entity</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Institutional Roles</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Identity Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Initiated On</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {seekers.map((seeker) => (
                <tr key={seeker.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900">{seeker.email}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{seeker.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-wrap gap-1">
                      {seeker.roles.map(role => (
                        <span key={role} className="px-2 py-0.5 bg-primary/5 text-primary text-[9px] font-bold uppercase tracking-widest rounded-md border border-primary/10">
                          {role}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                      seeker.status === 'ACTIVE' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                    )}>
                      <div className={cn("size-1.5 rounded-full", seeker.status === 'ACTIVE' ? "bg-emerald-500" : "bg-amber-500")} />
                      {seeker.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-slate-500 text-sm">
                      {new Date(seeker.created_at).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button 
                      onClick={() => handleDelete(seeker.id)}
                      disabled={isProcessing}
                      className="p-2 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all disabled:opacity-30"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 5. Empty State */}
      {!loading && seekers.length === 0 && !error && (
        <div className="h-64 flex flex-col items-center justify-center gap-4 border-2 border-dashed border-slate-100 rounded-3xl">
          <Shield className="h-12 w-12 text-slate-200" />
          <p className="font-serif italic text-slate-400">The sanctuary is currently quiet.</p>
        </div>
      )}
    </div>
  )
}
