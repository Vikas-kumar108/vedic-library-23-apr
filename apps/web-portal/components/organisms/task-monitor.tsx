'use client'

import React, { useState, useEffect } from 'react'
import { 
  Activity, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Loader2, 
  Play, 
  Terminal,
  Zap
} from 'lucide-react'
import { InstitutionalService } from '@/services/institutional-service'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'

export function TaskMonitor() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTasks()
    const interval = setInterval(fetchTasks, 5000)
    return () => clearInterval(interval)
  }, [])

  const fetchTasks = async () => {
    try {
      const data = await InstitutionalService.getSystemTasks()
      setData(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const triggerTask = async (type: string) => {
    try {
      await InstitutionalService.triggerTask(type, { triggeredBy: 'Admin' })
      fetchTasks()
    } catch (error) {
      console.error(error)
    }
  }

  if (loading && !data) return null

  return (
    <Card className="border-slate-800 bg-slate-900/40 backdrop-blur-xl rounded-[2.5rem] overflow-hidden">
      <CardHeader className="p-8 border-b border-slate-800 flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-xl font-serif font-bold italic text-slate-100 flex items-center gap-3">
             <Terminal className="w-5 h-5 text-indigo-400" /> Institutional Heartbeat
          </CardTitle>
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Backend Worker Stream • Booming</p>
        </div>
        <div className="flex gap-2">
           <Button onClick={() => triggerTask('WEBHOOK_BROADCAST')} size="sm" variant="outline" className="h-8 border-slate-700 bg-slate-800 text-[9px] font-black uppercase tracking-widest text-slate-300 rounded-full hover:bg-indigo-500 hover:text-white transition-all">
             <Zap className="w-3 h-3 mr-2" /> Trigger Webhook
           </Button>
           <Button onClick={() => triggerTask('SHASTRA_RECONCILE')} size="sm" variant="outline" className="h-8 border-slate-700 bg-slate-800 text-[9px] font-black uppercase tracking-widest text-slate-300 rounded-full hover:bg-emerald-500 hover:text-white transition-all">
             <Activity className="w-3 h-3 mr-2" /> Sync Shastra
           </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-[300px] overflow-y-auto divide-y divide-slate-800">
           {data?.recentTasks.map((task: any) => (
             <div key={task.id} className="p-6 flex items-center justify-between group hover:bg-white/5 transition-colors">
               <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center",
                    task.status === 'COMPLETED' ? "bg-emerald-500/10 text-emerald-500" :
                    task.status === 'PROCESSING' ? "bg-indigo-500/10 text-indigo-500" :
                    task.status === 'FAILED' ? "bg-rose-500/10 text-rose-500" : "bg-slate-800 text-slate-500"
                  )}>
                    {task.status === 'COMPLETED' ? <CheckCircle2 className="w-4 h-4" /> :
                     task.status === 'PROCESSING' ? <Loader2 className="w-4 h-4 animate-spin" /> :
                     task.status === 'FAILED' ? <AlertCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-100">{task.task_type}</p>
                    <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mt-0.5">
                      {format(new Date(task.created_at), 'HH:mm:ss')} • {task.id.slice(0, 8)}
                    </p>
                  </div>
               </div>
               <Badge className={cn(
                 "text-[9px] font-black uppercase tracking-widest px-3 py-1",
                 task.status === 'COMPLETED' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                 task.status === 'PROCESSING' ? "bg-indigo-500/10 text-indigo-500 border-indigo-500/20" :
                 task.status === 'FAILED' ? "bg-rose-500/10 text-rose-500 border-rose-500/20" : "bg-slate-800 text-slate-500"
               )}>
                 {task.status}
               </Badge>
             </div>
           ))}
           {(!data || data.recentTasks.length === 0) && (
             <div className="p-20 text-center text-xs text-slate-600 italic">No background tasks in queue.</div>
           )}
        </div>
      </CardContent>
    </Card>
  )
}
