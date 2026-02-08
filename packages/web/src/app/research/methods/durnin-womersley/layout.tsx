import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Durnin & Womersley Method | Body Fat Calculator Research',
  description:
    'Comprehensive analysis of the Durnin & Womersley skinfold method, featuring age-specific equations and extensive validation. Learn about its unique approach to accounting for age-related changes in body composition.',
  keywords: [
    'Durnin Womersley method',
    'age-specific body fat',
    'skinfold measurements',
    'body composition aging',
    'body fat equations',
    'geriatric assessment',
    'body density calculation',
    'longitudinal monitoring',
  ],
  openGraph: {
    title: 'Durnin & Womersley Method | Body Fat Calculator Research',
    description:
      'Comprehensive analysis of the Durnin & Womersley skinfold method, featuring age-specific equations and extensive validation. Learn about its unique approach to accounting for age-related changes in body composition.',
    type: 'article',
  },
}

export default function DurninWomersleyLayout({ children }: { children: React.ReactNode }) {
  return children
}
