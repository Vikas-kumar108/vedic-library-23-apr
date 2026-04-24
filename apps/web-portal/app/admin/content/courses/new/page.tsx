"use client"

import React, { useState } from "react"
import { ArrowLeft, Plus, X, ArrowUp, ArrowDown, BookOpen } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface Lesson {
  id: number
  title: string
}

interface Module {
  id: number
  title: string
  lessons: Lesson[]
}

export default function CourseBuilderPage() {
  const [availableLessons, setAvailableLessons] = useState<Lesson[]>([
    { id: 1, title: "Introduction to Dharma" },
    { id: 2, title: "The Science of Karma" },
    { id: 3, title: "Bhakti vs. Jnana" },
    { id: 4, title: "Meditation Fundamentals" },
    { id: 5, title: "The Four Yugas" },
    { id: 6, title: "Vedic Cosmology" },
  ])

  const [modules, setModules] = useState<Module[]>([
    { id: 1, title: "Module 1: Foundations", lessons: [] },
    { id: 2, title: "Module 2: Advanced Practice", lessons: [] },
  ])

  const addLessonToModule = (lesson: Lesson, moduleId: number) => {
    setModules(prev => prev.map(m => 
      m.id === moduleId ? { ...m, lessons: [...m.lessons, lesson] } : m
    ))
    setAvailableLessons(prev => prev.filter(l => l.id !== lesson.id))
  }

  const removeLessonFromModule = (lesson: Lesson, moduleId: number) => {
    setModules(prev => prev.map(m => 
      m.id === moduleId ? { ...m, lessons: m.lessons.filter(l => l.id !== lesson.id) } : m
    ))
    setAvailableLessons(prev => [...prev, lesson])
  }

  const moveLesson = (moduleId: number, lessonIndex: number, direction: 'up' | 'down') => {
    setModules(prev => prev.map(m => {
      if (m.id !== moduleId) return m
      
      const newLessons = [...m.lessons]
      if (direction === 'up' && lessonIndex > 0) {
        ;[newLessons[lessonIndex - 1], newLessons[lessonIndex]] = [newLessons[lessonIndex], newLessons[lessonIndex - 1]]
      } else if (direction === 'down' && lessonIndex < newLessons.length - 1) {
        ;[newLessons[lessonIndex + 1], newLessons[lessonIndex]] = [newLessons[lessonIndex], newLessons[lessonIndex + 1]]
      }
      return { ...m, lessons: newLessons }
    }))
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      
      {/* 🏛️ Header */}
      <header className="bg-slate-900/50 border-b border-slate-800 px-8 py-6 flex items-center justify-between sticky top-0 z-10 backdrop-blur-xl">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="size-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
            <ArrowLeft className="size-5" />
          </Link>
          <div>
             <h1 className="text-2xl font-serif font-bold italic text-white">Course Forge</h1>
             <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Curriculum Architecture</p>
          </div>
        </div>
        <Button className="h-12 px-8 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-indigo-600/20">
          Save Curriculum Structure
        </Button>
      </header>

      {/* 🏛️ Main Builder Interface */}
      <main className="flex-1 overflow-hidden flex flex-col lg:flex-row">
        
        {/* Left: Available Lessons Vault */}
        <aside className="w-full lg:w-96 bg-slate-900/30 border-r border-slate-800 p-8 overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-serif font-bold italic text-slate-300">Available Wisdom</h2>
            <div className="size-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400">
              {availableLessons.length}
            </div>
          </div>
          
          <div className="space-y-3">
            {availableLessons.map((lesson) => (
              <div key={lesson.id} className="group p-4 bg-slate-900 border border-slate-800 rounded-2xl hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                   <div className="size-8 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0 text-slate-400">
                      <BookOpen className="size-4" />
                   </div>
                   <span className="text-sm font-medium text-slate-300">{lesson.title}</span>
                </div>
                <div className="flex gap-2">
                   {modules.map(m => (
                      <button 
                        key={m.id}
                        onClick={() => addLessonToModule(lesson, m.id)}
                        className="flex-1 py-1.5 rounded-lg bg-slate-800 hover:bg-[#e67e22]/20 hover:text-[#e67e22] text-[10px] font-black uppercase tracking-widest text-slate-500 transition-colors"
                      >
                        Add to M{m.id}
                      </button>
                   ))}
                </div>
              </div>
            ))}
            {availableLessons.length === 0 && (
              <div className="text-center p-8 border-2 border-dashed border-slate-800 rounded-2xl text-slate-500 text-sm">
                All available lessons have been assigned to modules.
              </div>
            )}
          </div>
        </aside>

        {/* Right: Module Assembly Canvas */}
        <div className="flex-1 p-8 lg:p-12 overflow-y-auto bg-slate-950">
          <div className="max-w-4xl mx-auto space-y-10">
            
            {modules.map((module) => (
              <div key={module.id} className="bg-slate-900/50 rounded-[2.5rem] border border-slate-800 overflow-hidden shadow-2xl">
                {/* Module Header */}
                <div className="bg-slate-900 px-8 py-6 border-b border-slate-800 flex items-center justify-between">
                  <h3 className="text-xl font-serif font-bold italic text-white">{module.title}</h3>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                    {module.lessons.length} Lessons
                  </div>
                </div>

                {/* Module Content */}
                <div className="p-8 space-y-3 min-h-[150px]">
                  {module.lessons.length === 0 ? (
                    <div className="flex items-center justify-center h-32 text-sm text-slate-500 border-2 border-dashed border-slate-800 rounded-2xl">
                      Module is currently empty. Assign lessons from the vault.
                    </div>
                  ) : (
                    module.lessons.map((lesson, index) => (
                      <div key={lesson.id} className="flex items-center gap-4 p-4 bg-slate-950 border border-slate-800 rounded-2xl hover:border-slate-700 transition-colors group">
                        
                        {/* Reordering Controls */}
                        <div className="flex flex-col gap-1">
                          <button 
                            onClick={() => moveLesson(module.id, index, 'up')}
                            disabled={index === 0}
                            className="text-slate-600 hover:text-white disabled:opacity-30 transition-colors"
                          >
                            <ArrowUp className="size-4" />
                          </button>
                          <button 
                            onClick={() => moveLesson(module.id, index, 'down')}
                            disabled={index === module.lessons.length - 1}
                            className="text-slate-600 hover:text-white disabled:opacity-30 transition-colors"
                          >
                            <ArrowDown className="size-4" />
                          </button>
                        </div>

                        <div className="flex-1 text-sm font-medium text-slate-300">
                          {lesson.title}
                        </div>

                        <button
                          onClick={() => removeLessonFromModule(lesson, module.id)}
                          className="size-8 rounded-lg flex items-center justify-center hover:bg-rose-500/10 text-slate-500 hover:text-rose-500 transition-colors"
                        >
                          <X className="size-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}

            <button className="w-full flex items-center justify-center gap-3 h-20 rounded-[2.5rem] border-2 border-dashed border-slate-800 hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all text-slate-400 hover:text-indigo-400 group">
              <div className="size-10 rounded-full bg-slate-900 group-hover:bg-indigo-500/20 flex items-center justify-center transition-colors">
                 <Plus className="size-5" />
              </div>
              <span className="font-serif font-bold italic text-lg">Manifest New Module</span>
            </button>

          </div>
        </div>

      </main>
    </div>
  )
}
