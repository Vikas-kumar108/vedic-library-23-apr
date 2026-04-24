'use client'

import React, { useState } from 'react'
import { 
  X, 
  Send, 
  Book, 
  MessageCircle, 
  ShieldCheck,
  CheckCircle2,
  Loader2
} from 'lucide-react'
import { Button } from '@/components/atoms/button'
import { cn } from '@/lib/utils'

interface RequestShastraModalProps {
  isOpen: boolean
  onClose: () => void
}

export const RequestShastraModal: React.FC<RequestShastraModalProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    shastraName: '',
    details: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate manifestation of the request
    // In a real scenario, this would call our API Gateway
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setTimeout(onClose, 3000)
    }, 2000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4 animate-in fade-in duration-500">
      <div className="bg-white w-full max-w-xl rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 flex flex-col">
        
        {/* Modal Header */}
        <header className="p-10 text-center space-y-2 relative">
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 p-2 hover:bg-slate-50 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-slate-300" />
          </button>
          
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Book className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-serif font-bold italic text-slate-900">Request a <span className="text-blue-600">Shastra</span></h2>
          <p className="text-slate-400 text-sm max-w-xs mx-auto">Tell us which sacred text you wish to see manifest in our library.</p>
        </header>

        {/* Success State */}
        {success ? (
          <div className="p-20 text-center space-y-6 animate-in zoom-in duration-500">
             <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
             </div>
             <div className="space-y-2">
                <h3 className="text-2xl font-serif font-bold italic text-slate-900">Request Received</h3>
                <p className="text-slate-500 text-sm leading-relaxed">Your aspiration has been recorded in the institutional logs. We will notify you via <strong>wisdom@vedicskills.com</strong> once manifest.</p>
             </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-10 pt-0 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Your Name</label>
                <input 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full h-14 px-6 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 font-bold text-sm"
                  placeholder="Seer Name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                <input 
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full h-14 px-6 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 font-bold text-sm"
                  placeholder="seeker@path.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Shastra Name</label>
              <input 
                required
                value={formData.shastraName}
                onChange={(e) => setFormData({...formData, shastraName: e.target.value})}
                className="w-full h-14 px-6 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 font-bold text-sm"
                placeholder="e.g. Yoga Vasistha, Brahma Sutras..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Additional Details (Optional)</label>
              <textarea 
                rows={3}
                value={formData.details}
                onChange={(e) => setFormData({...formData, details: e.target.value})}
                className="w-full p-6 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 font-bold text-sm resize-none"
                placeholder="Specific chapter, commentator, or language preference..."
              />
            </div>

            <Button 
              disabled={loading}
              className="w-full h-16 bg-slate-900 hover:bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-200 transition-all"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4 mr-2" /> Manifest Request</>}
            </Button>
            
            <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest pt-4">
              <ShieldCheck className="w-3 h-3 text-blue-500" /> Sovereign Institutional Request
            </div>
          </form>
        )}

      </div>
    </div>
  )
}
