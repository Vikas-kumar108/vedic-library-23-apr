"use client"

import React from 'react'
import { BookCheck, FileText, Flame, GraduationCap, Trophy, Globe } from 'lucide-react'

interface ProgressSummaryProps {
  lessonsCompleted?: number
  notesWritten?: number
  currentStreak?: number
}

export function ProgressSummary({
  lessonsCompleted = 12,
  notesWritten = 28,
  currentStreak = 7,
}: ProgressSummaryProps) {
  const stats = [
    {
      label: 'Lessons Mastered',
      value: lessonsCompleted,
      icon: BookCheck,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      label: 'Realizations Captured',
      value: notesWritten,
      icon: FileText,
      color: 'text-[#e67e22]',
      bg: 'bg-orange-50'
    },
    {
      label: 'Spiritual Ascent',
      value: `${currentStreak} Days`,
      icon: Flame,
      color: 'text-red-500',
      bg: 'bg-red-50'
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40 group hover:bg-slate-50 transition-all duration-500"
        >
          <div className={`size-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
            <stat.icon className="size-7" />
          </div>
          <div className="space-y-1">
            <div className="text-4xl font-serif font-bold italic text-slate-900">{stat.value}</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
