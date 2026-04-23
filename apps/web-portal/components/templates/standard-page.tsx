import * as React from "react"
import { Navbar } from "@/components/organisms/navbar"
import { Footer } from "@/components/organisms/footer"

/**
 * StandardPage Template
 * Responsibility: Define the base layout for all public and private pages.
 * Purpose: Ensures consistent Navbar/Footer and container spacing across the system.
 */
interface StandardPageProps {
  children: React.ReactNode
  className?: string
}

export function StandardPage({ children, className }: StandardPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className={className}>
        {children}
      </main>
      <Footer />
    </div>
  )
}
