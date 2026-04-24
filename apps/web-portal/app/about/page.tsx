"use client"

import { ShieldCheck, Target, Users, Landmark, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#fdfcf5] pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Institutional Mission */}
        <section className="max-w-4xl mx-auto text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e67e22]/10 text-[#e67e22] text-[10px] font-black uppercase tracking-widest mb-6">
            <Landmark className="size-3" />
            Institutional Mission
          </div>
          <h1 className="text-4xl md:text-7xl font-serif font-bold italic text-slate-900 leading-tight mb-8">
            The Sovereignty of
            <span className="text-[#e67e22] block underline decoration-[#e67e22]/20">Vedic Wisdom</span>
          </h1>
          <p className="text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto">
            The Vedic Institutional Operating System (VIOS) is a global initiative dedicated 
            to the preservation, digitization, and dissemination of the ancient Vedic corpus.
          </p>
        </section>

        {/* Pillars Grid */}
        <div className="grid md:grid-cols-3 gap-12 mb-32">
          {[
            {
              title: "Preservation",
              desc: "Ensuring the mathematical precision of the oral and written Vedic traditions for eternity.",
              icon: ShieldCheck
            },
            {
              title: "Dissemination",
              desc: "Making the timeless teachings accessible to modern seekers through state-of-the-art technology.",
              icon: Target
            },
            {
              title: "Community",
              desc: "Building a global ecosystem of seekers, scholars, and sages committed to Dharmic living.",
              icon: Users
            }
          ].map((pillar) => (
            <div key={pillar.title} className="p-10 rounded-[3rem] bg-white border border-[#e8e4d9] text-center space-y-6 hover:shadow-2xl hover:shadow-[#e67e22]/5 transition-all">
              <div className="size-16 rounded-2xl bg-[#e67e22]/5 text-[#e67e22] flex items-center justify-center mx-auto">
                <pillar.icon className="size-8" />
              </div>
              <h3 className="text-2xl font-serif font-bold italic text-slate-900">{pillar.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm">{pillar.desc}</p>
            </div>
          ))}
        </div>

        {/* Vision Statement */}
        <section className="bg-slate-900 rounded-[4rem] p-16 md:p-24 relative overflow-hidden text-center text-white">
          <div className="absolute inset-0 bg-gradient-to-br from-[#e67e22]/20 to-transparent" />
          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <Heart className="size-12 text-[#e67e22] mx-auto opacity-50" />
            <h2 className="text-3xl md:text-5xl font-serif font-bold italic leading-tight">
              "Knowledge is that which liberates. Our vision is to illuminate the world with the light of Eternal Truth."
            </h2>
            <div className="pt-8 border-t border-white/10">
               <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#e67e22]">Sacred Vision • Vedic Institutional Protocol</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
