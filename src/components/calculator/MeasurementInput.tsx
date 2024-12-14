import React, { useState, useEffect, forwardRef, useRef, useCallback, useMemo } from "react";
import { View, TextInput, Keyboard } from "react-native";
import { Text } from "@rneui/themed";
import { useCalculatorStore } from "../../store/calculatorStore";
import { usePremiumStore } from "../../store/premiumStore";
import { CalculatorInputs } from "../../types/calculator";
import { convertMeasurement } from "../../utils/conversions";
import { MeasurementIcon } from "./FormulaSelector";
import { usePurchase } from "../../hooks/usePurchase";
import { ProUpgradeModal } from "./ProUpgradeModal";
import { styles } from "./MeasurementInput.styles";
import { COLORS } from "../../constants/theme";

interface MeasurementInputProps {
  field: string;
  label: string;
  unit: string;
  error: string;
  onSubmitEditing?: () => void;
  isLastInput?: boolean;
  onFocusChange?: (focused: boolean) => void;
}

export const MeasurementInput = forwardRef<TextInput, MeasurementInputProps>(
  ({ field, label, unit, error, onSubmitEditing, isLastInput, onFocusChange }, ref) => {
    const { inputs, setInput, measurementSystem } = useCalculatorStore();
    const { pro } = usePremiumStore();
    const [rawValue, setRawValue] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [isProModalVisible, setIsProModalVisible] = useState(false);
    const inputRef = useRef<TextInput>(null);

    const { handlePurchase, isProcessing } = usePurchase({
      successMessage:
        "Thank you for upgrading! You now have access to decimal precision and all the PRO Formulas!",
      onSuccess: () => setIsProModalVisible(false),
      onCancel: () => setIsProModalVisible(false),
      onError: () => setIsProModalVisible(false),
    });

    // Forward the ref
    useEffect(() => {
      if (typeof ref === "function") ref(inputRef.current);
      else if (ref) ref.current = inputRef.current;
    }, [ref]);

    const handleSubmitEditing = useCallback(() => {
      if (isLastInput) {
        setTimeout(() => Keyboard.dismiss(), 100);
      }
      onSubmitEditing?.();
    }, [isLastInput, onSubmitEditing]);

    const convertValue = useCallback(
      (value: number) => {
        if (measurementSystem === "imperial" && unit !== "years") {
          const convertedValue = convertMeasurement(
            value,
            unit,
            unit === "cm" ? "in" : unit === "kg" ? "lbs" : unit === "mm" ? "in" : unit,
            unit === "cm" || unit === "mm" ? "length" : unit === "kg" ? "weight" : "skinfold"
          );
          return pro ? convertedValue : Math.round(convertedValue);
        }
        return pro ? value : Math.round(value);
      },
      [measurementSystem, unit, pro]
    );

    // Sync with store and handle measurement system change
    useEffect(() => {
      const storeValue = inputs[field];
      if (storeValue === null || storeValue === undefined) {
        setRawValue("");
        setIsEditing(false);
        return;
      }

      if (!isEditing) {
        const convertedValue = convertValue(storeValue as number);
        setRawValue(Number(Number(convertedValue).toFixed(2)).toString());
      }
    }, [measurementSystem, inputs[field], isEditing, convertValue]);

    const handleChangeText = useCallback(
      (value: string) => {
        setIsEditing(true);

        if (value === "") {
          setRawValue("");
          setInput(field, null);
          return;
        }

        if (value.includes(".") && !pro) {
          setIsProModalVisible(true);
          return;
        }

        if (!value.match(/^\d*\.?\d*$/)) return;

        setRawValue(value);

        if (value === ".") {
          setInput(field, 0);
          return;
        }

        const numValue = parseFloat(value);
        if (!isNaN(numValue)) {
          const convertedValue =
            measurementSystem === "imperial" && unit !== "years"
              ? convertMeasurement(
                  numValue,
                  unit === "cm" ? "in" : unit === "kg" ? "lbs" : unit === "mm" ? "in" : unit,
                  unit,
                  unit === "cm" || unit === "mm" ? "length" : unit === "kg" ? "weight" : "skinfold"
                )
              : numValue;

          const finalValue = pro ? convertedValue : Math.round(convertedValue);
          setInput(field, finalValue);
        }
      },
      [pro, measurementSystem, field, unit, setInput]
    );

    const iconType = useMemo(() => {
      if (!field) return "weight";

      const fieldLower = field.toLowerCase();
      if (fieldLower.includes("skinfold")) return "skinfold";
      if (
        fieldLower.includes("circumference") ||
        ["neck", "waist", "hips", "chest", "thigh", "calf", "forearm", "wrist"].includes(fieldLower)
      )
        return "length";
      if (fieldLower === "weight") return "weight";
      if (fieldLower === "height") return "height";
      if (fieldLower === "age") return "age";
      return "weight";
    }, [field]);

    return (
      <>
        <View style={styles.container}>
          <Text style={styles.label}>{label}</Text>
          <View style={[styles.inputContainer, error && styles.inputError]}>
            <View style={styles.iconContainer}>
              <MeasurementIcon type={iconType} size={18} color={COLORS.textDark} />
            </View>
            <TextInput
              ref={inputRef}
              style={styles.input}
              value={rawValue}
              onChangeText={handleChangeText}
              onFocus={() => {
                setIsEditing(true);
                onFocusChange?.(true);
              }}
              onBlur={() => {
                setIsEditing(false);
                onFocusChange?.(false);
              }}
              keyboardType="decimal-pad"
              enablesReturnKeyAutomatically={false}
              placeholderTextColor="#999"
              accessibilityLabel={label}
              accessibilityHint={`Enter ${label.toLowerCase()}`}
              accessibilityRole="spinbutton"
              onSubmitEditing={handleSubmitEditing}
            />
            <Text style={styles.unit}>
              {measurementSystem === "imperial"
                ? unit === "cm"
                  ? "in"
                  : unit === "kg"
                    ? "lbs"
                    : unit === "mm"
                      ? "in"
                      : unit
                : unit}
            </Text>
          </View>
          {error && <Text style={styles.error}>{error}</Text>}
        </View>

        <ProUpgradeModal
          visible={isProModalVisible}
          isProcessing={isProcessing}
          onUpgrade={handlePurchase}
          onClose={() => setIsProModalVisible(false)}
        />
      </>
    );
  }
);
