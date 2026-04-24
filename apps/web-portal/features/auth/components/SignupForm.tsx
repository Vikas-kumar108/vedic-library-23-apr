'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Eye, EyeOff, Chrome } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '../hooks/useAuth'

export function SignupForm() {
  const { register } = useAuth()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await register(form)
    setLoading(false)
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
    <div className="w-full max-w-md space-y-8 text-left">
      <div className="space-y-2">
        <h1 className="text-3xl font-serif font-bold text-slate-900 italic">Initiate <span className="text-primary">Journey</span></h1>
        <p className="text-sm text-slate-500">Your personalized Vedic journey begins here.</p>
      </div>

      <button className="w-full h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center gap-3 font-semibold text-slate-700 hover:border-slate-300 transition-all text-sm">
        <Chrome className="w-5 h-5 text-blue-500" />
        Continue with Google
      </button>

      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-slate-100" />
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">or with email</span>
        <div className="flex-1 h-px bg-slate-100" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Full Name</label>
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name as you'd like to be known"
            required
            className="w-full h-14 px-5 rounded-2xl border border-slate-200 bg-white outline-none focus:ring-4 focus:ring-primary/8 focus:border-primary transition-all text-sm placeholder:text-slate-300"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Email Address</label>
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
          <label className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Create Password</label>
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
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
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

        <p className="text-[11px] text-slate-400 leading-relaxed">
          By creating an account you agree to our{' '}
          <Link href="/privacy" className="text-primary hover:underline font-bold italic">Privacy Policy</Link>.
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
          {loading ? 'Creating sanctuary...' : 'Initiate Journey'}
          {!loading && <ArrowRight className="w-5 h-5" />}
        </button>
      </form>

      <p className="text-center text-sm text-slate-500">
        Already walking the path?{' '}
        <Link href="/auth/login" className="text-primary font-bold hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}
