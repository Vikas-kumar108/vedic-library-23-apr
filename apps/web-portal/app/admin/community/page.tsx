import React from 'react'
import Link from 'next/link'
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  MapPin, 
  ArrowUpRight,
  TrendingUp,
  HeartHandshake
} from 'lucide-react'
import { Button } from '@/components/atoms/button'
import { getMembers } from './actions'
import { cn } from '@/lib/utils'

export default async function CommunityAdminPage() {
  const members = await getMembers()

  const stats = [
    { label: 'Total Community', value: members.length, icon: Users, color: 'bg-blue-500' },
    { label: 'Active Donors', value: members.filter(m => m.roles.includes('donor')).length, icon: HeartHandshake, color: 'bg-orange-500' },
    { label: 'Villages Covered', value: new Set(members.map(m => m.village).filter(Boolean)).size, icon: MapPin, color: 'bg-green-500' },
  ]

  return (
    <div className="p-8 space-y-10 max-w-[1600px] mx-auto animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Community Management</h1>
          <p className="text-slate-500 mt-2 font-medium">Outreach, Donors, Mentors & Family Connections</p>
        </div>
        <Button asChild size="lg" className="bg-slate-900 hover:bg-orange-600 text-white rounded-2xl h-14 px-8 shadow-xl shadow-slate-900/10 transition-all hover:scale-105">
          <Link href="/admin/community/new" className="flex items-center gap-3">
            <UserPlus className="w-5 h-5" />
            Add New Member
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
            <div className={cn("absolute -right-4 -top-4 w-24 h-24 blur-[60px] opacity-20", stat.color)} />
            <div className="flex items-center gap-6 relative z-10">
              <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg", stat.color)}>
                <stat.icon className="w-8 h-8" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-slate-900">{stat.value}</span>
                  <span className="text-[10px] font-bold text-green-500 flex items-center gap-0.5">
                    <TrendingUp className="w-3 h-3" /> +12%
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main List Section */}
      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-300" />
            <input 
              placeholder="Search by name, village, or role..." 
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
            />
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" className="rounded-xl flex items-center gap-2 text-slate-500 font-bold hover:bg-slate-50">
              <Filter className="w-4 h-4" /> Filters
            </Button>
            <Button variant="ghost" className="rounded-xl flex items-center gap-2 text-slate-500 font-bold hover:bg-slate-50">
              Export PDF
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50 text-left">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Member</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Village / Location</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Roles</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Family Status</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {members.length > 0 ? members.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50/30 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200 overflow-hidden">
                        {member.avatarUrl ? (
                          <img src={member.avatarUrl} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <Users className="w-6 h-6 text-slate-300" />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 leading-tight">{member.full_name}</p>
                        <p className="text-[11px] text-slate-400 mt-1">{member.phoneNumber || member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-slate-600 font-medium">
                      <MapPin className="w-3 h-3 text-orange-400" />
                      {member.village || 'N/A'}, {member.city || ''}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex gap-2">
                      {member.roles.map(role => (
                        <span key={role} className="px-3 py-1 bg-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-500 rounded-full border border-slate-200">
                          {role.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                      member.familyLinks?.length > 0 ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-400"
                    )}>
                      {member.familyLinks?.length > 0 ? `${member.familyLinks.length} Linked` : 'Single'}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <Link href={`/admin/community/${member.id}`}>
                      <Button variant="ghost" className="w-10 h-10 rounded-xl p-0 hover:bg-orange-600 hover:text-white transition-all">
                        <ArrowUpRight className="w-5 h-5" />
                      </Button>
                    </Link>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <div className="max-w-xs mx-auto space-y-4">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                        <Users className="w-8 h-8" />
                      </div>
                      <p className="text-slate-400 font-bold">No members registered yet.</p>
                      <Button asChild variant="outline" className="rounded-xl">
                        <Link href="/admin/community/new">Add Your First Member</Link>
                      </Button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
