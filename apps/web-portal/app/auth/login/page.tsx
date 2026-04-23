'use client'

import React, { Suspense } from 'react'
import Link from 'next/link'
import { AuthCard } from '@/components/auth/auth-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Chrome, Apple, Loader2 } from 'lucide-react'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

function LoginContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const message = searchParams.get('message')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to login')
      }

      const returnTo = searchParams.get('returnTo') || '/library'
      router.push(returnTo)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthCard 
      title="Welcome back" 
      subtext="Continue your learning journey"
      footer={
        <div className="text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link href="/auth/signup" className="text-primary font-medium hover:underline">
            Create account
          </Link>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {message && <div className="p-3 text-sm bg-green-500/10 text-green-600 rounded-lg">{message}</div>}
        {error && <div className="p-3 text-sm bg-destructive/10 text-destructive rounded-lg">{error}</div>}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            name="email"
            type="email" 
            placeholder="name@example.com" 
            required
            className="rounded-xl h-12 bg-background/50 border-border/50 focus:border-primary/50"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="/auth/forgot-password" hidden className="text-xs text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input 
            id="password" 
            name="password"
            type="password" 
            placeholder="••••••••" 
            required
            className="rounded-xl h-12 bg-background/50 border-border/50 focus:border-primary/50"
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl text-lg font-medium bg-[var(--knowledge-blue)] hover:bg-[var(--knowledge-blue)]/90 transition-all shadow-lg shadow-blue-500/20">
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" className="h-12 rounded-xl border-border/50 hover:bg-secondary/50">
          <Chrome className="mr-2 h-5 w-5" />
          Google
        </Button>
        <Button variant="outline" className="h-12 rounded-xl border-border/50 hover:bg-secondary/50">
          <Apple className="mr-2 h-5 w-5" />
          Apple
        </Button>
      </div>
    </AuthCard>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background-secondary)] p-4 bg-gradient-to-br from-[var(--background-secondary)] via-background to-[var(--background-secondary)]">
      <Suspense fallback={
        <AuthCard title="Loading..." subtext="Preparing your journey">
          <div className="flex justify-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        </AuthCard>
      }>
        <LoginContent />
      </Suspense>
    </div>
  )
}
