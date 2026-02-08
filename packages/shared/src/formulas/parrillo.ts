import { convertMeasurement } from '../conversions/index.ts'
import type { FormulaResult, MeasurementSystem, StandardizedInputs } from '../types/index.ts'
import { calculateBodyFat } from './utils.ts'

export const parrilloFormula = {
  calculate: (inputs: StandardizedInputs, measurementSystem: MeasurementSystem): FormulaResult => {
    const {
      weight = 0,
      chestSkinfold = 0,
      abdomenSkinfold = 0,
      thighSkinfold = 0,
      bicepSkinfold = 0,
      tricepSkinfold = 0,
      subscapularSkinfold = 0,
      suprailiacSkinfold = 0,
      lowerBackSkinfold = 0,
      calfSkinfold = 0,
    } = inputs

    const weightLbs =
      measurementSystem === 'metric'
        ? convertMeasurement(weight, 'weight', 'metric', 'imperial')
        : weight

    const sumOfSkinfolds =
      (chestSkinfold as number) +
      (abdomenSkinfold as number) +
      (thighSkinfold as number) +
      (bicepSkinfold as number) +
      (tricepSkinfold as number) +
      (subscapularSkinfold as number) +
      (suprailiacSkinfold as number) +
      (lowerBackSkinfold as number) +
      (calfSkinfold as number)

    const bodyFatPercentage = (sumOfSkinfolds * 27) / weightLbs

    const weightKg =
      measurementSystem === 'metric'
        ? weight
        : convertMeasurement(weight, 'weight', 'imperial', 'metric')

    const { fatMass, leanMass } = calculateBodyFat(bodyFatPercentage, weightKg)

    return { bodyFatPercentage, fatMass, leanMass }
  },
}
