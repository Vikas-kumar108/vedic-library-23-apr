'use client'

import { BookOpen, Compass, Heart, Link2, GraduationCap, Users, Play, MessageCircle } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Course, GuidanceTopic, SevaDomain } from '@/lib/types'

interface ApplicationPanelProps {
  relatedVerses?: string[]
  courses?: Course[]
  guidance?: GuidanceTopic[]
  sevaDomains?: SevaDomain[]
  className?: string
}

function RecitationSection() {
  return (
    <Card className="border-border/50 shadow-sm bg-card overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2 text-foreground">
          <Play className="w-4 h-4 text-primary" />
          Recitation / Discourse
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {/* Video Placeholder */}
        <div className="relative rounded-lg overflow-hidden bg-secondary/50 aspect-video mb-3">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center cursor-pointer hover:bg-red-600 transition-colors">
              <Play className="w-6 h-6 text-white ml-1" fill="white" />
            </div>
          </div>
          <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
            2.47
          </div>
        </div>
        
        {/* Ask a Question */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Ask a Question
            </span>
            <Button size="sm" variant="default" className="h-7 text-xs">
              Save
            </Button>
          </div>
          <textarea 
            placeholder="Type your question about this verse..."
            className="w-full p-2 text-sm border border-border rounded-lg bg-background resize-none h-20 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </CardContent>
    </Card>
  )
}

function RelatedVersesSection({ verses }: { verses: string[] }) {
  if (!verses || verses.length === 0) return null
  
  return (
    <Card className="border-border/50 shadow-sm bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2 text-foreground">
          <Link2 className="w-4 h-4" style={{ color: 'var(--knowledge-blue)' }} />
          Related Verses
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-2">
          {verses.map((verse) => (
            <Button
              key={verse}
              variant="outline"
              size="sm"
              className="h-7 text-xs bg-secondary/50 border-border/50 hover:bg-accent hover:border-primary/30"
            >
              {verse.replace('bg-', 'BG ')}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function CoursesSection({ courses }: { courses: Course[] }) {
  if (!courses || courses.length === 0) return null
  
  const levelStyles = {
    beginner: { backgroundColor: 'rgba(91, 138, 114, 0.1)', color: '#5B8A72', borderColor: 'rgba(91, 138, 114, 0.2)' },
    intermediate: { backgroundColor: 'rgba(58, 110, 165, 0.1)', color: '#3A6EA5', borderColor: 'rgba(58, 110, 165, 0.2)' },
    advanced: { backgroundColor: 'rgba(198, 146, 58, 0.1)', color: '#C6923A', borderColor: 'rgba(198, 146, 58, 0.2)' }
  }
  
  return (
    <Card className="border-border/50 shadow-sm bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2 text-foreground">
          <GraduationCap className="w-4 h-4 text-primary" />
          Courses
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        {courses.map((course) => (
          <div
            key={course.id}
            className="p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between gap-2 mb-1">
              <h4 className="text-sm font-medium text-foreground leading-tight">
                {course.title}
              </h4>
              <Badge
                variant="outline"
                className="text-xs shrink-0"
                style={levelStyles[course.level]}
              >
                {course.level}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {course.description}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-muted-foreground">
                {course.verseCount} verses
              </span>
              <span className="text-muted-foreground">·</span>
              <div className="flex gap-1">
                {course.ageGroups.map((age) => (
                  <Badge key={age} variant="secondary" className="text-xs py-0 h-5">
                    {age}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function GuidanceSection({ topics }: { topics: GuidanceTopic[] }) {
  if (!topics || topics.length === 0) return null
  
  return (
    <Card className="border-border/50 shadow-sm bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2 text-foreground">
          <Compass className="w-4 h-4" style={{ color: 'var(--dharma-green)' }} />
          Life Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 space-y-2">
        {topics.map((topic) => (
          <div
            key={topic.id}
            className="flex items-center gap-3 p-2.5 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(91, 138, 114, 0.1)' }}>
              <Heart className="w-4 h-4" style={{ color: 'var(--dharma-green)' }} />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-medium text-foreground truncate">
                {topic.title}
              </h4>
              <p className="text-xs text-muted-foreground">
                {topic.category}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function SevaDomainSection({ domains }: { domains: SevaDomain[] }) {
  if (!domains || domains.length === 0) return null
  
  return (
    <Card className="border-border/50 shadow-sm bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2 text-foreground">
          <Users className="w-4 h-4 text-primary" />
          Sevā Domains
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-2">
          {domains.map((domain) => (
            <div
              key={domain.id}
              className="p-3 rounded-xl bg-accent/30 hover:bg-accent/50 transition-colors cursor-pointer text-center"
            >
              <div className="font-serif text-lg text-primary mb-0.5">
                {domain.sanskrit}
              </div>
              <div className="text-xs text-foreground font-medium">
                {domain.english}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function EmptyPanel() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
        <BookOpen className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-sm font-medium text-foreground mb-1">
        Application Context
      </h3>
      <p className="text-xs text-muted-foreground max-w-[200px]">
        Select a verse to see related courses, guidance, and seva domains.
      </p>
    </div>
  )
}

export function ApplicationPanel({
  relatedVerses,
  courses,
  guidance,
  sevaDomains,
  className
}: ApplicationPanelProps) {
  // Always show the panel with at least the recitation section
  
  return (
    <ScrollArea className={cn("h-full", className)}>
      <div className="p-4 space-y-4">
        <div className="px-1 mb-2">
          <h2 className="text-sm font-semibold text-foreground">Apply Knowledge</h2>
          <p className="text-xs text-muted-foreground">Connect learning to life</p>
        </div>
        
        <RecitationSection />
        
        {relatedVerses && relatedVerses.length > 0 && (
          <RelatedVersesSection verses={relatedVerses} />
        )}
        
        {courses && courses.length > 0 && (
          <CoursesSection courses={courses} />
        )}
        
        {guidance && guidance.length > 0 && (
          <GuidanceSection topics={guidance} />
        )}
        
        {sevaDomains && sevaDomains.length > 0 && (
          <SevaDomainSection domains={sevaDomains} />
        )}
      </div>
    </ScrollArea>
  )
}
