"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  PenTool, 
  Clock, 
  Star, 
  ShieldCheck, 
  Zap, 
  Globe, 
  Plus, 
  GraduationCap,
  PlayCircle,
  Users
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RequestShastraModal } from '@/features/library/RequestShastraModal'

const STEPS = [
  {
    id: "01",
    title: "Learn",
    description: "Engage with structured lessons and teachings from ancient Vedic texts, presented in a modern, accessible format.",
    color: "text-blue-500",
    bg: "bg-blue-50"
  },
  {
    id: "02",
    title: "Reflect",
    description: "Take time to internalize the wisdom through guided reflection exercises and journaling prompts.",
    color: "text-orange-500",
    bg: "bg-orange-50"
  },
  {
    id: "03",
    title: "Grow",
    description: "Apply these timeless principles to your daily life and experience meaningful personal transformation.",
    color: "text-green-500",
    bg: "bg-green-50"
  }
]

const FEATURED = [
  {
    id: "1",
    title: "The Path of Dharma: Living with Purpose",
    type: "Course",
    duration: "10 weeks",
    image: "https://images.unsplash.com/photo-1772368872233-4539a0b63f2a?auto=format&fit=crop&q=80",
    tag: "Dharma",
    level: "Beginner"
  },
  {
    id: "2",
    title: "Understanding Karma & Consciousness",
    type: "Lesson",
    duration: "45 min",
    image: "https://images.unsplash.com/photo-1617375361041-b00f3bdd94bf?auto=format&fit=crop&q=80",
    tag: "Karma",
    level: "Intermediate"
  },
  {
    id: "3",
    title: "Bhakti: The Art of Devotion",
    type: "Article",
    duration: "12 min read",
    image: "https://images.unsplash.com/photo-1641391400871-3a6578a11d5a?auto=format&fit=crop&q=80",
    tag: "Bhakti",
    level: "All Levels"
  }
]

export default function LandingPage() {
  const [isRequestOpen, setIsRequestOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#fdfcf5]">
      {/* 🏛️ Sovereign Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[#e67e22]/5 blur-[120px] rounded-full -z-10" />
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e67e22]/10 text-[#e67e22] text-[10px] font-black uppercase tracking-widest">
                <Sparkles className="size-3" />
                Timeless Wisdom for Modern Life
              </div>
              <h1 className="text-5xl md:text-7xl font-serif font-bold italic text-slate-900 leading-[1.1]">
                Learn, Reflect, and Apply 
                <span className="text-[#e67e22] block">Vedic Excellence</span>
              </h1>
              <p className="text-xl text-slate-500 leading-relaxed max-w-xl">
                Structured courses and guided learning designed to bridge ancient wisdom with modern organizational and personal management.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <Button asChild className="h-16 px-10 bg-slate-900 hover:bg-black text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl transition-transform hover:scale-105 active:scale-95">
                  <Link href="/onboarding">Start Your Journey</Link>
                </Button>
                <Button asChild variant="outline" className="h-16 px-10 border-slate-200 bg-white hover:bg-slate-50 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest transition-transform hover:scale-105 active:scale-95">
                  <Link href="/explore">Explore Teachings</Link>
                </Button>
              </div>
              <div className="flex items-center gap-8 pt-8 border-t border-slate-100">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="size-10 rounded-full border-2 border-white bg-slate-200" />
                  ))}
                </div>
                <div className="text-sm">
                  <div className="font-bold text-slate-900">12,000+ Seekers</div>
                  <div className="text-slate-500">Growing together in Dharma</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-[3.5rem] overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80" 
                  alt="Vedic Wisdom" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 max-w-[280px] hidden md:block">
                <div className="flex items-center gap-4 mb-4">
                  <div className="size-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600">
                    <Quote className="size-6" />
                  </div>
                  <div className="text-xs font-black uppercase tracking-widest text-slate-400">Daily Realization</div>
                </div>
                <p className="text-sm font-serif italic font-bold text-slate-900 leading-relaxed">
                  "Action without knowledge is blindness, but knowledge without action is a burden."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🏛️ Value Propositions */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: 'Learn', icon: BookOpen, desc: 'Engage with structured shastras presented for the modern mind.', color: 'bg-blue-50 text-blue-600' },
              { title: 'Reflect', icon: PenTool, desc: 'Personalize the wisdom through guided contemplative exercises.', color: 'bg-orange-50 text-orange-600' },
              { title: 'Grow', icon: Zap, desc: 'Experience tangible transformation in your conduct and consciousness.', color: 'bg-green-50 text-green-600' },
            ].map((item, i) => (
              <div key={i} className="p-10 rounded-[3rem] bg-[#fdfcf5]/50 border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500 group">
                <div className={`size-16 ${item.color} rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-sm`}>
                  <item.icon className="size-8" />
                </div>
                <h3 className="text-2xl font-serif font-bold italic text-slate-900 mb-4">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🏛️ How It Works */}
      <section className="py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-6">
            <h2 className="text-4xl md:text-6xl font-serif font-bold italic text-slate-900">How It Works</h2>
            <p className="text-lg text-slate-500">A simple, effective approach to integrating Vedic wisdom into your life.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-16 relative max-w-5xl mx-auto">
            {STEPS.map((step, i) => (
              <div key={i} className="relative group text-center space-y-8">
                <div className="size-24 rounded-full bg-white shadow-xl flex items-center justify-center mx-auto relative z-10 group-hover:scale-110 transition-transform">
                  <span className={`text-3xl font-black ${step.color}`}>{step.id}</span>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-serif font-bold italic text-slate-900">{step.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">{step.description}</p>
                </div>
              </div>
            ))}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 w-full h-px bg-slate-100 -z-0 hidden md:block" />
          </div>
        </div>
      </section>

      {/* 🏛️ Featured Discovery */}
      <section className="py-32 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#e67e22] blur-[150px] rounded-full" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-16">
            <div className="space-y-6">
              <Badge className="bg-[#e67e22]/20 text-[#e67e22] border-none uppercase tracking-[0.2em] text-[10px] px-6 py-2 rounded-full font-black">
                Featured Manifestations
              </Badge>
              <h2 className="text-4xl md:text-6xl font-serif font-bold italic text-white leading-tight">
                Explore the Path of <br /><span className="text-[#e67e22]">Vedic Excellence</span>
              </h2>
            </div>
            <Button asChild variant="ghost" className="text-[#e67e22] hover:text-[#e67e22] hover:bg-white/5 font-black text-xs uppercase tracking-widest group">
              <Link href="/explore" className="flex items-center">
                View All Content <ArrowRight className="ml-2 size-4 group-hover:translate-x-2 transition-transform" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {FEATURED.map((item) => (
              <div key={item.id} className="group bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden hover:bg-white/10 hover:shadow-2xl transition-all duration-500 flex flex-col">
                <div className="h-64 relative overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black text-[#e67e22] uppercase tracking-widest">
                      {item.tag}
                    </span>
                  </div>
                </div>
                <div className="p-10 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                    <span className="flex items-center gap-1"><Clock className="size-3" /> {item.duration}</span>
                    <span className="flex items-center gap-1"><Users className="size-3" /> {item.level}</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold italic text-white mb-8 group-hover:text-[#e67e22] transition-colors leading-tight">
                    {item.title}
                  </h3>
                  <Button asChild className="mt-auto h-12 bg-white text-slate-900 hover:bg-[#e67e22] hover:text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all">
                    <Link href={`/courses`}>Start Learning</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🏛️ Sovereign Outreach Call */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="p-16 md:p-24 bg-[#fdfcf5] border border-slate-100 rounded-[4rem] flex flex-col md:flex-row items-center justify-between gap-16 relative overflow-hidden">
             <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#e67e22]/5 blur-3xl rounded-full -z-0" />
             <div className="space-y-8 max-w-xl relative z-10">
               <h2 className="text-4xl md:text-6xl font-serif font-bold italic text-slate-900 leading-tight">
                 Manifest the <span className="text-[#e67e22]">Knowledge</span> You Seek
               </h2>
               <p className="text-lg text-slate-500 leading-relaxed">
                 Our institutional mandate is to provide unrestricted access to sacred texts. If a specific shastra is eluding your search, tell us, and we will manifest it.
               </p>
               <Button 
                 onClick={() => setIsRequestOpen(true)}
                 className="h-16 px-10 bg-[#e67e22] hover:bg-[#d35400] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl transition-transform hover:scale-105 active:scale-95"
               >
                 Request Shastra Access
               </Button>
             </div>
             <div className="relative group">
                <div className="size-64 md:size-80 rounded-[3rem] bg-white shadow-2xl flex items-center justify-center border border-slate-50">
                   <div className="text-center space-y-4">
                      <Globe className="size-16 text-[#e67e22] mx-auto animate-pulse" />
                      <div className="font-black text-xs uppercase tracking-[0.3em] text-slate-400">Cloud Vault</div>
                   </div>
                </div>
                <div className="absolute -top-6 -right-6 size-24 rounded-[1.5rem] bg-blue-500 flex items-center justify-center text-white shadow-xl rotate-12">
                   <ShieldCheck className="size-10" />
                </div>
             </div>
          </div>
        </div>
      </section>

      <RequestShastraModal 
        isOpen={isRequestOpen} 
        onClose={() => setIsRequestOpen(false)} 
      />
    </div>
  )
}
