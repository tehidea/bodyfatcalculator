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
import { FORMULA_REQUIREMENTS } from "../constants/formulas";
import { validateInputs } from "../utils/validation";
import { calculateBodyFat, getClassification } from "../utils/calculations";

interface CalculatorState {
  formula: Formula;
  gender: Gender;
  measurementSystem: MeasurementSystem;
  inputs: CalculatorInputs;
  results: CalculatorResults | null;
  error: string | null;
  isCalculating: boolean;
  isResultsStale: boolean;
  fieldErrors: Record<string, string>;
}

interface CalculatorActions {
  setFormula: (formula: Formula) => void;
  setGender: (gender: Gender) => void;
  setMeasurementSystem: (system: MeasurementSystem) => void;
  setInput: <K extends keyof CalculatorInputs>(key: K, value: CalculatorInputs[K]) => void;
  setResults: (results: CalculatorResults | null) => void;
  setError: (error: string | null) => void;
  calculate: () => Promise<void>;
  reset: () => void;
  setResultsStale: (isStale: boolean) => void;
}

const convertValue = (
  value: number,
  fromSystem: MeasurementSystem,
  toSystem: MeasurementSystem,
  unit: string
): number => {
  if (fromSystem === toSystem) return value;

  if (fromSystem === "metric" && toSystem === "imperial") {
    switch (unit) {
      case "kg":
        return Number((value * 2.20462).toFixed(2));
      case "cm":
        return Number((value * 0.393701).toFixed(2));
      case "mm":
        return Number((value * 0.0393701).toFixed(2));
      default:
        return value;
    }
  } else {
    switch (unit) {
      case "kg":
        return Number((value / 2.20462).toFixed(2));
      case "cm":
        return Number((value / 0.393701).toFixed(2));
      case "mm":
        return Number((value / 0.0393701).toFixed(2));
      default:
        return value;
    }
  }
};

interface CalculatorStore extends CalculatorState, CalculatorActions {}

export const useCalculatorStore = create<CalculatorStore>()(
  persist(
    (set, get) => ({
      formula: "durnin",
      gender: "male",
      measurementSystem: "metric",
      inputs: {},
      results: null,
      isCalculating: false,
      error: null,
      isResultsStale: false,
      fieldErrors: {},
      _hasHydrated: false,
      setFormula: formula => set({ formula, results: null, isResultsStale: false }),
      setGender: gender => set({ gender, results: null, isResultsStale: false }),
      setMeasurementSystem: newSystem => {
        const { measurementSystem: oldSystem, inputs } = get();
        const { fields } = FORMULA_REQUIREMENTS[get().formula];

        // Convert all existing inputs to the new system
        const convertedInputs = Object.entries(inputs).reduce((acc, [key, value]) => {
          if (value === undefined) return acc;

          const field = fields.find(f => f.key === key);
          if (!field) return acc;

          return {
            ...acc,
            [key]: convertValue(value, oldSystem, newSystem, field.unit),
          };
        }, {});

        set({
          measurementSystem: newSystem,
          inputs: convertedInputs,
          results: null,
          isResultsStale: true,
        });
      },
      setInput: (key, value) =>
        set(state => ({
          inputs: { ...state.inputs, [key]: value },
          isResultsStale: true,
        })),
      setResults: results => set({ results, isResultsStale: false }),
      setError: error => set({ error }),
      calculate: async () => {
        const { formula, gender, inputs, measurementSystem } = get();

        set({ isCalculating: true, error: null });

        try {
          const validation = validateInputs(formula, inputs);
          if (!validation.success) {
            set({
              error: "Please correct the input errors",
              fieldErrors: validation.errors,
              isCalculating: false,
            });
            return;
          }

          const results = await calculateResults(formula, gender, inputs, measurementSystem);
          set({
            results,
            isCalculating: false,
            isResultsStale: false,
            fieldErrors: {},
          });
        } catch (error) {
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
      onRehydrateStorage: () => state => {
        state?.setHasHydrated(true);
      },
    }
  )
);
