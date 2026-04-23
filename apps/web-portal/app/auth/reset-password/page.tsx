'use client'

import React, { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { AuthCard } from '@/components/auth/auth-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'

function ResetPasswordContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const password = formData.get('password')
    const confirm = formData.get('confirm-password')

    if (password !== confirm) {
      setError("Passwords don't match")
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to reset password')
      }

      router.push('/auth/login?message=Password reset successfully')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthCard title="Set new password" subtext="Enter your new password below">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <div className="p-3 text-sm bg-destructive/10 text-destructive rounded-lg">{error}</div>}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">New password</Label>
            <Input 
              id="password" 
              name="password"
              type="password" 
              placeholder="••••••••" 
              required
              className="rounded-xl h-12 bg-background/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm password</Label>
            <Input 
              id="confirm-password" 
              name="confirm-password"
              type="password" 
              placeholder="••••••••" 
              required
              className="rounded-xl h-12 bg-background/50"
            />
          </div>
        </div>
        <Button type="submit" disabled={loading || !token} className="w-full h-12 rounded-xl text-lg font-medium bg-[var(--knowledge-blue)]">
          {!token ? 'Invalid Link' : loading ? 'Resetting...' : 'Reset Password'}
        </Button>
      </form>
    </AuthCard>
  )
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background-secondary)] p-4">
      <Suspense fallback={
        <AuthCard title="Loading..." subtext="Verifying reset link">
          <div className="flex justify-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        </AuthCard>
      }>
        <ResetPasswordContent />
      </Suspense>
    </div>
  )
}
