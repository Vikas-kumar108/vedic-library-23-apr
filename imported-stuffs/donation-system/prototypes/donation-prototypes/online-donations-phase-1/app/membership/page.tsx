"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, Loader2 } from "lucide-react"
import { SiteHeader } from "@/components/site-header"

type MembershipTier = "SHISHYA" | "SADHAKA" | "SEVAK"
type PaymentFrequency = "monthly" | "quarterly" | "yearly"

const MEMBERSHIP_TIERS = {
  SHISHYA: {
    name: "Shishya",
    description: "Student tier - Begin your journey",
    monthlyAmount: 108,
    quarterlyAmount: 300,
    yearlyAmount: 1008,
    benefits: [
      "Access to basic courses",
      "Monthly newsletter",
      "Community forum access",
    ],
    color: "bg-amber-100 border-amber-300 text-amber-900",
    badgeColor: "bg-amber-200 text-amber-800",
  },
  SADHAKA: {
    name: "Sadhaka",
    description: "Practitioner tier - Deepen your practice",
    monthlyAmount: 501,
    quarterlyAmount: 1400,
    yearlyAmount: 5001,
    benefits: [
      "All Shishya benefits",
      "Advanced course access",
      "Monthly live sessions",
      "Priority support",
    ],
    color: "bg-slate-100 border-slate-300 text-slate-900",
    badgeColor: "bg-slate-300 text-slate-800",
    popular: true,
  },
  SEVAK: {
    name: "Sevak",
    description: "Devotee tier - Support the mission",
    monthlyAmount: 1001,
    quarterlyAmount: 2800,
    yearlyAmount: 10001,
    benefits: [
      "All Sadhaka benefits",
      "One-on-one guidance sessions",
      "Exclusive retreats access",
      "Recognition on donors page",
      "80G tax benefits",
    ],
    color: "bg-yellow-50 border-yellow-400 text-yellow-900",
    badgeColor: "bg-yellow-300 text-yellow-900",
  },
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount)
}

function getAmount(tier: typeof MEMBERSHIP_TIERS[MembershipTier], frequency: PaymentFrequency): number {
  switch (frequency) {
    case "monthly":
      return tier.monthlyAmount
    case "quarterly":
      return tier.quarterlyAmount
    case "yearly":
      return tier.yearlyAmount
  }
}

function MembershipCard({ 
  tierKey, 
  tier, 
  frequency, 
  onSelect,
  isLoading,
  selectedTier
}: { 
  tierKey: MembershipTier
  tier: typeof MEMBERSHIP_TIERS[MembershipTier]
  frequency: PaymentFrequency
  onSelect: (tier: MembershipTier) => void
  isLoading: boolean
  selectedTier: MembershipTier | null
}) {
  const amount = getAmount(tier, frequency)
  const isSelected = selectedTier === tierKey
  const isPopular = "popular" in tier && tier.popular

  return (
    <Card className={`relative flex flex-col ${tier.color} border-2 transition-all hover:shadow-lg ${isPopular ? "ring-2 ring-primary ring-offset-2" : ""}`}>
      {isPopular && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
          Most Popular
        </Badge>
      )}
      <CardHeader className="text-center">
        <Badge className={`w-fit mx-auto ${tier.badgeColor}`}>{tier.name}</Badge>
        <CardTitle className="text-2xl mt-2">{tier.name}</CardTitle>
        <CardDescription className="text-current/70">{tier.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="text-center mb-6">
          <span className="text-4xl font-bold">{formatCurrency(amount)}</span>
          <span className="text-muted-foreground">/{frequency === "monthly" ? "mo" : frequency === "quarterly" ? "qtr" : "yr"}</span>
        </div>
        <ul className="space-y-3">
          {tier.benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
              <span className="text-sm">{benefit}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={() => onSelect(tierKey)}
          disabled={isLoading}
          variant={isPopular ? "default" : "outline"}
        >
          {isLoading && isSelected ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            `Choose ${tier.name}`
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function MembershipPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [frequency, setFrequency] = useState<PaymentFrequency>("yearly")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTier, setSelectedTier] = useState<MembershipTier | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSelectMembership(tier: MembershipTier) {
    if (status !== "authenticated") {
      router.push(`/auth/login?callbackUrl=/membership&tier=${tier}&frequency=${frequency}`)
      return
    }

    setIsLoading(true)
    setSelectedTier(tier)
    setError(null)

    try {
      const response = await fetch("/api/memberships", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier, frequency }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create membership")
      }

      // Redirect to donate page with membership context
      router.push(`/donate?membershipId=${data.membership._id}&amount=${data.paymentInfo.amount}&purpose=${encodeURIComponent(data.paymentInfo.tier + " Membership")}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsLoading(false)
      setSelectedTier(null)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold text-balance mb-4">
            Join Our Community
          </h1>
          <p className="text-lg text-muted-foreground text-pretty">
            Become a member and support our mission to spread Vedic knowledge. 
            Choose a tier that resonates with your journey.
          </p>
        </div>

        {error && (
          <div className="max-w-md mx-auto mb-8 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-center">
            {error}
          </div>
        )}

        <div className="flex justify-center mb-8">
          <Tabs value={frequency} onValueChange={(v) => setFrequency(v as PaymentFrequency)} className="w-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
              <TabsTrigger value="yearly">
                Yearly
                <Badge variant="secondary" className="ml-2 text-xs">Save 20%</Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {(Object.entries(MEMBERSHIP_TIERS) as [MembershipTier, typeof MEMBERSHIP_TIERS[MembershipTier]][]).map(([key, tier]) => (
            <MembershipCard
              key={key}
              tierKey={key}
              tier={tier}
              frequency={frequency}
              onSelect={handleSelectMembership}
              isLoading={isLoading}
              selectedTier={selectedTier}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-4">Why Become a Member?</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🕉️</span>
              </div>
              <h3 className="font-semibold mb-2">Spiritual Growth</h3>
              <p className="text-sm text-muted-foreground">
                Access exclusive teachings and guided practices for your spiritual journey.
              </p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="font-semibold mb-2">Community</h3>
              <p className="text-sm text-muted-foreground">
                Connect with like-minded seekers and participate in community events.
              </p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📜</span>
              </div>
              <h3 className="font-semibold mb-2">Tax Benefits</h3>
              <p className="text-sm text-muted-foreground">
                Receive 80G tax exemption certificates for your contributions.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
