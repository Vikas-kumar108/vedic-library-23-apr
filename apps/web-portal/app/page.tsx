'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/organisms/navbar'
import { Hero } from '@/components/organisms/hero'
import { Button } from '@/components/atoms/button'
import { Badge } from '@/components/atoms/badge'
import { 
  BookOpen, 
  Sparkles, 
  PenTool, 
  ChevronRight,
  Clock,
  Quote,
  ShieldCheck,
  Zap,
  Globe,
  Plus
} from 'lucide-react'
import { RequestShastraModal } from '@/features/library/RequestShastraModal'

const valueProps = [
  { id: 'learn', title: 'Learn', icon: BookOpen, desc: 'Structured paths for deep understanding', color: 'bg-blue-100 text-blue-600' },
  { id: 'reflect', title: 'Reflect', icon: PenTool, desc: 'Capture insights and realizations', color: 'bg-orange-100 text-orange-600' },
  { id: 'apply', title: 'Apply', icon: Sparkles, desc: 'Bring wisdom into daily life', color: 'bg-green-100 text-green-600' },
]

const featuredContent = [
  { id: '1', title: 'Harmony in the Home', duration: '12 min', tag: 'Dharma', level: 'Beginner' },
  { id: '2', title: 'Nature of the Self', duration: '18 min', tag: 'Moksha', level: 'Intermediate' },
  { id: '3', title: 'Ethical Prosperity', duration: '15 min', tag: 'Artha', level: 'Beginner' },
]

export default function LandingPage() {
  const [isRequestOpen, setIsRequestOpen] = useState(false)

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />

      {/* Value Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
          {valueProps.map((p) => (
            <div key={p.id} className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 text-center group hover:bg-white hover:shadow-xl transition-all duration-500">
              <div className={`w-16 h-16 ${p.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                <p.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">{p.title}</h3>
              <p className="text-slate-600">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Content */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Featured Content</h2>
              <p className="text-slate-600">Start with our most popular guided lessons.</p>
            </div>
            <Button asChild variant="ghost" className="text-orange-600 hover:text-orange-700 font-bold group">
              <Link href="/explore" className="flex items-center">
                View All <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredContent.map((f) => (
              <div key={f.id} className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                <div className="h-48 bg-slate-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold text-orange-600 uppercase tracking-widest">
                    {f.tag}
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {f.duration}</span>
                    <span>{f.level}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-6 group-hover:text-orange-600 transition-colors">{f.title}</h3>
                  <Button asChild className="w-full h-12 rounded-xl bg-slate-900 hover:bg-orange-600 text-white font-bold transition-all">
                    <Link href={`/library/featured-${f.id}`}>Start Learning</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🏛️ Sovereign Institutional Outreach Section */}
      <section className="py-32 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500 blur-[120px] rounded-full" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto space-y-16">
            
            <div className="text-center space-y-6">
              <Badge variant="outline" className="border-blue-400/30 text-blue-400 font-black tracking-widest uppercase text-[10px] px-6 py-2 rounded-full backdrop-blur-md">
                Institutional Dharma & Outreach
              </Badge>
              <h2 className="text-4xl md:text-6xl font-serif font-bold italic text-white leading-tight">
                Sovereign Wisdom for the <span className="text-blue-400">Global Seeker</span>
              </h2>
              <p className="text-slate-400 text-lg md:text-xl leading-relaxed font-medium">
                The Vedic Institutional Operating System is built on the philosophy of total transparency and resilient accessibility. Explore our cloud-hosted shastra vault and request the knowledge you need.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Free Digital Shastras', icon: Globe, desc: 'Unrestricted access to high-fidelity shastra scans and commentaries.', tag: 'Public Good' },
                { title: 'Branded Transmissions', icon: Zap, desc: 'Verified wisdom updates delivered directly from wisdom@vedicskills.com.', tag: 'High Trust' },
                { title: 'Resilient Cloud Vault', icon: ShieldCheck, desc: 'Your wisdom assets are secured by institutional-grade cloud infrastructure.', tag: 'Sovereign' },
              ].map((item, i) => (
                <div key={i} className="p-10 bg-white/5 border border-white/10 rounded-[3rem] backdrop-blur-xl group hover:bg-white/10 transition-all">
                  <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 italic font-serif">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">{item.desc}</p>
                  <div className="text-[9px] font-black text-blue-400 uppercase tracking-widest opacity-60">
                    {item.tag}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[3.5rem] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="space-y-4 text-center md:text-left">
                <h3 className="text-3xl font-serif font-bold italic text-white leading-tight">Can't find a specific Shastra?</h3>
                <p className="text-blue-100 text-sm max-w-sm">Our institutional mandate is to provide any sacred text you seek. Tell us what you need, and we will manifest it.</p>
              </div>
              <Button 
                onClick={() => setIsRequestOpen(true)}
                className="h-16 px-10 bg-white hover:bg-slate-50 text-blue-700 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl transition-transform hover:scale-105 active:scale-95 whitespace-nowrap"
              >
                <Plus className="w-4 h-4 mr-2" /> Request Shastra Access
              </Button>
            </div>

          </div>
        </div>

        <RequestShastraModal 
          isOpen={isRequestOpen} 
          onClose={() => setIsRequestOpen(false)} 
        />
      </section>

      {/* How It Works */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-slate-900 mb-20">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-12 relative max-w-4xl mx-auto">
            {[
              { step: '01', title: 'Learn', desc: 'Engage with structured Vedic content.' },
              { step: '02', title: 'Reflect', desc: 'Personalize the wisdom with your insights.' },
              { step: '03', title: 'Grow', desc: 'See the transformation in your daily life.' },
            ].map((s, i) => (
              <div key={i} className="relative">
                <div className="text-8xl font-black text-slate-100 absolute -top-12 left-1/2 -translate-x-1/2 -z-10">{s.step}</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{s.title}</h3>
                <p className="text-slate-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-orange-600 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <Quote className="w-16 h-16 text-orange-200 mx-auto mb-8 opacity-50" />
          <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
            “A system designed for inner growth, not just information.”
          </h2>
          <div className="w-20 h-1 bg-white/30 mx-auto" />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8">Begin your journey with one lesson.</h2>
          <Button asChild size="lg" className="h-16 px-12 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white text-xl font-bold shadow-2xl shadow-orange-600/20 transition-transform hover:scale-105 active:scale-95">
            <Link href="/welcome">Start Your Journey</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-slate-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold">V</div>
              <span className="text-lg font-bold text-slate-900">VedicSkills</span>
            </div>
            <div className="flex items-center gap-8 text-sm font-semibold text-slate-400">
              <Link href="/explore" className="hover:text-orange-600">Explore</Link>
              <Link href="/courses" className="hover:text-orange-600">Courses</Link>
              <Link href="/library" className="hover:text-orange-600">Library</Link>
              <Link href="/about" className="hover:text-orange-600">About</Link>
            </div>
          </div>
          <div className="text-center text-slate-300 text-sm">
            © 2026 VedicSkills Platform. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  )
}
