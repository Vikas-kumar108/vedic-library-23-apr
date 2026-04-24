"use client"

import React, { useState } from "react"
import { Plus, Edit2, Trash2, ArrowLeft, Book, Tag, Calendar } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface LibraryItem {
  id: number
  title: string
  tags: string[]
  status: "Draft" | "Published"
  date: string
}

export default function LibraryAdminPage() {
  const [items, setItems] = useState<LibraryItem[]>([
    { id: 1, title: "Bhagavad Gita 2.47", tags: ["Dharma", "Karma"], status: "Published", date: "2026-04-20" },
    { id: 2, title: "Bhagavad Gita 3.35", tags: ["Dharma"], status: "Published", date: "2026-04-19" },
    { id: 3, title: "Bhagavad Gita 6.5", tags: ["Yoga", "Philosophy"], status: "Draft", date: "2026-04-18" },
  ])

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* 🏛️ Header */}
      <header className="bg-slate-900/50 border-b border-slate-800 px-8 py-6 flex items-center justify-between sticky top-0 z-10 backdrop-blur-xl">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="size-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
            <ArrowLeft className="size-5" />
          </Link>
          <div>
             <h1 className="text-2xl font-serif font-bold italic text-white">Library Vault</h1>
             <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Scriptural Governance</p>
          </div>
        </div>
        <Button asChild className="h-12 px-8 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-indigo-600/20">
          <Link href="/admin/content/library/new">
            <Plus className="size-4 mr-2" /> Manifest New Content
          </Link>
        </Button>
      </header>

      {/* 🏛️ Main Content Table */}
      <main className="flex-1 p-8 lg:p-12 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <div className="bg-slate-900/30 rounded-[2.5rem] border border-slate-800 overflow-hidden shadow-2xl">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-900/50 border-b border-slate-800">
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Title & Reference</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Wisdom Tags</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Manifested Date</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {items.map((item) => (
                  <tr key={item.id} className="group hover:bg-slate-800/30 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="size-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-400 transition-colors">
                          <Book className="size-5" />
                        </div>
                        <span className="text-sm font-bold text-slate-200">{item.title}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex gap-2 flex-wrap">
                        {item.tags.map((tag) => (
                          <span key={tag} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-widest border border-slate-700">
                            <Tag className="size-2.5" /> {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        item.status === 'Published'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                        <Calendar className="size-4" /> {item.date}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="size-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all">
                          <Edit2 className="size-4" />
                        </button>
                        <button className="size-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-all">
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {items.length === 0 && (
              <div className="p-20 text-center">
                <div className="size-20 rounded-[2rem] bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto mb-6">
                  <Book className="size-10 text-slate-700" />
                </div>
                <h3 className="text-xl font-serif font-bold italic text-slate-400 mb-2">Vault is Empty</h3>
                <p className="text-slate-600 text-sm">Begin manifesting sacred content to populate the vault.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
