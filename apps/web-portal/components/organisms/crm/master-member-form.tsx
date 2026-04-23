'use client'

import React from 'react'
import { 
  User, 
  Phone, 
  MapPin, 
  Users, 
  Shield, 
  Calendar, 
  HeartHandshake, 
  Gift, 
  GraduationCap, 
  UserCheck, 
  Image as ImageIcon, 
  FileText, 
  Settings as SettingsIcon,
  Activity,
  ChevronRight,
  Save,
  Clock
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/atoms/button'
import { upsertMemberRecord } from '@/app/admin/community/actions'
import { FeedbackModal } from './feedback-modal'

/**
 * 16-Tab Master Person Form (Zoho-Grade)
 * Responsibility: Exhaustive community management with zero distraction.
 */

const SECTIONS = [
  { id: 'identity', label: 'Basic Identity', icon: User },
  { id: 'contact', label: 'Contact Information', icon: Phone },
  { id: 'address', label: 'Address & Geography', icon: MapPin },
  { id: 'family', label: 'Family & Relationships', icon: Users },
  { id: 'personal', label: 'Personal Attributes', icon: UserCheck },
  { id: 'roles', label: 'Roles & Status', icon: Shield },
  { id: 'events', label: 'Event Participation', icon: Calendar },
  { id: 'contributions', label: 'Contributions (Seva)', icon: HeartHandshake },
  { id: 'benefits', label: 'Benefits Received', icon: Gift },
  { id: 'mentorship', label: 'Mentorship / Training', icon: GraduationCap },
  { id: 'media', label: 'Media & Documents', icon: ImageIcon },
  { id: 'notes', label: 'Notes & Observations', icon: FileText },
  { id: 'metadata', label: 'System Metadata', icon: SettingsIcon },
  { id: 'computed', label: 'Computed Data', icon: Activity },
]

export function MasterMemberForm() {
  const [activeSection, setActiveSection] = React.useState('identity')
  const [isSaving, setIsSaving] = React.useState(false)
  const [feedback, setFeedback] = React.useState<{ show: boolean, type: 'success' | 'error' | 'loading', title: string, message: string }>({
    show: false,
    type: 'loading',
    title: '',
    message: ''
  })

  // Local Form State
  const [formData, setFormData] = React.useState({
    full_name: '',
    gender: 'male',
    village: '',
    city: '',
    phoneNumber: '',
    whatsappNumber: '',
    roles: ['village_member'],
    notes: ''
  })

  const handleSave = async () => {
    setIsSaving(true)
    setFeedback({ show: true, type: 'loading', title: 'Saving Member...', message: 'Committing record to Vedic Database...' })
    
    const result = await upsertMemberRecord(formData)
    
    if (result.success) {
      setFeedback({ 
        show: true, 
        type: 'success', 
        title: 'Record Secured', 
        message: `${formData.full_name || 'Member'} has been successfully registered in the system.` 
      })
    } else {
      setFeedback({ 
        show: true, 
        type: 'error', 
        title: 'Save Failed', 
        message: result.error || 'An unexpected error occurred while saving.' 
      })
    }
    setIsSaving(false)
  }

  return (
    <div className="w-full bg-white border border-slate-200 shadow-xl rounded-sm flex h-[800px] overflow-hidden">
      {/* 1. Left Navigation (The Vertical Tab System) */}
      <aside className="w-64 bg-slate-50 border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-200 bg-white">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Master Profile</h3>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={cn(
                "w-full flex items-center gap-4 px-6 py-3.5 text-left transition-all group relative",
                activeSection === s.id 
                  ? "bg-white text-blue-600 font-bold border-r-4 border-blue-600" 
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
              )}
            >
              <s.icon className={cn("w-4 h-4 transition-colors", activeSection === s.id ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600")} />
              <span className="text-[11px] uppercase tracking-wider">{s.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-6 bg-slate-900 text-white flex flex-col gap-3">
          <Button 
            onClick={handleSave}
            disabled={isSaving}
            className="w-full h-10 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-sm shadow-lg disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />} 
            SAVE RECORD
          </Button>
          <div className="flex items-center gap-2 text-[9px] text-slate-500 font-bold uppercase tracking-widest">
            <Clock className="w-3 h-3" /> Last Auto-save: 2m ago
          </div>
        </div>
      </aside>

      {/* 2. Main Content Area (The Exhaustive Form) */}
      <main className="flex-1 flex flex-col bg-white">
        {/* Sticky Form Header */}
        <header className="px-10 py-6 border-b border-slate-100 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-10">
          <div>
            <h2 className="text-xl font-bold text-slate-900">{SECTIONS.find(s => s.id === activeSection)?.label}</h2>
            <p className="text-xs text-slate-400 mt-0.5">Please provide accurate data for institution records.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-sm flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Draft</span>
            </div>
          </div>
        </header>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto p-10 space-y-12">
          
          {/* IDENTITY SECTION */}
          {activeSection === 'identity' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-start gap-10">
                <div className="w-32 h-40 bg-slate-50 border-2 border-dashed border-slate-200 rounded-sm flex flex-col items-center justify-center gap-2 group cursor-pointer hover:bg-white hover:border-blue-400 transition-all">
                  <ImageIcon className="w-8 h-8 text-slate-300 group-hover:text-blue-500" />
                  <span className="text-[9px] font-black text-slate-400 group-hover:text-blue-500 uppercase tracking-widest text-center px-4">Upload Photo</span>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">First Name</label>
                    <input 
                      value={formData.full_name}
                      onChange={e => setFormData({...formData, full_name: e.target.value})}
                      className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-sm focus:border-blue-500 outline-none transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Village</label>
                    <input 
                      value={formData.village}
                      onChange={e => setFormData({...formData, village: e.target.value})}
                      className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-sm focus:border-blue-500 outline-none transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Gender</label>
                    <select className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-sm focus:border-blue-500 outline-none transition-all appearance-none">
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date of Birth</label>
                    <input type="date" className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-sm focus:border-blue-500 outline-none transition-all" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CONTACT SECTION */}
          {activeSection === 'contact' && (
            <div className="grid grid-cols-2 gap-10 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Primary Mobile</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-3.5 w-4 h-4 text-slate-300" />
                  <input className="w-full h-11 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-sm focus:border-blue-500 outline-none transition-all" placeholder="+91 XXXXX XXXXX" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">WhatsApp Number</label>
                <div className="relative text-green-600">
                  <div className="absolute left-4 top-3.5 w-4 h-4 font-bold text-xs italic">W</div>
                  <input className="w-full h-11 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-sm focus:border-green-500 outline-none transition-all" placeholder="+91 XXXXX XXXXX" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Primary Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 w-4 h-4 text-slate-300" />
                  <input className="w-full h-11 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-sm focus:border-blue-500 outline-none transition-all" placeholder="name@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Emergency Contact</label>
                <input className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-sm focus:border-blue-500 outline-none transition-all" placeholder="Guardian Name / Phone" />
              </div>
            </div>
          )}

          {/* FAMILY SECTION */}
          {activeSection === 'family' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
               <div className="p-8 bg-blue-50/50 border border-blue-100 rounded-sm border-l-4 border-l-blue-500">
                  <h4 className="text-sm font-bold text-blue-900 flex items-center gap-2"><Users className="w-4 h-4" /> Joint Family Mapping</h4>
                  <p className="text-xs text-blue-700 mt-1">Linking members here automatically creates reciprocal relationships in their profiles.</p>
               </div>
               
               <div className="border border-slate-200 rounded-sm overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Relation</th>
                        <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Connect Member</th>
                        <th className="px-6 py-4 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {['Father', 'Mother', 'Spouse', 'Child'].map(rel => (
                        <tr key={rel}>
                          <td className="px-6 py-4 font-bold text-slate-700">{rel}</td>
                          <td className="px-6 py-4">
                            <input className="w-full h-9 bg-transparent border-none outline-none text-blue-600 font-medium placeholder:text-slate-300" placeholder={`Search and link ${rel}...`} />
                          </td>
                          <td className="px-6 py-4 text-right">
                             <Button variant="ghost" className="h-8 px-3 text-[10px] font-bold text-blue-600 bg-blue-50">LINK</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
               </div>
            </div>
          )}

          {/* ROLES SECTION */}
          {activeSection === 'roles' && (
            <div className="grid grid-cols-2 gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
              {[
                { id: 'participant', label: 'Village Participant', color: 'bg-green-500' },
                { id: 'donor', label: 'Institutional Donor', color: 'bg-orange-500' },
                { id: 'mentor', label: 'Spiritual Mentor', color: 'bg-purple-500' },
                { id: 'admin', label: 'System Admin', color: 'bg-slate-900' },
                { id: 'director', label: 'Institutional Director', color: 'bg-blue-600' },
              ].map(role => (
                <div key={role.id} className="p-6 bg-white border border-slate-200 rounded-sm flex items-center justify-between hover:border-slate-400 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className={cn("w-3 h-3 rounded-full", role.color)} />
                    <span className="text-sm font-bold text-slate-700">{role.label}</span>
                  </div>
                  <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                </div>
              ))}
            </div>
          )}

          {/* MENTORSHIP SECTION */}
          {activeSection === 'mentorship' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Main Mentor (Guru)</label>
                  <input className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-sm" placeholder="Search mentors..." />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Training Status</label>
                  <select className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-sm">
                    <option>Enrolled</option>
                    <option>Active</option>
                    <option>Completed</option>
                    <option>Master Level</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Placeholder for other sections */}
          {!['identity', 'contact', 'family', 'roles', 'mentorship'].includes(activeSection) && (
            <div className="flex flex-col items-center justify-center py-20 text-slate-300">
               <SettingsIcon className="w-16 h-16 mb-4 opacity-10 animate-spin-slow" />
               <p className="text-sm font-bold uppercase tracking-widest">Module Loading...</p>
               <p className="text-[10px] mt-2 italic text-slate-400">Section: {SECTIONS.find(s => s.id === activeSection)?.label}</p>
            </div>
          )}

        </div>

        <FeedbackModal 
          isOpen={feedback.show}
          type={feedback.type}
          title={feedback.title}
          message={feedback.message}
          onClose={() => setFeedback({ ...feedback, show: false })}
        />

        {/* Global Footer Navigation */}
        <footer className="px-10 py-6 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <div className="flex items-center gap-2">
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Form Progress:</span>
             <div className="w-48 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: '40%' }} />
             </div>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" className="h-10 px-6 text-xs font-bold text-slate-500 border border-slate-200 bg-white">Previous</Button>
            <Button className="h-10 px-8 text-xs font-bold bg-blue-600 text-white rounded-sm shadow-md">
              Next Section <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </footer>
      </main>
    </div>
  )
}
