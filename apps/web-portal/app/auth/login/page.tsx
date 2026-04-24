'use client'

import React, { Suspense } from 'react'
import { Loader2 } from 'lucide-react'
import { AuthBrandingPanel } from '@/features/auth/components/AuthBrandingPanel'
import { LoginForm } from '@/features/auth/components/LoginForm'

/**
 * Institutional Login Entrance
 * Responsibility: Provide the gateway for seekers to return to their journey.
 */
function LoginContent() {
  return (
    <div className="min-h-screen bg-[#F8F7F4] flex">
      {/* 1. Modular Branding Sanctuary */}
      <AuthBrandingPanel />

      {/* 2. Modular Login Mechanism */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-16">
        <div className="lg:hidden flex justify-center mb-10">
           <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">V</div>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#F8F7F4]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="font-serif italic text-slate-400">Opening the Sanctuary...</p>
        </div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  )
}
