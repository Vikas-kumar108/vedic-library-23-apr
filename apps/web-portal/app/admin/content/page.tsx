'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Database, FileText, Languages } from 'lucide-react'
import { Button } from '@/components/atoms/button'
import { Badge } from '@/components/atoms/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useInstitutional } from '@/hooks/use-institutional'
import { ContentStats } from '@/components/content/ContentStats'
import { ShastraInventory } from '@/components/content/ShastraInventory'
import { SeedShastraModal } from '@/components/content/SeedShastraModal'
import { WisdomManifestor } from '@/components/content/WisdomManifestor'

export default function ContentManagement() {
  const [showUploader, setShowUploader] = useState(false)
  const [showSeeder, setShowSeeder] = useState(false)
  const { health, fetchContentHealth, loading } = useInstitutional()

  useEffect(() => {
    fetchContentHealth()
  }, [fetchContentHealth])

  return (
    <div className="p-10 space-y-10 animate-in fade-in duration-700 bg-slate-50/30 min-h-screen">
      
      {/* 1. Header Section */}
      <header className="flex justify-between items-end border-b border-slate-100 pb-10">
        <div className="space-y-4 text-left">
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
          <Button onClick={() => setShowUploader(true)} className="h-14 px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-indigo-200 transition-all">
            <Plus className="w-4 h-4 mr-2" /> Manifest Resource
          </Button>
        </div>
      </header>

      {/* 2. Modular Stats Overview */}
      <ContentStats healthData={health} />

      {/* 3. Main Content Area */}
      <Tabs defaultValue="shastras" className="space-y-8">
        <TabsList className="bg-white border border-slate-100 p-1 rounded-2xl h-14 w-full md:w-auto">
          <TabsTrigger value="shastras" className="px-8 rounded-xl font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-indigo-600 data-[state=active]:text-white h-full">Core Shastras</TabsTrigger>
          <TabsTrigger value="assets" className="px-8 rounded-xl font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-indigo-600 data-[state=active]:text-white h-full">Wisdom Assets</TabsTrigger>
          <TabsTrigger value="metadata" className="px-8 rounded-xl font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-indigo-600 data-[state=active]:text-white h-full">Metadata Audit</TabsTrigger>
        </TabsList>

        <TabsContent value="shastras" className="space-y-6">
           <ShastraInventory shastras={health?.shastras || []} />
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
           <div className="grid md:grid-cols-3 gap-6 text-left">
              {health?.languages?.map((lang: any, i: number) => (
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

      {/* 4. Modular Modals */}
      {showSeeder && <SeedShastraModal onClose={() => setShowSeeder(false)} />}
      {showUploader && <WisdomManifestor onClose={() => setShowUploader(false)} />}

    </div>
  )
}
