import React, { useState, useEffect, forwardRef, useRef, useCallback, useMemo } from "react";
import { View, TextInput, Keyboard, StyleSheet } from "react-native";
import { Text } from "@rneui/themed";
import Animated, {
  withTiming,
  withSpring,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import { useCalculatorStore } from "../../store/calculatorStore";
import { usePremiumStore } from "../../store/premiumStore";
import { MeasurementIcon } from "./FormulaSelector";
import { usePurchase } from "../../hooks/usePurchase";
import { UpgradeModal } from "./UpgradeModal";
import { styles } from "./MeasurementInput.styles";
import { COLORS } from "../../constants/theme";
import { getResponsiveSpacing } from "../../utils/device";
import { getFormulaMetadata, FieldMetadata } from "../../schemas/calculator";
import { MeasurementHint } from "./MeasurementHint";

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
    const { inputs, setInput, measurementSystem, formula, gender } = useCalculatorStore();
    const { pro } = usePremiumStore();
    const [rawValue, setRawValue] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [isProModalVisible, setIsProModalVisible] = useState(false);
    const inputRef = useRef<TextInput>(null);
    const errorAnimation = useSharedValue(0);
    const shakeAnimation = useSharedValue(0);
    const previousError = useRef<string | null>(null);

    const { handlePurchase, isProcessing } = usePurchase({
      successMessage:
        "Thank you for upgrading! You now have access to decimal precision and all the PRO Formulas!",
      onSuccess: () => setIsProModalVisible(false),
      onCancel: () => setIsProModalVisible(false),
      onError: () => setIsProModalVisible(false),
    });

    // Get field metadata from Zod schema
    const fieldMetadata = useMemo(() => {
      if (!formula || !gender) return null;
      try {
        const metadata = getFormulaMetadata(formula, measurementSystem, gender);
        return metadata.fields.find(f => f.key === field);
      } catch (error) {
        console.error("[MeasurementInput] Error getting field metadata:", error);
        return null;
      }
    }, [formula, gender, measurementSystem, field]);

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
      const storeValue = inputs[field];
      console.log(`[MeasurementInput] ${field} - Store value:`, storeValue);

      if (storeValue === null || storeValue === undefined) {
        setRawValue("");
        setIsEditing(false);
        return;
      }

      if (!isEditing) {
        setRawValue(
          typeof storeValue === "number"
            ? pro
              ? storeValue.toString()
              : Math.round(storeValue).toString()
            : storeValue?.toString() || ""
        );
      }
    }, [measurementSystem, inputs[field], isEditing, pro, field]);

    const handleChangeText = useCallback(
      (value: string) => {
        setIsEditing(true);
        console.log(`[MeasurementInput] ${field} - User input:`, value);

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
          console.log(`[MeasurementInput] ${field} - Sending to store:`, numValue);
          setInput(field, pro ? numValue : Math.round(numValue));
        }
      },
      [pro, field, setInput]
    );

    // Calculate the error container height outside the worklet
    const ERROR_CONTAINER_HEIGHT = getResponsiveSpacing(20);

    useEffect(() => {
      if (error && !previousError.current) {
        // New error appeared
        errorAnimation.value = withTiming(1, {
          duration: 150,
        });

        shakeAnimation.value = withSequence(
          withTiming(-3, { duration: 50 }),
          withTiming(3, { duration: 50 }),
          withTiming(0, { duration: 50 })
        );
      } else if (!error && previousError.current) {
        // Error cleared
        errorAnimation.value = withTiming(0, {
          duration: 100,
        });
      }
      previousError.current = error || null;
    }, [error]);

    const errorContainerStyle = useAnimatedStyle(() => {
      const interpolatedHeight = interpolate(
        errorAnimation.value,
        [0, 1],
        [0, ERROR_CONTAINER_HEIGHT],
        Extrapolation.CLAMP
      );

      return {
        opacity: errorAnimation.value,
        height: interpolatedHeight,
        transform: [{ translateX: shakeAnimation.value }],
      };
    });

    const inputContainerStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: shakeAnimation.value }],
    }));

    // If we don't have field metadata, don't render anything
    if (!fieldMetadata) return null;

    return (
      <>
        <View style={styles.container}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>{fieldMetadata.label}</Text>
            {fieldMetadata.accessibilityHint && (
              <>
                {console.log("MeasurementInput - Hint data:", {
                  hint: fieldMetadata.accessibilityHint,
                  type: fieldMetadata.type,
                })}
                <MeasurementHint hint={fieldMetadata.accessibilityHint} type={fieldMetadata.type} />
              </>
            )}
          </View>
          <Animated.View
            style={[styles.inputContainer, error && styles.inputError, inputContainerStyle]}
          >
            <View style={styles.iconContainer}>
              <MeasurementIcon
                type={fieldMetadata.type}
                size={getResponsiveSpacing(18)}
                color={COLORS.textDark}
              />
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
              accessibilityLabel={fieldMetadata.label}
              accessibilityHint={
                fieldMetadata.accessibilityHint || `Enter ${fieldMetadata.label.toLowerCase()}`
              }
              accessibilityRole="spinbutton"
              onSubmitEditing={handleSubmitEditing}
            />
            <Text style={styles.unit}>{fieldMetadata.unit}</Text>
          </Animated.View>
          <Animated.View style={[styles.errorContainer, errorContainerStyle]}>
            {error ? <Text style={styles.error}>{error}</Text> : null}
          </Animated.View>
        </View>

        <UpgradeModal
          visible={isProModalVisible}
          isProcessing={isProcessing}
          variant="pro"
          onUpgrade={handlePurchase}
          onClose={() => setIsProModalVisible(false)}
        />
      </>
    );
  }
);
