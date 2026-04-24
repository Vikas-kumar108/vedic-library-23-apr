'use client'

import React from 'react'
import { Package, Settings, QrCode, Filter } from 'lucide-react'

interface AssetStatsProps {
  assets: any[]
}

export function AssetStats({ assets }: AssetStatsProps) {
  const stats = [
    { label: 'Total Assets', value: assets.length, icon: Package, color: 'text-indigo-400' },
    { label: 'Asset Value', value: `₹${assets.reduce((acc, curr) => acc + curr.value, 0).toLocaleString()}`, icon: Settings, color: 'text-emerald-400' },
    { label: 'Active', value: assets.filter(a => a.status === 'ACTIVE').length, icon: QrCode, color: 'text-blue-400' },
    { label: 'In Maintenance', value: assets.filter(a => a.status === 'MAINTENANCE').length, icon: Filter, color: 'text-amber-400' },
  ]

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-4 text-left">
      {stats.map((stat, i) => (
        <div key={i} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-md">
          <div className="mb-4 flex items-center justify-between">
            <div className={`rounded-lg bg-slate-800/50 p-2 ${stat.color}`}>
              <stat.icon className="h-5 w-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-100">{stat.value}</div>
          <div className="text-sm text-slate-400">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}
