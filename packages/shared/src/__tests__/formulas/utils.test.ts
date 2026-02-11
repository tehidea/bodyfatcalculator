import { describe, expect, it } from 'vitest'
import { calculateBodyFat, getClassification, validateBodyFat } from '../../formulas/utils'

describe('calculateBodyFat', () => {
  it('calculates fat mass and lean mass correctly', () => {
    const result = calculateBodyFat(20, 80)
    expect(result.fatMass).toBe(16)
    expect(result.leanMass).toBe(64)
  })

  it('handles 0% body fat', () => {
    const result = calculateBodyFat(0, 80)
    expect(result.fatMass).toBe(0)
    expect(result.leanMass).toBe(80)
  })

  it('handles 100% body fat', () => {
    const result = calculateBodyFat(100, 80)
    expect(result.fatMass).toBe(80)
    expect(result.leanMass).toBe(0)
  })

  it('handles 50% body fat', () => {
    const result = calculateBodyFat(50, 100)
    expect(result.fatMass).toBe(50)
    expect(result.leanMass).toBe(50)
  })
})

describe('getClassification', () => {
  describe('male classifications', () => {
    it('returns Essential fat for 2-5.99%', () => {
      expect(getClassification(2, 'male')).toBe('Essential fat (2-5%)')
      expect(getClassification(5, 'male')).toBe('Essential fat (2-5%)')
      expect(getClassification(5.99, 'male')).toBe('Essential fat (2-5%)')
    })

    it('returns Athletic for 6-13.99%', () => {
      expect(getClassification(6, 'male')).toBe('Athletic (6-13%)')
      expect(getClassification(10, 'male')).toBe('Athletic (6-13%)')
      expect(getClassification(13.99, 'male')).toBe('Athletic (6-13%)')
    })

    it('returns Fitness for 14-17.99%', () => {
      expect(getClassification(14, 'male')).toBe('Fitness (14-17%)')
      expect(getClassification(16, 'male')).toBe('Fitness (14-17%)')
      expect(getClassification(17.99, 'male')).toBe('Fitness (14-17%)')
    })

    it('returns Acceptable for 18-25%', () => {
      expect(getClassification(18, 'male')).toBe('Acceptable (18-25%)')
      expect(getClassification(22, 'male')).toBe('Acceptable (18-25%)')
      expect(getClassification(25, 'male')).toBe('Acceptable (18-25%)')
    })

    it('returns Obese for >25%', () => {
      expect(getClassification(25.01, 'male')).toBe('Obese (> 25%)')
      expect(getClassification(40, 'male')).toBe('Obese (> 25%)')
    })

    it('returns Unknown for <2%', () => {
      expect(getClassification(1, 'male')).toBe('Unknown')
      expect(getClassification(0, 'male')).toBe('Unknown')
      expect(getClassification(1.99, 'male')).toBe('Unknown')
    })
  })

  describe('female classifications', () => {
    it('returns Essential fat for 10-13.99%', () => {
      expect(getClassification(10, 'female')).toBe('Essential fat (10-13%)')
      expect(getClassification(12, 'female')).toBe('Essential fat (10-13%)')
      expect(getClassification(13.99, 'female')).toBe('Essential fat (10-13%)')
    })

    it('returns Athletic for 14-20.99%', () => {
      expect(getClassification(14, 'female')).toBe('Athletic (14-20%)')
      expect(getClassification(18, 'female')).toBe('Athletic (14-20%)')
      expect(getClassification(20.99, 'female')).toBe('Athletic (14-20%)')
    })

    it('returns Fitness for 21-24.99%', () => {
      expect(getClassification(21, 'female')).toBe('Fitness (21-24%)')
      expect(getClassification(23, 'female')).toBe('Fitness (21-24%)')
      expect(getClassification(24.99, 'female')).toBe('Fitness (21-24%)')
    })

    it('returns Acceptable for 25-31%', () => {
      expect(getClassification(25, 'female')).toBe('Acceptable (25-31%)')
      expect(getClassification(28, 'female')).toBe('Acceptable (25-31%)')
      expect(getClassification(31, 'female')).toBe('Acceptable (25-31%)')
    })

    it('returns Obese for >31%', () => {
      expect(getClassification(31.01, 'female')).toBe('Obese (> 31%)')
      expect(getClassification(45, 'female')).toBe('Obese (> 31%)')
    })

    it('returns Unknown for <10%', () => {
      expect(getClassification(9, 'female')).toBe('Unknown')
      expect(getClassification(0, 'female')).toBe('Unknown')
      expect(getClassification(9.99, 'female')).toBe('Unknown')
    })
  })
})

describe('validateBodyFat', () => {
  it('returns valid for 0', () => {
    expect(validateBodyFat(0)).toEqual({ isValid: true })
  })

  it('returns valid for 50', () => {
    expect(validateBodyFat(50)).toEqual({ isValid: true })
  })

  it('returns valid for 100', () => {
    expect(validateBodyFat(100)).toEqual({ isValid: true })
  })

  it('returns invalid for negative values', () => {
    const result = validateBodyFat(-1)
    expect(result.isValid).toBe(false)
    expect(result.message).toBeDefined()
  })

  it('returns invalid for values over 100', () => {
    const result = validateBodyFat(101)
    expect(result.isValid).toBe(false)
    expect(result.message).toBeDefined()
  })

  it('returns invalid for NaN', () => {
    const result = validateBodyFat(NaN)
    expect(result.isValid).toBe(false)
    expect(result.message).toBeDefined()
  })

  it('returns invalid for Infinity', () => {
    const result = validateBodyFat(Infinity)
    expect(result.isValid).toBe(false)
    expect(result.message).toBeDefined()
  })

  it('returns invalid for negative Infinity', () => {
    const result = validateBodyFat(-Infinity)
    expect(result.isValid).toBe(false)
    expect(result.message).toBeDefined()
  })
})
