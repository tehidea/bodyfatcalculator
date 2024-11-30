import React from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { Text } from "@rneui/themed";
import { useCalculatorStore } from "../../store/calculatorStore";
import { Gender } from "../../types/calculator";
import { COLORS } from "../../constants/theme";

interface GenderSelectorProps {
  style?: ViewStyle;
}

export const GenderSelector = ({ style }: GenderSelectorProps) => {
  const { gender, setGender, setResults } = useCalculatorStore();

  const handleGenderChange = (newGender: Gender) => {
    setGender(newGender);
    setResults(null); // Clear results instead of calculating
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={[styles.toggle, gender === "male" && styles.activeToggle]}
        onPress={() => handleGenderChange("male")}
      >
        <Text style={[styles.text, gender === "male" && styles.activeText]}>♂️ Male</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.toggle, gender === "female" && styles.activeToggle]}
        onPress={() => handleGenderChange("female")}
      >
        <Text style={[styles.text, gender === "female" && styles.activeText]}>♀️ Female</Text>
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
    fontSize: 14,
  },
  activeText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
