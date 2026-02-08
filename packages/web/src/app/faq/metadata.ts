import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Frequently asked questions about body fat measurement methods, accuracy, and features.',
  openGraph: {
    title: 'FAQ - Body Fat Calculator (PRO)',
    description:
      'Frequently asked questions about body fat measurement methods, accuracy, and features.',
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
    title: 'FAQ - Body Fat Calculator (PRO)',
    description:
      'Frequently asked questions about body fat measurement methods, accuracy, and features.',
    images: ['/og.png'],
  },
}
