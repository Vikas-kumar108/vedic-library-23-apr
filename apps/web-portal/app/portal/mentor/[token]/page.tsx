import React from 'react'
import { 
  Users, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  MessageSquare,
  ChevronRight,
  TrendingUp,
  MapPin
} from 'lucide-react'
import { Button } from '@/components/atoms/button'
import { Badge } from '@/components/atoms/badge'
import { cn } from '@/lib/utils'

/**
 * Mentor External Portal
 * Responsibility: Allow mentors to manage assigned students without admin access.
 * Path: /portal/mentor/[token]
 */

import { getMentorStudents } from '../../actions'

export default async function MentorPortal({ params }: { params: { token: string } }) {
  // In a real app, token would resolve to a mentorId. Using dummy mentorId for now.
  const mentorId = '00000000-0000-0000-0000-000000000000'
  const assignedStudents = await getMentorStudents(mentorId)
  return (
    <div className="min-h-screen bg-white p-10 space-y-12 animate-in fade-in duration-1000">
      
      {/* Mentor Header */}
      <header className="max-w-6xl mx-auto flex justify-between items-end border-b border-slate-100 pb-10">
        <div className="space-y-4">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-2xl flex items-center justify-center text-white">
                 <BookOpen className="w-5 h-5" />
              </div>
              <h1 className="text-3xl font-serif font-bold text-slate-900 tracking-tight italic">Mentor <span className="text-emerald-600">Gateway</span></h1>
           </div>
           <div className="flex items-center gap-4">
              <Badge variant="outline" className="h-7 px-4 rounded-full border-slate-200 text-slate-500 font-bold uppercase tracking-widest text-[8px]">
                Authorized Mentor Access
              </Badge>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
                <Users className="w-3 h-3 text-emerald-500" /> {assignedStudents.length} Students Assigned
              </p>
           </div>
        </div>
        <Button className="h-12 px-8 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all">
          Schedule Group Session
        </Button>
      </header>

      {/* Student Management Grid */}
      <main className="max-w-6xl mx-auto grid lg:grid-cols-1 gap-8">
         <section className="space-y-6">
            <div className="flex items-center justify-between">
               <h2 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em]">Assigned Students</h2>
               <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600">Active</button>
                  <button className="px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-400">Completed</button>
               </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
               {assignedStudents.map((student) => (
                  <div key={student.id} className="group p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem] hover:bg-white hover:shadow-2xl hover:border-emerald-100 transition-all cursor-pointer">
                     <div className="space-y-6">
                        <div className="flex justify-between items-start">
                           <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
                              <Users className="w-6 h-6" />
                           </div>
                           <Badge className="bg-white text-emerald-600 text-[8px] font-black tracking-widest border border-emerald-50">
                              ACTIVE GROWTH
                           </Badge>
                        </div>
                        <div className="space-y-1">
                           <h3 className="text-xl font-bold text-slate-900">{student.profile?.full_name || 'Unknown'}</h3>
                           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1 italic">
                              <MapPin className="w-3 h-3" /> {student.profile?.village || 'Unknown Village'}
                           </p>
                        </div>
                        <div className="space-y-3">
                           <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                              <span>Stage</span>
                              <span className="text-slate-900">{student.spiritual?.ageGroup || 'Sadhaka'}</span>
                           </div>
                           <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: `50%` }} />
                           </div>
                        </div>
                        <Button variant="ghost" className="w-full h-12 rounded-xl border border-slate-200 text-slate-900 font-black text-[10px] uppercase tracking-widest group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 transition-all">
                           Open Guidance Log <ChevronRight className="ml-2 w-4 h-4" />
                        </Button>
                     </div>
                  </div>
               ))}
            </div>
         </section>

         {/* Mentor Action Center */}
         <section className="grid md:grid-cols-2 gap-10">
            <div className="p-10 bg-slate-900 rounded-[3rem] text-white space-y-6 relative overflow-hidden group">
               <div className="relative z-10 space-y-4">
                  <h3 className="text-2xl font-serif font-bold italic leading-tight">Wisdom <span className="text-emerald-400">Resources</span></h3>
                  <p className="text-white/40 text-sm leading-relaxed italic">Access curated study material and booklets to share with your students in their local language.</p>
                  <Button variant="ghost" className="h-12 bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-white hover:text-slate-900 transition-all">
                     Enter Mentor Vault
                  </Button>
               </div>
               <TrendingUp className="absolute top-0 right-0 p-10 w-48 h-48 opacity-5 group-hover:scale-110 transition-transform duration-1000" />
            </div>

            <div className="p-10 bg-emerald-50 rounded-[3rem] space-y-6 flex flex-col justify-between group">
               <div className="space-y-4">
                  <h3 className="text-2xl font-serif font-bold italic text-slate-900">Communication <span className="text-emerald-600">Channel</span></h3>
                  <p className="text-slate-500 text-sm leading-relaxed italic">Direct channel to the Admin team for reporting student needs or requesting special aid.</p>
               </div>
               <Button variant="ghost" className="h-12 justify-between bg-white text-emerald-600 font-black text-[10px] uppercase tracking-widest rounded-xl shadow-sm hover:shadow-xl transition-all">
                  Contact Outreach Lead <MessageSquare className="w-4 h-4" />
               </Button>
            </div>
         </section>
      </main>

      <footer className="max-w-6xl mx-auto text-center py-10 opacity-40">
         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">&copy; 2026 VEDIC LIBRARY MENTOR GATEWAY</p>
      </footer>

    </div>
  )
}
