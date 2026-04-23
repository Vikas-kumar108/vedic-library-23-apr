import * as React from "react"
import { Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/atoms/button"
import { Badge } from "@/components/atoms/badge"
import Link from "next/link"

/**
 * WisdomCard Organism
 * Responsibility: Display a summary of a Shastra, Course, or Article.
 * Purpose: High-level reusable component for grid displays.
 */
interface WisdomCardProps {
  id: string
  title: string
  type: string
  duration: string
  level: string
  tags: string[]
  href: string
}

export function WisdomCard({ id, title, type, duration, level, tags, href }: WisdomCardProps) {
  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-soft hover-lift group flex flex-col h-full overflow-hidden">
      <div className="h-44 bg-slate-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
        <div className="absolute top-4 left-4">
          <Badge variant="blue">{type}</Badge>
        </div>
      </div>
      <div className="p-8 flex flex-col flex-1">
        <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 mb-4 uppercase tracking-widest">
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {duration}</span>
          <span className="w-1 h-1 bg-slate-200 rounded-full" />
          <span>{level}</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors line-clamp-2">{title}</h3>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {tags.map(t => (
            <span key={t} className="px-2 py-0.5 bg-slate-50 text-slate-500 rounded text-[10px] font-medium">#{t}</span>
          ))}
        </div>

        <div className="mt-auto">
          <Button asChild variant="primary" className="w-full h-12">
            <Link href={href}>Start Learning</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
