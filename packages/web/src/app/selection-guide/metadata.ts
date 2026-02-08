import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Selection Guide',
  description: 'Find the best body fat measurement method for your needs and equipment.',
  openGraph: {
    title: 'Selection Guide - Body Fat Calculator (PRO)',
    description: 'Find the best body fat measurement method for your needs and equipment.',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Body Fat Calculator (PRO)',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Selection Guide - Body Fat Calculator (PRO)',
    description: 'Find the best body fat measurement method for your needs and equipment.',
    images: ['/og.png'],
  },
}
