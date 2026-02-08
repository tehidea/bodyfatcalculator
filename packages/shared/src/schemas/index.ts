import { z } from 'zod'
import type { Formula, ValidationResult } from '../types/index'
import { isValidFormula } from '../types/index'

export const calculationResultSchema = z
  .object({
    bodyFatPercentage: z
      .number()
      .min(0, 'Body fat percentage cannot be negative')
      .max(100, 'Body fat percentage cannot exceed 100%'),
    fatMass: z.number().min(0, 'Fat mass cannot be negative'),
    leanMass: z.number().min(0, 'Lean mass cannot be negative'),
  })
  .strict()

export function validateCalculationResult(result: unknown): ValidationResult {
  try {
    calculationResultSchema.parse(result)
    return { success: true, errors: {} }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {}
      error.errors.forEach((err) => {
        const path = err.path.join('.')
        errors[path] = err.message
      })
      return { success: false, errors }
    }
    return {
      success: false,
      errors: { _: error instanceof Error ? error.message : 'Unknown validation error' },
    }
  }
}

export { isValidFormula }
export type { Formula, ValidationResult }
