import { useCalculatorStore } from '../../store/calculatorStore'

jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
  },
}))

const mockValidateFormula = jest.fn(() => ({ success: true, errors: {} }))
jest.mock('../../schemas/calculator', () => ({
  validateFormula: (...args: unknown[]) => mockValidateFormula(...args),
}))

const mockCalculate = jest.fn(() => ({
  bodyFatPercentage: 20,
  fatMass: 16,
  leanMass: 64,
}))
jest.mock('@bodyfat/shared/formulas', () => ({
  getFormula: jest.fn(() => ({
    calculate: (...args: unknown[]) => mockCalculate(...args),
  })),
}))

jest.mock('@bodyfat/shared/conversions', () => ({
  convertMeasurement: jest.fn((value: number, type: string, from: string, to: string) => {
    if (from === to) return value
    // metric -> imperial
    if (from === 'metric' && to === 'imperial') {
      if (type === 'weight') return Number((value * 2.20462).toFixed(2))
      if (type === 'length') return Number((value * 0.393701).toFixed(2))
    }
    // imperial -> metric
    if (from === 'imperial' && to === 'metric') {
      if (type === 'weight') return Number((value / 2.20462).toFixed(2))
      if (type === 'length') return Number((value * 2.54).toFixed(2))
    }
    return value
  }),
}))

jest.mock('@bodyfat/shared/conversions/constants', () => ({
  INPUT_CONVERSION_MAP: {
    weight: 'weight',
    height: 'length',
    neckCircumference: 'length',
    waistCircumference: 'length',
    hipsCircumference: 'length',
    chestCircumference: 'length',
    chestSkinfold: 'skinfold',
    abdomenSkinfold: 'skinfold',
    thighSkinfold: 'skinfold',
  },
}))

describe('useCalculatorStore', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    useCalculatorStore.setState({
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
    })
  })

  describe('setFormula', () => {
    it('updates formula and clears results and error', () => {
      useCalculatorStore.setState({
        results: {
          bodyFatPercentage: 20,
          fatMass: 16,
          leanMass: 64,
        },
        error: 'old error',
      })

      useCalculatorStore.getState().setFormula('navy')

      const state = useCalculatorStore.getState()
      expect(state.formula).toBe('navy')
      expect(state.results).toBeNull()
      expect(state.error).toBeNull()
      expect(state.fieldErrors).toEqual({})
    })

    it('preserves existing inputs', () => {
      useCalculatorStore.setState({
        inputs: { weight: 80, waistCircumference: 85 },
      })

      useCalculatorStore.getState().setFormula('navy')

      const state = useCalculatorStore.getState()
      expect(state.inputs).toEqual({ weight: 80, waistCircumference: 85 })
    })
  })

  describe('setGender', () => {
    it('updates gender', () => {
      useCalculatorStore.getState().setGender('female')

      expect(useCalculatorStore.getState().gender).toBe('female')
    })

    it('marks results as stale', () => {
      useCalculatorStore.getState().setGender('female')

      expect(useCalculatorStore.getState().isResultsStale).toBe(true)
    })

    it('clears errors', () => {
      useCalculatorStore.setState({
        error: 'some error',
        fieldErrors: { weight: 'too low' },
      })

      useCalculatorStore.getState().setGender('female')

      const state = useCalculatorStore.getState()
      expect(state.error).toBeNull()
      expect(state.fieldErrors).toEqual({})
    })
  })

  describe('setMeasurementSystem', () => {
    it('is a no-op when setting the same system', () => {
      useCalculatorStore.setState({
        inputs: { weight: 80 },
        isResultsStale: false,
      })

      useCalculatorStore.getState().setMeasurementSystem('metric')

      const state = useCalculatorStore.getState()
      expect(state.inputs.weight).toBe(80)
      expect(state.isResultsStale).toBe(false)
    })

    it('converts weight from metric to imperial', () => {
      useCalculatorStore.setState({
        inputs: { weight: 80 },
        gender: 'male',
      })

      useCalculatorStore.getState().setMeasurementSystem('imperial')

      const state = useCalculatorStore.getState()
      // 80 * 2.20462 = 176.3696, rounded to 2 decimal places
      expect(state.inputs.weight).toBeCloseTo(176.37, 1)
    })

    it('converts length measurements', () => {
      useCalculatorStore.setState({
        inputs: { waistCircumference: 85 },
        gender: 'male',
      })

      useCalculatorStore.getState().setMeasurementSystem('imperial')

      const state = useCalculatorStore.getState()
      // 85 * 0.393701 = 33.464585, rounded to 2 decimal places
      expect(state.inputs.waistCircumference).toBeCloseTo(33.46, 1)
    })

    it('does not convert skinfold values', () => {
      useCalculatorStore.setState({
        inputs: { chestSkinfold: 15 },
        gender: 'male',
      })

      useCalculatorStore.getState().setMeasurementSystem('imperial')

      const state = useCalculatorStore.getState()
      expect(state.inputs.chestSkinfold).toBe(15)
    })

    it('marks results stale and clears errors', () => {
      useCalculatorStore.setState({
        inputs: { weight: 80 },
        gender: 'male',
        error: 'old error',
        fieldErrors: { weight: 'invalid' },
      })

      useCalculatorStore.getState().setMeasurementSystem('imperial')

      const state = useCalculatorStore.getState()
      expect(state.isResultsStale).toBe(true)
      expect(state.error).toBeNull()
      expect(state.fieldErrors).toEqual({})
      expect(state.results).toBeNull()
    })
  })

  describe('setInput', () => {
    it('sets an input value', () => {
      useCalculatorStore.getState().setInput('weight', 80)

      expect(useCalculatorStore.getState().inputs.weight).toBe(80)
    })

    it('marks results stale', () => {
      useCalculatorStore.getState().setInput('weight', 80)

      expect(useCalculatorStore.getState().isResultsStale).toBe(true)
    })

    it('does not mark results stale with keepResults when value is unchanged', () => {
      useCalculatorStore.setState({ inputs: { weight: 80 } })

      useCalculatorStore.getState().setInput('weight', 80, { keepResults: true })

      expect(useCalculatorStore.getState().isResultsStale).toBe(false)
    })

    it('clears errors on new input', () => {
      useCalculatorStore.setState({
        error: 'old error',
        fieldErrors: { weight: 'too low' },
      })

      useCalculatorStore.getState().setInput('weight', 80)

      const state = useCalculatorStore.getState()
      expect(state.error).toBeNull()
      expect(state.fieldErrors).toEqual({})
    })
  })

  describe('calculate', () => {
    it('sets fieldErrors when validation fails', async () => {
      mockValidateFormula.mockReturnValueOnce({
        success: false,
        errors: { weight: 'Weight is required' },
      })

      await useCalculatorStore.getState().calculate()

      const state = useCalculatorStore.getState()
      expect(state.error).toBe('Please correct the input errors')
      expect(state.fieldErrors).toEqual({ weight: 'Weight is required' })
      expect(state.isCalculating).toBe(false)
    })

    it('sets results with classification on success', async () => {
      useCalculatorStore.setState({
        inputs: { weight: 80, waistCircumference: 85 },
      })

      await useCalculatorStore.getState().calculate()

      const state = useCalculatorStore.getState()
      expect(state.results).toEqual({
        bodyFatPercentage: 20,
        fatMass: 16,
        leanMass: 64,
        classification: 'normal',
      })
      expect(state.isCalculating).toBe(false)
      expect(state.isResultsStale).toBe(false)
    })

    it('sets error message on calculation error', async () => {
      mockCalculate.mockImplementationOnce(() => {
        throw new Error('Division by zero')
      })

      await useCalculatorStore.getState().calculate()

      const state = useCalculatorStore.getState()
      expect(state.error).toBe('Division by zero')
      expect(state.results).toBeNull()
      expect(state.isCalculating).toBe(false)
    })
  })

  describe('reset', () => {
    it('clears inputs, results, and error', () => {
      useCalculatorStore.setState({
        inputs: { weight: 80 },
        results: {
          bodyFatPercentage: 20,
          fatMass: 16,
          leanMass: 64,
        },
        error: 'some error',
        isResultsStale: true,
      })

      useCalculatorStore.getState().reset()

      const state = useCalculatorStore.getState()
      expect(state.inputs).toEqual({})
      expect(state.results).toBeNull()
      expect(state.error).toBeNull()
      expect(state.isResultsStale).toBe(false)
    })
  })
})
