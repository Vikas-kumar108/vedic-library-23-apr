'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

interface AuthCardProps {
  title: string
  subtext?: string
  children: React.ReactNode
  footer?: React.ReactNode
  className?: string
}

export function AuthCard({ title, subtext, children, footer, className }: AuthCardProps) {
  return (
    <Card className={cn("w-full max-w-[450px] shadow-xl border-border/50 bg-card/80 backdrop-blur-sm rounded-3xl", className)}>
      <CardHeader className="space-y-2 text-center pt-8">
        <CardTitle className="text-3xl font-serif tracking-tight">{title}</CardTitle>
        {subtext && <CardDescription className="text-muted-foreground text-lg">{subtext}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-6 px-8 pb-8">
        {children}
      </CardContent>
      {footer && (
        <CardFooter className="flex justify-center border-t border-border/50 py-6 bg-secondary/10 rounded-b-3xl">
          {footer}
        </CardFooter>
      )}
    </Card>
  )
}
