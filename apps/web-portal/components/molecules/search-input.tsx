import * as React from "react"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * SearchInput Molecule
 * Responsibility: Combine search icon with text input.
 * Purpose: Standardized search entry for Explore and Library pages.
 */
interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void
}

export function SearchInput({ className, onSearch, ...props }: SearchInputProps) {
  return (
    <div className={cn("relative group w-full", className)}>
      <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6 group-focus-within:text-primary transition-colors" />
      <input 
        className="w-full h-16 pl-16 pr-6 rounded-[2rem] bg-white border-slate-200 text-lg shadow-xl shadow-slate-200/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all"
        {...props}
      />
    </div>
  )
}
