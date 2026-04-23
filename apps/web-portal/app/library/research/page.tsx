'use client'

import React from 'react'
import { LibraryLayout } from '@/components/library/library-layout'

/**
 * Research Console (Scholarly Library)
 * Responsibility: Provide the professional, research-grade workbench for scholars.
 * Purpose: Exposes the multi-pane environment with L-Tree navigation and deep cross-referencing.
 */
export default function ResearchConsolePage() {
  return (
    <div className="h-screen w-full overflow-hidden">
      <LibraryLayout />
    </div>
  )
}
