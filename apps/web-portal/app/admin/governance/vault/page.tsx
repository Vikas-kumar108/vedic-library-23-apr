import React from 'react'
import { 
  Folder, 
  FileText, 
  Search, 
  Plus, 
  Shield, 
  Share2, 
  Clock, 
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  ChevronRight,
  Filter
} from 'lucide-react'
import { Button } from '@/components/atoms/button'
import { Badge } from '@/components/atoms/badge'
import { cn } from '@/lib/utils'
import { getLegalDocuments } from '../actions'
import { format } from 'date-fns'

/**
 * Digital Locker (Institutional Vault)
 * Responsibility: High-resolution management of legal and financial documents.
 */

export default async function DigitalLocker() {
  const legalDocuments = await getLegalDocuments()

  const folders = [
    { name: 'Registration Docs', count: legalDocuments.filter(d => d.category === 'Registration').length, icon: Folder, color: 'text-blue-500', bg: 'bg-blue-50' },
    { name: 'Tax Certifications', count: legalDocuments.filter(d => d.category === 'Tax').length, icon: Folder, color: 'text-orange-500', bg: 'bg-orange-50' },
    { name: 'Financial Audits', count: legalDocuments.filter(d => d.category === 'Audit' || d.category === 'Financial').length, icon: Folder, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { name: 'Regulatory (FCRA)', count: legalDocuments.filter(d => d.category === 'Regulatory').length, icon: Folder, color: 'text-purple-500', bg: 'bg-purple-50' },
  ]

  return (
    <div className="p-10 space-y-10 animate-in fade-in duration-700">
      
      {/* Header Section */}
      <header className="flex justify-between items-end border-b border-slate-100 pb-10">
        <div className="space-y-4">
           <h1 className="text-4xl font-serif font-bold text-slate-900 tracking-tight italic">Digital <span className="text-blue-600">Locker</span></h1>
           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
             <Shield className="w-3 h-3 text-blue-500" /> Secure Institutional Depository
           </p>
        </div>
        <div className="flex gap-4">
           <Button variant="outline" className="h-14 px-8 border-slate-200 text-slate-900 font-black text-xs uppercase tracking-widest rounded-2xl">
              <Plus className="w-4 h-4 mr-2" /> Upload Document
           </Button>
           <Button className="h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-200">
              <Share2 className="w-4 h-4 mr-2" /> Secure Share
           </Button>
        </div>
      </header>

      {/* Folder Categories */}
      <div className="grid md:grid-cols-4 gap-6">
        {folders.map((folder, i) => (
          <div key={i} className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:border-blue-100 transition-all cursor-pointer group">
             <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6", folder.bg, folder.color)}>
                <folder.icon className="w-6 h-6" />
             </div>
             <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{folder.name}</h3>
             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{folder.count} Documents</p>
          </div>
        ))}
      </div>

      {/* Document List */}
      <section className="space-y-6">
         <div className="flex items-center justify-between">
            <h2 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em]">Recent Documents</h2>
            <div className="flex items-center gap-3">
               <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-300" />
                  <input type="text" placeholder="Search files..." className="h-9 pl-9 pr-4 bg-slate-50 border border-slate-100 rounded-xl text-[10px] outline-none" />
               </div>
               <Button variant="outline" className="h-9 px-4 rounded-xl border-slate-100 text-[10px] font-bold">
                  <Filter className="w-3 h-3 mr-2" /> Filter
               </Button>
            </div>
         </div>

         <div className="bg-white border border-slate-100 rounded-[3rem] overflow-hidden shadow-sm">
            <table className="w-full text-left">
               <thead>
                  <tr className="border-b border-slate-50">
                     <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Document Name</th>
                     <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</th>
                     <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                     <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Sensitivity</th>
                     <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Upload Date</th>
                     <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                  </tr>
               </thead>
                <tbody className="divide-y divide-slate-50">
                   {legalDocuments.map((doc) => (
                      <tr key={doc.id} className="group hover:bg-slate-50/50 transition-colors cursor-pointer">
                         <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                               <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                  <FileText className="w-4 h-4" />
                               </div>
                               <p className="text-sm font-bold text-slate-900">{doc.title}</p>
                            </div>
                         </td>
                         <td className="px-8 py-6">
                            <Badge variant="outline" className="rounded-full px-3 py-1 bg-slate-50 text-[9px] font-bold border-slate-100">
                               {doc.category}
                            </Badge>
                         </td>
                         <td className="px-8 py-6">
                            <div className="flex items-center gap-2">
                               {doc.status === 'VALID' && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                               {doc.status === 'VERIFIED' && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                               {doc.status === 'PENDING' && <Clock className="w-3 h-3 text-orange-500" />}
                               {doc.status === 'EXPIRED' && <AlertCircle className="w-3 h-3 text-red-500" />}
                               <span className={cn(
                                 "text-[9px] font-black uppercase tracking-widest",
                                 (doc.status === 'VALID' || doc.status === 'VERIFIED') ? "text-emerald-600" : 
                                 doc.status === 'PENDING' ? "text-orange-600" : "text-red-600"
                               )}>
                                  {doc.status}
                               </span>
                            </div>
                         </td>
                         <td className="px-8 py-6">
                            <p className={cn(
                               "text-[9px] font-black uppercase tracking-widest",
                               doc.sensitivity === 'RESTRICTED' ? "text-red-400" : "text-emerald-400"
                            )}>{doc.sensitivity}</p>
                         </td>
                         <td className="px-8 py-6">
                            <p className="text-xs font-bold text-slate-500">{format(new Date(doc.createdAt), 'dd MMM yyyy')}</p>
                         </td>
                         <td className="px-8 py-6 text-right">
                            <button className="p-2 text-slate-300 hover:text-slate-600">
                               <MoreVertical className="w-4 h-4" />
                            </button>
                         </td>
                      </tr>
                   ))}
                   {legalDocuments.length === 0 && (
                      <tr>
                         <td colSpan={6} className="px-8 py-20 text-center text-slate-400 italic text-xs">
                            No documents found in the institutional vault.
                         </td>
                      </tr>
                   )}
                </tbody>
            </table>
         </div>
      </section>

    </div>
  )
}
