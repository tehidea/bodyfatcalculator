import { describe, expect, it } from 'vitest'
import { convertMeasurement } from '../../conversions/index'
import { covertFormula } from '../../formulas/covert'
import { durninFormula } from '../../formulas/durnin'
import { jackson3Formula } from '../../formulas/jackson3'
import { jackson4Formula } from '../../formulas/jackson4'
import { jackson7Formula } from '../../formulas/jackson7'
import { mymcaFormula } from '../../formulas/mymca'
import { navyFormula } from '../../formulas/navy'
import { parrilloFormula } from '../../formulas/parrillo'
import { ymcaFormula } from '../../formulas/ymca'
import type { MeasurementSystem, StandardizedInputs } from '../../types/index'

// Helper to convert metric circumference inputs to imperial equivalents
function toImperialCircumferences(metric: StandardizedInputs): StandardizedInputs {
  const imperial: StandardizedInputs = { ...metric }

  if (metric.weight != null) {
    imperial.weight = convertMeasurement(metric.weight as number, 'weight', 'metric', 'imperial')
  }
  if (metric.height != null) {
    imperial.height = convertMeasurement(metric.height as number, 'length', 'metric', 'imperial')
  }

  const lengthFields = [
    'waistCircumference',
    'neckCircumference',
    'hipsCircumference',
    'wristCircumference',
    'forearmCircumference',
    'thighCircumference',
    'calfCircumference',
  ]

  for (const field of lengthFields) {
    if (metric[field] != null) {
      imperial[field] = convertMeasurement(metric[field] as number, 'length', 'metric', 'imperial')
    }
  }

  return imperial
}

function expectValidResult(result: {
  bodyFatPercentage: number
  fatMass: number
  leanMass: number
}) {
  expect(result).toHaveProperty('bodyFatPercentage')
  expect(result).toHaveProperty('fatMass')
  expect(result).toHaveProperty('leanMass')
  expect(result.bodyFatPercentage).toBeGreaterThan(1)
  expect(result.bodyFatPercentage).toBeLessThan(60)
  expect(typeof result.fatMass).toBe('number')
  expect(typeof result.leanMass).toBe('number')
}

// Standard male metric inputs
const maleMetric: StandardizedInputs = {
  gender: 'male',
  weight: 80,
  height: 178,
  age: 30,
  waistCircumference: 85,
  neckCircumference: 38,
  hipsCircumference: 95,
  wristCircumference: 17,
  forearmCircumference: 28,
  thighCircumference: 55,
  calfCircumference: 38,
  // Skinfolds (mm)
  chestSkinfold: 15,
  abdomenSkinfold: 20,
  thighSkinfold: 18,
  tricepSkinfold: 12,
  subscapularSkinfold: 16,
  suprailiacSkinfold: 14,
  midaxillarySkinfold: 10,
  bicepSkinfold: 8,
  lowerBackSkinfold: 15,
  calfSkinfold: 10,
}

// Standard female metric inputs
const femaleMetric: StandardizedInputs = {
  gender: 'female',
  weight: 65,
  height: 165,
  age: 30,
  waistCircumference: 72,
  neckCircumference: 33,
  hipsCircumference: 100,
  wristCircumference: 15,
  forearmCircumference: 24,
  thighCircumference: 58,
  calfCircumference: 37,
  // Skinfolds (mm)
  chestSkinfold: 18,
  abdomenSkinfold: 22,
  thighSkinfold: 25,
  tricepSkinfold: 18,
  subscapularSkinfold: 16,
  suprailiacSkinfold: 15,
  midaxillarySkinfold: 12,
  bicepSkinfold: 10,
  lowerBackSkinfold: 18,
  calfSkinfold: 14,
}

describe('YMCA formula', () => {
  it('calculates valid BF% for male with metric inputs', () => {
    const result = ymcaFormula.calculate(maleMetric, 'metric')
    expectValidResult(result)
  })

  it('calculates valid BF% for female with metric inputs', () => {
    const result = ymcaFormula.calculate(femaleMetric, 'metric')
    expectValidResult(result)
  })

  it('returns different results for male vs female', () => {
    const male = ymcaFormula.calculate(maleMetric, 'metric')
    const female = ymcaFormula.calculate(femaleMetric, 'metric')
    expect(male.bodyFatPercentage).not.toBe(female.bodyFatPercentage)
  })

  it('gives approximately the same BF% for equivalent metric and imperial inputs', () => {
    const metricResult = ymcaFormula.calculate(maleMetric, 'metric')
    const imperialInputs = toImperialCircumferences(maleMetric)
    const imperialResult = ymcaFormula.calculate(imperialInputs, 'imperial')
    expect(metricResult.bodyFatPercentage).toBeCloseTo(imperialResult.bodyFatPercentage, 0)
  })

  it('bigger waist leads to higher BF%', () => {
    const normalResult = ymcaFormula.calculate(maleMetric, 'metric')
    const biggerWaist: StandardizedInputs = {
      ...maleMetric,
      waistCircumference: 95,
    }
    const biggerResult = ymcaFormula.calculate(biggerWaist, 'metric')
    expect(biggerResult.bodyFatPercentage).toBeGreaterThan(normalResult.bodyFatPercentage)
  })
})

describe('Modified YMCA formula', () => {
  it('calculates valid BF% for male with metric inputs', () => {
    const result = mymcaFormula.calculate(maleMetric, 'metric')
    expectValidResult(result)
  })

  it('calculates valid BF% for female with metric inputs', () => {
    const result = mymcaFormula.calculate(femaleMetric, 'metric')
    expectValidResult(result)
  })

  it('returns different results for male vs female', () => {
    const male = mymcaFormula.calculate(maleMetric, 'metric')
    const female = mymcaFormula.calculate(femaleMetric, 'metric')
    expect(male.bodyFatPercentage).not.toBe(female.bodyFatPercentage)
  })

  it('gives approximately the same BF% for equivalent metric and imperial inputs', () => {
    const metricResult = mymcaFormula.calculate(maleMetric, 'metric')
    const imperialInputs = toImperialCircumferences(maleMetric)
    const imperialResult = mymcaFormula.calculate(imperialInputs, 'imperial')
    expect(metricResult.bodyFatPercentage).toBeCloseTo(imperialResult.bodyFatPercentage, 0)
  })

  it('bigger waist leads to higher BF% for male', () => {
    const normalResult = mymcaFormula.calculate(maleMetric, 'metric')
    const biggerWaist: StandardizedInputs = {
      ...maleMetric,
      waistCircumference: 95,
    }
    const biggerResult = mymcaFormula.calculate(biggerWaist, 'metric')
    expect(biggerResult.bodyFatPercentage).toBeGreaterThan(normalResult.bodyFatPercentage)
  })
})

describe('Navy formula', () => {
  it('calculates valid BF% for male with metric inputs', () => {
    const result = navyFormula.calculate(maleMetric, 'metric')
    expectValidResult(result)
  })

  it('calculates valid BF% for female with metric inputs', () => {
    const result = navyFormula.calculate(femaleMetric, 'metric')
    expectValidResult(result)
  })

  it('returns different results for male vs female', () => {
    const male = navyFormula.calculate(maleMetric, 'metric')
    const female = navyFormula.calculate(femaleMetric, 'metric')
    expect(male.bodyFatPercentage).not.toBe(female.bodyFatPercentage)
  })

  it('gives approximately the same BF% for equivalent metric and imperial inputs', () => {
    const metricResult = navyFormula.calculate(maleMetric, 'metric')
    const imperialInputs = toImperialCircumferences(maleMetric)
    const imperialResult = navyFormula.calculate(imperialInputs, 'imperial')
    expect(metricResult.bodyFatPercentage).toBeCloseTo(imperialResult.bodyFatPercentage, 0)
  })

  it('bigger waist leads to higher BF%', () => {
    const normalResult = navyFormula.calculate(maleMetric, 'metric')
    const biggerWaist: StandardizedInputs = {
      ...maleMetric,
      waistCircumference: 95,
    }
    const biggerResult = navyFormula.calculate(biggerWaist, 'metric')
    expect(biggerResult.bodyFatPercentage).toBeGreaterThan(normalResult.bodyFatPercentage)
  })
})

describe('Covert Bailey formula', () => {
  it('calculates valid BF% for male with metric inputs', () => {
    const result = covertFormula.calculate(maleMetric, 'metric')
    expectValidResult(result)
  })

  it('calculates valid BF% for female with metric inputs', () => {
    const result = covertFormula.calculate(femaleMetric, 'metric')
    expectValidResult(result)
  })

  it('returns different results for male vs female', () => {
    const male = covertFormula.calculate(maleMetric, 'metric')
    const female = covertFormula.calculate(femaleMetric, 'metric')
    expect(male.bodyFatPercentage).not.toBe(female.bodyFatPercentage)
  })

  it('gives approximately the same BF% for equivalent metric and imperial inputs', () => {
    const metricResult = covertFormula.calculate(maleMetric, 'metric')
    const imperialInputs = toImperialCircumferences(maleMetric)
    const imperialResult = covertFormula.calculate(imperialInputs, 'imperial')
    expect(metricResult.bodyFatPercentage).toBeCloseTo(imperialResult.bodyFatPercentage, 0)
  })

  it('uses different forearm multiplier for age <= 30 vs > 30 (male)', () => {
    const young: StandardizedInputs = { ...maleMetric, age: 25 }
    const old: StandardizedInputs = { ...maleMetric, age: 35 }
    const youngResult = covertFormula.calculate(young, 'metric')
    const oldResult = covertFormula.calculate(old, 'metric')
    expect(youngResult.bodyFatPercentage).not.toBe(oldResult.bodyFatPercentage)
  })

  it('uses different thigh multiplier for age <= 30 vs > 30 (female)', () => {
    const young: StandardizedInputs = { ...femaleMetric, age: 25 }
    const old: StandardizedInputs = { ...femaleMetric, age: 35 }
    const youngResult = covertFormula.calculate(young, 'metric')
    const oldResult = covertFormula.calculate(old, 'metric')
    expect(youngResult.bodyFatPercentage).not.toBe(oldResult.bodyFatPercentage)
  })
})

describe('Durnin & Womersley formula', () => {
  it('calculates valid BF% for male with metric inputs', () => {
    const result = durninFormula.calculate(maleMetric, 'metric')
    expectValidResult(result)
  })

  it('calculates valid BF% for female with metric inputs', () => {
    const result = durninFormula.calculate(femaleMetric, 'metric')
    expectValidResult(result)
  })

  it('returns different results for male vs female', () => {
    const male = durninFormula.calculate(maleMetric, 'metric')
    const female = durninFormula.calculate(femaleMetric, 'metric')
    expect(male.bodyFatPercentage).not.toBe(female.bodyFatPercentage)
  })

  it('uses skinfolds directly (no unit conversion needed)', () => {
    // Durnin uses skinfolds in mm, so metric and imperial should give same result
    const metricResult = durninFormula.calculate(maleMetric, 'metric')
    const imperialResult = durninFormula.calculate(maleMetric, 'imperial')
    expect(metricResult.bodyFatPercentage).toBe(imperialResult.bodyFatPercentage)
  })

  it('different age brackets give different results', () => {
    const age25: StandardizedInputs = { ...maleMetric, age: 25 }
    const age45: StandardizedInputs = { ...maleMetric, age: 45 }
    const result25 = durninFormula.calculate(age25, 'metric')
    const result45 = durninFormula.calculate(age45, 'metric')
    expect(result25.bodyFatPercentage).not.toBe(result45.bodyFatPercentage)
  })
})

describe('Jackson & Pollock 3-site formula', () => {
  it('calculates valid BF% for male with metric inputs', () => {
    const result = jackson3Formula.calculate(maleMetric, 'metric')
    expectValidResult(result)
  })

  it('calculates valid BF% for female with metric inputs', () => {
    const result = jackson3Formula.calculate(femaleMetric, 'metric')
    expectValidResult(result)
  })

  it('returns different results for male vs female', () => {
    const male = jackson3Formula.calculate(maleMetric, 'metric')
    const female = jackson3Formula.calculate(femaleMetric, 'metric')
    expect(male.bodyFatPercentage).not.toBe(female.bodyFatPercentage)
  })

  it('uses different skinfold sites for male and female', () => {
    // Male uses chest + abdomen + thigh; female uses tricep + suprailiac + thigh
    // Change chest skinfold - should affect male but not female
    const modifiedChest: StandardizedInputs = {
      ...maleMetric,
      gender: 'male',
      chestSkinfold: 30,
    }
    const original = jackson3Formula.calculate(maleMetric, 'metric')
    const modified = jackson3Formula.calculate(modifiedChest, 'metric')
    expect(original.bodyFatPercentage).not.toBe(modified.bodyFatPercentage)

    // Same change should not affect female calculation
    const femaleOriginal = jackson3Formula.calculate(femaleMetric, 'metric')
    const femaleModified = jackson3Formula.calculate(
      { ...femaleMetric, chestSkinfold: 30 },
      'metric',
    )
    expect(femaleOriginal.bodyFatPercentage).toBe(femaleModified.bodyFatPercentage)
  })
})

describe('Jackson & Pollock 4-site formula', () => {
  it('calculates valid BF% for male with metric inputs', () => {
    const result = jackson4Formula.calculate(maleMetric, 'metric')
    expectValidResult(result)
  })

  it('calculates valid BF% for female with metric inputs', () => {
    const result = jackson4Formula.calculate(femaleMetric, 'metric')
    expectValidResult(result)
  })

  it('returns different results for male vs female', () => {
    const male = jackson4Formula.calculate(maleMetric, 'metric')
    const female = jackson4Formula.calculate(femaleMetric, 'metric')
    expect(male.bodyFatPercentage).not.toBe(female.bodyFatPercentage)
  })

  it('uses same 4 skinfold sites for both genders', () => {
    // Changing a non-used skinfold should not affect result
    const maleOriginal = jackson4Formula.calculate(maleMetric, 'metric')
    const maleModified = jackson4Formula.calculate({ ...maleMetric, chestSkinfold: 30 }, 'metric')
    expect(maleOriginal.bodyFatPercentage).toBe(maleModified.bodyFatPercentage)
  })

  it('higher skinfolds lead to higher BF%', () => {
    const normal = jackson4Formula.calculate(maleMetric, 'metric')
    const thicker: StandardizedInputs = {
      ...maleMetric,
      abdomenSkinfold: 30,
      thighSkinfold: 28,
      tricepSkinfold: 22,
      suprailiacSkinfold: 24,
    }
    const thickerResult = jackson4Formula.calculate(thicker, 'metric')
    expect(thickerResult.bodyFatPercentage).toBeGreaterThan(normal.bodyFatPercentage)
  })
})

describe('Jackson & Pollock 7-site formula', () => {
  it('calculates valid BF% for male with metric inputs', () => {
    const result = jackson7Formula.calculate(maleMetric, 'metric')
    expectValidResult(result)
  })

  it('calculates valid BF% for female with metric inputs', () => {
    const result = jackson7Formula.calculate(femaleMetric, 'metric')
    expectValidResult(result)
  })

  it('returns different results for male vs female', () => {
    const male = jackson7Formula.calculate(maleMetric, 'metric')
    const female = jackson7Formula.calculate(femaleMetric, 'metric')
    expect(male.bodyFatPercentage).not.toBe(female.bodyFatPercentage)
  })

  it('higher skinfolds lead to higher BF%', () => {
    const normal = jackson7Formula.calculate(maleMetric, 'metric')
    const thicker: StandardizedInputs = {
      ...maleMetric,
      chestSkinfold: 25,
      abdomenSkinfold: 30,
      thighSkinfold: 28,
      tricepSkinfold: 22,
      subscapularSkinfold: 26,
      suprailiacSkinfold: 24,
      midaxillarySkinfold: 20,
    }
    const thickerResult = jackson7Formula.calculate(thicker, 'metric')
    expect(thickerResult.bodyFatPercentage).toBeGreaterThan(normal.bodyFatPercentage)
  })
})

describe('Parrillo formula', () => {
  it('calculates valid BF% for male with metric inputs', () => {
    const result = parrilloFormula.calculate(maleMetric, 'metric')
    expectValidResult(result)
  })

  it('calculates valid BF% for female with metric inputs', () => {
    const result = parrilloFormula.calculate(femaleMetric, 'metric')
    expectValidResult(result)
  })

  it('gives approximately the same BF% for equivalent metric and imperial inputs', () => {
    const metricResult = parrilloFormula.calculate(maleMetric, 'metric')
    const imperialInputs = toImperialCircumferences(maleMetric)
    const imperialResult = parrilloFormula.calculate(imperialInputs, 'imperial')
    expect(metricResult.bodyFatPercentage).toBeCloseTo(imperialResult.bodyFatPercentage, 0)
  })

  it('higher skinfolds lead to higher BF%', () => {
    const normal = parrilloFormula.calculate(maleMetric, 'metric')
    const thicker: StandardizedInputs = {
      ...maleMetric,
      chestSkinfold: 25,
      abdomenSkinfold: 30,
      thighSkinfold: 28,
      bicepSkinfold: 18,
      tricepSkinfold: 22,
      subscapularSkinfold: 26,
      suprailiacSkinfold: 24,
      lowerBackSkinfold: 25,
      calfSkinfold: 20,
    }
    const thickerResult = parrilloFormula.calculate(thicker, 'metric')
    expect(thickerResult.bodyFatPercentage).toBeGreaterThan(normal.bodyFatPercentage)
  })

  it('is gender-agnostic (same inputs give same result)', () => {
    const maleInputs: StandardizedInputs = { ...maleMetric, gender: 'male' }
    const femaleInputs: StandardizedInputs = {
      ...maleMetric,
      gender: 'female',
    }
    const maleResult = parrilloFormula.calculate(maleInputs, 'metric')
    const femaleResult = parrilloFormula.calculate(femaleInputs, 'metric')
    expect(maleResult.bodyFatPercentage).toBe(femaleResult.bodyFatPercentage)
  })
})
