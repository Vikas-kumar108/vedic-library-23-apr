'use client'

import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Sparkles, BookOpen, Quote, X, ChevronUp, ChevronDown } from 'lucide-react'
import { InstitutionalService } from '@/services/institutional-service'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

export function VedicPulse() {
  const pathname = usePathname()
  const [pulse, setPulse] = useState<any>(null)
  const [isVisible, setIsVisible] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const context = getContextFromPath(pathname)
    if (context) {
      fetchPulse(context)
    }
  }, [pathname])

  const getContextFromPath = (path: string) => {
    if (path.includes('/admin/finance')) return 'FINANCE'
    if (path.includes('/admin/assets')) return 'ASSETS'
    if (path.includes('/admin/human-capital')) return 'HUMAN_CAPITAL'
    if (path.includes('/admin/integrations')) return 'ECOSYSTEM'
    if (path.includes('/admin/content')) return 'CONTENT'
    return 'GOVERNANCE'
  }

  const fetchPulse = async (context: string) => {
    try {
      setLoading(true)
      const data = await InstitutionalService.getWisdomPulse(context)
      setPulse(data)
    } catch (error) {
      console.error('Pulse sync failed', error)
    } finally {
      setLoading(false)
    }
  }

  if (!pulse || !isVisible) return null

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-2xl">
      <AnimatePresence>
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className={cn(
            "relative bg-slate-950/80 backdrop-blur-2xl border border-indigo-500/30 rounded-[2rem] shadow-2xl shadow-indigo-500/20 p-6 overflow-hidden transition-all duration-500",
            isExpanded ? "max-h-[400px]" : "max-h-[120px]"
          )}
        >
          {/* Animated Glow Aura */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-indigo-500/5 animate-pulse" />
          
          <div className="relative z-10 flex items-start gap-6">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>

            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                   <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] flex items-center gap-2">
                     <BookOpen className="w-3 h-3" /> Wisdom Pulse • {pulse.shastra}
                   </p>
                   {!isExpanded && (
                     <p className="text-xs text-slate-300 font-bold italic mt-1 line-clamp-1">"{pulse.wisdom}"</p>
                   )}
                </div>
                <div className="flex items-center gap-2">
                   <button onClick={() => setIsExpanded(!isExpanded)} className="p-2 hover:bg-white/5 rounded-full text-slate-500">
                     {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                   </button>
                   <button onClick={() => setIsVisible(false)} className="p-2 hover:bg-white/5 rounded-full text-slate-500">
                     <X className="w-4 h-4" />
                   </button>
                </div>
              </div>

              {isExpanded && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                   <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                      <Quote className="w-4 h-4 text-indigo-500/40 mb-2" />
                      <p className="text-sm font-serif italic text-slate-100 leading-relaxed">{pulse.verse}</p>
                      <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mt-4">Reference: {pulse.slug}</p>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="w-1 h-10 bg-indigo-500 rounded-full" />
                      <p className="text-xs font-bold text-indigo-300 italic">"{pulse.wisdom}"</p>
                   </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
