'use client'

import React from 'react'
import { CheckCircle2, AlertCircle, X, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * CRM Feedback Modal (Zoho-Grade)
 * Responsibility: Provide clear, professional success/error feedback.
 */

interface FeedbackModalProps {
  isOpen: boolean
  type: 'success' | 'error' | 'loading'
  title: string
  message: string
  onClose?: () => void
}

export function FeedbackModal({ isOpen, type, title, message, onClose }: FeedbackModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-sm bg-white rounded-sm shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-8 text-center space-y-6">
          <div className="flex justify-center">
            {type === 'success' && (
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-500">
                <CheckCircle2 className="w-10 h-10" />
              </div>
            )}
            {type === 'error' && (
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500">
                <AlertCircle className="w-10 h-10" />
              </div>
            )}
            {type === 'loading' && (
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
                <Loader2 className="w-10 h-10 animate-spin" />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-900">{title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{message}</p>
          </div>

          {type !== 'loading' && (
            <button 
              onClick={onClose}
              className={cn(
                "w-full h-11 rounded-sm text-xs font-black uppercase tracking-widest transition-all",
                type === 'success' ? "bg-slate-900 text-white hover:bg-slate-800" : "bg-red-600 text-white hover:bg-red-700"
              )}
            >
              Close Notification
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
