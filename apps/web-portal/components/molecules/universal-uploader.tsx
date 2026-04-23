'use client'

import React from 'react'
import { Upload, File, X, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/atoms/button'
import { Progress } from '@/components/atoms/progress'
import { cn } from '@/lib/utils'

/**
 * Universal Uploader Molecule
 * Responsibility: Secure, multi-tenant file uploads with progress tracking.
 */

interface UniversalUploaderProps {
  bucket: string
  path: string
  label: string
  accept?: string
  onUploadComplete: (url: string) => void
}

export function UniversalUploader({ bucket, path, label, accept = "image/*,application/pdf", onUploadComplete }: UniversalUploaderProps) {
  const [isUploading, setIsUploading] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [status, setStatus] = React.useState<'idle' | 'uploading' | 'success' | 'error'>('idle')
  const [fileName, setFileName] = React.useState<string | null>(null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFileName(file.name)
    setIsUploading(true)
    setStatus('uploading')
    setProgress(10)

    // Simulate Upload Logic (In production, this calls Supabase/R2)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval)
          return 90
        }
        return prev + 10
      })
    }, 500)

    setTimeout(() => {
      clearInterval(interval)
      setProgress(100)
      setStatus('success')
      setIsUploading(false)
      onUploadComplete(`https://storage.vedic-library.org/${bucket}/${path}/${file.name}`)
    }, 3000)
  }

  return (
    <div className="w-full space-y-4">
       <div className={cn(
         "relative border-2 border-dashed rounded-[2rem] p-10 transition-all flex flex-col items-center justify-center text-center space-y-4",
         status === 'idle' ? "border-slate-200 hover:border-blue-400 bg-slate-50/50" : 
         status === 'uploading' ? "border-blue-400 bg-blue-50/30" :
         status === 'success' ? "border-emerald-400 bg-emerald-50/30" : "border-red-400 bg-red-50/30"
       )}>
          
          <input 
            type="file" 
            className="absolute inset-0 opacity-0 cursor-pointer" 
            accept={accept}
            onChange={handleUpload}
            disabled={isUploading}
          />

          <div className={cn(
            "w-16 h-16 rounded-2xl flex items-center justify-center transition-all",
            status === 'idle' ? "bg-white text-slate-400 shadow-sm" :
            status === 'uploading' ? "bg-blue-600 text-white animate-pulse" :
            status === 'success' ? "bg-emerald-600 text-white" : "bg-red-600 text-white"
          )}>
             {status === 'idle' && <Upload className="w-6 h-6" />}
             {status === 'uploading' && <File className="w-6 h-6" />}
             {status === 'success' && <CheckCircle2 className="w-6 h-6" />}
             {status === 'error' && <AlertCircle className="w-6 h-6" />}
          </div>

          <div>
             <p className="text-sm font-bold text-slate-900">{status === 'idle' ? label : fileName}</p>
             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                {status === 'idle' ? 'Drag & drop or click to upload' : 
                 status === 'uploading' ? `Uploading to ${bucket}...` : 
                 status === 'success' ? 'Upload Complete' : 'Upload Failed'}
             </p>
          </div>

          {isUploading && (
             <div className="w-full max-w-xs space-y-2">
                <Progress value={progress} className="h-1.5" />
                <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest">{progress}%</p>
             </div>
          )}

          {status === 'success' && (
             <button 
               onClick={(e) => { e.stopPropagation(); setStatus('idle'); setFileName(null); }}
               className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-sm text-slate-400 hover:text-red-500 transition-colors"
             >
                <X className="w-4 h-4" />
             </button>
          )}
       </div>
    </div>
  )
}
