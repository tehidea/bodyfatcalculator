import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Clinical Applications | Body Fat Calculator Research',
  description:
    'Explore practical applications of body composition assessment in healthcare, sports medicine, research, and public health settings. Evidence-based outcomes and implementation strategies.',
  keywords: [
    'clinical body fat assessment',
    'sports medicine applications',
    'body composition healthcare',
    'public health monitoring',
    'clinical trials methodology',
    'athletic performance tracking',
    'healthcare outcomes research',
    'population health management',
  ],
  openGraph: {
    title: 'Clinical Applications | Body Fat Calculator Research',
    description:
      'Explore practical applications of body composition assessment in healthcare, sports medicine, research, and public health settings. Evidence-based outcomes and implementation strategies.',
    type: 'article',
  },
}

export default function ClinicalApplicationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
