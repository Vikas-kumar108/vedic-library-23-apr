"use client"

import React, { useState, useMemo } from 'react'
import { 
  Search, 
  ChevronDown, 
  Clock, 
  BookOpen, 
  PlayCircle, 
  FileText,
  Filter,
  ArrowRight,
  Sparkles,
  Users
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const TOPICS = ["All", "Dharma", "Karma", "Bhakti", "Life", "Leadership", "Psychology"]
const TYPES = ["All", "Course", "Lesson", "Article"]
const LEVELS = ["All", "Beginner", "Intermediate", "Advanced"]

const ALL_CONTENT = [
  { id: '1', title: 'The Path of Dharma: Living with Purpose', type: 'Course', duration: '10 weeks', level: 'Beginner', topic: 'Dharma', tags: ['Purpose', 'Ethics'], featured: true, size: 'large', image: "https://images.unsplash.com/photo-1772368872233-4539a0b63f2a?auto=format&fit=crop&q=80" },
  { id: '2', title: 'Understanding Karma & Consciousness', type: 'Lesson', duration: '45 min', level: 'Intermediate', topic: 'Karma', tags: ['Action'], featured: true, size: 'small', image: "https://images.unsplash.com/photo-1617375361041-b00f3bdd94bf?auto=format&fit=crop&q=80" },
  { id: '3', title: 'Bhakti: The Art of Devotion', type: 'Article', duration: '12 min', level: 'Beginner', topic: 'Bhakti', tags: ['Bhakti'], featured: true, size: 'small', image: "https://images.unsplash.com/photo-1641391400871-3a6578a11d5a?auto=format&fit=crop&q=80" },
  { id: '4', title: 'Vedic Leadership: Lead by Service', type: 'Course', duration: '4 weeks', level: 'Advanced', topic: 'Leadership', tags: ['Management'], image: "https://images.unsplash.com/photo-1646693346396-3a9bb5167fbb?auto=format&fit=crop&q=80" },
  { id: '5', title: 'The Science of Meditation', type: 'Lesson', duration: '30 min', level: 'Beginner', topic: 'Life', tags: ['Mind'], image: "https://images.unsplash.com/photo-1718976001444-38ffc80cf381?auto=format&fit=crop&q=80" },
  { id: '6', title: 'Wisdom of the Upanishads', type: 'Course', duration: '8 weeks', level: 'Intermediate', topic: 'Dharma', tags: ['Philosophy'], image: "https://images.unsplash.com/photo-1588600209271-fd4e90553a71?auto=format&fit=crop&q=80" },
]

export default function ExplorePage() {
  const [search, setSearch] = useState('')
  const [selectedTopic, setSelectedTopic] = useState('All')
  const [selectedType, setSelectedType] = useState('All')
  const [selectedLevel, setSelectedLevel] = useState('All')

  const filteredContent = useMemo(() => {
    return ALL_CONTENT.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase())
      const matchesTopic = selectedTopic === 'All' || item.topic === selectedTopic
      const matchesType = selectedType === 'All' || item.type === selectedType
      const matchesLevel = selectedLevel === 'All' || item.level === selectedLevel
      return matchesSearch && matchesTopic && matchesType && matchesLevel
    })
  }, [search, selectedTopic, selectedType, selectedLevel])

  const featuredItems = ALL_CONTENT.filter(i => i.featured)
  const largeFeatured = featuredItems.find(i => i.size === 'large')
  const smallFeatured = featuredItems.filter(i => i.size === 'small')

  return (
    <div className="min-h-screen bg-[#fdfcf5]">
      {/* 🏛️ Top Section with Search and Filters */}
      <section className="bg-white border-b border-slate-100 pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em]">
               Discover Timeless Wisdom
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold italic text-slate-900 leading-tight">Explore the Vault</h1>
            
            {/* Search Bar */}
            <div className="relative group max-w-2xl mx-auto">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 size-6 group-focus-within:text-[#e67e22] transition-colors" />
              <Input 
                className="h-16 pl-16 pr-6 rounded-[2rem] bg-[#fdfcf5] border-slate-100 text-lg shadow-xl shadow-slate-200/50 focus:ring-4 focus:ring-[#e67e22]/10 outline-none transition-all" 
                placeholder="Search teachings, topics, or concepts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <FilterDropdown label="Topic" options={TOPICS} selected={selectedTopic} onSelect={setSelectedTopic} />
              <FilterDropdown label="Type" options={TYPES} selected={selectedType} onSelect={setSelectedType} />
              <FilterDropdown label="Level" options={LEVELS} selected={selectedLevel} onSelect={setSelectedLevel} />
            </div>
          </div>
        </div>
      </section>

      {/* 🏛️ Topics Pills */}
      <section className="py-8 bg-white/50 border-b border-slate-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {TOPICS.map((topic) => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={cn(
                  "px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border",
                  selectedTopic === topic
                    ? "bg-[#e67e22] border-[#e67e22] text-white shadow-xl shadow-[#e67e22]/20"
                    : "bg-white border-slate-100 text-slate-500 hover:border-[#e67e22] hover:text-[#e67e22]"
                )}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        {/* 🏛️ Featured Discovery (Only shown when no search/filters active) */}
        {search === '' && selectedTopic === 'All' && (
          <section className="mb-32">
            <div className="flex items-center gap-4 mb-12">
               <div className="h-px flex-1 bg-slate-100" />
               <h2 className="text-2xl font-serif font-bold italic text-slate-900">Featured Manifestations</h2>
               <div className="h-px flex-1 bg-slate-100" />
            </div>

            <div className="grid lg:grid-cols-3 gap-10">
              {/* Large Featured Card */}
              {largeFeatured && (
                <div className="lg:col-span-2 group bg-white border border-slate-100 rounded-[3rem] overflow-hidden hover:shadow-2xl transition-all duration-700">
                  <div className="aspect-[16/9] overflow-hidden relative">
                    <img
                      src={largeFeatured.image}
                      alt={largeFeatured.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-8 left-8">
                       <span className="px-6 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black text-[#e67e22] uppercase tracking-[0.2em] shadow-sm">
                         {largeFeatured.type}
                       </span>
                    </div>
                  </div>
                  <div className="p-12 space-y-6">
                    <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <span className="flex items-center gap-1"><Clock className="size-3" /> {largeFeatured.duration}</span>
                      <span className="flex items-center gap-1"><Sparkles className="size-3" /> {largeFeatured.level}</span>
                    </div>
                    <h3 className="text-4xl font-serif font-bold italic text-slate-900 leading-tight group-hover:text-[#e67e22] transition-colors">
                      {largeFeatured.title}
                    </h3>
                    <p className="text-lg text-slate-500 leading-relaxed max-w-2xl">
                      Master the fundamental values and ethics that define a purposeful life. A comprehensive journey into Dharmic living and institutional excellence.
                    </p>
                    <Button asChild className="h-14 px-10 bg-slate-900 hover:bg-[#e67e22] text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all">
                      <Link href={`/courses`}>Start Learning</Link>
                    </Button>
                  </div>
                </div>
              )}

              {/* Smaller Cards Stack */}
              <div className="flex flex-col gap-10">
                {smallFeatured.map((item) => (
                  <div key={item.id} className="flex-1 group bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden hover:shadow-xl transition-all duration-500 flex flex-col">
                    <div className="h-48 overflow-hidden relative">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="p-8 space-y-4">
                       <div className="flex items-center gap-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                         <span className="text-[#e67e22]">{item.type}</span>
                         <span>•</span>
                         <span>{item.duration}</span>
                       </div>
                       <h4 className="text-xl font-serif font-bold italic text-slate-900 group-hover:text-[#e67e22] transition-colors line-clamp-2">
                         {item.title}
                       </h4>
                       <Button asChild variant="ghost" className="p-0 text-[#e67e22] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-transparent group/btn">
                         <Link href={`/courses`} className="flex items-center">
                           Start <ArrowRight className="ml-2 size-3 group-hover/btn:translate-x-2 transition-transform" />
                         </Link>
                       </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 🏛️ Discovery Grid */}
        <section>
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-serif font-bold italic text-slate-900">
              {search ? `Manifestations for "${search}"` : 'Sovereign Teachings'}
            </h2>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              {filteredContent.length} Entities Found
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredContent.map((item) => (
              <div key={item.id} className="group bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col">
                 <div className="h-56 overflow-hidden relative">
                   <img src={item.image || "https://images.unsplash.com/photo-1502139214982-d0ad755818d8?auto=format&fit=crop&q=80"} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                 </div>
                 <div className="p-10 flex flex-col flex-1 space-y-6">
                    <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <span className="text-[#e67e22]">{item.type}</span>
                      <span className="flex items-center gap-1"><Clock className="size-3" /> {item.duration}</span>
                      <span className="flex items-center gap-1"><Users className="size-3" /> {item.level}</span>
                    </div>
                    <h3 className="text-2xl font-serif font-bold italic text-slate-900 leading-tight group-hover:text-[#e67e22] transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 pt-2">
                       {item.tags?.map(t => (
                         <span key={t} className="px-3 py-1 bg-[#fdfcf5] text-slate-400 rounded-full text-[9px] font-bold border border-slate-100">
                           #{t}
                         </span>
                       ))}
                    </div>
                    <Button asChild className="h-12 bg-slate-900 hover:bg-[#e67e22] text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all">
                       <Link href={`/courses`}>Start Learning</Link>
                    </Button>
                 </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredContent.length === 0 && (
            <div className="py-32 text-center space-y-8 bg-white border-2 border-dashed border-slate-100 rounded-[3rem]">
               <div className="size-24 bg-[#fdfcf5] rounded-full flex items-center justify-center mx-auto">
                 <Search className="size-10 text-slate-200" />
               </div>
               <div className="space-y-4">
                 <h3 className="text-3xl font-serif font-bold italic text-slate-900">No Manifestations Found</h3>
                 <p className="text-slate-400 max-w-sm mx-auto">Our shastra vault is vast, but your search eluded us. Try another topic or request a specific teaching.</p>
               </div>
               <Button variant="outline" onClick={() => {setSearch(''); setSelectedTopic('All');}} className="h-12 px-8 rounded-xl border-slate-200 font-black text-[10px] uppercase tracking-widest">
                 Reset Discovery
               </Button>
            </div>
          )}
        </section>

        {/* 🏛️ Load More */}
        {filteredContent.length > 0 && (
          <div className="text-center pt-20">
            <Button variant="outline" className="h-16 px-12 rounded-2xl border-2 border-slate-200 text-slate-900 font-black text-xs uppercase tracking-[0.2em] hover:bg-white hover:border-[#e67e22] hover:text-[#e67e22] transition-all shadow-sm">
              Explore More Teachings
            </Button>
          </div>
        )}
      </div>

      {/* 🏛️ Institutional Footer */}
      <footer className="bg-white border-t border-slate-100 py-20">
        <div className="container mx-auto px-4">
           <div className="flex flex-col md:flex-row justify-between items-center gap-10">
              <div className="flex items-center gap-4">
                 <div className="size-12 bg-[#e67e22] rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg">V</div>
                 <div className="font-serif font-bold italic text-xl text-slate-900">VedicSkills</div>
              </div>
              <div className="flex gap-10 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                 <Link href="/" className="hover:text-[#e67e22] transition-colors">Home</Link>
                 <Link href="/explore" className="hover:text-[#e67e22] transition-colors">Explore</Link>
                 <Link href="/courses" className="hover:text-[#e67e22] transition-colors">Courses</Link>
                 <Link href="/about" className="hover:text-[#e67e22] transition-colors">About</Link>
              </div>
              <div className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                © 2026 Institutional Vault
              </div>
           </div>
        </div>
      </footer>
    </div>
  )
}

function FilterDropdown({ label, options, selected, onSelect }: any) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 px-8 rounded-2xl bg-white border border-slate-100 flex items-center gap-6 text-[10px] font-black text-slate-900 hover:border-[#e67e22] transition-all min-w-[180px] shadow-sm uppercase tracking-widest"
      >
        <span className="text-slate-300">{label}:</span>
        <span className="flex-1 text-left">{selected}</span>
        <ChevronDown className={cn("size-4 text-slate-300 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 mt-3 w-full min-w-[200px] bg-white border border-slate-100 rounded-[1.5rem] shadow-2xl z-40 py-4 animate-in fade-in slide-in-from-top-2 duration-300">
            {options.map((opt: string) => (
              <button
                key={opt}
                onClick={() => { onSelect(opt); setIsOpen(false); }}
                className={cn(
                  "w-full text-left px-8 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-[#fdfcf5] hover:text-[#e67e22] transition-colors",
                  selected === opt ? "text-[#e67e22] bg-[#fdfcf5]" : "text-slate-400"
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
