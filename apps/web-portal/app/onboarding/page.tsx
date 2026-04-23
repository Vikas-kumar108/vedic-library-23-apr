'use client'

import React, { useState } from 'react'
import { 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  Heart, 
  ShieldCheck, 
  Sun, 
  Map,
  Compass,
  Zap
} from 'lucide-react'
import { Button } from '@/components/index'
import { cn } from '@/lib/utils'
import Link from 'next/link'

/**
 * Onboarding Flow
 * Responsibility: Capture user context (Life Stage, Goals, Interests) for personalization.
 * Purpose: Transition a new user into a guided, purposeful journey.
 */
export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [selections, setSelections] = useState({
    stage: '',
    interests: [] as string[],
    goal: ''
  })

  const stages = [
    { id: 'BRAHMACARYA', label: 'Student / Celibacy', icon: '🌱' },
    { id: 'GRIHASTHA', label: 'Householder / Family', icon: '🏠' },
    { id: 'VANAPRASTHA', label: 'Retirement / Forest', icon: '🌲' },
    { id: 'SANNYASA', label: 'Renunciation / Monk', icon: '📿' },
  ]

  const interests = [
    'Philosophy', 'Meditation', 'Leadership', 'Psychology', 
    'Family Harmony', 'Health & Diet', 'Sanskrit', 'History'
  ]

  const nextStep = () => setStep(prev => prev + 1)

  return (
    <div className="min-h-screen bg-[#F8F7F4] flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full space-y-12 animate-fade-in">
        
        {/* Progress Dots */}
        <div className="flex justify-center gap-3">
          {[1, 2, 3].map(i => (
            <div key={i} className={cn(
              "w-2 h-2 rounded-full transition-all duration-500",
              step === i ? "bg-primary w-8" : "bg-slate-200"
            )} />
          ))}
        </div>

        {/* Step 1: Life Stage (Personalization Foundation) */}
        {step === 1 && (
          <div className="space-y-10 text-center animate-in fade-in zoom-in duration-700">
            <header className="space-y-4">
              <h1 className="text-4xl font-serif font-bold text-slate-900">Your Current Path</h1>
              <p className="text-slate-500 italic">Vedic wisdom is applied differently at every stage of life. Where do you stand today?</p>
            </header>
            <div className="grid grid-cols-2 gap-6">
              {stages.map(s => (
                <button
                  key={s.id}
                  onClick={() => { setSelections({...selections, stage: s.id}); nextStep(); }}
                  className={cn(
                    "p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-soft hover-lift group text-left",
                    selections.stage === s.id && "border-primary ring-4 ring-primary/5 bg-primary/5"
                  )}
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{s.icon}</div>
                  <div className="font-bold text-slate-900">{s.label}</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Stage {stages.indexOf(s) + 1}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Interests (Content Mapping) */}
        {step === 2 && (
          <div className="space-y-10 text-center animate-in fade-in slide-in-from-right duration-700">
            <header className="space-y-4">
              <h1 className="text-4xl font-serif font-bold text-slate-900">What stirs your heart?</h1>
              <p className="text-slate-500 italic">Choose the topics you wish to explore deeply.</p>
            </header>
            <div className="flex flex-wrap justify-center gap-3">
              {interests.map(interest => {
                const isSelected = selections.interests.includes(interest)
                return (
                  <button
                    key={interest}
                    onClick={() => {
                      const newInterests = isSelected 
                        ? selections.interests.filter(i => i !== interest)
                        : [...selections.interests, interest]
                      setSelections({...selections, interests: newInterests})
                    }}
                    className={cn(
                      "px-8 py-4 rounded-full text-sm font-bold border transition-all",
                      isSelected 
                        ? "bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-900/20" 
                        : "bg-white border-slate-100 text-slate-500 hover:border-primary"
                    )}
                  >
                    {interest}
                  </button>
                )
              })}
            </div>
            <div className="pt-8">
              <Button size="lg" className="h-16 px-12 rounded-2xl" onClick={nextStep} disabled={selections.interests.length === 0}>
                Continue the Journey <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Goals (Motivation) */}
        {step === 3 && (
          <div className="space-y-10 text-center animate-in fade-in slide-in-from-bottom duration-700">
            <header className="space-y-4">
              <h1 className="text-4xl font-serif font-bold text-slate-900">Your Sankalpa</h1>
              <p className="text-slate-500 italic">What is your primary goal for this study?</p>
            </header>
            <div className="space-y-4">
              {[
                { id: 'PEACE', label: 'Mental Peace & Balance', icon: <Sun className="w-5 h-5" /> },
                { id: 'DHARMA', label: 'Discovering My Purpose', icon: <Compass className="w-5 h-5" /> },
                { id: 'DEVOTION', label: 'Connecting with the Divine', icon: <Heart className="w-5 h-5" /> },
                { id: 'LEADERSHIP', label: 'Leading with Integrity', icon: <Map className="w-5 h-5" /> }
              ].map(goal => (
                <button
                  key={goal.id}
                  onClick={() => { setSelections({...selections, goal: goal.id}); }}
                  className={cn(
                    "w-full p-6 bg-white rounded-3xl border border-slate-100 shadow-soft flex items-center justify-between hover-lift text-left group",
                    selections.goal === goal.id && "border-primary bg-primary/5 ring-4 ring-primary/5"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-colors", selections.goal === goal.id ? "bg-primary text-white" : "bg-slate-50 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary")}>
                      {goal.icon}
                    </div>
                    <span className="font-bold text-slate-900">{goal.label}</span>
                  </div>
                  {selections.goal === goal.id && <Zap className="w-5 h-5 text-primary animate-pulse" />}
                </button>
              ))}
            </div>
            <div className="pt-8">
              <Button asChild size="lg" className="h-16 px-16 rounded-2xl shadow-2xl shadow-primary/20" disabled={!selections.goal}>
                <Link href="/dashboard">Enter the Gurukulam</Link>
              </Button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
