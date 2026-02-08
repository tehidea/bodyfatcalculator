import { convertMeasurement } from '@bodyfat/shared/conversions'
import { INPUT_CONVERSION_MAP } from '@bodyfat/shared/conversions/constants'
import { useCallback } from 'react'
import { useCalculatorStore } from '../store/calculatorStore'
import type { CalculatorInputs } from '../types/calculator'

/**
 * Hook for handling display values with automatic unit conversions
 */
export function useDisplayValue(field: keyof CalculatorInputs) {
  const measurementSystem = useCalculatorStore((state) => state.measurementSystem)
  const value = useCalculatorStore((state) => state.inputs[field])
  const setInput = useCalculatorStore((state) => state.setInput)

  const conversionType = INPUT_CONVERSION_MAP[field]

  const displayValue =
    value != null && conversionType
      ? convertMeasurement(value, conversionType, 'metric', measurementSystem)
      : value

  const setDisplayValue = useCallback(
    (newValue: number | null) => {
      if (newValue == null) {
        setInput(field, null)
        return
      }

      const metricValue =
        conversionType && measurementSystem === 'imperial'
          ? convertMeasurement(newValue, conversionType, 'imperial', 'metric')
          : newValue

      setInput(field, metricValue)
    },
    [field, conversionType, measurementSystem, setInput],
  )

  const formattedValue = useCallback(
    (value: number) => {
      if (!conversionType) return `${value}`
      return formatMeasurement(value, conversionType, measurementSystem)
    },
    [conversionType, measurementSystem],
  )

  const unit = useCallback(() => {
    if (!conversionType) return ''
    return measurementSystem === 'metric'
      ? conversionType === 'weight'
        ? 'kg'
        : conversionType === 'skinfold'
          ? 'mm'
          : 'cm'
      : conversionType === 'weight'
        ? 'lb'
        : 'in'
  }, [conversionType, measurementSystem])

  return {
    value: displayValue,
    setValue: setDisplayValue,
    format: formattedValue,
    unit: unit(),
  }
}
