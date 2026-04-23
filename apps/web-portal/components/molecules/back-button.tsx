'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { Button } from '../atoms/button'
import { cn } from '@/lib/utils'

/**
 * BackButton Molecule
 * Responsibility: History-based navigation (The "Back" logic).
 * Purpose: Returns the user to their exactly previous state.
 */
interface BackButtonProps {
  label?: string
  className?: string
}

export function BackButton({ label = "Back", className }: BackButtonProps) {
  const router = useRouter()

  return (
    <button 
      onClick={() => router.back()}
      className={cn(
        "inline-flex items-center text-sm font-bold text-slate-400 hover:text-primary transition-colors group mb-8",
        className
      )}
    >
      <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center mr-3 group-hover:border-primary/20 group-hover:bg-primary/5 transition-all">
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
      </div>
      <span className="uppercase tracking-widest">{label}</span>
    </button>
  )
}
