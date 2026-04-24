'use client'

import React from 'react'
import { AdminSidebar } from '@/components/organisms/admin-sidebar'
import { VedicPulse } from '@/components/organisms/vedic-pulse'

/**
 * Admin Layout
 * Responsibility: Provide the command center shell for platform management.
 * Purpose: Ensures the AdminSidebar is always accessible for managing content, users, and analytics.
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar - Persistent on desktop */}
      <aside className="hidden lg:block">
        <AdminSidebar />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>

      {/* The Spiritual Pulse */}
      <VedicPulse />
    </div>
  )
}
