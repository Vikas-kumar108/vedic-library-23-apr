'use client'

import React from 'react'
import { Lock } from 'lucide-react'
import { Button } from '@/components/atoms/button'

interface AccessGatingProps {
  reason: string
}

export function AccessGating({ reason }: AccessGatingProps) {
  return (
    <div className="h-screen flex items-center justify-center bg-[#F8F7F4] p-6">
      <div className="max-w-md w-full bg-white p-12 rounded-[4rem] border border-slate-100 shadow-soft text-center space-y-8 animate-in zoom-in duration-700">
        <div className="w-20 h-20 bg-slate-900 rounded-[2.5rem] flex items-center justify-center mx-auto text-primary">
          <Lock className="w-10 h-10" />
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-serif font-bold text-slate-900 leading-tight">Wisdom <span className="text-primary italic">Preserved</span></h2>
          <p className="text-sm text-slate-500 leading-relaxed italic">
            "{reason}"
          </p>
        </div>
        <div className="pt-4 flex flex-col gap-4">
          <Button className="w-full h-14 rounded-2xl bg-slate-900 text-white font-bold shadow-xl shadow-slate-900/10">
            Complete Pre-requisites
          </Button>
          <Button variant="ghost" className="w-full text-xs text-primary font-bold">Consult a Mentor</Button>
        </div>
      </div>
    </div>
  )
}
