'use client'

import { useState, useEffect } from 'react'
import { 
  Globe, 
  Webhook, 
  Plus, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ExternalLink, 
  Zap, 
  Shield, 
  MoreVertical,
  Activity,
  Cpu
} from 'lucide-react'
import { InstitutionalService } from '@/services/institutional-service'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

export default function IntegrationsPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const orgId = '5d97f5d9-7e5d-4d97-b5d9-7e5d4d97b5d9'

  useEffect(() => {
    loadIntegrationData()
  }, [])

  const loadIntegrationData = async () => {
    try {
      setLoading(true)
      const res = await InstitutionalService.getIntegrations(orgId)
      setData(res)
    } catch (error) {
      console.error(error)
      toast.error('Failed to sync digital ecosystem')
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
           <h1 className="text-4xl font-serif font-bold text-slate-100 tracking-tight italic">Digital <span className="text-indigo-500">Ecosystem</span></h1>
           <div className="flex items-center gap-4">
              <Badge variant="outline" className="h-8 px-4 rounded-full border-slate-800 bg-indigo-500/5 text-indigo-400 font-bold uppercase tracking-widest text-[9px]">
                Pillar VIII Connected
              </Badge>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-500" /> Active Nodes: {data.stats.activeWebhooks}
              </p>
           </div>
        </div>
        <div className="flex gap-4">
           <Button variant="outline" className="h-14 px-8 border-slate-800 bg-slate-900/50 text-slate-300 font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-slate-800">
             <Cpu className="w-4 h-4 mr-2" /> Connect Service
           </Button>
           <Button className="h-14 px-8 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-2xl shadow-indigo-500/20 transition-all">
             <Plus className="w-4 h-4 mr-2" /> Register Webhook
           </Button>
        </div>
      </header>

      {/* Integration Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="border-slate-900 bg-slate-900/40 backdrop-blur-xl">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                <Zap className="w-6 h-6" />
              </div>
              <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Operational</Badge>
            </div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Events Broadcasted (24h)</p>
            <p className="text-3xl font-black text-slate-100 mt-1">{data.stats.totalEventsLast24h}</p>
          </CardContent>
        </Card>

        <Card className="border-slate-900 bg-slate-900/40 backdrop-blur-xl">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-400">
                <Activity className="w-6 h-6" />
              </div>
              <Badge variant="outline" className="border-slate-800 text-slate-500 text-[8px]">Real-time Health</Badge>
            </div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Failure Rate</p>
            <p className="text-3xl font-black text-slate-100 mt-1">{data.stats.failureRate}</p>
          </CardContent>
        </Card>

        <Card className="border-indigo-500/20 bg-indigo-500/5 backdrop-blur-xl border-dashed">
          <CardContent className="p-8 flex flex-col items-center justify-center text-center space-y-4">
            <Shield className="w-10 h-10 text-indigo-400 opacity-40" />
            <div>
              <p className="text-xs font-bold text-slate-200">Secure API Access</p>
              <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-black">Institutional Keys Active</p>
            </div>
            <Button variant="ghost" className="h-8 text-[9px] font-black uppercase tracking-widest text-indigo-400">Manage Keys</Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="integrations" className="space-y-8">
        <TabsList className="bg-slate-900/50 border border-slate-800 p-1 rounded-2xl h-14">
          <TabsTrigger value="integrations" className="rounded-xl px-8 data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
            <Cpu className="w-4 h-4 mr-2" /> Connected Services
          </TabsTrigger>
          <TabsTrigger value="webhooks" className="rounded-xl px-8 data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
            <Webhook className="w-4 h-4 mr-2" /> Webhook Registry
          </TabsTrigger>
          <TabsTrigger value="logs" className="rounded-xl px-8 data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
            <Activity className="w-4 h-4 mr-2" /> Event Stream
          </TabsTrigger>
        </TabsList>

        {/* Connected Services */}
        <TabsContent value="integrations">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.integrations.map((item: any) => (
              <Card key={item.id} className="border-slate-900 bg-slate-900/40 group hover:border-indigo-500/30 transition-all">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-slate-200">
                      <Zap className="w-8 h-8" />
                    </div>
                    <Badge className={cn(
                      "text-[9px] font-black uppercase tracking-widest",
                      item.status === 'ACTIVE' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-slate-800 text-slate-500"
                    )}>
                      {item.status}
                    </Badge>
                  </div>
                  <h4 className="text-xl font-serif font-bold italic text-slate-100">{item.name}</h4>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">{item.type}</p>
                  
                  <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Connected {format(new Date(item.createdAt), 'MMM yyyy')}</span>
                    <Button variant="ghost" size="icon" className="text-slate-600 group-hover:text-indigo-400">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            {data.integrations.length === 0 && (
              <div className="col-span-full p-20 bg-slate-900/20 border border-dashed border-slate-800 rounded-[3rem] text-center text-slate-600 italic">
                No external services connected yet.
              </div>
            )}
          </div>
        </TabsContent>

        {/* Event Logs */}
        <TabsContent value="logs">
           <Card className="border-slate-900 bg-slate-900/40 backdrop-blur-xl overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-900">
                    <th className="px-8 py-4 text-[9px] font-black text-slate-600 uppercase tracking-widest">Event Identity</th>
                    <th className="px-8 py-4 text-[9px] font-black text-slate-600 uppercase tracking-widest">Payload Preview</th>
                    <th className="px-8 py-4 text-[9px] font-black text-slate-600 uppercase tracking-widest text-right">Delivery Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900">
                  {data.recentEvents.map((event: any) => (
                    <tr key={event.id} className="group hover:bg-white/5 transition-colors cursor-pointer">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                           <div className={cn(
                             "w-10 h-10 rounded-xl flex items-center justify-center",
                             event.status === 'SUCCESS' ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
                           )}>
                             {event.status === 'SUCCESS' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                           </div>
                           <div>
                              <p className="text-sm font-bold text-slate-100">{event.eventType}</p>
                              <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mt-0.5">{format(new Date(event.createdAt), 'HH:mm:ss • MMM d')}</p>
                           </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <code className="text-[10px] text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 block max-w-[400px] truncate">
                          {JSON.stringify(event.payload)}
                        </code>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <Badge className={cn(
                          "text-[9px] font-black uppercase tracking-widest",
                          event.status === 'SUCCESS' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-rose-500/10 text-rose-500 border-rose-500/20"
                        )}>
                          {event.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                  {data.recentEvents.length === 0 && (
                    <tr>
                      <td colSpan={3} className="p-20 text-center text-xs text-slate-600 italic">No events broadcasted in the last 24 hours.</td>
                    </tr>
                  )}
                </tbody>
              </table>
           </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
