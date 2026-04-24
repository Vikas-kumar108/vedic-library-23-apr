'use client'

import React from 'react'
import Link from 'next/link'
import { TrendingUp, ArrowRight, BookOpen } from 'lucide-react'
import { Button } from '@/components/atoms/button'

interface WisdomRecommendationProps {
  recommendations: any[]
  loading: boolean
  userStage: string
}

export function WisdomRecommendation({ recommendations, loading, userStage }: WisdomRecommendationProps) {
  if (loading) {
    return (
      <div className="h-64 bg-slate-900 rounded-[3rem] animate-pulse flex items-center justify-center text-slate-700 font-serif italic text-xl">
        Channeling Cosmic Insights...
      </div>
    )
  }

  if (!recommendations[0]) {
    return (
      <div className="p-10 border border-dashed border-slate-200 rounded-[3rem] text-center text-slate-400 text-sm italic">
        The library is silent today. Continue your daily vows to reveal new insights.
      </div>
    )
  }

  const rec = recommendations[0]

  return (
    <section className="space-y-6 text-left">
      <h2 className="text-xs font-bold text-slate-900 uppercase tracking-[0.2em]">Recommended Wisdom</h2>
      <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden group border border-slate-800">
        <div className="relative z-10 space-y-8">
          <div className="space-y-2">
            <div className="text-amber-500 font-bold text-[10px] uppercase tracking-widest flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> Based on your Stage: {userStage}
            </div>
            <h3 className="text-3xl font-serif font-bold italic leading-tight max-w-lg">
              {rec.title}
            </h3>
            <p className="text-white/60 text-sm leading-relaxed max-w-md italic line-clamp-3">
              {rec.text}
            </p>
            <div className="text-[10px] text-amber-500/50 font-bold uppercase tracking-widest mt-2">
              Source: {rec.shastra}
            </div>
          </div>
          <Button asChild className="h-14 px-8 rounded-2xl bg-white text-slate-900 font-bold shadow-xl shadow-white/10 group/btn">
            <Link href={`/library/${rec.slug}`}>
              Open Revelation <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </Button>
        </div>
        <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform">
          <BookOpen className="w-48 h-48" />
        </div>
      </div>
    </section>
  )
}
