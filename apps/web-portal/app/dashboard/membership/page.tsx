'use client'

import React from 'react'
import { Award, Zap, CheckCircle2, History, CreditCard } from 'lucide-react'
import { Button, StandardPage, Breadcrumb } from '@/components'
import Link from 'next/link'

/**
 * Membership Page
 * Responsibility: Show current user plan and available upgrade path.
 * Purpose: Retention and conversion for logged-in users.
 */
export default function MembershipPage() {
  const currentPlan = 'FREE' // In production, this would come from an Auth/User context

  return (
    <StandardPage className="pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Membership', href: '/dashboard/membership', active: true }]} />

        <div className="space-y-12">
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 bg-white p-12 rounded-[3rem] border border-slate-100 shadow-soft relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Award className="w-32 h-32 text-primary" />
            </div>
            
            <div className="space-y-4 relative z-10">
              <h1 className="text-4xl font-serif font-bold text-slate-900">Your Membership</h1>
              <div className="flex items-center gap-3">
                <span className="px-4 py-2 bg-slate-100 text-slate-600 rounded-full font-bold text-xs tracking-widest uppercase">Current Plan: {currentPlan}</span>
                {currentPlan === 'FREE' && (
                  <span className="text-orange-500 font-bold text-xs flex items-center gap-1">
                    <Zap className="w-3 h-3 fill-current" /> Upgrade for Full Access
                  </span>
                )}
              </div>
            </div>

            <Button asChild size="lg" className="h-16 px-10 rounded-2xl relative z-10 shadow-xl shadow-primary/20">
              <Link href="/pricing">Upgrade to Premium</Link>
            </Button>
          </header>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Benefits Comparison */}
            <section className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
                Premium Benefits
              </h3>
              <ul className="space-y-6">
                {[
                  'Unlock all 60+ Courses & Shastras',
                  'Save Unlimited Private Notes',
                  'Personalized Learning Dashboard',
                  'Download Offline Study Guides',
                  'Priority Mentor Support'
                ].map((b, i) => (
                  <li key={i} className="flex items-start gap-4 text-slate-600">
                    <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 text-green-600 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Billing History (Placeholder) */}
            <section className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <History className="w-6 h-6 text-slate-400" />
                Billing History
              </h3>
              <div className="space-y-4">
                <div className="p-6 bg-white rounded-2xl border border-slate-100 flex items-center justify-between opacity-50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-slate-300" />
                    </div>
                    <div>
                      <div className="text-sm font-bold">No transactions yet</div>
                      <div className="text-[10px] uppercase font-bold text-slate-300">Upgrade to start your journey</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </StandardPage>
  )
}
