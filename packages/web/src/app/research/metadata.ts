import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Research',
  description: 'Scientific research and validation studies behind body fat measurement methods.',
  openGraph: {
    title: 'Research - Body Fat Calculator (PRO)',
    description: 'Scientific research and validation studies behind body fat measurement methods.',
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
    title: 'Research - Body Fat Calculator (PRO)',
    description: 'Scientific research and validation studies behind body fat measurement methods.',
    images: ['/og.png'],
  },
}
