'use client'

import React from 'react'
import { 
  MessageSquare, 
  Users, 
  Calendar, 
  Search, 
  CheckCircle2, 
  Star,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/atoms/button'
import { StandardPage } from '@/components/templates/standard-page'
import { Breadcrumb } from '@/components/molecules/breadcrumb'
import Link from 'next/link'

/**
 * Guidance & Mentors Page
 * Responsibility: Bridge the gap between digital study and personal guidance.
 * Purpose: Allows users to connect with qualified mentors for deep questions and live sessions.
 */
export default function GuidancePage() {
  const mentors = [
    { id: 'm1', name: 'Dr. Keshav Dev', specialty: 'Bhagavad Gita & Ethics', rating: 4.9, bio: 'Dedicated researcher with 20+ years of deep Shastra study. Specializes in applied Dharma for modern challenges.', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Keshav' },
    { id: 'm2', name: 'Smt. Radharani', specialty: 'Bhakti & Meditation', rating: 5.0, bio: 'Experienced meditation guide focusing on heart-centered realization and the path of devotion.', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Radha' },
    { id: 'm3', name: 'Sri Vaman Das', specialty: 'Sanskrit & Upanishads', rating: 4.8, bio: 'Grammarian and philosopher teaching the profound truths of the Upanishads through linguistic depth.', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vaman' },
  ]

  return (
    <StandardPage className="pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Guidance', href: '/guidance', active: true }]} className="justify-center mb-12" />

        <header className="text-center mb-20 space-y-8">
          <div className="w-20 h-20 bg-primary/5 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-primary">
            <Users className="w-10 h-10" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold font-serif text-slate-900 leading-tight">
            Personal <span className="text-primary italic">Guidance</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed italic">
            "Knowledge is discovered in books, but wisdom is realized under the guidance of a mentor."
          </p>
        </header>

        <div className="grid lg:grid-cols-[1fr_400px] gap-12">
          
          {/* Mentor List Section */}
          <section className="space-y-12">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-serif font-bold text-slate-900">Qualified Mentors</h2>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4 text-green-500" /> Vetted Experts
              </div>
            </div>

            <div className="space-y-8">
              {mentors.map(m => (
                <div key={m.id} className="group bg-white p-10 rounded-[3rem] border border-slate-100 shadow-soft hover-lift flex flex-col md:flex-row gap-10">
                  <div className="w-32 h-32 rounded-[2rem] bg-slate-50 overflow-hidden flex-shrink-0 border-4 border-white shadow-sm">
                    <img src={m.img} alt={m.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900">{m.name}</h3>
                        <div className="text-primary font-bold text-xs uppercase tracking-widest mt-1">{m.specialty}</div>
                      </div>
                      <div className="flex items-center gap-1 text-accent font-bold">
                        <Star className="w-4 h-4 fill-current" /> {m.rating}
                      </div>
                    </div>
                    <p className="text-slate-500 leading-relaxed text-sm italic">"{m.bio}"</p>
                    <div className="pt-4 flex gap-4">
                      <Button asChild size="md" className="rounded-xl px-8 h-12">
                        <Link href={`/mentors/${m.id}`}>View Teachings</Link>
                      </Button>
                      <Button variant="outline" size="md" className="rounded-xl px-8 h-12 border-slate-100">
                        Book Session
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Ask a Question Sidebar */}
          <aside className="space-y-8">
            <div className="bg-slate-900 p-10 rounded-[3rem] text-white space-y-8 relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-24 h-24" />
              </div>
              
              <div className="space-y-4 relative z-10">
                <h3 className="text-2xl font-serif font-bold italic leading-tight">Ask your deep question</h3>
                <p className="text-xs text-slate-400 leading-relaxed uppercase tracking-widest font-bold">Responds within 24-48h</p>
              </div>

              <textarea 
                className="w-full min-h-[160px] p-6 text-sm rounded-2xl bg-white/10 border border-white/20 focus:border-primary/50 outline-none transition-all placeholder:text-white/30 relative z-10"
                placeholder="What challenge are you facing in your Dharma?"
              />
              
              <Button variant="primary" className="w-full h-14 rounded-2xl relative z-10 shadow-xl shadow-primary/20">
                Submit to Mentors
              </Button>

              <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest relative z-10">
                <CheckCircle2 className="w-4 h-4" />
                <span>Requires Premium Access</span>
              </div>
            </div>

            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-soft space-y-6">
              <div className="flex items-center gap-3 text-orange-500">
                <Calendar className="w-6 h-6" />
                <h3 className="font-bold text-xs uppercase tracking-widest">Upcoming Live Sessions</h3>
              </div>
              <div className="space-y-4">
                {[
                  { title: 'Weekly Gita Satsang', time: 'Tomorrow, 6 PM', type: 'Live' },
                  { title: 'Meditation Workshop', time: 'Sat, 10 AM', type: 'Group' }
                ].map((s, i) => (
                  <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group cursor-pointer hover:border-primary/20 transition-all">
                    <div>
                      <div className="text-xs font-bold text-slate-900">{s.title}</div>
                      <div className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{s.time}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-all" />
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full text-xs text-primary font-bold">View Calendar →</Button>
            </div>
          </aside>
        </div>
      </div>
    </StandardPage>
  )
}
