import { type ConversionType, convertMeasurement } from '@bodyfat/shared/conversions'
import type { Formula, MeasurementSystem } from '@bodyfat/shared/types'
import { useMemo } from 'react'
import type { MeasurementRecord } from '../store/historyStore'

export type ChartMetric =
  | 'bodyFatPercentage'
  | 'fatMass'
  | 'leanMass'
  | 'weight'
  | 'waistCircumference'

export type TimeRange = '30d' | '90d' | '1y' | 'all'

export interface ChartDataPoint {
  value: number
  date: Date
  label: string
  formula: Formula
}

export interface ChartStats {
  min: number
  max: number
  latest: number
  change: number
}

const TIME_RANGE_DAYS: Record<TimeRange, number | null> = {
  '30d': 30,
  '90d': 90,
  '1y': 365,
  all: null,
}

const METRIC_CONVERSION_TYPE: Record<ChartMetric, ConversionType | null> = {
  bodyFatPercentage: null,
  fatMass: 'weight',
  leanMass: 'weight',
  weight: 'weight',
  waistCircumference: 'length',
}

function getMetricValue(record: MeasurementRecord, metric: ChartMetric): number | null {
  switch (metric) {
    case 'bodyFatPercentage':
      return record.bodyFatPercentage
    case 'fatMass':
      return record.fatMass
    case 'leanMass':
      return record.leanMass
    case 'weight':
      return typeof record.inputs.weight === 'number' ? record.inputs.weight : null
    case 'waistCircumference':
      return typeof record.inputs.waistCircumference === 'number'
        ? record.inputs.waistCircumference
        : null
  }
}

function formatDateLabel(date: Date): string {
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

export function useChartData(
  measurements: MeasurementRecord[],
  selectedMetric: ChartMetric,
  timeRange: TimeRange,
  formulaFilter: Formula | 'all',
  currentSystem: MeasurementSystem,
) {
  return useMemo(() => {
    const now = new Date()
    const rangeDays = TIME_RANGE_DAYS[timeRange]
    const cutoff = rangeDays ? new Date(now.getTime() - rangeDays * 24 * 60 * 60 * 1000) : null

    // Collect available formulas from time-range-filtered measurements (before formula filter)
    const timeFiltered = cutoff
      ? measurements.filter((m) => new Date(m.measuredAt) >= cutoff)
      : measurements
    const formulaSet = new Set(timeFiltered.map((m) => m.formula))
    const availableFormulas = [...formulaSet] as Formula[]

    // Filter by time range and formula
    const filtered = timeFiltered.filter((m) => {
      if (formulaFilter !== 'all' && m.formula !== formulaFilter) return false
      return true
    })

    // Sort ascending for chronological chart display
    const sorted = [...filtered].sort(
      (a, b) => new Date(a.measuredAt).getTime() - new Date(b.measuredAt).getTime(),
    )

    // Extract metric values with unit conversion
    const conversionType = METRIC_CONVERSION_TYPE[selectedMetric]
    const data: ChartDataPoint[] = []

    for (const record of sorted) {
      let value = getMetricValue(record, selectedMetric)
      if (value == null) continue

      // Convert if the record's system differs from current display system
      if (conversionType && record.measurementSystem !== currentSystem) {
        value = convertMeasurement(value, conversionType, record.measurementSystem, currentSystem)
      }

      data.push({
        value: Math.round(value * 100) / 100,
        date: new Date(record.measuredAt),
        label: formatDateLabel(new Date(record.measuredAt)),
        formula: record.formula,
      })
    }

    // Compute stats
    let stats: ChartStats | null = null
    if (data.length >= 1) {
      const values = data.map((d) => d.value)
      const first = values[0] as number
      const last = values[values.length - 1] as number
      stats = {
        min: Math.min(...values),
        max: Math.max(...values),
        latest: last,
        change: values.length >= 2 ? last - first : 0,
      }
    }

    return { data, availableFormulas, stats }
  }, [measurements, selectedMetric, timeRange, formulaFilter, currentSystem])
}
