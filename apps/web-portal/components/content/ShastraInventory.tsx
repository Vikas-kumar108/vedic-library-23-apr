'use client'

import React from 'react'
import { Book, ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/atoms/badge'
import { Button } from '@/components/atoms/button'
import { cn } from '@/lib/utils'

interface ShastraInventoryProps {
  shastras: any[]
}

export function ShastraInventory({ shastras }: ShastraInventoryProps) {
  return (
    <div className="bg-white border border-slate-100 rounded-[3rem] overflow-hidden shadow-sm">
      <table className="w-full text-left border-collapse">
         <thead>
            <tr className="border-b border-slate-50">
               <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Shastra Name</th>
               <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Node Density</th>
               <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
               <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Integrity</th>
               <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
         </thead>
         <tbody className="divide-y divide-slate-50">
            {shastras?.map((shastra: any) => (
               <tr key={shastra.id} className="group hover:bg-indigo-50/30 transition-colors cursor-pointer">
                  <td className="px-8 py-6">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                           <Book className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{shastra.name}</p>
                          <p className="text-[10px] text-slate-400 font-mono italic">{shastra.slug}</p>
                        </div>
                     </div>
                  </td>
                  <td className="px-8 py-6">
                     <Badge variant="outline" className="rounded-full px-3 py-1 bg-slate-50 text-[9px] font-black border-slate-100">
                        {shastra.nodeCount} Segments
                     </Badge>
                  </td>
                  <td className="px-8 py-6">
                     <div className="flex items-center gap-2">
                        <div className={cn("w-1.5 h-1.5 rounded-full", shastra.status === 'ACTIVE' ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-orange-500")} />
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-600">{shastra.status}</span>
                     </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                     <div className="flex flex-col items-end gap-1">
                        <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                           <div className="h-full bg-indigo-500" style={{ width: '92%' }} />
                        </div>
                        <span className="text-[8px] font-bold text-slate-400 uppercase">92% Complete</span>
                     </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                     <Button variant="ghost" size="icon" className="text-slate-300 hover:text-indigo-600">
                        <ArrowUpRight className="w-4 h-4" />
                     </Button>
                  </td>
               </tr>
            ))}
         </tbody>
      </table>
    </div>
  )
}
