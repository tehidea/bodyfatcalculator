import React, { forwardRef, useState, useEffect, useRef, useImperativeHandle } from "react";
import {
  Modal,
  View,
  StyleSheet,
  TextInput,
  TextInputProps,
  ReturnKeyTypeOptions,
  InputAccessoryView,
  Keyboard,
  Button as RNButton,
  Platform,
} from "react-native";
import { Text, Button, Icon } from "@rneui/themed";
import { useCalculatorStore } from "../../store/calculatorStore";
import { usePremiumStore } from "../../store/premiumStore";
import { CalculatorInputs } from "../../types/calculator";
import { getUnitLabel } from "../../constants/formulas";
import { convertMeasurement } from "../../utils/conversions";
import { isCircumferenceMeasurement, isSkinfoldMeasurement } from "../../utils/typeGuards";
import { COLORS } from "../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import { MeasurementIcon } from "./FormulaSelector";

// Private Input component interfaces
interface InputProps extends TextInputProps {
  label: string;
  unit: string;
  error?: string;
  onSubmitEditing?: () => void;
  returnKeyType?: ReturnKeyTypeOptions;
  measurementType?: string;
}

export interface InputRef {
  focus: () => void;
}

// Private Input component
const Input = forwardRef<InputRef, InputProps>(
  (
    {
      label,
      unit,
      error,
      style,
      onSubmitEditing,
      returnKeyType = "next",
      measurementType,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<TextInput>(null);
    const inputAccessoryViewID = `${label.replace(/\s/g, "")}_input`;

    useImperativeHandle(ref, () => ({
      focus: () => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      },
    }));

    const handleToolbarPress = () => {
      if (returnKeyType === "done") {
        Keyboard.dismiss();
      }
      if (onSubmitEditing) {
        onSubmitEditing();
      }
    };

    return (
      <>
        {Platform.OS === "ios" && (
          <InputAccessoryView nativeID={inputAccessoryViewID}>
            <View style={styles.toolbar}>
              <RNButton
                onPress={handleToolbarPress}
                title={returnKeyType === "next" ? "Next" : "Done"}
              />
            </View>
          </InputAccessoryView>
        )}
        <View style={[styles.container, style]}>
          <Text style={styles.label}>{label}</Text>
          <View style={styles.inputContainer}>
            {measurementType && <MeasurementIcon type={measurementType} color={COLORS.textDark} />}
            <TextInput
              {...props}
              ref={inputRef}
              style={[styles.input, error && styles.inputError]}
              placeholderTextColor="#999"
              accessibilityLabel={label}
              accessibilityHint={`Enter ${label.toLowerCase()}`}
              accessibilityRole="spinbutton"
              inputAccessoryViewID={inputAccessoryViewID}
              keyboardType="decimal-pad"
            />
            <Text style={styles.unit}>{unit}</Text>
          </View>
          {error && <Text style={styles.error}>{error}</Text>}
        </View>
      </>
    );
  }
);

// MeasurementInput interfaces and component
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

    // Get measurement type
    const getMeasurementType = () => {
      if (isCircumferenceMeasurement(field.key)) return "circumference";
      if (isSkinfoldMeasurement(field.key)) return "skinfold";
      if (field.key === "weight") return "weight";
      if (field.key === "height") return "height";
      if (field.key === "age") return "age";
      return undefined;
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
        if (measurementType && measurementType !== "age") {
          const convertedValue = convertMeasurement(
            numValue,
            field.unit,
            getUnitLabel(field.unit, measurementSystem),
            measurementType
          );
          setRawValue(convertedValue.toString());
          setInput(field.key, convertedValue);
        } else {
          setInput(field.key, numValue);
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
          measurementType={getMeasurementType()}
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
    color: COLORS.primary,
    marginLeft: 8,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 12,
  },
  toolbar: {
    backgroundColor: "#f8f8f8",
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: "#dedede",
    flexDirection: "row",
    justifyContent: "flex-end",
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
