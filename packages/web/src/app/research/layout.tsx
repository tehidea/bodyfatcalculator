import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Body Fat Research & Scientific Validation | Body Fat Calculator (PRO)',
  description:
    'Comprehensive analysis of scientific research, validation studies, and academic references supporting body fat measurement methods. Includes meta-analyses, clinical trials, field studies, and peer-reviewed research.',
  keywords:
    'body fat research, scientific validation, measurement studies, clinical trials, hydrostatic weighing, DEXA comparison, Jackson & Pollock, Durnin & Womersley, U.S. Navy method, skinfold measurements, body composition research',
  openGraph: {
    title: 'Body Fat Research & Scientific Validation',
    description:
      'Comprehensive scientific research and validation studies on body fat measurement methods.',
    type: 'article',
    authors: ['Body Fat Calculator (PRO) Research Team'],
    publishedTime: '2024-01-04',
    modifiedTime: '2026-02-11',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Body Fat Research & Scientific Validation',
    description:
      'Comprehensive scientific research and validation studies on body fat measurement methods.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Body Fat Research & Scientific Validation',
  datePublished: '2024-01-04',
  dateModified: '2026-02-11',
  author: {
    '@type': 'Organization',
    name: 'Body Fat Calculator (PRO)',
    url: 'https://bodyfatcalculator.pro',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Body Fat Calculator (PRO)',
    url: 'https://bodyfatcalculator.pro',
  },
}

export default function ResearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  )
}
