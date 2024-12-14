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
    it("keeps metric values in store while tracking measurement system preference", () => {
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

      // Verify internal values stay metric
      expect(state.inputs.weight).toBe(80);
      expect(state.inputs.waistCircumference).toBe(85);

      // Verify measurement system was updated
      expect(state.measurementSystem).toBe("imperial");

      // If you want to verify conversion logic, do it separately
      const displayWeight = convertMeasurement(
        state.inputs.weight!,
        "weight",
        "metric",
        "imperial"
      );
      const displayWaist = convertMeasurement(
        state.inputs.waistCircumference!,
        "length",
        "metric",
        "imperial"
      );

      expect(displayWeight).toBeCloseTo(176.37, 1);
      expect(displayWaist).toBeCloseTo(33.46, 1);
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

  describe("setGender", () => {
    it("resets validation errors when changing gender", () => {
      // Set initial values and trigger validation error
      useCalculatorStore.setState(state => ({
        ...state,
        gender: "male",
        error: "Invalid measurement",
        fieldErrors: { waistCircumference: "Waist circumference is required" },
      }));

      // Verify error is set
      const initialState = useCalculatorStore.getState();
      expect(initialState.error).toBe("Invalid measurement");
      expect(initialState.fieldErrors.waistCircumference).toBe("Waist circumference is required");

      // Change gender
      useCalculatorStore.getState().setGender("female");

      // Verify errors are reset
      const updatedState = useCalculatorStore.getState();
      expect(updatedState.error).toBeNull();
      expect(updatedState.fieldErrors).toEqual({});
      expect(updatedState.results).toBeNull();
      expect(updatedState.isResultsStale).toBe(false);
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
