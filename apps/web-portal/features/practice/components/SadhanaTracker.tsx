'use client'

import React, { useState } from 'react'
import { 
  CheckCircle2, 
  Flame, 
  BookOpen, 
  Circle, 
  Sparkles, 
  History,
  TrendingUp,
  Plus,
  Minus,
  Zap
} from 'lucide-react'
import { Button } from '@/components'
import { useSadhana } from '../hooks/useSadhana'
import { cn } from '@/lib/utils'

/**
 * SadhanaTracker Component
 * Responsibility: Provide the UI for logging and visualizing daily spiritual practice.
 * Purpose: Helps seekers maintain consistency (Sankalpa) in their spiritual path.
 */
export function SadhanaTracker() {
  const { stats, entries, logSadhana } = useSadhana()
  const [currentRounds, setCurrentRounds] = useState(16)
  const [readingTime, setReadingTime] = useState(30)

  return (
    <div className="grid lg:grid-cols-[1fr_400px] gap-12 animate-fade-in">
      
      {/* Main Logging Section */}
      <main className="space-y-10">
        <header className="space-y-2">
          <h2 className="text-3xl font-serif font-bold text-slate-900">Today's <span className="text-primary italic">Sādhanā</span></h2>
          <p className="text-sm text-slate-500 italic">"Steadfastness in practice leads to steadiness of heart."</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Chanting Log */}
          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-soft space-y-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform">
              <Sparkles className="w-24 h-24 text-primary" />
            </div>
            <div className="space-y-2 relative z-10">
              <div className="text-[10px] font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                <Circle className="w-3 h-3 fill-primary" /> Chanting Rounds
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Japa Meditation</h3>
            </div>

            <div className="flex items-center justify-center gap-8 py-4 relative z-10">
              <button 
                onClick={() => setCurrentRounds(Math.max(0, currentRounds - 1))}
                className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-primary transition-all active:scale-90"
              >
                <Minus className="w-5 h-5" />
              </button>
              <div className="text-6xl font-serif font-bold text-slate-900 tabular-nums">
                {currentRounds}
              </div>
              <button 
                onClick={() => setCurrentRounds(currentRounds + 1)}
                className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-primary transition-all active:scale-90"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <Button className="w-full h-14 rounded-2xl bg-slate-900 text-white font-bold relative z-10 shadow-xl shadow-slate-900/10">
              Log Japa
            </Button>
          </div>

          {/* Reading Tracker */}
          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-soft space-y-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform">
              <BookOpen className="w-24 h-24 text-orange-500" />
            </div>
            <div className="space-y-2 relative z-10">
              <div className="text-[10px] font-bold text-orange-500 uppercase tracking-widest flex items-center gap-2">
                <BookOpen className="w-3 h-3" /> Shastra Study
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Holy Texts</h3>
            </div>

            <div className="space-y-4 relative z-10">
              <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                <span>Reading Time</span>
                <span>{readingTime} Minutes</span>
              </div>
              <input 
                type="range" 
                min="0" max="120" step="5"
                value={readingTime}
                onChange={(e) => setReadingTime(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-full appearance-none cursor-pointer accent-orange-500"
              />
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center gap-2 cursor-pointer hover:bg-orange-50 transition-colors">
                  <span className="text-[10px] font-bold text-slate-900">Gita</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center gap-2 cursor-pointer hover:bg-orange-50 transition-colors">
                  <span className="text-[10px] font-bold text-slate-900">Bhagavatam</span>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full h-14 rounded-2xl border-slate-100 text-slate-400 font-bold relative z-10">
              Log Reading
            </Button>
          </div>
        </div>

        {/* Weekly Progress Overview */}
        <section className="bg-slate-900 p-10 rounded-[3rem] text-white space-y-8 shadow-2xl">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold flex items-center gap-3">
              <History className="w-5 h-5 text-primary" /> Weekly Consistency
            </h3>
            <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">April 16 — April 23</div>
          </div>
          <div className="flex justify-between items-end h-32 gap-2">
            {[65, 80, 45, 90, 70, 100, 85].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                <div 
                  className={cn(
                    "w-full rounded-t-xl transition-all duration-700 relative",
                    h === 100 ? "bg-primary shadow-lg shadow-primary/20" : "bg-white/10 group-hover:bg-white/20"
                  )} 
                  style={{ height: `${h}%` }}
                >
                  {h === 100 && <Zap className="absolute -top-6 left-1/2 -translate-x-1/2 w-4 h-4 text-primary animate-pulse" />}
                </div>
                <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest group-hover:text-white/40 transition-colors">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Sidebar: Stats & Streaks */}
      <aside className="space-y-8">
        {/* Streak Card */}
        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-soft space-y-6 text-center">
          <div className="w-20 h-20 bg-orange-100 rounded-[2rem] flex items-center justify-center mx-auto text-orange-600 shadow-lg shadow-orange-100">
            <Flame className="w-10 h-10 fill-current animate-bounce" />
          </div>
          <div className="space-y-1">
            <div className="text-5xl font-serif font-bold text-slate-900 tracking-tight">{stats?.currentStreak || 0}</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Day Streak</div>
          </div>
          <p className="text-xs text-slate-500 italic">"Your determination is inspiring others in the Mumbai Sangha."</p>
          <div className="pt-4 border-t border-slate-50 grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-bold text-slate-900">{stats?.bestStreak || 0}</div>
              <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Best Streak</div>
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">{stats?.totalRounds || 0}</div>
              <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Total Rounds</div>
            </div>
          </div>
        </div>

        {/* Milestone Card */}
        <div className="bg-primary p-10 rounded-[3rem] text-white space-y-6 shadow-2xl shadow-primary/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:scale-125 transition-transform">
            <TrendingUp className="w-24 h-24" />
          </div>
          <div className="relative z-10 space-y-4">
            <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Next Milestone</div>
            <h3 className="text-xl font-bold font-serif leading-tight">Complete 2000 Rounds to unlock "Venerable Seeker" status</h3>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-white w-3/4 rounded-full" />
            </div>
            <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">160 Rounds Left</div>
          </div>
        </div>
      </main>

    </div>
  )
}
