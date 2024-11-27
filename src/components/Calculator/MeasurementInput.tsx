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
  const { inputs, setInput, measurementSystem, setResults } = useCalculatorStore();

  const handleChange = useCallback(
    (text: string) => {
      if (text === "") {
        setInput(field.key, null);
        setResults(null);
        return;
      }

      if (text.match(/^-?\d*\.?\d*$/) || text === ".") {
        let numValue: number | null = null;
        
        if (text === ".") {
          numValue = 0;
        } else if (text.match(/^-?\d*\.?\d*$/)) {
          numValue = parseFloat(text);
          if (isNaN(numValue) && text.endsWith(".")) {
            numValue = parseFloat(text.slice(0, -1));
          }
        }

        setInput(field.key, numValue);
        setResults(null);
      }
    },
    [setInput, setResults, field.key]
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
