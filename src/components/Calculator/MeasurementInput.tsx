import React, { forwardRef } from "react";
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

    const handleChangeText = (value: string) => {
      const numValue = value === "" ? null : parseFloat(value);
      setInput(field.key, numValue);
    };

    return (
      <Input
        ref={ref}
        label={field.label}
        unit={field.unit}
        value={inputs[field.key]?.toString() || ""}
        onChangeText={handleChangeText}
        error={error}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        {...props}
      />
    );
  }
);
