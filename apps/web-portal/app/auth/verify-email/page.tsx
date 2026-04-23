'use client'

import React, { useState } from 'react'
import { AuthCard } from '@/components/auth/auth-card'
import { Button } from '@/components/ui/button'
import { Mail, RefreshCcw } from 'lucide-react'

export default function VerifyEmailPage() {
  const [loading, setLoading] = useState(false)

  const handleResend = async () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background-secondary)] p-4">
      <AuthCard title="Verify your email" subtext="Click the link sent to your email">
        <div className="flex flex-col items-center py-8 space-y-4">
          <div className="bg-primary/5 p-6 rounded-full">
            <Mail className="h-16 w-16 text-primary" />
          </div>
          <p className="text-center text-muted-foreground">
            We've sent a confirmation link. Please check your inbox and spam folder.
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={handleResend} 
          disabled={loading}
          className="w-full h-12 rounded-xl text-md font-medium"
        >
          {loading ? (
            <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          Resend Email
        </Button>
      </AuthCard>
    </div>
  )
}
