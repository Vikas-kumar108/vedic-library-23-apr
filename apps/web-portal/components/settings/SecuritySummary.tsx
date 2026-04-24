'use client'

import React from 'react'
import { ShieldAlert } from 'lucide-react'

export function SecuritySummary() {
  return (
    <div className="bg-slate-900 border border-white/10 rounded-[32px] p-8 flex flex-col justify-between text-left">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <ShieldAlert className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold text-white">Security Integrity</h2>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400">Database Encryption</span>
            <span className="text-emerald-500 font-bold">AES-256</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400">Multi-Factor Auth</span>
            <span className="text-amber-500 font-bold">REQUIRED</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400">Audit Trail Retention</span>
            <span className="text-slate-200">PERMANENT</span>
          </div>
        </div>
      </div>
      
      <div className="mt-8 pt-8 border-t border-white/5">
        <button className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
          Run Institutional Health Check
        </button>
      </div>
    </div>
  )
}
