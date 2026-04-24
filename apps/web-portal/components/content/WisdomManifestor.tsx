'use client'

import React from 'react'
import { ShieldAlert, Zap, Layout } from 'lucide-react'
import { Button } from '@/components/atoms/button'
import { UniversalUploader } from '@/components/molecules/universal-uploader'
import { BUCKET_NAMES } from '@/lib/storage'

interface WisdomManifestorProps {
  onClose: () => void
}

export function WisdomManifestor({ onClose }: WisdomManifestorProps) {
  return (
    <section className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-10">
       <div className="bg-white w-full max-w-4xl rounded-[4rem] p-16 shadow-2xl space-y-12 animate-in zoom-in duration-300 border border-slate-100">
          <div className="flex justify-between items-start">
             <div className="space-y-2">
                <h3 className="text-4xl font-serif font-bold italic text-slate-900 tracking-tight">Wisdom <span className="text-indigo-600">Manifestor</span></h3>
                <p className="text-xs text-slate-400 font-medium">Inject new knowledge into the institutional memory.</p>
             </div>
             <Button variant="ghost" onClick={onClose} className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-4 rounded-full">
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
             <div className="bg-indigo-50/50 border-2 border-dashed border-indigo-200 rounded-[3rem] p-10">
                <UniversalUploader 
                  bucket={BUCKET_NAMES.CONTENT} 
                  path="books" 
                  label="Drop Wisdom Here" 
                  accept="application/pdf,application/epub+zip,text/markdown"
                  onUploadComplete={(url) => {
                    console.log('Wisdom Manifested:', url)
                    alert('Wisdom Manifested Successfully!')
                  }}
                />
             </div>
          </div>
       </div>
    </section>
  )
}
