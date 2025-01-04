import { Analytics } from '@vercel/analytics/react'
import { Montserrat } from 'next/font/google'
import clsx from 'clsx'
import PlausibleProvider from 'next-plausible'

import '@/styles/tailwind.css'
import '@/styles/globals.css'
import 'katex/dist/katex.min.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
})

export const metadata = {
  title: 'Body Fat Calculator PRO',
  description:
    'Professional-grade body fat measurement app with multiple scientifically validated methods.',
  metadataBase: new URL('https://bodyfatcalculator.pro'),
  openGraph: {
    title: 'Body Fat Calculator PRO',
    description:
      'Professional-grade body fat measurement app with multiple scientifically validated methods.',
    url: 'https://bodyfatcalculator.pro',
    siteName: 'Body Fat Calculator PRO',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Body Fat Calculator PRO - Professional Body Fat Measurement Tool',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Body Fat Calculator PRO',
    description:
      'Professional-grade body fat measurement app with multiple scientifically validated methods.',
    images: ['/og.png'],
    creator: '@bodyfatcalcpro',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={clsx(
        'bg-[#333333] text-white antialiased',
        montserrat.className,
      )}
    >
      <head>
        <PlausibleProvider
          domain="bodyfatcalculator.pro"
          customDomain="https://plausible.tehidea.net"
          trackOutboundLinks={true}
          trackFileDownloads={true}
          taggedEvents={true}
          trackLocalhost={true}
          revenue={true}
          hash={true}
          selfHosted={true}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
