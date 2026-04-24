import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useAuth } from '@/features/auth/hooks/useAuth'

export function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#fdfcf5]/80 backdrop-blur-md border-b border-slate-100 h-24">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className="size-12 bg-[#e67e22] rounded-[1rem] flex items-center justify-center text-white font-black text-2xl group-hover:rotate-12 transition-transform shadow-lg shadow-[#e67e22]/20">V</div>
          <span className="text-2xl font-serif font-bold italic tracking-tight text-slate-900">VedicSkills</span>
        </Link>

        {/* Center: Navigation */}
        <div className="hidden md:flex items-center gap-10">
          <NavLink href="/explore">Explore</NavLink>
          <NavLink href="/courses">Courses</NavLink>
          <NavLink href="/library">Library</NavLink>
          {user && <NavLink href="/dashboard">Dashboard</NavLink>}
          <Link 
            href="/dana" 
            className="text-[10px] font-black text-[#e67e22] uppercase tracking-[0.2em] bg-[#e67e22]/5 px-6 py-2.5 rounded-full hover:bg-[#e67e22]/10 transition-all border border-[#e67e22]/10 shadow-sm"
          >
            Dāna
          </Link>
          <NavLink href="/about">About</NavLink>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-6">
          {!user ? (
            <>
              <Link href="/auth/login" className="text-[10px] font-black text-slate-500 hover:text-[#e67e22] uppercase tracking-[0.2em] transition-colors">
                Login
              </Link>
              <Button asChild className="bg-slate-900 hover:bg-[#e67e22] text-white rounded-[1rem] h-14 px-8 shadow-xl shadow-slate-900/10 font-black text-[10px] uppercase tracking-widest transition-all hover:scale-105 active:scale-95">
                <Link href="/onboarding">Start Journey</Link>
              </Button>
            </>
          ) : (
            <button 
              onClick={() => logout()}
              className="text-[10px] font-black text-rose-500 hover:text-rose-600 uppercase tracking-[0.2em] transition-colors"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="text-[10px] font-black text-slate-500 hover:text-[#e67e22] uppercase tracking-[0.2em] transition-all relative group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e67e22] transition-all group-hover:w-full" />
    </Link>
  )
}
