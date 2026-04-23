'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { 
  Play, 
  Lock, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  ChevronLeft,
  Share2,
  Bookmark,
  ChevronDown,
  Sparkles,
  Zap,
  Leaf
} from 'lucide-react'
import { Button, BackButton, Breadcrumb } from '@/components/index'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const modules = [
  {
    id: 'm1',
    title: 'The Eternal Dilemma',
    desc: 'Understanding the conflict between duty and emotion.',
    lessons: [
      { id: 'l1', title: 'Context of the Kurukshetra', duration: '12 min', status: 'completed' },
      { id: 'l2', title: 'Arjuna’s Grief & Our Modern Anxiety', duration: '18 min', status: 'available' },
      { id: 'l3', title: 'The Call to Action', duration: '15 min', status: 'locked' },
    ]
  },
  {
    id: 'm2',
    title: 'The Science of the Soul',
    desc: 'Deep dive into the indestructible nature of the Atman.',
    lessons: [
      { id: 'l4', title: 'Sankhya Yoga: Understanding the Body vs Soul', duration: '25 min', status: 'locked' },
      { id: 'l5', title: 'Indestructibility of the Atman', duration: '20 min', status: 'locked' },
    ]
  }
]

export default function CourseDetailPage() {
  const [expandedModules, setExpandedModules] = useState(['m1'])

  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      {/* Navigation Memory Layer */}
      <div className="absolute top-24 left-0 right-0 z-30 pointer-events-none">
        <div className="container mx-auto px-4 flex flex-col md:flex-row md:items-center justify-between py-6 pointer-events-auto">
          <BackButton label="To Library" className="mb-0 text-white/70 hover:text-white" />
          <Breadcrumb 
            className="mb-0 text-white/50"
            items={[
              { label: 'Explore', href: '/explore' },
              { label: 'Gita Foundations', href: '#', active: true }
            ]} 
          />
        </div>
      </div>

      {/* Immersive Hero Portal */}
      <section className="relative h-[70vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/Users/ppublications/.gemini/antigravity/brain/c640721a-79fa-4afc-be62-a444bf689aab/gita_foundations_banner_1776914359703.png"
            alt="Bhagavad Gita Foundations"
            fill
            className="object-cover scale-105 animate-slow-zoom"
            priority
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F8F7F4] via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center lg:text-left mt-12">
          <div className="max-w-3xl space-y-6 mx-auto lg:mx-0">
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <span className="px-3 py-1 bg-orange-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg shadow-orange-500/20">Dharma</span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-full border border-white/20">Beginner</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tight leading-[1.1] font-serif">
              Bhagavad Gita <br />
              <span className="text-orange-400">Foundations</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <div className="container mx-auto px-4 -mt-32 relative z-20 pb-20">
        <div className="grid lg:grid-cols-[1fr_400px] gap-12">
          
          {/* Main Journey Path */}
          <main className="space-y-12">
            {/* Floating Description Card */}
            <div className="bg-white/80 backdrop-blur-xl p-10 rounded-[3rem] border border-white shadow-soft">
              <div className="flex items-start justify-between mb-8">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-slate-900">About this Journey</h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Transform your perspective on duty, anxiety, and the self. This course translates the eternal dialogue into actionable wisdom for the 21st-century mind.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="rounded-full bg-slate-100 hover:bg-slate-200"><Bookmark className="w-5 h-5 text-slate-600" /></Button>
                  <Button variant="ghost" size="icon" className="rounded-full bg-slate-100 hover:bg-slate-200"><Share2 className="w-5 h-5 text-slate-600" /></Button>
                </div>
              </div>

              {/* Interactive Progress Visual */}
              <div className="p-8 bg-slate-900 rounded-[2rem] text-white overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-32 h-full bg-orange-600/20 skew-x-12 translate-x-16" />
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                      <Leaf className="w-8 h-8 text-green-400 animate-pulse" />
                    </div>
                    <div>
                      <div className="text-sm text-slate-400 uppercase font-bold tracking-widest mb-1">Your Sankalpa Tree</div>
                      <div className="text-2xl font-bold">20% Spiritual Growth</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-orange-400">4/18</div>
                    <div className="text-[10px] text-slate-500 uppercase font-bold">Lessons Over</div>
                  </div>
                </div>
                <div className="mt-8 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 w-1/5 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.5)] transition-all duration-1000" />
                </div>
              </div>
            </div>

            {/* Creative Curriculum List */}
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-slate-900 px-4">The Wisdom Path</h3>
              <div className="space-y-8 relative">
                {/* Visual Path Connector */}
                <div className="absolute left-[44px] top-10 bottom-10 w-0.5 bg-slate-200 dashed" />

                {modules.map((module, mIdx) => (
                  <div key={module.id} className="relative z-10">
                    <div className="flex items-start gap-8 mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg shadow-xl shadow-primary/20">
                        {mIdx + 1}
                      </div>
                      <div className="pt-2">
                        <h4 className="text-2xl font-bold text-slate-900 mb-1">{module.title}</h4>
                        <p className="text-sm text-slate-500">{module.desc}</p>
                      </div>
                    </div>

                    <div className="ml-20 space-y-4">
                      {module.lessons.map((lesson) => (
                        <div 
                          key={lesson.id} 
                          className={cn(
                            "flex items-center justify-between p-5 rounded-[1.5rem] border border-slate-100 bg-white hover-lift transition-all group",
                            lesson.status === 'locked' ? "opacity-60 grayscale-[0.5]" : "shadow-sm"
                          )}
                        >
                          <div className="flex items-center gap-4">
                            <div className={cn(
                              "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
                              lesson.status === 'completed' ? "bg-green-100 text-green-600" :
                              lesson.status === 'available' ? "bg-orange-100 text-orange-600" : "bg-slate-100 text-slate-400"
                            )}>
                              {lesson.status === 'completed' ? <CheckCircle2 className="w-6 h-6" /> : 
                               lesson.status === 'locked' ? <Lock className="w-5 h-5" /> : <Play className="w-6 h-6 fill-current" />}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 group-hover:text-primary transition-colors">{lesson.title}</div>
                              <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {lesson.duration}</span>
                                {lesson.status === 'available' && <span className="text-orange-600 font-bold uppercase tracking-wider text-[8px]">Next Up</span>}
                              </div>
                            </div>
                          </div>
                          {lesson.status === 'available' && (
                            <Button className="rounded-xl bg-slate-900 text-white font-bold h-10 px-6 group-hover:bg-primary transition-colors">
                              Enter Lesson
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>

          {/* Sticky Action Card */}
          <aside className="lg:sticky lg:top-28">
            <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl relative overflow-hidden group">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all" />
              
              <div className="space-y-8 relative z-10">
                <div className="text-center">
                  <div className="w-20 h-20 bg-orange-100 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-orange-600">
                    <Sparkles className="w-10 h-10 animate-bounce" />
                  </div>
                  <h4 className="text-3xl font-bold text-slate-900">Resume Mastery</h4>
                  <p className="text-slate-500 mt-2">You were doing great. Continue your path of self-realization.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl text-center">
                    <div className="text-2xl font-bold text-slate-900">18</div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Lessons</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl text-center">
                    <div className="text-2xl font-bold text-slate-900">12h</div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Duration</div>
                  </div>
                </div>

                <Button className="w-full h-16 rounded-[1.5rem] bg-primary text-white text-xl font-bold shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
                  <Zap className="w-6 h-6 fill-current" />
                  Resume Course
                </Button>

                <div className="text-center">
                  <p className="text-xs text-slate-400">Includes lifetime access & <br /> personal mentor feedback.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <style jsx global>{`
        @keyframes slow-zoom {
          0% { transform: scale(1.05); }
          100% { transform: scale(1.15); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s infinite alternate ease-in-out;
        }
      `}</style>
    </div>
  )
}
