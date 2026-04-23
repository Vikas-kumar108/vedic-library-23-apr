'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  BookOpen, 
  Zap, 
  User, 
  Users,
  Compass
} from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Mobile Navigation Bar
 * Responsibility: Provide bottom-fixed access to core platform areas on mobile devices.
 * Purpose: Ensures 'Apple-grade' ergonomics for seekers on the go.
 */
export function MobileNav() {
  const pathname = usePathname()

  const navItems = [
    { label: 'Home', icon: Home, href: '/dashboard' },
    { label: 'Library', icon: BookOpen, href: '/library' },
    { label: 'Search', icon: Compass, href: '/search' },
    { label: 'Practice', icon: Zap, href: '/practice' },
    { label: 'Profile', icon: User, href: '/profile' }
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-slate-100 px-6 py-3 md:hidden shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-between max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = pathname?.startsWith(item.href)
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 transition-all duration-300",
                isActive ? "text-primary scale-110" : "text-slate-400"
              )}
            >
              <div className={cn(
                "p-2 rounded-2xl transition-all",
                isActive ? "bg-primary/10" : "bg-transparent"
              )}>
                <item.icon className={cn("w-5 h-5", isActive ? "fill-primary/20" : "")} />
              </div>
              <span className="text-[8px] font-bold uppercase tracking-widest">{item.label}</span>
            </Link>
          )
        })}
      </div>
      {/* Home Indicator Safety Zone */}
      <div className="h-4" />
    </nav>
  )
}
