import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Covert Bailey Method | Body Fat Calculator Research',
  description:
    'Comprehensive analysis of the Covert Bailey body fat assessment method, known for its practical approach to fitness and body composition measurement. Learn about its development, validation studies, and applications in general fitness assessment.',
  keywords: [
    'Covert Bailey method',
    'fitness assessment',
    'body composition measurement',
    'circumference measurements',
    'practical fitness testing',
    'health screening',
    'body fat calculation',
    'fitness program design',
  ],
  openGraph: {
    title: 'Covert Bailey Method | Body Fat Calculator Research',
    description:
      'Comprehensive analysis of the Covert Bailey body fat assessment method, known for its practical approach to fitness and body composition measurement. Learn about its development, validation studies, and applications in general fitness assessment.',
    type: 'article',
  },
}

export default function CovertBaileyMethodLayout({ children }: { children: React.ReactNode }) {
  return children
}
