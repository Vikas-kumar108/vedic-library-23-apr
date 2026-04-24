"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { PlayCircle, CheckCircle2, ChevronRight, ArrowLeft, PenTool, Sparkles } from "lucide-react"

export default function LessonPage() {
  const params = useParams()
  const courseId = params.id as string
  const lessonId = params.lessonId as string

  const [noteContent, setNoteContent] = useState("")

  const keyPoints = [
    "Dharma represents your sacred duty and righteous path in life",
    "Understanding dharma brings clarity and purpose to your actions",
    "Living in alignment with dharma creates inner harmony and peace",
    "Your personal dharma evolves as you grow in wisdom and awareness",
  ]

  return (
    <div className="min-h-screen bg-[#fdfcf5] pb-32 animate-in fade-in duration-700">
      
      {/* 🏛️ Top Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href={`/courses/${courseId}`} className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-[#e67e22] transition-colors uppercase tracking-widest">
            <ArrowLeft className="size-4" /> Back to Syllabus
          </Link>
          <div className="hidden md:flex items-center gap-4 text-sm font-bold text-slate-400 uppercase tracking-widest">
            <span>Module 1</span> <ChevronRight className="size-4" /> <span className="text-slate-900">Historical Context</span>
          </div>
          <button className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#e67e22] transition-colors shadow-lg">
            Mark Complete
          </button>
        </div>
      </nav>

      {/* 🏛️ Main Content */}
      <main className="max-w-4xl mx-auto px-6 pt-12">
        
        {/* Video Player */}
        <div className="mb-12 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#e67e22]/20 to-purple-500/20 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="relative aspect-video bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-800">
            <img
              src="https://images.unsplash.com/photo-1641391400871-3a6578a11d5a?auto=format&fit=crop&q=80"
              alt="Lesson View"
              className="w-full h-full object-cover opacity-60 mix-blend-overlay"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors cursor-pointer">
              <button className="size-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-2xl hover:scale-110 hover:bg-[#e67e22] hover:border-[#e67e22] transition-all">
                <PlayCircle className="size-10 ml-1" />
              </button>
            </div>
            {/* Duration Badge */}
            <div className="absolute bottom-6 right-6 px-4 py-2 bg-black/50 backdrop-blur-md text-white rounded-xl text-xs font-black uppercase tracking-widest border border-white/10">
              18:34
            </div>
          </div>
        </div>

        {/* Title and Description */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
            <Sparkles className="size-3" /> Core Teaching
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold italic text-slate-900 mb-6 leading-tight">
            Understanding Dharma
          </h1>
          <p className="text-xl text-slate-500 leading-relaxed">
            Explore the profound meaning of duty and purpose. Discover how aligning with your inherent nature brings clarity to daily existence.
          </p>
        </div>

        {/* Key Points Section */}
        <div className="mb-16">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-xl shadow-slate-200/40">
            <h2 className="text-2xl font-serif font-bold italic text-slate-900 mb-8">Key Realizations</h2>
            <ul className="space-y-6">
              {keyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-5">
                  <div className="size-8 rounded-full bg-[#e67e22]/10 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <CheckCircle2 className="size-5 text-[#e67e22]" />
                  </div>
                  <p className="text-lg text-slate-700 leading-relaxed">{point}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Notes Section */}
        <div className="mb-16">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
            <div className="absolute top-0 right-0 size-64 bg-[#e67e22]/5 blur-[80px] rounded-full" />
            
            <div className="relative z-10 flex items-center justify-between mb-8">
               <h2 className="text-2xl font-serif font-bold italic text-slate-900">Contemplation</h2>
               <div className="size-12 rounded-2xl bg-[#fdfcf5] border border-slate-100 flex items-center justify-center text-[#e67e22]">
                 <PenTool className="size-5" />
               </div>
            </div>
            
            <textarea
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder="Record the wisdom you have realized during this teaching..."
              className="relative z-10 w-full h-48 p-8 bg-[#fdfcf5] border border-slate-100 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-[#e67e22]/10 focus:border-[#e67e22]/30 resize-none text-slate-700 font-medium placeholder:text-slate-400 mb-6 transition-all shadow-inner"
            />
            
            <div className="relative z-10 flex items-center justify-between">
               <p className="text-xs text-slate-400 font-medium">Your notes are secured in your private vault.</p>
               <button className="bg-slate-900 text-white px-8 py-3 rounded-xl hover:bg-[#e67e22] transition-colors shadow-lg text-[10px] font-black uppercase tracking-widest">
                 Save Realization
               </button>
            </div>
          </div>
        </div>

        {/* Next Lesson Queue */}
        <div>
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="size-16 rounded-[1.25rem] bg-slate-50 flex items-center justify-center text-slate-300">
                 <PlayCircle className="size-8" />
              </div>
              <div>
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Up Next</h3>
                <p className="text-xl font-bold text-slate-900">The Setting of Kurukshetra</p>
              </div>
            </div>
            <button className="hidden md:flex items-center gap-2 bg-slate-100 text-slate-400 px-8 py-4 rounded-2xl font-bold text-sm cursor-not-allowed">
              Locked <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

      </main>
    </div>
  )
}
