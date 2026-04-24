"use client"

import React from 'react'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useCourses } from '@/features/courses/hooks/useCourses'
import { useSadhana } from '@/features/practice/hooks/useSadhana'
import { FinancialTransparency } from '@/components/organisms/crm/financial-transparency'
import { MemberJourney } from '@/components/organisms/crm/member-journey'
import { ActivityFeed } from '@/components/organisms/crm/activity-feed'
import { useRecommendations } from '@/hooks/use-recommendations'
import { SeekerHeader } from '@/components/seeker/SeekerHeader'
import { WisdomRecommendation } from '@/components/seeker/WisdomRecommendation'
import { SanghaSessions } from '@/components/seeker/SanghaSessions'

// The new Fabulous Components
import { ContinueLearningCard } from '@/components/seeker/ContinueLearningCard'
import { ProgressSummary } from '@/components/seeker/ProgressSummary'
import { DailyReflection } from '@/components/seeker/DailyReflection'

export default function DashboardPage() {
  const { user, isLoading: authLoading } = useAuth()
  const { courses, isLoading: coursesLoading } = useCourses()
  const { stats, isLoading: sadhanaLoading } = useSadhana()
  const { recommendations, isLoading: recsLoading } = useRecommendations(3)

  if (authLoading) return <div className="p-12 animate-pulse text-[#e67e22] font-serif italic text-2xl font-bold">Entering the Gurukulam...</div>

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20 animate-in fade-in duration-700">
      
      {/* 1. Modular Seeker Header */}
      <SeekerHeader user={user} stats={stats} />

      {/* 2. Sovereign Progress Summary */}
      <section>
        <ProgressSummary 
          lessonsCompleted={stats?.lessonsCompleted || 12}
          notesWritten={stats?.notesWritten || 28}
          currentStreak={stats?.currentStreak || 7}
        />
      </section>

      <div className="grid xl:grid-cols-[1fr_400px] gap-12">
        
        {/* LEFT: THE JOURNEY (Learning + Discovery) */}
        <div className="space-y-12">
          
          {/* 3. Continue Learning Corridor */}
          <section>
             <h2 className="text-2xl font-serif font-bold italic text-slate-900 mb-6 flex items-center gap-4">
                Your Ascent
                <div className="h-px flex-1 bg-slate-100" />
             </h2>
             <ContinueLearningCard 
               courseTitle="The Path of Dharma: Living with Purpose"
               lessonTitle="Understanding Right Action"
               progress={45}
             />
          </section>

          {/* 4. Contemplation Corridor */}
          <section>
             <h2 className="text-2xl font-serif font-bold italic text-slate-900 mb-6 flex items-center gap-4">
                Realizations
                <div className="h-px flex-1 bg-slate-100" />
             </h2>
             <DailyReflection />
          </section>

          {/* 5. Institutional Transparency (Dynamic based on role) */}
          <section className="space-y-6 pt-10">
             <h2 className="text-2xl font-serif font-bold italic text-slate-900 mb-6 flex items-center gap-4">
                Institutional Transparency
                <div className="h-px flex-1 bg-slate-100" />
             </h2>
            {user?.roles?.includes('donor') ? (
               <FinancialTransparency contributions={user.contributions || []} />
            ) : (
               <MemberJourney member={user} />
            )}
          </section>

          {/* 6. Modular Wisdom Recommendation */}
          <section className="pt-10">
            <h2 className="text-2xl font-serif font-bold italic text-slate-900 mb-6 flex items-center gap-4">
               Wisdom Prescriptions
               <div className="h-px flex-1 bg-slate-100" />
            </h2>
            <WisdomRecommendation 
              recommendations={recommendations} 
              loading={recsLoading} 
              userStage={user?.stage || 'Sadhaka'} 
            />
          </section>
        </div>

        {/* RIGHT: THE PRACTICE (Sangha + Activity) */}
        <aside className="space-y-12">
          {/* 7. Live From The Field (Social Transparency) */}
          <section>
             <h2 className="text-2xl font-serif font-bold italic text-slate-900 mb-6">Activity Feed</h2>
             <ActivityFeed />
          </section>

          {/* 8. Modular Sangha Sessions */}
          <section>
             <h2 className="text-2xl font-serif font-bold italic text-slate-900 mb-6">Live Sangha</h2>
             <SanghaSessions />
          </section>
        </aside>
      </div>
    </div>
  )
}
