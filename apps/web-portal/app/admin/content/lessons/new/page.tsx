"use client"

import React, { useState } from "react"
import { ArrowLeft, Plus, X, Upload, Eye, Video, FileText, Mic, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LessonForgePage() {
  const [lessonType, setLessonType] = useState<"Video" | "Article" | "Audio">("Video")
  const [keyPoints, setKeyPoints] = useState<string[]>(["", ""])
  const [status, setStatus] = useState<"Draft" | "Published">("Draft")

  const addKeyPoint = () => setKeyPoints([...keyPoints, ""])
  const removeKeyPoint = (index: number) => setKeyPoints(keyPoints.filter((_, i) => i !== index))
  const updateKeyPoint = (index: number, value: string) => {
    const updated = [...keyPoints]
    updated[index] = value
    setKeyPoints(updated)
  }

  const InputClass = "w-full px-5 h-14 rounded-2xl border border-slate-800 bg-slate-900/50 text-slate-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all placeholder:text-slate-600"
  const LabelClass = "block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3"

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      
      {/* 🏛️ Header */}
      <header className="bg-slate-900/50 border-b border-slate-800 px-8 py-6 flex items-center justify-between sticky top-0 z-10 backdrop-blur-xl">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="size-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
            <ArrowLeft className="size-5" />
          </Link>
          <div>
             <h1 className="text-2xl font-serif font-bold italic text-white">Lesson Forge</h1>
             <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Content Manifestation</p>
          </div>
        </div>
      </header>

      {/* 🏛️ Main Content Form */}
      <main className="flex-1 overflow-auto pb-32">
        <div className="max-w-4xl mx-auto p-8 lg:p-12">
          
          <div className="bg-slate-900/30 rounded-[3rem] p-8 lg:p-12 border border-slate-800 shadow-2xl">
            <form className="space-y-10">
              
              {/* Basic Details */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className={LabelClass}>Lesson Title</label>
                  <input type="text" placeholder="e.g. The Nature of Duty" className={InputClass} />
                </div>

                <div className="space-y-2">
                  <label className={LabelClass}>Parent Curriculum</label>
                  <select className={InputClass}>
                    <option value="">Select a Course...</option>
                    <option value="1">Foundations of Bhagavad Gita</option>
                    <option value="2">Vedic Leadership & Governance</option>
                  </select>
                </div>
              </div>

              {/* Lesson Type Selector */}
              <div>
                <label className={LabelClass}>Transmission Medium</label>
                <div className="flex gap-4">
                  {(["Video", "Article", "Audio"] as const).map((type) => {
                    const icons = { Video: Video, Article: FileText, Audio: Mic }
                    const Icon = icons[type]
                    const isActive = lessonType === type
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setLessonType(type)}
                        className={`flex-1 h-16 rounded-2xl border transition-all flex items-center justify-center gap-3 font-bold text-sm ${
                          isActive
                            ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400 shadow-[0_0_30px_rgba(99,102,241,0.1)]'
                            : 'border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-400'
                        }`}
                      >
                        <Icon className="size-5" /> {type}
                        {isActive && <CheckCircle2 className="size-4 ml-2 opacity-50" />}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Dynamic Media Input */}
              {lessonType === "Video" && (
                <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-2 animate-in fade-in zoom-in-95 duration-300">
                  <label className={LabelClass}>Video Stream URL</label>
                  <input type="url" placeholder="https://youtube.com/watch?v=..." className={InputClass} />
                </div>
              )}

              {/* Content Editor */}
              <div>
                <label className={LabelClass}>Wisdom Transmission (Content)</label>
                <div className="border border-slate-800 rounded-3xl bg-slate-900 overflow-hidden">
                  <div className="bg-slate-900/50 border-b border-slate-800 px-6 py-4 flex gap-3">
                    {['Bold', 'Italic', 'Quote', 'Link'].map(btn => (
                      <button key={btn} type="button" className="px-4 py-2 rounded-xl hover:bg-slate-800 text-xs font-bold text-slate-400 transition-colors">
                        {btn}
                      </button>
                    ))}
                  </div>
                  <textarea
                    rows={12}
                    placeholder="Inscribe the teachings here..."
                    className="w-full p-8 bg-transparent text-slate-300 focus:outline-none resize-none placeholder:text-slate-600 leading-relaxed"
                  />
                </div>
              </div>

              {/* Key Points Array */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className={LabelClass}>Key Realizations</label>
                  <button type="button" onClick={addKeyPoint} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:text-indigo-300 transition-colors">
                    <Plus className="size-4" /> Add Realization
                  </button>
                </div>
                <div className="space-y-3">
                  {keyPoints.map((point, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="size-10 flex items-center justify-center bg-slate-900 rounded-xl border border-slate-800 text-slate-500 font-black text-[10px]">
                        {index + 1}
                      </div>
                      <input
                        type="text"
                        value={point}
                        onChange={(e) => updateKeyPoint(index, e.target.value)}
                        placeholder="State a profound truth..."
                        className={InputClass}
                      />
                      {keyPoints.length > 1 && (
                        <button type="button" onClick={() => removeKeyPoint(index)} className="size-14 rounded-2xl flex items-center justify-center hover:bg-rose-500/10 text-slate-600 hover:text-rose-500 transition-colors border border-transparent hover:border-rose-500/20">
                          <X className="size-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Status and Metadata */}
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-800">
                <div className="space-y-2">
                  <label className={LabelClass}>Sequence Order</label>
                  <input type="number" min="1" placeholder="1" className={InputClass} />
                </div>

                <div className="space-y-2">
                  <label className={LabelClass}>Visibility Status</label>
                  <select value={status} onChange={(e) => setStatus(e.target.value as "Draft" | "Published")} className={InputClass}>
                    <option value="Draft">Draft (Hidden)</option>
                    <option value="Published">Published (Live)</option>
                  </select>
                </div>
              </div>

              {/* Thumbnail Upload */}
              <div>
                <label className={LabelClass}>Manifestation Thumbnail (Optional)</label>
                <div className="border-2 border-dashed border-slate-800 rounded-3xl p-12 text-center hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all cursor-pointer group">
                  <div className="size-16 rounded-full bg-slate-900 group-hover:bg-indigo-500/20 flex items-center justify-center mx-auto mb-6 transition-colors">
                    <Upload className="size-8 text-slate-500 group-hover:text-indigo-400" />
                  </div>
                  <p className="text-sm font-bold text-slate-400 mb-2">Click to manifest image or drag and drop</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">Premium PNG, JPG up to 10MB</p>
                </div>
              </div>

            </form>
          </div>
        </div>
      </main>

      {/* 🏛️ Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-950/80 backdrop-blur-xl border-t border-slate-800 px-8 py-6 z-20">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button variant="ghost" className="h-14 px-8 text-slate-400 hover:text-white rounded-2xl font-bold uppercase tracking-widest text-[10px]">
            Save as Draft
          </Button>

          <div className="flex gap-4">
            <Button variant="outline" className="h-14 px-8 border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-2xl font-bold uppercase tracking-widest text-[10px]">
              <Eye className="size-4 mr-2" /> Preview Corridor
            </Button>
            <Button className="h-14 px-10 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] shadow-[0_0_30px_rgba(79,70,229,0.3)]">
              Publish Wisdom
            </Button>
          </div>
        </div>
      </div>

    </div>
  )
}
