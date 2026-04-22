'use client'

import { useAppStore } from '@/lib/store'
import { AgeGroup, Category } from '@/lib/types'
import { cn } from '@/lib/utils'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Baby, GraduationCap, Briefcase, Heart } from 'lucide-react'

interface FilterBarProps {
  className?: string
}

const ageGroups: { value: AgeGroup; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { value: 'kids', label: 'Kids', icon: Baby },
  { value: 'students', label: 'Students', icon: GraduationCap },
  { value: 'professionals', label: 'Professionals', icon: Briefcase },
  { value: 'elders', label: 'Elders', icon: Heart },
]

const categories: { value: Category; label: string }[] = [
  { value: 'dharma', label: 'Dharma' },
  { value: 'vedanta', label: 'Vedānta' },
  { value: 'yoga', label: 'Yoga' },
  { value: 'ayurveda', label: 'Āyurveda' },
  { value: 'jyotish', label: 'Jyotiṣa' },
  { value: 'nyaya', label: 'Nyāya' },
]

export function FilterBar({ className }: FilterBarProps) {
  const { filters, setFilters } = useAppStore()

  const handleAgeGroupClick = (value: AgeGroup) => {
    setFilters({
      ageGroup: filters.ageGroup === value ? undefined : value
    })
  }

  const handleCategoryClick = (value: Category) => {
    setFilters({
      category: filters.category === value ? undefined : value
    })
  }

  return (
    <div className={cn("border-b border-border bg-secondary/30 py-2", className)}>
      <ScrollArea className="w-full">
        <div className="flex items-center gap-6 px-4">
          {/* Age Group Filters */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-muted-foreground font-medium mr-1">For:</span>
            {ageGroups.map(({ value, label, icon: Icon }) => (
              <Button
                key={value}
                variant="ghost"
                size="sm"
                onClick={() => handleAgeGroupClick(value)}
                className={cn(
                  "h-7 px-2.5 text-xs gap-1.5 rounded-full",
                  filters.ageGroup === value
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-card hover:bg-accent/50"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </Button>
            ))}
          </div>

          {/* Divider */}
          <div className="h-5 w-px bg-border shrink-0" />

          {/* Category Filters */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-muted-foreground font-medium mr-1">Topic:</span>
            {categories.map(({ value, label }) => (
              <Button
                key={value}
                variant="ghost"
                size="sm"
                onClick={() => handleCategoryClick(value)}
                className={cn(
                  "h-7 px-3 text-xs rounded-full",
                  filters.category === value
                    ? "text-white hover:opacity-90"
                    : "bg-card hover:bg-[var(--saffron-light)]/50"
                )}
                style={filters.category === value ? { backgroundColor: 'var(--knowledge-blue)' } : undefined}
              >
                {label}
              </Button>
            ))}
          </div>

          {/* Clear Filters */}
          {(filters.ageGroup || filters.category) && (
            <>
              <div className="h-5 w-px bg-border shrink-0" />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFilters({ ageGroup: undefined, category: undefined })}
                className="h-7 px-3 text-xs text-muted-foreground hover:text-foreground"
              >
                Clear all
              </Button>
            </>
          )}
        </div>
        <ScrollBar orientation="horizontal" className="h-1.5" />
      </ScrollArea>
    </div>
  )
}
