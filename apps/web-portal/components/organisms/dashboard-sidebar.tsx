'use client'

import * as React from "react"
import { 
  LayoutDashboard, 
  Library, 
  BookOpen, 
  User, 
  Settings, 
  LogOut,
  Sparkles,
  ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

/**
 * DashboardSidebar Organism
 * Responsibility: Persistent navigation for logged-in users.
 */
export function DashboardSidebar() {
  const pathname = usePathname()

  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { label: 'Library', icon: Library, href: '/library' },
    { label: 'Courses', icon: BookOpen, href: '/courses' },
    { label: 'Practice', icon: Sparkles, href: '/practice' },
    { label: 'Community', icon: UsersIcon, href: '/community' },
    { label: 'Guidance', icon: HelpCircle, href: '/guidance' },
  ]

  const bottomItems = [
    { label: 'Profile', icon: User, href: '/profile' },
    { label: 'Settings', icon: Settings, href: '/settings' },
  ]

  return (
    <aside className="w-64 h-screen bg-slate-50/50 border-r border-slate-100 p-6 flex flex-col sticky top-0">
      {/* Branding */}
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20">
          V
        </div>
        <span className="text-lg font-bold font-serif text-slate-900 tracking-tight">VedicSkills</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link 
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-xl transition-all group",
                isActive ? "bg-primary/10 text-primary font-bold" : "text-slate-500 hover:bg-slate-100/50 hover:text-slate-900"
              )}
            >
              <item.icon className={cn("w-4 h-4 transition-colors", isActive ? "text-primary" : "text-slate-400 group-hover:text-slate-600")} />
              <span className="text-xs uppercase tracking-widest">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Bottom Menu */}
      <div className="space-y-1 pt-6 border-t border-slate-100">
        {bottomItems.map((item) => (
          <Link 
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-500 hover:bg-slate-100/50 hover:text-slate-900 transition-all group"
          >
            <item.icon className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
            <span className="text-xs uppercase tracking-widest">{item.label}</span>
          </Link>
        ))}
      </div>
    </aside>
  )
}

import { Users as UsersIcon, HelpCircle } from "lucide-react"
