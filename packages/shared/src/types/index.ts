export type Gender = 'male' | 'female'
export type MeasurementSystem = 'metric' | 'imperial'

export const VALID_FORMULAS = [
  'ymca',
  'mymca',
  'navy',
  'covert',
  'jack3',
  'durnin',
  'jack4',
  'jack7',
  'parrillo',
] as const

export type Formula = (typeof VALID_FORMULAS)[number]

export function isValidFormula(formula: unknown): formula is Formula {
  return typeof formula === 'string' && VALID_FORMULAS.includes(formula as Formula)
}

export interface CalculationResult {
  bodyFatPercentage: number
  fatMass: number
  leanMass: number
  classification?: string
}

export interface FormulaResult {
  bodyFatPercentage: number
  fatMass: number
  leanMass: number
}

export interface StandardizedInputs {
  weight?: number
  height?: number
  age?: number
  gender?: Gender
  [key: string]: number | string | null | undefined
}

export interface FormulaImplementation {
  calculate: (inputs: StandardizedInputs, measurementSystem: MeasurementSystem) => FormulaResult
  requiredFields?: string[]
  description?: string
  references?: string[]
}

export interface ValidationResult {
  success: boolean
  errors: Record<string, string>
}
