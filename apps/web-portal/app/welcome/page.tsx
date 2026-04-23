'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Star, BookOpen, Users, Sparkles, ChevronRight, Play } from 'lucide-react'
import { cn } from '@/lib/utils'

// The hero verse — the user's "first success moment" preview
const HERO_VERSE = {
  ref: 'Bhagavad Gītā 2.47',
  sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।',
  transliteration: 'karmaṇy-evādhikāras te mā phaleṣu kadācana',
  translation: 'You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions.',
  insight: 'The foundational teaching on selfless action — the key to freedom from anxiety.'
}

const SOCIAL_PROOF = [
  { name: 'Arunima S.', role: 'Householder · Grihastha', avatar: '🙏', quote: 'I found clarity on my family duties in just one week.' },
  { name: 'Vikram T.', role: 'Student · Brahmacarya', avatar: '📚', quote: 'The personalization made me feel seen. Not just another user.' },
  { name: 'Meenakshi R.', role: 'Practitioner · Sadhaka', avatar: '🪔', quote: 'The sadhana tracker keeps me accountable every morning.' },
]

const LIVE_STATS = [
  { label: 'Verses Indexed', value: '18,000+', icon: '📜' },
  { label: 'Active Seekers', value: '12,000+', icon: '🌟' },
  { label: 'Wisdom Paths', value: '60', icon: '🛤️' },
]

export default function WelcomePage() {
  const [verseVisible, setVerseVisible] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [typedText, setTypedText] = useState('')
  const fullText = 'Begin your journey into Vedic Wisdom.'

  // Typewriter effect for hero headline
  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
        // Reveal verse after headline completes
        setTimeout(() => setVerseVisible(true), 400)
      }
    }, 40)
    return () => clearInterval(timer)
  }, [])

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % SOCIAL_PROOF.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-[#F8F7F4] flex flex-col">

      {/* ── TOP NAV ── */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-[#F8F7F4]/90 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-sm">V</div>
            <span className="font-bold text-slate-900 text-lg">VedicSkills</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">
              Sign in
            </Link>
            <Link
              href="/auth/signup"
              className="h-10 px-5 bg-primary text-white text-sm font-bold rounded-xl flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:scale-105 active:scale-95"
            >
              Start Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <main className="flex-1 pt-16">
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-24 relative overflow-hidden">

          {/* Ambient background orbs */}
          <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">

            {/* Eyebrow label */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/8 border border-primary/15 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-bold text-primary uppercase tracking-widest">Vedic Institutional Operating System</span>
            </div>

            {/* Headline with typewriter */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 leading-tight min-h-[1.2em]">
                {typedText}
                <span className="animate-pulse ml-0.5 text-primary">|</span>
              </h1>
              <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-serif italic">
                A living platform for Vedic study, spiritual practice, and institutional transparency — built for seekers, scholars, and donors.
              </p>
            </div>

            {/* PRIMARY CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/onboarding"
                id="start-journey-cta"
                className="group h-16 px-10 bg-primary text-white font-bold text-lg rounded-2xl flex items-center gap-3 shadow-2xl shadow-primary/25 hover:shadow-primary/40 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/library"
                className="h-16 px-10 bg-white border border-slate-200 text-slate-700 font-bold text-lg rounded-2xl flex items-center gap-3 hover:border-primary/30 hover:shadow-lg transition-all"
              >
                <BookOpen className="w-5 h-5 text-primary" />
                <span>Explore Library</span>
              </Link>
            </div>

            {/* Live stats row */}
            <div className="flex items-center justify-center gap-8 flex-wrap">
              {LIVE_STATS.map((stat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-lg">{stat.icon}</span>
                  <div className="text-left">
                    <div className="font-bold text-slate-900 text-sm">{stat.value}</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* ── FIRST SUCCESS MOMENT (the verse preview) ── */}
            {/* This is what converts: they experience the product BEFORE signing up */}
            <div className={cn(
              "transition-all duration-1000",
              verseVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              <div className="relative bg-slate-900 rounded-[2.5rem] p-10 text-white text-left shadow-2xl shadow-slate-900/30 overflow-hidden group">
                {/* Ambient glow */}
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/10 rounded-full blur-2xl" />

                <div className="relative z-10 space-y-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="text-[10px] font-bold text-primary uppercase tracking-[0.25em] flex items-center gap-2">
                        <Play className="w-3 h-3 fill-current" /> Your First Verse — Read Now, Free
                      </div>
                      <div className="text-xs text-slate-500 font-mono">{HERO_VERSE.ref}</div>
                    </div>
                    <div className="px-3 py-1 bg-primary/20 border border-primary/30 rounded-full text-[9px] font-bold text-primary uppercase tracking-widest">
                      Live Preview
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-2xl md:text-3xl font-serif text-white/90 leading-relaxed">
                      {HERO_VERSE.sanskrit}
                    </p>
                    <p className="text-sm text-slate-400 italic font-serif">{HERO_VERSE.transliteration}</p>
                  </div>

                  <div className="border-t border-white/10 pt-6 space-y-2">
                    <p className="text-base md:text-lg text-white font-serif italic leading-relaxed">
                      "{HERO_VERSE.translation}"
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed">{HERO_VERSE.insight}</p>
                  </div>

                  <Link
                    href="/onboarding"
                    className="inline-flex items-center gap-2 mt-2 px-6 py-3 bg-white text-slate-900 font-bold text-sm rounded-xl hover:bg-primary hover:text-white transition-all group/btn"
                  >
                    Read More Like This <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              <p className="text-center text-xs text-slate-400 mt-4 italic">
                ↑ This is your first success moment. 2,400 more verses await.
              </p>
            </div>
          </div>
        </section>

        {/* ── SOCIAL PROOF ── */}
        <section className="py-24 bg-white border-t border-slate-100">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center space-y-3 mb-16">
              <div className="flex items-center justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                ))}
              </div>
              <h2 className="text-3xl font-serif font-bold text-slate-900">Trusted by seekers across India</h2>
              <p className="text-slate-500">Real people. Real transformation.</p>
            </div>

            {/* Testimonial carousel */}
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {SOCIAL_PROOF.map((t, i) => (
                  <div key={i} className="w-full flex-shrink-0 px-4">
                    <div className="max-w-2xl mx-auto bg-[#F8F7F4] rounded-[2rem] p-10 text-center space-y-6">
                      <div className="text-5xl">{t.avatar}</div>
                      <p className="text-xl font-serif italic text-slate-700 leading-relaxed">
                        "{t.quote}"
                      </p>
                      <div>
                        <div className="font-bold text-slate-900">{t.name}</div>
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">{t.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dot indicators */}
              <div className="flex justify-center gap-2 mt-8">
                {SOCIAL_PROOF.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentTestimonial(i)}
                    className={cn(
                      "h-2 rounded-full transition-all",
                      currentTestimonial === i ? "w-8 bg-primary" : "w-2 bg-slate-200"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── VALUE PROPS ── */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl font-serif font-bold text-slate-900">Everything a seeker needs</h2>
              <p className="text-slate-500 text-lg">One platform. One journey. No distraction.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: '📚', title: 'Grand Library',
                  desc: '18,000+ indexed nodes across Vedas, Upanishads, Gita, and Bhagavatam.',
                  link: '/library', cta: 'Explore Corpus'
                },
                {
                  icon: '🛤️', title: 'Guided Paths',
                  desc: '60 curated learning curves from beginner to advanced practitioner.',
                  link: '/onboarding', cta: 'Find Your Path'
                },
                {
                  icon: '🏛️', title: 'Institutional Transparency',
                  desc: 'Donors track where every rupee goes. Full financial visibility.',
                  link: '/dashboard', cta: 'View Dashboard'
                },
              ].map((item, i) => (
                <div key={i} className="group bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all space-y-6">
                  <div className="text-5xl group-hover:scale-110 transition-transform inline-block">{item.icon}</div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                  <Link href={item.link} className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline group/link">
                    {item.cta} <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA BANNER ── */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-primary rounded-[3rem] p-16 text-white text-center space-y-8 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full blur-3xl" />

              <div className="relative z-10 space-y-6">
                <Users className="w-12 h-12 text-white/30 mx-auto" />
                <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
                  Your path is waiting.
                </h2>
                <p className="text-white/60 text-lg max-w-xl mx-auto font-serif italic">
                  Join thousands of seekers who found their dharma through structured Vedic study.
                </p>
                <Link
                  href="/onboarding"
                  className="inline-flex items-center gap-3 h-16 px-12 bg-white text-primary font-bold text-lg rounded-2xl shadow-2xl shadow-black/20 hover:scale-105 active:scale-95 transition-all"
                >
                  Begin Free — No Credit Card <ArrowRight className="w-5 h-5" />
                </Link>
                <p className="text-white/30 text-xs">Setup in 60 seconds · Personalized for your life stage</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-slate-100 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xs">V</div>
              <span className="font-bold text-slate-900">VedicSkills</span>
            </div>
            <div className="flex gap-8 text-sm text-slate-400 font-medium">
              <Link href="/explore" className="hover:text-slate-700">Explore</Link>
              <Link href="/library" className="hover:text-slate-700">Library</Link>
              <Link href="/pricing" className="hover:text-slate-700">Pricing</Link>
              <Link href="/auth/login" className="hover:text-slate-700">Sign In</Link>
            </div>
            <p className="text-slate-300 text-xs">© 2026 VedicSkills. Made with devotion.</p>
          </div>
        </footer>
      </main>
    </div>
  )
}
