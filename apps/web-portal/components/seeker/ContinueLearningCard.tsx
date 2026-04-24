"use client"

import React from 'react'
import { PlayCircle, Clock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

interface ContinueLearningCardProps {
  courseTitle: string
  lessonTitle: string
  progress: number
  image?: string
}

export function ContinueLearningCard({
  courseTitle,
  lessonTitle,
  progress,
  image = "https://images.unsplash.com/photo-1502139214982-d0ad755818d8?auto=format&fit=crop&q=80"
}: ContinueLearningCardProps) {
  return (
    <div className="group bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-[#e67e22]/5 transition-all duration-500">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-64 h-48 md:h-auto relative overflow-hidden">
          <img src={image} alt={courseTitle} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
             <PlayCircle className="size-12 text-white" />
          </div>
        </div>
        
        <div className="flex-1 p-8 md:p-10 space-y-6">
          <div className="space-y-2">
            <div className="text-[10px] font-black text-[#e67e22] uppercase tracking-[0.2em]">Continue Learning</div>
            <h3 className="text-2xl font-serif font-bold italic text-slate-900">{courseTitle}</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-end">
               <div className="text-sm font-medium text-slate-500">
                 Current: <span className="text-slate-900 font-bold italic font-serif ml-1">{lessonTitle}</span>
               </div>
               <div className="text-sm font-black text-[#e67e22]">{progress}%</div>
            </div>
            <Progress value={progress} className="h-2 bg-slate-50" />
          </div>

          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
               <span className="flex items-center gap-1"><Clock className="size-3" /> 12 Modules Left</span>
            </div>
            <Button className="h-12 px-8 bg-slate-900 hover:bg-[#e67e22] text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg">
               Resume Journey <ArrowRight className="ml-2 size-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
