'use client'

import React, { useState, Suspense } from 'react'
import { MainNavbar } from '@/components/ui/main-navbar'
import { Button } from '@/components/ui/button'
import { 
  Search, 
  ChevronRight, 
  BookOpen, 
  Languages, 
  Share2, 
  BookmarkPlus,
  Loader2,
  Tag
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'

const topics = [
  { id: 'DOMESTIC_DYNAMICS', label: 'Family Harmony', count: 42 },
  { id: 'SOCIAL_STRATEGY', label: 'Social Success', count: 28 },
  { id: 'PSYCHOLOGY_AND_EMOTION', label: 'Mental Balance', count: 56 },
  { id: 'ETHICS_AND_PHILOSOPHY', label: 'Ethics in Action', count: 34 },
  { id: 'RELATIONSHIP_DYNAMICS', label: 'Relationships', count: 89 },
  { id: 'GASTRONOMY_AND_VITALS', label: 'Health & Diet', count: 15 },
]

function PracticalLibraryContent() {
  const searchParams = useSearchParams()
  const stage = searchParams.get('stage')
  const [activeTopic, setActiveTopic] = useState('DOMESTIC_DYNAMICS')

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden">
      {/* Sidebar: Topics */}
      <aside className="w-full lg:w-80 border-r border-border/50 bg-secondary/10 overflow-y-auto">
        <div className="p-6 space-y-8">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Practical Topics</h2>
            <div className="space-y-1">
              {topics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => setActiveTopic(topic.id)}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all text-left",
                    activeTopic === topic.id 
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                      : "hover:bg-secondary/50 text-muted-foreground hover:text-foreground"
                  )}
                >
                  <span className="flex items-center gap-2">
                    <Tag className="h-4 w-4" /> {topic.label}
                  </span>
                  <span className="text-[10px] opacity-60 bg-black/10 px-1.5 rounded">{topic.count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content: Results / Reading */}
      <main className="flex-1 overflow-y-auto bg-background p-6 md:p-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Active Header */}
          <div className="space-y-4 border-b border-border/50 pb-8">
            <div className="flex items-center gap-2 text-sm text-[var(--knowledge-blue)] font-medium">
              <Link href="/">Discovery</Link> <ChevronRight className="h-4 w-4" /> {topics.find(t => t.id === activeTopic)?.label}
            </div>
            <h1 className="text-4xl font-serif">Practical Wisdom for {topics.find(t => t.id === activeTopic)?.label}</h1>
            <p className="text-muted-foreground text-lg">Direct, actionable insights from the Shastras tailored for your walk of life.</p>
          </div>

          {/* Results Feed (Mock) */}
          <div className="space-y-8">
            {[1, 2, 3].map((idx) => (
              <div key={idx} className="group p-8 rounded-[32px] border border-border/50 bg-card hover:border-primary/20 transition-all shadow-sm hover:shadow-xl hover:shadow-primary/5">
                <div className="flex justify-between items-start mb-6">
                  <div className="space-y-1">
                    <h3 className="text-sm font-serif text-[var(--saffron-dark)]">Kama Sutra 1.1.{idx+5}</h3>
                    <div className="text-2xl font-serif leading-relaxed">
                      "साधुवृत्तं निबोधत..." <br />
                      <span className="text-muted-foreground italic text-lg">
                        "The wise person balances their duties with joy, ensuring the stability of the household..."
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="rounded-full"><BookmarkPlus className="h-5 w-5" /></Button>
                    <Button variant="ghost" size="icon" className="rounded-full"><Share2 className="h-5 w-5" /></Button>
                  </div>
                </div>

                {/* Practical Takeaway Box */}
                <div className="bg-[var(--knowledge-blue)]/5 border border-[var(--knowledge-blue)]/10 rounded-2xl p-6 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[var(--knowledge-blue)]">
                    <Sparkles className="h-4 w-4" /> Practical Insight
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Balance is the key to domestic longevity. When duty (Dharma) is performed with a joyful heart, it creates an atmosphere where all inhabitants feel valued.
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">Want more depth? Sign up to unlock scholarly commentaries and personal notes.</p>
            <Button asChild variant="outline" className="rounded-full px-8">
              <Link href="/auth/signup">Create Seeker Account</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

import Link from 'next/link'

export default function PracticalLibraryPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainNavbar />
      <Suspense fallback={
        <div className="h-[calc(100vh-64px)] flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      }>
        <PracticalLibraryContent />
      </Suspense>
    </div>
  )
}
