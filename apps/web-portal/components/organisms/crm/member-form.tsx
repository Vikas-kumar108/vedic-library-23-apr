'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/atoms/button'
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Camera, 
  ShieldCheck,
  Save,
  ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'

const memberSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  phoneNumber: z.string().optional(),
  roles: z.array(z.string()).default(['village_member']),
  gender: z.string().optional(),
  village: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  pinCode: z.string().optional(),
  addressLine1: z.string().optional(),
  notes: z.string().optional(),
})

type MemberFormValues = z.infer<typeof memberSchema>

export function MemberForm() {
  const [activeTab, setActiveTab] = React.useState<'profile' | 'location' | 'roles'>('profile')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MemberFormValues>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      roles: ['village_member']
    }
  })

  const onSubmit = async (data: MemberFormValues) => {
    console.log('Submitting Member Data:', data)
    // Here we will call our Server Action
    alert('Member Foundation Created! Now syncing relationships...')
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
      {/* Header */}
      <div className="p-8 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">New Community Member</h2>
          <p className="text-slate-400 text-sm mt-1">Registering a new person into the Vedic Library OS.</p>
        </div>
        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/10">
          <User className="w-8 h-8 text-orange-400" />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-8">
        {/* Tab Navigation */}
        <div className="flex gap-4 mb-10 p-1 bg-slate-50 rounded-2xl border border-slate-100 w-fit">
          {[
            { id: 'profile', label: 'Identity', icon: User },
            { id: 'location', label: 'Geography', icon: MapPin },
            { id: 'roles', label: 'Institutional', icon: ShieldCheck },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
                activeTab === tab.id 
                  ? "bg-white text-slate-900 shadow-sm border border-slate-200" 
                  : "text-slate-400 hover:text-slate-600"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Content */}
        <div className="space-y-8 min-h-[400px]">
          {activeTab === 'profile' && (
            <div className="grid md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-300" />
                    <input 
                      {...register('name')}
                      placeholder="e.g. Ananya Sharma" 
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all outline-none"
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-[10px] uppercase font-bold">{errors.name.message}</p>}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-3.5 w-5 h-5 text-slate-300" />
                    <input 
                      {...register('phoneNumber')}
                      placeholder="+91 XXXXX XXXXX" 
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-300" />
                    <input 
                      {...register('email')}
                      placeholder="name@example.com" 
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center gap-6">
                  <div className="w-20 h-20 bg-white border border-slate-200 rounded-2xl flex items-center justify-center relative group cursor-pointer overflow-hidden">
                    <Camera className="w-8 h-8 text-slate-300 group-hover:text-orange-500 transition-colors" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[10px] text-white font-bold">UPLOAD</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-slate-900 mb-1">Photograph</h4>
                    <p className="text-[11px] text-slate-400">Capture or upload a recent photo for outreach tracking.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'location' && (
            <div className="grid md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Village / Locality</label>
                  <input 
                    {...register('village')}
                    placeholder="e.g. Govindpur" 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-orange-500"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">City / Town</label>
                  <input 
                    {...register('city')}
                    placeholder="e.g. Rishikesh" 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-orange-500"
                  />
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">PIN Code</label>
                  <input 
                    {...register('pinCode')}
                    placeholder="XXXXXX" 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-orange-500"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Full Address</label>
                  <textarea 
                    {...register('addressLine1')}
                    rows={3}
                    placeholder="Detailed house address..." 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-orange-500 resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'roles' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { id: 'village_member', label: 'Villager', desc: 'Outreach participant' },
                  { id: 'donor', label: 'Donor', desc: 'Financial support' },
                  { id: 'mentor', label: 'Mentor', desc: 'Training lead' },
                  { id: 'director', label: 'Director', desc: 'Decision maker' },
                ].map((role) => (
                  <label key={role.id} className="relative cursor-pointer group">
                    <input type="checkbox" className="sr-only peer" checked={role.id === 'village_member'} readOnly />
                    <div className="p-6 rounded-3xl border border-slate-100 bg-slate-50 transition-all peer-checked:bg-orange-50 peer-checked:border-orange-200 peer-checked:ring-2 peer-checked:ring-orange-500/10 group-hover:bg-white group-hover:shadow-lg">
                      <h4 className="text-sm font-bold text-slate-900 mb-1">{role.label}</h4>
                      <p className="text-[10px] text-slate-400">{role.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Administrative Notes</label>
                <textarea 
                  {...register('notes')}
                  rows={4}
                  placeholder="Special observations, background info, or training status..." 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-orange-500 resize-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
            {activeTab === 'profile' && <span>Step 1 of 3</span>}
            {activeTab === 'location' && <span>Step 2 of 3</span>}
            {activeTab === 'roles' && <span>Step 3 of 3</span>}
          </div>
          <div className="flex gap-4">
            {activeTab !== 'roles' ? (
              <Button 
                type="button" 
                onClick={() => setActiveTab(activeTab === 'profile' ? 'location' : 'roles')}
                className="bg-slate-900 hover:bg-slate-800 text-white px-8 h-12 rounded-xl flex items-center gap-2 font-bold"
              >
                Next <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-orange-600 hover:bg-orange-700 text-white px-10 h-14 rounded-2xl flex items-center gap-2 font-bold shadow-xl shadow-orange-600/20 active:scale-95 transition-all"
              >
                <Save className="w-5 h-5" />
                Register Member
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}
