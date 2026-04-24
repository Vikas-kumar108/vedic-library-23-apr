'use client'

import React, { useState } from 'react'
import { 
  Send, 
  Mail, 
  MessageSquare, 
  Phone, 
  Users, 
  Search, 
  Plus, 
  Clock,
  CheckCircle2,
  Filter,
  MoreVertical,
  ChevronRight,
  BookOpen
} from 'lucide-react'
import { Button } from '@/components/atoms/button'
import { Badge } from '@/components/atoms/badge'
import { cn } from '@/lib/utils'
import { getCampaigns, getSubscriptionTiers } from './actions'
import { format } from 'date-fns'
import { BroadcastModal } from '@/features/admin/communication/BroadcastModal'

/**
 * Communication Hub Dashboard (Admin)
 * Responsibility: Manage personalized outreach across Email, SMS, and WhatsApp.
 */

export default function CommunicationHub() {
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [tiers, setTiers] = useState<any[]>([])
  const [isBroadcastOpen, setIsBroadcastOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load data on mount since it's now a client component
  React.useEffect(() => {
    Promise.all([getCampaigns(), getSubscriptionTiers()]).then(([c, t]) => {
      setCampaigns(c)
      setTiers(t)
      setIsLoaded(true)
    })
  }, [])

  const totalSubscribers = tiers.reduce((acc, curr) => acc + (curr._count?.users || 0), 0)

  if (!isLoaded) return <div className="p-20 text-center font-serif italic text-slate-400">Illuminating Communication Hub...</div>

  return (
    <div className="p-10 space-y-10 animate-in fade-in duration-700">
      
      {/* Header Section */}
      <header className="flex justify-between items-end border-b border-slate-100 pb-10">
        <div className="space-y-4">
           <h1 className="text-4xl font-serif font-bold text-slate-900 tracking-tight italic">Communication <span className="text-blue-600">Hub</span></h1>
           <div className="flex items-center gap-4">
              <Badge variant="outline" className="h-8 px-4 rounded-full border-slate-200 text-slate-500 font-bold uppercase tracking-widest text-[9px]">
                Intelligent Outreach Active
              </Badge>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-green-500" /> {totalSubscribers.toLocaleString()}+ Subscribed Members
              </p>
           </div>
        </div>
        <div className="flex gap-4">
          <Button 
            onClick={() => setIsBroadcastOpen(true)}
            className="h-14 px-8 bg-slate-900 hover:bg-black text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-slate-200 transition-all border border-slate-800"
          >
            <BookOpen className="w-4 h-4 mr-2 text-blue-400" /> Broadcast Wisdom
          </Button>
          <Button className="h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-200 transition-all">
            <Plus className="w-4 h-4 mr-2" /> Create Campaign
          </Button>
        </div>

        <BroadcastModal 
          isOpen={isBroadcastOpen} 
          onClose={() => setIsBroadcastOpen(false)} 
        />
      </header>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        {[
          { label: 'Email Open Rate', value: '68%', icon: Mail, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'WA Engagement', value: '92%', icon: MessageSquare, color: 'text-green-500', bg: 'bg-green-50' },
          { label: 'SMS Delivery', value: '99%', icon: Phone, color: 'text-orange-500', bg: 'bg-orange-50' },
          { label: 'Subscribers', value: totalSubscribers.toLocaleString(), icon: Users, color: 'text-purple-500', bg: 'bg-purple-50' },
        ].map((stat, i) => (
          <div key={i} className="p-6 bg-white border border-slate-100 rounded-[2rem] shadow-sm flex items-center gap-4">
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", stat.bg, stat.color)}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{stat.label}</p>
              <p className="text-xl font-black text-slate-900 mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Campaign List */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em]">Active Campaigns</h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-300" />
              <input type="text" placeholder="Search campaigns..." className="h-9 pl-9 pr-4 bg-slate-50 border border-slate-100 rounded-xl text-[10px] outline-none focus:ring-2 focus:ring-blue-500/20" />
            </div>
            <Button variant="outline" className="h-9 px-4 rounded-xl border-slate-100 text-[10px] font-bold">
              <Filter className="w-3 h-3 mr-2" /> Filter
            </Button>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-[3rem] overflow-hidden shadow-sm">
           <table className="w-full text-left">
              <thead>
                 <tr className="border-b border-slate-50">
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Campaign Title</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Channel</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Target Tier</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Reach</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                 </tr>
              </thead>
                 <tbody className="divide-y divide-slate-50">
                    {campaigns.map((c) => (
                       <tr key={c.id} className="group hover:bg-slate-50/50 transition-colors cursor-pointer">
                          <td className="px-8 py-6">
                             <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                   <Send className="w-4 h-4" />
                                </div>
                                <div>
                                   <p className="text-sm font-bold text-slate-900">{c.title}</p>
                                   <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5 italic flex items-center gap-1">
                                     <Clock className="w-3 h-3" /> {c.sentAt ? format(new Date(c.sentAt), 'MMM d, h:mm a') : (c.scheduledAt ? `Scheduled: ${format(new Date(c.scheduledAt), 'MMM d')}` : 'No date')}
                                   </p>
                                </div>
                             </div>
                          </td>
                          <td className="px-8 py-6">
                             <Badge variant="outline" className="rounded-full border-slate-200 text-[9px] font-bold px-3">
                                {c.type === 'EMAIL' && <Mail className="w-3 h-3 mr-1 text-blue-500" />}
                                {c.type === 'WHATSAPP' && <MessageSquare className="w-3 h-3 mr-1 text-green-500" />}
                                {c.type === 'SMS' && <Phone className="w-3 h-3 mr-1 text-orange-500" />}
                                {c.type}
                             </Badge>
                          </td>
                          <td className="px-8 py-6">
                             <p className="text-xs font-bold text-slate-700">{c.targetTier?.name || 'All Members'}</p>
                          </td>
                          <td className="px-8 py-6">
                             <span className={cn(
                               "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                               c.status.toUpperCase() === 'SENT' ? "bg-green-50 text-green-600" : 
                               c.status.toUpperCase() === 'SCHEDULED' ? "bg-blue-50 text-blue-600" : "bg-slate-100 text-slate-500"
                             )}>
                                {c.status}
                             </span>
                          </td>
                          <td className="px-8 py-6">
                             <p className="text-xs font-bold text-slate-700">{c.reach || '-'}</p>
                          </td>
                          <td className="px-8 py-6 text-right">
                             <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                                <MoreVertical className="w-4 h-4" />
                             </button>
                          </td>
                       </tr>
                    ))}
                    {campaigns.length === 0 && (
                       <tr>
                          <td colSpan={6} className="px-8 py-20 text-center text-slate-400 italic text-xs">
                             No campaigns recorded.
                          </td>
                       </tr>
                    )}
                 </tbody>
           </table>
        </div>
      </section>

      {/* Subscription Tiers Summary */}
      <section className="grid md:grid-cols-2 gap-10">
         <div className="p-10 bg-slate-900 rounded-[3rem] text-white space-y-8 relative overflow-hidden group">
            <div className="relative z-10 space-y-6">
               <h3 className="text-2xl font-serif font-bold italic">Named Subscription <span className="text-blue-400">Tiers</span></h3>
               <p className="text-white/40 text-sm leading-relaxed">Personalize outreach based on spiritual interest groups rather than just numbers.</p>
                <div className="space-y-4">
                   {tiers.map((t, i) => (
                    <div key={i} className="flex justify-between items-center group/item">
                       <div className="flex items-center gap-3">
                          <div className={cn("w-2 h-2 rounded-full", i % 3 === 0 ? 'bg-blue-500' : i % 3 === 1 ? 'bg-green-500' : 'bg-orange-500')} />
                          <span className="text-xs font-bold text-white/80 group-hover/item:text-white transition-colors">{t.name}</span>
                       </div>
                       <span className="text-xs font-black text-white/40">{t._count.users} Members</span>
                    </div>
                  ))}
                  {tiers.length === 0 && (
                    <p className="text-xs text-white/40 italic">No subscription tiers defined.</p>
                  )}
                </div>
            </div>
            <Users className="absolute top-0 right-0 p-10 w-64 h-64 opacity-5 group-hover:scale-110 transition-transform duration-1000" />
         </div>

         <div className="bg-blue-50 rounded-[3rem] p-10 flex flex-col justify-between group">
            <div className="space-y-4">
               <h3 className="text-2xl font-serif font-bold italic text-slate-900">Intelligent <span className="text-blue-600">Matching</span></h3>
               <p className="text-slate-500 text-sm leading-relaxed">Automatic content suggestion based on Member Profile (Language, Village, and Psychology).</p>
            </div>
            <Button variant="ghost" className="justify-between h-14 rounded-2xl bg-white border border-blue-100 text-blue-600 font-black text-xs uppercase tracking-widest shadow-sm group-hover:shadow-xl transition-all">
               Manage Intelligence Rules <ChevronRight className="w-4 h-4" />
            </Button>
         </div>
      </section>

    </div>
  )
}
