import { useCalculatorStore } from "./calculatorStore";

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
    it("converts values between metric and imperial", () => {
      // Set initial metric values
      useCalculatorStore.setState(state => ({
        ...state,
        inputs: {
          weight: 80,
          waistCircumference: 85,
        },
      }));

      // Switch to imperial
      useCalculatorStore.getState().setMeasurementSystem("imperial");

      // Check converted values (80kg ≈ 176.37lbs, 85cm ≈ 33.46in)
      const imperialState = useCalculatorStore.getState();
      expect(imperialState.inputs.weight).toBeCloseTo(176.37, 1);
      expect(imperialState.inputs.waistCircumference).toBeCloseTo(33.46, 1);

      // Switch back to metric
      useCalculatorStore.getState().setMeasurementSystem("metric");

      // Check values converted back to metric
      const metricState = useCalculatorStore.getState();
      expect(metricState.inputs.weight).toBeCloseTo(80, 1);
      expect(metricState.inputs.waistCircumference).toBeCloseTo(85, 1);
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

    it("marks results as stale when changing systems", () => {
      // Set initial values and results
      useCalculatorStore.setState(state => ({
        ...state,
        inputs: { weight: 80 },
        results: {
          bodyFatPercentage: 20,
          fatMass: 16,
          leanMass: 64,
          classification: "Fitness",
        },
        isResultsStale: false,
      }));

      // Verify results are set and not stale
      const initialState = useCalculatorStore.getState();
      expect(initialState.results).not.toBeNull();
      expect(initialState.isResultsStale).toBe(false);

      // Change measurement system
      useCalculatorStore.getState().setMeasurementSystem("imperial");

      // Verify results are cleared and marked as stale
      const updatedState = useCalculatorStore.getState();
      expect(updatedState.results).toBeNull();
      expect(updatedState.isResultsStale).toBe(true);
    });
  });
}); 