"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ChevronDown, PlayCircle, Clock, GraduationCap, Users, BookOpen, Star, ArrowLeft } from "lucide-react"

export default function CourseDetailPage() {
  const params = useParams()
  const courseId = params.id as string

  const [expandedModules, setExpandedModules] = useState<number[]>([0, 1])

  const toggleModule = (index: number) => {
    setExpandedModules((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  // Fallback Data
  const modules = [
    {
      title: "Module 1: Introduction to the Gita",
      lessons: [
        { id: "l1", title: "Historical Context", duration: "15 min", completed: false },
        { id: "l2", title: "The Setting of Kurukshetra", duration: "20 min", completed: false },
        { id: "l3", title: "Meeting the Characters", duration: "18 min", completed: false },
      ],
    },
    {
      title: "Module 2: The Dialogue Begins",
      lessons: [
        { id: "l4", title: "Arjuna's Dilemma", duration: "22 min", completed: false },
        { id: "l5", title: "Krishna's Response", duration: "25 min", completed: false },
        { id: "l6", title: "The Nature of Duty", duration: "30 min", completed: false },
      ],
    },
    {
      title: "Module 3: Paths to Liberation",
      lessons: [
        { id: "l7", title: "Karma Yoga - The Path of Action", duration: "28 min", completed: false },
        { id: "l8", title: "Jnana Yoga - The Path of Knowledge", duration: "32 min", completed: false },
        { id: "l9", title: "Bhakti Yoga - The Path of Devotion", duration: "26 min", completed: false },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-[#fdfcf5] pb-20 animate-in fade-in duration-700">
      
      {/* 🏛️ Header Section */}
      <section className="bg-white border-b border-slate-100 py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#e67e22]/5 rounded-full blur-[100px]" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <Link href="/courses" className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-[#e67e22] transition-colors mb-8 uppercase tracking-widest">
            <ArrowLeft className="size-4" /> Back to Curriculum
          </Link>
          
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#e67e22]/10 text-[#e67e22] rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
              <BookOpen className="size-3" /> Core Shastra Course
            </div>
            <h1 className="text-5xl lg:text-7xl font-serif font-bold italic text-slate-900 mb-6 leading-tight">
              Bhagavad Gita <span className="text-[#e67e22]">Foundations</span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed max-w-3xl">
              Explore the timeless wisdom of the Bhagavad Gita through a comprehensive journey that
              bridges ancient teachings with modern life. Master the core concepts of dharma, karma, and self-realization.
            </p>
          </div>
        </div>
      </section>

      {/* 🏛️ Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Left: Modules List */}
            <div className="lg:col-span-2 space-y-8">
              <h2 className="text-3xl font-serif font-bold italic text-slate-900">Course Syllabus</h2>

              <div className="space-y-4">
                {modules.map((module, moduleIndex) => (
                  <div
                    key={moduleIndex}
                    className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-lg transition-all"
                  >
                    {/* Module Header */}
                    <button
                      onClick={() => toggleModule(moduleIndex)}
                      className="w-full px-8 py-6 flex items-center justify-between hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-6">
                        <div className="size-12 rounded-[1rem] bg-slate-900 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-slate-900/20">
                          {moduleIndex + 1}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 text-left">{module.title}</h3>
                      </div>
                      <ChevronDown
                        className={`size-6 text-slate-400 transition-transform duration-300 ${
                          expandedModules.includes(moduleIndex) ? "rotate-180 text-[#e67e22]" : ""
                        }`}
                      />
                    </button>

                    {/* Lessons List */}
                    {expandedModules.includes(moduleIndex) && (
                      <div className="border-t border-slate-100 bg-[#fdfcf5]/50 p-4">
                        <div className="space-y-2">
                          {module.lessons.map((lesson, lessonIndex) => (
                            <Link
                              href={`/courses/${courseId}/lesson/${lesson.id}`}
                              key={lessonIndex}
                              className="group flex items-center justify-between p-4 rounded-[1.25rem] bg-white border border-slate-100 hover:border-[#e67e22]/30 hover:shadow-lg hover:shadow-[#e67e22]/5 transition-all"
                            >
                              <div className="flex items-center gap-4">
                                <div className="size-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-[#e67e22] group-hover:text-white transition-all shadow-sm">
                                  <PlayCircle className="size-5" />
                                </div>
                                <div>
                                  <h4 className="text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors">
                                    {lesson.title}
                                  </h4>
                                </div>
                              </div>
                              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full group-hover:bg-[#e67e22]/10 group-hover:text-[#e67e22] transition-colors">
                                {lesson.duration}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Course Info Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl overflow-hidden">
                  {/* Course Image */}
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80"
                      alt="Course Cover"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>

                  <div className="p-8 space-y-8">
                    {/* Course Stats */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="size-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                           <Clock className="size-5" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Duration</p>
                          <p className="text-sm font-bold text-slate-900">8 weeks, self-paced</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="size-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                           <BookOpen className="size-5" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Curriculum</p>
                          <p className="text-sm font-bold text-slate-900">12 Core Lessons</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="size-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                           <GraduationCap className="size-5" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Level</p>
                          <p className="text-sm font-bold text-slate-900">Beginner Friendly</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="size-10 rounded-xl bg-slate-50 flex items-center justify-center text-[#e67e22]">
                           <Star className="size-5" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Rating</p>
                          <p className="text-sm font-bold text-slate-900">4.9 / 5.0</p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-slate-100" />

                    {/* What You'll Learn */}
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-widest">What you'll master</h4>
                      <ul className="space-y-3">
                        {['Core teachings of the Bhagavad Gita', 'Three paths to self-realization', 'Practical application in daily life', 'Understanding dharma and karma'].map((item, i) => (
                           <li key={i} className="flex items-start gap-3">
                             <div className="size-5 rounded-full bg-[#e67e22]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="size-2 rounded-full bg-[#e67e22]" />
                             </div>
                             <span className="text-sm text-slate-600 font-medium">{item}</span>
                           </li>
                        ))}
                      </ul>
                    </div>

                    <Link 
                      href={`/courses/${courseId}/lesson/l1`} 
                      className="flex items-center justify-center w-full h-14 bg-slate-900 text-white font-bold rounded-2xl hover:bg-[#e67e22] transition-colors shadow-xl text-sm uppercase tracking-widest"
                    >
                      Begin Journey
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
