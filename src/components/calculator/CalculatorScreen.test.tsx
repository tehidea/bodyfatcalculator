import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import { CalculatorScreen } from "../../screens/CalculatorScreen";
import { useCalculatorStore } from "../../store/calculatorStore";
import { calculateResults } from "../../formulas";
import { validateInputs } from "../../utils/validation";
import * as FormulaSelector from "../calculator/FormulaSelector";
import { usePremiumStore } from "../../store/premiumStore";

jest.mock("../../store/calculatorStore");
jest.mock("@expo/vector-icons");
jest.mock("../../utils/validation", () => ({
  validateInputs: jest.fn(() => ({ isValid: true, message: "" })),
}));
jest.mock("react-native-purchases");
jest.mock("../calculator/FormulaSelector", () => ({
  FormulaSelector: () => null,
  MeasurementIcon: () => null,
}));
jest.mock("../../store/premiumStore");
jest.mock("react-native-keyboard-controller", () => ({
  KeyboardAwareScrollView: require("react-native").ScrollView,
  KeyboardToolbar: () => null,
  useKeyboardController: () => ({
    state: { height: 0, visible: false },
    dismiss: jest.fn(),
  }),
}));

const mockUseCalculatorStore = useCalculatorStore as jest.MockedFunction<typeof useCalculatorStore>;
const mockValidateInputs = validateInputs as jest.MockedFunction<typeof validateInputs>;
const mockUsePremiumStore = usePremiumStore as jest.MockedFunction<typeof usePremiumStore>;

describe("CalculatorScreen", () => {
  beforeEach(() => {
    mockValidateInputs.mockClear();
    mockValidateInputs.mockReturnValue({ success: true, errors: {} });

    mockUseCalculatorStore.mockReturnValue({
      formula: "ymca",
      gender: "male",
      inputs: {
        waistCircumference: 85,
        weight: 80,
      },
      error: null,
      fieldErrors: {},
      isCalculating: false,
      isResultsStale: false,
      results: null,
      measurementSystem: "metric",
      setError: jest.fn(),
      reset: jest.fn(),
      setInput: jest.fn(),
      setFormula: jest.fn(),
      setGender: jest.fn(),
      setMeasurementSystem: jest.fn(),
      calculate: jest.fn(),
      setResults: jest.fn(),
    });

    mockUsePremiumStore.mockReturnValue({
      isPremium: false,
      isLoading: false,
      checkPremiumStatus: jest.fn(),
      setPremiumStatus: jest.fn(),
      setEntitlements: jest.fn(),
      pro: false,
      premium: false,
    });
  });

  it("allows calculation with valid inputs", async () => {
    const { getByTestId } = render(<CalculatorScreen />);

    await act(async () => {
      fireEvent.press(getByTestId("calculate-button"));
      await Promise.resolve();
    });

    const result = await calculateResults(
      "ymca",
      "male",
      { waistCircumference: 85, weight: 80 },
      "metric"
    );

    expect(result).toMatchObject({
      bodyFatPercentage: expect.any(Number),
      fatMass: expect.any(Number),
      leanMass: expect.any(Number),
      classification: expect.any(String),
    });

    expect(result.bodyFatPercentage).toBeCloseTo(14.73, 1);
  });
});
