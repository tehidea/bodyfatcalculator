import React, { forwardRef, useState, useEffect } from "react";
import { Modal, View, StyleSheet } from "react-native";
import { Input, InputRef } from "../common/Input";
import { Text, Button, Icon } from "@rneui/themed";
import { useCalculatorStore } from "../../store/calculatorStore";
import { usePremiumStore } from "../../store/premiumStore";
import { CalculatorInputs } from "../../types/calculator";
import { ReturnKeyTypeOptions } from "react-native";
import { getUnitLabel } from "../../constants/formulas";
import { convertMeasurement } from "../../utils/conversions";
import { isCircumferenceMeasurement, isSkinfoldMeasurement } from "../../utils/typeGuards";
import { COLORS } from "../../constants/theme";
import { useNavigation } from "@react-navigation/native";

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
    const { pro } = usePremiumStore();
    const [rawValue, setRawValue] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [showProModal, setShowProModal] = useState(false);
    const navigation = useNavigation();

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

      // Check for decimal point
      if (value.includes(".") && !pro) {
        setShowProModal(true);
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

    const handleUpgrade = () => {
      setShowProModal(false);
      // @ts-ignore - we know this screen exists
      navigation.navigate("FeatureComparison");
    };

    return (
      <>
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
