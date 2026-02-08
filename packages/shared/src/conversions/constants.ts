import type { ConversionType } from './index'

/**
 * Maps input field names to their conversion types
 */
export const INPUT_CONVERSION_MAP: Record<string, ConversionType> = {
  // Basic measurements
  weight: 'weight',
  height: 'length',

  // Circumference measurements (all length)
  neckCircumference: 'length',
  waistCircumference: 'length',
  hipsCircumference: 'length',
  chestCircumference: 'length',
  abdomenCircumference: 'length',
  thighCircumference: 'length',
  calfCircumference: 'length',
  bicepCircumference: 'length',
  tricepCircumference: 'length',
  forearmCircumference: 'length',
  wristCircumference: 'length',

  // Skinfold measurements
  chestSkinfold: 'skinfold',
  abdomenSkinfold: 'skinfold',
  thighSkinfold: 'skinfold',
  tricepSkinfold: 'skinfold',
  bicepSkinfold: 'skinfold',
  subscapularSkinfold: 'skinfold',
  suprailiacSkinfold: 'skinfold',
  midaxillarySkinfold: 'skinfold',
  lowerBackSkinfold: 'skinfold',
  calfSkinfold: 'skinfold',
}

/**
 * Default units for each measurement system
 */
export const DEFAULT_UNITS = {
  metric: {
    weight: 'kg',
    length: 'cm',
    skinfold: 'mm',
  },
  imperial: {
    weight: 'lb',
    length: 'in',
    skinfold: 'in',
  },
} as const

/**
 * Unit labels for display
 */
export const UNIT_LABELS = {
  metric: {
    weight: 'kilograms',
    length: 'centimeters',
    skinfold: 'millimeters',
  },
  imperial: {
    weight: 'pounds',
    length: 'inches',
    skinfold: 'inches',
  },
} as const
