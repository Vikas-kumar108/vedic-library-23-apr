'use client'

import * as React from "react"
import { 
  BarChart3, 
  FileText, 
  Users as UsersIcon, 
  CreditCard, 
  Activity,
  PlusCircle,
  Bell,
  Search,
  Settings,
  ShieldCheck,
  HeartHandshake,
  IndianRupee,
  MessageSquare,
  ChevronRight,
  Package,
  Globe,
  Map
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

/**
 * AdminSidebar Organism
 * Responsibility: Control tower navigation for platform administrators.
 */
export function AdminSidebar() {
  const pathname = usePathname()

  const menuItems = [
    { label: 'Overview', icon: BarChart3, href: '/admin' },
    { label: 'Community', icon: HeartHandshake, href: '/admin/community' },
    { label: 'Communication', icon: MessageSquare, href: '/admin/communication' },
    { label: 'Governance', icon: ShieldCheck, href: '/admin/governance' },
    { label: 'Finance', icon: IndianRupee, href: '/admin/finance' },
    { label: 'Users', icon: UsersIcon, href: '/admin/users' },
    { label: 'Content', icon: FileText, href: '/admin/content' },
    { label: 'Payments', icon: CreditCard, href: '/admin/payments' },
    { label: 'Institutional Assets', icon: Package, href: '/admin/assets' },
    { label: 'Human Capital', icon: UsersIcon, href: '/admin/human-capital' },
    { label: 'Digital Ecosystem', icon: Globe, href: '/admin/integrations' },
    { label: 'Infrastructure', icon: Map, href: '/admin/projects' },
    { label: 'Analytics', icon: Activity, href: '/admin/analytics' },
  ]

  return (
    <aside className="w-72 h-screen bg-slate-900 text-slate-400 p-8 flex flex-col sticky top-0">
      <div className="flex items-center gap-3 mb-16">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20">
          A
        </div>
        <div className="flex flex-col">
          <span className="text-white font-bold tracking-tight">Vedic Library Main</span>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic">Public Trust</span>
        </div>
      </div>

      <div className="mb-10 px-4">
        <Link href="/select-organization" className="w-full h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between px-4 hover:bg-white/10 transition-all group">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Switch Organization</span>
          <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-blue-400" />
        </Link>
      </div>

      <nav className="flex-1 space-y-2">
        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4 px-4">Menu</div>
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link 
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all group",
                isActive ? "bg-white/10 text-white font-bold" : "hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className={cn("w-5 h-5 transition-colors", isActive ? "text-primary" : "text-slate-500 group-hover:text-slate-400")} />
              <span className="text-sm">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="pt-8 border-t border-white/5 space-y-4">
        <button className="flex items-center gap-4 px-4 py-2 hover:text-white transition-colors w-full">
          <Settings className="w-5 h-5" />
          <span className="text-sm">Settings</span>
        </button>
        <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-primary" />
          <div className="text-[10px] text-primary font-bold uppercase tracking-widest leading-none">Security Verified</div>
        </div>
      </div>
    </aside>
  )
}
