'use client'

import React from 'react'
import Link from 'next/link'

/**
 * Footer Organism
 * Responsibility: Provide consistent site-wide secondary navigation and brand info.
 */
export function Footer() {
  return (
    <footer className="py-20 border-t border-slate-100 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">V</div>
            <span className="text-lg font-bold text-slate-900">VedicSkills</span>
          </div>
          <div className="flex items-center gap-8 text-sm font-semibold text-slate-400">
            <Link href="/library" className="hover:text-primary transition-colors">Library</Link>
            <Link href="/courses" className="hover:text-primary transition-colors">Courses</Link>
            <Link href="/community" className="hover:text-primary transition-colors">Sangha</Link>
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
          </div>
        </div>
        <div className="text-center text-slate-300 text-[10px] font-bold uppercase tracking-widest">
          © 2026 VedicSkills Platform. Preserving Ancient Wisdom for Modern Seekers.
        </div>
      </div>
    </footer>
  )
}
