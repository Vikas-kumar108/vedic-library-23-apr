'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { AuthCard } from '@/components/auth/auth-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Mail } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    // Mock API call
    setTimeout(() => {
      setLoading(false)
      setSent(true)
    }, 1500)
  }

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background-secondary)] p-4">
        <AuthCard title="Check your email" subtext="We've sent a reset link to your email">
          <div className="flex justify-center py-6 text-[var(--knowledge-blue)]">
            <Mail className="h-16 w-16" />
          </div>
          <Button asChild className="w-full h-12 rounded-xl text-lg font-medium bg-[var(--knowledge-blue)]">
            <Link href="/auth/login">Back to login</Link>
          </Button>
        </AuthCard>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background-secondary)] p-4">
      <AuthCard title="Forgot your password?" subtext="Enter your email to receive a reset link">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="name@example.com" 
              required
              className="rounded-xl h-12 bg-background/50"
            />
          </div>
          <div className="space-y-4">
            <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl text-lg font-medium bg-[var(--knowledge-blue)]">
              {loading ? 'Sending...' : 'Send Reset Link'}
            </Button>
            <Button asChild variant="ghost" className="w-full h-12 rounded-xl text-muted-foreground">
              <Link href="/auth/login">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to login
              </Link>
            </Button>
          </div>
        </form>
      </AuthCard>
    </div>
  )
}
