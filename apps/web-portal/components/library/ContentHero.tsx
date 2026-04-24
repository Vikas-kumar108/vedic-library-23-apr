'use client'

import React from 'react'
import Link from 'next/link'
import { Star, Bookmark } from 'lucide-react'
import { Button, BackButton, Badge } from '@/components/index'

interface ContentHeroProps {
  id: string
  metadata: {
    title: string
    author: string
    description: string
    rating: number
    reviews: number
    tags: string[]
  }
}

export function ContentHero({ id, metadata }: ContentHeroProps) {
  return (
    <header className="grid md:grid-cols-[1fr_350px] gap-12 mb-16 items-start text-left">
      <div className="space-y-8">
        <BackButton label="Back to Library" />
        <div className="flex gap-2">
          {metadata.tags.map(t => <Badge key={t} variant="outline">{t}</Badge>)}
        </div>
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 leading-tight">
          {metadata.title}
        </h1>
        <p className="text-xl text-slate-500 leading-relaxed font-serif italic max-w-2xl">
          {metadata.description}
        </p>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-accent fill-accent" />
            <span className="font-bold text-slate-900">{metadata.rating}</span>
            <span className="text-slate-400 text-sm">({metadata.reviews} reviews)</span>
          </div>
          <div className="text-slate-400">|</div>
          <div className="text-slate-600 font-medium">By {metadata.author}</div>
        </div>
        <div className="flex gap-4">
          <Button size="lg" className="h-16 px-10 rounded-2xl shadow-xl shadow-primary/20">
            <Link href={`/library/${id}/read`}>Start Reading</Link>
          </Button>
          <Button variant="outline" size="lg" className="h-16 px-10 rounded-2xl border-slate-200">
            <Bookmark className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="relative aspect-[3/4] bg-slate-100 rounded-[3rem] shadow-soft overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 flex items-center justify-center text-8xl">🕉️</div>
      </div>
    </header>
  )
}
