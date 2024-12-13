import React, { useState, useEffect, forwardRef, useRef, useCallback, useMemo } from "react";
import { View, TextInput, Keyboard } from "react-native";
import { Text } from "@rneui/themed";
import { useCalculatorStore } from "../../store/calculatorStore";
import { usePremiumStore } from "../../store/premiumStore";
import { CalculatorInputs } from "../../types/calculator";
import { getUnitLabel } from "../../constants/formulas";
import { convertMeasurement } from "../../utils/conversions";
import { MeasurementIcon } from "./FormulaSelector";
import { usePurchase } from "../../hooks/usePurchase";
import { ProUpgradeModal } from "./ProUpgradeModal";
import { styles } from "./MeasurementInput.styles";
import { COLORS } from "../../constants/theme";

interface MeasurementInputProps {
  field: {
    key: keyof CalculatorInputs;
    label: string;
    unit: string;
  };
  error: string;
  onSubmitEditing?: () => void;
  isLastInput?: boolean;
  onFocusChange?: (focused: boolean) => void;
}

export const MeasurementInput = forwardRef<TextInput, MeasurementInputProps>(
  ({ field, error, onSubmitEditing, isLastInput, onFocusChange }, ref) => {
    const { inputs, setInput, measurementSystem } = useCalculatorStore();
    const { pro } = usePremiumStore();
    const [rawValue, setRawValue] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [showProModal, setShowProModal] = useState(false);
    const inputRef = useRef<TextInput>(null);

    const { handlePurchase, isProcessing } = usePurchase({
      successMessage:
        "Thank you for upgrading! You now have access to decimal precision and all the PRO Formulas!",
      onSuccess: () => setShowProModal(false),
      onCancel: () => setShowProModal(false),
      onError: () => setShowProModal(false),
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
        if (measurementSystem === "imperial" && field.unit !== "years") {
          const convertedValue = convertMeasurement(
            value,
            field.unit,
            getUnitLabel(field.unit, "imperial"),
            field.key as "height" | "weight" | "circumference" | "skinfold"
          );
          return pro ? convertedValue : Math.round(convertedValue);
        }
        return pro ? value : Math.round(value);
      },
      [measurementSystem, field.unit, field.key, pro]
    );

    // Sync with store and handle measurement system change
    useEffect(() => {
      const storeValue = inputs[field.key];
      if (storeValue === null || storeValue === undefined) {
        setRawValue("");
        setIsEditing(false);
        return;
      }

      if (!isEditing) {
        const convertedValue = convertValue(storeValue as number);
        setRawValue(Number(Number(convertedValue).toFixed(2)).toString());
      }
    }, [measurementSystem, inputs[field.key], isEditing, convertValue]);

    const handleChangeText = useCallback(
      (value: string) => {
        setIsEditing(true);

        if (value === "") {
          setRawValue("");
          setInput(field.key, null);
          return;
        }

        if (value.includes(".") && !pro) {
          setShowProModal(true);
          return;
        }

        if (!value.match(/^\d*\.?\d*$/)) return;

        setRawValue(value);

        if (value === ".") {
          setInput(field.key, 0);
          return;
        }

        const numValue = parseFloat(value);
        if (!isNaN(numValue)) {
          const convertedValue =
            measurementSystem === "imperial" && field.unit !== "years"
              ? convertMeasurement(
                  numValue,
                  getUnitLabel(field.unit, "imperial"),
                  field.unit,
                  field.key as "height" | "weight" | "circumference" | "skinfold"
                )
              : numValue;

          const finalValue = pro ? convertedValue : Math.round(convertedValue);
          setInput(field.key, finalValue);
        }
      },
      [pro, measurementSystem, field.key, field.unit, setInput]
    );

    const iconType = useMemo(() => {
      if (field.key.includes("Skinfold")) return "skinfold";
      if (field.key.includes("Circumference")) return "circumference";
      if (field.key === "weight") return "weight";
      if (field.key === "height") return "height";
      if (field.key === "age") return "age";
      return "weight";
    }, [field.key]);

    return (
      <>
        <View style={styles.container}>
          <Text style={styles.label}>{field.label}</Text>
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
              accessibilityLabel={field.label}
              accessibilityHint={`Enter ${field.label.toLowerCase()}`}
              accessibilityRole="spinbutton"
            />
            <Text style={styles.unit}>{getUnitLabel(field.unit, measurementSystem)}</Text>
          </View>
          {error && <Text style={styles.error}>{error}</Text>}
        </View>

        <ProUpgradeModal
          visible={showProModal}
          isProcessing={isProcessing}
          onUpgrade={handlePurchase}
          onClose={() => setShowProModal(false)}
        />
      </>
    );
  }
);
