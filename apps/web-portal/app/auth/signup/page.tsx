'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, Eye, EyeOff, Shield, Lock, CheckCircle2, Sparkles, Chrome } from 'lucide-react'
import { cn } from '@/lib/utils'

const TRUST_SIGNALS = [
  { icon: Shield, text: 'Your data is encrypted end-to-end' },
  { icon: Lock, text: 'We never sell or share your information' },
  { icon: CheckCircle2, text: 'Free forever · No credit card required' },
]

const SOCIAL_PROOF_MINI = [
  { initial: 'A', color: 'bg-blue-500' },
  { initial: 'R', color: 'bg-emerald-500' },
  { initial: 'S', color: 'bg-violet-500' },
  { initial: 'M', color: 'bg-amber-500' },
]

export default function SignupPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [step, setStep] = useState<'form' | 'submitting'>('form')

  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setStep('submitting')

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to register')
      router.push('/auth/verify-email')
    } catch (err: any) {
      setError(err.message)
      setStep('form')
    } finally {
      setLoading(false)
    }
  }

  const passwordStrength = (pw: string) => {
    if (pw.length === 0) return null
    if (pw.length < 6) return { label: 'Too short', color: 'bg-red-400', width: '25%' }
    if (pw.length < 8) return { label: 'Weak', color: 'bg-amber-400', width: '50%' }
    if (!/[A-Z]/.test(pw) || !/[0-9]/.test(pw)) return { label: 'Good', color: 'bg-blue-400', width: '75%' }
    return { label: 'Strong', color: 'bg-emerald-500', width: '100%' }
  }
  const strength = passwordStrength(form.password)

  return (
    <div className="min-h-screen bg-[#F8F7F4] flex">

      {/* ── LEFT PANEL: The Trust Backdrop ── */}
      <div className="hidden lg:flex lg:w-[45%] bg-slate-900 flex-col justify-between p-14 relative overflow-hidden">
        {/* Ambient glows */}
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
              <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Your path awaits</span>
            </div>
            <h2 className="text-4xl font-serif text-white leading-snug">
              "The soul can never be cut by weapons, nor burned by fire, nor moistened by water, nor withered by the wind."
            </h2>
            <p className="text-xs text-slate-500 font-mono">— Bhagavad Gītā 2.23</p>
          </div>

          {/* Live social proof stack */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {SOCIAL_PROOF_MINI.map((u, i) => (
                  <div key={i} className={cn("w-8 h-8 rounded-full border-2 border-slate-900 flex items-center justify-center text-white font-bold text-xs", u.color)}>
                    {u.initial}
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-slate-400 text-[10px] font-bold">
                  +12k
                </div>
              </div>
              <p className="text-xs text-slate-400">Joined this week</p>
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
        </div>

        <div className="relative z-10">
          <p className="text-xs text-slate-600">© 2026 VedicSkills. Made with devotion.</p>
        </div>
      </div>

      {/* ── RIGHT PANEL: The Signup Form ── */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-16">
        <div className="w-full max-w-md space-y-8">

          {/* Mobile logo */}
          <div className="flex lg:hidden justify-center">
            <Link href="/welcome" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-sm">V</div>
              <span className="font-bold text-slate-900 text-lg">VedicSkills</span>
            </Link>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-serif font-bold text-slate-900">Create your account</h1>
            <p className="text-slate-500">Your personalized Vedic journey begins here.</p>
          </div>

          {/* Google OAuth (visual, placeholder) */}
          <button className="w-full h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center gap-3 font-semibold text-slate-700 hover:border-slate-300 hover:shadow-md transition-all text-sm">
            <Chrome className="w-5 h-5 text-blue-500" />
            Continue with Google
          </button>

          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-slate-100" />
            <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">or with email</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-sm text-red-600 flex items-start gap-3">
                <span className="text-base">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">Full Name</label>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name as you'd like to be known"
                required
                autoFocus
                className="w-full h-14 px-5 rounded-2xl border border-slate-200 bg-white outline-none focus:ring-4 focus:ring-primary/8 focus:border-primary transition-all text-sm placeholder:text-slate-300"
              />
            </div>

            {/* Email */}
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

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">Create Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 8 characters"
                  required
                  className="w-full h-14 pl-5 pr-14 rounded-2xl border border-slate-200 bg-white outline-none focus:ring-4 focus:ring-primary/8 focus:border-primary transition-all text-sm placeholder:text-slate-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {/* Strength bar */}
              {strength && (
                <div className="space-y-1 pt-1">
                  <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full transition-all duration-500", strength.color)} style={{ width: strength.width }} />
                  </div>
                  <p className={cn("text-[10px] font-bold uppercase tracking-widest",
                    strength.color.includes('red') ? 'text-red-400' :
                    strength.color.includes('amber') ? 'text-amber-500' :
                    strength.color.includes('blue') ? 'text-blue-500' : 'text-emerald-500'
                  )}>
                    {strength.label}
                  </p>
                </div>
              )}
            </div>

            {/* Privacy note */}
            <p className="text-[11px] text-slate-400 leading-relaxed">
              By creating an account you agree to our{' '}
              <Link href="/privacy" className="text-primary hover:underline font-medium">Privacy Policy</Link>. We will never share your data with third parties. Ever.
            </p>

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
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating your sanctuary...
                </>
              ) : (
                <>
                  Create Free Account <ArrowRight className="w-5 h-5 group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Mobile trust signals */}
          <div className="flex items-center justify-center gap-6 lg:hidden">
            {TRUST_SIGNALS.slice(0, 2).map((t, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <t.icon className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-[10px] text-slate-400">{t.text.split(' ').slice(0, 3).join(' ')}</span>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-slate-500">
            Already walking the path?{' '}
            <Link href="/auth/login" className="text-primary font-bold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
