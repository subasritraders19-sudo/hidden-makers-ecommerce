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





export const metadata: Metadata = {

  title:
  'Hidden Makers — Crafted with Tradition. Delivered with Style.',


  description:
  'Hidden Makers is a premium brand delivering authentic traditional clothing and natural health mix foods with a modern, luxury touch.',


  generator:'v0.app',

}





export const viewport: Viewport = {


  colorScheme:'dark',


  themeColor:'#0a0a0a',


}





export default function RootLayout({

  children,

}: Readonly<{

  children:React.ReactNode

}>) {


  return (


    <html


      lang="en"


      className={`dark ${cormorant.variable} ${jakarta.variable} ${geistMono.variable} bg-background`}


    >



      <body className="font-sans antialiased">



        {/* Razorpay Checkout Script */}

        <Script

          src="https://checkout.razorpay.com/v1/checkout.js"

          strategy="afterInteractive"

        />





        <StoreProvider>


          {children}


        </StoreProvider>





        {


        process.env.NODE_ENV === 'production'

        &&

        <Analytics />

        }




      </body>



    </html>


  )


}