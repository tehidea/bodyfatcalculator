import type { FormulaResult, MeasurementSystem, StandardizedInputs } from '../types/index.ts'
import { calculateBodyFat } from './utils.ts'

export const jackson7Formula = {
  calculate: (inputs: StandardizedInputs, _measurementSystem: MeasurementSystem): FormulaResult => {
    const {
      gender,
      age = 0,
      weight = 0,
      chestSkinfold = 0,
      abdomenSkinfold = 0,
      thighSkinfold = 0,
      tricepSkinfold = 0,
      subscapularSkinfold = 0,
      suprailiacSkinfold = 0,
      midaxillarySkinfold = 0,
    } = inputs

    const sumOfSkinfolds =
      (chestSkinfold as number) +
      (abdomenSkinfold as number) +
      (thighSkinfold as number) +
      (tricepSkinfold as number) +
      (subscapularSkinfold as number) +
      (suprailiacSkinfold as number) +
      (midaxillarySkinfold as number)

    const bodyDensity =
      gender === 'male'
        ? 1.112 - 0.00043499 * sumOfSkinfolds + 0.00000055 * sumOfSkinfolds ** 2 - 0.00028826 * age
        : 1.097 - 0.00046971 * sumOfSkinfolds + 0.00000056 * sumOfSkinfolds ** 2 - 0.00012828 * age

    const bodyFatPercentage = 495 / bodyDensity - 450
    const { fatMass, leanMass } = calculateBodyFat(bodyFatPercentage, weight)

    return { bodyFatPercentage, fatMass, leanMass }
  },
}
