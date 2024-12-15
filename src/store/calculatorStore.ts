import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Formula,
  Gender,
  MeasurementSystem,
  CalculatorInputs,
  CalculatorResults,
} from "../types/calculator";
import { StandardizedInputs } from "../types/formula";
import { convertMeasurement, ConversionType } from "../utils/conversions";
import { getFormula } from "../formulas";
import { validateInputs } from "../utils/validation";

// Map input fields to their conversion types
const INPUT_CONVERSION_MAP: Partial<Record<keyof CalculatorInputs, ConversionType>> = {
  weight: "weight",
  height: "length",
  neckCircumference: "length",
  waistCircumference: "length",
  hipsCircumference: "length",
  chestCircumference: "length",
  abdomenCircumference: "length",
  thighCircumference: "length",
  calfCircumference: "length",
  bicepCircumference: "length",
  tricepCircumference: "length",
  forearmCircumference: "length",
  wristCircumference: "length",
  chestSkinfold: "skinfold",
  abdomenSkinfold: "skinfold",
  thighSkinfold: "skinfold",
  tricepSkinfold: "skinfold",
  bicepSkinfold: "skinfold",
  subscapularSkinfold: "skinfold",
  suprailiacSkinfold: "skinfold",
  midaxillarySkinfold: "skinfold",
  lowerBackSkinfold: "skinfold",
  calfSkinfold: "skinfold",
};

export interface CalculatorStore {
  // State
  formula: Formula;
  gender: Gender;
  inputs: CalculatorInputs; // Display values in current measurement system
  error: string | null;
  isCalculating: boolean;
  isResultsStale: boolean;
  results: CalculatorResults | null;
  measurementSystem: MeasurementSystem;
  fieldErrors: Record<string, string>;
  _hasHydrated: boolean;

  // Actions
  setFormula: (formula: Formula) => void;
  setGender: (gender: Gender) => void;
  setMeasurementSystem: (system: MeasurementSystem) => void;
  setInput: (
    key: keyof CalculatorInputs,
    value: number | null,
    options?: { keepResults?: boolean }
  ) => void;
  setResults: (results: CalculatorResults | null) => void;
  setError: (error: string | null, fieldErrors?: Record<string, string>) => void;
  setHasHydrated: (state: boolean) => void;
  setResultsStale: (isStale: boolean) => void;
  calculate: () => Promise<void>;
  reset: () => void;
}

/**
 * Converts input values to metric (our standardized format)
 */
function convertToMetric(
  inputs: CalculatorInputs,
  currentSystem: MeasurementSystem,
  gender: Gender
): StandardizedInputs {
  if (currentSystem === "metric") return { ...inputs, gender } as StandardizedInputs;

  const metricInputs: Partial<StandardizedInputs> = {
    gender,
    age: inputs.age,
  };

  // Convert each input to metric
  Object.entries(inputs).forEach(([key, value]) => {
    if (value == null || key === "gender" || key === "age") return;

    const conversionType = INPUT_CONVERSION_MAP[key as keyof CalculatorInputs];
    if (!conversionType) return;

    metricInputs[key as keyof StandardizedInputs] = convertMeasurement(
      value,
      conversionType,
      "imperial",
      "metric"
    );
  });

  return metricInputs as StandardizedInputs;
}

/**
 * Converts metric values to display system
 */
function convertToDisplaySystem(
  inputs: StandardizedInputs,
  targetSystem: MeasurementSystem,
  gender: Gender
): CalculatorInputs {
  if (targetSystem === "metric") return { ...inputs, gender } as CalculatorInputs;

  const displayInputs: Partial<CalculatorInputs> = {
    gender,
    age: inputs.age ?? undefined,
  };

  // Convert each input to display system
  Object.entries(inputs).forEach(([key, value]) => {
    if (value == null || key === "gender" || key === "age") return;

    const conversionType = INPUT_CONVERSION_MAP[key as keyof CalculatorInputs];
    if (!conversionType) return;

    displayInputs[key as keyof CalculatorInputs] = convertMeasurement(
      value,
      conversionType,
      "metric",
      "imperial"
    );
  });

  return displayInputs as CalculatorInputs;
}

export const useCalculatorStore = create<CalculatorStore>()(
  persist(
    (set, get) => ({
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

      setFormula: formula =>
        set({
          formula,
          inputs: {},
          results: null,
          isResultsStale: false,
          error: null,
          fieldErrors: {},
        }),

      setGender: gender =>
        set(state => ({
          ...state,
          gender,
          inputs: { ...state.inputs, gender }, // Ensure gender is in inputs
          results: null,
          isResultsStale: true,
          error: null,
          fieldErrors: {},
        })),

      setMeasurementSystem: newSystem => {
        const { measurementSystem: oldSystem, inputs, gender } = get();
        console.log("[Store] Switching measurement system:", oldSystem, "->", newSystem);
        console.log("[Store] Current inputs:", inputs);
        console.log("[Store] Current gender:", gender);

        if (oldSystem === newSystem) return;

        // First convert all values to metric (our standardized format)
        const metricInputs = convertToMetric(inputs, oldSystem, gender);
        console.log("[Store] Values in metric:", metricInputs);

        // Then convert to the target system if it's imperial
        const displayInputs = convertToDisplaySystem(metricInputs, newSystem, gender);
        console.log("[Store] Final values for display:", displayInputs);

        set(state => ({
          ...state,
          measurementSystem: newSystem,
          inputs: { ...displayInputs, gender }, // Ensure gender is preserved
          results: null,
          isResultsStale: true,
          error: null,
          fieldErrors: {},
        }));
      },

      setInput: (key, value, options) => {
        console.log(`[Store] Setting ${key}:`, value);
        const state = get();
        const currentValue = state.inputs[key];

        // Only mark results as stale if the value actually changed
        const shouldMarkStale = !options?.keepResults && value !== currentValue;

        set(state => ({
          inputs: { ...state.inputs, [key]: value },
          isResultsStale: shouldMarkStale ? true : state.isResultsStale,
        }));
      },

      setResults: results => set({ results, isResultsStale: false }),

      setError: (error, fieldErrors = {}) =>
        set({
          error,
          fieldErrors,
          isCalculating: false,
        }),

      calculate: async () => {
        const { formula, gender, inputs, measurementSystem } = get();
        console.log("[Store] Calculating with inputs:", inputs);
        console.log("[Store] Current measurement system:", measurementSystem);

        set({ isCalculating: true, error: null });

        try {
          const validation = validateInputs(formula, inputs, gender, measurementSystem);

          if (!validation.success) {
            set({
              error: "Please correct the input errors",
              fieldErrors: validation.errors,
              isCalculating: false,
            });
            return;
          }

          // Always convert inputs to metric for calculation
          const metricInputs = convertToMetric(inputs, measurementSystem, gender);
          console.log("[Store] Converted to metric for calculation:", metricInputs);

          // Get formula implementation and calculate using metric inputs
          const formulaImpl = getFormula(formula);
          const results = formulaImpl.calculate(metricInputs, measurementSystem);
          console.log("[Store] Calculation results:", results);

          set({
            results: { ...results, classification: "normal" }, // Add required classification
            isCalculating: false,
            isResultsStale: false,
            fieldErrors: {},
          });
        } catch (error) {
          console.error("[Store] Calculation error:", error);
          set({
            error: error instanceof Error ? error.message : "An unexpected error occurred",
            isCalculating: false,
            results: null,
          });
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

      setResultsStale: isStale => set({ isResultsStale: isStale }),
    }),
    {
      name: "calculator-storage",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error("Hydration failed:", error);
          state?.setError("Failed to load saved data");
        }
        state?.setHasHydrated(true);
      },
    }
  )
);
