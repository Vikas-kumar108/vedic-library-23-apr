import React from 'react'
import Link from 'next/link'
import { 
  User, 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Mail, 
  Users, 
  HeartHandshake, 
  Shield, 
  Calendar,
  Plus,
  ArrowUpRight
} from 'lucide-react'
import { Button } from '@/components/atoms/button'
import { userStore } from '@/lib/identity-gateway'
import { notFound } from 'next/navigation'
import { cn } from '@/lib/utils'

const RELATION_COLORS: Record<string, { bg: string, text: string, border: string }> = {
  pitara: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100' },
  matara: { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-100' },
  vaivahika: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100' },
  sahodara: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-100' },
  guru: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-100' },
  shishya: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100' },
}

export default async function MemberProfilePage({ params }: { params: { id: string } }) {
  const member = await userStore.findUnique({
    where: { id: params.id },
    include: {
      user_profiles: true,
      family_links_family_links_user_idTousers: {
        include: { users_family_links_related_idTousers: { include: { user_profiles: true } } }
      },
      family_links_family_links_related_idTousers: {
        include: { users_family_links_user_idTousers: { include: { user_profiles: true } } }
      },
      contributions: {
        include: { transaction: true }
      },
      benefits: true,
    }
  })

  if (!member) notFound()

  // Readable Aliases for complex Prisma relations (Identity Domain Migration)
  const familyOut = member.family_links_family_links_user_idTousers || []
  const familyIn = member.family_links_family_links_related_idTousers || []

  // Group relations for display
  const connections = [
    ...familyOut.map(l => {
      const relatedUser = l.users_family_links_related_idTousers
      return { person: relatedUser, type: l.type, direction: 'out' }
    }),
    ...familyIn.map(l => {
      const relatedUser = l.users_family_links_user_idTousers
      return { person: relatedUser, type: l.type, direction: 'in' }
    })
  ]

  return (
    <div className="p-8 space-y-10 max-w-7xl mx-auto animate-in fade-in duration-700">
      {/* Header / Breadcrumbs */}
      <div className="flex items-center gap-6">
        <Link href="/admin/community" className="w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:text-orange-600 shadow-sm transition-all">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-slate-900">{member.user_profiles?.full_name || 'Unknown Member'}</h1>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">
            Member ID: {params.id.slice(0, 8)} • {member.user_profiles?.village || 'No Village'}, {member.user_profiles?.city || 'No City'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Column: Quick Actions & Roles */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          {/* Identity Card */}
          <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
            <div className="h-32 bg-slate-900 flex items-end justify-center p-6 relative">
               <div className="absolute top-4 right-4 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black text-white uppercase tracking-widest border border-white/10">
                 {member.roles[0]?.replace('_', ' ')}
               </div>
               <div className="w-24 h-24 rounded-3xl bg-white border-4 border-white shadow-xl flex items-center justify-center translate-y-12">
                  {member.user_profiles?.avatar_url ? (
                    <img src={member.user_profiles.avatar_url} className="w-full h-full object-cover rounded-2xl" alt="" />
                  ) : (
                    <User className="w-10 h-10 text-slate-200" />
                  )}
               </div>
            </div>
            <div className="pt-16 pb-8 px-8 text-center space-y-4">
               <div>
                  <h3 className="text-xl font-bold text-slate-900">{member.user_profiles?.full_name}</h3>
                  <div className="flex items-center justify-center gap-2 text-slate-400 text-xs mt-1">
                     <MapPin className="w-3 h-3" /> {member.user_profiles?.village}, {member.user_profiles?.city}
                  </div>
               </div>
               <div className="flex flex-wrap justify-center gap-2">
                 {member.roles.map(role => (
                   <span key={role} className="px-3 py-1 bg-slate-50 text-[10px] font-black text-slate-500 uppercase tracking-widest rounded-full border border-slate-100">
                     {role}
                   </span>
                 ))}
               </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 space-y-6 shadow-sm">
             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-4">Contact Information</h4>
             <div className="space-y-4">
                <div className="flex items-center gap-4 group">
                   <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                      <Phone className="w-4 h-4" />
                   </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Mobile</p>
                      <p className="text-sm font-bold text-slate-700">{member.user_profiles?.phone_number || 'Not provided'}</p>
                   </div>
                </div>
                <div className="flex items-center gap-4 group">
                   <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-orange-50 group-hover:text-orange-600 transition-all">
                      <Mail className="w-4 h-4" />
                   </div>
                   <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Email ID</p>
                      <p className="text-sm font-bold text-slate-700 truncate max-w-[200px]">{member.email}</p>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Right Column: Connections & History */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          
          {/* Family Tree / Connection Grid */}
          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm space-y-8">
             <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm">
                      <Users className="w-6 h-6" />
                   </div>
                   <div>
                      <h3 className="text-xl font-bold text-slate-900 tracking-tight">Family Connection Map</h3>
                      <p className="text-xs text-slate-400 font-medium">Visualizing linked relationships within the institution.</p>
                   </div>
                </div>
                <Button variant="ghost" className="rounded-xl flex items-center gap-2 text-blue-600 font-bold hover:bg-blue-50">
                   <Plus className="w-4 h-4" /> Link Family
                </Button>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {connections.length > 0 ? connections.map((conn, idx) => {
                  const colors = RELATION_COLORS[conn.type] || { bg: 'bg-slate-50', text: 'text-slate-500', border: 'border-slate-100' }
                  return (
                    <Link key={idx} href={`/admin/community/${conn.person.id}`}>
                      <div className={cn(
                        "p-6 rounded-2xl flex items-center justify-between hover:shadow-xl transition-all group border",
                        colors.bg,
                        colors.border
                      )}>
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-300 font-bold uppercase text-[10px]">
                               {conn.person.user_profiles?.full_name?.[0] || 'U'}
                            </div>
                            <div>
                               <p className="text-sm font-bold text-slate-800">{conn.person.user_profiles?.full_name || 'Unknown'}</p>
                               <p className={cn("text-[10px] font-black uppercase tracking-widest", colors.text)}>{conn.type}</p>
                            </div>
                         </div>
                         <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors" />
                      </div>
                    </Link>
                  )
                }) : (
                  <div className="col-span-2 py-12 border-2 border-dashed border-slate-100 rounded-[2rem] flex flex-col items-center justify-center text-slate-300">
                     <Users className="w-10 h-10 mb-2 opacity-20" />
                     <p className="text-xs font-semibold uppercase tracking-widest">No connections mapped</p>
                  </div>
                )}
             </div>
          </div>

          {/* History & Contributions Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm space-y-6">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-4 flex items-center gap-2">
                   <HeartHandshake className="w-4 h-4" /> Seva & Contributions
                </h4>
                <div className="space-y-4">
                   {member.contributions.length > 0 ? member.contributions.map((c, i) => (
                     <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
                        <div>
                           <p className="text-xs font-bold text-slate-700">{c.type}</p>
                           <p className="text-[10px] text-slate-400">{c.transaction?.date ? new Date(c.transaction.date).toLocaleDateString() : 'Unknown Date'}</p>
                        </div>
                        <p className="text-sm font-black text-slate-900">₹{c.amount?.toString() || '0'}</p>
                     </div>
                   )) : (
                     <p className="text-xs text-slate-400 text-center py-6">No contribution history recorded.</p>
                   )}
                </div>
             </div>

             <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm space-y-6">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-4 flex items-center gap-2">
                   <Shield className="w-4 h-4" /> Institutional Benefits
                </h4>
                <div className="space-y-4">
                   {member.benefits.length > 0 ? member.benefits.map((b, i) => (
                     <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
                        <div>
                           <p className="text-xs font-bold text-slate-700">{b.type}</p>
                           <p className="text-[10px] text-slate-400">{new Date(b.date).toLocaleDateString()}</p>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                     </div>
                   )) : (
                     <p className="text-xs text-slate-400 text-center py-6">No benefits recorded yet.</p>
                   )}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}
