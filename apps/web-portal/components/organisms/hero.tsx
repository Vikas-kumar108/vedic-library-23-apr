import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20 bg-gradient-to-br from-white via-white to-orange-50/50">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Text */}
        <div className="relative z-10 space-y-8 animate-fade-up">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]">
            Learn, Reflect, and Apply <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">Timeless Vedic Wisdom</span>
          </h1>

          <p className="text-xl text-slate-600 max-w-xl leading-relaxed">
            Structured courses and guided insights designed for real life. Map your nature to Shastra and grow with every lesson.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button asChild size="lg" className="h-14 px-8 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white text-lg font-bold shadow-xl shadow-orange-600/20 transition-all hover:scale-105 active:scale-95 group">
              <Link href="/onboarding" className="flex items-center gap-2">
                Start Learning
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 px-8 rounded-2xl border-2 border-slate-200 hover:bg-slate-50 text-slate-700 text-lg font-bold transition-all hover:scale-105 active:scale-95">
              <Link href="/explore">
                Explore Content
              </Link>
            </Button>
          </div>
        </div>

        {/* Right Side: Illustration */}
        <div className="relative flex justify-center items-center lg:justify-end animate-fade-in delay-500">
          <div className="relative w-full max-w-[500px] aspect-square">
            {/* Decorative Orbs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-200/30 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100/30 rounded-full blur-[80px]" />
            
            <Image 
              src="/Users/ppublications/.gemini/antigravity/brain/c640721a-79fa-4afc-be62-a444bf689aab/vedic_meditation_illustration_1776913888733.png"
              alt="Vedic Student Meditation"
              fill
              className="object-contain relative z-10"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
