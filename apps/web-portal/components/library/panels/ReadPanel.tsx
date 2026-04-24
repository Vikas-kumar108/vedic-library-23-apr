'use client'

import React from 'react'
import { Button } from '@/components/index'

export function ReadPanel() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in text-left">
      <h3 className="text-3xl font-serif font-bold text-slate-900">Summary of the Gita</h3>
      <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-lg font-serif">
        <p>The Bhagavad-gita is universally acknowledged as the jewel of India's spiritual wisdom. Spoken by Lord Krishna, the Supreme Personality of Godhead, to His intimate disciple Arjuna, the Gita's seven hundred concise verses provide a definitive guide to the science of self-realization.</p>
        <p>No other philosophical or religious work reveals, in such a lucid and profound way, the nature of consciousness, the self, the universe and the Supreme.</p>
      </div>
      <Button variant="ghost" className="text-primary font-bold">Read More in Deep View →</Button>
    </div>
  )
}
