"use client"

import React from 'react'

export function RecentActivity() {
  const activities = [
    { id: 1, text: "New course 'Vedic Leadership' published", time: "2 minutes ago", type: "course" },
    { id: 2, text: "Seeker 'Arjun' achieved Sadhaka stage", time: "15 minutes ago", type: "user" },
    { id: 3, text: "Bhagavad Gita Chapter 4 updated", time: "1 hour ago", type: "shastra" },
    { id: 4, text: "Dāna contribution received: $500", time: "2 hours ago", type: "finance" },
    { id: 5, text: "New Seeker registration", time: "3 hours ago", type: "user" },
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'course': return 'bg-[#e67e22] shadow-[#e67e22]/50'
      case 'user': return 'bg-blue-500 shadow-blue-500/50'
      case 'shastra': return 'bg-purple-500 shadow-purple-500/50'
      case 'finance': return 'bg-green-500 shadow-green-500/50'
      default: return 'bg-slate-500 shadow-slate-500/50'
    }
  }

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-8 h-full">
      <h3 className="text-xl font-serif font-bold italic text-white mb-8">Real-Time Pulse</h3>
      <div className="space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4">
            <div className="relative mt-1.5 flex-shrink-0">
               <div className={`size-3 rounded-full ${getTypeColor(activity.type)} shadow-lg`} />
               {activity.id !== activities.length && (
                 <div className="absolute top-4 left-1/2 -translate-x-1/2 w-px h-10 bg-slate-800" />
               )}
            </div>
            <div className="flex-1 min-w-0 pb-6 border-b border-slate-800/50 last:border-0 last:pb-0">
              <div className="text-sm font-medium text-slate-300">{activity.text}</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-2">{activity.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
