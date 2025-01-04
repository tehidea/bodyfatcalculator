import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Body Fat Measurement Methods & Techniques | Body Fat Calculator Pro',
  description:
    'Comprehensive guide to professional body fat measurement methods. Learn about skinfold calipers, circumference measurements, and scientific techniques for accurate body composition assessment.',
  keywords:
    'body fat measurement, skinfold calipers, circumference measurements, Jackson Pollock method, Parrillo method, US Navy method, YMCA method, body composition assessment',
  openGraph: {
    title: 'Body Fat Measurement Methods & Techniques',
    description:
      'Professional guide to body fat measurement methods and techniques.',
    type: 'article',
    authors: ['Body Fat Calculator Pro Team'],
    publishedTime: '2024-01-04',
    modifiedTime: '2024-01-04',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Body Fat Measurement Methods & Techniques',
    description:
      'Professional guide to body fat measurement methods and techniques.',
  },
}

export default function MethodsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
