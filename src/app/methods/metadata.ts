import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Methods',
  description:
    'Compare different body fat measurement methods including calipers, US Navy, and more.',
  openGraph: {
    title: 'Methods - Body Fat Calculator (PRO)',
    description:
      'Compare different body fat measurement methods including calipers, US Navy, and more.',
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
    title: 'Methods - Body Fat Calculator (PRO)',
    description:
      'Compare different body fat measurement methods including calipers, US Navy, and more.',
    images: ['/og.png'],
  },
}
