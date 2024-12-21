import React from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle, Keyboard } from "react-native";
import { Text } from "@rneui/themed";
import { useCalculatorStore } from "../../store/calculatorStore";
import { MeasurementSystem } from "../../schemas/calculator";
import { COLORS } from "../../constants/theme";
import { getResponsiveTypography, getLineHeight } from "../../utils/device";

interface MeasurementSelectorProps {
  style?: ViewStyle;
}

export const MeasurementSelector: React.FC<MeasurementSelectorProps> = ({ style, ...props }) => {
  const { measurementSystem, setMeasurementSystem, setResults } = useCalculatorStore();

  const handleSystemChange = (newSystem: MeasurementSystem) => {
    // Dismiss keyboard and blur any focused inputs
    Keyboard.dismiss();

    // Give time for the blur to complete
    setTimeout(() => {
      setMeasurementSystem(newSystem);
      setResults(null);
    }, 50);
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={[styles.toggle, measurementSystem === "metric" && styles.activeToggle]}
        onPress={() => handleSystemChange("metric")}
      >
        <Text style={[styles.text, measurementSystem === "metric" && styles.activeText]}>
          kg/cm
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.toggle, measurementSystem === "imperial" && styles.activeToggle]}
        onPress={() => handleSystemChange("imperial")}
      >
        <Text style={[styles.text, measurementSystem === "imperial" && styles.activeText]}>
          lb/in
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#444",
    borderRadius: 12,
    padding: 2,
    alignSelf: "center",
    marginBottom: 16,
  },
  toggle: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  activeToggle: {
    backgroundColor: COLORS.primary,
  },
  text: {
    color: "#fff",
    fontSize: getResponsiveTypography("sm"),
    lineHeight: getLineHeight("sm"),
  },
  activeText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
