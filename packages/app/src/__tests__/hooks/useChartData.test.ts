import type { Formula, MeasurementSystem } from '@bodyfat/shared/types'
import { renderHook } from '@testing-library/react-native'
import type { ChartMetric, TimeRange } from '../../hooks/useChartData'
import { useChartData } from '../../hooks/useChartData'
import type { MeasurementRecord } from '../../store/historyStore'

jest.mock('@bodyfat/shared/conversions', () => ({
  convertMeasurement: jest.fn((value: number, type: string, from: string, to: string) => {
    if (from === to) return value
    if (type === 'weight') return from === 'metric' ? value * 2.20462 : value / 2.20462
    if (type === 'length') return from === 'metric' ? value * 0.393701 : value * 2.54
    return value
  }),
}))

const createRecord = (overrides: Partial<MeasurementRecord> = {}): MeasurementRecord => ({
  clientId: 'test-' + Math.random().toString(36).slice(2, 8),
  formula: 'ymca',
  gender: 'male',
  measurementSystem: 'metric',
  inputs: { weight: 80, waistCircumference: 85 },
  bodyFatPercentage: 20,
  fatMass: 16,
  leanMass: 64,
  classification: 'Acceptable',
  measuredAt: new Date().toISOString(),
  deletedAt: null,
  version: new Date().toISOString(),
  appVersion: '1.0.0',
  platform: 'ios',
  syncedAt: null,
  ...overrides,
})

function daysAgo(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() - days)
  return d.toISOString()
}

describe('useChartData', () => {
  describe('time filtering', () => {
    it('30d: only includes measurements from last 30 days', () => {
      const recent = createRecord({ measuredAt: daysAgo(10) })
      const old = createRecord({ measuredAt: daysAgo(60) })

      const { result } = renderHook(() =>
        useChartData([recent, old], 'bodyFatPercentage', '30d', 'all', 'metric'),
      )

      expect(result.current.data).toHaveLength(1)
      expect(result.current.data[0]!.value).toBe(20)
    })

    it('all: includes everything', () => {
      const recent = createRecord({ measuredAt: daysAgo(10) })
      const old = createRecord({ measuredAt: daysAgo(500) })

      const { result } = renderHook(() =>
        useChartData([recent, old], 'bodyFatPercentage', 'all', 'all', 'metric'),
      )

      expect(result.current.data).toHaveLength(2)
    })

    it('records outside range are excluded', () => {
      const inRange = createRecord({ measuredAt: daysAgo(80) })
      const outOfRange = createRecord({ measuredAt: daysAgo(100) })

      const { result } = renderHook(() =>
        useChartData([inRange, outOfRange], 'bodyFatPercentage', '90d', 'all', 'metric'),
      )

      expect(result.current.data).toHaveLength(1)
    })
  })

  describe('formula filtering', () => {
    it('all returns everything in time range', () => {
      const ymca = createRecord({
        formula: 'ymca',
        measuredAt: daysAgo(5),
      })
      const navy = createRecord({
        formula: 'navy',
        measuredAt: daysAgo(3),
      })

      const { result } = renderHook(() =>
        useChartData([ymca, navy], 'bodyFatPercentage', 'all', 'all', 'metric'),
      )

      expect(result.current.data).toHaveLength(2)
    })

    it('specific formula filters correctly', () => {
      const ymca = createRecord({
        formula: 'ymca',
        measuredAt: daysAgo(5),
      })
      const navy = createRecord({
        formula: 'navy',
        measuredAt: daysAgo(3),
      })

      const { result } = renderHook(() =>
        useChartData([ymca, navy], 'bodyFatPercentage', 'all', 'ymca', 'metric'),
      )

      expect(result.current.data).toHaveLength(1)
      expect(result.current.data[0]!.formula).toBe('ymca')
    })
  })

  describe('availableFormulas', () => {
    it('is computed from time-filtered data before formula filter is applied', () => {
      const ymca = createRecord({
        formula: 'ymca',
        measuredAt: daysAgo(5),
      })
      const navy = createRecord({
        formula: 'navy',
        measuredAt: daysAgo(3),
      })

      const { result } = renderHook(() =>
        useChartData([ymca, navy], 'bodyFatPercentage', 'all', 'ymca', 'metric'),
      )

      // Even though we filter to 'ymca', availableFormulas should still contain 'navy'
      expect(result.current.availableFormulas).toContain('ymca')
      expect(result.current.availableFormulas).toContain('navy')
    })
  })

  describe('unit conversion', () => {
    it('converts when record.measurementSystem !== currentSystem', () => {
      const metricRecord = createRecord({
        measurementSystem: 'metric',
        inputs: { weight: 80, waistCircumference: 85 },
        measuredAt: daysAgo(1),
      })

      const { result } = renderHook(() =>
        useChartData([metricRecord], 'weight', 'all', 'all', 'imperial'),
      )

      // 80 * 2.20462 = 176.3696, rounded to 2 decimals = 176.37
      expect(result.current.data[0]!.value).toBeCloseTo(176.37, 1)
    })

    it('bodyFatPercentage is never converted', () => {
      const metricRecord = createRecord({
        measurementSystem: 'metric',
        bodyFatPercentage: 20,
        measuredAt: daysAgo(1),
      })

      const { result } = renderHook(() =>
        useChartData([metricRecord], 'bodyFatPercentage', 'all', 'all', 'imperial'),
      )

      expect(result.current.data[0]!.value).toBe(20)
    })
  })

  describe('stats', () => {
    it('computes min, max, latest from filtered data', () => {
      const records = [
        createRecord({
          bodyFatPercentage: 25,
          measuredAt: daysAgo(10),
        }),
        createRecord({
          bodyFatPercentage: 18,
          measuredAt: daysAgo(5),
        }),
        createRecord({
          bodyFatPercentage: 22,
          measuredAt: daysAgo(1),
        }),
      ]

      const { result } = renderHook(() =>
        useChartData(records, 'bodyFatPercentage', 'all', 'all', 'metric'),
      )

      expect(result.current.stats!.min).toBe(18)
      expect(result.current.stats!.max).toBe(25)
      expect(result.current.stats!.latest).toBe(22)
    })

    it('change = last - first for multiple data points', () => {
      const records = [
        createRecord({
          bodyFatPercentage: 25,
          measuredAt: daysAgo(10),
        }),
        createRecord({
          bodyFatPercentage: 22,
          measuredAt: daysAgo(1),
        }),
      ]

      const { result } = renderHook(() =>
        useChartData(records, 'bodyFatPercentage', 'all', 'all', 'metric'),
      )

      // Sorted ascending: first=25, last=22, change = 22-25 = -3
      expect(result.current.stats!.change).toBe(-3)
    })

    it('change = 0 for a single data point', () => {
      const records = [
        createRecord({
          bodyFatPercentage: 20,
          measuredAt: daysAgo(1),
        }),
      ]

      const { result } = renderHook(() =>
        useChartData(records, 'bodyFatPercentage', 'all', 'all', 'metric'),
      )

      expect(result.current.stats!.change).toBe(0)
    })

    it('returns null stats when no data', () => {
      const { result } = renderHook(() =>
        useChartData([], 'bodyFatPercentage', 'all', 'all', 'metric'),
      )

      expect(result.current.stats).toBeNull()
    })
  })

  describe('chronological sorting', () => {
    it('data is sorted ascending by measuredAt', () => {
      const records = [
        createRecord({
          bodyFatPercentage: 22,
          measuredAt: daysAgo(1),
        }),
        createRecord({
          bodyFatPercentage: 25,
          measuredAt: daysAgo(10),
        }),
        createRecord({
          bodyFatPercentage: 18,
          measuredAt: daysAgo(5),
        }),
      ]

      const { result } = renderHook(() =>
        useChartData(records, 'bodyFatPercentage', 'all', 'all', 'metric'),
      )

      const values = result.current.data.map((d) => d.value)
      // Ascending by date: 10 days ago (25), 5 days ago (18), 1 day ago (22)
      expect(values).toEqual([25, 18, 22])
    })
  })

  describe('metric extraction', () => {
    it('weight comes from record.inputs.weight', () => {
      const record = createRecord({
        inputs: { weight: 80, waistCircumference: 85 },
        measuredAt: daysAgo(1),
      })

      const { result } = renderHook(() => useChartData([record], 'weight', 'all', 'all', 'metric'))

      expect(result.current.data[0]!.value).toBe(80)
    })

    it('waistCircumference comes from record.inputs.waistCircumference', () => {
      const record = createRecord({
        inputs: { weight: 80, waistCircumference: 85 },
        measuredAt: daysAgo(1),
      })

      const { result } = renderHook(() =>
        useChartData([record], 'waistCircumference', 'all', 'all', 'metric'),
      )

      expect(result.current.data[0]!.value).toBe(85)
    })

    it('bodyFatPercentage comes from record.bodyFatPercentage', () => {
      const record = createRecord({
        bodyFatPercentage: 20,
        measuredAt: daysAgo(1),
      })

      const { result } = renderHook(() =>
        useChartData([record], 'bodyFatPercentage', 'all', 'all', 'metric'),
      )

      expect(result.current.data[0]!.value).toBe(20)
    })
  })

  describe('empty data', () => {
    it('returns empty data array and null stats', () => {
      const { result } = renderHook(() =>
        useChartData([], 'bodyFatPercentage', 'all', 'all', 'metric'),
      )

      expect(result.current.data).toEqual([])
      expect(result.current.stats).toBeNull()
      expect(result.current.availableFormulas).toEqual([])
    })
  })
})
