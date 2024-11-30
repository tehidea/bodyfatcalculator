import React, { forwardRef, useState, useEffect } from "react";
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
    const [isEditing, setIsEditing] = useState(false);

    // Sync with store and handle reset
    useEffect(() => {
      const storeValue = inputs[field.key];
      if (storeValue === undefined || storeValue === null) {
        setRawValue("");
        setIsEditing(false); // Force editing to false on reset
      } else if (!isEditing) {
        setRawValue(storeValue.toString());
      }
    }, [inputs, field.key, isEditing]);

    const handleChangeText = (value: string) => {
      setIsEditing(true);

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

    const handleBlur = () => {
      setIsEditing(false);
    };

    return (
      <Input
        ref={ref}
        label={field.label}
        unit={field.unit}
        value={rawValue}
        onChangeText={handleChangeText}
        onBlur={handleBlur}
        error={error}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        {...props}
      />
    );
  }
);
