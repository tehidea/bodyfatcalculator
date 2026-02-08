import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Method Comparison | Body Fat Calculator Research',
  description:
    'Compare different body fat measurement methods including accuracy, reliability, ease of use, and specific applications. Find the most suitable method for your needs with our comprehensive comparison guide.',
  keywords: [
    'body fat method comparison',
    'skinfold vs circumference methods',
    'body fat measurement accuracy',
    'method selection guide',
    'body composition techniques',
    'measurement reliability comparison',
    'athletic body fat testing',
    'general population methods',
  ],
  openGraph: {
    title: 'Method Comparison | Body Fat Calculator Research',
    description:
      'Compare different body fat measurement methods including accuracy, reliability, ease of use, and specific applications. Find the most suitable method for your needs with our comprehensive comparison guide.',
    type: 'article',
  },
}

export default function MethodComparisonLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
