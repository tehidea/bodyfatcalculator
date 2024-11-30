import { CalculatorStore } from "../../store/calculatorStore";

const mockStore: CalculatorStore = {
  formula: "ymca",
  gender: "male",
  inputs: {},
  error: null,
  isCalculating: false,
  isResultsStale: false,
  results: null,
  measurementSystem: "metric",
  fieldErrors: {},
  _hasHydrated: true,
  setFormula: jest.fn(),
  setGender: jest.fn(),
  setMeasurementSystem: jest.fn(),
  setInput: jest.fn(),
  setResults: jest.fn(),
  setError: jest.fn(),
  setHasHydrated: jest.fn(),
  setResultsStale: jest.fn(),
  calculate: jest.fn(),
  reset: jest.fn(),
};

export const useCalculatorStore = jest.fn(selector => {
  if (selector) {
    return selector(mockStore);
  }
  return mockStore;
});
