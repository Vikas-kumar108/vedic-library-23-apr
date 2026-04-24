import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 h-20">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white font-bold text-xl group-hover:rotate-12 transition-transform">V</div>
          <span className="text-xl font-bold tracking-tight text-slate-900">VedicSkills</span>
        </Link>

        {/* Center: Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/explore" className="text-sm font-semibold text-slate-600 hover:text-orange-600 transition-colors">Explore</Link>
          <Link href="/courses" className="text-sm font-semibold text-slate-600 hover:text-orange-600 transition-colors">Courses</Link>
          <Link href="/library" className="text-sm font-semibold text-slate-600 hover:text-orange-600 transition-colors">Library</Link>
          <Link href="/dana" className="text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors bg-orange-50 px-4 py-2 rounded-full">Dāna</Link>
          <Link href="/about" className="text-sm font-semibold text-slate-600 hover:text-orange-600 transition-colors">About</Link>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <Link href="/auth/login" className="text-sm font-semibold text-slate-600 hover:text-orange-600 transition-colors px-4">Login</Link>
          <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white rounded-xl h-11 px-6 shadow-lg shadow-orange-600/20 font-bold transition-transform hover:scale-105 active:scale-95">
            <Link href="/onboarding">Start Learning</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}
