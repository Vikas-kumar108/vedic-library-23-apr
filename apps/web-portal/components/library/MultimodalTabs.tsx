'use client'

import React, { useState } from 'react'
import { 
  BookOpen, 
  Headphones, 
  PlayCircle, 
  MessageSquare, 
  PenTool, 
  ChevronLeft,
  Share2,
  ShieldAlert
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { ReadPanel } from './panels/ReadPanel'
import { ListenPanel } from './panels/ListenPanel'

export function MultimodalTabs() {
  const [activeTab, setActiveTab] = useState('read')

  const tabs = [
    { id: 'read', label: 'Read', icon: BookOpen },
    { id: 'listen', label: 'Listen', icon: Headphones },
    { id: 'watch', label: 'Watch', icon: PlayCircle },
    { id: 'discuss', label: 'Discuss', icon: MessageSquare },
    { id: 'notes', label: 'Notes', icon: PenTool },
  ]

  return (
    <section className="bg-white rounded-[4rem] border border-slate-100 shadow-soft overflow-hidden">
      <nav className="flex border-b border-slate-50 bg-slate-50/50 p-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-1 flex items-center justify-center gap-3 py-6 px-4 rounded-[2rem] transition-all",
              activeTab === tab.id ? "bg-white text-primary font-bold shadow-sm" : "text-slate-400 hover:text-slate-600"
            )}
          >
            <tab.icon className="w-5 h-5" />
            <span className="text-sm uppercase tracking-widest font-bold">{tab.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-12 min-h-[400px]">
        {activeTab === 'read' && <ReadPanel />}
        {activeTab === 'listen' && <ListenPanel />}
        
        {/* Simplified Watch Panel */}
        {activeTab === 'watch' && (
          <div className="animate-fade-in">
            <div className="aspect-video w-full bg-slate-900 rounded-[2.5rem] flex items-center justify-center relative overflow-hidden group">
              <PlayCircle className="w-24 h-24 text-white opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all cursor-pointer relative z-10" />
            </div>
          </div>
        )}

        {/* Placeholder for other tabs to keep the file lean */}
        {(activeTab === 'discuss' || activeTab === 'notes') && (
          <div className="py-20 text-center space-y-4">
             <ShieldAlert className="w-12 h-12 text-slate-200 mx-auto" />
             <p className="text-slate-400 italic">This module is being manifest in the next stage.</p>
          </div>
        )}
      </div>
    </section>
  )
}
