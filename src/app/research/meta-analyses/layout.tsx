import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Meta-Analyses & Systematic Reviews | Body Fat Calculator Research',
  description:
    'Comprehensive analysis of major systematic reviews and meta-analyses in body composition assessment. Explore findings from 15,000+ participants across multiple validation studies.',
  keywords: [
    'body fat meta-analysis',
    'body composition systematic review',
    'anthropometric methods research',
    'body fat measurement validation',
    'field methods accuracy',
    'DEXA comparison studies',
    'body composition research',
    'measurement reliability studies',
  ],
  openGraph: {
    title: 'Meta-Analyses & Systematic Reviews | Body Fat Calculator Research',
    description:
      'Comprehensive analysis of major systematic reviews and meta-analyses in body composition assessment. Explore findings from 15,000+ participants across multiple validation studies.',
    type: 'article',
  },
}

export default function MetaAnalysesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
