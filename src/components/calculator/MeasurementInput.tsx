import React, { useState, useEffect, forwardRef, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  TextInput,
  ReturnKeyType,
  Platform,
  Keyboard,
} from "react-native";
import { Text, Button, Icon } from "@rneui/themed";
import { useCalculatorStore } from "../../store/calculatorStore";
import { usePremiumStore } from "../../store/premiumStore";
import { COLORS } from "../../constants/theme";
import { CalculatorInputs } from "../../types/calculator";
import { getUnitLabel } from "../../constants/formulas";
import { convertMeasurement } from "../../utils/conversions";
import { MeasurementIcon } from "./FormulaSelector";
import { usePurchase } from "../../hooks/usePurchase";

interface MeasurementInputProps {
  field: {
    key: keyof CalculatorInputs;
    label: string;
    unit: string;
  };
  error: string;
  onSubmitEditing?: () => void;
  returnKeyType?: ReturnKeyType;
  isLastInput?: boolean;
  onFocusChange?: (focused: boolean) => void;
}

export const MeasurementInput = forwardRef<TextInput, MeasurementInputProps>(
  ({ field, error, onSubmitEditing, isLastInput, onFocusChange }, ref) => {
    const { inputs, setInput, measurementSystem } = useCalculatorStore();
    const { pro, purchasePro } = usePremiumStore();
    const [rawValue, setRawValue] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [showProModal, setShowProModal] = useState(false);
    const inputRef = useRef<TextInput>(null);
    const { handlePurchase } = usePurchase({
      successMessage:
        "Thank you for upgrading! You now have access to decimal precision and all the PRO Formulas!",
      onSuccess: () => setShowProModal(false),
      onCancel: () => setShowProModal(false),
      onError: () => setShowProModal(false),
    });

    // Forward the ref
    useEffect(() => {
      if (typeof ref === "function") {
        ref(inputRef.current);
      } else if (ref) {
        ref.current = inputRef.current;
      }
    }, [ref]);

    const handleSubmitEditing = () => {
      if (isLastInput) {
        // Add a small delay to ensure smooth keyboard dismissal
        setTimeout(() => {
          Keyboard.dismiss();
        }, 100);
      }
      onSubmitEditing?.();
    };

    // Sync with store and handle measurement system change
    useEffect(() => {
      const storeValue = inputs[field.key];

      // Handle null/undefined values
      if (storeValue === null || storeValue === undefined) {
        setRawValue("");
        setIsEditing(false);
        return;
      }

      // Only update if we're not currently editing
      if (!isEditing) {
        if (measurementSystem === "imperial" && field.unit !== "years") {
          const imperialValue = convertMeasurement(
            storeValue as number,
            field.unit,
            getUnitLabel(field.unit, "imperial"),
            field.key as "height" | "weight" | "circumference" | "skinfold"
          );
          setRawValue(Number(Number(imperialValue).toFixed(2)).toString());
        } else {
          setRawValue(Number(Number(storeValue).toFixed(2)).toString());
        }
      }
    }, [measurementSystem, inputs[field.key], isEditing, field.key, field.unit]);

    const handleChangeText = (value: string) => {
      setIsEditing(true);

      // Handle empty input
      if (value === "") {
        setRawValue("");
        setInput(field.key, null);
        return;
      }

      // Check for decimal point
      if (value.includes(".") && !pro) {
        setShowProModal(true);
        return;
      }

      // Only allow digits and a single decimal point
      if (!value.match(/^\d*\.?\d*$/)) {
        return;
      }

      // Update display value immediately
      setRawValue(value);

      // Special case for single decimal point
      if (value === ".") {
        setInput(field.key, 0);
        return;
      }

      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        if (measurementSystem === "imperial" && field.unit !== "years") {
          // Convert from imperial to metric for storage
          const metricValue = convertMeasurement(
            numValue,
            getUnitLabel(field.unit, "imperial"),
            field.unit,
            field.key as "height" | "weight" | "circumference" | "skinfold"
          );
          setInput(field.key, metricValue);
        } else {
          // Store metric values as-is
          setInput(field.key, numValue);
        }
      }
    };

    const handleFocus = () => {
      setIsEditing(true);
      onFocusChange?.(true);
    };

    const handleBlur = () => {
      setIsEditing(false);
      onFocusChange?.(false);
    };

    const handleUpgrade = () => {
      setShowProModal(false);
      handlePurchase();
    };

    const getIconType = (key: keyof CalculatorInputs) => {
      if (key.includes("Skinfold")) return "skinfold";
      if (key.includes("Circumference")) return "circumference";
      if (key === "weight") return "weight";
      if (key === "height") return "height";
      if (key === "age") return "age";
      return "weight";
    };

    return (
      <>
        <View style={styles.container}>
          <Text style={styles.label}>{field.label}</Text>
          <View style={[styles.inputContainer, error && styles.inputError]}>
            <View style={styles.iconContainer}>
              <MeasurementIcon type={getIconType(field.key)} size={18} color={COLORS.textDark} />
            </View>
            <TextInput
              ref={inputRef}
              style={styles.input}
              value={rawValue}
              onChangeText={handleChangeText}
              onFocus={handleFocus}
              onBlur={handleBlur}
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

        <Modal
          visible={showProModal}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setShowProModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Icon name="lock" type="feather" color={COLORS.primary} size={48} />
              <Text style={styles.modalTitle}>Unlock Decimal Precision</Text>
              <Text style={styles.modalDescription}>
                Upgrade to PRO to access decimal precision and get more accurate body fat
                calculations:
                {"\n\n"}• Decimal precision for all measurements
                {"\n"}• Advanced calculation formulas
                {"\n"}• Skinfold measurement methods
                {"\n"}• More accurate results
                {"\n"}• Family Sharing enabled
              </Text>
              <Button
                title="Upgrade to PRO"
                buttonStyle={styles.upgradeButton}
                onPress={handleUpgrade}
              />
              <Button
                title="Maybe Later"
                type="clear"
                titleStyle={styles.cancelButtonText}
                onPress={() => setShowProModal(false)}
              />
            </View>
          </View>
        </Modal>
      </>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    color: COLORS.text,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: 12,
    gap: 8,
  },
  iconContainer: {
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  input: {
    flex: 1,
    height: 40,
    color: COLORS.textDark,
  },
  inputError: {
    borderColor: "red",
    borderWidth: 1,
  },
  unit: {
    color: COLORS.textDark,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    width: "100%",
    maxWidth: 320,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.textDark,
    marginTop: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  modalDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },
  upgradeButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingHorizontal: 32,
    paddingVertical: 12,
    marginBottom: 8,
  },
  cancelButtonText: {
    color: "#666",
  },
});
