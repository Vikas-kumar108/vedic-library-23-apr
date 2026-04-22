'use client'

import { Search, Menu, PanelLeftClose, PanelRightClose, Globe, Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAppStore } from '@/lib/store'
import { Language } from '@/lib/types'
import { cn } from '@/lib/utils'

interface HeaderProps {
  className?: string
}

export function Header({ className }: HeaderProps) {
  const {
    searchQuery,
    setSearchQuery,
    language,
    setLanguage,
    leftSidebarOpen,
    rightSidebarOpen,
    toggleLeftSidebar,
    toggleRightSidebar
  } = useAppStore()

  const languageLabels: Record<Language, string> = {
    en: 'English',
    hi: 'हिन्दी',
    sa: 'संस्कृतम्',
    te: 'తెలుగు'
  }

  return (
    <header
      className={cn(
        "h-14 border-b border-border bg-card/80 backdrop-blur-sm flex items-center px-4 gap-4 sticky top-0 z-50",
        className
      )}
    >
      {/* Left Section - Logo & Toggle */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleLeftSidebar}
          className="h-8 w-8 shrink-0"
          aria-label={leftSidebarOpen ? "Close navigation" : "Open navigation"}
        >
          {leftSidebarOpen ? (
            <PanelLeftClose className="h-4 w-4" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
        </Button>
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-serif text-lg font-bold">ॐ</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-sm font-semibold text-foreground leading-tight">NIKHIL</h1>
            <p className="text-xs text-muted-foreground leading-tight">Vedic Library</p>
          </div>
        </div>
      </div>

      {/* Center Section - Search */}
      <div className="flex-1 max-w-xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search verses, texts, topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 bg-secondary/50 border-border/50 focus-visible:bg-card"
          />
        </div>
      </div>

      {/* Right Section - Controls */}
      <div className="flex items-center gap-2">
        {/* Language Selector */}
        <Select value={language} onValueChange={(v) => setLanguage(v as Language)}>
          <SelectTrigger className="w-auto h-8 gap-1.5 bg-secondary/50 border-border/50 text-xs">
            <Globe className="h-3.5 w-3.5" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(Object.keys(languageLabels) as Language[]).map((lang) => (
              <SelectItem key={lang} value={lang}>
                {languageLabels[lang]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Right Panel Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleRightSidebar}
          className="h-8 w-8 shrink-0"
          aria-label={rightSidebarOpen ? "Close panel" : "Open panel"}
        >
          <PanelRightClose className={cn("h-4 w-4", !rightSidebarOpen && "rotate-180")} />
        </Button>
      </div>
    </header>
  )
}
