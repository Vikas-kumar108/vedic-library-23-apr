'use client'

import React, { useState } from 'react'
import { 
  Play, 
  FileText, 
  Lightbulb, 
  Download, 
  MessageSquare, 
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Monitor
} from 'lucide-react'
import { Button, StandardPage, BackButton } from '@/components'
import { cn } from '@/lib/utils'
import Link from 'next/link'

/**
 * Lesson Experience Page
 * Responsibility: Immersive learning environment for course lessons.
 * Purpose: Centered on a video/text lesson with integrated study tools.
 */
export default function LessonExperiencePage({ params }: { params: { id: string } }) {
  const [activeMode, setActiveMode] = useState('watch')
  const [reflection, setReflection] = useState('')

  return (
    <div className="min-h-screen bg-[#F8F7F4] flex flex-col">
      {/* Immersive Header */}
      <header className="bg-white border-b border-slate-100 py-6 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/courses" className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
              <ChevronLeft className="w-5 h-5 text-slate-400" />
            </Link>
            <div className="space-y-1">
              <div className="text-[10px] font-bold text-primary uppercase tracking-widest leading-none">Lesson 04 • Bhagavad Gita Foundations</div>
              <h1 className="text-xl font-bold text-slate-900 leading-tight">The Nature of Eternal Consciousness</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 mr-4">
              <div className="h-1.5 w-32 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-1/4 rounded-full" />
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">25% Done</span>
            </div>
            <Button size="sm" className="h-10 px-4 rounded-xl">Complete & Next</Button>
          </div>
        </div>
      </header>

      <div className="flex-1 container mx-auto px-4 py-12 grid lg:grid-cols-[1fr_400px] gap-12">
        
        {/* Main Content Area */}
        <main className="space-y-12">
          {/* Video Player Section */}
          <section className="bg-slate-900 aspect-video rounded-[3rem] shadow-2xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30 cursor-pointer hover:scale-110 transition-transform">
                <Play className="w-10 h-10 text-white fill-current" />
              </div>
            </div>
            <div className="absolute bottom-10 left-10 text-white opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
              <div className="text-sm font-bold opacity-60 mb-2">NOW PLAYING</div>
              <div className="text-2xl font-serif font-bold italic">Lesson 04: The Nature of the Soul</div>
            </div>
          </section>

          {/* Lesson Tools Tabs */}
          <div className="bg-white rounded-[3rem] border border-slate-100 shadow-soft overflow-hidden">
            <nav className="flex border-b border-slate-50 bg-slate-50/20 p-2">
              {[
                { id: 'watch', label: 'Transcript', icon: FileText },
                { id: 'resources', label: 'Resources', icon: Download },
                { id: 'discuss', label: 'Discussion', icon: MessageSquare }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveMode(tab.id)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-3 py-5 px-4 rounded-[2rem] transition-all",
                    activeMode === tab.id ? "bg-white text-primary font-bold shadow-sm" : "text-slate-400 hover:text-slate-600"
                  )}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-widest font-bold">{tab.label}</span>
                </button>
              ))}
            </nav>
            <div className="p-10 min-h-[300px]">
              {activeMode === 'watch' && (
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed font-serif animate-fade-in">
                  <p>In this lesson, we explore verse 2.12 and 2.13 where Krishna begins to explain the nature of the self. He tells Arjuna that there was never a time when he did not exist, nor Arjuna, nor all these kings; nor in the future shall any of us cease to be...</p>
                  <p className="p-6 bg-primary/5 rounded-2xl border-l-4 border-primary text-primary font-bold">"As the embodied soul continuously passes, in this body, from boyhood to youth to old age, the soul similarly passes into another body at death. A sober person is not bewildered by such a change."</p>
                </div>
              )}
              {activeMode === 'resources' && (
                <div className="space-y-4 animate-fade-in">
                  {[
                    { title: 'Chapter 2 Verse Summary', size: '2.4 MB', type: 'PDF' },
                    { title: 'Sanskrit Vocabulary Guide', size: '1.1 MB', type: 'DOC' }
                  ].map((res, i) => (
                    <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group hover:border-primary/20 transition-all cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900">{res.title}</div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{res.type} • {res.size}</div>
                        </div>
                      </div>
                      <Download className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Learning Sidebar */}
        <aside className="space-y-8">
          {/* Reflection Prompt Card */}
          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white space-y-6 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
              <Lightbulb className="w-20 h-20" />
            </div>
            <div className="space-y-4 relative z-10">
              <div className="text-[10px] font-bold text-primary uppercase tracking-widest">Reflection Prompt</div>
              <h3 className="text-xl font-serif font-bold italic leading-tight">
                "How does the concept of eternal consciousness change your view of today's challenges?"
              </h3>
              <textarea 
                className="w-full min-h-[140px] p-4 text-sm rounded-xl bg-white/10 border border-white/20 focus:border-primary/50 outline-none transition-all placeholder:text-white/30"
                placeholder="Type your realization here..."
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
              />
              <Button variant="primary" className="w-full h-12 rounded-xl">Save to Hriday-Manthan</Button>
            </div>
          </div>

          {/* Up Next / Playlist */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest px-4">Up Next in this Module</h3>
            <div className="space-y-3">
              {[
                { title: 'The Three Modes of Nature', dur: '12:40', active: false },
                { title: 'The Science of Karma', dur: '15:20', active: false },
                { title: 'Practice: Daily Meditation', dur: '05:00', active: false },
              ].map((item, i) => (
                <div key={i} className="p-4 bg-white rounded-2xl border border-slate-100 flex items-center gap-4 group hover:shadow-md transition-all cursor-pointer">
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-300 group-hover:text-primary group-hover:bg-primary/5 transition-all">
                    <Play className="w-4 h-4 fill-current" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-slate-900 leading-tight">{item.title}</div>
                    <div className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{item.dur}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

      </div>

      {/* Mobile Footer Nav */}
      <footer className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-4 flex gap-4">
        <Button variant="outline" className="flex-1 h-12 rounded-xl">Previous</Button>
        <Button className="flex-1 h-12 rounded-xl">Next Lesson</Button>
      </footer>
    </div>
  )
}
