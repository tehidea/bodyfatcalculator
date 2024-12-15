import { useCalculatorStore } from "./calculatorStore";
import { convertMeasurement } from "../utils/conversions";

describe("calculatorStore", () => {
  beforeEach(() => {
    useCalculatorStore.setState({
      formula: "ymca",
      gender: "male",
      measurementSystem: "metric",
      inputs: {},
      results: null,
      isCalculating: false,
      error: null,
      isResultsStale: false,
      fieldErrors: {},
      _hasHydrated: false,
    });
  });

  describe("setMeasurementSystem", () => {
    it("converts values to the target system and updates measurement system", () => {
      // Get store actions directly from useCalculatorStore
      useCalculatorStore.setState({
        inputs: {
          weight: 80,
          waistCircumference: 85,
        },
      });

      // Switch to imperial
      useCalculatorStore.getState().setMeasurementSystem("imperial");

      // Get state for assertions
      const state = useCalculatorStore.getState();

      // Verify values are converted to imperial
      expect(state.inputs.weight).toBeCloseTo(176.37, 2);
      expect(state.inputs.waistCircumference).toBeCloseTo(33.46, 2);

      // Verify measurement system was updated
      expect(state.measurementSystem).toBe("imperial");

      // Verify results are cleared and marked as stale
      expect(state.results).toBeNull();
      expect(state.isResultsStale).toBe(true);
    });

    it("resets validation errors when changing systems", () => {
      // Set initial values and trigger validation error
      useCalculatorStore.setState(state => ({
        ...state,
        inputs: { weight: 15 }, // Below minimum 20kg
        error: "Invalid weight",
        fieldErrors: { weight: "Weight must be at least 20 kg" },
      }));

      // Verify error is set
      const initialState = useCalculatorStore.getState();
      expect(initialState.error).toBe("Invalid weight");
      expect(initialState.fieldErrors.weight).toBe("Weight must be at least 20 kg");

      // Change measurement system
      useCalculatorStore.getState().setMeasurementSystem("imperial");

      // Verify errors are reset
      const updatedState = useCalculatorStore.getState();
      expect(updatedState.error).toBeNull();
      expect(updatedState.fieldErrors).toEqual({});
    });
  });

  describe("setGender", () => {
    it("resets validation errors when changing gender", () => {
      // Set initial values and trigger validation error
      useCalculatorStore.setState(state => ({
        ...state,
        inputs: { weight: 15 }, // Below minimum 20kg
        error: "Invalid weight",
        fieldErrors: { weight: "Weight must be at least 20 kg" },
      }));

      // Verify error is set
      const initialState = useCalculatorStore.getState();
      expect(initialState.error).toBe("Invalid weight");
      expect(initialState.fieldErrors.weight).toBe("Weight must be at least 20 kg");

      // Change gender
      useCalculatorStore.getState().setGender("female");

      // Verify errors are reset and results are marked as stale
      const updatedState = useCalculatorStore.getState();
      expect(updatedState.error).toBeNull();
      expect(updatedState.fieldErrors).toEqual({});
      expect(updatedState.results).toBeNull();
      expect(updatedState.isResultsStale).toBe(true);
    });
  });

  describe("setFormula", () => {
    it("resets validation errors when changing formula", () => {
      // Set initial values and trigger validation error
      useCalculatorStore.setState(state => ({
        ...state,
        formula: "ymca",
        error: "Invalid measurement",
        fieldErrors: { waistCircumference: "Waist circumference is required" },
      }));

      // Verify error is set
      const initialState = useCalculatorStore.getState();
      expect(initialState.error).toBe("Invalid measurement");
      expect(initialState.fieldErrors.waistCircumference).toBe("Waist circumference is required");

      // Change formula
      useCalculatorStore.getState().setFormula("navy");

      // Verify errors are reset
      const updatedState = useCalculatorStore.getState();
      expect(updatedState.error).toBeNull();
      expect(updatedState.fieldErrors).toEqual({});
      expect(updatedState.results).toBeNull();
      expect(updatedState.isResultsStale).toBe(false);
    });
  });
});
