"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { PaymentInfoCard } from "@/components/payment-info-card"
import { DonationForm } from "@/components/donation-form"
import { Heart, BookOpen, Users, Globe } from "lucide-react"

export default function DonatePage() {
  const [selectedMethod, setSelectedMethod] = useState<"UPI" | "Bank">("UPI")

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Heart className="size-4" />
                Support Vedic Wisdom
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-balance leading-tight">
                Help Preserve Ancient
                <span className="text-primary block">Vedic Knowledge</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                Your generous contribution supports the preservation and
                dissemination of timeless Vedic wisdom. Every donation helps us
                reach more seekers across the globe.
              </p>
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-8 border-y bg-card">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="size-5 text-primary" />
                </div>
                <p className="text-2xl font-bold">500+</p>
                <p className="text-sm text-muted-foreground">Courses Created</p>
              </div>
              <div className="text-center">
                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Users className="size-5 text-primary" />
                </div>
                <p className="text-2xl font-bold">10,000+</p>
                <p className="text-sm text-muted-foreground">Students Taught</p>
              </div>
              <div className="text-center">
                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Globe className="size-5 text-primary" />
                </div>
                <p className="text-2xl font-bold">50+</p>
                <p className="text-sm text-muted-foreground">Countries Reached</p>
              </div>
              <div className="text-center">
                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Heart className="size-5 text-primary" />
                </div>
                <p className="text-2xl font-bold">1,000+</p>
                <p className="text-sm text-muted-foreground">Generous Donors</p>
              </div>
            </div>
          </div>
        </section>

        {/* Donation Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <PaymentInfoCard onMethodChange={setSelectedMethod} />
              <DonationForm selectedMethod={selectedMethod} />
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Your Trust Matters</h2>
              <p className="text-muted-foreground mb-8">
                We are committed to complete transparency. Every donation is
                tracked, and donors receive detailed receipts. Your
                contributions directly support our educational mission.
              </p>
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="p-4 rounded-lg bg-card border">
                  <p className="font-semibold">100% Transparent</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Track where your donation goes
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-card border">
                  <p className="font-semibold">Tax Deductible</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Receive receipts for tax benefits
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-card border">
                  <p className="font-semibold">Secure Payment</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your information is protected
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>VedicSkills Foundation. All rights reserved.</p>
          <p className="mt-2">
            For queries, contact us at{" "}
            <a href="mailto:donate@vedicskills.org" className="text-primary hover:underline">
              donate@vedicskills.org
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
