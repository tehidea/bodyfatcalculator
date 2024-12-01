import React, { forwardRef, useState, useEffect } from "react";
import { Input, InputRef } from "../common/Input";
import { useCalculatorStore } from "../../store/calculatorStore";
import { CalculatorInputs } from "../../types/calculator";
import { ReturnKeyTypeOptions } from "react-native";
import { getUnitLabel } from "../../constants/formulas";
import { convertMeasurement } from "../../utils/conversions";
import { isCircumferenceMeasurement, isSkinfoldMeasurement } from "../../utils/typeGuards";

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
    const { inputs, setInput, measurementSystem } = useCalculatorStore();
    const [rawValue, setRawValue] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    // Get measurement type for conversion
    const getMeasurementType = () => {
      if (isCircumferenceMeasurement(field.key)) return "circumference";
      if (isSkinfoldMeasurement(field.key)) return "skinfold";
      if (field.key === "weight") return "weight";
      if (field.key === "height") return "height";
      return null;
    };

    // Sync with store and handle reset or measurement system change
    useEffect(() => {
      const storeValue = inputs[field.key];
      if (storeValue === undefined || storeValue === null) {
        setRawValue("");
        setIsEditing(false); // Force editing to false on reset
      } else if (!isEditing) {
        setRawValue(storeValue.toString());
      }
    }, [inputs, field.key, isEditing, measurementSystem]);

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

      // Convert the value if needed
      const numValue = parseFloat(rawValue);
      if (!isNaN(numValue)) {
        const measurementType = getMeasurementType();
        if (measurementType) {
          const convertedValue = convertMeasurement(
            numValue,
            field.unit,
            getUnitLabel(field.unit, measurementSystem),
            measurementType
          );
          setRawValue(convertedValue.toString());
          setInput(field.key, convertedValue);
        }
      }
    };

    return (
      <Input
        ref={ref}
        label={field.label}
        unit={getUnitLabel(field.unit, measurementSystem)}
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
