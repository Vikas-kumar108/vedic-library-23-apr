import React from 'react'
import Link from 'next/link'
import { ChevronLeft, Info } from 'lucide-react'
import { MasterMemberForm } from '@/components/organisms/crm/master-member-form'

export default function NewMemberPage() {
  return (
    <div className="p-8 space-y-10 max-w-[1200px] mx-auto animate-in fade-in slide-in-from-top-4 duration-700">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/community" 
          className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-orange-600 hover:border-orange-200 transition-all shadow-sm"
        >
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Register Member</h1>
          <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
            <Link href="/admin" className="hover:text-slate-600 transition-colors">Admin</Link>
            <span>/</span>
            <Link href="/admin/community" className="hover:text-slate-600 transition-colors">Community</Link>
            <span>/</span>
            <span className="text-slate-600">New Registration</span>
          </div>
        </div>
      </div>

      {/* The Master Form */}
      <MasterMemberForm />

      <div className="h-20" />
    </div>
  )
}
