import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Parrillo Method | Body Fat Calculator Research',
  description:
    'Comprehensive analysis of the Parrillo body fat assessment method, developed specifically for bodybuilders and athletes. Learn about its unique approach to measuring body composition in lean individuals.',
  keywords: [
    'Parrillo method',
    'bodybuilding body fat',
    'athletic body composition',
    'competition preparation',
    'lean mass assessment',
    'skinfold measurements',
    'body fat testing',
    'athletic performance',
  ],
  openGraph: {
    title: 'Parrillo Method | Body Fat Calculator Research',
    description:
      'Comprehensive analysis of the Parrillo body fat assessment method, developed specifically for bodybuilders and athletes. Learn about its unique approach to measuring body composition in lean individuals.',
    type: 'article',
  },
}

export default function ParrilloMethodLayout({ children }: { children: React.ReactNode }) {
  return children
}
