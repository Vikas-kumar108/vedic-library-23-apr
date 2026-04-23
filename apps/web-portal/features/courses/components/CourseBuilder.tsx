'use client'

import React, { useState } from 'react'
import { 
  Plus, 
  GripVertical, 
  Trash2, 
  Video, 
  FileText, 
  Music, 
  Edit3, 
  CheckCircle2,
  Settings,
  ChevronDown,
  Layout
} from 'lucide-react'
import { Button } from '@/components'
import { cn } from '@/lib/utils'

/**
 * CourseBuilder Component
 * Responsibility: Provide a modular interface for creating and organizing course content.
 * Purpose: Allows Teachers/Admins to define the learning journey via Modules and Lessons.
 */
export function CourseBuilder() {
  const [modules, setModules] = useState([
    {
      id: 'm1',
      title: 'Foundations of Consciousness',
      lessons: [
        { id: 'l1', title: 'The Eternal Observer', type: 'VIDEO' },
        { id: 'l2', title: 'Sanskrit Terminology Guide', type: 'TEXT' }
      ]
    }
  ])

  const addModule = () => {
    const newModule = {
      id: `m${modules.length + 1}`,
      title: 'New Module',
      lessons: []
    }
    setModules([...modules, newModule])
  }

  const addLesson = (moduleId: string) => {
    setModules(modules.map(m => {
      if (m.id === moduleId) {
        return {
          ...m,
          lessons: [...m.lessons, { id: `l${Date.now()}`, title: 'New Lesson', type: 'VIDEO' }]
        }
      }
      return m
    }))
  }

  return (
    <div className="space-y-10 animate-fade-in">
      <header className="flex items-center justify-between pb-8 border-b border-slate-100">
        <div className="space-y-1">
          <h2 className="text-3xl font-serif font-bold text-slate-900">Journey Builder</h2>
          <p className="text-sm text-slate-500 italic">Organize your teachings into logical steps for the seeker.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="rounded-xl border-slate-200">
            <Settings className="w-4 h-4 mr-2" /> Course Settings
          </Button>
          <Button onClick={addModule} className="rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4 mr-2" /> Add Module
          </Button>
        </div>
      </header>

      <div className="space-y-6">
        {modules.map((module, mIdx) => (
          <div key={module.id} className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-soft overflow-hidden transition-all">
            {/* Module Header */}
            <div className="p-8 bg-slate-50/50 flex items-center justify-between border-b border-slate-50">
              <div className="flex items-center gap-6">
                <GripVertical className="w-5 h-5 text-slate-300 cursor-grab active:cursor-grabbing" />
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-bold text-primary shadow-sm">
                    {mIdx + 1}
                  </div>
                  <input 
                    className="bg-transparent text-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 px-2 rounded-lg"
                    value={module.title}
                    onChange={() => {}} // Handle change
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-red-500 transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
                <ChevronDown className="w-5 h-5 text-slate-300" />
              </div>
            </div>

            {/* Lessons List */}
            <div className="p-4 space-y-3 bg-white/50">
              {module.lessons.map((lesson, lIdx) => (
                <div key={lesson.id} className="p-5 bg-white rounded-2xl border border-slate-50 flex items-center justify-between hover:border-primary/20 hover:shadow-sm transition-all group/lesson">
                  <div className="flex items-center gap-6">
                    <GripVertical className="w-4 h-4 text-slate-200 group-hover/lesson:text-slate-300" />
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                        {lesson.type === 'VIDEO' && <Video className="w-4 h-4" />}
                        {lesson.type === 'TEXT' && <FileText className="w-4 h-4" />}
                      </div>
                      <input 
                        className="text-sm font-bold text-slate-700 bg-transparent focus:outline-none"
                        value={lesson.title}
                        onChange={() => {}}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-4 opacity-0 group-hover/lesson:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400"><Edit3 className="w-4 h-4" /></button>
                    <button className="p-2 hover:bg-slate-50 rounded-lg text-red-400"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
              
              <button 
                onClick={() => addLesson(module.id)}
                className="w-full p-4 border-2 border-dashed border-slate-100 rounded-2xl text-slate-400 text-xs font-bold uppercase tracking-widest hover:border-primary/30 hover:text-primary transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Lesson to Module
              </button>
            </div>
          </div>
        ))}
      </div>

      <footer className="pt-10 flex justify-end gap-4 border-t border-slate-100">
        <Button variant="ghost" className="rounded-xl text-slate-400">Cancel Changes</Button>
        <Button className="rounded-xl bg-slate-900 text-white px-10 h-14 font-bold shadow-xl shadow-slate-900/20">
          Publish Journey
        </Button>
      </footer>
    </div>
  )
}
