import type { FormulaResult, MeasurementSystem, StandardizedInputs } from '../types/index'
import { calculateBodyFat } from './utils'

export const durninFormula = {
  calculate: (inputs: StandardizedInputs, _measurementSystem: MeasurementSystem): FormulaResult => {
    const {
      gender,
      age = 0,
      weight = 0,
      bicepSkinfold = 0,
      tricepSkinfold = 0,
      subscapularSkinfold = 0,
      suprailiacSkinfold = 0,
    } = inputs

    const sumOfSkinfolds = Math.log10(
      (bicepSkinfold as number) +
        (tricepSkinfold as number) +
        (subscapularSkinfold as number) +
        (suprailiacSkinfold as number),
    )

    let bodyDensity: number

    if (gender === 'male') {
      if (age < 17) bodyDensity = 1.1533 - 0.0643 * sumOfSkinfolds
      else if (age <= 19) bodyDensity = 1.162 - 0.063 * sumOfSkinfolds
      else if (age <= 29) bodyDensity = 1.1631 - 0.0632 * sumOfSkinfolds
      else if (age <= 39) bodyDensity = 1.1422 - 0.0544 * sumOfSkinfolds
      else if (age <= 49) bodyDensity = 1.162 - 0.07 * sumOfSkinfolds
      else bodyDensity = 1.1715 - 0.0779 * sumOfSkinfolds
    } else {
      if (age < 17) bodyDensity = 1.1369 - 0.0598 * sumOfSkinfolds
      else if (age <= 19) bodyDensity = 1.1549 - 0.0678 * sumOfSkinfolds
      else if (age <= 29) bodyDensity = 1.1599 - 0.0717 * sumOfSkinfolds
      else if (age <= 39) bodyDensity = 1.1423 - 0.0632 * sumOfSkinfolds
      else if (age <= 49) bodyDensity = 1.1333 - 0.0612 * sumOfSkinfolds
      else bodyDensity = 1.1339 - 0.0645 * sumOfSkinfolds
    }

    const bodyFatPercentage = 495 / bodyDensity - 450
    const { fatMass, leanMass } = calculateBodyFat(bodyFatPercentage, weight)

    return { bodyFatPercentage, fatMass, leanMass }
  },
}
