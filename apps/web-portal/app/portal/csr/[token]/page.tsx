'use client'

import React from 'react'
import { 
  Shield, 
  Lock, 
  FileText, 
  Download, 
  ExternalLink,
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/atoms/button'
import { Badge } from '@/components/atoms/badge'
import { cn } from '@/lib/utils'

/**
 * CSR Partner External Portal
 * Responsibility: Provide controlled, temporary access to legal and financial docs.
 * Path: /portal/csr/[token]
 */

export default function CSRPortal({ params }: { params: { token: string } }) {
  // In a real scenario, we would validate the token here.
  const [isValidating, setIsValidating] = React.useState(true)
  
  React.useEffect(() => {
    // Simulate token validation
    setTimeout(() => setIsValidating(false), 1500)
  }, [])

  if (isValidating) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50 font-serif italic text-slate-400">
        Authenticating Secure Portal Access...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 p-10 space-y-12 animate-in fade-in duration-1000">
      
      {/* Portal Header */}
      <header className="max-w-6xl mx-auto flex justify-between items-center bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
        <div className="space-y-2">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold">V</div>
              <h1 className="text-2xl font-serif font-bold text-slate-900 tracking-tight">Institutional <span className="text-blue-600">Vault Portal</span></h1>
           </div>
           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
             <Shield className="w-3 h-3 text-blue-500" /> Secure CSR Partner Access
           </p>
        </div>
        <div className="text-right">
           <Badge className="bg-orange-50 text-orange-600 border-orange-100 mb-2">Expires in 4h 20m</Badge>
           <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Purpose: Annual Audit FY24</p>
        </div>
      </header>

      {/* Main Portal View */}
      <main className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_350px] gap-10">
        
        <div className="space-y-10">
           <section className="space-y-6">
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em]">Shared Document Package</h2>
              <div className="grid md:grid-cols-2 gap-6">
                 {[
                   { name: 'Trust_Registration_12AB.pdf', size: '2.4 MB', category: 'Tax' },
                   { name: 'Annual_Audit_Report_2024.pdf', size: '4.8 MB', category: 'Financial' },
                   { name: 'FCRA_Compliance_Certificate.pdf', size: '1.2 MB', category: 'Regulatory' },
                   { name: 'Institutional_PAN_Card.pdf', size: '0.5 MB', category: 'Identity' },
                 ].map((doc, i) => (
                    <div key={i} className="group p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:border-blue-100 transition-all cursor-pointer">
                       <div className="flex justify-between items-start mb-6">
                          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                             <FileText className="w-6 h-6" />
                          </div>
                          <Badge variant="outline" className="text-[8px] font-black tracking-widest text-slate-400 border-slate-100">
                             {doc.size}
                          </Badge>
                       </div>
                       <h3 className="text-sm font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">{doc.name}</h3>
                       <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">{doc.category}</p>
                       <Button variant="ghost" className="w-full mt-6 h-10 rounded-xl bg-slate-50 text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">
                          <Download className="w-3 h-3 mr-2" /> Download
                       </Button>
                    </div>
                 ))}
              </div>
           </section>
        </div>

        <aside className="space-y-8">
           {/* Security Verification Card */}
           <section className="bg-slate-900 p-10 rounded-[3rem] text-white space-y-6 shadow-2xl relative overflow-hidden group">
              <div className="relative z-10 space-y-6">
                 <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">Authenticity Verified</span>
                 </div>
                 <h3 className="text-2xl font-serif font-bold italic leading-tight">Institutional Integrity Shield</h3>
                 <p className="text-white/40 text-sm leading-relaxed">This portal provides cryptographically verified documents directly from the Vedic Library depository.</p>
                 <div className="pt-4 border-t border-white/5 space-y-4">
                    <div className="flex justify-between text-[10px]">
                       <span className="text-white/40 font-bold uppercase">Issued To</span>
                       <span className="font-bold">Reliance Foundation (CSR)</span>
                    </div>
                    <div className="flex justify-between text-[10px]">
                       <span className="text-white/40 font-bold uppercase">Access ID</span>
                       <span className="font-bold font-mono">TX-9902-Z</span>
                    </div>
                 </div>
              </div>
              <Lock className="absolute top-0 right-0 p-10 w-48 h-48 opacity-5 group-hover:scale-110 transition-transform duration-1000" />
           </section>

           <div className="p-8 bg-blue-50 border border-blue-100 rounded-[2.5rem] space-y-4">
              <h4 className="text-xs font-bold text-slate-900">Need more documents?</h4>
              <p className="text-[10px] text-slate-500 italic leading-relaxed">If you require additional filings for your audit, please request them via the secure channel.</p>
              <Button variant="ghost" className="w-full h-10 bg-white text-[10px] font-black uppercase tracking-widest text-blue-600 shadow-sm">
                 Request Additional <ArrowRight className="ml-2 w-3 h-3" />
              </Button>
           </div>
        </aside>

      </main>

      <footer className="max-w-6xl mx-auto text-center py-10">
         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">&copy; 2026 VEDIC LIBRARY INSTITUTIONAL DEPOSITORY</p>
      </footer>

    </div>
  )
}
