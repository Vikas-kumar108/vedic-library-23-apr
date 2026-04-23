'use client'

import React from 'react'
import { Book, Search, ArrowRight, Library as LibraryIcon, Sparkles } from 'lucide-react'
import { Button, StandardPage, Breadcrumb, SearchInput } from '@/components'
import Link from 'next/link'

/**
 * Library Homepage
 * Responsibility: Gateway to the sacred texts.
 * Purpose: Allows users to browse and search the core shastras.
 */
export default function LibraryHomePage() {
  const books = [
    { id: 'bg', title: 'Bhagavad Gita', desc: 'The Song of God. A dialogue between Krishna and Arjuna on the science of self-realization.', emoji: '🕉️' },
    { id: 'sb', title: 'Srimad Bhagavatam', desc: 'The spotless Purana. Deep narratives on the avatars of the Divine and the path of devotion.', emoji: '📿' },
    { id: 'up', title: 'Upanishads', desc: 'The philosophical core of the Vedas. Exploring the nature of ultimate reality and the soul.', emoji: '🕯️' },
  ]

  return (
    <StandardPage className="pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Library', href: '/library', active: true }]} className="justify-center mb-12" />

        <header className="text-center mb-20 space-y-8">
          <div className="w-20 h-20 bg-primary/5 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-primary">
            <LibraryIcon className="w-10 h-10" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold font-serif text-slate-900 leading-tight">
            The Digital <span className="text-primary italic">Gurukulam</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Access the eternal wisdom of the Vedas in a distraction-free, modern reading environment.
          </p>
          
          <div className="max-w-3xl mx-auto pt-8">
            <SearchInput placeholder="Search verses, purports, teachings..." />
          </div>
        </header>

        {/* Books Grid */}
        <section className="grid md:grid-cols-3 gap-8">
          {books.map((book) => (
            <div key={book.id} className="group bg-white rounded-[3rem] border border-slate-100 shadow-soft hover-lift flex flex-col h-full overflow-hidden">
              <div className="h-64 bg-slate-50 relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-50 group-hover:opacity-100 transition-opacity" />
                <span className="text-8xl select-none filter drop-shadow-2xl transform group-hover:scale-110 transition-transform duration-700">
                  {book.emoji}
                </span>
                <div className="absolute top-6 left-6">
                  <Badge variant="blue">Shastra</Badge>
                </div>
              </div>
              <div className="p-10 flex flex-col flex-1">
                <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors">{book.title}</h3>
                <p className="text-slate-500 mb-8 leading-relaxed line-clamp-3 italic">"{book.desc}"</p>
                
                <div className="mt-auto">
                  <Button asChild variant="primary" className="w-full h-14 rounded-2xl group/btn">
                    <Link href={`/library/${book.id}/read`} className="flex items-center justify-center gap-2">
                      Open Sacred Text <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Quick Discovery Section */}
        <section className="mt-24 p-12 bg-slate-900 rounded-[4rem] text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Sparkles className="w-48 h-48" />
          </div>
          <div className="max-w-2xl relative z-10 space-y-6">
            <h4 className="text-3xl font-serif font-bold italic">Curated Wisdom</h4>
            <p className="text-slate-400 text-lg leading-relaxed">
              Not sure where to start? Explore our curated collections of verses for specific life situations like Leadership, Anxiety, and Purpose.
            </p>
            <Button variant="accent" size="lg" className="h-14 px-10 rounded-2xl">
              Explore Collections
            </Button>
          </div>
        </section>
      </div>
    </StandardPage>
  )
}

function Badge({ children, variant }: any) {
  const styles = {
    blue: "bg-blue-100 text-blue-700",
  }
  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${styles[variant as keyof typeof styles]}`}>
      {children}
    </span>
  )
}
