import { describe, expect, it } from 'vitest'
import {
	calculationResultSchema,
	isValidFormula,
	validateCalculationResult,
} from '../schemas/index'

describe('calculationResultSchema', () => {
	it('accepts a valid result', () => {
		const result = calculationResultSchema.safeParse({
			bodyFatPercentage: 20,
			fatMass: 16,
			leanMass: 64,
		})
		expect(result.success).toBe(true)
	})

	it('rejects negative bodyFatPercentage', () => {
		const result = calculationResultSchema.safeParse({
			bodyFatPercentage: -1,
			fatMass: 0,
			leanMass: 80,
		})
		expect(result.success).toBe(false)
	})

	it('rejects bodyFatPercentage over 100', () => {
		const result = calculationResultSchema.safeParse({
			bodyFatPercentage: 101,
			fatMass: 80,
			leanMass: 0,
		})
		expect(result.success).toBe(false)
	})

	it('rejects extra properties (strict mode)', () => {
		const result = calculationResultSchema.safeParse({
			bodyFatPercentage: 20,
			fatMass: 16,
			leanMass: 64,
			extraField: 'should fail',
		})
		expect(result.success).toBe(false)
	})

	it('rejects missing fields', () => {
		const missingBF = calculationResultSchema.safeParse({
			fatMass: 16,
			leanMass: 64,
		})
		expect(missingBF.success).toBe(false)

		const missingFat = calculationResultSchema.safeParse({
			bodyFatPercentage: 20,
			leanMass: 64,
		})
		expect(missingFat.success).toBe(false)

		const missingLean = calculationResultSchema.safeParse({
			bodyFatPercentage: 20,
			fatMass: 16,
		})
		expect(missingLean.success).toBe(false)
	})

	it('rejects non-number values', () => {
		const result = calculationResultSchema.safeParse({
			bodyFatPercentage: '20',
			fatMass: 16,
			leanMass: 64,
		})
		expect(result.success).toBe(false)
	})

	it('accepts boundary values (0 and 100)', () => {
		const zero = calculationResultSchema.safeParse({
			bodyFatPercentage: 0,
			fatMass: 0,
			leanMass: 80,
		})
		expect(zero.success).toBe(true)

		const hundred = calculationResultSchema.safeParse({
			bodyFatPercentage: 100,
			fatMass: 80,
			leanMass: 0,
		})
		expect(hundred.success).toBe(true)
	})
})

describe('validateCalculationResult', () => {
	it('returns success for valid result', () => {
		const result = validateCalculationResult({
			bodyFatPercentage: 20,
			fatMass: 16,
			leanMass: 64,
		})
		expect(result.success).toBe(true)
		expect(result.errors).toEqual({})
	})

	it('returns errors for invalid result', () => {
		const result = validateCalculationResult({
			bodyFatPercentage: -1,
			fatMass: 0,
			leanMass: 80,
		})
		expect(result.success).toBe(false)
		expect(Object.keys(result.errors).length).toBeGreaterThan(0)
	})

	it('returns errors for missing fields', () => {
		const result = validateCalculationResult({})
		expect(result.success).toBe(false)
		expect(Object.keys(result.errors).length).toBeGreaterThan(0)
	})

	it('returns errors for extra properties', () => {
		const result = validateCalculationResult({
			bodyFatPercentage: 20,
			fatMass: 16,
			leanMass: 64,
			extra: true,
		})
		expect(result.success).toBe(false)
	})
})

describe('isValidFormula', () => {
	const validFormulas = [
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

	it('returns true for all 9 valid formula strings', () => {
		for (const formula of validFormulas) {
			expect(isValidFormula(formula)).toBe(true)
		}
	})

	it('returns false for invalid strings', () => {
		expect(isValidFormula('invalid')).toBe(false)
		expect(isValidFormula('')).toBe(false)
		expect(isValidFormula('YMCA')).toBe(false)
	})

	it('returns false for non-string values', () => {
		expect(isValidFormula(42)).toBe(false)
		expect(isValidFormula(null)).toBe(false)
		expect(isValidFormula(undefined)).toBe(false)
		expect(isValidFormula(true)).toBe(false)
		expect(isValidFormula({})).toBe(false)
	})
})
