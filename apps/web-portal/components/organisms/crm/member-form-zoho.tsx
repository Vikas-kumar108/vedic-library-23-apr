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
  Plus, 
  Trash2,
  Users,
  Save,
  Clock
} from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Zoho-Grade Member Form
 * Responsibility: High-productivity, low-distraction data entry.
 * Features: Embedded family linking, multi-address management, and audit tracking.
 */

const memberSchema = z.object({
  name: z.string().min(2, 'Full name required'),
  email: z.string().email().optional().or(z.literal('')),
  phoneNumber: z.string().optional(),
  roles: z.array(z.string()).default(['village_member']),
  village: z.string().optional(),
  city: z.string().optional(),
  pinCode: z.string().optional(),
  addressLine1: z.string().optional(),
  notes: z.string().optional(),
})

export function MemberFormZoho() {
  const [relationships, setRelationships] = React.useState<{ id: string, name: string, type: string }[]>([])

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<z.infer<typeof memberSchema>>({
    resolver: zodResolver(memberSchema)
  })

  const addRelationship = () => {
    setRelationships([...relationships, { id: Math.random().toString(), name: '', type: 'pitara' }])
  }

  return (
    <div className="w-full bg-white border border-slate-200 shadow-sm rounded-sm">
      {/* Form Header - Zoho Style (Clean, White, Structured) */}
      <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-200 rounded-md flex items-center justify-center text-slate-500">
            <User className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-800">New Member Registration</h2>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" className="h-9 px-4 text-xs font-semibold text-slate-500 border border-slate-200 rounded-sm">Cancel</Button>
          <Button className="h-9 px-6 text-xs font-bold bg-orange-600 text-white rounded-sm hover:bg-orange-700 shadow-sm">Save & Close</Button>
        </div>
      </div>

      <div className="p-0">
        <form className="divide-y divide-slate-100">
          {/* Section 1: Basic Information */}
          <div className="p-8 space-y-6">
            <div className="flex items-center gap-2 text-slate-400 mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest border-b-2 border-orange-400 pb-1 text-slate-600">01. Basic Information</span>
            </div>
            
            <div className="grid grid-cols-12 gap-x-8 gap-y-6">
              <div className="col-span-12 md:col-span-6 space-y-2">
                <label className="text-[11px] font-bold text-slate-500">FULL NAME <span className="text-red-500">*</span></label>
                <input {...register('name')} className="w-full h-10 px-3 bg-white border border-slate-200 rounded-sm focus:border-blue-400 outline-none text-sm transition-colors" />
              </div>
              <div className="col-span-12 md:col-span-6 space-y-2">
                <label className="text-[11px] font-bold text-slate-500">PHONE NUMBER</label>
                <input {...register('phoneNumber')} className="w-full h-10 px-3 bg-white border border-slate-200 rounded-sm focus:border-blue-400 outline-none text-sm transition-colors" />
              </div>
              <div className="col-span-12 md:col-span-6 space-y-2">
                <label className="text-[11px] font-bold text-slate-500">EMAIL ID</label>
                <input {...register('email')} className="w-full h-10 px-3 bg-white border border-slate-200 rounded-sm focus:border-blue-400 outline-none text-sm transition-colors" />
              </div>
              <div className="col-span-12 md:col-span-6 space-y-2">
                <label className="text-[11px] font-bold text-slate-500">GENDER</label>
                <select className="w-full h-10 px-3 bg-white border border-slate-200 rounded-sm focus:border-blue-400 outline-none text-sm transition-colors">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Address & Location */}
          <div className="p-8 space-y-6 bg-slate-50/30">
            <div className="flex items-center gap-2 text-slate-400 mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest border-b-2 border-orange-400 pb-1 text-slate-600">02. Address & Geography</span>
            </div>

            <div className="grid grid-cols-12 gap-x-8 gap-y-6">
              <div className="col-span-12 md:col-span-4 space-y-2">
                <label className="text-[11px] font-bold text-slate-500">VILLAGE / LOCALITY</label>
                <input {...register('village')} className="w-full h-10 px-3 bg-white border border-slate-200 rounded-sm focus:border-blue-400 outline-none text-sm transition-colors" />
              </div>
              <div className="col-span-12 md:col-span-4 space-y-2">
                <label className="text-[11px] font-bold text-slate-500">CITY / TOWN</label>
                <input {...register('city')} className="w-full h-10 px-3 bg-white border border-slate-200 rounded-sm focus:border-blue-400 outline-none text-sm transition-colors" />
              </div>
              <div className="col-span-12 md:col-span-4 space-y-2">
                <label className="text-[11px] font-bold text-slate-500">PIN CODE</label>
                <input {...register('pinCode')} className="w-full h-10 px-3 bg-white border border-slate-200 rounded-sm focus:border-blue-400 outline-none text-sm transition-colors" />
              </div>
              <div className="col-span-12 space-y-2">
                <label className="text-[11px] font-bold text-slate-500">FULL ADDRESS</label>
                <textarea {...register('addressLine1')} rows={2} className="w-full p-3 bg-white border border-slate-200 rounded-sm focus:border-blue-400 outline-none text-sm transition-colors resize-none" />
              </div>
            </div>
          </div>

          {/* Section 3: Family Connections (The "Family Tree" Sub-form) */}
          <div className="p-8 space-y-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest border-b-2 border-orange-400 pb-1 text-slate-600">03. Family & Relationships</span>
              <Button type="button" onClick={addRelationship} variant="ghost" className="h-8 px-3 text-[10px] font-bold text-blue-600 border border-blue-100 bg-blue-50/50 rounded-sm flex items-center gap-2">
                <Plus className="w-3 h-3" /> ADD CONNECTION
              </Button>
            </div>

            <div className="space-y-4">
              {relationships.length > 0 ? (
                <div className="border border-slate-100 rounded-sm overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 border-b border-slate-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Relation Type</th>
                        <th className="px-4 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Name / Search</th>
                        <th className="px-4 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest w-16">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {relationships.map((rel, idx) => (
                        <tr key={rel.id}>
                          <td className="px-4 py-3">
                            <select className="w-full h-8 bg-transparent border-none outline-none text-sm">
                              <option value="pitara">Father (Pitra)</option>
                              <option value="matara">Mother (Matra)</option>
                              <option value="vaivahika">Spouse (Husband/Wife)</option>
                              <option value="sahodara">Sibling (Brother/Sister)</option>
                            </select>
                          </td>
                          <td className="px-4 py-3">
                            <input placeholder="Search existing member..." className="w-full h-8 bg-transparent border-none outline-none text-sm" />
                          </td>
                          <td className="px-4 py-3 text-right">
                            <button onClick={() => setRelationships(relationships.filter(r => r.id !== rel.id))} className="text-slate-300 hover:text-red-500">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-12 border-2 border-dashed border-slate-100 rounded-sm flex flex-col items-center justify-center text-slate-300">
                  <Users className="w-10 h-10 mb-2 opacity-20" />
                  <p className="text-xs font-semibold">No family members linked yet.</p>
                </div>
              )}
            </div>
          </div>

          {/* Section 4: Admin Notes */}
          <div className="p-8 space-y-6 bg-slate-50/30">
            <div className="flex items-center gap-2 text-slate-400 mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest border-b-2 border-orange-400 pb-1 text-slate-600">04. Notes & Attributes</span>
            </div>
            <textarea {...register('notes')} rows={4} className="w-full p-3 bg-white border border-slate-200 rounded-sm focus:border-blue-400 outline-none text-sm transition-colors resize-none" />
          </div>
        </form>
      </div>

      {/* Footer Audit Info */}
      <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
        <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <div className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> REGISTERED: {new Date().toLocaleDateString()}</div>
          <div className="flex items-center gap-1.5"><User className="w-3 h-3" /> CREATED BY: SYSTEM ADMIN</div>
        </div>
        <div className="flex gap-4">
          <Button className="h-10 px-10 text-xs font-bold bg-slate-900 text-white rounded-sm hover:bg-slate-800 shadow-lg">Submit Member Record</Button>
        </div>
      </div>
    </div>
  )
}
