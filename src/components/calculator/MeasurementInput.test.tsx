import React from "react";
import { fireEvent } from "@testing-library/react-native";
import { MeasurementInput } from "./MeasurementInput";
import { act } from "react-test-renderer";
import { renderWithNavigation } from "../../test-utils";
import { useCalculatorStore } from "../../store/calculatorStore";
import { usePremiumStore } from "../../store/premiumStore";

// Mock the stores
jest.mock("../../store/calculatorStore", () => ({
  useCalculatorStore: jest.fn(),
}));

jest.mock("../../store/premiumStore", () => ({
  usePremiumStore: jest.fn(),
}));

const mockUseCalculatorStore = useCalculatorStore as jest.MockedFunction<typeof useCalculatorStore>;
const mockUsePremiumStore = usePremiumStore as jest.MockedFunction<typeof usePremiumStore>;

const defaultProps = {
  field: {
    key: "weight" as const,
    label: "Weight",
    unit: "kg",
  },
  error: "",
  returnKeyType: "next" as const,
  onSubmitEditing: jest.fn(),
};

describe("MeasurementInput", () => {
  beforeEach(() => {
    mockUseCalculatorStore.mockReturnValue({
      inputs: {},
      setInput: jest.fn(),
      measurementSystem: "metric",
    });
    mockUsePremiumStore.mockReturnValue({
      pro: true,
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

  it("handles decimal input", () => {
    const mockSetInput = jest.fn();
    mockUseCalculatorStore.mockReturnValue({
      inputs: {},
      setInput: mockSetInput,
      measurementSystem: "metric",
    });

    const { getByAccessibilityHint } = renderWithNavigation(<MeasurementInput {...defaultProps} />);
    const input = getByAccessibilityHint("Enter weight");

    act(() => {
      fireEvent.changeText(input, "80.5");
    });

    expect(mockSetInput).toHaveBeenCalledWith("weight", 80.5);
  });

  it("handles starting with decimal point", () => {
    const mockSetInput = jest.fn();
    mockUseCalculatorStore.mockReturnValue({
      inputs: {},
      setInput: mockSetInput,
      measurementSystem: "metric",
    });

    const { getByAccessibilityHint } = renderWithNavigation(<MeasurementInput {...defaultProps} />);
    const input = getByAccessibilityHint("Enter weight");

    act(() => {
      fireEvent.changeText(input, ".5");
    });

    expect(mockSetInput).toHaveBeenCalledWith("weight", 0.5);
  });

  it("handles empty input", () => {
    const mockSetInput = jest.fn();
    mockUseCalculatorStore.mockReturnValue({
      inputs: {},
      setInput: mockSetInput,
      measurementSystem: "metric",
    });

    const { getByAccessibilityHint } = renderWithNavigation(<MeasurementInput {...defaultProps} />);
    const input = getByAccessibilityHint("Enter weight");

    act(() => {
      fireEvent.changeText(input, "");
    });

    expect(mockSetInput).toHaveBeenCalledWith("weight", null);
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

  it("handles intermediate decimal input", () => {
    const mockSetInput = jest.fn();
    mockUseCalculatorStore.mockReturnValue({
      inputs: {},
      setInput: mockSetInput,
      measurementSystem: "metric",
    });

    const { getByAccessibilityHint } = renderWithNavigation(<MeasurementInput {...defaultProps} />);
    const input = getByAccessibilityHint("Enter weight");

    act(() => {
      fireEvent.changeText(input, "80.");
    });

    expect(mockSetInput).toHaveBeenCalledWith("weight", 80);
  });

  describe("decimal point handling", () => {
    it("handles single decimal point", () => {
      const mockSetInput = jest.fn();
      mockUseCalculatorStore.mockReturnValue({
        inputs: {},
        setInput: mockSetInput,
        measurementSystem: "metric",
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

    it("handles decimal numbers correctly", () => {
      const mockSetInput = jest.fn();
      mockUseCalculatorStore.mockReturnValue({
        inputs: {},
        setInput: mockSetInput,
        measurementSystem: "metric",
      });

      const { getByAccessibilityHint } = renderWithNavigation(
        <MeasurementInput {...defaultProps} />
      );
      const input = getByAccessibilityHint("Enter weight");

      act(() => {
        fireEvent.changeText(input, "80.55");
      });

      expect(mockSetInput).toHaveBeenCalledWith("weight", 80.55);
    });

    it("handles typing decimal numbers in sequence", () => {
      const mockSetInput = jest.fn();
      mockUseCalculatorStore.mockReturnValue({
        inputs: {},
        setInput: mockSetInput,
        measurementSystem: "metric",
      });

      const { getByAccessibilityHint } = renderWithNavigation(
        <MeasurementInput {...defaultProps} />
      );
      const input = getByAccessibilityHint("Enter weight");

      act(() => {
        fireEvent.changeText(input, "8");
        fireEvent.changeText(input, "80");
        fireEvent.changeText(input, "80.");
        fireEvent.changeText(input, "80.5");
      });

      expect(mockSetInput).toHaveBeenCalledWith("weight", 80.5);
    });

    it("handles starting with decimal point", () => {
      const mockSetInput = jest.fn();
      mockUseCalculatorStore.mockReturnValue({
        inputs: {},
        setInput: mockSetInput,
        measurementSystem: "metric",
      });

      const { getByAccessibilityHint } = renderWithNavigation(
        <MeasurementInput {...defaultProps} />
      );
      const input = getByAccessibilityHint("Enter weight");

      act(() => {
        fireEvent.changeText(input, ".");
        fireEvent.changeText(input, ".5");
      });

      expect(mockSetInput).toHaveBeenCalledWith("weight", 0.5);
    });
  });

  describe("reset handling", () => {
    it("clears input when store value becomes null", () => {
      mockUseCalculatorStore.mockReturnValue({
        inputs: { weight: 80 },
        setInput: jest.fn(),
        measurementSystem: "metric",
      });

      const { getByAccessibilityHint, rerender } = renderWithNavigation(
        <MeasurementInput {...defaultProps} />
      );
      const input = getByAccessibilityHint("Enter weight");
      expect(input.props.value).toBe("80");

      mockUseCalculatorStore.mockReturnValue({
        inputs: { weight: null },
        setInput: jest.fn(),
        measurementSystem: "metric",
      });

      rerender(<MeasurementInput {...defaultProps} />);
      expect(input.props.value).toBe("");
    });

    it("clears input when store value becomes undefined", () => {
      mockUseCalculatorStore.mockReturnValue({
        inputs: { weight: 80 },
        setInput: jest.fn(),
        measurementSystem: "metric",
      });

      const { getByAccessibilityHint, rerender } = renderWithNavigation(
        <MeasurementInput {...defaultProps} />
      );
      const input = getByAccessibilityHint("Enter weight");
      expect(input.props.value).toBe("80");

      mockUseCalculatorStore.mockReturnValue({
        inputs: {},
        setInput: jest.fn(),
        measurementSystem: "metric",
      });

      rerender(<MeasurementInput {...defaultProps} />);
      expect(input.props.value).toBe("");
    });
  });
});
