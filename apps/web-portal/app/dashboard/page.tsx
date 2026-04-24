'use client'

import React from 'react'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useCourses } from '@/features/courses/hooks/useCourses'
import { useSadhana } from '@/features/practice/hooks/useSadhana'
import { FinancialTransparency } from '@/components/organisms/crm/financial-transparency'
import { MemberJourney } from '@/components/organisms/crm/member-journey'
import { ActivityFeed } from '@/components/organisms/crm/activity-feed'
import { useRecommendations } from '@/hooks/use-recommendations'
import { SeekerHeader } from '@/components/seeker/SeekerHeader'
import { CourseProgression } from '@/components/seeker/CourseProgression'
import { WisdomRecommendation } from '@/components/seeker/WisdomRecommendation'
import { SadhanaTracker } from '@/components/seeker/SadhanaTracker'
import { SanghaSessions } from '@/components/seeker/SanghaSessions'

export default function DashboardPage() {
  const { user, isLoading: authLoading } = useAuth()
  const { courses, isLoading: coursesLoading } = useCourses()
  const { stats, isLoading: sadhanaLoading } = useSadhana()
  const { recommendations, isLoading: recsLoading } = useRecommendations(3)

  if (authLoading) return <div className="p-12 animate-pulse text-slate-400 font-serif italic text-xl">Entering the Gurukulam...</div>

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-fade-in">
      
      {/* 1. Modular Seeker Header */}
      <SeekerHeader user={user} stats={stats} />

      <div className="grid lg:grid-cols-[1fr_400px] gap-10">
        
        {/* LEFT: THE JOURNEY (Learning + Discovery) */}
        <div className="space-y-12">
          
          {/* 2. DYNAMIC CONTENT BASED ON ROLE */}
          {user?.roles?.includes('donor') ? (
            <section className="space-y-6">
               <FinancialTransparency contributions={user.contributions || []} />
            </section>
          ) : (
            <section className="space-y-6">
               <MemberJourney member={user} />
            </section>
          )}

          {/* 3. LIVE FROM THE FIELD (Social Transparency) */}
          <section className="space-y-6">
             <ActivityFeed />
          </section>

          {/* 4. Modular Course Progression */}
          <CourseProgression courses={courses} />

          {/* 5. Modular Wisdom Recommendation */}
          <WisdomRecommendation 
            recommendations={recommendations} 
            loading={recsLoading} 
            userStage={user?.stage || 'Sadhaka'} 
          />
        </div>

        {/* RIGHT: THE PRACTICE (Sadhana + Community) */}
        <aside className="space-y-10">
          {/* 6. Modular Sadhana Tracker */}
          <SadhanaTracker />

          {/* 7. Modular Sangha Sessions */}
          <SanghaSessions />
        </aside>
      </div>
    </div>
  )
}
