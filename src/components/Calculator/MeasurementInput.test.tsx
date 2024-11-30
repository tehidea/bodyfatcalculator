import React from "react";
import { ReturnKeyTypeOptions } from "react-native";
import { render, fireEvent, act } from "@testing-library/react-native";
import { MeasurementInput } from "./MeasurementInput";
import { useCalculatorStore } from "../../store/calculatorStore";

// Mock the store
jest.mock("../../store/calculatorStore", () => ({
  useCalculatorStore: jest.fn(),
}));

describe("MeasurementInput", () => {
  const mockSetInput = jest.fn();

  beforeEach(() => {
    (useCalculatorStore as jest.Mock).mockReturnValue({
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

  it("displays raw input value while typing decimal numbers", () => {
    const { getByAccessibilityHint } = render(<MeasurementInput {...defaultProps} />);
    const input = getByAccessibilityHint("Enter weight");

    // Type "80."
    act(() => {
      fireEvent.changeText(input, "80.");
    });

    // Check that the raw value "80." is displayed
    expect(input.props.value).toBe("80.");

    // Complete the decimal number
    act(() => {
      fireEvent.changeText(input, "80.5");
    });

    // Check both the display and the stored value
    expect(input.props.value).toBe("80.5");
    expect(mockSetInput).toHaveBeenCalledWith("weight", 80.5);
  });
});
