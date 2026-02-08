import {
  type Formula,
  type Gender,
  getAllFormulasMetadata,
  getFormulaMetadata,
  validateFormula,
} from '../../schemas/calculator'

describe('Calculator Schema Validation', () => {
  describe('validateFormula', () => {
    describe('YMCA formula validation', () => {
      const formula = 'ymca' as Formula

      it('should validate correct metric inputs', () => {
        const data = {
          gender: 'male' as Gender,
          weight: 80,
          waistCircumference: 85,
        }
        const result = validateFormula(formula, data, 'metric', 'male')
        expect(result.success).toBe(true)
        expect(result.errors).toEqual({})
      })

      it('should validate correct imperial inputs', () => {
        const data = {
          gender: 'male' as Gender,
          weight: 176.37,
          waistCircumference: 33.46,
        }
        const result = validateFormula(formula, data, 'imperial', 'male')
        expect(result.success).toBe(true)
        expect(result.errors).toEqual({})
      })

      it('should reject invalid weight values', () => {
        const data = {
          gender: 'male' as Gender,
          weight: 10, // Too low
          waistCircumference: 85,
        }
        const result = validateFormula(formula, data, 'metric', 'male')
        expect(result.success).toBe(false)
        expect(result.errors).toHaveProperty('weight')
      })

      it('should reject invalid waist circumference values', () => {
        const data = {
          gender: 'male' as Gender,
          weight: 80,
          waistCircumference: 0.5, // Too low
        }
        const result = validateFormula(formula, data, 'metric', 'male')
        expect(result.success).toBe(false)
        expect(result.errors).toHaveProperty('waistCircumference')
      })

      it('should reject missing required fields', () => {
        const data = {
          gender: 'male' as Gender,
          weight: 80,
          // Missing waistCircumference
        }
        const result = validateFormula(formula, data, 'metric', 'male')
        expect(result.success).toBe(false)
        expect(result.errors).toHaveProperty('waistCircumference')
      })
    })

    describe('Navy formula validation', () => {
      const formula = 'navy' as Formula

      it('should validate correct male metric inputs', () => {
        const data = {
          gender: 'male' as Gender,
          weight: 80,
          height: 180,
          neckCircumference: 38,
          waistCircumference: 85,
        }
        const result = validateFormula(formula, data, 'metric', 'male')
        expect(result.success).toBe(true)
        expect(result.errors).toEqual({})
      })

      it('should validate correct female metric inputs', () => {
        const data = {
          gender: 'female' as Gender,
          weight: 60,
          height: 165,
          neckCircumference: 32,
          waistCircumference: 70,
          hipsCircumference: 90,
        }
        const result = validateFormula(formula, data, 'metric', 'female')
        expect(result.success).toBe(true)
        expect(result.errors).toEqual({})
      })

      it('should reject invalid height values', () => {
        const data = {
          gender: 'male' as Gender,
          weight: 80,
          height: 90, // Too low
          neckCircumference: 38,
          waistCircumference: 85,
        }
        const result = validateFormula(formula, data, 'metric', 'male')
        expect(result.success).toBe(false)
        expect(result.errors).toHaveProperty('height')
      })
    })

    it('should reject invalid formula', () => {
      const result = validateFormula('invalid' as Formula, {}, 'metric', 'male')
      expect(result.success).toBe(false)
      expect(result.errors).toHaveProperty('_')
    })
  })

  describe('getFormulaMetadata', () => {
    it('should return correct metadata for YMCA formula', () => {
      const metadata = getFormulaMetadata('ymca', 'metric', 'male')
      expect(metadata).toMatchObject({
        name: 'YMCA',
        description: expect.any(String),
        premium: false,
        accuracy: {
          min: expect.any(Number),
          max: expect.any(Number),
        },
        fields: expect.arrayContaining([
          expect.objectContaining({
            key: 'weight',
            label: 'Weight',
            unit: 'kg',
            type: 'weight',
          }),
          expect.objectContaining({
            key: 'waistCircumference',
            label: 'Waist Circumference',
            unit: 'cm',
            type: 'circumference',
          }),
        ]),
      })
    })

    it('should throw error for invalid formula', () => {
      expect(() => getFormulaMetadata('invalid' as Formula, 'metric', 'male')).toThrow()
    })
  })

  describe('getAllFormulasMetadata', () => {
    it('should return metadata for all formulas', () => {
      const allMetadata = getAllFormulasMetadata('metric', 'male')
      expect(allMetadata).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            key: 'ymca',
            name: 'YMCA',
          }),
          expect.objectContaining({
            key: 'navy',
            name: expect.any(String),
          }),
        ]),
      )
    })

    it('should include required fields for each formula', () => {
      const allMetadata = getAllFormulasMetadata('metric', 'male')
      allMetadata.forEach((metadata) => {
        expect(metadata).toHaveProperty('fields')
        expect(metadata.fields).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              key: expect.any(String),
              label: expect.any(String),
              type: expect.any(String),
              required: expect.any(Boolean),
            }),
          ]),
        )
      })
    })

    it('should adapt units based on measurement system', () => {
      const metricMetadata = getAllFormulasMetadata('metric', 'male')
      const imperialMetadata = getAllFormulasMetadata('imperial', 'male')

      // Check that units are different between metric and imperial
      const metricFormula = metricMetadata.find((m) => m.key === 'ymca')
      const imperialFormula = imperialMetadata.find((m) => m.key === 'ymca')

      expect(metricFormula?.fields.find((f) => f.key === 'weight')?.unit).toBe('kg')
      expect(imperialFormula?.fields.find((f) => f.key === 'weight')?.unit).toBe('lb')
    })
  })
})
