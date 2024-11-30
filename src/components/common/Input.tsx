import React from "react";
import { View, TextInput, Text, StyleSheet, TextInputProps } from "react-native";
import { COLORS } from "../../constants/theme";

interface Props extends TextInputProps {
  label: string;
  unit: string;
  error?: string;
}

export const Input: React.FC<Props> = ({ label, unit, error, style, ...props }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          {...props}
          style={[styles.input, error && styles.inputError]}
          placeholderTextColor="#999"
          accessibilityLabel={label}
          accessibilityHint={`Enter ${label.toLowerCase()}`}
          accessibilityRole="spinbutton"
        />
        <Text style={styles.unit}>{unit}</Text>
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

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
  },
  input: {
    flex: 1,
    height: 40,
    color: COLORS.textDark,
  },
  inputError: {
    borderColor: "red",
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
  },
});
