'use client'

import * as React from "react"
import { Languages } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

const languages = [
  { code: 'en', label: 'English' },
  { code: 'sa', label: 'Sanskrit', native: 'संस्कृतम्' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
]

export function LanguageSelector() {
  const [currentLang, setCurrentLang] = React.useState('en')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-9 px-3 font-medium">
          <Languages className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">
            {languages.find(l => l.code === currentLang)?.label}
          </span>
          <span className="sm:hidden">{currentLang.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 rounded-xl">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setCurrentLang(lang.code)}
            className="flex items-center justify-between py-2 cursor-pointer"
          >
            <span>{lang.label}</span>
            {lang.native && <span className="text-[10px] text-muted-foreground ml-2">{lang.native}</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
