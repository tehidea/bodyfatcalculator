import { describe, expect, it } from 'vitest'
import {
  calculateResults,
  getAvailableFormulas,
  getFormula,
  isFormulaAvailable,
} from '../../formulas/index'
import type { Formula, StandardizedInputs } from '../../types/index'

const maleInputs: StandardizedInputs = {
  weight: 80,
  height: 178,
  age: 30,
  waistCircumference: 85,
  neckCircumference: 38,
  hipsCircumference: 95,
}

describe('getAvailableFormulas', () => {
  it('returns exactly 9 formulas', () => {
    const formulas = getAvailableFormulas()
    expect(formulas).toHaveLength(9)
  })

  it('returns formulas in the defined order', () => {
    const formulas = getAvailableFormulas()
    expect(formulas).toEqual([
      'ymca',
      'mymca',
      'navy',
      'covert',
      'jack3',
      'durnin',
      'jack4',
      'jack7',
      'parrillo',
    ])
  })
})

describe('isFormulaAvailable', () => {
  const allFormulas: Formula[] = [
    'ymca',
    'mymca',
    'navy',
    'covert',
    'jack3',
    'durnin',
    'jack4',
    'jack7',
    'parrillo',
  ]

  it('returns true for all valid formula keys', () => {
    for (const formula of allFormulas) {
      expect(isFormulaAvailable(formula)).toBe(true)
    }
  })
})

describe('getFormula', () => {
  const allFormulas: Formula[] = [
    'ymca',
    'mymca',
    'navy',
    'covert',
    'jack3',
    'durnin',
    'jack4',
    'jack7',
    'parrillo',
  ]

  it('returns an object with a calculate function for each formula', () => {
    for (const formula of allFormulas) {
      const impl = getFormula(formula)
      expect(impl).toBeDefined()
      expect(typeof impl.calculate).toBe('function')
    }
  })
})

describe('calculateResults', () => {
  it('returns a result with classification for YMCA formula', async () => {
    const result = await calculateResults('ymca', 'male', maleInputs, 'metric')
    expect(result).toHaveProperty('bodyFatPercentage')
    expect(result).toHaveProperty('fatMass')
    expect(result).toHaveProperty('leanMass')
    expect(result).toHaveProperty('classification')
    expect(typeof result.classification).toBe('string')
  })

  it('returns body fat in 1-60% range for reasonable inputs', async () => {
    const result = await calculateResults('ymca', 'male', maleInputs, 'metric')
    expect(result.bodyFatPercentage).toBeGreaterThan(1)
    expect(result.bodyFatPercentage).toBeLessThan(60)
  })

  it('returns a result with classification for Navy formula', async () => {
    const result = await calculateResults('navy', 'male', maleInputs, 'metric')
    expect(result).toHaveProperty('classification')
    expect(typeof result.classification).toBe('string')
    expect(result.bodyFatPercentage).toBeGreaterThan(1)
    expect(result.bodyFatPercentage).toBeLessThan(60)
  })

  it('returns a result for female inputs', async () => {
    const femaleInputs: StandardizedInputs = {
      weight: 65,
      height: 165,
      age: 30,
      waistCircumference: 72,
      neckCircumference: 33,
      hipsCircumference: 100,
    }
    const result = await calculateResults('navy', 'female', femaleInputs, 'metric')
    expect(result.bodyFatPercentage).toBeGreaterThan(1)
    expect(result.bodyFatPercentage).toBeLessThan(60)
    expect(result).toHaveProperty('classification')
  })
})
