'use client'

import { 
  Building2, 
  Users, 
  Globe, 
  CreditCard,
  History,
  Lock,
  Mail,
  MessageSquare,
  Cloud
} from "lucide-react"
import { SettingsGroupCard } from "@/components/settings/SettingsGroupCard"
import { SecuritySummary } from "@/components/settings/SecuritySummary"

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
      { label: "Team & Authorities", icon: Users, href: "/admin/settings/team", detail: "21 Members Active" },
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

export default function SettingsPage() {
  return (
    <div className="p-10 max-w-7xl mx-auto space-y-12 min-h-screen bg-slate-950">
      {/* 1. Header */}
      <div className="flex justify-between items-end text-left">
        <div className="space-y-1">
          <h1 className="text-4xl font-serif font-bold italic text-white tracking-tight">Institutional <span className="text-primary">Settings</span></h1>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Master control tower for the VIOS.</p>
        </div>
        <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-2xl">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">System Vitality: 100%</span>
        </div>
      </div>

      {/* 2. Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SETTINGS_GROUPS.map((group) => (
          <SettingsGroupCard key={group.title} group={group} />
        ))}

        {/* 3. Modular Security Summary */}
        <SecuritySummary />
      </div>
    </div>
  )
}
