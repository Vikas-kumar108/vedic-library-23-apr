'use client'

import React from 'react'
import { Check, Star, Sparkles, ShieldCheck, Zap, Heart } from 'lucide-react'
import { Button, StandardPage, Breadcrumb } from '@/components/index'
import Link from 'next/link'

/**
 * Pricing Page
 * Responsibility: Present value proposition and plan comparison.
 * Purpose: Conversion from free to premium.
 */
export default function PricingPage() {
  return (
    <StandardPage className="pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Navigation Up */}
        <Breadcrumb 
          items={[{ label: 'Home', href: '/' }, { label: 'Pricing', href: '/pricing', active: true }]} 
          className="justify-center mb-12"
        />

        {/* Header */}
        <header className="text-center mb-20 space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold font-serif text-slate-900 leading-tight">
            Choose Your <span className="text-primary italic text-6xl md:text-8xl block md:inline">Path</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Invest in your spiritual evolution with structured guidance and timeless wisdom.
          </p>
        </header>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto mb-24">
          
          {/* Free Plan */}
          <div className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-soft flex flex-col hover-lift">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Free Plan</h3>
              <p className="text-slate-400 text-sm">Begin your journey today.</p>
            </div>
            
            <div className="text-5xl font-bold text-slate-900 mb-10">₹0 <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">/ Month</span></div>
            
            <ul className="space-y-4 mb-12 flex-1">
              {[
                'Basic access to Shastra',
                'Introductory lessons',
                'Public community forums',
                'Daily wisdom notifications'
              ].map(f => (
                <li key={f} className="flex items-center gap-3 text-slate-600">
                  <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <Button variant="outline" size="lg" className="w-full h-16 rounded-2xl border-slate-200">
              Start Free Journey
            </Button>
          </div>

          {/* Premium Plan ⭐ */}
          <div className="bg-slate-900 rounded-[3rem] p-12 border border-primary/20 shadow-2xl relative overflow-hidden flex flex-col hover-lift group">
            {/* Gilded Accent */}
            <div className="absolute top-0 right-0 p-8">
              <div className="bg-primary text-white px-4 py-2 rounded-2xl font-bold text-[10px] tracking-widest flex items-center gap-2 shadow-xl shadow-primary/40 animate-pulse">
                <Sparkles className="w-3 h-3" /> MOST DEVOTED
              </div>
            </div>

            <div className="mb-8 relative z-10">
              <h3 className="text-2xl font-bold text-white mb-2">Premium Plan <Star className="inline w-6 h-6 text-primary fill-primary ml-2" /></h3>
              <p className="text-slate-400 text-sm">The complete spiritual toolkit.</p>
            </div>
            
            <div className="text-5xl font-bold text-white mb-10 relative z-10">₹999 <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">/ Month</span></div>
            
            <ul className="space-y-4 mb-12 flex-1 relative z-10">
              {[
                'Full access to all 60+ Courses',
                'Personalized Notes & Reflections',
                'Advanced Progress Tracking',
                'Mentor Feedback Access',
                'Adhikara-level restricted content'
              ].map(f => (
                <li key={f} className="flex items-center gap-3 text-slate-300">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <Button variant="primary" size="lg" className="w-full h-16 rounded-2xl shadow-2xl shadow-primary/50 relative z-10">
              Upgrade to Premium
            </Button>
            
            {/* Background Glow */}
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/20 rounded-full blur-[100px] group-hover:bg-primary/30 transition-all" />
          </div>
        </div>

        {/* Plan Comparison Table (Detailed Transparency) */}
        <section className="mb-24 overflow-x-auto">
          <h4 className="text-3xl font-serif font-bold text-slate-900 text-center mb-12">Granular Features</h4>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="py-6 px-4 text-sm font-bold text-slate-400 uppercase tracking-widest">Feature</th>
                <th className="py-6 px-4 text-center font-bold text-slate-900">Free</th>
                <th className="py-6 px-4 text-center font-bold text-primary">Premium</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[
                { name: 'Core Shastra Library', free: true, premium: true },
                { name: 'Adhikara-level Restricted Content', free: false, premium: true },
                { name: 'Personalized Reflection Journal', free: false, premium: true },
                { name: 'Guided Learning Paths', free: 'Basic', premium: 'Unlimited' },
                { name: 'Direct Mentor Interaction', free: false, premium: true },
                { name: 'Offline Study Access', free: false, premium: true },
              ].map((row, i) => (
                <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="py-6 px-4 text-slate-600 font-medium">{row.name}</td>
                  <td className="py-6 px-4 text-center">
                    {typeof row.free === 'boolean' ? (row.free ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <div className="w-1.5 h-1.5 bg-slate-200 rounded-full mx-auto" />) : <span className="text-slate-400">{row.free}</span>}
                  </td>
                  <td className="py-6 px-4 text-center">
                    {typeof row.premium === 'boolean' ? (row.premium ? <Check className="w-5 h-5 text-primary mx-auto" /> : <div className="w-1.5 h-1.5 bg-slate-200 rounded-full mx-auto" />) : <span className="font-bold text-primary">{row.premium}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Testimonials / Trust Section */}
        <section className="text-center space-y-16 mb-24">
          <div className="space-y-4">
            <h4 className="text-4xl font-serif font-bold text-slate-900">Voices of the Path</h4>
            <p className="text-slate-500 max-w-xl mx-auto italic">Real transformation from seekers who have committed to the journey.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Arjun M.', role: 'Student', quote: 'The structured approach to the Gita helped me navigate mid-life career confusion with a calm mind.' },
              { name: 'Sarah J.', role: 'Counselor', quote: 'I use the reflection notes every day. It feels like a digital sacred journal that grows with me.' },
              { name: 'Vikram S.', role: 'Business Owner', quote: 'The mentor access is game-changing. Having a guide for deep Shastra study is a blessing.' }
            ].map((t, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-50 shadow-soft text-left space-y-6 hover-lift">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-primary fill-primary" />)}
                </div>
                <p className="text-lg text-slate-600 font-serif leading-relaxed italic">"{t.quote}"</p>
                <div>
                  <div className="font-bold text-slate-900">{t.name}</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Support Section */}
        <section className="text-center space-y-12 bg-white rounded-[4rem] p-20 border border-slate-50 shadow-soft">
          <h4 className="text-3xl font-serif font-bold text-slate-900">Trusted by Seekers Worldwide</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            {[
              { icon: <ShieldCheck className="w-10 h-10 text-primary" />, title: 'Secure & Private', desc: 'Your reflections and notes are encrypted and private to you.' },
              { icon: <Zap className="w-10 h-10 text-orange-500" />, title: 'Immediate Access', desc: 'Unlock the complete library instantly after successful payment.' },
              { icon: <Heart className="w-10 h-10 text-red-500" />, title: 'Devoted Support', desc: 'Access to the world’s most dedicated Vedic mentors.' }
            ].map((t, i) => (
              <div key={i} className="space-y-4">
                <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center">{t.icon}</div>
                <h5 className="text-xl font-bold text-slate-900">{t.title}</h5>
                <p className="text-slate-500 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </StandardPage>
  )
}
