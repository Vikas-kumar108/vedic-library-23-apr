'use client'

import React from 'react'
import { 
  Calendar, 
  Clock, 
  Video, 
  Youtube, 
  MapPin, 
  Users, 
  Bell, 
  CheckCircle2, 
  Plus, 
  ExternalLink,
  ChevronRight
} from 'lucide-react'
import { Button, Badge } from '@/components'
import { useEvents } from '../hooks/useEvents'
import { cn } from '@/lib/utils'

/**
 * EventCalendar Component
 * Responsibility: Provide a high-end, chronological view of live spiritual sessions.
 * Purpose: Allows seekers to plan their weekly study and practice around live communal sessions (Sangha).
 */
export function EventCalendar() {
  const { events, isLoading, registerForEvent } = useEvents()

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <div className="space-y-12 animate-fade-in pb-24">
      {/* Calendar Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-slate-100">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
            <Calendar className="w-4 h-4" /> Live Gurukulam
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
            Upcoming <span className="text-primary italic">Sessions</span>
          </h1>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="rounded-xl border-slate-200 text-xs font-bold uppercase tracking-widest">
            Sync to Calendar
          </Button>
          <Button className="rounded-xl bg-slate-900 text-white text-xs font-bold uppercase tracking-widest">
            Suggest a Topic
          </Button>
        </div>
      </header>

      {/* Events Feed */}
      <div className="space-y-16">
        {events.map((event) => (
          <div key={event.id} className="grid lg:grid-cols-[200px_1fr] gap-12 group">
            {/* Date/Time Column */}
            <div className="space-y-2 pt-2">
              <div className="text-sm font-bold text-slate-900 font-serif">{formatDate(event.startTime)}</div>
              <div className="text-3xl font-bold text-primary tabular-nums">{formatTime(event.startTime)}</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Local Time (GMT+5:30)</div>
            </div>

            {/* Event Content Column */}
            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-soft group-hover:shadow-2xl group-hover:shadow-slate-200/50 transition-all flex flex-col md:flex-row gap-10">
              <div className="flex-1 space-y-6">
                <div className="flex flex-wrap gap-2">
                  <Badge className={cn(
                    "rounded-lg text-[8px] uppercase tracking-widest font-bold",
                    event.type === 'LIVE_SATSANG' ? 'bg-primary/5 text-primary' : 
                    event.type === 'WORKSHOP' ? 'bg-orange-50 text-orange-500' : 'bg-blue-50 text-blue-500'
                  )}>
                    {event.type.replace('_', ' ')}
                  </Badge>
                  <Badge variant="outline" className="rounded-lg text-[8px] uppercase tracking-widest font-bold border-slate-100 text-slate-400">
                    {event.category}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl font-serif font-bold text-slate-900 group-hover:text-primary transition-colors leading-tight">
                    {event.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed italic">
                    "{event.description}"
                  </p>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 overflow-hidden border border-slate-100">
                      <img src={event.host.avatar} alt={event.host.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{event.host.name}</div>
                      <div className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">{event.host.role}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    {event.platform === 'ZOOM' ? <Video className="w-4 h-4" /> : <Youtube className="w-4 h-4" />}
                    <span className="text-[10px] font-bold uppercase tracking-widest">{event.platform}</span>
                  </div>
                </div>
              </div>

              {/* Action Column */}
              <div className="md:w-64 flex flex-col justify-between items-end gap-6 md:border-l md:border-slate-50 md:pl-10">
                <div className="flex items-center gap-2 text-green-500">
                  {event.isRegistered && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full text-[10px] font-bold uppercase tracking-widest">
                      <CheckCircle2 className="w-3 h-3" /> Registered
                    </div>
                  )}
                </div>

                <div className="w-full space-y-3">
                  {event.isRegistered ? (
                    <Button className="w-full h-12 rounded-xl bg-slate-900 text-white font-bold group/btn">
                      Join Session <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => registerForEvent(event.id)}
                      className="w-full h-12 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20"
                    >
                      Register Now
                    </Button>
                  )}
                  <Button variant="ghost" className="w-full h-12 rounded-xl text-slate-400 text-[10px] font-bold uppercase tracking-widest hover:text-primary transition-colors">
                    Add to Google Calendar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Calendar Stats / Context */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-soft flex items-center gap-6">
          <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-900">1,240+</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Active Learners Live</div>
          </div>
        </div>
        <div className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-soft flex items-center gap-6">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-900">Weekly</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">New Wisdom Sessions</div>
          </div>
        </div>
        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white flex items-center justify-between group cursor-pointer hover:scale-[1.02] transition-all">
          <div className="space-y-1">
            <div className="text-sm font-bold">Past Replays</div>
            <div className="text-[10px] text-white/40 uppercase tracking-widest">View Archive</div>
          </div>
          <ChevronRight className="w-6 h-6 text-primary group-hover:translate-x-2 transition-transform" />
        </div>
      </div>
    </div>
  )
}
