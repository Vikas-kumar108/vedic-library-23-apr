'use client'

import React, { useState, useMemo } from 'react'
import { 
  Search, 
  ChevronDown, 
  Clock, 
  BookOpen, 
  PlayCircle, 
  FileText,
  Filter,
  ArrowRight
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const topics = ['Dharma', 'Karma', 'Bhakti', 'Leadership', 'Life', 'Psychology', 'Relationships']
const types = ['Course', 'Lesson', 'Article']
const levels = ['Beginner', 'Intermediate', 'Advanced']

const allContent = [
  { id: '1', title: 'The Foundations of Dharma', type: 'Course', duration: '4h 20m', level: 'Beginner', topic: 'Dharma', tags: ['Values', 'Ethics'], featured: true, size: 'large' },
  { id: '2', title: 'Understanding Karma Yoga', type: 'Lesson', duration: '15 min', level: 'Intermediate', topic: 'Karma', tags: ['Action'], featured: true, size: 'small' },
  { id: '3', title: 'The Path of Devotion', type: 'Article', duration: '10 min', level: 'Beginner', topic: 'Bhakti', tags: ['Bhakti'], featured: true, size: 'small' },
  { id: '4', title: 'Vedic Leadership Principles', type: 'Course', duration: '2h 15m', level: 'Advanced', topic: 'Leadership', tags: ['Management'] },
  { id: '5', title: 'Daily Life Discipline', type: 'Lesson', duration: '12 min', level: 'Beginner', topic: 'Life', tags: ['Routine'] },
  { id: '6', title: 'Navigating Family Tensions', type: 'Article', duration: '8 min', level: 'Intermediate', topic: 'Psychology', tags: ['Family'] },
  { id: '7', title: 'The Science of Meditation', type: 'Lesson', duration: '20 min', level: 'Beginner', topic: 'Bhakti', tags: ['Mind'] },
  { id: '8', title: 'Art of Communication', type: 'Course', duration: '3h 10m', level: 'Intermediate', topic: 'Relationships', tags: ['Speech'] },
  { id: '9', title: 'Legacy of the Sages', type: 'Article', duration: '15 min', level: 'Advanced', topic: 'Dharma', tags: ['History'] },
]

export default function ExplorePage() {
  const [search, setSearch] = useState('')
  const [selectedTopic, setSelectedTopic] = useState('All')
  const [selectedType, setSelectedType] = useState('All')
  const [selectedLevel, setSelectedLevel] = useState('All')

  const filteredContent = useMemo(() => {
    return allContent.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase())
      const matchesTopic = selectedTopic === 'All' || item.topic === selectedTopic
      const matchesType = selectedType === 'All' || item.type === selectedType
      const matchesLevel = selectedLevel === 'All' || item.level === selectedLevel
      return matchesSearch && matchesTopic && matchesType && matchesLevel
    })
  }, [search, selectedTopic, selectedType, selectedLevel])

  const featuredItems = allContent.filter(i => i.featured)
  const largeFeatured = featuredItems.find(i => i.size === 'large')
  const smallFeatured = featuredItems.filter(i => i.size === 'small')

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Course': return <PlayCircle className="w-4 h-4" />
      case 'Lesson': return <BookOpen className="w-4 h-4" />
      case 'Article': return <FileText className="w-4 h-4" />
      default: return <BookOpen className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Top: Large Search Bar */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6 group-focus-within:text-orange-600 transition-colors" />
            <Input 
              className="h-16 pl-16 pr-6 rounded-[2rem] bg-white border-slate-200 text-lg shadow-xl shadow-slate-200/50 focus:ring-4 focus:ring-orange-600/10 outline-none transition-all" 
              placeholder="Search teachings, topics, or concepts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <FilterDropdown label="Topic" options={['All', ...topics]} selected={selectedTopic} onSelect={setSelectedTopic} />
          <FilterDropdown label="Type" options={['All', ...types]} selected={selectedType} onSelect={setSelectedType} />
          <FilterDropdown label="Level" options={['All', ...levels]} selected={selectedLevel} onSelect={setSelectedLevel} />
        </div>

        {/* Topic Pills: Rounded, scrollable */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-12 no-scrollbar px-2">
          <button 
            onClick={() => setSelectedTopic('All')}
            className={cn(
              "px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all border",
              selectedTopic === 'All' ? "bg-orange-600 border-orange-600 text-white shadow-lg shadow-orange-600/20" : "bg-white border-slate-200 text-slate-600 hover:border-orange-600"
            )}
          >
            All Topics
          </button>
          {topics.map(t => (
            <button 
              key={t}
              onClick={() => setSelectedTopic(t)}
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all border",
                selectedTopic === t ? "bg-orange-600 border-orange-600 text-white shadow-lg shadow-orange-600/20" : "bg-white border-slate-200 text-slate-600 hover:border-orange-600"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Featured Section: 1 large, 2 smaller */}
        {search === '' && selectedTopic === 'All' && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Featured Wisdom</h2>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Large Card */}
              {largeFeatured && (
                <div className="lg:col-span-2 relative group rounded-[2.5rem] overflow-hidden bg-slate-900 h-[450px]">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80')] bg-cover bg-center group-hover:scale-105 transition-transform duration-700 opacity-60" />
                  <div className="absolute bottom-0 left-0 p-10 z-20 w-full max-w-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-orange-600 text-white text-[10px] font-bold rounded-full uppercase">Featured Course</span>
                      <span className="text-white/60 text-xs">{largeFeatured.duration}</span>
                    </div>
                    <h3 className="text-4xl font-bold text-white mb-4">{largeFeatured.title}</h3>
                    <p className="text-white/70 mb-8 leading-relaxed">Master the fundamental values and ethics that define a purposeful life. A comprehensive journey into Dharmic living.</p>
                    <Button asChild className="h-12 px-8 rounded-xl bg-white text-slate-900 hover:bg-orange-50 font-bold transition-all">
                      <Link href={`/library/${largeFeatured.id}`}>Start Learning</Link>
                    </Button>
                  </div>
                </div>
              )}
              {/* Smaller Cards */}
              <div className="flex flex-col gap-8">
                {smallFeatured.map(item => (
                  <div key={item.id} className="flex-1 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-orange-600 uppercase mb-4">
                      {getTypeIcon(item.type)}
                      <span>{item.type}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-orange-600 transition-colors">{item.title}</h3>
                    <Button asChild variant="ghost" className="p-0 text-orange-600 font-bold hover:bg-transparent group/btn">
                      <Link href={`/library/${item.id}`} className="flex items-center">
                        Start Learning <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Content Grid (3 columns) */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900">
              {search ? `Search results for "${search}"` : 'Discover More'}
            </h2>
            <div className="text-sm text-slate-400 font-medium">{filteredContent.length} items found</div>
          </div>

          {filteredContent.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredContent.map(item => (
                <div key={item.id} className="bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col h-full">
                  <div className="h-44 bg-slate-100 relative overflow-hidden rounded-t-[2rem]">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-600/5 to-amber-500/5" />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold text-orange-600 uppercase tracking-widest flex items-center gap-1">
                      {getTypeIcon(item.type)}
                      {item.type}
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 mb-4">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {item.duration}</span>
                      <span className="w-1 h-1 bg-slate-200 rounded-full" />
                      <span>{item.level}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-orange-600 transition-colors line-clamp-2">{item.title}</h3>
                    
                    <div className="flex flex-wrap gap-2 mb-8">
                      {item.tags.map(t => (
                        <span key={t} className="px-2 py-0.5 bg-slate-50 text-slate-500 rounded text-[10px] font-medium">#{t}</span>
                      ))}
                    </div>

                    <div className="mt-auto">
                      <Button asChild className="w-full h-12 rounded-xl bg-slate-900 hover:bg-orange-600 text-white font-bold transition-all">
                        <Link href={`/library/${item.id}`}>Start Learning</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-100">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No results found</h3>
              <p className="text-slate-500 mb-8">We couldn't find anything matching your search. Try another term or explore categories.</p>
              <div className="flex flex-wrap justify-center gap-2">
                {topics.slice(0, 4).map(t => (
                  <Button key={t} variant="outline" size="sm" onClick={() => setSelectedTopic(t)} className="rounded-full">{t}</Button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom: Load More */}
        {filteredContent.length > 0 && (
          <div className="text-center pt-12">
            <Button variant="outline" className="h-14 px-12 rounded-2xl border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 hover:border-orange-200 transition-all">
              Load More Teachings
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

function FilterDropdown({ label, options, selected, onSelect }: any) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="h-12 px-6 rounded-xl bg-white border border-slate-200 flex items-center gap-4 text-sm font-bold text-slate-700 hover:border-orange-600 transition-all min-w-[140px] shadow-sm"
      >
        <span className="text-slate-400 font-medium">{label}:</span>
        <span className="flex-1 text-left">{selected}</span>
        <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 mt-2 w-full min-w-[180px] bg-white border border-slate-100 rounded-2xl shadow-2xl z-20 py-2 animate-fade-in">
            {options.map((opt: string) => (
              <button
                key={opt}
                onClick={() => { onSelect(opt); setIsOpen(false); }}
                className={cn(
                  "w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 transition-colors",
                  selected === opt ? "text-orange-600 font-bold bg-orange-50/50" : "text-slate-600"
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
