import React from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { Text, Icon } from "@rneui/themed";
import { useCalculatorStore } from "../../store/calculatorStore";
import { Gender } from "../../schemas/calculator";
import { COLORS } from "../../constants/theme";
import MaleIcon from "../icons/MaleIcon";
import FemaleIcon from "../icons/FemaleIcon";
import { useResponsive } from "../../utils/responsiveContext";

interface GenderSelectorProps {
  style?: ViewStyle;
}

export const GenderSelector = ({ style }: GenderSelectorProps) => {
  const { gender, setGender, setResults } = useCalculatorStore();
  const { getResponsiveTypography, getLineHeight, getResponsiveSpacing } = useResponsive();

  // Create styles with responsive values
  const styles = createStyles(getResponsiveTypography, getLineHeight);

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
        <View style={styles.iconTextContainer}>
          <MaleIcon size={getResponsiveSpacing(12)} color="#fff" style={styles.icon} />
          <Text style={[styles.text, gender === "male" && styles.activeText]}>Male</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.toggle, gender === "female" && styles.activeToggle]}
        onPress={() => handleGenderChange("female")}
      >
        <View style={styles.iconTextContainer}>
          <FemaleIcon size={getResponsiveSpacing(12)} color="#fff" />
          <Text style={[styles.text, gender === "female" && styles.activeText]}> Female</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const createStyles = (
  getResponsiveTypography: (size: any) => number,
  getLineHeight: (size: any) => number
) =>
  StyleSheet.create({
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
      flexDirection: "row",
      alignItems: "center",
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
    iconTextContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    icon: {
      marginTop: 2,
    },
  });
