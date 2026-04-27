"use client"
import React from 'react'
import Link from 'next/link'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useSadhana } from '@/features/practice/hooks/useSadhana'
import { useRecommendations } from '@/hooks/use-recommendations'
import { SeekerHeader } from '@/components/seeker/SeekerHeader'
import { Button } from '@/components/atoms/button'
import { Sparkles, ArrowRight, BookOpen, Search } from 'lucide-react'

export default function DashboardPage() {
  const { user, isLoading: authLoading, checkAuth } = useAuth()
  const { stats, isLoading: sadhanaLoading } = useSadhana()
  
  // Fetch more to ensure we have enough supporting ones
  const { recommendations, isLoading: recsLoading, refresh } = useRecommendations(user?.spiritual_profile?.eligibility_level || 1)

  // 🚀 PATH CONTINUITY: Refresh state on mount to ensure progress is reflected immediately
  React.useEffect(() => {
    checkAuth()
    refresh()
  }, [])

  const primaryGuide = recommendations.find(r => r.category === 'PRIMARY_GUIDE') || recommendations[0];
  const supportingRecs = recommendations
    .filter(r => r.node?.id !== primaryGuide?.node?.id)
    .slice(0, 3);

  if (authLoading) return <div className="p-12 animate-pulse text-primary font-serif italic text-2xl font-bold text-center">Entering the Sanctuary...</div>

  return (
    <div className="max-w-5xl mx-auto space-y-20 pb-24 animate-in fade-in duration-1000 text-center">
      
      {/* 1. Minimal Shastric Header */}
      <SeekerHeader user={user} stats={stats} />

      {/* 2. THE PRIMARY PATH: Your Next Step */}
      <section className="space-y-10">
        <div className="space-y-2">
          <div className="text-[10px] font-black text-primary uppercase tracking-[0.3em] animate-pulse">✨ Your Next Step</div>
          <h2 className="text-3xl font-serif font-bold text-slate-900 italic">Continue the Journey</h2>
        </div>

        {recsLoading ? (
          <div className="h-96 bg-slate-50 rounded-[4rem] border border-dashed border-slate-200 animate-pulse flex items-center justify-center text-slate-300 font-serif italic text-xl">
             Consulting the Shastras...
          </div>
        ) : primaryGuide ? (
          <div className="max-w-3xl mx-auto group bg-white border border-slate-100 rounded-[4rem] p-16 shadow-2xl shadow-slate-200/50 hover:shadow-primary/5 transition-all duration-1000 relative overflow-hidden text-left">
            <div className="relative z-10 space-y-8">
               <div className="space-y-4">
                 <div className="text-[10px] font-black text-primary/40 uppercase tracking-widest">{primaryGuide.node?.shastra || 'Ancient Wisdom'}</div>
                 <h3 className="text-5xl font-serif font-bold text-slate-900 leading-tight italic">
                   {primaryGuide.node?.title}
                 </h3>
                 <p className="text-lg text-slate-500 leading-relaxed max-w-xl italic">
                   "{primaryGuide.node?.snippet}"
                 </p>
                 <div className="pt-4 flex items-center gap-3 text-xs text-primary font-bold italic">
                   <Sparkles className="size-4" /> {primaryGuide.reason}
                 </div>
               </div>
               
               <Button asChild size="lg" className="h-16 px-12 rounded-2xl bg-slate-900 text-white font-bold shadow-xl shadow-slate-900/20 hover:bg-primary transition-all group/btn">
                 <Link href={`/library/guide/${primaryGuide.node?.slug || primaryGuide.node?.id}`} className="flex items-center gap-3">
                   Enter Text <ArrowRight className="size-5 group-hover:translate-x-2 transition-transform" />
                 </Link>
               </Button>
            </div>
            
            <div className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-1000">
               <BookOpen className="size-80" />
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto bg-slate-50 border border-slate-100 rounded-[4rem] p-16 flex flex-col items-center justify-center space-y-8">
            <div className="size-20 bg-primary/10 rounded-full flex items-center justify-center text-primary animate-pulse">
               <Sparkles className="size-10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-serif font-bold text-slate-900 italic">Your next step is being prepared.</h3>
              <p className="text-slate-500 max-w-sm mx-auto">The Gurukulam is aligning your path with the eternal wisdom. Return momentarily for your next realization.</p>
            </div>
            <Button asChild variant="outline" className="rounded-2xl h-14 px-10 font-bold border-slate-200">
              <Link href="/library/research">Explore Foundational Shastra</Link>
            </Button>
          </div>
        )}
      </section>

      {/* 3. SUPPORTING INSIGHTS: Subtle alternatives */}
      {supportingRecs.length > 0 && (
        <section className="space-y-12 pt-10 border-t border-slate-50">
           <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Supporting Insights</div>
           
           <div className="grid md:grid-cols-3 gap-8">
             {supportingRecs.map((rec, i) => (
               <Link 
                 key={i} 
                 href={`/library/guide/${rec.node?.slug || rec.node?.id}`}
                 className="group p-8 bg-white border border-slate-100 rounded-[2.5rem] text-left hover:shadow-xl transition-all duration-500 flex flex-col justify-between h-full"
               >
                 <div className="space-y-4">
                   <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{rec.node?.shastra}</div>
                   <h4 className="text-xl font-serif font-bold text-slate-900 group-hover:text-primary transition-colors leading-tight">
                     {rec.node?.title}
                   </h4>
                 </div>
                 <div className="pt-6 flex items-center justify-between text-slate-200 group-hover:text-primary transition-colors">
                    <span className="text-[10px] font-bold uppercase tracking-widest">{rec.category}</span>
                    <ArrowRight className="size-4" />
                 </div>
               </Link>
             ))}
           </div>
        </section>
      )}

      {/* 4. ADVANCED ACCESS: For Scholars & Researchers */}
      <section className="pt-20 border-t border-slate-50 flex flex-col items-center gap-6">
        <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Advanced Study</div>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild variant="ghost" className="rounded-2xl h-14 px-8 text-slate-400 hover:text-primary hover:bg-primary/5 group">
            <Link href="/library/research" className="flex items-center gap-3">
              <Search className="size-4 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest">Research Workbench</span>
            </Link>
          </Button>
          <Button asChild variant="ghost" className="rounded-2xl h-14 px-8 text-slate-400 hover:text-orange-500 hover:bg-orange-50 group">
            <Link href="/library" className="flex items-center gap-3">
              <BookOpen className="size-4 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest">Full Library</span>
            </Link>
          </Button>
        </div>
      </section>

      {/* 5. MEDITATIVE FOOTER */}
      <footer className="pt-10 opacity-30 italic text-slate-400 font-serif text-sm">
        "One step at a time, the seeker reaches the infinite."
      </footer>

    </div>
  )
}
