import { Montserrat } from 'next/font/google'
import clsx from 'clsx'

import '@/styles/tailwind.css'
import '@/styles/globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
})

export const metadata = {
  title: 'Body Fat Calculator Pro',
  description:
    'Professional-grade body fat measurement app with multiple scientifically validated methods.',
  metadataBase: new URL('https://bodyfatcalculator.pro'),
  openGraph: {
    title: 'Body Fat Calculator Pro',
    description:
      'Professional-grade body fat measurement app with multiple scientifically validated methods.',
    url: 'https://bodyfatcalculator.pro',
    siteName: 'Body Fat Calculator Pro',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Body Fat Calculator Pro - Professional Body Fat Measurement Tool',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Body Fat Calculator Pro',
    description:
      'Professional-grade body fat measurement app with multiple scientifically validated methods.',
    images: ['/og-image.png'],
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
      <body>{children}</body>
    </html>
  )
}
