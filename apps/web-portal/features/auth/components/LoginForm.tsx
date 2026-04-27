'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowRight, Eye, EyeOff, Chrome, Loader2, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '../hooks/useAuth'
import { LoginInput } from '@dharma/contracts'
import { trpc } from '@/lib/trpc'

export function LoginForm() {
  const { login } = useAuth()
  const searchParams = useSearchParams()
  const message = searchParams.get('message')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      // 1. Validate against Shared Contract
      LoginInput.parse(form)

      const success = await login(form)
      if (!success) {
         setError("Invalid credentials. Please verify your access details.")
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during authentication.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md space-y-8 text-left">
      <div className="space-y-2">
        <h1 className="text-3xl font-serif font-bold text-slate-900 leading-tight italic">Welcome <span className="text-primary">Back</span></h1>
        <p className="text-sm text-slate-500">Continue your journey where you left off.</p>
      </div>

      <button className="w-full h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center gap-3 font-semibold text-slate-700 hover:border-slate-300 transition-all text-sm shadow-sm">
        <Chrome className="w-5 h-5 text-blue-500" />
        Sign in with Google
      </button>

      <div className="flex items-center gap-4 text-slate-200">
        <div className="flex-1 h-px bg-slate-100" />
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">or email access</span>
        <div className="flex-1 h-px bg-slate-100" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {message && (
          <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 px-4 py-3 rounded-xl flex items-center gap-3 text-sm animate-in fade-in slide-in-from-top-1 shadow-sm">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-rose-50 border border-rose-100 text-rose-600 px-4 py-3 rounded-xl flex items-center gap-3 text-sm animate-in fade-in slide-in-from-top-1 shadow-sm">
            <AlertCircle size={18} className="flex-shrink-0" />
            {error}
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Email Address</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="name@example.com"
            required
            className="w-full h-14 px-5 rounded-2xl border border-slate-200 bg-white outline-none focus:ring-4 focus:ring-primary/8 focus:border-primary transition-all text-sm placeholder:text-slate-300 shadow-sm"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Password</label>
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
              className="w-full h-14 pl-5 pr-14 rounded-2xl border border-slate-200 bg-white outline-none focus:ring-4 focus:ring-primary/8 focus:border-primary transition-all text-sm placeholder:text-slate-300 shadow-sm"
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
          {loading ? <Loader2 className="animate-spin size-5" /> : null}
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
  )
}
