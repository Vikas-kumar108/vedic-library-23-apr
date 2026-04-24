'use client'

import React from 'react'
import { TrendingUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface SeekerStreamProps {
  activities: any[]
}

export function SeekerStream({ activities }: SeekerStreamProps) {
  return (
    <div className="bg-slate-900/40 border border-slate-800 rounded-[3rem] overflow-hidden text-left">
      <div className="p-8 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          <h3 className="text-lg font-serif font-bold italic text-slate-100">Seeker Progress Stream</h3>
        </div>
        <Button variant="ghost" className="text-slate-500 text-[9px] font-black uppercase tracking-widest">View All Seekers</Button>
      </div>
      <div className="divide-y divide-slate-800">
        {activities?.map((activity: any) => (
          <div key={activity.id} className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 font-bold text-xs uppercase">
                {activity.user.profile?.full_name?.charAt(0) || 'S'}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-100">{activity.user.profile?.full_name || 'Anonymous Seeker'}</p>
                <p className="text-[10px] text-slate-500">Mastering: <span className="text-violet-400 italic font-bold">{activity.curve.title}</span></p>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-right">
                <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Current Step</p>
                <p className="text-[10px] font-bold text-slate-300">Section {activity.currentStepId ? '2' : '1'} Verified</p>
              </div>
              <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[9px] font-black px-3 py-1">In Progress</Badge>
            </div>
          </div>
        ))}
        {(!activities || activities.length === 0) && (
          <div className="p-20 text-center text-xs text-slate-600 italic">No spiritual progress logs recorded today.</div>
        )}
      </div>
    </div>
  )
}
