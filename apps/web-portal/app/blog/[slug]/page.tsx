'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { 
  Heart, 
  Sparkles, 
  ChevronLeft, 
  ArrowRight,
  PenTool,
  Bookmark,
  Share2,
  Lock,
  Sun
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function ArticlePage() {
  const [reflection, setReflection] = useState('')

  return (
    <div className="min-h-screen relative bg-[#F8F7F4] overflow-hidden">
      {/* Immersive Background Layer */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <Image 
          src="/Users/ppublications/.gemini/antigravity/brain/c640721a-79fa-4afc-be62-a444bf689aab/bhakti_reading_room_ambient_1776914445816.png"
          alt="Bhakti Ambient Background"
          fill
          className="object-cover"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-32 pb-24 max-w-4xl">
        {/* Navigation */}
        <Link href="/explore" className="inline-flex items-center text-sm font-bold text-slate-400 hover:text-primary transition-colors mb-12 group uppercase tracking-widest">
          <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Explore
        </Link>

        {/* Sacred Header */}
        <header className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100/50 text-orange-700 text-[10px] font-bold uppercase tracking-widest mb-6">
            <Sun className="w-3 h-3" />
            <span>Path of Dharma</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-tight font-serif mb-6">
            What is Dharma in <br />
            <span className="text-primary italic">Daily Life?</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed italic font-serif">
            "Dharma is not a set of rules, but the natural rhythm of your soul in harmony with the cosmos."
          </p>
        </header>

        {/* The Reading Experience */}
        <article className="prose prose-slate prose-lg lg:prose-xl max-w-none mb-24">
          <p className="text-xl leading-relaxed text-slate-700 first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:text-primary">
            In the modern rush, we often confuse Dharma with duty. While duty is a component, Dharma is much deeper. It is the 'essential nature' of a thing. Just as the Dharma of fire is to burn and the Dharma of water is to flow, the Dharma of a human being is to connect with the Divine (Bhakti).
          </p>

          <p className="text-lg leading-relaxed text-slate-700">
            Applying this to your morning routine, your work, and your relationships changes the quality of your existence. When you act from a place of Dharma, anxiety dissolves because you are no longer fighting against the current of your own soul.
          </p>

          <blockquote className="my-16 p-12 bg-white rounded-[3rem] border-l-8 border-primary shadow-soft">
            <p className="text-2xl font-serif italic text-slate-800 leading-relaxed mb-4">
              "To perform one's own Dharma, even if imperfectly, is far better than to perform the Dharma of another, even if perfectly."
            </p>
            <footer className="text-sm font-bold uppercase tracking-widest text-primary">— Bhagavad Gita 3.35</footer>
          </blockquote>

          {/* Mid-CTA: Deep Dive */}
          <div className="my-20 p-1 bg-gradient-to-r from-primary to-blue-400 rounded-[3rem] shadow-xl">
            <div className="bg-white/95 backdrop-blur-md p-10 rounded-[2.8rem] flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-900">Want to explore this deeper?</h3>
                <p className="text-slate-500">Join our guided path on "The Science of Duty & Devotion".</p>
              </div>
              <Button asChild size="lg" className="h-14 px-10 rounded-2xl bg-primary text-white font-bold hover-lift">
                <Link href="/courses/dharma-101" className="flex items-center gap-2">
                  Start Learning <Sparkles className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          <p className="text-lg leading-relaxed text-slate-700">
            Bhakti is the fuel for Dharma. Without devotion, duty becomes a burden. With devotion, duty becomes a dance. As you go about your day today, ask yourself: "Am I performing this action for the result, or as an offering?"
          </p>
        </article>

        {/* Hriday-Manthan (Heart Reflection) */}
        <section className="mb-24">
          <div className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-soft relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full blur-3xl group-hover:bg-orange-100 transition-all" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                  <PenTool className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Hriday-Manthan</h3>
                  <p className="text-sm text-slate-500">Your personal reflection and heart's dialogue.</p>
                </div>
              </div>

              <textarea 
                className="w-full min-h-[160px] p-6 rounded-3xl border border-slate-100 bg-slate-50/50 text-lg focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all placeholder:italic"
                placeholder="What realization stirred in your heart while reading this?"
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
              />

              <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-2 text-xs text-slate-400 font-bold uppercase tracking-widest">
                  <Lock className="w-3 h-3" />
                  <span>Login to save these insights to your journey</span>
                </div>
                <Button className="h-12 px-8 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20">
                  Save Note
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Related Wisdom */}
        <section className="mb-24">
          <h4 className="text-2xl font-bold text-slate-900 mb-8 px-4">Continue the Flow</h4>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: 'The Art of Detachment', tag: 'Karma', duration: '5 min' },
              { title: 'Bhakti: The Yoga of Love', tag: 'Devotion', duration: '8 min' },
            ].map((card, i) => (
              <div key={i} className="group p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all cursor-pointer">
                <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-3">{card.tag} • {card.duration}</div>
                <h5 className="text-xl font-bold text-slate-900 mb-6 group-hover:text-primary transition-colors">{card.title}</h5>
                <div className="flex items-center text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Read Next <ArrowRight className="ml-2 w-4 h-4 translate-x-[-10px] group-hover:translate-x-0 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final Devotional CTA */}
        <section className="bg-slate-900 rounded-[3rem] p-16 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-30">
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-600 rounded-full blur-[100px] animate-pulse delay-700" />
          </div>
          
          <div className="relative z-10">
            <Heart className="w-16 h-16 text-primary mx-auto mb-8 animate-heartbeat" />
            <h3 className="text-4xl md:text-5xl font-bold mb-6 font-serif">Commit to the Path.</h3>
            <p className="text-slate-400 text-xl max-w-xl mx-auto mb-12">
              Transform this moment of reflection into a lifelong journey of devotion. Your account is the gateway to your spiritual evolution.
            </p>
            <Button asChild size="lg" className="h-16 px-12 rounded-2xl bg-primary text-white text-xl font-bold shadow-2xl shadow-primary/40 hover:scale-105 active:scale-95 transition-all">
              <Link href="/auth/signup">Create Your Sacred Account</Link>
            </Button>
          </div>
        </section>
      </div>

      <style jsx global>{`
        @keyframes heartbeat {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        .animate-heartbeat {
          animation: heartbeat 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  )
}
