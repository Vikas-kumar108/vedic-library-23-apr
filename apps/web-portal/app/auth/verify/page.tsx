'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Loader2, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { apiFetch } from '@/lib/api'

function VerifyContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!token) {
      setStatus('error')
      setMessage('No verification token provided.')
      return
    }

    const verify = async () => {
      try {
        const res = await apiFetch('/auth/verify-email', {
          method: 'POST',
          body: JSON.stringify({ token })
        })

        const data = await res.json()
        if (res.ok) {
          setStatus('success')
          setMessage('Your identity has been verified. Welcome to the Gurukulam.')
          setTimeout(() => router.push('/auth/login?message=Email verified successfully'), 3000)
        } else {
          setStatus('error')
          setMessage(data.error || 'Verification failed. The link may have expired.')
        }
      } catch (err) {
        setStatus('error')
        setMessage('Connection to the sanctuary failed.')
      }
    }

    verify()
  }, [token, router])

  return (
    <div className="min-h-screen bg-[#F8F7F4] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 text-center animate-in fade-in duration-700">
        
        {status === 'loading' && (
          <div className="space-y-6">
            <div className="relative inline-block">
              <Loader2 className="w-16 h-16 text-primary animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-accent animate-pulse" />
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-serif font-bold text-slate-900 italic">Verifying your path...</h1>
              <p className="text-slate-500 italic font-serif">"Patience is the ornament of a seeker."</p>
            </div>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-6">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-500 shadow-lg shadow-emerald-500/20">
              <CheckCircle2 size={40} />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-serif font-bold text-slate-900 italic">Initiation <span className="text-emerald-500">Complete</span></h1>
              <p className="text-slate-700 font-medium">{message}</p>
              <p className="text-slate-400 text-sm italic">Redirecting to login...</p>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-6">
            <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto text-rose-500 shadow-lg shadow-rose-500/20">
              <AlertCircle size={40} />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-serif font-bold text-slate-900 italic">Path <span className="text-rose-500">Blocked</span></h1>
              <p className="text-slate-700 font-medium">{message}</p>
            </div>
            <Link 
              href="/auth/login" 
              className="inline-flex h-12 px-8 bg-primary text-white rounded-xl font-bold items-center justify-center hover:scale-[1.02] transition-all"
            >
              Back to Entrance
            </Link>
          </div>
        )}

      </div>
    </div>
  )
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#F8F7F4]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    }>
      <VerifyContent />
    </Suspense>
  )
}
