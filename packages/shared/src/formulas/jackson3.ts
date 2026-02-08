import type { FormulaResult, MeasurementSystem, StandardizedInputs } from '../types/index'
import { calculateBodyFat } from './utils'

export const jackson3Formula = {
  calculate: (inputs: StandardizedInputs, _measurementSystem: MeasurementSystem): FormulaResult => {
    const {
      gender,
      age = 0,
      weight = 0,
      chestSkinfold = 0,
      abdomenSkinfold = 0,
      thighSkinfold = 0,
      tricepSkinfold = 0,
      suprailiacSkinfold = 0,
    } = inputs

    const sumOfSkinfolds =
      gender === 'male'
        ? (chestSkinfold as number) + (abdomenSkinfold as number) + (thighSkinfold as number)
        : (tricepSkinfold as number) + (suprailiacSkinfold as number) + (thighSkinfold as number)

    const bodyDensity =
      gender === 'male'
        ? 1.10938 - 0.0008267 * sumOfSkinfolds + 0.0000016 * sumOfSkinfolds ** 2 - 0.0002574 * age
        : 1.0994921 - 0.0009929 * sumOfSkinfolds + 0.0000023 * sumOfSkinfolds ** 2 - 0.0001392 * age

    const bodyFatPercentage = 495 / bodyDensity - 450
    const { fatMass, leanMass } = calculateBodyFat(bodyFatPercentage, weight)

    return { bodyFatPercentage, fatMass, leanMass }
  },
}
