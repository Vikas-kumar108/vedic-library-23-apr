'use client'

import React from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Badge } from '@/components/atoms/badge'
import { Button } from '@/components/atoms/button'

interface CourseProgressionProps {
  courses: any[]
}

export function CourseProgression({ courses }: CourseProgressionProps) {
  return (
    <section className="space-y-6 text-left">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold text-slate-900 uppercase tracking-[0.2em]">Resume Journey</h2>
        <Link href="/courses" className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline transition-all">View All Paths →</Link>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {courses.slice(0, 2).map((course) => (
          <div key={course.id} className="group bg-white p-8 rounded-[3rem] border border-slate-100 shadow-soft hover:shadow-2xl hover:shadow-slate-200/50 transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge className="bg-primary/5 text-primary rounded-lg text-[8px] uppercase tracking-widest font-bold">
                  {course.level}
                </Badge>
                <span className="text-[10px] text-slate-300 font-bold">{course.progress || 0}% Complete</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 leading-snug group-hover:text-primary transition-colors">{course.title}</h3>
              <div className="h-1 w-full bg-slate-50 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${course.progress || 0}%` }} />
              </div>
            </div>
            <Button asChild variant="ghost" className="mt-8 justify-between h-12 rounded-xl text-primary font-bold">
              <Link href={`/courses/${course.id}`}>
                Continue <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        ))}
      </div>
    </section>
  )
}
