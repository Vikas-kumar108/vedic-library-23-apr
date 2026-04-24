"use client"

import React, { useState } from 'react'
import { Sparkles, CheckCircle, PenTool } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function DailyReflection() {
  const [reflection, setReflection] = useState('')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 space-y-8 relative overflow-hidden group">
      <div className="absolute top-0 right-0 size-32 bg-[#e67e22]/5 blur-3xl rounded-full -z-0" />
      
      <div className="flex items-center justify-between relative z-10">
        <div className="space-y-1">
          <div className="text-[10px] font-black text-[#e67e22] uppercase tracking-[0.2em] flex items-center gap-2">
            <Sparkles className="size-3" />
            Contemplation Corridor
          </div>
          <h3 className="text-3xl font-serif font-bold italic text-slate-900">Daily Reflection</h3>
        </div>
        <div className="size-14 rounded-2xl bg-[#fdfcf5] border border-slate-50 flex items-center justify-center text-[#e67e22]">
           <PenTool className="size-6" />
        </div>
      </div>

      <textarea
        value={reflection}
        onChange={(e) => setReflection(e.target.value)}
        placeholder="Capture the wisdom you realized in today's shastra study..."
        className="w-full h-40 p-8 bg-[#fdfcf5] rounded-[2rem] border border-slate-50 resize-none focus:outline-none focus:ring-4 focus:ring-[#e67e22]/5 text-slate-700 font-medium placeholder:text-slate-300 transition-all"
      />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
        <p className="text-xs text-slate-400 font-medium max-w-[240px] text-center sm:text-left">
          Your reflections are secured in the institutional vault to track your spiritual ascent.
        </p>

        <Button
          onClick={handleSave}
          disabled={!reflection.trim()}
          className={cn(
            "h-14 px-10 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl",
            saved ? "bg-green-500 hover:bg-green-600 text-white" : "bg-slate-900 hover:bg-[#e67e22] text-white"
          )}
        >
          {saved ? (
            <>
              <CheckCircle className="mr-2 size-4" />
              Realization Saved
            </>
          ) : (
            'Save Reflection'
          )}
        </Button>
      </div>
    </div>
  )
}

import { cn } from "@/lib/utils"
