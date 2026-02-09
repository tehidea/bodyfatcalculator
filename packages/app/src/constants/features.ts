export interface Feature {
  id: string
  name: string
  description?: string
  availability: 'free' | 'premium'
}

export const FEATURES: Feature[] = [
  // Free Features
  {
    id: 'basic_formulas',
    name: 'Basic Formulas',
    description: 'YMCA, Modified YMCA, and U.S. Navy methods',
    availability: 'free',
  },
  {
    id: 'unit_conversion',
    name: 'Unit Conversion',
    description: 'Switch between metric and imperial units',
    availability: 'free',
  },
  {
    id: 'basic_results',
    name: 'Basic Results',
    description: 'Body fat percentage and classification',
    availability: 'free',
  },

  // Premium Features
  {
    id: 'advanced_formulas',
    name: 'Advanced Formulas',
    description: 'Jackson & Pollock, Durnin & Womersley, and more',
    availability: 'premium',
  },
  {
    id: 'decimal_precision',
    name: 'Decimal Precision',
    description: 'Get exact measurements to 2 decimal places',
    availability: 'premium',
  },
  {
    id: 'measurement_history',
    name: 'Measurement History',
    description: 'Track your measurements over time',
    availability: 'premium',
  },
  {
    id: 'cloud_sync',
    name: 'Cloud Sync',
    description: 'Access your data across all your devices',
    availability: 'premium',
  },
  {
    id: 'progress_tracking',
    name: 'Progress Tracking',
    description: 'Visual graphs and trend analysis',
    availability: 'premium',
  },
  {
    id: 'health_integration',
    name: 'Health Integration',
    description: 'Sync with Apple Health and Google Health Connect',
    availability: 'premium',
  },
  {
    id: 'reminders',
    name: 'Measurement Reminders',
    description: 'Get reminded to measure regularly',
    availability: 'premium',
  },
  {
    id: 'family_sharing',
    name: 'Family Sharing',
    description: 'Share premium access with up to 5 family members',
    availability: 'premium',
  },
]

export const PRICING = {
  monthly: {
    price: '£3.99',
    period: 'month',
  },
  yearly: {
    price: '£19.99',
    period: 'year',
    savings: '58%',
  },
  lifetime: {
    price: '£49.99',
    period: 'forever',
  },
} as const

export const GRANDFATHERED_PRICING = {
  monthly: {
    price: '£1.99',
    period: 'month',
  },
  yearly: {
    price: '£9.99',
    period: 'year',
    savings: '58%',
  },
  lifetime: {
    price: '£24.99',
    period: 'forever',
  },
} as const
