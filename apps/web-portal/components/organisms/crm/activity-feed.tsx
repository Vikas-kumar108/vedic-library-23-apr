'use client'

import React from 'react'
import { 
  Camera, 
  MapPin, 
  Calendar, 
  Users, 
  ArrowRight,
  ExternalLink
} from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Social Activity Feed (Transparency Gallery)
 * Responsibility: Show the live impact of festivals and social work.
 */

interface Activity {
  id: string
  title: string
  description: string
  category: string
  date: string
  village: string
  images: string[]
}

const SAMPLE_ACTIVITIES: Activity[] = [
  {
    id: '1',
    title: 'Village Food Distribution (Prasadam)',
    description: 'Served over 500 plates of nutritious sanctified food to the local community in Ranaghat.',
    category: 'Outreach',
    date: 'April 20, 2026',
    village: 'Ranaghat',
    images: ['/api/placeholder/400/300']
  },
  {
    id: '2',
    title: 'Gita Jayanti Youth Festival',
    description: 'A vibrant festival for the village youth involving philosophy, drama, and collective kirtan.',
    category: 'Festival',
    date: 'April 15, 2026',
    village: 'Mayapur',
    images: ['/api/placeholder/400/300']
  }
]

export function ActivityFeed() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif font-bold text-slate-900 italic">Live <span className="text-orange-600">from the Field</span></h2>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Social impact, festivals, and activities</p>
        </div>
        <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-orange-600 transition-colors flex items-center gap-2">
          View Archive <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {SAMPLE_ACTIVITIES.map((activity) => (
          <div key={activity.id} className="group bg-white border border-slate-100 rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all">
            {/* Visual Header */}
            <div className="h-64 bg-slate-100 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10" />
               <img src={activity.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="" />
               <div className="absolute top-6 left-6 z-20">
                 <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-black text-white uppercase tracking-widest">
                   {activity.category}
                 </span>
               </div>
               <div className="absolute bottom-6 left-6 right-6 z-20 text-white space-y-1">
                 <div className="flex items-center gap-2 text-[10px] font-bold text-white/60 uppercase tracking-widest">
                   <MapPin className="w-3 h-3 text-orange-400" /> {activity.village}
                 </div>
                 <h3 className="text-xl font-bold">{activity.title}</h3>
               </div>
            </div>

            {/* Content Body */}
            <div className="p-8 space-y-6">
               <p className="text-sm text-slate-500 leading-relaxed italic">{activity.description}</p>
               <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                        <Calendar className="w-4 h-4" />
                     </div>
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{activity.date}</span>
                  </div>
                  <button className="w-10 h-10 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-orange-600 transition-all">
                     <ExternalLink className="w-4 h-4" />
                  </button>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
