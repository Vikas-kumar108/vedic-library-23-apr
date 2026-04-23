'use client'

import React from 'react'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Breadcrumb Molecule
 * Responsibility: Logical structural navigation (The "Up" logic).
 * Purpose: Helps users understand where they are in the hierarchy.
 */
interface BreadcrumbItem {
  label: string
  href: string
  active?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={cn("flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-8", className)}>
      <Link href="/" className="hover:text-primary transition-colors">
        <Home className="w-3.5 h-3.5" />
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          {item.active ? (
            <span className="text-slate-900 truncate max-w-[200px]">{item.label}</span>
          ) : (
            <Link href={item.href} className="hover:text-primary transition-colors">
              {item.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}
