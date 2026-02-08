import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'US Navy Method | Body Fat Calculator Research',
  description:
    'Comprehensive analysis of the US Navy circumference-based body fat assessment method. Explore its development, validation studies, and applications in military and civilian settings.',
  keywords: [
    'US Navy body fat method',
    'circumference measurements',
    'military body fat standards',
    'body composition assessment',
    'Navy circumference equation',
    'field testing methods',
    'body fat validation studies',
    'military fitness standards',
  ],
  openGraph: {
    title: 'US Navy Method | Body Fat Calculator Research',
    description:
      'Comprehensive analysis of the US Navy circumference-based body fat assessment method. Explore its development, validation studies, and applications in military and civilian settings.',
    type: 'article',
  },
}

export default function NavyMethodLayout({ children }: { children: React.ReactNode }) {
  return children
}
