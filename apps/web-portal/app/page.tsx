'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BookOpen, GraduationCap, Users, Heart, ArrowRight } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative py-20 px-4 overflow-hidden bg-gradient-to-b from-[var(--saffron-light)]/20 to-background">
        <div className="max-w-6xl mx-auto text-center space-y-8 relative z-10">
          <h1 className="text-5xl md:text-7xl font-serif tracking-tight text-foreground">
            Vedic Skills Platform
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
            The foundational OS for your spiritual and practical life. 
            Explore unlimited teachings tailored to every walk of life.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button asChild size="lg" className="rounded-full px-8 h-14 text-lg bg-[var(--knowledge-blue)] hover:bg-[var(--knowledge-blue)]/90 shadow-xl shadow-blue-500/20 transition-all hover:scale-105">
              <Link href="/auth/signup">
                Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 h-14 text-lg border-border/50 hover:bg-secondary/50">
              <Link href="/library">
                Explore the Library
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500 rounded-full blur-[120px]" />
        </div>
      </header>

      {/* Pillars Section */}
      <section className="py-24 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-16">The Four Pillars of Wisdom</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            icon={BookOpen} 
            title="Library" 
            description="The 'NIKHIL Knowledge OS' — a massive, structured repository of Vedic texts."
            color="text-orange-600"
            bgColor="bg-orange-50"
          />
          <FeatureCard 
            icon={GraduationCap} 
            title="Education" 
            description="Personalized Learning Curves that guide you through the library based on your life stage."
            color="text-blue-600"
            bgColor="bg-blue-50"
          />
          <FeatureCard 
            icon={Users} 
            title="Guidance" 
            description="Connect with mentors and Gurus to resolve doubts and receive personalized instruction."
            color="text-purple-600"
            bgColor="bg-purple-50"
          />
          <FeatureCard 
            icon={Heart} 
            title="Community" 
            description="Gamified outreach and service coordination, translating knowledge into action."
            color="text-red-600"
            bgColor="bg-red-50"
          />
        </div>
      </section>

      {/* Exploration Section */}
      <section className="bg-secondary/30 py-24 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-serif">Something for Everyone</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Whether you are a student (Brahmacharya), a householder (Grihastha), or a scholar, 
            the platform adapts to your individual needs. Share your situation, and let the 
            Shastras illuminate your path.
          </p>
          <div className="pt-8">
            <Button asChild variant="link" className="text-primary text-lg">
              <Link href="/auth/signup">Join 1,000+ scholars today →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50 text-center text-muted-foreground text-sm">
        <p>© 2026 Vedic Skills Platform. Built for the modern seeker.</p>
      </footer>
    </div>
  )
}

function FeatureCard({ icon: Icon, title, description, color, bgColor }: any) {
  return (
    <div className="p-8 rounded-3xl border border-border/50 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all group bg-card">
      <div className={`w-12 h-12 ${bgColor} ${color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  )
}
