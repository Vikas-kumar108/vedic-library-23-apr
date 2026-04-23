'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AuthCard } from '@/components/auth/auth-card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { GraduationCap, Home, TreePine, Heart, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const lifeStages = [
  { id: 'student', label: 'Brahmacharya', sub: 'Student', icon: GraduationCap, color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 'married', label: 'Grihastha', sub: 'Householder', icon: Home, color: 'text-orange-600', bg: 'bg-orange-50' },
  { id: 'vanaprastha', label: 'Vanaprastha', sub: 'Retired', icon: TreePine, color: 'text-green-600', bg: 'bg-green-50' },
  { id: 'renunciate', label: 'Sannyasa', sub: 'Renunciate', icon: Heart, color: 'text-red-600', bg: 'bg-red-50' },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [selectedStage, setSelectedStage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleFinish = async () => {
    setLoading(true)
    // Mock save
    setTimeout(() => {
      setLoading(false)
      router.push('/library')
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background-secondary)] p-4 bg-gradient-to-br from-[var(--background-secondary)] via-background to-[var(--background-secondary)]">
      <AuthCard 
        title={step === 1 ? "Welcome Home" : "Set Your Sankalpa"} 
        subtext={step === 1 ? "Which walk of life are you currently in?" : "What is your primary focus for now?"}
      >
        {step === 1 ? (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {lifeStages.map((stage) => {
                const Icon = stage.icon
                const isSelected = selectedStage === stage.id
                return (
                  <button
                    key={stage.id}
                    onClick={() => setSelectedStage(stage.id)}
                    className={cn(
                      "flex flex-col items-center p-6 rounded-2xl border-2 transition-all text-center group",
                      isSelected 
                        ? "border-primary bg-primary/5 shadow-lg scale-105" 
                        : "border-border/50 hover:border-primary/20 hover:bg-secondary/30"
                    )}
                  >
                    <div className={cn("p-3 rounded-xl mb-3 group-hover:scale-110 transition-transform", stage.bg, stage.color)}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="font-semibold text-sm">{stage.label}</span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{stage.sub}</span>
                  </button>
                )
              })}
            </div>
            <Button 
              disabled={!selectedStage} 
              onClick={() => setStep(2)} 
              className="w-full h-12 rounded-xl text-lg font-medium bg-[var(--knowledge-blue)]"
            >
              Continue
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Your Personal Goal (Sankalpa)</Label>
              <textarea 
                className="w-full min-h-[120px] p-4 rounded-2xl border border-border/50 bg-background/50 focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                placeholder="e.g., I want to find balance between my career and family life through Vedic wisdom..."
              />
            </div>
            <div className="flex flex-col gap-3">
              <Button 
                onClick={handleFinish} 
                disabled={loading}
                className="w-full h-12 rounded-xl text-lg font-medium bg-[var(--knowledge-blue)]"
              >
                {loading ? "Preparing Your Path..." : "Enter the Library"}
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => setStep(1)} 
                className="w-full h-12 rounded-xl text-muted-foreground"
              >
                Go Back
              </Button>
            </div>
            <div className="flex items-center justify-center text-xs text-muted-foreground italic">
              <Sparkles className="h-3 w-3 mr-2 text-yellow-500" />
              This helps us curate the best Shastras for you.
            </div>
          </div>
        )}
      </AuthCard>
    </div>
  )
}
