'use client'

import React from 'react'
import { Headphones, ChevronLeft, PlayCircle, Share2 } from 'lucide-react'
import { Button } from '@/components/index'

export function ListenPanel() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 animate-fade-in py-12">
      <div className="w-32 h-32 bg-primary/5 rounded-full flex items-center justify-center text-primary">
        <Headphones className="w-12 h-12" />
      </div>
      <div className="text-center">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Sacred Audio Experience</h3>
        <p className="text-slate-500 italic max-w-md mx-auto">Listen to the verses with musical accompaniment and deep commentary.</p>
      </div>
      <div className="w-full max-w-md bg-slate-50 h-2 rounded-full overflow-hidden">
        <div className="w-1/3 h-full bg-primary" />
      </div>
      <div className="flex gap-6">
        <Button variant="outline" size="icon" className="w-12 h-12 rounded-full"><ChevronLeft className="w-5 h-5" /></Button>
        <Button size="icon" className="w-16 h-16 rounded-full"><PlayCircle className="w-8 h-8" /></Button>
        <Button variant="outline" size="icon" className="w-12 h-12 rounded-full"><Share2 className="w-5 h-5" /></Button>
      </div>
    </div>
  )
}
