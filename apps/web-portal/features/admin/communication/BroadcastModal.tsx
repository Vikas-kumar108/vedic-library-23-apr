'use client'

import React, { useState, useEffect } from 'react'
import { 
  X, 
  Send, 
  Users, 
  Layers, 
  BookOpen, 
  Search,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react'
import { Button } from '@/components/atoms/button'
import { Badge } from '@/components/atoms/badge'
import { cn } from '@/lib/utils'

interface BroadcastModalProps {
  isOpen: boolean
  onClose: () => void
}

export const BroadcastModal: React.FC<BroadcastModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [contentList, setContentList] = useState<any[]>([])
  const [selectedContent, setSelectedContent] = useState<any>(null)
  const [audienceType, setAudienceType] = useState<'ALL' | 'ROLE' | 'STAGE' | 'INDIVIDUAL'>('ALL')
  const [audienceValue, setAudienceValue] = useState('')
  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null)

  // Fetch shastra content for selection
  useEffect(() => {
    if (isOpen) {
      const fetchContent = async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/library/contents?limit=10`)
          const data = await res.json()
          setContentList(data.contents || [])
        } catch (err) {
          console.error('Failed to fetch shastra content', err)
        }
      }
      fetchContent()
    }
  }, [isOpen])

  const handleBroadcast = async () => {
    setLoading(true)
    setStatus(null)
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/institutional/broadcast/broadcast`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentId: selectedContent.id,
          criteria: {
            allUsers: audienceType === 'ALL',
            role: audienceType === 'ROLE' ? audienceValue : undefined,
            stage: audienceType === 'STAGE' ? audienceValue : undefined,
          }
        })
      })

      const result = await res.json()
      if (res.ok) {
        setStatus({ 
          success: true, 
          message: `Broadcast manifest! ${result.successful} transmissions successful.` 
        })
        setTimeout(onClose, 3000)
      } else {
        throw new Error(result.error || 'Broadcast failed')
      }
    } catch (err: any) {
      setStatus({ success: false, message: err.message })
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <header className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
          <div>
            <h2 className="text-2xl font-serif font-bold italic text-slate-900">Wisdom <span className="text-blue-600">Broadcast</span></h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Institutional Outreach Manifestor</p>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-slate-100 rounded-2xl transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          
          {step === 1 && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-500" /> 1. Select Shastra Content
                </h3>
              </div>

              <div className="grid gap-4">
                {contentList.map((content) => (
                  <div 
                    key={content.id}
                    onClick={() => setSelectedContent(content)}
                    className={cn(
                      "p-6 border rounded-[2rem] transition-all cursor-pointer group",
                      selectedContent?.id === content.id 
                        ? "border-blue-600 bg-blue-50 shadow-lg shadow-blue-100" 
                        : "border-slate-100 hover:border-blue-200 hover:bg-slate-50"
                    )}
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{content.title}</p>
                        <p className="text-[10px] text-slate-400 font-medium line-clamp-1 italic">{content.text}</p>
                      </div>
                      {selectedContent?.id === content.id && <CheckCircle2 className="w-5 h-5 text-blue-600" />}
                    </div>
                  </div>
                ))}
              </div>
              
              <Button 
                disabled={!selectedContent}
                onClick={() => setStep(2)}
                className="w-full h-14 bg-slate-900 text-white rounded-2xl font-bold uppercase tracking-widest text-xs"
              >
                Next: Select Audience
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
               <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-500" /> 2. Define Audience
               </h3>

               <div className="grid grid-cols-2 gap-4">
                 {[
                   { id: 'ALL', label: 'All Seekers', icon: Users, desc: 'Every registered user' },
                   { id: 'STAGE', label: 'By Maturity', icon: Layers, desc: 'Filter by Spiritual Stage' },
                   { id: 'ROLE', label: 'By Role', icon: CheckCircle2, desc: 'Admins, Scholars, etc.' },
                   { id: 'INDIVIDUAL', label: 'Manual', icon: Search, desc: 'Specific User IDs' },
                 ].map((type) => (
                   <div 
                    key={type.id}
                    onClick={() => setAudienceType(type.id as any)}
                    className={cn(
                      "p-6 border rounded-[2rem] transition-all cursor-pointer group flex flex-col gap-3",
                      audienceType === type.id 
                        ? "border-blue-600 bg-blue-50 shadow-lg shadow-blue-100" 
                        : "border-slate-100 hover:border-blue-200 hover:bg-slate-50"
                    )}
                   >
                     <type.icon className={cn("w-5 h-5", audienceType === type.id ? "text-blue-600" : "text-slate-400")} />
                     <div>
                       <p className="text-xs font-bold text-slate-900">{type.label}</p>
                       <p className="text-[10px] text-slate-400">{type.desc}</p>
                     </div>
                   </div>
                 ))}
               </div>

               {audienceType !== 'ALL' && (
                 <div className="space-y-4">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Specify Value</p>
                   <input 
                    type="text" 
                    value={audienceValue}
                    onChange={(e) => setAudienceValue(e.target.value)}
                    placeholder={audienceType === 'STAGE' ? 'e.g. GRHASTHA, BRAHMACARI' : 'Enter value...'}
                    className="w-full h-14 px-6 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-bold"
                   />
                 </div>
               )}

               <div className="flex gap-4">
                 <Button onClick={() => setStep(1)} variant="outline" className="flex-1 h-14 rounded-2xl font-bold uppercase tracking-widest text-xs">
                   Back
                 </Button>
                 <Button 
                   onClick={handleBroadcast}
                   disabled={loading || (audienceType !== 'ALL' && !audienceValue)}
                   className="flex-[2] h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold uppercase tracking-widest text-xs shadow-xl shadow-blue-100"
                 >
                   {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-4 h-4 mr-2" /> Manifest Broadcast</>}
                 </Button>
               </div>
            </div>
          )}

          {status && (
            <div className={cn(
              "p-6 rounded-[2rem] flex items-center gap-4 animate-in zoom-in duration-300",
              status.success ? "bg-green-50 text-green-700 border border-green-100" : "bg-red-50 text-red-700 border border-red-100"
            )}>
              {status.success ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
              <p className="text-sm font-bold">{status.message}</p>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <footer className="p-8 border-t border-slate-50 bg-slate-50/30 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className={cn("w-2 h-2 rounded-full", step === 1 ? "bg-blue-600" : "bg-slate-300")} />
            <div className={cn("w-2 h-2 rounded-full", step === 2 ? "bg-blue-600" : "bg-slate-300")} />
          </div>
          <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">Pillar IV • Communication</p>
        </footer>

      </div>
    </div>
  )
}
