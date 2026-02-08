import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Jackson & Pollock Methods | Body Fat Calculator Research',
  description:
    'Comprehensive analysis of Jackson & Pollock skinfold protocols, including 7-site, 4-site, and 3-site methods. Explore development, validation, and practical applications of these widely-used body fat measurement techniques.',
  keywords: [
    'Jackson Pollock skinfold method',
    '7-site skinfold protocol',
    '4-site body fat measurement',
    '3-site skinfold technique',
    'body density equations',
    'skinfold measurement validation',
    'body composition assessment',
    'anthropometric methods',
  ],
  openGraph: {
    title: 'Jackson & Pollock Methods | Body Fat Calculator Research',
    description:
      'Comprehensive analysis of Jackson & Pollock skinfold protocols, including 7-site, 4-site, and 3-site methods. Explore development, validation, and practical applications of these widely-used body fat measurement techniques.',
    type: 'article',
  },
}

export default function JacksonPollockLayout({ children }: { children: React.ReactNode }) {
  return children
}
