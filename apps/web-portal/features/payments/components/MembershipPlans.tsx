'use client'

import React from 'react'
import { 
  Check, 
  Zap, 
  ShieldCheck, 
  GraduationCap, 
  Users, 
  Flame,
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/atoms/button'
import { Badge } from '@/components/atoms/badge'
import { usePayments } from '../hooks/usePayments'
import { cn } from '@/lib/utils'

/**
 * MembershipPlans Component
 * Responsibility: Provide a high-end, persuasive interface for tier selection.
 * Purpose: Clearly differentiates between Seeker, Practitioner, and Scholar paths.
 */
export function MembershipPlans() {
  const { plans, isProcessing, initiateCheckout } = usePayments()

  return (
    <div className="space-y-16 animate-fade-in py-12">
      <header className="text-center space-y-6 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
          Choose Your <span className="text-primary italic">Path</span>
        </h1>
        <p className="text-slate-500 italic leading-relaxed">
          "The investment in wisdom is the only wealth that grows as you share it. Select a tier that aligns with your current level of commitment."
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div 
            key={plan.id} 
            className={cn(
              "relative flex flex-col p-10 rounded-[4rem] border transition-all duration-500 hover:scale-[1.02]",
              plan.isPopular 
                ? "bg-white border-primary shadow-2xl shadow-primary/10 ring-4 ring-primary/5" 
                : "bg-white border-slate-100 shadow-soft"
            )}
          >
            {plan.isPopular && (
              <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                <Badge className="bg-primary text-white h-10 px-8 rounded-full shadow-lg">Most Committed</Badge>
              </div>
            )}

            <div className="space-y-8 flex-1">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  {plan.tier === 'SEEKER' && <Flame className="w-6 h-6 text-orange-500" />}
                  {plan.tier === 'PRACTITIONER' && <Zap className="w-6 h-6 text-primary" />}
                  {plan.tier === 'SCHOLAR' && <GraduationCap className="w-6 h-6 text-slate-900" />}
                  <h3 className="text-2xl font-serif font-bold text-slate-900">{plan.name}</h3>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-slate-900">₹{plan.price}</span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">/ {plan.interval.toLowerCase()}</span>
                </div>
              </div>

              <ul className="space-y-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-green-500" />
                    </div>
                    <span className="text-sm text-slate-600 leading-relaxed italic">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12">
              <Button 
                onClick={() => initiateCheckout(plan.id)}
                disabled={isProcessing}
                variant={plan.isPopular ? 'primary' : 'outline'}
                className="w-full h-14 rounded-2xl font-bold text-sm uppercase tracking-widest group"
              >
                {isProcessing ? 'Processing...' : 'Embrace this Path'} 
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Security Context */}
      <div className="flex flex-col items-center gap-4 py-8 border-t border-slate-50">
        <div className="flex items-center gap-6 opacity-30 grayscale transition-all hover:grayscale-0">
          <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" alt="Razorpay" className="h-6" />
          <div className="h-6 w-px bg-slate-200" />
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" /> Secure SSL Encryption
          </div>
        </div>
      </div>
    </div>
  )
}
