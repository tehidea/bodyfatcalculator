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

    it("handles empty inputs when changing measurement system", () => {
      useCalculatorStore.setState({
        inputs: {},
      });

      // Switch to imperial
      useCalculatorStore.getState().setMeasurementSystem("imperial");

      // Get state for assertions
      const state = useCalculatorStore.getState();

      // Verify empty inputs remain empty
      expect(state.inputs).toEqual({});
      expect(state.measurementSystem).toBe("imperial");
    });

    it("maintains precision when converting back and forth", () => {
      const originalInputs = {
        weight: 80,
        waistCircumference: 85,
      };

      useCalculatorStore.setState({ inputs: originalInputs });

      // Switch to imperial
      useCalculatorStore.getState().setMeasurementSystem("imperial");
      // Switch back to metric
      useCalculatorStore.getState().setMeasurementSystem("metric");

      const finalState = useCalculatorStore.getState();

      // Values should be the same as original within reasonable precision
      expect(finalState.inputs.weight).toBeCloseTo(originalInputs.weight, 2);
      expect(finalState.inputs.waistCircumference).toBeCloseTo(
        originalInputs.waistCircumference,
        2
      );
    });
  });

  describe("setGender", () => {
    it("resets validation errors when changing gender", () => {
      useCalculatorStore.setState(state => ({
        ...state,
        inputs: { weight: 15 },
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
      expect(updatedState.gender).toBe("female");
    });

    it("preserves inputs when changing gender", () => {
      const inputs = {
        weight: 80,
        waistCircumference: 85,
      };

      useCalculatorStore.setState({ inputs });

      // Change gender
      useCalculatorStore.getState().setGender("female");

      // Verify inputs are preserved
      const state = useCalculatorStore.getState();
      expect(state.inputs).toEqual(inputs);
    });
  });

  describe("setFormula", () => {
    it("resets validation errors when changing formula", () => {
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
      expect(updatedState.formula).toBe("navy");
    });

    it("preserves inputs when changing formula", () => {
      const inputs = {
        weight: 80,
        waistCircumference: 85,
      };

      useCalculatorStore.setState({ inputs });

      // Change formula
      useCalculatorStore.getState().setFormula("navy");

      // Verify inputs are preserved
      const state = useCalculatorStore.getState();
      expect(state.inputs).toEqual(inputs);
    });
  });

  describe("setInput", () => {
    it("updates a single input value", () => {
      useCalculatorStore.getState().setInput("weight", 75);

      const state = useCalculatorStore.getState();
      expect(state.inputs.weight).toBe(75);
      expect(state.isResultsStale).toBe(true);
    });

    it("handles string input values", () => {
      useCalculatorStore.getState().setInput("weight", "75");

      const state = useCalculatorStore.getState();
      expect(state.inputs.weight).toBe(75);
    });

    it("handles empty string input", () => {
      useCalculatorStore.getState().setInput("weight", "");

      const state = useCalculatorStore.getState();
      expect(state.inputs.weight).toBeUndefined();
    });

    it("marks results as stale when input changes", () => {
      // Set initial results
      useCalculatorStore.setState({
        results: {
          bodyFatPercentage: 20,
          fatMass: 16,
          leanMass: 64,
          classification: "Fitness",
        },
        isResultsStale: false,
      });

      useCalculatorStore.getState().setInput("weight", 75);

      const state = useCalculatorStore.getState();
      expect(state.isResultsStale).toBe(true);
    });
  });
});
