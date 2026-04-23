'use client'

import React from 'react'
import { 
  Users, 
  MapPin, 
  ShieldCheck, 
  Compass, 
  Search, 
  ArrowRight,
  Plus,
  Info
} from 'lucide-react'
import { Button, Badge } from '@/components'
import { useCircles } from '../hooks/useCircles'
import { cn } from '@/lib/utils'

/**
 * CircleDirectory Component
 * Responsibility: Provide a high-end, searchable directory of micro-communities.
 * Purpose: Helps seekers find their 'Sangha' (intimate community) based on geography or interest.
 */
export function CircleDirectory() {
  const { circles, isLoading, joinCircle } = useCircles()

  return (
    <div className="space-y-12 animate-fade-in pb-24">
      {/* Directory Header */}
      <header className="text-center space-y-6 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">Community <span className="text-primary italic">Circles</span></h1>
        <p className="text-slate-500 italic leading-relaxed">
          "Intimacy is the foundation of growth. Find a small group where you can study, reflect, and share your realizations."
        </p>
        
        <div className="relative group max-w-md mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
          <input 
            type="text" 
            placeholder="Find by city or topic..." 
            className="w-full h-12 pl-12 pr-4 rounded-2xl border border-slate-100 bg-white shadow-soft focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all text-sm"
          />
        </div>
      </header>

      {/* Categories Layer */}
      <div className="flex justify-center gap-4">
        {['All Circles', 'Regional', 'Study Groups', 'Mentor Circles'].map(c => (
          <button key={c} className="px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-primary transition-all">
            {c}
          </button>
        ))}
      </div>

      {/* Circles Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {circles.map((circle) => (
          <div key={circle.id} className="group bg-white rounded-[3rem] border border-slate-100 shadow-soft hover:shadow-2xl hover:shadow-slate-200/50 transition-all p-8 flex flex-col">
            <div className="flex items-start justify-between mb-6">
              <div className="w-16 h-16 rounded-[1.5rem] bg-slate-50 flex items-center justify-center border border-slate-50 overflow-hidden shadow-sm">
                <img src={circle.avatar} alt={circle.name} className="w-full h-full object-cover" />
              </div>
              <Badge className={cn(
                "rounded-lg text-[8px] uppercase tracking-widest font-bold",
                circle.type === 'REGIONAL' ? 'bg-blue-50 text-blue-500 border-blue-100' :
                circle.type === 'MENTOR_CIRCLE' ? 'bg-primary/5 text-primary border-primary/10' : 'bg-orange-50 text-orange-500 border-orange-100'
              )}>
                {circle.type}
              </Badge>
            </div>

            <div className="space-y-3 mb-8 flex-1">
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">{circle.name}</h3>
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <Users className="w-3 h-3" /> {circle.memberCount} Members
                {circle.location && <span className="flex items-center gap-1 ml-2"><MapPin className="w-3 h-3" /> {circle.location}</span>}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed italic line-clamp-3">
                "{circle.description}"
              </p>
            </div>

            <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
              {circle.isJoined ? (
                <div className="flex items-center gap-2 text-green-500 font-bold text-[10px] uppercase tracking-widest">
                  <ShieldCheck className="w-4 h-4" /> Member
                </div>
              ) : (
                <Button 
                  onClick={() => joinCircle(circle.id)}
                  size="sm" 
                  className="rounded-xl h-10 px-6 bg-slate-900 text-white"
                >
                  Join Circle
                </Button>
              )}
              <button className="p-2 text-slate-300 hover:text-primary transition-all">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}

        {/* Suggest a Circle Card */}
        <div className="group bg-slate-50 rounded-[3rem] border border-dashed border-slate-200 p-8 flex flex-col items-center justify-center text-center space-y-4 hover:border-primary/40 transition-all">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-slate-300 group-hover:text-primary transition-colors">
            <Plus className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-slate-900">Start a Local Sangha</h4>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">Create a circle for your city</p>
          </div>
          <Button variant="ghost" className="text-xs text-primary font-bold">Propose Circle →</Button>
        </div>
      </div>

      {/* Intimacy Context Box */}
      <div className="bg-primary/5 border border-primary/10 p-10 rounded-[4rem] flex flex-col md:flex-row items-center gap-10">
        <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center text-primary flex-shrink-0">
          <Info className="w-10 h-10" />
        </div>
        <div className="space-y-4">
          <h4 className="text-2xl font-serif font-bold text-slate-900">The Power of Small Groups</h4>
          <p className="text-slate-600 leading-relaxed italic">
            "By associating with those who are like-minded and more advanced, the seeker's realization is accelerated. Circles are designed to be safe, intimate, and focused spaces for your spiritual evolution."
          </p>
        </div>
      </div>
    </div>
  )
}
