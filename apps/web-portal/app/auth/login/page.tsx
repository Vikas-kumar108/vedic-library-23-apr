'use client'

import React, { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowRight, Eye, EyeOff, Shield, Lock, Sparkles, Chrome, Loader2, KeyRound } from 'lucide-react'
import { cn } from '@/lib/utils'

const TRUST_SIGNALS = [
  { icon: Shield, text: 'Secure encrypted access' },
  { icon: Lock, text: 'Privacy-first wisdom platform' },
  { icon: KeyRound, text: 'Identity verified by VedicSkills' },
]

function LoginContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const message = searchParams.get('message')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to login')
      
      const returnTo = searchParams.get('returnTo') || '/dashboard'
      router.push(returnTo)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F7F4] flex">

      {/* ── LEFT PANEL: Returning Sanctuary ── */}
      <div className="hidden lg:flex lg:w-[45%] bg-slate-900 flex-col justify-between p-14 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-accent/10 rounded-full blur-[80px]" />

        <div className="relative z-10">
          <Link href="/welcome" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white font-bold">V</div>
            <span className="text-white font-bold text-xl">VedicSkills</span>
          </Link>
        </div>

        <div className="relative z-10 space-y-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Returning Seeker</span>
            </div>
            <h2 className="text-4xl font-serif text-white leading-snug italic">
              “Knowledge is the only wealth that grows when shared, and remains with you even when stolen.”
            </h2>
            <p className="text-xs text-slate-500 font-mono">— Vedic Proverb</p>
          </div>

          <div className="space-y-3">
            {TRUST_SIGNALS.map((t, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-7 h-7 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <t.icon className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="text-xs text-slate-400">{t.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-xs text-slate-600">© 2026 VedicSkills. Secure Access Point.</p>
        </div>
      </div>

      {/* ── RIGHT PANEL: Login Form ── */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-16">
        <div className="w-full max-w-md space-y-8">

          <div className="lg:hidden flex justify-center">
             <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold">V</div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-serif font-bold text-slate-900">Welcome back</h1>
            <p className="text-slate-500">Continue your journey where you left off.</p>
          </div>

          <button className="w-full h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center gap-3 font-semibold text-slate-700 hover:border-slate-300 transition-all text-sm">
            <Chrome className="w-5 h-5 text-blue-500" />
            Sign in with Google
          </button>

          <div className="flex items-center gap-4 text-slate-200">
            <div className="flex-1 h-px bg-slate-100" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">or email access</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {message && <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-sm text-emerald-700">{message}</div>}
            {error && <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-sm text-red-600">{error}</div>}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">Email Address</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="name@example.com"
                required
                className="w-full h-14 px-5 rounded-2xl border border-slate-200 bg-white outline-none focus:ring-4 focus:ring-primary/8 focus:border-primary transition-all text-sm placeholder:text-slate-300"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">Password</label>
                <Link href="/auth/forgot-password" title="Recover Access" className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline">
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full h-14 pl-5 pr-14 rounded-2xl border border-slate-200 bg-white outline-none focus:ring-4 focus:ring-primary/8 focus:border-primary transition-all text-sm placeholder:text-slate-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={cn(
                "w-full h-14 rounded-2xl font-bold text-base flex items-center justify-center gap-3 transition-all",
                loading
                  ? "bg-primary/70 text-white cursor-not-allowed"
                  : "bg-primary text-white shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.01] active:scale-[0.99]"
              )}
            >
              {loading ? 'Entering...' : 'Enter Sanctuary'}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500">
            New here?{' '}
            <Link href="/auth/signup" className="text-primary font-bold hover:underline">
              Create free account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#F8F7F4]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <LoginContent />
    </Suspense>
  )
}
