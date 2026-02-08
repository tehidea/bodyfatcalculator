import type { FormulaResult, MeasurementSystem, StandardizedInputs } from '../types/index.ts'
import { calculateBodyFat } from './utils.ts'

export const jackson4Formula = {
  calculate: (inputs: StandardizedInputs, _measurementSystem: MeasurementSystem): FormulaResult => {
    const {
      gender,
      age = 0,
      weight = 0,
      abdomenSkinfold = 0,
      thighSkinfold = 0,
      tricepSkinfold = 0,
      suprailiacSkinfold = 0,
    } = inputs

    const sumOfSkinfolds =
      (abdomenSkinfold as number) +
      (thighSkinfold as number) +
      (tricepSkinfold as number) +
      (suprailiacSkinfold as number)

    const bodyFatPercentage =
      gender === 'male'
        ? 0.29288 * sumOfSkinfolds - 0.0005 * sumOfSkinfolds ** 2 + 0.15845 * age - 5.76377
        : 0.29669 * sumOfSkinfolds - 0.00043 * sumOfSkinfolds ** 2 + 0.02963 * age + 1.4072

    const { fatMass, leanMass } = calculateBodyFat(bodyFatPercentage, weight)

    return { bodyFatPercentage, fatMass, leanMass }
  },
}
