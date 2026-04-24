"use client"

import { useState, useEffect } from "react"
import { SiteHeader } from "@/components/site-header"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Users,
  IndianRupee,
  TrendingUp,
  Calendar,
  Shield,
  FileCheck,
  Eye,
} from "lucide-react"

interface TransparencyData {
  totalDonations: number
  totalAmount: number
  totalDonors: number
  recentDonations: Array<{
    name: string
    amount: number
    date: string
    message?: string
  }>
  monthlyStats: Array<{
    month: string
    amount: number
    count: number
  }>
}

export default function TransparencyPage() {
  const [data, setData] = useState<TransparencyData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/transparency")
        if (response.ok) {
          const result = await response.json()
          setData(result)
        }
      } catch (error) {
        console.error("Failed to fetch transparency data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <Eye className="size-3 mr-1" />
            Full Transparency
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight mb-4 text-balance">
            Where Your Donations Go
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            We believe in complete transparency. Every rupee you donate is tracked
            and accounted for. Here's a real-time view of our donation statistics.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          <Card className="border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Donations
              </CardTitle>
              <Heart className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <div className="text-2xl font-bold">
                  {data?.totalDonations.toLocaleString("en-IN") || 0}
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                Confirmed donations received
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Amount Raised
              </CardTitle>
              <IndianRupee className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-32" />
              ) : (
                <div className="text-2xl font-bold">
                  ₹{data?.totalAmount.toLocaleString("en-IN") || 0}
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                From generous supporters
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Donors
              </CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                <div className="text-2xl font-bold">
                  {data?.totalDonors.toLocaleString("en-IN") || 0}
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                Unique supporters
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Public Donations */}
        <div className="grid gap-8 lg:grid-cols-2 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="size-5" />
                Recent Donations
              </CardTitle>
              <CardDescription>
                Public donations from our supporters
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center gap-4">
                      <Skeleton className="size-10 rounded-full" />
                      <div className="flex-1">
                        <Skeleton className="h-4 w-32 mb-2" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                      <Skeleton className="h-5 w-16" />
                    </div>
                  ))}
                </div>
              ) : data?.recentDonations && data.recentDonations.length > 0 ? (
                <div className="space-y-4">
                  {data.recentDonations.map((donation, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-3 rounded-lg bg-muted/50"
                    >
                      <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                          {donation.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{donation.name}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="size-3" />
                          {new Date(donation.date).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <Badge variant="secondary" className="shrink-0">
                        ₹{donation.amount.toLocaleString("en-IN")}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No public donations yet
                </p>
              )}
            </CardContent>
          </Card>

          {/* Trust Badges */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="size-5" />
                Our Commitment
              </CardTitle>
              <CardDescription>
                How we ensure your donations are used effectively
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-4">
                <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <FileCheck className="size-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">80G Tax Exemption</h4>
                  <p className="text-sm text-muted-foreground">
                    All donations are eligible for 80G tax benefits. Receipts are
                    generated automatically.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Eye className="size-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Complete Transparency</h4>
                  <p className="text-sm text-muted-foreground">
                    Every donation is tracked and reported. Annual reports are
                    published for public access.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Shield className="size-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Secure Transactions</h4>
                  <p className="text-sm text-muted-foreground">
                    All payments are processed through secure, encrypted channels.
                    Your data is protected.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Users className="size-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Direct Impact</h4>
                  <p className="text-sm text-muted-foreground">
                    100% of your donations go towards Vedic education and
                    preserving ancient knowledge.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Stats */}
        {data?.monthlyStats && data.monthlyStats.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Monthly Donation Trends</CardTitle>
              <CardDescription>
                A snapshot of donations over the past months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                {data.monthlyStats.map((stat, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-muted/50 text-center"
                  >
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.month}
                    </p>
                    <p className="text-xl font-bold mt-1">
                      ₹{stat.amount.toLocaleString("en-IN")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {stat.count} donations
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* CTA */}
        <div className="mt-12 text-center">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="py-8">
              <h3 className="text-xl font-semibold mb-2">
                Join Our Growing Community
              </h3>
              <p className="text-muted-foreground mb-4">
                Your support helps preserve and spread Vedic knowledge to future
                generations.
              </p>
              <a
                href="/donate"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
              >
                <Heart className="size-4 mr-2" />
                Make a Donation
              </a>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
