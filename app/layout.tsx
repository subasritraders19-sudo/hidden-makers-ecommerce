
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

// Fonts
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

// Metadata
export const metadata: Metadata = {
  title: 'Hidden Makers',
  description: 'Premium store',
}

// Viewport
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
        {/* Meta Pixel - fallback when JavaScript is disabled */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1985598812135303&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        {/* Razorpay Script */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />

        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1985598812135303');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* Providers */}
        <CountryProvider>
          <StoreProvider>
            {children}
          </StoreProvider>
        </CountryProvider>

        {/* Vercel Analytics - Production Only */}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
