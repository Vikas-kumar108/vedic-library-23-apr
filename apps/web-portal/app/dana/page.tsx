"use client"

import { useState } from "react"
import { PaymentInfoCard } from "@/features/dana/PaymentInfoCard"
import { DonationForm } from "@/features/dana/DonationForm"
import { RazorpayCheckout } from "@/features/dana/RazorpayCheckout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, BookOpen, Users, Globe, CreditCard, QrCode, ShieldCheck, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

// --- ORIGINAL IMPACT STATS FROM V2 ---
const stats = [
  { label: 'Courses Created', value: '500+', icon: BookOpen },
  { label: 'Students Taught', value: '10,000+', icon: Users },
  { label: 'Countries Reached', value: '50+', icon: Globe },
  { label: 'Sacred Donors', value: '1,000+', icon: Heart },
]

export default function DonatePage() {
  const [selectedMethod, setSelectedMethod] = useState<"UPI" | "Bank">("UPI")
  const [paymentMode, setPaymentMode] = useState<"online" | "manual">("online")

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfcf5]">

      <main className="flex-1">
        {/* Hero Section - EXACT V2 COPY */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#e67e22]/5 to-transparent" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e67e22]/10 text-[#e67e22] text-[10px] font-black uppercase tracking-widest mb-6">
                <Heart className="size-3" />
                Support Vedic Wisdom
              </div>
              <h1 className="text-4xl md:text-6xl font-serif font-bold italic text-slate-900 leading-tight">
                Help Preserve Ancient
                <span className="text-[#e67e22] block">Vedic Knowledge</span>
              </h1>
              <p className="mt-6 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                Your generous contribution supports the preservation and
                dissemination of timeless Vedic wisdom. Every donation helps us
                reach more seekers across the globe.
              </p>
            </div>
          </div>
        </section>

        {/* Impact Stats - EXACT V2 GRID */}
        <section className="py-12 border-y border-[#e8e4d9] bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((s) => (
                <div key={s.label} className="text-center group">
                  <div className="size-12 rounded-2xl bg-[#e67e22]/5 text-[#e67e22] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <s.icon className="size-5" />
                  </div>
                  <p className="text-3xl font-black text-slate-900 leading-none">{s.value}</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Donation Section - EXACT V2 TABS & LAYOUT */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <Tabs 
                value={paymentMode} 
                onValueChange={(v) => setPaymentMode(v as "online" | "manual")}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 mb-12 bg-slate-100/50 p-1 rounded-3xl h-16 max-w-2xl mx-auto border border-slate-200/50">
                  <TabsTrigger value="online" className="gap-2 rounded-[1.4rem] data-[state=active]:bg-white data-[state=active]:text-[#e67e22] data-[state=active]:shadow-xl transition-all font-black text-[10px] uppercase tracking-widest">
                    <CreditCard className="size-4" />
                    Pay Online
                  </TabsTrigger>
                  <TabsTrigger value="manual" className="gap-2 rounded-[1.4rem] data-[state=active]:bg-white data-[state=active]:text-[#e67e22] data-[state=active]:shadow-xl transition-all font-black text-[10px] uppercase tracking-widest">
                    <QrCode className="size-4" />
                    UPI / Bank Transfer
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="online" className="mt-0 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="max-w-xl mx-auto">
                    <RazorpayCheckout />
                  </div>
                </TabsContent>

                <TabsContent value="manual" className="mt-0 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="grid lg:grid-cols-2 gap-12 items-start">
                    <PaymentInfoCard onMethodChange={setSelectedMethod} />
                    <DonationForm selectedMethod={selectedMethod} />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Trust Section - EXACT V2 TRUST BADGES */}
        <section className="py-24 bg-white border-t border-[#e8e4d9]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-serif font-bold italic">Your Trust Matters</h2>
                <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
                  We are committed to complete transparency. Every donation is
                  tracked, and donors receive detailed receipts. Your
                  contributions directly support our educational mission.
                </p>
              </div>
              
              <div className="grid sm:grid-cols-3 gap-8">
                {[
                  { title: '100% Transparent', desc: 'Track where your donation goes', icon: Globe },
                  { title: '80G Tax Benefits', desc: 'Receive receipts for tax exemption', icon: ShieldCheck },
                  { title: 'Secure Payment', desc: 'Razorpay encrypted checkout', icon: Zap },
                ].map((item) => (
                  <div key={item.title} className="p-8 rounded-[2.5rem] bg-[#fdfcf5] border border-[#e8e4d9] space-y-4 hover:shadow-xl hover:shadow-[#e67e22]/5 transition-all">
                    <div className="size-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center mx-auto shadow-sm">
                       <item.icon className="size-5 text-[#e67e22]" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-black text-slate-900 uppercase tracking-widest">{item.title}</p>
                      <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer - EXACT V2 REPLICA */}
      <footer className="py-12 border-t border-[#e8e4d9] bg-[#fdfcf5]">
        <div className="container mx-auto px-4 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#e67e22] rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-[#e67e22]/20">V</div>
              <span className="text-sm font-black text-slate-900 uppercase tracking-widest">Vedic Institutional Protocol</span>
          </div>
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Institutional Financial Pillar • Version 2.0</p>
          <p className="text-xs text-slate-400">
            For queries, contact the treasury at{" "}
            <a href="mailto:wisdom@vedicskills.com" className="text-[#e67e22] font-bold hover:underline">
              wisdom@vedicskills.com
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
