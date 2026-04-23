'useChild'

import React from 'react'
import { Lock, ShieldCheck, CreditCard, ChevronLeft } from 'lucide-react'
import { Button, StandardPage, BackButton } from '@/components'
import Link from 'next/link'

/**
 * Checkout Page
 * Responsibility: Securely handle payment summary and gateway initiation.
 * Purpose: Finalizing the commitment to Premium.
 */
export default function CheckoutPage() {
  return (
    <StandardPage className="pt-32 pb-24 bg-[#F1EFE9]">
      <div className="container mx-auto px-4 max-w-4xl">
        <BackButton label="Return to Pricing" />

        <div className="grid md:grid-cols-[1fr_350px] gap-8 items-start">
          {/* Main Checkout Form */}
          <main className="space-y-8">
            <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-soft">
              <h1 className="text-3xl font-serif font-bold text-slate-900 mb-8">Sacred Commitment</h1>
              
              <div className="space-y-6">
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900">Premium Plan (Monthly)</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Full Access • Mentor Support</p>
                  </div>
                  <div className="text-2xl font-bold text-primary">₹999</div>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="you@example.com"
                    className="w-full h-14 px-6 rounded-xl border border-slate-200 bg-slate-50 focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all"
                  />
                </div>

                <div className="pt-6">
                  <Button size="lg" className="w-full h-16 rounded-2xl bg-slate-900 text-white font-bold hover:bg-black transition-all flex items-center justify-center gap-3">
                    <CreditCard className="w-5 h-5" />
                    Pay with Razorpay
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-6 pt-6">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <ShieldCheck className="w-4 h-4 text-green-500" />
                    <span>Secure Encryption</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <Lock className="w-4 h-4 text-slate-300" />
                    <span>SSL Certified</span>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Order Summary */}
          <aside className="space-y-6">
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-soft">
              <h4 className="text-lg font-bold text-slate-900 mb-6">Summary</h4>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Subtotal</span>
                  <span className="font-bold">₹999.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Taxes</span>
                  <span className="font-bold">₹0.00</span>
                </div>
                <div className="pt-4 border-t border-slate-50 flex justify-between text-xl">
                  <span className="font-bold text-slate-900">Total</span>
                  <span className="font-bold text-primary">₹999.00</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-primary/5 rounded-[2rem] border border-primary/10">
              <p className="text-xs text-primary leading-relaxed text-center italic">
                "Your contribution supports the preservation and digital dissemination of Vedic wisdom."
              </p>
            </div>
          </aside>
        </div>
      </div>
    </StandardPage>
  )
}
