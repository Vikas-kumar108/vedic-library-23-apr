'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { KeyRound, ArrowLeft, ArrowRight, Sparkles, CheckCircle2, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [email, setEmail] = useState('')

  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      if (res.ok) {
        setSuccess(true)
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to send recovery link.')
      }
    } catch (err) {
      setError('Connection failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F7F4] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* Header Icon */}
        <div className="text-center space-y-6">
          <div className="relative inline-block">
            <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto text-primary relative z-10">
              {success ? <CheckCircle2 className="w-10 h-10" /> : <KeyRound className="w-10 h-10" />}
            </div>
            {!success && (
              <div className="absolute -bottom-2 -left-2">
                <Sparkles className="w-6 h-6 text-primary/30" />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">
              {success ? 'Sacred link sent' : 'Restore access'}
            </h1>
            <p className="text-slate-500 text-sm">
              {success 
                ? `We've sent recovery instructions to your email.`
                : 'Enter your email to receive a secure recovery link.'}
            </p>
          </div>
        </div>

        {/* Content */}
        {!success ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl text-sm">
                {error}
              </div>
            )}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                autoFocus
                className="w-full h-14 px-5 rounded-2xl border border-slate-200 bg-white outline-none focus:ring-4 focus:ring-primary/8 focus:border-primary transition-all text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !email}
              className={cn(
                "w-full h-14 rounded-2xl font-bold text-base flex items-center justify-center gap-3 transition-all",
                loading || !email
                  ? "bg-primary/50 text-white cursor-not-allowed"
                  : "bg-primary text-white shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.01] active:scale-[0.99]"
              )}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Recovery Link <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="p-8 bg-emerald-50 rounded-[2.5rem] border border-emerald-100 text-center space-y-6">
            <p className="text-sm text-emerald-800 leading-relaxed font-serif italic">
              "When one door closes, the Divine opens a path through the heart."
            </p>
            <div className="h-px bg-emerald-200/50 w-12 mx-auto" />
            <p className="text-xs text-emerald-600">
              Please check your inbox. The link will expire in 1 hour for your protection.
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="text-center pt-4">
          <Link href="/auth/login" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" /> Return to Login
          </Link>
        </div>
      </div>
    </div>
  )
}
