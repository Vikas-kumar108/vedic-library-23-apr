import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Badge Atom
 * Responsibility: Display small category or status information.
 */
function Badge({ className, variant = "default", ...props }: React.HTMLAttributes<HTMLDivElement> & { variant?: 'default' | 'outline' | 'orange' | 'blue' }) {
  const variants = {
    default: "bg-slate-100 text-slate-600",
    outline: "border border-slate-200 text-slate-500",
    orange: "bg-orange-100 text-orange-700",
    blue: "bg-blue-100 text-blue-700",
  }
  
  return (
    <div 
      className={cn("inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest", variants[variant], className)} 
      {...props} 
    />
  )
}

export { Badge }
