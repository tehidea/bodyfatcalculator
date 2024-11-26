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

interface CalculatorState {
  formula: Formula;
  gender: Gender;
  measurementSystem: MeasurementSystem;
  inputs: CalculatorInputs;
  results: CalculatorResults | null;
  error: string | null;
  isCalculating: boolean;
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
      case "mm":
        return Number((value * 0.0393701).toFixed(2));
      default:
        return value;
    }
  } else {
    switch (unit) {
      case "kg":
        return Number((value / 2.20462).toFixed(2));
      case "mm":
        return Number((value / 0.0393701).toFixed(2));
      default:
        return value;
    }
  }
};

export const useCalculatorStore = create<CalculatorState & CalculatorActions>()(
  persist(
    (set, get) => ({
      formula: "durnin",
      gender: "male",
      measurementSystem: "metric",
      inputs: {},
      results: null,
      isCalculating: false,
      error: null,
      _hasHydrated: false,
      setFormula: formula => set({ formula }),
      setGender: gender => set({ gender }),
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
          results: null, // Clear results when changing system
        });
      },
      setInput: (key, value) =>
        set(state => ({
          inputs: { ...state.inputs, [key]: value },
        })),
      setResults: results => set({ results }),
      setError: error => set({ error }),
      calculate: async () => {
        const { formula, gender, inputs } = get();

        set({ isCalculating: true, error: null });

        try {
          // Validate inputs
          const validationErrors = validateInputs(formula, inputs);
          if (validationErrors.length > 0) {
            throw new Error(validationErrors[0].message);
          }

          // Calculate results
          const bodyFat = calculateBodyFat(formula, gender, inputs);
          const classification = getClassification(bodyFat, gender);
          const fatMass = (inputs.weight || 0) * (bodyFat / 100);
          const leanMass = (inputs.weight || 0) - fatMass;

          set({
            results: {
              bodyFatPercentage: bodyFat,
              fatMass,
              leanMass,
              classification,
            },
            isCalculating: false,
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
        }),
      setHasHydrated: (state: boolean) => set({ _hasHydrated: state }),
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
