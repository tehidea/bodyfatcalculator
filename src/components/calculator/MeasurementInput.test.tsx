import React from "react";
import { fireEvent } from "@testing-library/react-native";
import { MeasurementInput } from "./MeasurementInput";
import { act } from "react-test-renderer";
import { renderWithNavigation } from "../../test-utils";
import { useCalculatorStore } from "../../store/calculatorStore";
import { usePremiumStore } from "../../store/premiumStore";
import { TextInput } from "react-native";

// Mock the stores
jest.mock("../../store/calculatorStore", () => ({
  useCalculatorStore: jest.fn(),
}));

jest.mock("../../store/premiumStore", () => ({
  usePremiumStore: jest.fn(),
}));

const mockUseCalculatorStore = useCalculatorStore as jest.Mock;
const mockUsePremiumStore = usePremiumStore as jest.Mock;

const defaultProps = {
  field: "weight",
  label: "Weight",
  unit: "kg",
  error: "",
};

describe("MeasurementInput", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseCalculatorStore.mockReturnValue({
      inputs: {},
      setInput: jest.fn(),
      measurementSystem: "metric",
    });
    mockUsePremiumStore.mockReturnValue({
      pro: true,
      purchasePro: jest.fn(),
    });
  });

  it("renders correctly with empty value", () => {
    const { getByAccessibilityHint } = renderWithNavigation(<MeasurementInput {...defaultProps} />);
    expect(getByAccessibilityHint("Enter weight")).toBeTruthy();
  });

  it("handles valid number input", () => {
    const mockSetInput = jest.fn();
    mockUseCalculatorStore.mockReturnValue({
      inputs: {},
      setInput: mockSetInput,
      measurementSystem: "metric",
    });

    const { getByAccessibilityHint } = renderWithNavigation(<MeasurementInput {...defaultProps} />);
    const input = getByAccessibilityHint("Enter weight");

    act(() => {
      fireEvent.changeText(input, "80");
    });

    expect(mockSetInput).toHaveBeenCalledWith("weight", 80);
  });

  describe("decimal input handling", () => {
    it("allows decimal input for PRO users", () => {
      const mockSetInput = jest.fn();
      mockUseCalculatorStore.mockReturnValue({
        inputs: {},
        setInput: mockSetInput,
        measurementSystem: "metric",
      });
      mockUsePremiumStore.mockReturnValue({
        pro: true,
        purchasePro: jest.fn(),
      });

      const { getByAccessibilityHint } = renderWithNavigation(
        <MeasurementInput {...defaultProps} />
      );
      const input = getByAccessibilityHint("Enter weight");

      act(() => {
        fireEvent.changeText(input, "80.5");
      });

      expect(mockSetInput).toHaveBeenCalledWith("weight", 80.5);
    });

    it("prevents decimal input for non-PRO users", () => {
      const mockSetInput = jest.fn();
      mockUseCalculatorStore.mockReturnValue({
        inputs: {},
        setInput: mockSetInput,
        measurementSystem: "metric",
      });
      mockUsePremiumStore.mockReturnValue({
        pro: false,
        purchasePro: jest.fn(),
      });

      const { getByAccessibilityHint } = renderWithNavigation(
        <MeasurementInput {...defaultProps} />
      );
      const input = getByAccessibilityHint("Enter weight");

      act(() => {
        fireEvent.changeText(input, "80.5");
      });

      // Should not call setInput with decimal value
      expect(mockSetInput).not.toHaveBeenCalledWith("weight", 80.5);
    });

    it("shows upgrade modal when non-PRO user attempts decimal input", () => {
      const mockSetInput = jest.fn();
      mockUseCalculatorStore.mockReturnValue({
        inputs: {},
        setInput: mockSetInput,
        measurementSystem: "metric",
      });
      mockUsePremiumStore.mockReturnValue({
        pro: false,
        purchasePro: jest.fn(),
      });

      const { getByAccessibilityHint, getByText } = renderWithNavigation(
        <MeasurementInput {...defaultProps} />
      );
      const input = getByAccessibilityHint("Enter weight");

      act(() => {
        fireEvent.changeText(input, "80.5");
      });

      // Look for the feature text in the upgrade modal
      expect(getByText("Get exact measurements to 2 decimal places")).toBeTruthy();
      expect(mockSetInput).not.toHaveBeenCalled();
    });

    it("maintains whole number for non-PRO users when attempting decimal input", () => {
      const mockSetInput = jest.fn();
      mockUseCalculatorStore.mockReturnValue({
        inputs: { weight: 80 },
        setInput: mockSetInput,
        measurementSystem: "metric",
      });
      mockUsePremiumStore.mockReturnValue({
        pro: false,
        purchasePro: jest.fn(),
      });

      const { getByAccessibilityHint } = renderWithNavigation(
        <MeasurementInput {...defaultProps} />
      );
      const input = getByAccessibilityHint("Enter weight");

      // First enter a whole number
      act(() => {
        fireEvent.changeText(input, "80");
      });
      expect(mockSetInput).toHaveBeenCalledWith("weight", 80);

      // Try to add decimal
      act(() => {
        fireEvent.changeText(input, "80.5");
      });

      // Verify that the decimal value was not set
      expect(mockSetInput).not.toHaveBeenCalledWith("weight", 80.5);
    });
  });

  it("displays error message when provided", () => {
    const { getByText } = renderWithNavigation(
      <MeasurementInput {...defaultProps} error="Invalid input" />
    );
    expect(getByText("Invalid input")).toBeTruthy();
  });

  it("rejects invalid input", () => {
    const mockSetInput = jest.fn();
    mockUseCalculatorStore.mockReturnValue({
      inputs: {},
      setInput: mockSetInput,
      measurementSystem: "metric",
    });

    const { getByAccessibilityHint } = renderWithNavigation(<MeasurementInput {...defaultProps} />);
    const input = getByAccessibilityHint("Enter weight");

    act(() => {
      fireEvent.changeText(input, "abc");
    });

    expect(mockSetInput).not.toHaveBeenCalled();
  });
});
