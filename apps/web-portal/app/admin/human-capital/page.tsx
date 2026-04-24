'use client'

import { useState, useEffect } from 'react'
import { 
  Users, 
  UserPlus, 
  IndianRupee, 
  HeartHandshake, 
  Award, 
  Clock, 
  CheckCircle2, 
  ArrowUpRight,
  Search,
  Filter,
  MoreVertical,
  Calendar
} from 'lucide-react'
import { InstitutionalService } from '@/services/institutional-service'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { format } from 'date-fns'

export default function HumanCapitalPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const orgId = '5d97f5d9-7e5d-4d97-b5d9-7e5d4d97b5d9'

  useEffect(() => {
    loadHRData()
  }, [])

  const loadHRData = async () => {
    try {
      setLoading(true)
      const res = await InstitutionalService.getHumanCapital(orgId)
      setData(res)
    } catch (error) {
      console.error(error)
      toast.error('Failed to sync human capital records')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 p-10 space-y-10">
      
      {/* Header Area */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-900 pb-10">
        <div className="space-y-4">
           <h1 className="text-4xl font-serif font-bold text-slate-100 tracking-tight italic">Human <span className="text-indigo-500">Capital</span></h1>
           <div className="flex items-center gap-4">
              <Badge variant="outline" className="h-8 px-4 rounded-full border-slate-800 bg-indigo-500/5 text-indigo-400 font-bold uppercase tracking-widest text-[9px]">
                Pillar VI Operational
              </Badge>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-500" /> Total Strength: {data.stats.totalStaff} Members
              </p>
           </div>
        </div>
        <div className="flex gap-4">
           <Button variant="outline" className="h-14 px-8 border-slate-800 bg-slate-900/50 text-slate-300 font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-slate-800">
             <UserPlus className="w-4 h-4 mr-2" /> Recruit Member
           </Button>
           <Button className="h-14 px-8 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-2xl shadow-indigo-500/20 transition-all">
             <IndianRupee className="w-4 h-4 mr-2" /> Disburse Payroll
           </Button>
        </div>
      </header>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {[
          { label: 'Monthly Payroll', value: '₹12.4L', icon: IndianRupee, color: 'text-emerald-400' },
          { label: 'Active Mentors', value: data.stats.activeMentors, icon: HeartHandshake, color: 'text-indigo-400' },
          { label: 'Guidance Hours', value: '142h', icon: Clock, color: 'text-amber-400' },
          { label: 'Vow Compliance', value: '98%', icon: Award, color: 'text-blue-400' },
        ].map((stat, i) => (
          <Card key={i} className="border-slate-900 bg-slate-900/40 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className={`rounded-lg bg-slate-800/50 p-2 ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="text-2xl font-bold text-slate-100">{stat.value}</div>
              <div className="text-xs font-black text-slate-500 uppercase tracking-widest mt-1">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="staff" className="space-y-8">
        <TabsList className="bg-slate-900/50 border border-slate-800 p-1 rounded-2xl h-14">
          <TabsTrigger value="staff" className="rounded-xl px-8 data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
            <Users className="w-4 h-4 mr-2" /> Staff Directory
          </TabsTrigger>
          <TabsTrigger value="payroll" className="rounded-xl px-8 data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
            <IndianRupee className="w-4 h-4 mr-2" /> Payroll Pulse
          </TabsTrigger>
          <TabsTrigger value="mentor" className="rounded-xl px-8 data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
            <HeartHandshake className="w-4 h-4 mr-2" /> Mentor Network
          </TabsTrigger>
        </TabsList>

        {/* Staff Directory Content */}
        <TabsContent value="staff" className="space-y-6">
          <div className="flex items-center gap-4 bg-slate-900/40 p-4 rounded-2xl border border-slate-900">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
              <input 
                placeholder="Search by name, role, or spiritual tag..." 
                className="w-full h-11 pl-10 pr-4 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-300 outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
            <Button variant="outline" className="h-11 border-slate-800 text-slate-400">
              <Filter className="w-4 h-4 mr-2" /> Filters
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.members.map((member: any) => (
              <Card key={member.id} className="border-slate-900 bg-slate-900/40 group hover:border-indigo-500/30 transition-all overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 text-xl font-black">
                        {member.user.profile?.full_name?.[0] || 'U'}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-100">{member.user.profile?.full_name || 'Anonymous Member'}</h4>
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-0.5">{member.role}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-slate-600 group-hover:text-slate-300">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Department</span>
                      <span className="text-slate-200 font-medium">Administration</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Joined</span>
                      <span className="text-slate-200 font-medium">{format(new Date(member.createdAt), 'MMM yyyy')}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Status</span>
                      <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[9px]">Active</Badge>
                    </div>
                  </div>
                </CardContent>
                <div className="p-3 bg-slate-950/50 border-t border-slate-900 flex gap-2">
                  <Button variant="ghost" className="flex-1 h-8 text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-indigo-400">View Profile</Button>
                  <Button variant="ghost" className="flex-1 h-8 text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-emerald-400">Payroll History</Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Payroll Pulse Content */}
        <TabsContent value="payroll">
          <Card className="border-slate-900 bg-slate-900/40 backdrop-blur-xl">
            <CardHeader className="border-b border-slate-900 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-black text-slate-400 uppercase tracking-widest">Recent Disbursements</CardTitle>
              <Button className="h-10 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-widest">
                <Calendar className="w-4 h-4 mr-2" /> Run New Payroll
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-900">
                    <th className="px-8 py-4 text-[9px] font-black text-slate-600 uppercase tracking-widest">Period</th>
                    <th className="px-8 py-4 text-[9px] font-black text-slate-600 uppercase tracking-widest">Disbursement Amount</th>
                    <th className="px-8 py-4 text-[9px] font-black text-slate-600 uppercase tracking-widest text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900">
                  {data.recentPayroll.map((p: any) => (
                    <tr key={p.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-8 py-6">
                        <p className="text-sm font-bold text-slate-200">{format(new Date(p.periodStart), 'MMMM yyyy')}</p>
                        <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mt-0.5">Salary Cycle</p>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-sm font-bold text-slate-100">₹{Number(p.amount).toLocaleString()}</p>
                        <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mt-0.5">{p.type}</p>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <Badge className={cn(
                          "text-[9px] font-black uppercase tracking-widest",
                          p.status === 'PROCESSED' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                        )}>
                          {p.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                  {data.recentPayroll.length === 0 && (
                    <tr>
                      <td colSpan={3} className="p-20 text-center text-xs text-slate-600 italic">No recent payroll disbursements.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Mentor Network Content */}
        <TabsContent value="mentor">
           <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-slate-900 bg-slate-900/40 backdrop-blur-xl">
                 <CardHeader className="border-b border-slate-900">
                    <CardTitle className="text-sm font-black text-slate-400 uppercase tracking-widest">Active Spiritual Guidance</CardTitle>
                 </CardHeader>
                 <CardContent className="p-0">
                    <div className="divide-y divide-slate-900">
                       {data.recentGuidance.map((g: any) => (
                          <div key={g.id} className="p-6 flex items-center justify-between group hover:bg-white/5 transition-colors">
                             <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                                   <HeartHandshake className="w-5 h-5" />
                                </div>
                                <div>
                                   <p className="text-sm font-bold text-slate-100">{g.mentor.profile?.full_name}</p>
                                   <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mt-0.5">Seeker: {g.seeker.profile?.full_name}</p>
                                </div>
                             </div>
                             <div className="text-right">
                                <p className="text-xs font-bold text-slate-400">{format(new Date(g.scheduledAt), 'MMM d, HH:mm')}</p>
                                <Badge variant="outline" className="text-[8px] border-slate-800 text-slate-500 mt-1">{g.status}</Badge>
                             </div>
                          </div>
                       ))}
                       {data.recentGuidance.length === 0 && (
                          <div className="p-20 text-center text-xs text-slate-600 italic">No active guidance sessions.</div>
                       )}
                    </div>
                 </CardContent>
              </Card>

              <Card className="border-indigo-500/20 bg-indigo-500/5 backdrop-blur-xl">
                 <CardHeader>
                    <CardTitle className="text-lg font-serif font-bold italic text-indigo-100 flex items-center gap-3">
                       <Award className="w-5 h-5 text-indigo-400" /> Wisdom Continuity
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-6">
                    <p className="text-xs text-slate-400 leading-relaxed italic">"The gift of knowledge is the highest gift." Maintain the purity of transmission by ensuring mentors are well-supported and seekers are consistently guided.</p>
                    <div className="space-y-4">
                       <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                          <p className="text-xs font-bold text-slate-200">Mentor Retention Rate</p>
                          <div className="h-2 w-full bg-slate-800 rounded-full mt-2 overflow-hidden">
                             <div className="h-full bg-indigo-500 w-[92%]" />
                          </div>
                          <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mt-2">92% Satisfaction Index</p>
                       </div>
                       <Button className="w-full bg-indigo-600 text-xs font-black uppercase tracking-widest">Review Mentor Performance</Button>
                    </div>
                 </CardContent>
              </Card>
           </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
