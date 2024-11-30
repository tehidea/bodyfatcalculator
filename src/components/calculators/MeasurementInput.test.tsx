import React from "react";
import { ReturnKeyTypeOptions } from "react-native";
import { render, fireEvent, act } from "@testing-library/react-native";
import { MeasurementInput } from "./MeasurementInput";
import { useCalculatorStore } from "../../store/calculatorStore";

// Mock the store
jest.mock("../../store/calculatorStore", () => ({
  useCalculatorStore: jest.fn(),
}));

const mockUseCalculatorStore = useCalculatorStore as jest.MockedFunction<typeof useCalculatorStore>;

describe("MeasurementInput", () => {
  const mockSetInput = jest.fn();

  beforeEach(() => {
    mockUseCalculatorStore.mockReturnValue({
      inputs: {},
      setInput: mockSetInput,
      measurementSystem: "metric",
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
    const { getByText } = render(<MeasurementInput {...defaultProps} error="Invalid weight" />);
    expect(getByText("Invalid weight")).toBeTruthy();
  });

  it("rejects invalid input", () => {
    const { getByAccessibilityHint } = render(<MeasurementInput {...defaultProps} />);
    const input = getByAccessibilityHint("Enter weight");

    act(() => {
      fireEvent.changeText(input, "abc");
    });

    expect(mockSetInput).not.toHaveBeenCalled();
  });

  it("allows input outside valid range before calculation", () => {
    const { getByAccessibilityHint } = render(<MeasurementInput {...defaultProps} />);
    const input = getByAccessibilityHint("Enter weight");

    act(() => {
      fireEvent.changeText(input, "500"); // Value outside valid range (20-300)
    });

    expect(mockSetInput).toHaveBeenCalledWith("weight", 500);
  });

  it("allows decimal input without immediate validation", () => {
    const { getByAccessibilityHint } = render(<MeasurementInput {...defaultProps} />);
    const input = getByAccessibilityHint("Enter weight");

    act(() => {
      fireEvent.changeText(input, "0.5"); // Value below minimum (20)
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

      // Type "80" first
      act(() => {
        fireEvent.changeText(input, "80");
      });
      expect(mockSetInput).toHaveBeenCalledWith("weight", 80);

      // Add decimal point
      act(() => {
        fireEvent.changeText(input, "80.");
      });
      expect(mockSetInput).toHaveBeenCalledWith("weight", 80);

      // Complete the decimal number
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

  it("displays raw input value while typing decimal numbers", async () => {
    mockUseCalculatorStore.mockReturnValue({
      inputs: {},
      setInput: mockSetInput,
      measurementSystem: "metric",
    });

    const { getByAccessibilityHint, rerender } = render(<MeasurementInput {...defaultProps} />);
    const input = getByAccessibilityHint("Enter weight");

    // Type "80" first
    await act(async () => {
      fireEvent.changeText(input, "80");
      // Update store to simulate the state change
      mockUseCalculatorStore.mockReturnValue({
        inputs: { weight: 80 },
        setInput: mockSetInput,
        measurementSystem: "metric",
      });
      rerender(<MeasurementInput {...defaultProps} />);
    });
    expect(input.props.value).toBe("80");

    // Add decimal point
    await act(async () => {
      fireEvent.changeText(input, "80.");
      // Update store to simulate the state change
      mockUseCalculatorStore.mockReturnValue({
        inputs: { weight: 80 },
        setInput: mockSetInput,
        measurementSystem: "metric",
      });
      rerender(<MeasurementInput {...defaultProps} />);
    });
    expect(input.props.value).toBe("80.");

    // Complete the decimal number
    await act(async () => {
      fireEvent.changeText(input, "80.5");
      // Update store to simulate the state change
      mockUseCalculatorStore.mockReturnValue({
        inputs: { weight: 80.5 },
        setInput: mockSetInput,
        measurementSystem: "metric",
      });
      rerender(<MeasurementInput {...defaultProps} />);
    });

    // Check both the display and the stored value
    expect(input.props.value).toBe("80.5");
    expect(mockSetInput).toHaveBeenCalledWith("weight", 80.5);
  });

  describe("reset handling", () => {
    it("clears input when store value becomes null", async () => {
      mockUseCalculatorStore.mockReturnValue({
        inputs: { weight: 80.5 },
        setInput: mockSetInput,
        measurementSystem: "metric",
      });

      const { getByAccessibilityHint, rerender } = render(<MeasurementInput {...defaultProps} />);
      const input = getByAccessibilityHint("Enter weight");

      // First set a value
      await act(async () => {
        fireEvent.changeText(input, "80.5");
      });
      expect(input.props.value).toBe("80.5");

      // Simulate store reset
      await act(async () => {
        mockUseCalculatorStore.mockReturnValue({
          inputs: { weight: null },
          setInput: mockSetInput,
          measurementSystem: "metric",
        });
        rerender(<MeasurementInput {...defaultProps} />);
      });

      // Input should be cleared
      expect(input.props.value).toBe("");
    });

    it("clears input when store value becomes undefined", async () => {
      mockUseCalculatorStore.mockReturnValue({
        inputs: { weight: 80.5 },
        setInput: mockSetInput,
        measurementSystem: "metric",
      });

      const { getByAccessibilityHint, rerender } = render(<MeasurementInput {...defaultProps} />);
      const input = getByAccessibilityHint("Enter weight");

      // First set a value
      await act(async () => {
        fireEvent.changeText(input, "80.5");
      });
      expect(input.props.value).toBe("80.5");

      // Simulate store reset
      await act(async () => {
        mockUseCalculatorStore.mockReturnValue({
          inputs: {},
          setInput: mockSetInput,
          measurementSystem: "metric",
        });
        rerender(<MeasurementInput {...defaultProps} />);
      });

      // Input should be cleared
      expect(input.props.value).toBe("");
    });
  });
});
