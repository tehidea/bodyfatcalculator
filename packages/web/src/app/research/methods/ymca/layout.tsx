import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'YMCA Method | Body Fat Calculator Research',
  description:
    'Comprehensive analysis of the YMCA body fat assessment method, including original and modified protocols. Explore its development, validation studies, and applications in fitness and health assessment settings.',
  keywords: [
    'YMCA body fat method',
    'fitness assessment protocol',
    'body composition testing',
    'modified YMCA method',
    'circumference measurements',
    'fitness center testing',
    'health screening methods',
    'body fat validation studies',
  ],
  openGraph: {
    title: 'YMCA Method | Body Fat Calculator Research',
    description:
      'Comprehensive analysis of the YMCA body fat assessment method, including original and modified protocols. Explore its development, validation studies, and applications in fitness and health assessment settings.',
    type: 'article',
  },
}

export default function YMCAMethodLayout({ children }: { children: React.ReactNode }) {
  return children
}
