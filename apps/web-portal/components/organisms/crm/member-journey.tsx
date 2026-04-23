'use client'

import React from 'react'
import { 
  Users, 
  Gift, 
  MapPin, 
  Calendar, 
  Award,
  ChevronRight,
  ArrowRight
} from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Member Journey Module
 * Responsibility: Show the personal history and support received by a member.
 */

interface MemberJourneyProps {
  member: any
}

export function MemberJourney({ member }: MemberJourneyProps) {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif font-bold text-slate-900 italic">My <span className="text-blue-600">Vedic Journey</span></h2>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Your heritage and institutional engagement</p>
        </div>
        <div className="px-4 py-2 bg-blue-50 border border-blue-100 rounded-full flex items-center gap-2">
           <Award className="w-4 h-4 text-blue-600" />
           <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Active Member</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Family Summary */}
        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm space-y-6">
           <div className="flex items-center justify-between">
             <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
               <Users className="w-4 h-4" /> My Family Connections
             </h3>
             <span className="text-[10px] font-bold text-blue-600 hover:underline cursor-pointer">View Map</span>
           </div>
           
           <div className="grid grid-cols-2 gap-4">
              {[
                { relation: 'Father', name: 'Ramesh Das', status: 'Linked' },
                { relation: 'Mother', name: 'Sita Das', status: 'Linked' },
              ].map((f, i) => (
                <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-50 group hover:border-blue-200 transition-all">
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{f.relation}</p>
                  <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{f.name}</p>
                </div>
              ))}
           </div>
        </div>

        {/* Support Received Summary */}
        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm space-y-6">
           <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
             <Gift className="w-4 h-4" /> Institutional Support
           </h3>
           <div className="space-y-3">
              {[
                { type: 'Education Aid', date: '10 Apr 2026', amount: 'Course Access' },
                { type: 'Village Program', date: '05 Apr 2026', amount: 'Prasadam' },
              ].map((s, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-slate-50/50 rounded-xl border border-slate-50">
                  <div>
                    <p className="text-xs font-bold text-slate-800">{s.type}</p>
                    <p className="text-[8px] text-slate-400 font-bold uppercase mt-0.5">{s.date}</p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Engagement Timeline */}
      <section className="bg-white border border-slate-100 rounded-[3rem] p-10 shadow-sm space-y-8">
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 shadow-sm">
               <Calendar className="w-6 h-6" />
            </div>
            <div>
               <h3 className="text-xl font-bold text-slate-900 tracking-tight">Recent Engagement</h3>
               <p className="text-xs text-slate-400 font-medium">Your participation in village and spiritual programs.</p>
            </div>
         </div>

         <div className="space-y-0 relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-100" />
            {[
              { title: 'Attended Mayapur Outreach', date: 'April 15, 2026', icon: MapPin },
              { title: 'Enrolled in Gita Fundamentals', date: 'April 12, 2026', icon: Award },
              { title: 'Profile Information Verified', date: 'April 10, 2026', icon: Users },
            ].map((event, idx) => (
              <div key={idx} className="relative pl-16 pb-10 group">
                <div className="absolute left-[1.125rem] top-1 w-3 h-3 rounded-full bg-white border-2 border-orange-500 z-10 group-hover:scale-125 transition-transform" />
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-50 group-hover:bg-white group-hover:shadow-xl group-hover:border-orange-200 transition-all">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-bold text-slate-900">{event.title}</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{event.date}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-200 group-hover:text-orange-500" />
                  </div>
                </div>
              </div>
            ))}
         </div>
      </section>
    </div>
  )
}
