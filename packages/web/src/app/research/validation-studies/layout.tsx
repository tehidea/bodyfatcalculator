import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Validation Studies | Body Fat Calculator Research',
  description:
    'Comprehensive collection of empirical validation studies comparing field methods against laboratory standards. Explore detailed analysis of accuracy, reliability, and practical implications.',
  keywords: [
    'body fat validation studies',
    'DEXA comparison studies',
    'hydrostatic weighing validation',
    'skinfold method accuracy',
    'Jackson Pollock validation',
    'Navy method research',
    'YMCA method studies',
    'body composition validation',
  ],
  openGraph: {
    title: 'Validation Studies | Body Fat Calculator Research',
    description:
      'Comprehensive collection of empirical validation studies comparing field methods against laboratory standards. Explore detailed analysis of accuracy, reliability, and practical implications.',
    type: 'article',
  },
}

export default function ValidationStudiesLayout({ children }: { children: React.ReactNode }) {
  return children
}
