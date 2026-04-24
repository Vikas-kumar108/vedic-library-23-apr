'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Mail, RefreshCcw, ArrowLeft, Sparkles, CheckCircle2, Inbox } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

export default function VerifyEmailPage() {
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  const handleResend = async () => {
    if (!email) {
      toast.error('Email address not found. Please try signing up again.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/auth/verify-email/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      if (res.ok) {
        setSent(true)
        toast.success('Initiation link resent. Check your vessel.')
        setTimeout(() => setSent(false), 5000)
      } else {
        const data = await res.json()
        toast.error(data.error || 'Failed to resend link.')
      }
    } catch (err) {
      toast.error('Connection failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F7F4] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-10 text-center animate-in fade-in zoom-in duration-700">
        
        {/* Header Icon */}
        <div className="relative inline-block">
          <div className="w-24 h-24 bg-primary/10 rounded-[2.5rem] flex items-center justify-center mx-auto text-primary relative z-10">
            <Mail className="w-10 h-10" />
          </div>
          <div className="absolute -top-2 -right-2">
            <Sparkles className="w-6 h-6 text-accent animate-pulse" />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-4">
          <h1 className="text-4xl font-serif font-bold text-slate-900 tracking-tight">Verify your vessel</h1>
          <p className="text-slate-500 italic font-serif leading-relaxed">
            "Just as a clear mirror reflects the sun, a verified mind reflects the Truth."
          </p>
          <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-soft space-y-2">
            <p className="text-sm text-slate-700 font-medium">
              We've sent a sacred link to your email.
            </p>
            <p className="text-xs text-slate-400">
              Please check your inbox (and spam folder) to activate your journey.
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-4">
          <a 
            href="https://mail.google.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 h-14 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 hover:border-primary/30 hover:shadow-md transition-all"
          >
            <Inbox className="w-4 h-4 text-primary" />
            Open Gmail
          </a>
          <button 
            onClick={handleResend}
            disabled={loading || sent}
            className={cn(
              "flex items-center justify-center gap-2 h-14 rounded-2xl text-sm font-bold transition-all",
              sent 
                ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                : "bg-white border border-slate-200 text-slate-700 hover:border-primary/30 hover:shadow-md"
            )}
          >
            {loading ? (
              <RefreshCcw className="w-4 h-4 animate-spin" />
            ) : sent ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <RefreshCcw className="w-4 h-4" />
            )}
            {sent ? 'Sent Again' : 'Resend Link'}
          </button>
        </div>

        {/* Footer */}
        <div className="pt-6">
          <Link href="/auth/login" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-primary transition-colors">
            <ArrowLeft className="w-3 h-3" /> Back to Sign In
          </Link>
        </div>

        <p className="text-[10px] text-slate-300 font-medium uppercase tracking-[0.2em]">
          VedicSkills Identity Protection
        </p>
      </div>
    </div>
  )
}
