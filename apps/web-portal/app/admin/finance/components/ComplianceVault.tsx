'use client'

import { FileText, ShieldCheck, Download, ExternalLink, Calendar, Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface ComplianceVaultProps {
  data: any
}

export function ComplianceVault({ data }: ComplianceVaultProps) {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Partnership Agreements */}
        <Card className="border-slate-800 bg-slate-900/40 backdrop-blur-md">
          <CardHeader className="border-b border-slate-800">
            <CardTitle className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-400" /> Partnership Deeds
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-800">
              {data.partnerships.map((p: any) => (
                <div key={p.id} className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors group">
                  <div>
                    <p className="text-sm font-bold text-slate-100">{p.title}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">
                      Partner: {p.partner.name} • Level: {p.legalStatus}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" className="text-slate-500 group-hover:text-indigo-400">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              {data.partnerships.length === 0 && (
                <div className="p-10 text-center text-xs text-slate-600 italic">No partnership deeds found.</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Utilization Certificates */}
        <Card className="border-slate-800 bg-slate-900/40 backdrop-blur-md">
          <CardHeader className="border-b border-slate-800">
            <CardTitle className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Utilization Certificates
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-800">
              {data.utilizationCertificates.map((uc: any) => (
                <div key={uc.id} className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors group">
                  <div>
                    <p className="text-sm font-bold text-slate-100">UC - {uc.grant.purpose}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">
                      Grant: ₹{Number(uc.grant.amount).toLocaleString()} • Submitted: {new Date(uc.submittedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" className="text-slate-500 group-hover:text-emerald-400">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              {data.utilizationCertificates.length === 0 && (
                <div className="p-10 text-center text-xs text-slate-600 italic">No UCs found for the current period.</div>
              )}
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Compliance Task Timeline */}
      <Card className="border-slate-800 bg-slate-900/40 backdrop-blur-md">
        <CardHeader className="border-b border-slate-800">
          <CardTitle className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-400" /> Statutory Compliance Timeline
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {data.activeComplianceTasks.map((task: any) => (
              <div key={task.id} className="flex items-center gap-6 p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="flex flex-col items-center justify-center min-w-[60px] h-[60px] bg-slate-800 rounded-xl">
                  <span className="text-[10px] font-black uppercase text-slate-500">{new Date(task.dueDate).toLocaleString('default', { month: 'short' })}</span>
                  <span className="text-xl font-black text-slate-100">{new Date(task.dueDate).getDate()}</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-slate-200">{task.title}</h4>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">{task.type}</p>
                </div>
                <Badge variant="outline" className="border-amber-500/20 bg-amber-500/10 text-amber-500">
                  {task.status}
                </Badge>
              </div>
            ))}
            {data.activeComplianceTasks.length === 0 && (
              <p className="text-center text-xs text-slate-600 italic">No upcoming compliance tasks.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
