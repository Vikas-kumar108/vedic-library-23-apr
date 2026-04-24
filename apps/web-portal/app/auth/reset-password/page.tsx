'use client'

import React, { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ShieldCheck, ArrowLeft, Lock, CheckCircle2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

function ResetPasswordForm() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token) {
      toast.error('Invalid reset link. Please request a new one.')
      return
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password })
      })

      if (res.ok) {
        setSuccess(true)
        toast.success('Your credentials have been restored.')
        setTimeout(() => router.push('/auth/login'), 3000)
      } else {
        const data = await res.json()
        toast.error(data.error || 'Reset failed.')
      }
    } catch (err) {
      toast.error('Connection failed.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-center space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="size-24 bg-green-50 rounded-[2rem] flex items-center justify-center mx-auto text-green-600 shadow-xl shadow-green-100/50">
          <CheckCircle2 className="size-12" />
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-serif font-bold italic text-slate-900">Sanctuary Restored</h2>
          <p className="text-slate-500 max-w-xs mx-auto">
            Your path is now clear. Redirecting you to the login gateway...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h1 className="text-4xl font-serif font-bold italic text-slate-900 tracking-tight">Set New Credentials</h1>
        <p className="text-slate-500">Enter your new secure password to restore access to your vault.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">New Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-[#e67e22] transition-colors" />
              <Input 
                type="password"
                required
                placeholder="••••••••"
                className="h-14 pl-12 rounded-2xl bg-slate-50/50 border-slate-100 focus:bg-white focus:ring-2 focus:ring-[#e67e22]/20 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Confirm Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-[#e67e22] transition-colors" />
              <Input 
                type="password"
                required
                placeholder="••••••••"
                className="h-14 pl-12 rounded-2xl bg-slate-50/50 border-slate-100 focus:bg-white focus:ring-2 focus:ring-[#e67e22]/20 transition-all"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={loading}
          className="w-full h-16 bg-slate-900 hover:bg-black text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
        >
          {loading ? 'Restoring Access...' : 'Reset Password'}
        </Button>
      </form>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-[#fdfcf5] flex items-center justify-center p-6 relative overflow-hidden">
      {/* 🏛️ Background Aesthetics */}
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#e67e22]/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-500/5 blur-[120px] rounded-full" />

      <div className="w-full max-w-xl relative">
        <Link 
          href="/auth/login" 
          className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 mb-12 transition-colors group"
        >
          <ArrowLeft className="size-4 group-hover:-translate-x-2 transition-transform" />
          Back to Login
        </Link>

        <div className="bg-white p-10 md:p-16 rounded-[4rem] shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8">
            <Sparkles className="size-6 text-[#e67e22]/20" />
          </div>
          
          <Suspense fallback={<div className="h-[400px] flex items-center justify-center text-slate-400">Initializing sanctuary...</div>}>
            <ResetPasswordForm />
          </Suspense>
        </div>

        <div className="mt-12 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">
            Secure Institutional Recovery • Vedic OS
          </p>
        </div>
      </div>
    </div>
  )
}
