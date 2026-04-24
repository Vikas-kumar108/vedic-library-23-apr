"use client"

import React from 'react'
import { Plus, BookOpen, Layers, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function QuickActions() {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-8">
      <h3 className="text-xl font-serif font-bold italic text-white mb-6">Quick Manifestations</h3>
      <div className="space-y-3">
        <ActionButton label="Add Shastra" icon={BookOpen} color="text-blue-400" bg="bg-blue-400/10" />
        <ActionButton label="Build Course" icon={Layers} color="text-[#e67e22]" bg="bg-[#e67e22]/10" />
        <ActionButton label="Publish Article" icon={FileText} color="text-green-400" bg="bg-green-400/10" />
      </div>
    </div>
  )
}

function ActionButton({ label, icon: Icon, color, bg }: { label: string, icon: any, color: string, bg: string }) {
  return (
    <Button 
      variant="ghost" 
      className="w-full flex items-center justify-start gap-4 h-16 px-6 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-800/50 transition-all group"
    >
      <div className={`size-10 rounded-xl ${bg} ${color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
        <Icon className="size-5" />
      </div>
      <span className="text-xs font-black uppercase tracking-widest text-slate-300 group-hover:text-white">{label}</span>
      <Plus className="ml-auto size-4 text-slate-600 group-hover:text-white transition-colors" />
    </Button>
  )
}
