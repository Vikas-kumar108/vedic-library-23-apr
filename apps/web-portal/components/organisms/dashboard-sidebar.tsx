"use client"

import React, { useState } from "react"
import { 
  LayoutDashboard, 
  Library, 
  BookOpen, 
  User, 
  Settings, 
  LogOut,
  Sparkles,
  Download,
  Users,
  HelpCircle,
  Menu,
  X
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function DashboardSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { label: 'Library', icon: Library, href: '/library' },
    { label: 'Courses', icon: BookOpen, href: '/courses' },
    { label: 'Practice', icon: Sparkles, href: '/practice' },
    { label: 'Community', icon: Users, href: '/community' },
    { label: 'Guidance', icon: HelpCircle, href: '/guidance' },
  ]

  const bottomItems = [
    { label: 'Profile', icon: User, href: '/profile' },
    { label: 'Settings', icon: Settings, href: '/settings' },
  ]

  return (
    <>
      {/* 🏛️ Mobile Trigger */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-6 right-6 z-[100] size-14 bg-white border border-slate-100 rounded-2xl shadow-2xl flex items-center justify-center text-slate-900"
      >
        {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
      </button>

      {/* 🏛️ Main Sidebar */}
      <aside className={cn(
        "fixed md:sticky top-0 left-0 w-72 h-screen bg-[#fdfcf5] border-r border-slate-100 p-8 flex flex-col z-[90] transition-transform duration-500 ease-in-out shadow-2xl md:shadow-none",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        {/* Branding */}
        <div className="flex items-center gap-4 mb-16 px-2">
          <div className="size-12 bg-[#e67e22] rounded-[1rem] flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-[#e67e22]/20">
            V
          </div>
          <span className="text-2xl font-serif font-bold italic text-slate-900 tracking-tight">VedicSkills</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link 
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-4 px-4 py-4 rounded-[1.25rem] transition-all group",
                  isActive 
                    ? "bg-slate-900 text-white shadow-xl shadow-slate-900/10" 
                    : "text-slate-500 hover:bg-white hover:text-slate-900 hover:shadow-lg hover:shadow-slate-200/20"
                )}
              >
                <item.icon className={cn("size-5 transition-colors", isActive ? "text-[#e67e22]" : "text-slate-400 group-hover:text-[#e67e22]")} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Bottom Menu */}
        <div className="space-y-2 pt-8 border-t border-slate-100">
          {bottomItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-4 px-4 py-4 rounded-[1.25rem] text-slate-500 hover:bg-white hover:text-slate-900 transition-all group hover:shadow-lg hover:shadow-slate-200/20"
            >
              <item.icon className="size-5 text-slate-400 group-hover:text-[#e67e22]" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">{item.label}</span>
            </Link>
          ))}
          <button className="w-full flex items-center gap-4 px-4 py-4 rounded-[1.25rem] text-red-400 hover:bg-red-50 transition-all group">
            <LogOut className="size-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[80] md:hidden animate-in fade-in duration-500"
        />
      )}
    </>
  )
}
