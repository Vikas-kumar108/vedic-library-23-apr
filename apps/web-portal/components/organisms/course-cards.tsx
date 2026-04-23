import * as React from "react"
import { Star, Clock, BookOpen, Users, Award, Sparkles, Zap, ChevronRight, Play } from 'lucide-react'
import { Badge, Button } from '@/components'
import { cn } from '@/lib/utils'
import Link from 'next/link'

/**
 * VedicSkills Card Variety System (Organisms)
 * Following the Atomic Design Law.
 */

// --- 1. Featured Course Card (Immersive Horizontal) ---
export function CourseCardFeatured({ 
  title, instructor, description, thumbnail, duration, lessons, students, rating, tags, href 
}: any) {
  return (
    <article className="group flex flex-col lg:flex-row bg-white rounded-[2.5rem] border border-slate-100 shadow-soft overflow-hidden hover-lift">
      <div className="lg:w-80 h-56 lg:h-auto relative overflow-hidden flex-shrink-0">
        <img src={thumbnail} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
        <div className="absolute top-6 left-6">
          <Badge variant="orange">Featured Path</Badge>
        </div>
      </div>
      <div className="p-10 flex flex-col flex-1">
        <div className="flex gap-2 mb-4">
          {tags.map((t: string) => <Badge key={t} variant="outline" className="bg-slate-50">{t}</Badge>)}
        </div>
        <h3 className="text-3xl font-serif font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors leading-tight">{title}</h3>
        <p className="text-slate-500 mb-8 line-clamp-2 leading-relaxed">{description}</p>
        
        <div className="mt-auto flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-slate-50">
          <div className="flex items-center gap-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {duration}</span>
            <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> {lessons} Lessons</span>
            <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> {students}</span>
          </div>
          <Button asChild size="md">
            <Link href={href}>Enter Path</Link>
          </Button>
        </div>
      </div>
    </article>
  )
}

// --- 2. Premium Course Card (Gilded Aesthetic) ---
export function CourseCardPremium({ 
  title, instructor, price, rating, reviewCount, thumbnail, certification, href 
}: any) {
  return (
    <article className="group relative bg-white rounded-[2.5rem] border border-slate-100 shadow-soft overflow-hidden hover-lift p-2">
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-accent text-accent-foreground px-4 py-2 rounded-2xl font-bold text-[10px] tracking-widest flex items-center gap-2 shadow-xl shadow-accent/20">
          <Sparkles className="w-3 h-3" /> PREMIUM
        </div>
      </div>
      
      <div className="aspect-video relative rounded-[2rem] overflow-hidden">
        <img src={thumbnail} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
      </div>

      <div className="p-8 space-y-6">
        <h3 className="text-2xl font-serif font-bold text-slate-900 line-clamp-2">{title}</h3>
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-100 rounded-full border-2 border-white shadow-sm" />
          <div>
            <div className="font-bold text-slate-900 text-sm flex items-center gap-1">{instructor} <Award className="w-3 h-3 text-primary" /></div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Certified Mentor</p>
          </div>
        </div>

        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 flex items-center gap-3">
          <Award className="w-5 h-5 text-primary" />
          <div className="text-xs text-primary font-bold">{certification} included</div>
        </div>

        <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
          <div className="text-2xl font-bold text-slate-900">${price}</div>
          <Button asChild size="md" variant="primary">
            <Link href={href}>Enroll Now</Link>
          </Button>
        </div>
      </div>
    </article>
  )
}

// --- 3. Compact List Card (Sidebar Discovery) ---
export function CourseCardCompact({ title, instructor, duration, rating, href }: any) {
  return (
    <Link href={href} className="group flex items-center gap-4 p-4 rounded-2xl border border-transparent hover:border-slate-100 hover:bg-white hover:shadow-soft transition-all">
      <div className="w-16 h-16 rounded-xl bg-slate-100 flex-shrink-0 flex items-center justify-center group-hover:bg-primary/5 transition-colors">
        <Play className="w-6 h-6 text-slate-300 group-hover:text-primary transition-colors" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-slate-900 truncate group-hover:text-primary transition-colors">{title}</h4>
        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
          <span>{instructor}</span>
          <span>•</span>
          <span className="flex items-center gap-1 text-accent"><Star className="w-3 h-3 fill-current" /> {rating}</span>
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-slate-200 group-hover:text-primary transition-all translate-x-[-4px] group-hover:translate-x-0" />
    </Link>
  )
}

// --- 4. Progress Card (Dashboard View) ---
export function CourseCardProgress({ title, progress, lastLesson, href }: any) {
  return (
    <article className="bg-white rounded-[2rem] border border-slate-100 shadow-soft p-8 group hover-lift">
      <h3 className="text-xl font-bold text-slate-900 mb-6 group-hover:text-primary transition-colors">{title}</h3>
      <div className="space-y-4 mb-8">
        <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <span>{progress}% Complete</span>
          <span>Next: {lastLesson}</span>
        </div>
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <Button asChild variant="outline" className="w-full h-12">
        <Link href={href} className="flex items-center gap-2">
          Resume Mastery <Zap className="w-4 h-4 fill-current" />
        </Link>
      </Button>
    </article>
  )
}
