import { describe, expect, it } from 'vitest'
import {
  convertMeasurement,
  formatMeasurement,
  getUnit,
  isReasonableMeasurement,
  needsConversion,
} from '../conversions/index'

describe('convertMeasurement', () => {
  it('converts kg to lb', () => {
    const result = convertMeasurement(80, 'weight', 'metric', 'imperial')
    expect(result).toBeCloseTo(176.37, 1)
  })

  it('converts lb to kg', () => {
    const result = convertMeasurement(176.37, 'weight', 'imperial', 'metric')
    expect(result).toBeCloseTo(80, 0)
  })

  it('converts cm to inches', () => {
    const result = convertMeasurement(180, 'length', 'metric', 'imperial')
    expect(result).toBeCloseTo(70.87, 1)
  })

  it('converts inches to cm', () => {
    const result = convertMeasurement(70.87, 'length', 'imperial', 'metric')
    expect(result).toBeCloseTo(180, 0)
  })

  it('returns same value (rounded) when systems are the same', () => {
    expect(convertMeasurement(80, 'weight', 'metric', 'metric')).toBe(80)
    expect(convertMeasurement(176.37, 'weight', 'imperial', 'imperial')).toBe(176.37)
  })

  it('returns same value for skinfold type regardless of systems', () => {
    expect(convertMeasurement(15, 'skinfold', 'metric', 'imperial')).toBe(15)
    expect(convertMeasurement(15, 'skinfold', 'imperial', 'metric')).toBe(15)
  })

  it('returns same value for none type regardless of systems', () => {
    expect(convertMeasurement(30, 'none', 'metric', 'imperial')).toBe(30)
    expect(convertMeasurement(30, 'none', 'imperial', 'metric')).toBe(30)
  })

  it('throws for negative values', () => {
    expect(() => convertMeasurement(-1, 'weight', 'metric', 'imperial')).toThrow()
  })

  it('throws for NaN', () => {
    expect(() => convertMeasurement(NaN, 'weight', 'metric', 'imperial')).toThrow()
  })

  it('throws for Infinity', () => {
    expect(() => convertMeasurement(Infinity, 'weight', 'metric', 'imperial')).toThrow()
  })

  it('applies correct precision for weight (2 decimal places)', () => {
    const result = convertMeasurement(80, 'weight', 'metric', 'imperial')
    const decimalPart = result.toString().split('.')[1]
    expect(decimalPart ? decimalPart.length : 0).toBeLessThanOrEqual(2)
  })

  it('applies correct precision for length (2 decimal places)', () => {
    const result = convertMeasurement(180, 'length', 'metric', 'imperial')
    const decimalPart = result.toString().split('.')[1]
    expect(decimalPart ? decimalPart.length : 0).toBeLessThanOrEqual(2)
  })

  it('applies correct precision for skinfold (0 decimal places)', () => {
    const result = convertMeasurement(15, 'skinfold', 'metric', 'imperial')
    expect(Number.isInteger(result)).toBe(true)
  })

  it('applies correct precision for none (0 decimal places)', () => {
    const result = convertMeasurement(30, 'none', 'metric', 'imperial')
    expect(Number.isInteger(result)).toBe(true)
  })
})

describe('getUnit', () => {
  it('returns kg for metric weight', () => {
    expect(getUnit('weight', 'metric')).toBe('kg')
  })

  it('returns lb for imperial weight', () => {
    expect(getUnit('weight', 'imperial')).toBe('lb')
  })

  it('returns cm for metric length', () => {
    expect(getUnit('length', 'metric')).toBe('cm')
  })

  it('returns in for imperial length', () => {
    expect(getUnit('length', 'imperial')).toBe('in')
  })

  it('returns mm for metric skinfold', () => {
    expect(getUnit('skinfold', 'metric')).toBe('mm')
  })

  it('returns years for none type', () => {
    expect(getUnit('none', 'metric')).toBe('years')
    expect(getUnit('none', 'imperial')).toBe('years')
  })
})

describe('formatMeasurement', () => {
  it('formats metric weight correctly', () => {
    expect(formatMeasurement(80, 'weight', 'metric')).toBe('80 kg')
  })

  it('formats imperial weight correctly', () => {
    expect(formatMeasurement(176.37, 'weight', 'imperial')).toBe('176.37 lb')
  })

  it('formats metric length correctly', () => {
    expect(formatMeasurement(180, 'length', 'metric')).toBe('180 cm')
  })

  it('formats imperial length correctly', () => {
    expect(formatMeasurement(70.87, 'length', 'imperial')).toBe('70.87 in')
  })

  it('formats skinfold with 0 decimal places', () => {
    expect(formatMeasurement(15, 'skinfold', 'metric')).toBe('15 mm')
  })

  it('throws for negative values', () => {
    expect(() => formatMeasurement(-1, 'weight', 'metric')).toThrow()
  })
})

describe('isReasonableMeasurement', () => {
  it('returns true for reasonable metric weight', () => {
    expect(isReasonableMeasurement(80, 'weight', 'metric')).toBe(true)
  })

  it('returns false for too-low metric weight', () => {
    expect(isReasonableMeasurement(5, 'weight', 'metric')).toBe(false)
  })

  it('returns false for too-high metric weight', () => {
    expect(isReasonableMeasurement(350, 'weight', 'metric')).toBe(false)
  })

  it('returns true for reasonable imperial weight', () => {
    expect(isReasonableMeasurement(176, 'weight', 'imperial')).toBe(true)
  })

  it('returns true for reasonable age (none type)', () => {
    expect(isReasonableMeasurement(25, 'none', 'metric')).toBe(true)
  })

  it('returns false for age over 120', () => {
    expect(isReasonableMeasurement(121, 'none', 'metric')).toBe(false)
  })

  it('returns true for age of 0', () => {
    expect(isReasonableMeasurement(0, 'none', 'metric')).toBe(true)
  })

  it('returns true for reasonable metric length', () => {
    expect(isReasonableMeasurement(180, 'length', 'metric')).toBe(true)
  })

  it('returns false for negative values', () => {
    expect(isReasonableMeasurement(-1, 'weight', 'metric')).toBe(false)
  })

  it('returns true for reasonable skinfold', () => {
    expect(isReasonableMeasurement(15, 'skinfold', 'metric')).toBe(true)
  })

  it('returns false for out-of-range skinfold', () => {
    expect(isReasonableMeasurement(150, 'skinfold', 'metric')).toBe(false)
  })
})

describe('needsConversion', () => {
  it('returns true for weight', () => {
    expect(needsConversion('weight')).toBe(true)
  })

  it('returns true for length', () => {
    expect(needsConversion('length')).toBe(true)
  })

  it('returns false for skinfold', () => {
    expect(needsConversion('skinfold')).toBe(false)
  })

  it('returns false for none', () => {
    expect(needsConversion('none')).toBe(false)
  })
})
