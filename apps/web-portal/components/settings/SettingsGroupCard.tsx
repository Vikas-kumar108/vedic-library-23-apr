'use client'

import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface SettingsItem {
  label: string
  icon: any
  href: string
  detail: string
}

interface SettingsGroupCardProps {
  group: {
    title: string
    description: string
    items: SettingsItem[]
  }
}

export function SettingsGroupCard({ group }: SettingsGroupCardProps) {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8 space-y-6 hover:bg-white/[0.05] transition-all text-left">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-white">{group.title}</h2>
        <p className="text-sm text-slate-500">{group.description}</p>
      </div>

      <div className="space-y-3">
        {group.items.map((item) => (
          <Link 
            key={item.label}
            href={item.href}
            className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/50 hover:bg-primary/5 transition-all group"
          >
            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-primary/30">
              <item.icon className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold text-white group-hover:text-primary transition-colors">{item.label}</div>
              <div className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{item.detail}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
