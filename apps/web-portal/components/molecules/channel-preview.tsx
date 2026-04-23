'use client'

import React from 'react'
import { Mail, MessageSquare, Phone, Tablet } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Channel Preview Molecule
 * Responsibility: Visualize how a message looks across different segregated channels.
 */

interface ChannelPreviewProps {
  type: 'EMAIL' | 'WHATSAPP' | 'SMS' | 'PORTAL_NOTICE'
  content: string
  title?: string
}

export function ChannelPreview({ type, content, title }: ChannelPreviewProps) {
  return (
    <div className="space-y-6">
       <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
             {type === 'EMAIL' && <Mail className="w-4 h-4" />}
             {type === 'WHATSAPP' && <MessageSquare className="w-4 h-4" />}
             {type === 'SMS' && <Phone className="w-4 h-4" />}
             {type === 'PORTAL_NOTICE' && <Tablet className="w-4 h-4" />}
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{type} Preview</span>
       </div>

       <div className="relative border border-slate-100 rounded-[2.5rem] p-8 bg-slate-50 shadow-inner min-h-[300px] flex flex-col items-center justify-center">
          
          {/* WHATSAPP MOCKUP */}
          {type === 'WHATSAPP' && (
             <div className="w-full max-w-[280px] bg-emerald-50 rounded-2xl p-4 border border-emerald-100 shadow-xl relative animate-in zoom-in duration-500">
                <div className="flex items-center gap-2 mb-3">
                   <div className="w-6 h-6 bg-emerald-600 rounded-full" />
                   <span className="text-[10px] font-bold text-emerald-900 tracking-tight">Vedic Library Official</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">{content || 'Type your spiritual message...'}</p>
                <div className="text-[8px] text-slate-400 text-right mt-2 font-bold">12:30 PM ✓✓</div>
             </div>
          )}

          {/* EMAIL MOCKUP */}
          {type === 'EMAIL' && (
             <div className="w-full bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in duration-500">
                <div className="bg-slate-900 p-6 text-center">
                   <h1 className="text-xl font-serif font-bold italic text-white">{title || 'Vedic Newsletter'}</h1>
                </div>
                <div className="p-8 space-y-4">
                   <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">{content || 'Your personalized newsletter content...'}</p>
                   <hr className="border-slate-100" />
                   <p className="text-[10px] text-slate-400 italic text-center">You are receiving this as a member of the Vedic Community.</p>
                </div>
             </div>
          )}

          {/* SMS MOCKUP */}
          {type === 'SMS' && (
             <div className="w-full max-w-[240px] bg-slate-200 rounded-[2rem] p-4 animate-in slide-in-from-bottom-5 duration-500">
                <div className="bg-white rounded-xl p-3 text-xs text-slate-700 shadow-sm leading-tight">
                   {content || 'Short SMS content...'}
                </div>
             </div>
          )}

       </div>
    </div>
  )
}
