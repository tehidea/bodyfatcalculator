import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s - Body Fat Calculator (PRO)',
    default: 'Body Fat Calculator (PRO) - Professional Body Fat Measurement Tool',
  },
  description:
    'The most comprehensive body fat calculator app with multiple measurement methods including calipers and US Navy. Get professional-grade estimates with research-validated formulas.',
  openGraph: {
    title: 'Body Fat Calculator (PRO)',
    description: 'Professional Body Fat Measurement Tool',
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
    title: 'Body Fat Calculator (PRO)',
    description: 'Professional Body Fat Measurement Tool',
    images: ['/og.png'],
  },
}
