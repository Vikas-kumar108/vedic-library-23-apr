'use client'

import React from 'react'
import { DashboardSidebar } from '@/components/organisms/dashboard-sidebar'

/**
 * Dashboard Layout
 * Responsibility: Provide the structural shell for the seeker's private hub.
 * Purpose: Ensures the sidebar is consistently available for navigation across all dashboard sub-pages.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#F8F7F4] flex">
      {/* Sidebar - Hidden on mobile, visible on desktop */}
      <aside className="hidden md:block">
        <DashboardSidebar />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-6 md:p-10">
        {children}
      </main>
    </div>
  )
}
