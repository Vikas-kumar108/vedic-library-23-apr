'use client'

import React from 'react'
import { CircleDot, Users, MessageSquare } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface CircleGridProps {
  circles: any[]
}

export function CircleGrid({ circles }: CircleGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {circles?.map((circle: any) => (
        <div key={circle.id} className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8 hover:border-violet-500/30 transition-all group text-left">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-violet-400">
              <CircleDot className="w-6 h-6" />
            </div>
            <Badge variant="outline" className="border-slate-800 text-slate-500 text-[8px] font-black uppercase tracking-widest px-2">{circle.type}</Badge>
          </div>
          <h3 className="text-xl font-serif font-bold italic text-slate-100 group-hover:text-violet-400 transition-colors">{circle.name}</h3>
          <p className="text-xs text-slate-500 mt-2 line-clamp-2">{circle.description}</p>
          
          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Users className="w-3 h-3 text-slate-600" />
                <span className="text-[10px] font-bold text-slate-400">{circle._count.members}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MessageSquare className="w-3 h-3 text-slate-600" />
                <span className="text-[10px] font-bold text-slate-400">{circle._count.posts}</span>
              </div>
            </div>
            <Button variant="ghost" className="text-violet-400 text-[10px] font-black uppercase tracking-widest hover:bg-violet-500/10 rounded-full">
              View Circle
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
