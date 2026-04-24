'use client'

import React from 'react'
import { 
  Users, 
  CreditCard, 
  UserCheck, 
  TrendingUp, 
  PlusCircle, 
  BookPlus, 
  Search, 
  Bell, 
  Clock, 
  ArrowUpRight,
  MoreVertical,
  Package
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/atoms/button'
import { AdminSidebar } from '@/components/organisms/admin-sidebar'
import { cn } from '@/lib/utils'

/**
 * Admin Dashboard Page
 * Responsibility: Central command for platform growth and management.
 * Purpose: Provides high-level visibility into metrics and quick access to management tools.
 */
export default function AdminDashboardPage() {
  const stats = [
    { label: 'Total Users', value: '12,842', trend: '+12%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Total Revenue', value: '₹8.4L', trend: '+8%', icon: CreditCard, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Active Subs', value: '1,240', trend: '+15%', icon: UserCheck, color: 'text-primary', bg: 'bg-primary/5' },
  ]

  const recentActivity = [
    { id: 1, type: 'signup', user: 'Radha K.', detail: 'Joined as Free Member', time: '2 min ago' },
    { id: 2, type: 'payment', user: 'Shiva M.', detail: 'Upgraded to Premium', time: '15 min ago' },
    { id: 3, type: 'content', user: 'Admin', detail: 'New Lesson: "The Art of Duty"', time: '1h ago' },
    { id: 4, type: 'support', user: 'Laxmi P.', detail: 'Requested Mentor Access', time: '3h ago' },
  ]

  return (
    <>
      {/* Sidebar is provided by AdminLayout */}
      
      <main className="flex-1 p-10 space-y-10 max-w-7xl mx-auto">
        {/* Top Navigation Bar */}
        <header className="flex items-center justify-between gap-8 mb-4">
          <div className="flex-1 relative max-w-md group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search users, payments, or content..." 
              className="w-full h-12 pl-12 pr-4 rounded-xl border border-slate-200 bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all text-sm"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 relative cursor-pointer hover:bg-slate-50">
              <Bell className="w-5 h-5" />
              <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </div>
            <div className="flex items-center gap-3 bg-white p-1 rounded-xl border border-slate-100 pr-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-xs">AD</div>
              <span className="text-sm font-bold text-slate-700">Admin</span>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <section className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", stat.bg)}>
                  <stat.icon className={cn("w-6 h-6", stat.color)} />
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full uppercase tracking-widest">
                  <TrendingUp className="w-3 h-3" /> {stat.trend}
                </div>
              </div>
              <div>
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                <div className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</div>
              </div>
            </div>
          ))}
        </section>

        <div className="grid lg:grid-cols-[1fr_400px] gap-10">
          {/* Recent Activity Feed */}
          <section className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" /> Recent Activity
              </h2>
              <Button variant="ghost" className="text-xs font-bold text-slate-400 uppercase tracking-widest">View History</Button>
            </div>
            <div className="divide-y divide-slate-50">
              {recentActivity.map((act) => (
                <div key={act.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs uppercase">
                      {act.user[0]}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">{act.user}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{act.detail}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{act.time}</div>
                    <ArrowUpRight className="w-4 h-4 text-slate-200 ml-auto mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Actions */}
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900 px-4">Management Toolset</h2>
            <div className="grid gap-4">
              <button className="flex items-center justify-between p-6 bg-primary text-white rounded-[1.5rem] shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <BookPlus className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold">Add New Course</div>
                    <div className="text-[10px] text-white/60 font-bold uppercase tracking-widest">Growth Engine</div>
                  </div>
                </div>
                <PlusCircle className="w-6 h-6 text-white/50 group-hover:text-white transition-colors" />
              </button>

              <button className="flex items-center justify-between p-6 bg-white border border-slate-100 text-slate-700 rounded-[1.5rem] shadow-sm hover:shadow-md hover:border-primary/20 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center">
                    <PlusCircle className="w-6 h-6 text-slate-400" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-slate-900">Create New Lesson</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Content Update</div>
                  </div>
                </div>
                <ArrowUpRight className="w-6 h-6 text-slate-200 group-hover:text-primary transition-colors" />
              </button>

              <Link href="/admin/assets" className="flex items-center justify-between p-6 bg-white border border-slate-100 text-slate-700 rounded-[1.5rem] shadow-sm hover:shadow-md hover:border-indigo-200 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
                    <Package className="w-6 h-6 text-indigo-500" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-slate-900">Institutional Assets</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">QR Inventory</div>
                  </div>
                </div>
                <ArrowUpRight className="w-6 h-6 text-slate-200 group-hover:text-indigo-500 transition-colors" />
              </Link>

              <div className="p-8 bg-slate-900 rounded-[2rem] text-white space-y-6 relative overflow-hidden">
                <div className="relative z-10 space-y-2">
                  <div className="text-[10px] font-bold text-primary uppercase tracking-widest">Platform Status</div>
                  <h4 className="text-lg font-bold">System Integrity: 100%</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">All services operational. Syncing with Global Shastra Database.</p>
                </div>
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
              </div>
            </div>
          </section>
        </div>

      </main>
    </>
  )
}
