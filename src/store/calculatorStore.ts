import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { z } from "zod";
import {
  formulaSchemas,
  validateFormula as validateInputs,
  isValidFormula,
} from "../schemas/calculator";
import { convertMeasurement, ConversionType } from "../utils/conversions";
import { getFormula } from "../formulas";

// Map input fields to their conversion types
// Note: Skinfold measurements are always in mm, so they don't need conversion
const INPUT_CONVERSION_MAP: Partial<
  Record<keyof z.infer<(typeof formulaSchemas)["ymca"]>, ConversionType>
> = {
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
};

export interface CalculatorStore {
  // State
  formula: z.infer<typeof formulaSchemas.formula>;
  gender: z.infer<typeof formulaSchemas.gender>;
  inputs: z.infer<typeof formulaSchemas.inputs>;
  error: string | null;
  isCalculating: boolean;
  isResultsStale: boolean;
  results: z.infer<typeof formulaSchemas.results> | null;
  measurementSystem: z.infer<typeof formulaSchemas.measurementSystem>;
  fieldErrors: Record<string, string>;
  _hasHydrated: boolean;

  // Actions
  setFormula: (formula: z.infer<typeof formulaSchemas.formula>) => void;
  setGender: (gender: z.infer<typeof formulaSchemas.gender>) => void;
  setMeasurementSystem: (system: z.infer<typeof formulaSchemas.measurementSystem>) => void;
  setInput: (
    key: keyof z.infer<typeof formulaSchemas.inputs>,
    value: number | null,
    options?: { keepResults?: boolean }
  ) => void;
  setResults: (results: z.infer<typeof formulaSchemas.results> | null) => void;
  setError: (error: string | null, fieldErrors?: Record<string, string>) => void;
  setHasHydrated: (state: boolean) => void;
  setResultsStale: (isStale: boolean) => void;
  calculate: () => Promise<void>;
  reset: () => void;
}

/**
 * Converts input values to metric (our standardized format)
 * Note: Skinfold measurements are always in mm and don't need conversion
 */
function convertToMetric(
  inputs: z.infer<typeof formulaSchemas.inputs>,
  currentSystem: z.infer<typeof formulaSchemas.measurementSystem>,
  gender: z.infer<typeof formulaSchemas.gender>
): z.infer<typeof formulaSchemas.inputs> {
  if (currentSystem === "metric") return { ...inputs, gender };

  const metricInputs: Partial<z.infer<typeof formulaSchemas.inputs>> = {
    gender,
    age: inputs.age,
  };

  // Convert each input to metric
  Object.entries(inputs).forEach(([key, value]) => {
    if (value == null || key === "gender" || key === "age") return;

    const conversionType = INPUT_CONVERSION_MAP[key as keyof typeof inputs];
    if (!conversionType) {
      // If no conversion type is specified (e.g., skinfolds), keep the value as is
      metricInputs[key as keyof typeof inputs] = value;
      return;
    }

    if (typeof value === "number") {
      metricInputs[key as keyof typeof inputs] = convertMeasurement(
        value,
        conversionType,
        "imperial",
        "metric"
      );
    }
  });

  return metricInputs as z.infer<typeof formulaSchemas.inputs>;
}

/**
 * Converts metric values to display system
 * Note: Skinfold measurements are always in mm and don't need conversion
 */
function convertToDisplaySystem(
  inputs: z.infer<typeof formulaSchemas.inputs>,
  targetSystem: z.infer<typeof formulaSchemas.measurementSystem>,
  gender: z.infer<typeof formulaSchemas.gender>
): z.infer<typeof formulaSchemas.inputs> {
  if (targetSystem === "metric") return { ...inputs, gender };

  const displayInputs: Partial<z.infer<typeof formulaSchemas.inputs>> = {
    gender,
    age: inputs.age,
  };

  // Convert each input to display system
  Object.entries(inputs).forEach(([key, value]) => {
    if (value == null || key === "gender" || key === "age") return;

    const conversionType = INPUT_CONVERSION_MAP[key as keyof typeof inputs];
    if (!conversionType) {
      // If no conversion type is specified (e.g., skinfolds), keep the value as is
      displayInputs[key as keyof typeof inputs] = value;
      return;
    }

    if (typeof value === "number") {
      displayInputs[key as keyof typeof inputs] = convertMeasurement(
        value,
        conversionType,
        "metric",
        "imperial"
      );
    }
  });

  return displayInputs as z.infer<typeof formulaSchemas.inputs>;
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
          inputs: { ...state.inputs, gender },
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

        // Only include gender if there are other inputs
        const hasOtherInputs = Object.keys(displayInputs).length > 0;
        const finalInputs = hasOtherInputs ? { ...displayInputs, gender } : {};

        set(state => ({
          ...state,
          measurementSystem: newSystem,
          inputs: finalInputs,
          results: null,
          isResultsStale: true,
          error: null,
          fieldErrors: {},
        }));
      },

      setInput: (key, value, options) => {
        console.log(`[Store] Setting ${String(key)}:`, value);
        const state = get();
        const currentValue = state.inputs[key];

        // Handle string inputs and empty strings
        let processedValue: number | null = null;
        if (typeof value === "string") {
          if (value === "") {
            processedValue = null;
          } else {
            const numValue = parseFloat(value);
            processedValue = isNaN(numValue) ? null : numValue;
          }
        } else {
          processedValue = value;
        }

        // Only mark results as stale if the value actually changed
        const shouldMarkStale = !options?.keepResults && processedValue !== currentValue;

        set(state => ({
          ...state,
          inputs: { ...state.inputs, [key]: processedValue },
          results: shouldMarkStale ? null : state.results,
          isResultsStale: shouldMarkStale,
          error: null,
          fieldErrors: {},
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
          const validation = validateInputs(formula, inputs, measurementSystem, gender);

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
            results: { ...results, classification: "normal" },
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
