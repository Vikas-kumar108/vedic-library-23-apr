import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { 
  Heart, 
  BookOpen, 
  Users, 
  Target, 
  Award, 
  Globe,
  Mail,
  MapPin,
  Phone
} from "lucide-react"

export const metadata = {
  title: "About Us - VedicSkills",
  description: "Learn about VedicSkills Foundation and our mission to preserve and spread Vedic knowledge worldwide.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-balance leading-tight">
                Preserving Ancient Wisdom
                <span className="text-primary block">For Modern Seekers</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground text-pretty">
                VedicSkills Foundation is dedicated to the preservation, research, 
                and dissemination of Vedic knowledge. We bridge the gap between 
                ancient wisdom and contemporary understanding.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-card border-y">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <div className="text-center md:text-left">
                <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto md:mx-0 mb-4">
                  <Target className="size-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To make authentic Vedic knowledge accessible to seekers worldwide 
                  through systematic education, research publications, and community 
                  programs. We strive to present these ancient teachings in their 
                  pure form while making them relevant for contemporary life.
                </p>
              </div>
              <div className="text-center md:text-left">
                <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto md:mx-0 mb-4">
                  <Globe className="size-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed">
                  A world where the profound wisdom of the Vedas enriches lives 
                  across cultures and generations. We envision a global community 
                  of practitioners who embody Vedic principles of harmony, 
                  self-realization, and universal well-being.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What We Do</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our initiatives span education, research, and community building 
                to create a comprehensive ecosystem for Vedic learning.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card>
                <CardContent className="pt-6">
                  <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <BookOpen className="size-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Vedic Education</h3>
                  <p className="text-sm text-muted-foreground">
                    Structured courses on Vedanta, Sanskrit, Yoga, Ayurveda, 
                    and other Vedic disciplines taught by qualified teachers.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Award className="size-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Research & Publications</h3>
                  <p className="text-sm text-muted-foreground">
                    Scholarly research on Vedic texts and their applications, 
                    with publications in multiple languages for global reach.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Users className="size-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Community Programs</h3>
                  <p className="text-sm text-muted-foreground">
                    Satsangs, retreats, and community gatherings that bring 
                    together seekers for shared learning and spiritual growth.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Impact Numbers */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Through the generosity of our donors and the dedication of our 
                teachers, we have touched countless lives.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">10+</p>
                <p className="text-sm text-muted-foreground mt-1">Years of Service</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">10,000+</p>
                <p className="text-sm text-muted-foreground mt-1">Students Taught</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">500+</p>
                <p className="text-sm text-muted-foreground mt-1">Courses Offered</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">50+</p>
                <p className="text-sm text-muted-foreground mt-1">Countries Reached</p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="text-center p-6">
                <p className="text-primary font-bold text-lg mb-2">Satya</p>
                <p className="text-sm text-muted-foreground">
                  Truth in teaching, authenticity in presentation of scriptures
                </p>
              </div>
              <div className="text-center p-6">
                <p className="text-primary font-bold text-lg mb-2">Seva</p>
                <p className="text-sm text-muted-foreground">
                  Selfless service to seekers and the broader community
                </p>
              </div>
              <div className="text-center p-6">
                <p className="text-primary font-bold text-lg mb-2">Shraddha</p>
                <p className="text-sm text-muted-foreground">
                  Faith in the transformative power of Vedic wisdom
                </p>
              </div>
              <div className="text-center p-6">
                <p className="text-primary font-bold text-lg mb-2">Sampradaya</p>
                <p className="text-sm text-muted-foreground">
                  Honoring the lineage and tradition of our teachers
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-card border-t">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
                <p className="text-muted-foreground">
                  Have questions? We would love to hear from you.
                </p>
              </div>
              <div className="grid sm:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Mail className="size-5 text-primary" />
                  </div>
                  <p className="font-medium">Email</p>
                  <a 
                    href="mailto:info@vedicskills.org" 
                    className="text-sm text-primary hover:underline"
                  >
                    info@vedicskills.org
                  </a>
                </div>
                <div className="text-center">
                  <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Phone className="size-5 text-primary" />
                  </div>
                  <p className="font-medium">Phone</p>
                  <a 
                    href="tel:+919876543210" 
                    className="text-sm text-primary hover:underline"
                  >
                    +91 98765 43210
                  </a>
                </div>
                <div className="text-center">
                  <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <MapPin className="size-5 text-primary" />
                  </div>
                  <p className="font-medium">Address</p>
                  <p className="text-sm text-muted-foreground">
                    New Delhi, India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <Heart className="size-12 text-primary mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-4">Support Our Mission</h2>
              <p className="text-muted-foreground mb-8">
                Your contribution helps us preserve ancient wisdom and make it 
                accessible to seekers around the world. Join us in this sacred seva.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/donate">Donate Now</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/membership">Become a Member</Link>
                </Button>
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
            Registered under Section 80G of the Income Tax Act
          </p>
        </div>
      </footer>
    </div>
  )
}
