'use client'

import React, { useState } from 'react'
import { 
  X, 
  Send, 
  BookOpen, 
  Zap,
  ShieldCheck,
  Sparkles,
  Users,
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
  const [requestType, setRequestType] = useState<'SPECIFIC' | 'STREAM'>('SPECIFIC')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    shastraName: '',
    topic: 'MIND_CONTROL',
    details: ''
  })

  const topics = [
    { id: 'MIND_CONTROL', label: 'Mind & Emotion Control', icon: Zap },
    { id: 'ETHICS', label: 'Dharma & Ethical Living', icon: ShieldCheck },
    { id: 'DEVOTION', label: 'Bhakti & Inner Peace', icon: Sparkles },
    { id: 'LEADERSHIP', label: 'Vedic Leadership & Artha', icon: Users },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate manifestation
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setTimeout(() => {
        onClose()
        setSuccess(false)
        setRequestType('SPECIFIC')
      }, 4000)
    }, 2000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4 animate-in fade-in duration-500">
      <div className="bg-white w-full max-w-xl rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 flex flex-col">
        
        {/* Modal Header */}
        <header className="p-10 text-center space-y-2 relative bg-slate-50/50">
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-slate-300" />
          </button>
          
          <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-100">
            <BookOpen className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-serif font-bold italic text-slate-900">Wisdom <span className="text-blue-600">Invocation</span></h2>
          <p className="text-slate-400 text-sm max-w-xs mx-auto">Connect with the eternal streams of Shastric knowledge.</p>
        </header>

        {/* Success State */}
        {success ? (
          <div className="p-20 text-center space-y-6 animate-in zoom-in duration-500">
             <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
             </div>
             <div className="space-y-2">
                <h3 className="text-2xl font-serif font-bold italic text-slate-900">
                  {requestType === 'SPECIFIC' ? 'Request Manifest' : 'Stream Activated'}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {requestType === 'SPECIFIC' 
                    ? 'Your aspiration for this sacred text has been recorded. We will notify you once it is manifest in our vault.' 
                    : 'Your Wisdom Stream is now active. You will begin receiving themed revelations from various Shastras shortly.'}
                </p>
             </div>
          </div>
        ) : (
          <div className="p-10 pt-0 space-y-8 mt-8">
            
            {/* Request Type Selector */}
            <div className="flex p-1 bg-slate-100 rounded-2xl">
              <button 
                onClick={() => setRequestType('SPECIFIC')}
                className={cn(
                  "flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all",
                  requestType === 'SPECIFIC' ? "bg-white text-blue-600 shadow-sm" : "text-slate-400"
                )}
              >
                Specific Text
              </button>
              <button 
                onClick={() => setRequestType('STREAM')}
                className={cn(
                  "flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all",
                  requestType === 'STREAM' ? "bg-white text-blue-600 shadow-sm" : "text-slate-400"
                )}
              >
                Wisdom Stream
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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

              {requestType === 'SPECIFIC' ? (
                <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Shastra / Verse Name</label>
                    <input 
                      required
                      value={formData.shastraName}
                      onChange={(e) => setFormData({...formData, shastraName: e.target.value})}
                      className="w-full h-14 px-6 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 font-bold text-sm"
                      placeholder="e.g. Yoga Vasistha Chapter 2..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Context</label>
                    <textarea 
                      rows={2}
                      value={formData.details}
                      onChange={(e) => setFormData({...formData, details: e.target.value})}
                      className="w-full p-6 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 font-bold text-sm resize-none"
                      placeholder="Why are you seeking this text?"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select your Spiritual Stream</p>
                   <div className="grid grid-cols-2 gap-3">
                     {topics.map((t) => (
                       <div 
                        key={t.id}
                        onClick={() => setFormData({...formData, topic: t.id})}
                        className={cn(
                          "p-4 border rounded-2xl transition-all cursor-pointer flex items-center gap-3",
                          formData.topic === t.id ? "border-blue-600 bg-blue-50" : "border-slate-100 hover:bg-slate-50"
                        )}
                       >
                         <t.icon className={cn("w-4 h-4", formData.topic === t.id ? "text-blue-600" : "text-slate-400")} />
                         <span className={cn("text-[10px] font-bold", formData.topic === t.id ? "text-slate-900" : "text-slate-500")}>{t.label}</span>
                       </div>
                     ))}
                   </div>
                </div>
              )}

              <Button 
                disabled={loading}
                className="w-full h-16 bg-slate-900 hover:bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-200 transition-all"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4 mr-2" /> Activate {requestType === 'SPECIFIC' ? 'Request' : 'Stream'}</>}
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
