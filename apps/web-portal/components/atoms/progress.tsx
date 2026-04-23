'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface ProgressProps {
  value: number
  className?: string
}

export function Progress({ value, className }: ProgressProps) {
  return (
    <div className={cn("w-full bg-slate-100 rounded-full h-2 overflow-hidden", className)}>
      <div 
        className="bg-primary h-full transition-all duration-500 ease-out" 
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }} 
      />
    </div>
  )
}
