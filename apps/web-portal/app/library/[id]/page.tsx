'use client'

import React, { useState } from 'react'
import { 
  BookOpen, 
  Headphones, 
  PlayCircle, 
  MessageSquare, 
  PenTool, 
  Share2, 
  Bookmark,
  ChevronLeft,
  Star
} from 'lucide-react'
import { Button, StandardPage, BackButton, Badge } from '@/components/index'
import { cn } from '@/lib/utils'
import Link from 'next/link'

/**
 * Content Detail Page (Multimodal)
 * Responsibility: Provide access to a specific Shastra or teaching across multiple mediums.
 * Purpose: Allows users to engage via Reading, Listening, Watching, or Discussing.
 */
export default function ContentDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState('read')

  const tabs = [
    { id: 'read', label: 'Read', icon: BookOpen },
    { id: 'listen', label: 'Listen', icon: Headphones },
    { id: 'watch', label: 'Watch', icon: PlayCircle },
    { id: 'discuss', label: 'Discuss', icon: MessageSquare },
    { id: 'notes', label: 'Notes', icon: PenTool },
  ]

  const contentMetadata = {
    title: "Bhagavad Gita As It Is",
    author: "A.C. Bhaktivedanta Swami Prabhupada",
    description: "The most widely read edition of the Gita in the world, featuring original Sanskrit, transliteration, and deep purports.",
    rating: 4.9,
    reviews: 1240,
    tags: ["Dharma", "Mastery", "Essential"]
  }

  return (
    <StandardPage className="pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <BackButton label="Back to Library" />

        {/* Hero Header */}
        <header className="grid md:grid-cols-[1fr_350px] gap-12 mb-16 items-start">
          <div className="space-y-8">
            <div className="flex gap-2">
              {contentMetadata.tags.map(t => <Badge key={t} variant="outline">{t}</Badge>)}
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 leading-tight">
              {contentMetadata.title}
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed font-serif italic max-w-2xl">
              {contentMetadata.description}
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-accent fill-accent" />
                <span className="font-bold text-slate-900">{contentMetadata.rating}</span>
                <span className="text-slate-400 text-sm">({contentMetadata.reviews} reviews)</span>
              </div>
              <div className="text-slate-400">|</div>
              <div className="text-slate-600 font-medium">By {contentMetadata.author}</div>
            </div>
            <div className="flex gap-4">
              <Button size="lg" className="h-16 px-10 rounded-2xl shadow-xl shadow-primary/20">
                <Link href={`/library/${params.id}/read`}>Start Reading</Link>
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

        {/* Multimodal Tabs */}
        <section className="bg-white rounded-[4rem] border border-slate-100 shadow-soft overflow-hidden">
          <nav className="flex border-b border-slate-50 bg-slate-50/50 p-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-3 py-6 px-4 rounded-[2rem] transition-all",
                  activeTab === tab.id ? "bg-white text-primary font-bold shadow-sm" : "text-slate-400 hover:text-slate-600"
                )}
              >
                <tab.icon className="w-5 h-5" />
                <span className="text-sm uppercase tracking-widest font-bold">{tab.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-12 min-h-[400px]">
            {activeTab === 'read' && (
              <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
                <h3 className="text-3xl font-serif font-bold text-slate-900">Summary of the Gita</h3>
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-lg font-serif">
                  <p>The Bhagavad-gita is universally acknowledged as the jewel of India's spiritual wisdom. Spoken by Lord Krishna, the Supreme Personality of Godhead, to His intimate disciple Arjuna, the Gita's seven hundred concise verses provide a definitive guide to the science of self-realization.</p>
                  <p>No other philosophical or religious work reveals, in such a lucid and profound way, the nature of consciousness, the self, the universe and the Supreme.</p>
                </div>
                <Button variant="ghost" className="text-primary font-bold">Read More in Deep View →</Button>
              </div>
            )}

            {activeTab === 'listen' && (
              <div className="flex flex-col items-center justify-center space-y-8 animate-fade-in py-12">
                <div className="w-32 h-32 bg-primary/5 rounded-full flex items-center justify-center text-primary">
                  <Headphones className="w-12 h-12" />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Sacred Audio Experience</h3>
                  <p className="text-slate-500 italic max-w-md mx-auto">Listen to the verses with musical accompaniment and deep commentary.</p>
                </div>
                <div className="w-full max-w-md bg-slate-50 h-2 rounded-full overflow-hidden">
                  <div className="w-1/3 h-full bg-primary" />
                </div>
                <div className="flex gap-6">
                  <Button variant="outline" size="icon" className="w-12 h-12 rounded-full"><ChevronLeft className="w-5 h-5" /></Button>
                  <Button size="icon" className="w-16 h-16 rounded-full"><PlayCircle className="w-8 h-8" /></Button>
                  <Button variant="outline" size="icon" className="w-12 h-12 rounded-full"><Share2 className="w-5 h-5" /></Button>
                </div>
              </div>
            )}

            {activeTab === 'watch' && (
              <div className="animate-fade-in">
                <div className="aspect-video w-full bg-slate-900 rounded-[2.5rem] flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544947950-fa07a98d237f')] bg-cover bg-center opacity-40" />
                  <PlayCircle className="w-24 h-24 text-white opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all cursor-pointer relative z-10" />
                  <div className="absolute bottom-6 left-6 text-white z-10">
                    <div className="text-xs font-bold uppercase tracking-widest opacity-60 mb-1">Introductory Lesson</div>
                    <div className="text-xl font-bold font-serif">A.C. Bhaktivedanta Swami on Bhagavad Gita</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'discuss' && (
              <div className="space-y-8 animate-fade-in py-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-slate-900">Community Realizations</h3>
                  <Button variant="outline" className="rounded-xl">Start a Thread</Button>
                </div>
                <div className="space-y-6">
                  {[1, 2].map(i => (
                    <div key={i} className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-slate-200 rounded-full" />
                        <div className="text-sm font-bold text-slate-900">Gaurav Sharma</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">3h ago</div>
                      </div>
                      <p className="text-slate-600 leading-relaxed italic">"The translation of verse 2.47 here is exceptionally clear. It really helped me understand the difference between duty and attachment to results."</p>
                      <div className="flex items-center gap-4 text-xs font-bold text-primary">
                        <span className="flex items-center gap-1 cursor-pointer hover:underline"><MessageSquare className="w-3 h-3" /> 12 Replies</span>
                        <span className="flex items-center gap-1 cursor-pointer hover:underline"><Star className="w-3 h-3" /> 8 Appreciations</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'notes' && (
              <div className="max-w-2xl mx-auto space-y-8 animate-fade-in py-8">
                <div className="text-center space-y-4 mb-12">
                  <PenTool className="w-12 h-12 text-primary mx-auto opacity-20" />
                  <h3 className="text-2xl font-bold text-slate-900">Your Private Reflections</h3>
                  <p className="text-slate-500 italic">"Write down what the Gita stirs in your heart. These notes are for your evolution."</p>
                </div>
                <textarea 
                  className="w-full min-h-[200px] p-8 text-lg rounded-[2rem] border border-slate-100 bg-slate-50 focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all placeholder:italic font-serif"
                  placeholder="Capture today's realizations..."
                />
                <Button className="w-full h-16 rounded-2xl bg-slate-900 text-white font-bold">Save Realization</Button>
              </div>
            )}
          </div>
        </section>
      </div>
    </StandardPage>
  )
}
