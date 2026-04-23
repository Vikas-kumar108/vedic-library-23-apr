import type { Metadata, Viewport } from 'next'
import { Inter, Noto_Serif, Noto_Sans_Devanagari, Noto_Sans_Bengali, Cormorant_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap'
})

const notoSerif = Noto_Serif({ 
  subsets: ["latin"],
  variable: '--font-noto-serif',
  display: 'swap',
  weight: ['400', '500', '600', '700']
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
})

const devanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: '--font-devanagari',
  display: 'swap',
})

const bengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  variable: '--font-bengali',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'NIKHIL - Vedic Library | National Initiative for Knowledge Heritage of Indic Literature',
  description: 'A unified interface to explore the entire Vedic corpus - from the Vedas to the Upanishads, Itihasas to Puranas. NIKHIL Knowledge OS preserves and presents ancient wisdom for modern seekers.',
  keywords: ['Vedic', 'Sanskrit', 'Bhagavad Gita', 'Upanishads', 'Mahabharata', 'Ramayana', 'Indian Philosophy', 'Dharma', 'Vedanta'],
  authors: [{ name: 'NIKHIL Knowledge OS' }],
  generator: 'Next.js',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#C6923A',
  width: 'device-width',
  initialScale: 1,
}

import { MobileNav } from '@/components/organisms/mobile-nav'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${notoSerif.variable} ${cormorant.variable} ${devanagari.variable} ${bengali.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        <main className="pb-24 md:pb-0 min-h-screen">
          {children}
        </main>
        <MobileNav />
        <Analytics />
      </body>
    </html>
  )
}
