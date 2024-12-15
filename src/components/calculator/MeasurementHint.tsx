import React, { useState } from "react";
import { View, Pressable, Modal, Dimensions, StyleSheet } from "react-native";
import { Text, Icon } from "@rneui/themed";
import { COLORS } from "../../constants/theme";
import { getResponsiveSpacing, getResponsiveTypography } from "../../utils/device";
import { MeasurementIcon } from "./FormulaSelector";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface MeasurementHintProps {
  hint: string;
  type: "weight" | "height" | "skinfold" | "age" | "circumference";
}

export function MeasurementHint({ hint, type }: MeasurementHintProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <Pressable
        onPress={() => setIsVisible(true)}
        style={styles.infoButton}
        accessibilityLabel="Show measurement instructions"
        accessibilityRole="button"
      >
        <Icon name="help-circle" type="feather" size={18} color={COLORS.primary} />
      </Pressable>

      <Modal
        visible={isVisible}
        transparent
        statusBarTranslucent
        animationType="fade"
        onRequestClose={() => setIsVisible(false)}
      >
        <Pressable style={styles.modalContainer} onPress={() => setIsVisible(false)}>
          <Pressable style={styles.modalContent}>
            <View style={styles.iconContainer}>
              <MeasurementIcon type={type} size={getResponsiveSpacing(32)} color={COLORS.primary} />
            </View>
            <Text style={styles.hintTitle}>How to Measure</Text>
            <View style={styles.hintTextContainer}>
              <Text style={styles.hintText}>{hint}</Text>
            </View>
            <Pressable
              style={styles.closeButton}
              onPress={() => setIsVisible(false)}
              accessibilityLabel="Close hint"
              accessibilityRole="button"
            >
              <Text style={styles.closeButtonText}>Got it</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  infoButton: {
    padding: getResponsiveSpacing(4),
    marginLeft: getResponsiveSpacing(4),
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: getResponsiveSpacing(20),
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: getResponsiveSpacing(24),
    width: Math.min(SCREEN_WIDTH - 48, 400),
    alignItems: "center",
    minHeight: getResponsiveSpacing(200),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 24,
    maxHeight: "80%",
  },
  iconContainer: {
    width: getResponsiveSpacing(64),
    height: getResponsiveSpacing(64),
    borderRadius: getResponsiveSpacing(32),
    backgroundColor: COLORS.primary + "20",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: getResponsiveSpacing(16),
  },
  hintTitle: {
    fontSize: getResponsiveTypography("lg"),
    fontWeight: "600",
    color: COLORS.textDark,
    marginBottom: getResponsiveSpacing(12),
    textAlign: "center",
  },
  hintTextContainer: {
    width: "100%",
    marginBottom: getResponsiveSpacing(24),
  },
  hintText: {
    fontSize: getResponsiveTypography("md"),
    lineHeight: getResponsiveTypography("md") * 1.5,
    textAlign: "center",
    color: COLORS.textDark,
  },
  closeButton: {
    paddingVertical: getResponsiveSpacing(12),
    paddingHorizontal: getResponsiveSpacing(24),
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    width: "100%",
  },
  closeButtonText: {
    color: "white",
    fontSize: getResponsiveTypography("md"),
    fontWeight: "600",
    textAlign: "center",
  },
});
