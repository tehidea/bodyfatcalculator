import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import { Input } from "../common/Input";
import { useCalculatorStore } from "../../store/calculatorStore";
import { CalculatorInputs } from "../../types/calculator";
import { getUnitLabel } from "../../constants/formulas";

interface Props {
  field: {
    key: keyof CalculatorInputs;
    label: string;
    unit: string;
    required: boolean;
  };
  error?: string;
}

export const MeasurementInput: React.FC<Props> = ({ field, error }) => {
  const { inputs, setInput, measurementSystem } = useCalculatorStore();

  const handleChange = useCallback(
    (text: string) => {
      if (text === "") {
        setInput(field.key, undefined);
        return;
      }

      if (text.match(/^\d*\.?\d*$/)) {
        const numValue = parseFloat(text);

        setInput(field.key, numValue);
      }
    },
    [setInput, field.key]
  );

  const displayUnit = getUnitLabel(field.unit, measurementSystem);

  return (
    <Input
      label={field.label}
      value={inputs[field.key]?.toString() ?? ""}
      onChangeText={handleChange}
      unit={displayUnit}
      error={error}
      keyboardType="decimal-pad"
      placeholder={`Enter ${field.label.toLowerCase()}`}
      style={styles.input}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 16,
  },
});
