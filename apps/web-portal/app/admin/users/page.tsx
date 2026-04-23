'use client'

import React from 'react'
import { 
  Users, 
  Search, 
  UserPlus, 
  Filter, 
  Mail, 
  ShieldCheck, 
  TrendingUp,
  MapPin,
  MoreVertical,
  Zap,
  X,
  Save,
  Shield
} from 'lucide-react'
import { Button } from '@/components/atoms/button'
import { Badge } from '@/components/atoms/badge'
import { cn } from '@/lib/utils'

/**
 * Admin User Management (Enhanced with Entry Form)
 */
export default function AdminUsersPage() {
  const [showAddForm, setShowAddForm] = React.useState(false)
  
  const users = [
    { id: '1', name: 'Nitai Das', email: 'nitai@vedicskills.com', stage: 'Grihastha', tier: 'PRACTITIONER', joinDate: '2026-04-10' },
    { id: '2', name: 'Radha K.', email: 'radha@wisdom.org', stage: 'Brahmacharini', tier: 'SCHOLAR', joinDate: '2026-04-12' },
    { id: '3', name: 'Shiva M.', email: 'shiva@gmail.com', stage: 'Grihastha', tier: 'SEEKER', joinDate: '2026-04-15' },
  ]

  return (
    <div className="p-10 space-y-10 max-w-7xl mx-auto animate-in fade-in duration-700 relative">
      
      {/* 16-Category Style User Entry Sidebar (Zoho Style) */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-[600px] bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
            <header className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-3">
                <UserPlus className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-800 uppercase tracking-widest text-xs">Register System User</h3>
              </div>
              <button onClick={() => setShowAddForm(false)} className="w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center transition-colors">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-10 space-y-8">
              <div className="space-y-6">
                <div className="grid gap-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Display Name</label>
                  <input className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-sm outline-none focus:border-blue-500" placeholder="e.g. Nitai Gauranga" />
                </div>
                <div className="grid gap-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Email Address</label>
                  <input className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-sm outline-none focus:border-blue-500" placeholder="name@vedic.com" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="grid gap-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">System Role</label>
                    <select className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-sm outline-none">
                      <option>Student</option>
                      <option>Mentor</option>
                      <option>Admin</option>
                      <option>Coordinator</option>
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Spiritual Tier</label>
                    <select className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-sm outline-none">
                      <option>Seeker</option>
                      <option>Practitioner</option>
                      <option>Scholar</option>
                    </select>
                  </div>
                </div>
                <div className="p-6 bg-blue-50 rounded-sm border border-blue-100 space-y-4">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-600" />
                    <span className="text-[10px] font-black text-blue-900 uppercase tracking-widest">Access Permissions</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-3 text-xs text-blue-800 font-medium">
                      <input type="checkbox" defaultChecked className="rounded border-blue-200" /> Enable Portal Access
                    </label>
                    <label className="flex items-center gap-3 text-xs text-blue-800 font-medium">
                      <input type="checkbox" className="rounded border-blue-200" /> Grant Admin Permissions
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <footer className="p-8 border-t border-slate-100 bg-slate-50 flex justify-end gap-4">
              <Button onClick={() => setShowAddForm(false)} variant="ghost" className="h-10 px-6 text-xs font-bold text-slate-500">Cancel</Button>
              <Button className="h-10 px-8 text-xs font-bold bg-blue-600 text-white rounded-sm shadow-lg">
                <Save className="w-4 h-4 mr-2" /> Save User
              </Button>
            </footer>
          </div>
        </div>
      )}

      <header className="flex items-end justify-between border-b border-slate-200 pb-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                <Users className="w-5 h-5" />
             </div>
             <h1 className="text-4xl font-serif font-bold text-slate-900">System <span className="text-blue-600 italic">Users</span></h1>
          </div>
          <p className="text-sm text-slate-500 italic">Manage account permissions and spiritual tiers for digital members.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="h-12 rounded-xl px-6 border-slate-200">
            <Mail className="w-4 h-4 mr-2" /> Broadcast
          </Button>
          <Button onClick={() => setShowAddForm(true)} className="h-12 rounded-xl px-8 shadow-xl shadow-blue-600/20 bg-blue-600 hover:bg-blue-700 text-white border-none">
            <UserPlus className="w-4 h-4 mr-2" /> Add System User
          </Button>
        </div>
      </header>

      {/* METRICS ROW */}
      <div className="grid md:grid-cols-4 gap-6">
        {[
          { label: 'Total Users', value: '12,842', trend: '+12%', icon: Users },
          { label: 'Active Today', value: '4,210', trend: '+5%', icon: Zap },
          { label: 'Permissions', value: '86', trend: 'Secure', icon: ShieldCheck },
          { label: 'Avg Study Time', value: '45m', trend: '+10%', icon: TrendingUp },
        ].map((m, i) => (
          <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                <m.icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{m.trend}</span>
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{m.label}</div>
              <div className="text-2xl font-bold text-slate-900">{m.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* SEARCH & FILTERS */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative group flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          <input 
            type="text" 
            placeholder="Search by name, email, or stage..." 
            className="w-full h-14 pl-12 pr-6 rounded-2xl border border-slate-200 bg-white shadow-sm outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all text-sm"
          />
        </div>
        <Button variant="outline" className="h-14 rounded-2xl px-8 border-slate-200 bg-white font-bold text-slate-500">
          <Filter className="w-4 h-4 mr-2" /> Filter by Stage
        </Button>
      </div>

      {/* USERS TABLE */}
      <section className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Seeker</th>
              <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Life Stage</th>
              <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Membership Tier</th>
              <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Join Date</th>
              <th className="px-8 py-5 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {users.map((user) => (
              <tr key={user.id} className="group hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-bold uppercase text-xs">
                        {user.name[0]}
                     </div>
                     <div>
                        <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{user.name}</div>
                        <div className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">{user.email}</div>
                     </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                   <Badge variant="outline" className="rounded-lg text-[9px] border-slate-100 text-slate-500 font-bold">{user.stage}</Badge>
                </td>
                <td className="px-8 py-6">
                   <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        user.tier === 'SCHOLAR' ? "bg-blue-600" : (user.tier === 'PRACTITIONER' ? "bg-green-500" : "bg-slate-300")
                      )} />
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-widest",
                        user.tier === 'SCHOLAR' ? "text-blue-600" : (user.tier === 'PRACTITIONER' ? "text-green-600" : "text-slate-400")
                      )}>
                        {user.tier}
                      </span>
                   </div>
                </td>
                <td className="px-8 py-6">
                   <span className="text-xs text-slate-400 italic">{user.joinDate}</span>
                </td>
                <td className="px-8 py-6 text-right">
                   <button className="p-2 hover:bg-white rounded-xl shadow-sm border border-slate-100 text-slate-400 opacity-0 group-hover:opacity-100 transition-all">
                      <MoreVertical className="w-4 h-4" />
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}
