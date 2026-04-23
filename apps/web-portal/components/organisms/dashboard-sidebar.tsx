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
    { label: 'Profile', icon: User, href: '/profile' },
  ]

  return (
    <aside className="w-80 h-screen bg-white border-r border-slate-100 p-8 flex flex-col sticky top-0">
      {/* Branding */}
      <div className="flex items-center gap-3 mb-16 px-4">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20">
          V
        </div>
        <span className="text-xl font-bold font-serif text-slate-900 tracking-tight">VedicSkills</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link 
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-4 py-4 rounded-2xl transition-all group",
                isActive ? "bg-primary/5 text-primary font-bold shadow-sm" : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
              )}
            >
              <div className="flex items-center gap-4">
                <item.icon className={cn("w-5 h-5 transition-colors", isActive ? "text-primary" : "text-slate-300 group-hover:text-slate-400")} />
                <span className="text-sm uppercase tracking-widest">{item.label}</span>
              </div>
              {isActive && <ChevronRight className="w-4 h-4" />}
            </Link>
          )
        })}
      </nav>

      {/* Footer / Upgrade */}
      <div className="space-y-6 pt-8 border-t border-slate-50">
        <div className="bg-primary/5 p-6 rounded-[2rem] border border-primary/10 relative overflow-hidden group">
          <Sparkles className="absolute -top-2 -right-2 w-12 h-12 text-primary opacity-20 group-hover:scale-125 transition-transform" />
          <div className="relative z-10">
            <h4 className="font-bold text-slate-900 text-sm mb-1">Go Premium</h4>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed mb-4">Unlock all Shastras & Mentor access</p>
            <Link href="/pricing" className="text-xs font-bold text-primary underline underline-offset-4">Upgrade Now</Link>
          </div>
        </div>

        <button className="flex items-center gap-4 px-4 py-2 text-slate-400 hover:text-red-500 transition-colors w-full">
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-bold uppercase tracking-widest">Logout</span>
        </button>
      </div>
    </aside>
  )
}
