'use client'

import React from 'react'
import { 
  FileText, 
  Upload, 
  Plus, 
  Search, 
  Book, 
  Layout, 
  CheckCircle2, 
  Clock,
  MoreVertical,
  Globe
} from 'lucide-react'
import { Button } from '@/components/atoms/button'
import { Badge } from '@/components/atoms/badge'
import { UniversalUploader } from '@/components/molecules/universal-uploader'
import { BUCKET_NAMES, StorageService } from '@/lib/storage'
import { cn } from '@/lib/utils'

/**
 * Institutional Content Manager
 * Responsibility: Master upload and management of books, booklets, and articles.
 */

const RECENT_UPLOADS = [
  { id: '1', title: 'Gita_for_Youth_v2.pdf', type: 'Booklet', status: 'PUBLIC', downloads: 1240, date: '10 Apr 2026' },
  { id: '2', name: 'Practical_Dharma_Guide.pdf', type: 'Article', status: 'RESTRICTED', downloads: 450, date: '15 Apr 2026' },
  { id: '3', name: 'Annual_Spiritual_Report.pdf', type: 'Book', status: 'PUBLIC', downloads: 890, date: '05 Apr 2026' },
]

export default function ContentManagement() {
  const [showUploader, setShowUploader] = React.useState(false)

  return (
    <div className="p-10 space-y-10 animate-in fade-in duration-700">
      
      {/* Header Section */}
      <header className="flex justify-between items-end border-b border-slate-100 pb-10">
        <div className="space-y-4">
           <h1 className="text-4xl font-serif font-bold text-slate-900 tracking-tight italic">Wisdom <span className="text-blue-600">Manager</span></h1>
           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
             <Globe className="w-3 h-3 text-blue-500" /> Managing Institutional Media & Documents
           </p>
        </div>
        <Button onClick={() => setShowUploader(!showUploader)} className="h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-200 transition-all">
          <Plus className="w-4 h-4 mr-2" /> Upload New Wisdom
        </Button>
      </header>

      {/* Upload Drawer (Conditional) */}
      {showUploader && (
        <section className="p-10 bg-blue-50/50 border border-blue-100 rounded-[3rem] space-y-8 animate-in slide-in-from-top-10 duration-500">
           <div className="flex justify-between items-center">
              <h3 className="text-xl font-serif font-bold italic text-slate-900">Upload Wisdom Resource</h3>
              <Button variant="ghost" onClick={() => setShowUploader(false)} className="text-slate-400 hover:text-red-500">Close</Button>
           </div>
           <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Resource Title</label>
                    <input type="text" placeholder="e.g. Bhagavad Gita Simplified" className="w-full h-14 bg-white border border-slate-100 rounded-2xl px-6 text-sm focus:border-blue-400 outline-none transition-all" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Category</label>
                    <select className="w-full h-14 bg-white border border-slate-100 rounded-2xl px-6 text-sm focus:border-blue-400 outline-none transition-all">
                       <option>Booklet</option>
                       <option>Full Book</option>
                       <option>Article</option>
                       <option>Research Paper</option>
                    </select>
                 </div>
              </div>
              <UniversalUploader 
                bucket={BUCKET_NAMES.CONTENT} 
                path="books" 
                label="Upload PDF or eBook" 
                accept="application/pdf"
                onUploadComplete={(url) => console.log('File Ready:', url)}
              />
           </div>
        </section>
      )}

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        {[
          { label: 'Total eBooks', count: 124, icon: Book, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Booklets', count: 450, icon: Layout, color: 'text-orange-500', bg: 'bg-orange-50' },
          { label: 'Articles', count: 890, icon: FileText, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'Downloads', count: '12.4k', icon: CheckCircle2, color: 'text-purple-500', bg: 'bg-purple-50' },
        ].map((stat, i) => (
          <div key={i} className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all">
             <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6", stat.bg, stat.color)}>
                <stat.icon className="w-6 h-6" />
             </div>
             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{stat.label}</p>
             <h3 className="text-2xl font-black text-slate-900 mt-1">{stat.count}</h3>
          </div>
        ))}
      </div>

      {/* Library Table */}
      <section className="space-y-6">
         <div className="flex items-center justify-between">
            <h2 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em]">Wisdom Library</h2>
            <div className="relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-300" />
               <input type="text" placeholder="Search resources..." className="h-9 pl-9 pr-4 bg-slate-50 border border-slate-100 rounded-xl text-[10px] outline-none" />
            </div>
         </div>

         <div className="bg-white border border-slate-100 rounded-[3rem] overflow-hidden shadow-sm">
            <table className="w-full text-left">
               <thead>
                  <tr className="border-b border-slate-50">
                     <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Resource Name</th>
                     <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                     <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Visibility</th>
                     <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Downloads</th>
                     <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {RECENT_UPLOADS.map((resource) => (
                     <tr key={resource.id} className="group hover:bg-slate-50/50 transition-colors cursor-pointer">
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                 <Book className="w-4 h-4" />
                              </div>
                              <p className="text-sm font-bold text-slate-900">{resource.title || resource.name}</p>
                           </div>
                        </td>
                        <td className="px-8 py-6">
                           <Badge variant="outline" className="rounded-full px-3 py-1 bg-slate-50 text-[8px] font-bold border-slate-100">
                              {resource.type}
                           </Badge>
                        </td>
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-2">
                              {resource.status === 'PUBLIC' ? <Globe className="w-3 h-3 text-emerald-500" /> : <Clock className="w-3 h-3 text-orange-500" />}
                              <span className={cn(
                                "text-[8px] font-black uppercase tracking-widest",
                                resource.status === 'PUBLIC' ? "text-emerald-600" : "text-orange-600"
                              )}>
                                 {resource.status}
                              </span>
                           </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                           <p className="text-xs font-bold text-slate-900">{resource.downloads}</p>
                        </td>
                        <td className="px-8 py-6 text-right">
                           <button className="p-2 text-slate-300 hover:text-slate-600">
                              <MoreVertical className="w-4 h-4" />
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </section>

    </div>
  )
}
