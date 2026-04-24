'use client'

import React, { Suspense } from 'react'
import { Loader2 } from 'lucide-react'
import { SignupBrandingPanel } from '@/features/auth/components/SignupBrandingPanel'
import { SignupForm } from '@/features/auth/components/SignupForm'

/**
 * Path to Initiation (Signup)
 * Responsibility: Provide the onboarding entrance for new seekers.
 */
function SignupContent() {
  return (
    <div className="min-h-screen bg-[#F8F7F4] flex">
      {/* 1. Modular Path Backdrop */}
      <SignupBrandingPanel />

      {/* 2. Modular Initiation Mechanism */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-16">
        <div className="lg:hidden flex justify-center mb-10">
           <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">V</div>
        </div>
        <SignupForm />
      </div>
    </div>
  )
}

export default function SignupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#F8F7F4]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="font-serif italic text-slate-400">Preparing your Path...</p>
        </div>
      </div>
    }>
      <SignupContent />
    </Suspense>
  )
}
