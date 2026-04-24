'use client'

import React from 'react'
import { Button } from '@/components/atoms/button'

interface SeedShastraModalProps {
  onClose: () => void
}

export function SeedShastraModal({ onClose }: SeedShastraModalProps) {
  return (
    <section className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-10">
       <div className="bg-white w-full max-w-2xl rounded-[3rem] p-12 shadow-2xl space-y-8 animate-in zoom-in duration-300">
          <div className="flex justify-between items-center">
             <h3 className="text-2xl font-serif font-bold italic text-slate-900">Seed Shastra <span className="text-indigo-600">Memory</span></h3>
             <Button variant="ghost" onClick={onClose} className="text-slate-400">Close</Button>
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
  )
}
