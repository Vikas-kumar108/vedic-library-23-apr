'use client'

import React, { useState, useEffect } from 'react'
import { 
  FileText, 
  Upload, 
  Plus, 
  Search, 
  Book, 
  Layout, 
  CheckCircle2, 
  Clock,
  MoreVertical,
  Globe,
  Database,
  Languages,
  Activity,
  Zap,
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react'
import { Button } from '@/components/atoms/button'
import { Badge } from '@/components/atoms/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { UniversalUploader } from '@/components/molecules/universal-uploader'
import { BUCKET_NAMES } from '@/lib/storage'
import { InstitutionalService } from '@/services/institutional-service'
import { cn } from '@/lib/utils'

export default function ContentManagement() {
  const [showUploader, setShowUploader] = useState(false)
  const [showSeeder, setShowSeeder] = useState(false)
  const [healthData, setHealthData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    InstitutionalService.getContentHealth()
      .then(data => {
        setHealthData(data)
        setLoading(false)
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="p-10 space-y-10 animate-in fade-in duration-700 bg-slate-50/30 min-h-screen">
      
      {/* Header Section */}
      <header className="flex justify-between items-end border-b border-slate-100 pb-10">
        <div className="space-y-4">
           <h1 className="text-4xl font-serif font-bold text-slate-900 tracking-tight italic">Wisdom <span className="text-indigo-600">Command</span></h1>
           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
             <Database className="w-3 h-3 text-indigo-500" /> Managing the Core Shastra Inventory • Pillar I & II
           </p>
        </div>
        <div className="flex gap-4">
          <Button 
            onClick={() => setShowSeeder(true)}
            variant="outline" 
            className="h-14 px-8 border-slate-200 text-slate-600 font-black text-xs uppercase tracking-widest rounded-2xl"
          >
            Seed Shastra
          </Button>
          <Button onClick={() => setShowUploader(!showUploader)} className="h-14 px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-indigo-200 transition-all">
            <Plus className="w-4 h-4 mr-2" /> Manifest Resource
          </Button>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        {[
          { label: 'Core Shastras', count: healthData?.shastras?.length || 0, icon: Book, color: 'text-indigo-500', bg: 'bg-indigo-50' },
          { label: 'Total Nodes', count: healthData?.shastras?.reduce((acc: any, s: any) => acc + s.nodeCount, 0) || 0, icon: Zap, color: 'text-orange-500', bg: 'bg-orange-50' },
          { label: 'Languages', count: healthData?.languages?.length || 0, icon: Languages, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'Health Score', count: '98%', icon: Activity, color: 'text-purple-500', bg: 'bg-purple-50' },
        ].map((stat, i) => (
          <div key={i} className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all group">
             <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform", stat.bg, stat.color)}>
                <stat.icon className="w-6 h-6" />
             </div>
             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{stat.label}</p>
             <h3 className="text-2xl font-black text-slate-900 mt-1 tracking-tighter">{stat.count}</h3>
          </div>
        ))}
      </div>

      <Tabs defaultValue="shastras" className="space-y-8">
        <TabsList className="bg-white border border-slate-100 p-1 rounded-2xl h-14 w-full md:w-auto">
          <TabsTrigger value="shastras" className="px-8 rounded-xl font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-indigo-600 data-[state=active]:text-white h-full">Core Shastras</TabsTrigger>
          <TabsTrigger value="assets" className="px-8 rounded-xl font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-indigo-600 data-[state=active]:text-white h-full">Wisdom Assets</TabsTrigger>
          <TabsTrigger value="metadata" className="px-8 rounded-xl font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-indigo-600 data-[state=active]:text-white h-full">Metadata Audit</TabsTrigger>
        </TabsList>

        <TabsContent value="shastras" className="space-y-6">
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
                  {healthData?.shastras?.map((shastra: any) => (
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
        </TabsContent>

        <TabsContent value="assets" className="space-y-6">
           <div className="p-10 bg-white border border-slate-100 rounded-[3rem] text-center space-y-4">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                 <FileText className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-xl font-serif font-bold italic">PDF & Media Assets</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                Management of institutional booklets, newsletters, and PDF resources. Use the uploader to add new assets.
              </p>
              <Button onClick={() => setShowUploader(true)} variant="outline" className="mt-4 rounded-xl border-slate-200">
                Open Wisdom Uploader
              </Button>
           </div>
        </TabsContent>

        <TabsContent value="metadata" className="space-y-6">
           <div className="grid md:grid-cols-3 gap-6">
              {healthData?.languages?.map((lang: any, i: number) => (
                <div key={i} className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
                   <div className="flex justify-between items-start mb-6">
                      <div className="p-3 bg-indigo-50 rounded-2xl">
                         <Languages className="w-5 h-5 text-indigo-600" />
                      </div>
                      <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 text-[8px] font-black uppercase">Healthy</Badge>
                   </div>
                   <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">{lang.language}</h4>
                   <p className="text-2xl font-black text-slate-900 mt-2 tracking-tighter">{lang._count._all}</p>
                   <p className="text-[8px] text-slate-400 font-bold uppercase mt-1 tracking-widest">Total Text Segments</p>
                </div>
              ))}
           </div>
        </TabsContent>
      </Tabs>

      {/* Seed Shastra Modal (Conditional) */}
      {showSeeder && (
        <section className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-10">
           <div className="bg-white w-full max-w-2xl rounded-[3rem] p-12 shadow-2xl space-y-8 animate-in zoom-in duration-300">
              <div className="flex justify-between items-center">
                 <h3 className="text-2xl font-serif font-bold italic text-slate-900">Seed Shastra <span className="text-indigo-600">Memory</span></h3>
                 <Button variant="ghost" onClick={() => setShowSeeder(false)} className="text-slate-400">Close</Button>
              </div>
              <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Shastra Name</label>
                    <input type="text" placeholder="e.g. Yoga Vasistha" className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl px-6 text-sm" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Unique Slug</label>
                    <input type="text" placeholder="yoga-vasistha" className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl px-6 text-sm font-mono" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Structure Type</label>
                       <select className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl px-6 text-sm">
                          <option>VERSE_BASED</option>
                          <option>CHAPTER_BASED</option>
                          <option>TOPIC_BASED</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Primary Language</label>
                       <select className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl px-6 text-sm">
                          <option>SANSKRIT</option>
                          <option>ENGLISH</option>
                          <option>HINDI</option>
                       </select>
                    </div>
                 </div>
                 <Button className="w-full h-16 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest">
                    Manifest into Inventory
                 </Button>
              </div>
           </div>
        </section>
      )}

      {/* Upload Drawer (Conditional) */}
      {showUploader && (
        <section className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-10">
           <div className="bg-white w-full max-w-4xl rounded-[4rem] p-16 shadow-2xl space-y-12 animate-in zoom-in duration-300 border border-slate-100">
              <div className="flex justify-between items-start">
                 <div className="space-y-2">
                    <h3 className="text-4xl font-serif font-bold italic text-slate-900 tracking-tight">Wisdom <span className="text-indigo-600">Manifestor</span></h3>
                    <p className="text-xs text-slate-400 font-medium">Inject new knowledge into the institutional memory.</p>
                 </div>
                 <Button variant="ghost" onClick={() => setShowUploader(false)} className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-4 rounded-full">
                    <ShieldAlert className="w-6 h-6" />
                 </Button>
              </div>
              <div className="grid md:grid-cols-2 gap-12">
                 <div className="space-y-8">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                          <Zap className="w-3 h-3" /> Resource Title
                       </label>
                       <input type="text" placeholder="e.g. Bhagavad Gita Simplified" className="w-full h-16 bg-slate-50 border border-slate-100 rounded-2xl px-8 text-sm font-medium focus:border-indigo-400 focus:bg-white outline-none transition-all" />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                          <Layout className="w-3 h-3" /> Classification
                       </label>
                       <select className="w-full h-16 bg-slate-50 border border-slate-100 rounded-2xl px-8 text-sm font-medium focus:border-indigo-400 focus:bg-white outline-none transition-all appearance-none">
                          <option>Booklet</option>
                          <option>Full Book</option>
                          <option>Article</option>
                          <option>Research Paper</option>
                       </select>
                    </div>
                 </div>
                 <div className="bg-indigo-50/50 border-2 border-dashed border-indigo-200 rounded-[3rem] p-10 flex flex-col items-center justify-center text-center space-y-6">
                    <div className="p-6 bg-white rounded-3xl shadow-lg shadow-indigo-100">
                       <Upload className="w-8 h-8 text-indigo-600" />
                    </div>
                    <div className="space-y-2">
                       <p className="text-sm font-black text-slate-900 uppercase tracking-widest">Drop Wisdom Here</p>
                       <p className="text-[10px] text-slate-400 font-medium">PDF, EPUB or MarkDown supported</p>
                    </div>
                    <Button className="bg-indigo-600 text-white rounded-xl px-10 h-12 text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-200">
                       Browse Files
                    </Button>
                 </div>
              </div>
           </div>
        </section>
      )}

    </div>
  )
}
