import { convertMeasurement } from '../conversions/index'
import type { FormulaResult, MeasurementSystem, StandardizedInputs } from '../types/index'
import { calculateBodyFat } from './utils'

export const covertFormula = {
  calculate: (inputs: StandardizedInputs, measurementSystem: MeasurementSystem): FormulaResult => {
    const {
      gender,
      age = 0,
      weight = 0,
      waistCircumference = 0,
      hipsCircumference = 0,
      forearmCircumference = 0,
      wristCircumference = 0,
      thighCircumference = 0,
      calfCircumference = 0,
    } = inputs

    const waistInches =
      measurementSystem === 'metric'
        ? convertMeasurement(waistCircumference as number, 'length', 'metric', 'imperial')
        : (waistCircumference as number)
    const hipsInches =
      measurementSystem === 'metric'
        ? convertMeasurement(hipsCircumference as number, 'length', 'metric', 'imperial')
        : (hipsCircumference as number)
    const forearmInches =
      measurementSystem === 'metric'
        ? convertMeasurement(forearmCircumference as number, 'length', 'metric', 'imperial')
        : (forearmCircumference as number)
    const wristInches =
      measurementSystem === 'metric'
        ? convertMeasurement(wristCircumference as number, 'length', 'metric', 'imperial')
        : (wristCircumference as number)
    const thighInches =
      measurementSystem === 'metric'
        ? convertMeasurement(thighCircumference as number, 'length', 'metric', 'imperial')
        : (thighCircumference as number)
    const calfInches =
      measurementSystem === 'metric'
        ? convertMeasurement(calfCircumference as number, 'length', 'metric', 'imperial')
        : (calfCircumference as number)

    let bodyFatPercentage: number

    if (gender === 'male') {
      const forearmMultiplier = age <= 30 ? 3 : 2.7
      bodyFatPercentage =
        waistInches + 0.5 * hipsInches - forearmMultiplier * forearmInches - wristInches
    } else {
      const thighMultiplier = age <= 30 ? 0.8 : 1
      bodyFatPercentage = hipsInches + thighMultiplier * thighInches - 2 * calfInches - wristInches
    }

    const weightKg =
      measurementSystem === 'metric'
        ? weight
        : convertMeasurement(weight, 'weight', 'imperial', 'metric')

    const { fatMass, leanMass } = calculateBodyFat(bodyFatPercentage, weightKg)

    return { bodyFatPercentage, fatMass, leanMass }
  },
}
