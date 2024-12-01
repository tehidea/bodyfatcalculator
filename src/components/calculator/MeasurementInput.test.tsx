import React from "react";
import { ReturnKeyTypeOptions } from "react-native";
import { render, fireEvent, act } from "@testing-library/react-native";
import { MeasurementInput } from "./MeasurementInput";
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

describe("MeasurementInput", () => {
  const mockSetInput = jest.fn();

  beforeEach(() => {
    mockUseCalculatorStore.mockReturnValue({
      inputs: {},
      setInput: mockSetInput,
      measurementSystem: "metric",
    });
    mockUsePremiumStore.mockReturnValue({
      pro: true, // Set to true to allow decimal input in tests
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const defaultProps = {
    field: {
      key: "weight" as const,
      label: "Weight",
      unit: "kg",
    },
    error: "",
    returnKeyType: "next" as ReturnKeyTypeOptions,
    onSubmitEditing: () => {},
  };

  it("renders correctly with empty value", () => {
    const { getByAccessibilityHint } = render(<MeasurementInput {...defaultProps} />);
    expect(getByAccessibilityHint("Enter weight")).toBeTruthy();
  });

  it("handles valid number input", () => {
    const { getByAccessibilityHint } = render(<MeasurementInput {...defaultProps} />);
    const input = getByAccessibilityHint("Enter weight");

    act(() => {
      fireEvent.changeText(input, "75");
    });

    expect(mockSetInput).toHaveBeenCalledWith("weight", 75);
  });

  it("handles decimal input", () => {
    const { getByAccessibilityHint } = render(<MeasurementInput {...defaultProps} />);
    const input = getByAccessibilityHint("Enter weight");

    act(() => {
      fireEvent.changeText(input, "75.5");
    });

    expect(mockSetInput).toHaveBeenCalledWith("weight", 75.5);
  });

  it("handles starting with decimal point", () => {
    const { getByAccessibilityHint } = render(<MeasurementInput {...defaultProps} />);
    const input = getByAccessibilityHint("Enter weight");

    act(() => {
      fireEvent.changeText(input, ".");
    });

    expect(mockSetInput).toHaveBeenCalledWith("weight", 0);
  });

  it("handles empty input", () => {
    const { getByAccessibilityHint } = render(<MeasurementInput {...defaultProps} />);
    const input = getByAccessibilityHint("Enter weight");

    act(() => {
      fireEvent.changeText(input, "");
    });

    expect(mockSetInput).toHaveBeenCalledWith("weight", null);
  });

  it("displays error message when provided", () => {
    const { getByText } = render(<MeasurementInput {...defaultProps} error="Invalid input" />);
    expect(getByText("Invalid input")).toBeTruthy();
  });

  it("rejects invalid input", () => {
    const { getByAccessibilityHint } = render(<MeasurementInput {...defaultProps} />);
    const input = getByAccessibilityHint("Enter weight");

    act(() => {
      fireEvent.changeText(input, "abc");
    });

    expect(mockSetInput).not.toHaveBeenCalled();
  });

  it("allows decimal input without immediate validation", () => {
    const { getByAccessibilityHint } = render(<MeasurementInput {...defaultProps} />);
    const input = getByAccessibilityHint("Enter weight");

    act(() => {
      fireEvent.changeText(input, ".5");
    });

    expect(mockSetInput).toHaveBeenCalledWith("weight", 0.5);
  });

  describe("decimal point handling", () => {
    it("handles single decimal point", () => {
      const { getByAccessibilityHint } = render(<MeasurementInput {...defaultProps} />);
      const input = getByAccessibilityHint("Enter weight");

      act(() => {
        fireEvent.changeText(input, ".");
      });

      expect(mockSetInput).toHaveBeenCalledWith("weight", 0);
    });

    it("handles decimal numbers correctly", () => {
      const { getByAccessibilityHint } = render(<MeasurementInput {...defaultProps} />);
      const input = getByAccessibilityHint("Enter weight");

      act(() => {
        fireEvent.changeText(input, "80.5");
      });

      expect(mockSetInput).toHaveBeenCalledWith("weight", 80.5);
    });

    it("handles typing decimal numbers in sequence", () => {
      const { getByAccessibilityHint } = render(<MeasurementInput {...defaultProps} />);
      const input = getByAccessibilityHint("Enter weight");

      act(() => {
        fireEvent.changeText(input, "80");
      });

      expect(mockSetInput).toHaveBeenCalledWith("weight", 80);

      act(() => {
        fireEvent.changeText(input, "80.5");
      });

      expect(mockSetInput).toHaveBeenCalledWith("weight", 80.5);
    });

    it("handles starting with decimal point", () => {
      const { getByAccessibilityHint } = render(<MeasurementInput {...defaultProps} />);
      const input = getByAccessibilityHint("Enter weight");

      act(() => {
        fireEvent.changeText(input, ".");
      });

      expect(mockSetInput).toHaveBeenCalledWith("weight", 0);

      act(() => {
        fireEvent.changeText(input, ".5");
      });

      expect(mockSetInput).toHaveBeenCalledWith("weight", 0.5);
    });
  });

  describe("reset handling", () => {
    it("clears input when store value becomes null", () => {
      mockUseCalculatorStore.mockReturnValue({
        inputs: { weight: 80 },
        setInput: mockSetInput,
        measurementSystem: "metric",
      });

      const { getByAccessibilityHint, rerender } = render(<MeasurementInput {...defaultProps} />);
      const input = getByAccessibilityHint("Enter weight");
      expect(input.props.value).toBe("80");

      mockUseCalculatorStore.mockReturnValue({
        inputs: { weight: null },
        setInput: mockSetInput,
        measurementSystem: "metric",
      });

      rerender(<MeasurementInput {...defaultProps} />);
      expect(input.props.value).toBe("");
    });

    it("clears input when store value becomes undefined", () => {
      mockUseCalculatorStore.mockReturnValue({
        inputs: { weight: 80 },
        setInput: mockSetInput,
        measurementSystem: "metric",
      });

      const { getByAccessibilityHint, rerender } = render(<MeasurementInput {...defaultProps} />);
      const input = getByAccessibilityHint("Enter weight");
      expect(input.props.value).toBe("80");

      mockUseCalculatorStore.mockReturnValue({
        inputs: {},
        setInput: mockSetInput,
        measurementSystem: "metric",
      });

      rerender(<MeasurementInput {...defaultProps} />);
      expect(input.props.value).toBe("");
    });
  });
});
