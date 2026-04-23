'use client'

import React, { useState, useEffect } from 'react'
import {
  ArrowRight, ArrowLeft, CheckCircle2, Sparkles,
  BookOpen, Heart, Sun, Map, Compass, Zap, Trophy, Star
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

// ─── Types ───────────────────────────────────────────────
type Selections = {
  name: string
  stage: string
  interests: string[]
  goal: string
}

// ─── Data ────────────────────────────────────────────────
const STAGES = [
  { id: 'BRAHMACARYA', emoji: '🌱', label: 'Student', sub: 'Learning, Celibacy, Foundation' },
  { id: 'GRIHASTHA',   emoji: '🏠', label: 'Householder', sub: 'Family, Work, Responsibility' },
  { id: 'VANAPRASTHA', emoji: '🌲', label: 'Retiring', sub: 'Reflection, Detachment, Service' },
  { id: 'SANNYASA',    emoji: '📿', label: 'Renunciant', sub: 'Full surrender to the Divine' },
]

const INTERESTS = [
  { id: 'philosophy',    label: 'Philosophy',       emoji: '🧠' },
  { id: 'meditation',   label: 'Meditation',        emoji: '🧘' },
  { id: 'leadership',   label: 'Leadership',        emoji: '🏆' },
  { id: 'family',       label: 'Family Harmony',    emoji: '👨‍👩‍👧' },
  { id: 'psychology',   label: 'Psychology',        emoji: '💭' },
  { id: 'health',       label: 'Health & Diet',     emoji: '🌿' },
  { id: 'sanskrit',     label: 'Sanskrit',          emoji: '🕉️' },
  { id: 'history',      label: 'History & Culture', emoji: '📜' },
]

const GOALS = [
  { id: 'PEACE',      label: 'Mental Peace & Balance',     icon: Sun,     color: 'text-amber-500 bg-amber-50' },
  { id: 'DHARMA',     label: 'Discovering My Purpose',     icon: Compass, color: 'text-blue-500 bg-blue-50' },
  { id: 'DEVOTION',   label: 'Connecting with the Divine', icon: Heart,   color: 'text-rose-500 bg-rose-50' },
  { id: 'LEADERSHIP', label: 'Leading with Integrity',     icon: Map,     color: 'text-emerald-500 bg-emerald-50' },
]

// The "First Success Moment" verse — personalized per goal
const VERSE_BY_GOAL: Record<string, { ref: string; sanskrit: string; translation: string; insight: string }> = {
  PEACE: {
    ref: 'Bhagavad Gītā 2.47',
    sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।',
    translation: 'You have a right to perform your duties, but not to the fruits of your actions.',
    insight: 'Release attachment to outcomes. This is the source of all peace.'
  },
  DHARMA: {
    ref: 'Bhagavad Gītā 18.47',
    sanskrit: 'श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात्।',
    translation: 'It is better to perform one\'s own duty imperfectly than another\'s duty perfectly.',
    insight: 'Your unique dharma is the path to your highest contribution.'
  },
  DEVOTION: {
    ref: 'Bhagavad Gītā 9.22',
    sanskrit: 'अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते।',
    translation: 'For those who worship Me with devotion, I carry what they lack and preserve what they have.',
    insight: 'In surrender to the Divine, there is perfect security.'
  },
  LEADERSHIP: {
    ref: 'Bhagavad Gītā 3.21',
    sanskrit: 'यद्यदाचरति श्रेष्ठस्तत्तदेवेतरो जनः।',
    translation: 'Whatever a great person does, common people follow. Whatever standard they set, the world pursues.',
    insight: 'True leadership is example-setting, not authority-wielding.'
  },
}

// ─── Steps Components ─────────────────────────────────────

function StepName({ sel, setSel, onNext }: { sel: Selections; setSel: React.Dispatch<React.SetStateAction<Selections>>; onNext: () => void }) {
  const valid = sel.name.trim().length >= 2

  return (
    <div className="space-y-10 text-center animate-in fade-in zoom-in duration-600">
      <header className="space-y-3">
        <div className="text-5xl animate-bounce-once">🙏</div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">Welcome, seeker.</h1>
        <p className="text-slate-500 italic font-serif max-w-md mx-auto">Before we begin, how shall we call you on this journey?</p>
      </header>
      <div className="max-w-sm mx-auto space-y-4">
        <input
          type="text"
          autoFocus
          value={sel.name}
          onChange={e => setSel(s => ({ ...s, name: e.target.value }))}
          placeholder="Your name..."
          onKeyDown={e => e.key === 'Enter' && valid && onNext()}
          className="w-full h-16 text-2xl font-serif text-center border-0 border-b-2 border-slate-200 bg-transparent outline-none focus:border-primary transition-colors placeholder:text-slate-200"
        />
        <button
          onClick={onNext}
          disabled={!valid}
          className={cn(
            "w-full h-14 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all",
            valid
              ? "bg-primary text-white shadow-xl shadow-primary/25 hover:scale-105 active:scale-95"
              : "bg-slate-100 text-slate-300 cursor-not-allowed"
          )}
        >
          Continue <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

function StepStage({ sel, setSel, onNext }: { sel: Selections; setSel: React.Dispatch<React.SetStateAction<Selections>>; onNext: () => void }) {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right duration-500">
      <header className="text-center space-y-3">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
          Where are you in life, <span className="text-primary italic">{sel.name}?</span>
        </h1>
        <p className="text-slate-500 italic font-serif">Vedic wisdom is applied differently at each life stage.</p>
      </header>
      <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto">
        {STAGES.map(s => (
          <button
            key={s.id}
            onClick={() => { setSel(p => ({ ...p, stage: s.id })); onNext() }}
            className={cn(
              "p-8 bg-white rounded-[2rem] border-2 text-left transition-all hover:scale-[1.02] hover:shadow-xl group",
              sel.stage === s.id
                ? "border-primary ring-4 ring-primary/10 bg-primary/5"
                : "border-slate-100 hover:border-primary/40"
            )}
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{s.emoji}</div>
            <div className="font-bold text-slate-900 text-base">{s.label}</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 leading-relaxed">{s.sub}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

function StepInterests({ sel, setSel, onNext }: { sel: Selections; setSel: React.Dispatch<React.SetStateAction<Selections>>; onNext: () => void }) {
  const toggle = (id: string) =>
    setSel(p => ({
      ...p,
      interests: p.interests.includes(id) ? p.interests.filter(i => i !== id) : [...p.interests, id]
    }))
  const valid = sel.interests.length >= 2

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right duration-500">
      <header className="text-center space-y-3">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">What stirs your heart?</h1>
        <p className="text-slate-500 italic font-serif">Choose at least 2 topics to explore deeply.</p>
      </header>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
        {INTERESTS.map(item => {
          const selected = sel.interests.includes(item.id)
          return (
            <button
              key={item.id}
              onClick={() => toggle(item.id)}
              className={cn(
                "p-5 rounded-[1.5rem] border-2 text-center space-y-2 transition-all hover:scale-105",
                selected
                  ? "border-slate-900 bg-slate-900 text-white shadow-xl shadow-slate-900/20"
                  : "border-slate-100 bg-white text-slate-600 hover:border-primary/30"
              )}
            >
              <div className="text-2xl">{item.emoji}</div>
              <div className="text-[11px] font-bold uppercase tracking-wide">{item.label}</div>
            </button>
          )
        })}
      </div>
      <div className="text-center">
        <button
          onClick={onNext}
          disabled={!valid}
          className={cn(
            "h-14 px-12 rounded-2xl font-bold text-base flex items-center gap-3 mx-auto transition-all",
            valid
              ? "bg-primary text-white shadow-xl shadow-primary/25 hover:scale-105 active:scale-95"
              : "bg-slate-100 text-slate-300 cursor-not-allowed"
          )}
        >
          Next <ArrowRight className="w-5 h-5" />
        </button>
        {!valid && <p className="text-xs text-slate-400 mt-3">Select at least 2 topics</p>}
      </div>
    </div>
  )
}

function StepGoal({ sel, setSel, onNext }: { sel: Selections; setSel: React.Dispatch<React.SetStateAction<Selections>>; onNext: () => void }) {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right duration-500">
      <header className="text-center space-y-3">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">Your Sankalpa</h1>
        <p className="text-slate-500 italic font-serif">What is your deepest intention for this study?</p>
      </header>
      <div className="space-y-4 max-w-xl mx-auto">
        {GOALS.map(goal => {
          const Icon = goal.icon
          const selected = sel.goal === goal.id
          return (
            <button
              key={goal.id}
              onClick={() => { setSel(p => ({ ...p, goal: goal.id })); onNext() }}
              className={cn(
                "w-full p-6 bg-white rounded-[1.5rem] border-2 flex items-center gap-5 text-left transition-all hover:scale-[1.01] hover:shadow-xl group",
                selected
                  ? "border-primary ring-4 ring-primary/10 bg-primary/5"
                  : "border-slate-100 hover:border-primary/30"
              )}
            >
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors", goal.color)}>
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-lg font-bold text-slate-900">{goal.label}</span>
              {selected && <Zap className="ml-auto w-5 h-5 text-primary animate-pulse flex-shrink-0" />}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function StepSuccess({ sel }: { sel: Selections }) {
  const verse = VERSE_BY_GOAL[sel.goal] || VERSE_BY_GOAL['PEACE']
  const [revealed, setRevealed] = useState(false)
  const [confetti, setConfetti] = useState(false)

  useEffect(() => {
    // Stagger the reveal for maximum delight
    const t1 = setTimeout(() => setConfetti(true), 300)
    const t2 = setTimeout(() => setRevealed(true), 800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <div className="space-y-10 text-center animate-in fade-in zoom-in duration-700 max-w-2xl mx-auto">

      {/* Celebration moment */}
      <div className="space-y-4">
        <div className={cn(
          "w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto transition-all duration-700",
          confetti ? "scale-100 opacity-100" : "scale-50 opacity-0"
        )}>
          <Trophy className={cn("w-12 h-12 text-primary transition-all duration-700", confetti ? "scale-100" : "scale-0")} />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={cn(
                "w-4 h-4 fill-current text-amber-400 transition-all",
                confetti ? "opacity-100 scale-100" : "opacity-0 scale-0"
              )}
              style={{ transitionDelay: `${i * 100 + 400}ms` }}
              />
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
            {sel.name}, your path is ready.
          </h1>
          <p className="text-slate-500 font-serif italic">
            Your journey has been personalized to your life stage and sankalpa.
          </p>
        </div>
      </div>

      {/* THE FIRST SUCCESS MOMENT — their first personalized verse */}
      <div className={cn(
        "transition-all duration-1000",
        revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}>
        <div className="bg-slate-900 rounded-[2.5rem] p-10 text-left text-white space-y-6 relative overflow-hidden shadow-2xl shadow-slate-900/30">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />

          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-bold text-primary uppercase tracking-[0.25em]">
                Your First Verse — Chosen for Your Sankalpa
              </span>
            </div>
            <div className="text-xs text-slate-500 font-mono">{verse.ref}</div>

            <p className="text-2xl font-serif text-white/90 leading-relaxed">{verse.sanskrit}</p>

            <div className="border-t border-white/10 pt-4 space-y-2">
              <p className="text-base md:text-lg font-serif italic text-white leading-relaxed">
                "{verse.translation}"
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">{verse.insight}</p>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-400 mt-3 italic">
          ↑ 2,400+ more verses curated for your path.
        </p>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
        <Link
          href="/auth/signup"
          className="group h-16 px-10 bg-primary text-white font-bold text-lg rounded-2xl flex items-center justify-center gap-3 shadow-2xl shadow-primary/25 hover:shadow-primary/40 hover:scale-105 active:scale-95 transition-all"
        >
          <span>Create Free Account</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link
          href="/library"
          className="h-16 px-10 bg-white border border-slate-200 text-slate-700 font-bold text-lg rounded-2xl flex items-center justify-center gap-3 hover:border-primary/30 hover:shadow-lg transition-all"
        >
          <BookOpen className="w-5 h-5 text-primary" />
          <span>Explore First</span>
        </Link>
      </div>

      <p className="text-xs text-slate-400">
        Free forever · No credit card · Setup in 60 seconds
      </p>
    </div>
  )
}

// ─── Main Onboarding Orchestrator ─────────────────────────
const TOTAL_STEPS = 5 // name, stage, interests, goal, success

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [selections, setSelections] = useState<Selections>({
    name: '',
    stage: '',
    interests: [],
    goal: ''
  })

  const next = () => setStep(s => Math.min(s + 1, TOTAL_STEPS))
  const prev = () => setStep(s => Math.max(s - 1, 1))

  const stepLabels = ['Hello', 'Life Stage', 'Interests', 'Sankalpa', 'Your Path']
  const progress = ((step - 1) / (TOTAL_STEPS - 1)) * 100

  return (
    <div className="min-h-screen bg-[#F8F7F4] flex flex-col">

      {/* Top bar */}
      <header className="fixed top-0 inset-x-0 z-50 bg-[#F8F7F4]/90 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-2xl mx-auto px-6 h-16 flex items-center gap-6">
          {/* Back button */}
          <button
            onClick={prev}
            className={cn(
              "w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:border-slate-300 transition-all",
              step === 1 ? "opacity-0 pointer-events-none" : ""
            )}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* Progress bar */}
          <div className="flex-1 space-y-1">
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between">
              {stepLabels.map((label, i) => (
                <span key={i} className={cn(
                  "text-[9px] font-bold uppercase tracking-widest transition-colors",
                  i + 1 === step ? "text-primary" : i + 1 < step ? "text-slate-400" : "text-slate-200"
                )}>
                  {i + 1 < step ? <CheckCircle2 className="w-3 h-3 inline text-emerald-400" /> : label}
                </span>
              ))}
            </div>
          </div>

          {/* Step counter */}
          <span className="text-xs font-bold text-slate-400 whitespace-nowrap">{step}/{TOTAL_STEPS}</span>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 pt-24 pb-16 flex items-center justify-center px-6">
        <div className="max-w-2xl w-full">
          {step === 1 && <StepName sel={selections} setSel={setSelections} onNext={next} />}
          {step === 2 && <StepStage sel={selections} setSel={setSelections} onNext={next} />}
          {step === 3 && <StepInterests sel={selections} setSel={setSelections} onNext={next} />}
          {step === 4 && <StepGoal sel={selections} setSel={setSelections} onNext={next} />}
          {step === 5 && <StepSuccess sel={selections} />}
        </div>
      </main>
    </div>
  )
}
