import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import { CalculatorScreen } from "../../screens/CalculatorScreen";
import { useCalculatorStore } from "../../store/calculatorStore";
import { calculateResults } from "../../utils/calculations";
import { validateInputs } from "../../utils/validation";
import * as FormulaSelector from "../Calculator/FormulaSelector";
import { usePremiumStore } from "../../store/premiumStore";

jest.mock("../../store/calculatorStore");
jest.mock("@expo/vector-icons");
jest.mock("@rneui/themed", () => ({
  ...jest.requireActual("@rneui/themed"),
  Icon: () => null,
}));
jest.mock("../../utils/calculations");
jest.mock("../../utils/validation");
jest.mock("react-native-purchases");
jest.mock("../Calculator/FormulaSelector", () => ({
  FormulaSelector: () => null,
}));
jest.mock("../../store/premiumStore");

const mockUseCalculatorStore = useCalculatorStore as jest.MockedFunction<typeof useCalculatorStore>;
const mockCalculateResults = calculateResults as jest.MockedFunction<typeof calculateResults>;
const mockValidateInputs = validateInputs as jest.MockedFunction<typeof validateInputs>;
const mockUsePremiumStore = usePremiumStore as jest.MockedFunction<typeof usePremiumStore>;

describe("CalculatorScreen", () => {
  beforeEach(() => {
    mockCalculateResults.mockClear();
    mockValidateInputs.mockClear();

    mockValidateInputs.mockReturnValue({ success: true, errors: {} });
    mockCalculateResults.mockResolvedValue({
      bodyFatPercentage: 20,
      fatMass: 16,
      leanMass: 64,
      classification: "Fitness (14-17%)",
    });

    mockUseCalculatorStore.mockReturnValue({
      formula: "ymca",
      gender: "male",
      inputs: {
        waist: 85,
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
    const { getByText } = render(<CalculatorScreen />);

    await act(async () => {
      fireEvent.press(getByText("Calculate"));
      await Promise.resolve();
    });

    expect(mockCalculateResults).toHaveBeenCalledWith(
      "ymca",
      "male",
      { waist: 85, weight: 80 },
      "metric"
    );
  });
});
