'use client'

import React from 'react'
import { 
  MessageSquare, 
  Heart, 
  Share2, 
  ShieldCheck, 
  Users, 
  MapPin, 
  Compass, 
  Sparkles,
  MoreVertical,
  PlusCircle,
  Hash
} from 'lucide-react'
import { Button, Badge } from '@/components'
import { usePosts, useGroups } from '../hooks/usePosts'
import { cn } from '@/lib/utils'

/**
 * CommunityFeed Component
 * Responsibility: Provide a high-end, distraction-free social layer for seekers.
 * Purpose: Fosters intimate, high-quality spiritual discussion and regional connection.
 */
export function CommunityFeed() {
  const { posts, isLoading: postsLoading } = usePosts()
  const { groups, isLoading: groupsLoading } = useGroups()

  return (
    <div className="grid lg:grid-cols-[1fr_350px] gap-12 animate-fade-in">
      
      {/* Main Feed Section */}
      <main className="space-y-10">
        {/* Create Post Interface */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-soft space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">N</div>
            <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Share a realization, Nitai...</div>
          </div>
          <div className="flex gap-4 border-t border-slate-50 pt-6">
            <Button variant="ghost" size="sm" className="rounded-xl text-slate-500 hover:text-primary">
              <MessageSquare className="w-4 h-4 mr-2" /> Question
            </Button>
            <Button variant="ghost" size="sm" className="rounded-xl text-slate-500 hover:text-primary">
              <Sparkles className="w-4 h-4 mr-2" /> Realization
            </Button>
            <Button className="ml-auto rounded-xl bg-slate-900 text-white px-8">Post</Button>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.id} className={cn(
              "bg-white p-10 rounded-[3rem] border border-slate-100 shadow-soft space-y-6 transition-all hover:border-primary/10",
              post.isPinned && "border-primary/20 bg-primary/[0.01]"
            )}>
              <header className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 font-bold overflow-hidden">
                    <div className={`w-full h-full bg-[url('https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author.name}')] bg-cover`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{post.author.name}</span>
                      {post.author.role === 'MENTOR' && (
                        <div className="flex items-center gap-1 px-2 py-0.5 bg-primary/10 rounded-full text-[8px] font-bold text-primary uppercase tracking-widest">
                          <ShieldCheck className="w-2 h-2" /> Mentor
                        </div>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{post.timestamp}</div>
                  </div>
                </div>
                <button className="p-2 text-slate-300 hover:text-slate-600"><MoreVertical className="w-4 h-4" /></button>
              </header>

              <div className="space-y-4">
                <p className="text-lg text-slate-700 leading-relaxed font-serif italic">
                  "{post.content}"
                </p>
                <Badge variant="outline" className="rounded-lg text-[8px] uppercase tracking-widest font-bold border-slate-100 text-slate-400">
                  <Hash className="w-3 h-3 mr-1" /> {post.category}
                </Badge>
              </div>

              <footer className="flex items-center gap-8 pt-6 border-t border-slate-50">
                <button className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-primary transition-colors">
                  <Heart className="w-4 h-4" /> {post.likes}
                </button>
                <button className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-primary transition-colors">
                  <MessageSquare className="w-4 h-4" /> {post.replies} Replies
                </button>
                <button className="ml-auto text-slate-300 hover:text-primary transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </footer>
            </article>
          ))}
        </div>
      </main>

      {/* Sidebar: Circles & Groups */}
      <aside className="space-y-10">
        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Community Circles</h2>
            <button className="text-primary"><PlusCircle className="w-4 h-4" /></button>
          </div>
          <div className="space-y-4">
            {groups.map((group) => (
              <div key={group.id} className="p-6 bg-white rounded-[2rem] border border-slate-100 shadow-soft hover:border-primary/20 transition-all cursor-pointer group">
                <div className="flex items-center gap-4 mb-4">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center",
                    group.type === 'REGIONAL' ? 'bg-blue-50 text-blue-500' : 
                    group.type === 'MENTOR_CIRCLE' ? 'bg-primary/5 text-primary' : 'bg-orange-50 text-orange-500'
                  )}>
                    {group.type === 'REGIONAL' ? <MapPin className="w-5 h-5" /> : 
                     group.type === 'MENTOR_CIRCLE' ? <ShieldCheck className="w-5 h-5" /> : <Users className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{group.name}</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{group.members} Members</div>
                  </div>
                </div>
                <p className="text-[10px] text-slate-500 italic line-clamp-2 mb-4 group-hover:text-slate-900">"{group.description}"</p>
                <div className="text-[10px] font-bold text-primary flex items-center gap-2 uppercase tracking-widest">
                  Enter Circle <Compass className="w-3 h-3 group-hover:rotate-45 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Guidelines Context */}
        <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white space-y-4 relative overflow-hidden">
          <div className="relative z-10">
            <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Dharma Council</div>
            <h4 className="text-sm font-bold">Sangha Rules</h4>
            <p className="text-[10px] text-slate-400 leading-relaxed mt-2 italic">"Speak truth that is pleasing. Do not speak truth that is harsh. Do not speak pleasant lies."</p>
          </div>
          <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-primary/10 rounded-full blur-2xl" />
        </div>
      </aside>

    </div>
  )
}
