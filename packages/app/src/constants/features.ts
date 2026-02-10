export interface Feature {
  id: string
  name: string
  description?: string
  availability: 'free' | 'pro' | 'pro_plus'
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

  // Pro Features (Legacy Pro + PRO+)
  {
    id: 'advanced_formulas',
    name: 'Advanced Formulas',
    description: 'Jackson & Pollock, Durnin & Womersley, and more',
    availability: 'pro',
  },
  {
    id: 'decimal_precision',
    name: 'Decimal Precision',
    description: 'Get exact measurements to 2 decimal places',
    availability: 'pro',
  },

  // PRO+ Features (subscription only)
  {
    id: 'measurement_history',
    name: 'Measurement History',
    description: 'Track your measurements over time',
    availability: 'pro_plus',
  },
  {
    id: 'cloud_sync',
    name: 'Cloud Sync',
    description: 'Access your data across all your devices',
    availability: 'pro_plus',
  },
  {
    id: 'progress_tracking',
    name: 'Progress Tracking',
    description: 'Visual graphs and trend analysis',
    availability: 'pro_plus',
  },
  {
    id: 'health_integration',
    name: 'Health Integration',
    description: 'Sync with Apple Health and Google Health Connect',
    availability: 'pro_plus',
  },
  {
    id: 'reminders',
    name: 'Measurement Reminders',
    description: 'Get reminded to measure regularly',
    availability: 'pro_plus',
  },
  {
    id: 'family_sharing',
    name: 'Family Sharing',
    description: 'Share PRO+ access with up to 5 family members',
    availability: 'pro_plus',
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
    perMonth: '£1.67',
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
    perMonth: '£0.83',
  },
  lifetime: {
    price: '£24.99',
    period: 'forever',
  },
} as const
