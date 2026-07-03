import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import Script from 'next/script'

import {
  Cormorant_Garamond,
  Plus_Jakarta_Sans,
  Geist_Mono,
} from 'next/font/google'

import './globals.css'

import { StoreProvider } from '@/components/store-provider'
import { CountryProvider } from '@/components/CountryContext'

// ✅ Fonts
const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

// ✅ Metadata
export const metadata: Metadata = {
  title: 'Hidden Makers',
  description: 'Premium store',
}

// ✅ Viewport
export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0a0a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`dark ${cormorant.variable} ${jakarta.variable} ${geistMono.variable}`}
    >
      <body>

        {/* ✅ Razorpay Script (BEST PRACTICE) */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />

        {/* ✅ Providers */}
        <CountryProvider>
          <StoreProvider>
            {children}
          </StoreProvider>
        </CountryProvider>

        {/* ✅ Analytics (Production Only) */}
        {process.env.NODE_ENV === 'production' && <Analytics />}

      </body>
    </html>
  )
}