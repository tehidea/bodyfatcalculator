import React, { forwardRef, useState } from "react";
import { Input, InputRef } from "../common/Input";
import { useCalculatorStore } from "../../store/calculatorStore";
import { CalculatorInputs } from "../../types/calculator";
import { ReturnKeyTypeOptions } from "react-native";

interface MeasurementInputProps {
  field: {
    key: keyof CalculatorInputs;
    label: string;
    unit: string;
  };
  error: string;
  returnKeyType: ReturnKeyTypeOptions;
  onSubmitEditing: () => void;
}

export const MeasurementInput = forwardRef<InputRef, MeasurementInputProps>(
  ({ field, error, returnKeyType, onSubmitEditing, ...props }, ref) => {
    const { inputs, setInput } = useCalculatorStore();
    const [rawValue, setRawValue] = useState("");

    const handleChangeText = (value: string) => {
      // Handle empty input
      if (value === "") {
        setRawValue("");
        setInput(field.key, null);
        return;
      }

      // Only allow digits and a single decimal point
      if (!value.match(/^\d*\.?\d*$/)) {
        return;
      }

      setRawValue(value);

      // Special case for single decimal point
      if (value === ".") {
        setInput(field.key, 0);
        return;
      }

      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        setInput(field.key, numValue);
      }
    };

    return (
      <Input
        ref={ref}
        label={field.label}
        unit={field.unit}
        value={rawValue || inputs[field.key]?.toString() || ""}
        onChangeText={handleChangeText}
        error={error}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        {...props}
      />
    );
  }
);
