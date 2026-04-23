'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AuthCard } from '@/components/auth/auth-card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { 
  GraduationCap, Home, TreePine, Heart, Sparkles, 
  Check, ChevronRight, Brain, Shield, PenTool, Wrench,
  Clock, Target, Compass, Zap, Search, AlertTriangle, Sun
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Stages mapping (subset for UI display)
const displayStages = [
  { id: 'early-childhood', label: 'Early Childhood (2-5)', age: [2, 5], cat: 'Childhood' },
  { id: 'curious-learning', label: 'Curious Learning (8-12)', age: [8, 12], cat: 'Childhood' },
  { id: 'attraction-awakening', label: 'Attraction Awakening (14-16)', age: [14, 16], cat: 'Adolescence' },
  { id: 'direction-seeking', label: 'Direction Seeking (18-20)', age: [18, 20], cat: 'Brahmacharya' },
  { id: 'newly-married-adjustment', label: 'Newly Married', age: [25, 28], cat: 'Grihastha' },
  { id: 'career-establishment', label: 'Career Establishment', age: [25, 30], cat: 'Grihastha' },
  { id: 'early-parenthood', label: 'Early Parenthood', age: [28, 32], cat: 'Grihastha' },
  { id: 'stability-expansion', label: 'Stability & Growth (35-40)', age: [35, 40], cat: 'Grihastha' },
  { id: 'mentorship-phase', label: 'Mentorship (55-60)', age: [55, 60], cat: 'Vanaprastha' },
  { id: 'grandparental-joy', label: 'Grandparental Joy (65-70)', age: [65, 70], cat: 'Sannyasa' },
  { id: 'spiritual-intensification', label: 'Spiritual Intensity (75+)', age: [75, 100], cat: 'Sannyasa' },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    age: '',
    stageId: '',
    focus: '',
    state: '',
    nature: '',
    sankalpa: ''
  })
  const [loading, setLoading] = useState(false)

  // Auto-suggest stage based on age
  useEffect(() => {
    if (formData.age) {
      const ageNum = parseInt(formData.age)
      const suggested = displayStages.find(s => ageNum >= s.age[0] && ageNum <= s.age[1])
      if (suggested && !formData.stageId) {
        setFormData(prev => ({ ...prev, stageId: suggested.id }))
      }
    }
  }, [formData.age])

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFinish = async () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      router.push('/library')
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background-secondary)] p-4 bg-gradient-to-br from-[var(--background-secondary)] via-background to-[var(--background-secondary)]">
      <AuthCard 
        title={step === 1 ? "Start Your Journey" : step === 2 ? "Identify Your Stage" : step === 3 ? "Your Primary Focus" : step === 4 ? "Inner State" : step === 5 ? "Your Nature" : "Your Sankalpa"} 
        subtext={step === 1 ? "Enter your age to begin." : "Select the stage that best fits your mindset."}
      >
        <div className="mb-6 h-1.5 w-full bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-[var(--knowledge-blue)] transition-all duration-500" 
            style={{ width: `${(step / 6) * 100}%` }}
          />
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Your Age</Label>
              <input 
                type="number" 
                className="w-full h-14 px-4 rounded-2xl border border-border/50 bg-background/50 text-2xl font-bold text-center outline-none focus:ring-2 focus:ring-primary/20"
                value={formData.age}
                onChange={(e) => updateField('age', e.target.value)}
                placeholder="25"
              />
            </div>
            <Button 
              disabled={!formData.age} 
              onClick={() => setStep(2)} 
              className="w-full h-12 rounded-xl text-lg font-medium bg-[var(--knowledge-blue)]"
            >
              Continue
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-2 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
              {displayStages.map(s => (
                <button
                  key={s.id}
                  onClick={() => updateField('stageId', s.id)}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-xl border transition-all text-left",
                    formData.stageId === s.id ? "border-primary bg-primary/5" : "border-border/50 hover:bg-secondary/50"
                  )}
                >
                  <div className="space-y-0.5">
                    <div className="font-semibold text-sm">{s.label}</div>
                    <div className="text-[10px] text-muted-foreground uppercase">{s.cat}</div>
                  </div>
                  {formData.stageId === s.id && <Check className="h-4 w-4 text-primary" />}
                </button>
              ))}
            </div>
            <Button onClick={() => setStep(3)} className="w-full h-12 rounded-xl text-lg font-medium bg-[var(--knowledge-blue)]">
              Next Stage <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="grid grid-cols-2 gap-4">
            {[
              { id: 'dharma', label: 'Dharma', icon: Shield, color: 'text-blue-600' },
              { id: 'artha', label: 'Artha', icon: Target, color: 'text-green-600' },
              { id: 'kama', label: 'Kama', icon: Heart, color: 'text-red-600' },
              { id: 'moksha', label: 'Moksha', icon: Sparkles, color: 'text-orange-600' },
            ].map(p => (
              <button
                key={p.id}
                onClick={() => { updateField('focus', p.id); setStep(4); }}
                className={cn(
                  "p-6 rounded-2xl border transition-all text-center flex flex-col items-center",
                  formData.focus === p.id ? "border-primary bg-primary/5" : "border-border/50 hover:bg-secondary/30"
                )}
              >
                <p.icon className={cn("h-6 w-6 mb-3", p.color)} />
                <div className="font-semibold">{p.label}</div>
              </button>
            ))}
          </div>
        )}

        {step === 4 && (
          <div className="grid grid-cols-1 gap-3">
            {[
              { id: 'confused', label: 'Confused', icon: Compass },
              { id: 'seeking', label: 'Seeking', icon: Search },
              { id: 'stable', label: 'Stable', icon: Zap },
              { id: 'disturbed', label: 'Disturbed', icon: AlertTriangle },
              { id: 'detached', label: 'Detached', icon: Sun },
            ].map(s => (
              <button
                key={s.id}
                onClick={() => { updateField('state', s.id); setStep(5); }}
                className={cn(
                  "p-4 rounded-xl border transition-all text-left flex items-center justify-between",
                  formData.state === s.id ? "border-primary bg-primary/5" : "border-border/50 hover:bg-secondary/50"
                )}
              >
                <span className="font-medium">{s.label}</span>
                <s.icon className="h-5 w-5 text-muted-foreground" />
              </button>
            ))}
          </div>
        )}

        {step === 5 && (
          <div className="grid grid-cols-2 gap-4">
            {[
              { id: 'intellectual', label: 'Thinker', icon: Brain },
              { id: 'administrative', label: 'Leader', icon: Shield },
              { id: 'creative', label: 'Creator', icon: PenTool },
              { id: 'practical', label: 'Supporter', icon: Wrench },
            ].map(s => (
              <button
                key={s.id}
                onClick={() => { updateField('nature', s.id); setStep(6); }}
                className={cn(
                  "p-6 rounded-2xl border transition-all text-center flex flex-col items-center",
                  formData.nature === s.id ? "border-primary bg-primary/5 shadow-md" : "border-border/50 hover:bg-secondary/30"
                )}
              >
                <s.icon className="h-6 w-6 mb-3 text-primary" />
                <div className="font-semibold">{s.label}</div>
              </button>
            ))}
          </div>
        )}

        {step === 6 && (
          <div className="space-y-6">
            <textarea 
              className="w-full min-h-[120px] p-4 rounded-2xl border border-border/50 bg-background/50 focus:ring-2 focus:ring-primary/20 outline-none resize-none"
              placeholder="Your Sankalpa..."
              value={formData.sankalpa}
              onChange={(e) => updateField('sankalpa', e.target.value)}
            />
            <Button onClick={handleFinish} disabled={loading} className="w-full h-12 rounded-xl text-lg font-medium bg-[var(--knowledge-blue)]">
              {loading ? "Preparing..." : "Enter Library"}
            </Button>
          </div>
        )}

        {step > 1 && (
          <button onClick={() => setStep(step - 1)} className="mt-6 w-full text-sm text-muted-foreground">Go Back</button>
        )}
      </AuthCard>
    </div>
  )
}
