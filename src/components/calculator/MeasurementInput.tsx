import React, { useState, useEffect, forwardRef, useRef, useCallback, useMemo } from "react";
import { View, TextInput, Keyboard } from "react-native";
import { Text } from "@rneui/themed";
import { useCalculatorStore } from "../../store/calculatorStore";
import { usePremiumStore } from "../../store/premiumStore";
import { CalculatorInputs } from "../../types/calculator";
import { MeasurementIcon } from "./FormulaSelector";
import { usePurchase } from "../../hooks/usePurchase";
import { ProUpgradeModal } from "./ProUpgradeModal";
import { styles } from "./MeasurementInput.styles";
import { COLORS } from "../../constants/theme";
import { getDisplayUnit } from "../../utils/units";
import { getIconType, getFieldType } from "../../utils/fields";
import { convertMeasurement } from "../../utils/conversions";

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

    // Sync with store and handle display conversion
    useEffect(() => {
      const storeValue = inputs[field as keyof CalculatorInputs];
      if (storeValue === null || storeValue === undefined) {
        setRawValue("");
        setIsEditing(false);
        return;
      }

      if (!isEditing) {
        // Convert the stored metric value to display value
        const displayValue =
          measurementSystem === "imperial" && typeof storeValue === "number"
            ? convertMeasurement(storeValue, getFieldType(field), "metric", "imperial")
            : storeValue;

        setRawValue(
          typeof displayValue === "number"
            ? pro
              ? displayValue.toFixed(2)
              : Math.round(displayValue).toString()
            : displayValue.toString()
        );
      }
    }, [measurementSystem, inputs[field as keyof CalculatorInputs], isEditing, pro, field]);

    const handleChangeText = useCallback(
      (value: string) => {
        setIsEditing(true);

        if (value === "") {
          setRawValue("");
          setInput(field as keyof CalculatorInputs, null);
          return;
        }

        if (value.includes(".") && !pro) {
          setIsProModalVisible(true);
          return;
        }

        if (!value.match(/^\d*\.?\d*$/)) return;

        setRawValue(value);

        if (value === ".") {
          setInput(field as keyof CalculatorInputs, 0);
          return;
        }

        const numValue = parseFloat(value);
        if (!isNaN(numValue)) {
          const fieldType = getFieldType(field);
          // Convert from display system to metric for storage
          const metricValue =
            fieldType === "none"
              ? numValue
              : measurementSystem === "imperial"
                ? convertMeasurement(numValue, fieldType, "imperial", "metric")
                : numValue;

          setInput(
            field as keyof CalculatorInputs,
            pro ? Number(metricValue.toFixed(2)) : Math.round(metricValue)
          );
        }
      },
      [pro, field, setInput, measurementSystem]
    );

    const iconType = useMemo(() => getIconType(field), [field]);
    const displayUnit = useMemo(
      () => getDisplayUnit(unit, measurementSystem),
      [unit, measurementSystem]
    );

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
            <Text style={styles.unit}>{displayUnit}</Text>
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
