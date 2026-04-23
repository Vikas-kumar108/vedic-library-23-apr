'use client'

import React from 'react'
import Link from 'next/link'
import { LanguageSelector } from './language-selector'
import { Button } from '@/components/ui/button'
import { User, LogIn, Library } from 'lucide-react'

export function MainNavbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-serif text-2xl tracking-tighter text-foreground flex items-center gap-2">
            <span className="w-8 h-8 bg-[var(--saffron-light)] rounded-lg flex items-center justify-center text-white font-bold">N</span>
            NIKHIL
          </Link>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/library" className="hover:text-primary transition-colors flex items-center gap-2">
              <Library className="h-4 w-4" /> Library
            </Link>
            <Link href="/practical-library" className="hover:text-primary transition-colors">Practical Wisdom</Link>
            <Link href="/courses" className="hover:text-primary transition-colors">Courses</Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <LanguageSelector />
          <Separator orientation="vertical" className="h-4" />
          <Button asChild variant="ghost" size="sm" className="hidden sm:flex rounded-full">
            <Link href="/auth/login">
              <LogIn className="mr-2 h-4 w-4" /> Login
            </Link>
          </Button>
          <Button asChild size="sm" className="rounded-full px-5 bg-[var(--knowledge-blue)]">
            <Link href="/auth/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}

function Separator({ orientation, className }: { orientation: string, className: string }) {
  return <div className={`bg-border/50 ${orientation === 'vertical' ? 'w-[1px]' : 'h-[1px]'} ${className}`} />
}
