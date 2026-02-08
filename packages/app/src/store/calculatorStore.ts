import { convertMeasurement } from '@bodyfat/shared/conversions'
import { INPUT_CONVERSION_MAP } from '@bodyfat/shared/conversions/constants'
import { getFormula } from '@bodyfat/shared/formulas'
import type {
  CalculationResult,
  Formula,
  Gender,
  MeasurementSystem,
  StandardizedInputs,
} from '@bodyfat/shared/types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { validateFormula as validateInputs } from '../schemas/calculator'

export interface CalculatorStore {
  // State
  formula: Formula
  gender: Gender
  inputs: StandardizedInputs
  error: string | null
  isCalculating: boolean
  isResultsStale: boolean
  results: CalculationResult | null
  measurementSystem: MeasurementSystem
  fieldErrors: Record<string, string>
  _hasHydrated: boolean

  // Actions
  setFormula: (formula: Formula) => void
  setGender: (gender: Gender) => void
  setMeasurementSystem: (system: MeasurementSystem) => void
  setInput: (key: string, value: number | null, options?: { keepResults?: boolean }) => void
  setResults: (results: CalculationResult | null) => void
  setError: (error: string | null, fieldErrors?: Record<string, string>) => void
  setHasHydrated: (state: boolean) => void
  setResultsStale: (isStale: boolean) => void
  calculate: () => Promise<void>
  reset: () => void
}

/**
 * Converts input values to metric (our standardized format)
 * Note: Skinfold measurements are always in mm and don't need conversion
 */
function convertToMetric(
  inputs: StandardizedInputs,
  currentSystem: MeasurementSystem,
  gender: Gender,
): StandardizedInputs {
  if (currentSystem === 'metric') return { ...inputs, gender }

  const metricInputs: StandardizedInputs = {
    gender,
    ...(inputs.age !== undefined && { age: inputs.age }),
  }

  Object.entries(inputs).forEach(([key, value]) => {
    if (value == null || key === 'gender' || key === 'age') return

    const conversionType = INPUT_CONVERSION_MAP[key]
    if (!conversionType) {
      metricInputs[key] = value
      return
    }

    if (typeof value === 'number') {
      metricInputs[key] = convertMeasurement(value, conversionType, 'imperial', 'metric')
    }
  })

  return metricInputs
}

/**
 * Converts metric values to display system
 * Note: Skinfold measurements are always in mm and don't need conversion
 */
function convertToDisplaySystem(
  inputs: StandardizedInputs,
  targetSystem: MeasurementSystem,
  gender: Gender,
): StandardizedInputs {
  if (targetSystem === 'metric') return { ...inputs, gender }

  const displayInputs: StandardizedInputs = {
    gender,
    ...(inputs.age !== undefined && { age: inputs.age }),
  }

  Object.entries(inputs).forEach(([key, value]) => {
    if (value == null || key === 'gender' || key === 'age') return

    const conversionType = INPUT_CONVERSION_MAP[key]
    if (!conversionType) {
      displayInputs[key] = value
      return
    }

    if (typeof value === 'number') {
      displayInputs[key] = convertMeasurement(value, conversionType, 'metric', 'imperial')
    }
  })

  return displayInputs
}

export const useCalculatorStore = create<CalculatorStore>()(
  persist(
    (set, get) => ({
      formula: 'ymca',
      gender: 'male',
      measurementSystem: 'metric',
      inputs: {},
      results: null,
      isCalculating: false,
      error: null,
      isResultsStale: false,
      fieldErrors: {},
      _hasHydrated: false,

      setFormula: (formula) => {
        set((state) => ({
          ...state,
          formula,
          // Keep all existing inputs
          inputs: { ...state.inputs },
          results: null,
          isResultsStale: false,
          error: null,
          fieldErrors: {},
        }))
      },

      setGender: (gender) =>
        set((state) => ({
          ...state,
          gender,
          inputs: { ...state.inputs, gender },
          results: null,
          isResultsStale: true,
          error: null,
          fieldErrors: {},
        })),

      setMeasurementSystem: (newSystem) => {
        const { measurementSystem: oldSystem, inputs, gender } = get()
        console.log('[Store] Switching measurement system:', oldSystem, '->', newSystem)
        console.log('[Store] Current inputs:', inputs)
        console.log('[Store] Current gender:', gender)

        if (oldSystem === newSystem) return

        // First convert all values to metric (our standardized format)
        const metricInputs = convertToMetric(inputs, oldSystem, gender)
        console.log('[Store] Values in metric:', metricInputs)

        // Then convert to the target system if it's imperial
        const displayInputs = convertToDisplaySystem(metricInputs, newSystem, gender)
        console.log('[Store] Final values for display:', displayInputs)

        // Only include gender if there are other inputs
        const hasOtherInputs = Object.keys(displayInputs).length > 0
        const finalInputs = hasOtherInputs ? { ...displayInputs, gender } : {}

        set((state) => ({
          ...state,
          measurementSystem: newSystem,
          inputs: finalInputs,
          results: null,
          isResultsStale: true,
          error: null,
          fieldErrors: {},
        }))
      },

      setInput: (key, value, options) => {
        console.log(`[Store] Setting ${String(key)}:`, value)
        const state = get()
        const currentValue = state.inputs[key]

        // Handle string inputs and empty strings
        let processedValue: number | null = null
        if (typeof value === 'string') {
          if (value === '') {
            processedValue = null
          } else {
            const numValue = parseFloat(value)
            processedValue = Number.isNaN(numValue) ? null : numValue
          }
        } else {
          processedValue = value
        }

        // Only mark results as stale if the value actually changed
        const shouldMarkStale = !options?.keepResults && processedValue !== currentValue

        set((state) => ({
          ...state,
          inputs: { ...state.inputs, [key]: processedValue },
          results: shouldMarkStale ? null : state.results,
          isResultsStale: shouldMarkStale,
          error: null,
          fieldErrors: {},
        }))
      },

      setResults: (results) => set({ results, isResultsStale: false }),

      setError: (error, fieldErrors = {}) =>
        set({
          error,
          fieldErrors,
          isCalculating: false,
        }),

      calculate: async () => {
        const { formula, gender, inputs, measurementSystem } = get()
        console.log('[Store] Calculating with inputs:', inputs)
        console.log('[Store] Current measurement system:', measurementSystem)

        set({ isCalculating: true, error: null })

        try {
          const validation = validateInputs(formula, inputs, measurementSystem, gender)

          if (!validation.success) {
            set({
              error: 'Please correct the input errors',
              fieldErrors: validation.errors,
              isCalculating: false,
            })
            return
          }

          // Always convert inputs to metric for calculation
          const metricInputs = convertToMetric(inputs, measurementSystem, gender)
          console.log('[Store] Converted to metric for calculation:', metricInputs)

          // Get formula implementation and calculate using metric inputs
          const formulaImpl = getFormula(formula)
          const results = formulaImpl.calculate(metricInputs, measurementSystem)
          console.log('[Store] Calculation results:', results)

          set({
            results: { ...results, classification: 'normal' },
            isCalculating: false,
            isResultsStale: false,
            fieldErrors: {},
          })
        } catch (error) {
          console.error('[Store] Calculation error:', error)
          set({
            error: error instanceof Error ? error.message : 'An unexpected error occurred',
            isCalculating: false,
            results: null,
          })
        }
      },

      reset: () =>
        set({
          inputs: {},
          results: null,
          error: null,
          isResultsStale: false,
        }),

      setHasHydrated: (state: boolean) => set({ _hasHydrated: state }),

      setResultsStale: (isStale) => set({ isResultsStale: isStale }),
    }),
    {
      name: 'calculator-storage',
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          // Migrate parillo → parrillo (correct spelling)
          if (persistedState?.formula === 'parillo') {
            persistedState.formula = 'parrillo'
          }
        }
        return persistedState
      },
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error('Hydration failed:', error)
          state?.setError('Failed to load saved data')
        }
        state?.setHasHydrated(true)
      },
    },
  ),
)
