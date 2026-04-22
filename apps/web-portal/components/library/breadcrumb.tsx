'use client'

import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  id: string
  name: string
  sanskrit?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  onNavigate?: (id: string) => void
  className?: string
}

export function Breadcrumb({ items, onNavigate, className }: BreadcrumbProps) {
  if (items.length === 0) {
    return null
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "flex items-center gap-1 text-sm overflow-x-auto pb-1",
        className
      )}
    >
      <button
        onClick={() => onNavigate?.('root')}
        className="shrink-0 p-1 rounded hover:bg-secondary transition-colors"
        aria-label="Home"
      >
        <Home className="w-4 h-4 text-muted-foreground" />
      </button>
      
      {items.map((item, index) => (
        <div key={item.id} className="flex items-center gap-1 shrink-0">
          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60" />
          <button
            onClick={() => onNavigate?.(item.id)}
            className={cn(
              "px-2 py-1 rounded hover:bg-secondary transition-colors",
              index === items.length - 1
                ? "font-medium text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <span className="block text-sm">{item.name}</span>
            {item.sanskrit && index === items.length - 1 && (
              <span className="block text-xs font-serif text-primary mt-0.5">
                {item.sanskrit}
              </span>
            )}
          </button>
        </div>
      ))}
    </nav>
  )
}
