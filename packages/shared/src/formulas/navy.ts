import { convertMeasurement } from '../conversions/index'
import type { FormulaResult, MeasurementSystem, StandardizedInputs } from '../types/index'
import { calculateBodyFat } from './utils'

export const navyFormula = {
  calculate: (inputs: StandardizedInputs, measurementSystem: MeasurementSystem): FormulaResult => {
    const {
      gender,
      weight = 0,
      height = 0,
      neckCircumference = 0,
      waistCircumference = 0,
      hipsCircumference = 0,
    } = inputs

    const heightInches =
      measurementSystem === 'metric'
        ? convertMeasurement(height, 'length', 'metric', 'imperial')
        : height
    const neckInches =
      measurementSystem === 'metric'
        ? convertMeasurement(neckCircumference as number, 'length', 'metric', 'imperial')
        : (neckCircumference as number)
    const waistInches =
      measurementSystem === 'metric'
        ? convertMeasurement(waistCircumference as number, 'length', 'metric', 'imperial')
        : (waistCircumference as number)
    const hipsInches =
      measurementSystem === 'metric'
        ? convertMeasurement(hipsCircumference as number, 'length', 'metric', 'imperial')
        : (hipsCircumference as number)

    const bodyFatPercentage =
      gender === 'male'
        ? 86.01 * Math.log10(waistInches - neckInches) - 70.041 * Math.log10(heightInches) + 36.76
        : 163.205 * Math.log10(waistInches + hipsInches - neckInches) -
          97.684 * Math.log10(heightInches) -
          78.387

    const weightKg =
      measurementSystem === 'metric'
        ? weight
        : convertMeasurement(weight, 'weight', 'imperial', 'metric')

    const { fatMass, leanMass } = calculateBodyFat(bodyFatPercentage, weightKg)

    return { bodyFatPercentage, fatMass, leanMass }
  },
}
