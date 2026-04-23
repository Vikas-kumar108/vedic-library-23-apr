import { 
  Building2, 
  Users, 
  Settings2, 
  ShieldAlert, 
  BellRing, 
  Cloud, 
  CreditCard,
  History,
  Lock,
  Globe,
  Mail,
  MessageSquare
} from "lucide-react"
import Link from "next/link"

const SETTINGS_GROUPS = [
  {
    title: "Organization & Identity",
    description: "Manage your trust's core identity and legal presence.",
    items: [
      { label: "Trust Profile", icon: Building2, href: "/admin/settings/profile", detail: "Name, Registration, PAN/TAN" },
      { label: "Institutional Branding", icon: Globe, href: "/admin/settings/branding", detail: "Logos, Colors, Typography" },
      { label: "Subscription Tier", icon: CreditCard, href: "/admin/settings/billing", detail: "Current Plan: Institutional Pro" }
    ]
  },
  {
    title: "Governance & Security",
    description: "Control who holds authority and witness system actions.",
    items: [
      { label: "Team & Authorities", icon: UsersIcon, href: "/admin/settings/team", detail: "21 Members Active" },
      { label: "Sovereign Permissions", icon: Lock, href: "/admin/settings/roles", detail: "Define Role Access Levels" },
      { label: "Audit Logs", icon: History, href: "/admin/settings/audit", detail: "Eternal Witness Timeline" }
    ]
  },
  {
    title: "Orchestration & Gateways",
    description: "Configure the engines that power your outreach.",
    items: [
      { label: "WhatsApp Gateway", icon: MessageSquare, href: "/admin/settings/integrations?tab=whatsapp", detail: "Status: 🟢 Connected" },
      { label: "Email Engine", icon: Mail, href: "/admin/settings/integrations?tab=email", detail: "Status: 🟢 Connected" },
      { label: "API & Webhooks", icon: Cloud, href: "/admin/settings/integrations?tab=api", detail: "Institutional Data Feed" }
    ]
  }
]

import { Users as UsersIcon } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="p-10 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight text-white">Institutional Settings</h1>
          <p className="text-slate-500 font-medium">Master control tower for the Vedic Institutional Operating System.</p>
        </div>
        <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-2xl">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">System Vitality: 100%</span>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SETTINGS_GROUPS.map((group) => (
          <div key={group.title} className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8 space-y-6 hover:bg-white/[0.05] transition-all">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white">{group.title}</h2>
              <p className="text-sm text-slate-500">{group.description}</p>
            </div>

            <div className="space-y-3">
              {group.items.map((item) => (
                <Link 
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/50 hover:bg-primary/5 transition-all group"
                >
                  <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-primary/30">
                    <item.icon className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-white group-hover:text-primary transition-colors">{item.label}</div>
                    <div className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{item.detail}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Global Security Summary */}
        <div className="bg-slate-900 border border-white/10 rounded-[32px] p-8 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <ShieldAlert className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-bold text-white">Security Integrity</h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Database Encryption</span>
                <span className="text-emerald-500 font-bold">AES-256</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Multi-Factor Auth</span>
                <span className="text-amber-500 font-bold">REQUIRED</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Audit Trail Retention</span>
                <span className="text-slate-200">PERMANENT</span>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/5">
            <button className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
              Run Institutional Health Check
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
