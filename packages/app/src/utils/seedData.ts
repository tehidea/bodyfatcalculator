import { FORMULAS, getClassification } from '@bodyfat/shared/formulas'
import type { Formula, StandardizedInputs } from '@bodyfat/shared/types'
import { randomUUID } from 'expo-crypto'
import type { MeasurementRecord } from '../store/historyStore'

function noise(base: number, range: number): number {
  return base + (Math.random() - 0.5) * 2 * range
}

function round1(n: number): number {
  return Math.round(n * 10) / 10
}

export function generateSeedMeasurements(): MeasurementRecord[] {
  const records: MeasurementRecord[] = []
  const now = new Date()

  function createRecord(
    formula: Formula,
    inputs: StandardizedInputs,
    date: Date,
  ): MeasurementRecord {
    const result = FORMULAS[formula].calculate(inputs, 'metric')
    return {
      clientId: randomUUID(),
      formula,
      gender: 'male',
      measurementSystem: 'metric',
      inputs,
      bodyFatPercentage: round1(result.bodyFatPercentage),
      fatMass: round1(result.fatMass),
      leanMass: round1(result.leanMass),
      classification: getClassification(result.bodyFatPercentage, 'male'),
      measuredAt: date.toISOString(),
      deletedAt: null,
      version: date.toISOString(),
      appVersion: '1.0.0',
      platform: 'ios',
      syncedAt: null,
    }
  }

  function dateAt(monthsAgo: number): Date {
    const date = new Date(now)
    date.setMonth(date.getMonth() - monthsAgo)
    date.setDate(date.getDate() + Math.floor(Math.random() * 5))
    date.setHours(8 + Math.floor(Math.random() * 12), Math.floor(Math.random() * 60))
    return date
  }

  // Phase 1: Months 12→9 ago — YMCA (weight + waist only)
  // Simulates early fat-loss phase: 102→94 kg, waist 110→98.5 cm, BF ~28→22%
  for (let i = 0; i < 10; i++) {
    const t = i / 9
    const monthsAgo = 12 - t * 3
    const weight = round1(noise(102 - t * 8, 1))
    const waist = round1(noise(110 - t * 11.5, 1))

    records.push(
      createRecord(
        'ymca',
        { gender: 'male', weight, waistCircumference: waist },
        dateAt(monthsAgo),
      ),
    )
  }

  // Phase 2: Months 8→5 ago — Navy (adds height + neck)
  // Mid-journey: 94→86 kg, waist 95→83 cm, neck 40→38 cm, BF ~22→15%
  for (let i = 0; i < 10; i++) {
    const t = i / 9
    const monthsAgo = 8 - t * 3
    const weight = round1(noise(94 - t * 8, 1))
    const waist = round1(noise(95 - t * 12, 1))
    const neck = round1(noise(40 - t * 2, 0.5))

    records.push(
      createRecord(
        'navy',
        {
          gender: 'male',
          weight,
          height: 180,
          waistCircumference: waist,
          neckCircumference: neck,
        },
        dateAt(monthsAgo),
      ),
    )
  }

  // Phase 3: Months 4→1 ago — alternating jack3 + durnin (skinfolds)
  // Final cut: 86→79 kg, skinfolds shrinking, BF ~16→10-12%
  for (let i = 0; i < 10; i++) {
    const t = i / 9
    const monthsAgo = 4 - t * 3
    const weight = round1(noise(86 - t * 7, 1))
    const formula: Formula = i % 2 === 0 ? 'jack3' : 'durnin'
    const date = dateAt(monthsAgo)

    if (formula === 'jack3') {
      records.push(
        createRecord(
          'jack3',
          {
            gender: 'male',
            age: 30,
            weight,
            chestSkinfold: round1(noise(15 - t * 5, 1)),
            abdomenSkinfold: round1(noise(20 - t * 6, 1)),
            thighSkinfold: round1(noise(18 - t * 6, 1)),
          },
          date,
        ),
      )
    } else {
      records.push(
        createRecord(
          'durnin',
          {
            gender: 'male',
            age: 30,
            weight,
            bicepSkinfold: round1(noise(7 - t * 2, 0.5)),
            tricepSkinfold: round1(noise(10 - t * 3, 1)),
            subscapularSkinfold: round1(noise(12 - t * 4, 1)),
            suprailiacSkinfold: round1(noise(10.5 - t * 4.5, 1)),
          },
          date,
        ),
      )
    }
  }

  records.sort((a, b) => new Date(a.measuredAt).getTime() - new Date(b.measuredAt).getTime())

  return records
}
