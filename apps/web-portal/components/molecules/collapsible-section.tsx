'use client'

import { useState, ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CollapsibleSectionProps {
  title: string
  children: ReactNode
  defaultOpen?: boolean
  rightSlot?: ReactNode   // optional (for icons like Volume)
}

export function CollapsibleSection({
  title,
  children,
  defaultOpen = true,
  rightSlot,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border border-border rounded-lg overflow-hidden">

      {/* Header */}
      <div
        className="flex items-center justify-between p-3 bg-secondary/30 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <ChevronDown
            className={cn(
              "w-4 h-4 transition-transform",
              isOpen && "rotate-180"
            )}
          />
          <span className="font-medium">{title}</span>
        </div>

        {rightSlot && (
          <div onClick={(e) => e.stopPropagation()}>
            {rightSlot}
          </div>
        )}
      </div>

      {/* Content */}
      {isOpen && (
        <div className="bg-card">
          {children}
        </div>
      )}
    </div>
  )
}