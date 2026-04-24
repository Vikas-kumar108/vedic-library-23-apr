'use client'

import React, { useState } from 'react'
import Link from 'next/link'
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
  Globe,
  CreditCard,
  QrCode,
  Copy,
  Check,
  Building
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Script from 'next/script'

// --- IMPACT STATS ---
const stats = [
  { label: 'Courses Created', value: '500+', icon: BookOpen },
  { label: 'Students Taught', value: '10,000+', icon: Users },
  { label: 'Countries Reached', value: '50+', icon: Globe },
  { label: 'Sacred Donors', value: '1,000+', icon: Heart },
]

// --- SEVĀ CATEGORIES ---
const sevas = [
  { 
    id: 'shastra', 
    title: 'Shastra Preservation', 
    desc: 'Support the digitization and restoration of rare Vedic manuscripts and commentaries.', 
    icon: BookOpen,
    color: 'bg-orange-50 text-orange-600 border-orange-100'
  },
  { 
    id: 'scholar', 
    title: 'Scholar Support', 
    desc: 'Provide food, shelter, and resources for dedicated seekers and researchers.', 
    icon: Users,
    color: 'bg-blue-50 text-blue-600 border-blue-100'
  }
]

const amounts = [108, 501, 1008, 5001, 10008]

// --- BANK DETAILS ---
const BANK_DETAILS = {
  accountName: "VedicSkills Institutional",
  accountNumber: "918095108108",
  ifscCode: "HDFC0001234",
  bankName: "HDFC Bank",
  branch: "Institutional Branch, New Delhi",
  upiId: "vedicskills@upi"
}

export default function DanaPortal() {
  const [selectedSeva, setSelectedSeva] = useState('shastra')
  const [paymentMode, setPaymentMode] = useState<'ONLINE' | 'MANUAL'>('ONLINE')
  const [selectedAmount, setSelectedAmount] = useState(1008)
  const [customAmount, setCustomAmount] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [pan, setPan] = useState('')
  const [needs80G, setNeeds80G] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [success, setSuccess] = useState(false)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const handleCheckout = async () => {
    if (!email || !name) {
      alert('Please provide your name and email for the institutional record.')
      return
    }

    setIsProcessing(true)
    const finalAmount = Number(customAmount) || selectedAmount

    try {
      // 1. Create Order
      const response = await fetch('http://localhost:4444/institutional/dana/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: finalAmount, sevaId: selectedSeva, email, name, needs80G, pan })
      })
      const { order } = await response.json()

      // 2. Open Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_placeholder', 
        amount: order.amount,
        currency: order.currency,
        name: 'VedicSkills Institutional',
        description: `Sevā: ${sevas.find(s => s.id === selectedSeva)?.title}`,
        order_id: order.id,
        handler: async function (response: any) {
          const verifyRes = await fetch('http://localhost:4444/institutional/dana/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response)
          })
          const verifyData = await verifyRes.json()
          if (verifyData.success) setSuccess(true)
        },
        prefill: { email, name },
        theme: { color: '#EA580C' }
      }

      const rzp = new (window as any).Razorpay(options)
      rzp.open()
    } catch (error) {
      console.error('🏛️ Checkout Error:', error)
      alert('The gateway is non-manifest. Please use the Manual Transfer option.')
    } finally {
      setIsProcessing(false)
    }
  }

  if (success) {
    return (
      <main className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <Navbar />
        <div className="text-center space-y-8 animate-in zoom-in duration-500 max-w-xl">
           <div className="w-32 h-32 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-10">
              <CheckCircle2 className="w-16 h-16" />
           </div>
           <h1 className="text-5xl font-serif font-bold italic text-slate-900">Infinite <span className="text-green-600">Gratitude</span></h1>
           <p className="text-slate-500 text-lg leading-relaxed">Your contribution has been received by the institutional vaults. A sacred receipt has been manifest and sent to <strong>{email}</strong>.</p>
           <Button asChild size="lg" className="rounded-2xl h-16 px-12 bg-slate-900 mt-10">
              <Link href="/">Return to Mission</Link>
           </Button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-40 pb-24 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center space-y-8 relative z-10">
          <Badge variant="outline" className="px-6 py-2 rounded-full border-orange-200 text-orange-600 font-black tracking-widest uppercase text-[10px]">
            The Dāna Pillar • Institutional Sovereignty
          </Badge>
          <h1 className="text-5xl md:text-7xl font-serif font-bold italic text-slate-900 leading-tight">
            Preserving Eternal <span className="text-orange-600">Wisdom</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Your support fuels the digitization of sacred texts and the sustenance of scholars in our sovereign institutional universe.
          </p>

          {/* Fabulous Impact Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 max-w-5xl mx-auto">
             {stats.map((s) => (
               <div key={s.label} className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-3">
                  <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center mx-auto">
                    <s.icon className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-black text-slate-900">{s.value}</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Main Donation Flow */}
      <section className="py-24 container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-16 items-start max-w-7xl mx-auto">
          
          {/* Left: Mode Selection & Info */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Mode Switcher */}
            <div className="flex p-1 bg-slate-100 rounded-[2rem] max-w-md">
              <button 
                onClick={() => setPaymentMode('ONLINE')}
                className={cn(
                  "flex-1 py-4 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest rounded-[1.8rem] transition-all",
                  paymentMode === 'ONLINE' ? "bg-white text-orange-600 shadow-sm" : "text-slate-400"
                )}
              >
                <CreditCard className="w-4 h-4" /> Pay Online
              </button>
              <button 
                onClick={() => setPaymentMode('MANUAL')}
                className={cn(
                  "flex-1 py-4 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest rounded-[1.8rem] transition-all",
                  paymentMode === 'MANUAL' ? "bg-white text-orange-600 shadow-sm" : "text-slate-400"
                )}
              >
                <QrCode className="w-4 h-4" /> Bank / UPI
              </button>
            </div>

            {paymentMode === 'MANUAL' ? (
              <div className="space-y-8 animate-in slide-in-from-left duration-500">
                <div className="bg-slate-900 text-white p-12 rounded-[3.5rem] space-y-8 shadow-2xl">
                   <div className="space-y-2">
                      <h3 className="text-2xl font-serif font-bold italic">Direct Institutional Transfer</h3>
                      <p className="text-slate-400 text-sm">For large contributions or direct bank transfers.</p>
                   </div>
                   
                   <div className="grid gap-4">
                      {[
                        { label: 'Account Name', value: BANK_DETAILS.accountName, id: 'name' },
                        { label: 'Account Number', value: BANK_DETAILS.accountNumber, id: 'acc' },
                        { label: 'IFSC Code', value: BANK_DETAILS.ifscCode, id: 'ifsc' },
                        { label: 'Bank Name', value: BANK_DETAILS.bankName, id: 'bank' },
                        { label: 'UPI ID', value: BANK_DETAILS.upiId, id: 'upi' },
                      ].map((field) => (
                        <div key={field.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                           <div>
                              <div className="text-[9px] font-black text-white/30 uppercase tracking-widest">{field.label}</div>
                              <div className="text-sm font-bold font-mono">{field.value}</div>
                           </div>
                           <button 
                            onClick={() => copyToClipboard(field.value, field.id)}
                            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                           >
                             {copiedField === field.id ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-white/40" />}
                           </button>
                        </div>
                      ))}
                   </div>

                   <div className="p-6 bg-orange-600/10 border border-orange-600/20 rounded-2xl flex gap-4">
                      <ShieldCheck className="w-6 h-6 text-orange-600 shrink-0" />
                      <p className="text-xs text-orange-100 leading-relaxed">After transfer, please share the transaction screenshot at <strong>wisdom@vedicskills.com</strong> to receive your branded receipt.</p>
                   </div>
                </div>
              </div>
            ) : (
              <div className="space-y-12 animate-in slide-in-from-left duration-500">
                <div className="space-y-4">
                  <h2 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Heart className="w-4 h-4 text-orange-600" /> 1. Select your Sevā
                  </h2>
                </div>
                <div className="grid gap-6">
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
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Checkout Logic */}
          <div className="lg:col-span-5 sticky top-40">
            <div className="p-12 bg-white border border-slate-100 rounded-[3.5rem] shadow-2xl space-y-8">
              <div className="space-y-6">
                <h3 className="text-xs font-black text-center text-slate-900 uppercase tracking-[0.2em]">Donation Details</h3>
                
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Your Name</label>
                    <input 
                      required
                      placeholder="Seer Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-14 px-6 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 font-bold text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                    <input 
                      type="email"
                      required
                      placeholder="seeker@path.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-14 px-6 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 font-bold text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {amounts.map((amt) => (
                    <button
                      key={amt}
                      onClick={() => { setSelectedAmount(amt); setCustomAmount(''); }}
                      className={cn(
                        "h-12 rounded-xl font-black text-[10px] transition-all",
                        selectedAmount === amt && !customAmount ? "bg-orange-600 text-white shadow-lg" : "bg-slate-50 text-slate-500"
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
                    placeholder="Custom Amount"
                    value={customAmount}
                    onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(0); }}
                    className="w-full h-14 pl-12 pr-6 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 font-bold text-sm"
                  />
                </div>

                {/* 80G Logic */}
                <div className="p-6 bg-blue-50/50 border border-blue-100 rounded-2xl space-y-4">
                   <div className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        id="needs80g" 
                        checked={needs80G} 
                        onChange={(e) => setNeeds80G(e.target.checked)}
                        className="w-4 h-4 rounded border-blue-200 text-blue-600"
                      />
                      <label htmlFor="needs80g" className="text-[10px] font-black text-blue-900 uppercase tracking-widest cursor-pointer">Tax Exemption Receipt (80G)</label>
                   </div>
                   {needs80G && (
                     <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                        <label className="text-[9px] font-black text-blue-400 uppercase tracking-widest ml-1">PAN Number</label>
                        <input 
                          placeholder="ABCDE1234F"
                          value={pan}
                          onChange={(e) => setPan(e.target.value.toUpperCase())}
                          className="w-full h-12 px-4 bg-white border border-blue-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 font-mono font-bold text-xs"
                        />
                     </div>
                   )}
                </div>
              </div>

              <div className="p-8 bg-slate-50 rounded-3xl flex justify-between items-end border-t border-slate-200">
                  <span className="text-sm font-bold text-slate-500">Contribution</span>
                  <span className="text-3xl font-black text-slate-900">₹{(Number(customAmount) || selectedAmount).toLocaleString()}</span>
              </div>

              <Button 
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full h-20 bg-orange-600 hover:bg-orange-700 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-orange-200 transition-all group"
              >
                {isProcessing ? 'Manifesting Order...' : 'Activate Sacred Dāna'} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
              </Button>

              <div className="flex items-center justify-center gap-6 pt-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
                <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-green-500" /> Secure</span>
                <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-blue-500" /> Instant Receipt</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Trust & Transparency Section */}
      <section className="py-32 bg-slate-900 text-white overflow-hidden relative">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-20 items-center">
           <div className="space-y-8">
              <Badge className="bg-orange-600 text-white border-none">Institutional Transparency</Badge>
              <h2 className="text-4xl md:text-5xl font-serif font-bold italic leading-tight">Every Cent is Accounted in our <span className="text-orange-600">Sovereign Registers</span>.</h2>
              <p className="text-slate-400 text-lg leading-relaxed">We provide quarterly transparency reports to all major donors, detailing exactly how their contributions manifest into digitized shastras and scholar support programs.</p>
              <div className="flex gap-4">
                 <div className="p-6 bg-white/5 rounded-2xl border border-white/10 flex-1">
                    <Building className="w-6 h-6 text-orange-600 mb-4" />
                    <div className="font-bold">Managed Governance</div>
                    <div className="text-xs text-slate-500">Direct Institutional Control</div>
                 </div>
                 <div className="p-6 bg-white/5 rounded-2xl border border-white/10 flex-1">
                    <ShieldCheck className="w-6 h-6 text-blue-500 mb-4" />
                    <div className="font-bold">Verified Impact</div>
                    <div className="text-xs text-slate-500">Documented Preservation</div>
                 </div>
              </div>
           </div>
           <div className="relative group">
              <div className="absolute -inset-4 bg-orange-600/20 rounded-[4rem] blur-2xl group-hover:bg-orange-600/30 transition-all" />
              <div className="relative aspect-video bg-slate-800 rounded-[3rem] border border-white/10 flex items-center justify-center overflow-hidden">
                 <div className="text-center space-y-4 p-12">
                    <BookOpen className="w-16 h-16 text-orange-600 mx-auto opacity-50" />
                    <p className="text-slate-400 italic font-serif">"The preservation of knowledge is the highest sacrifice."</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      <footer className="py-20 border-t border-slate-100 text-center space-y-8">
           <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold">V</div>
              <span className="text-lg font-bold text-slate-900">VedicSkills Institutional</span>
           </div>
           <p className="text-slate-300 text-[10px] font-bold uppercase tracking-[0.2em]">Pillar VI • Financial Sustainability Protocol</p>
      </footer>
    </main>
  )
}
