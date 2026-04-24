'use client'

import React, { useState } from 'react'
import { Navbar } from '@/components/organisms/navbar'
import { Button } from '@/components/atoms/button'
import { Badge } from '@/components/atoms/badge'
import { 
  Heart, 
  BookOpen, 
  Users, 
  Building2, 
  CheckCircle2, 
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  Zap,
  Globe
} from 'lucide-react'
import { cn } from '@/lib/utils'

const sevas = [
  { 
    id: 'shastra', 
    title: 'Shastra Preservation', 
    desc: 'Support the digitization and restoration of rare Vedic manuscripts and commentaries.', 
    icon: BookOpen,
    color: 'bg-orange-50 text-orange-600 border-orange-100',
    stat: '108 Manuscripts Pending'
  },
  { 
    id: 'scholar', 
    title: 'Scholar Support', 
    desc: 'Provide food, shelter, and resources for dedicated seekers and researchers.', 
    icon: Users,
    color: 'bg-blue-50 text-blue-600 border-blue-100',
    stat: '12 Residents Supported'
  },
  { 
    id: 'infra', 
    title: 'Infrastructure', 
    desc: 'Maintain our sovereign cloud vaults and global communication networks.', 
    icon: Building2,
    color: 'bg-purple-50 text-purple-600 border-purple-100',
    stat: 'Global Reach Enabled'
  }
]

const amounts = [108, 501, 1008, 5001, 10008]

export default function DanaPortal() {
  const [selectedSeva, setSelectedSeva] = useState('shastra')
  const [selectedAmount, setSelectedAmount] = useState(1008)
  const [customAmount, setCustomAmount] = useState('')

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
          <Globe className="absolute -top-20 -right-20 w-[600px] h-[600px]" />
        </div>
        
        <div className="container mx-auto px-4 text-center space-y-8 relative z-10">
          <Badge variant="outline" className="px-6 py-2 rounded-full border-orange-200 text-orange-600 font-black tracking-widest uppercase text-[10px]">
            The Dāna Pillar • Sacred Generosity
          </Badge>
          <h1 className="text-5xl md:text-7xl font-serif font-bold italic text-slate-900 leading-tight">
            Support the <span className="text-orange-600">Institutional</span> Mission
          </h1>
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Your contribution ensures that the eternal wisdom of the Shastras remains preserved, accessible, and sovereign for generations to come.
          </p>
        </div>
      </section>

      {/* Main Donation Flow */}
      <section className="py-24 container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Left: Sevā Selection */}
          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-4">
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] flex items-center gap-2">
                <Heart className="w-4 h-4 text-orange-600" /> 1. Select your Sevā
              </h2>
              <p className="text-slate-500 text-sm italic font-serif">"Gifts given with the right intent to the right person at the right time are pure."</p>
            </div>

            <div className="grid md:grid-cols-1 gap-6">
              {sevas.map((seva) => (
                <div 
                  key={seva.id}
                  onClick={() => setSelectedSeva(seva.id)}
                  className={cn(
                    "p-10 border rounded-[3rem] transition-all cursor-pointer group relative overflow-hidden",
                    selectedSeva === seva.id 
                      ? "border-orange-600 bg-orange-50/30 shadow-2xl shadow-orange-100" 
                      : "border-slate-100 hover:border-orange-200 hover:bg-slate-50"
                  )}
                >
                  <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                    <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center shrink-0", seva.color)}>
                      <seva.icon className="w-8 h-8" />
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-serif font-bold italic text-slate-900">{seva.title}</h3>
                        {selectedSeva === seva.id && <CheckCircle2 className="w-6 h-6 text-orange-600" />}
                      </div>
                      <p className="text-slate-500 leading-relaxed text-sm">{seva.desc}</p>
                      <div className="flex items-center gap-4">
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{seva.stat}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Amount & Checkout */}
          <div className="lg:col-span-5 sticky top-32">
            <div className="p-12 bg-white border border-slate-100 rounded-[3.5rem] shadow-2xl space-y-10">
              <div className="space-y-6 text-center">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em]">2. Contribution Amount</h3>
                <div className="grid grid-cols-3 gap-3">
                  {amounts.map((amt) => (
                    <button
                      key={amt}
                      onClick={() => {
                        setSelectedAmount(amt)
                        setCustomAmount('')
                      }}
                      className={cn(
                        "h-14 rounded-2xl font-black text-xs transition-all",
                        selectedAmount === amt && !customAmount
                          ? "bg-orange-600 text-white shadow-lg shadow-orange-200"
                          : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                      )}
                    >
                      ₹{amt.toLocaleString()}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                  <input 
                    type="number"
                    placeholder="Other Amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value)
                      setSelectedAmount(0)
                    }}
                    className="w-full h-16 pl-12 pr-6 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 font-bold text-sm"
                  />
                </div>
              </div>

              <div className="p-8 bg-slate-50 rounded-3xl space-y-4">
                <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <span>Selected Sevā</span>
                  <span className="text-slate-900">{sevas.find(s => s.id === selectedSeva)?.title}</span>
                </div>
                <div className="flex justify-between items-end border-t border-slate-200 pt-4">
                   <span className="text-sm font-bold text-slate-500">Total Contribution</span>
                   <span className="text-3xl font-black text-slate-900">₹{(Number(customAmount) || selectedAmount).toLocaleString()}</span>
                </div>
              </div>

              <Button className="w-full h-20 bg-orange-600 hover:bg-orange-700 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-orange-200 transition-all group">
                Proceed to Secure Checkout <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
              </Button>

              <div className="flex items-center justify-center gap-6 pt-4">
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <ShieldCheck className="w-4 h-4 text-green-500" /> Secure SSL
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <Zap className="w-4 h-4 text-blue-500" /> Instant Receipt
                </div>
              </div>
            </div>
            
            <p className="mt-8 text-center text-slate-400 text-[10px] uppercase font-bold tracking-widest leading-loose max-w-xs mx-auto">
              Your donation supports a 501(c)(3) equivalent institutional mandate for Vedic Preservation.
            </p>
          </div>

        </div>
      </section>

      {/* Spiritual Context Section */}
      <section className="py-32 bg-slate-900 text-white text-center relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-4xl space-y-12 relative z-10">
           <Heart className="w-16 h-16 text-orange-500 mx-auto opacity-50" />
           <h2 className="text-4xl md:text-5xl font-serif font-bold italic leading-tight">
             “He who gives for the preservation of Knowledge performs the highest sacrifice.”
           </h2>
           <div className="w-20 h-1 bg-orange-500 mx-auto" />
           <p className="text-slate-400 text-lg italic">The merit of Shastra-Dāna is eternal.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-slate-100">
        <div className="container mx-auto px-4 text-center space-y-8">
           <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold">V</div>
              <span className="text-lg font-bold text-slate-900">VedicSkills Institutional</span>
           </div>
           <p className="text-slate-300 text-[10px] font-bold uppercase tracking-[0.2em]">Sovereign Wisdom Infrastructure • Pillar VI</p>
        </div>
      </footer>
    </main>
  )
}
