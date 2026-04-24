"use client"

import React, { useState } from "react"
import { ArrowLeft, Plus, X, Tag, Book, Languages, FileText, Sparkles, Eye, Save } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LibraryEditorPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>(["Dharma"])
  const availableTags = ["Dharma", "Karma", "Yoga", "Philosophy", "Spirituality", "Bhakti", "Jnana"]

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const LabelClass = "block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3"
  const InputClass = "w-full px-5 h-14 rounded-2xl border border-slate-800 bg-slate-900/50 text-slate-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all placeholder:text-slate-600"
  const TextareaClass = "w-full p-8 bg-transparent text-slate-300 focus:outline-none resize-none placeholder:text-slate-600 leading-relaxed min-h-[150px]"

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* 🏛️ Header */}
      <header className="bg-slate-900/50 border-b border-slate-800 px-8 py-6 flex items-center justify-between sticky top-0 z-50 backdrop-blur-xl">
        <div className="flex items-center gap-6">
          <Link href="/admin/content/library" className="size-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
            <ArrowLeft className="size-5" />
          </Link>
          <div>
             <h1 className="text-2xl font-serif font-bold italic text-white">Shastra Forge</h1>
             <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Scriptural Manifestation</p>
          </div>
        </div>
        <div className="flex gap-4">
           <Button variant="ghost" className="text-slate-400 hover:text-white font-bold uppercase tracking-widest text-[10px]">
             <Save className="size-4 mr-2" /> Save Draft
           </Button>
           <Button className="h-12 px-8 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-indigo-600/20">
             Publish to Library
           </Button>
        </div>
      </header>

      {/* 🏛️ Main Content Form */}
      <main className="flex-1 p-8 lg:p-12 overflow-auto pb-32">
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="bg-slate-900/30 rounded-[3rem] p-8 lg:p-12 border border-slate-800 shadow-2xl">
            <form className="space-y-10">
              
              {/* Title Section */}
              <div className="space-y-2">
                <label className={LabelClass}>Scriptural Reference / Title</label>
                <input type="text" placeholder="e.g. Bhagavad Gita 2.47" className={InputClass} />
              </div>

              {/* Tri-Fold Editor Sections */}
              <div className="space-y-12 pt-8 border-t border-slate-800">
                
                {/* 1. Sanskrit Section */}
                <div className="space-y-4">
                   <div className="flex items-center gap-3">
                      <div className="size-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                         <Languages className="size-4" />
                      </div>
                      <h3 className="text-lg font-serif font-bold italic text-slate-300">Sanskrit Verse</h3>
                   </div>
                   <div className="border border-slate-800 rounded-3xl bg-slate-900 overflow-hidden">
                      <textarea placeholder="Enter the sacred Sanskrit text..." className={TextareaClass} />
                   </div>
                </div>

                {/* 2. Translation Section */}
                <div className="space-y-4">
                   <div className="flex items-center gap-3">
                      <div className="size-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                         <FileText className="size-4" />
                      </div>
                      <h3 className="text-lg font-serif font-bold italic text-slate-300">English Translation</h3>
                   </div>
                   <div className="border border-slate-800 rounded-3xl bg-slate-900 overflow-hidden">
                      <textarea placeholder="Enter the faithful translation..." className={TextareaClass} />
                   </div>
                </div>

                {/* 3. Purport Section */}
                <div className="space-y-4">
                   <div className="flex items-center gap-3">
                      <div className="size-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                         <Sparkles className="size-4" />
                      </div>
                      <h3 className="text-lg font-serif font-bold italic text-slate-300">Institutional Purport (Commentary)</h3>
                   </div>
                   <div className="border border-slate-800 rounded-3xl bg-slate-900 overflow-hidden">
                      <div className="bg-slate-900/50 border-b border-slate-800 px-6 py-4 flex gap-3">
                        {['H1', 'H2', 'Bold', 'Italic', 'Quote', 'Link'].map(btn => (
                          <button key={btn} type="button" className="px-4 py-2 rounded-xl hover:bg-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-500 transition-colors">
                            {btn}
                          </button>
                        ))}
                      </div>
                      <textarea rows={10} placeholder="Enter the deep explanation and spiritual context..." className={TextareaClass} />
                   </div>
                </div>

              </div>

              {/* Tagging System */}
              <div className="pt-8 border-t border-slate-800">
                <label className={LabelClass}>Categorization Tags</label>
                <div className="flex flex-wrap gap-3">
                  {availableTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl border transition-all text-sm font-bold ${
                        selectedTags.includes(tag)
                          ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.1)]'
                          : 'border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-500'
                      }`}
                    >
                      <Tag className="size-4 opacity-50" />
                      {tag}
                      {selectedTags.includes(tag) && <X className="size-3 ml-2 text-indigo-300" />}
                    </button>
                  ))}
                </div>
              </div>

            </form>
          </div>
        </div>
      </main>

      {/* 🏛️ Quick Preview Overlay */}
      <div className="fixed bottom-12 right-12 z-50">
         <button className="size-16 rounded-[2rem] bg-white text-slate-950 flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:scale-110 transition-transform group">
            <Eye className="size-6 group-hover:scale-110 transition-transform" />
         </button>
      </div>

    </div>
  )
}
