import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Card } from "@rneui/themed";
import { useCalculatorStore } from "../../store/calculatorStore";
import { getUnitLabel } from "../../constants/formulas";
import { COLORS } from "../../constants/theme";

export const ResultsDisplay = () => {
  const { results, measurementSystem } = useCalculatorStore();

  if (!results) return null;

  const weightUnit = getUnitLabel("kg", measurementSystem);

  return (
    <Card containerStyle={styles.container}>
      <Card.Title style={styles.title}>Results</Card.Title>
      <View style={styles.resultRow}>
        <Text style={styles.label}>Body Fat Percentage:</Text>
        <Text style={styles.value}>{results.bodyFatPercentage.toFixed(2)}%</Text>
      </View>
      <View style={styles.resultRow}>
        <Text style={styles.label}>Fat Mass:</Text>
        <Text style={styles.value}>
          {results.fatMass.toFixed(2)} {weightUnit}
        </Text>
      </View>
      <View style={styles.resultRow}>
        <Text style={styles.label}>Lean Mass:</Text>
        <Text style={styles.value}>
          {results.leanMass.toFixed(2)} {weightUnit}
        </Text>
      </View>
      <View style={styles.resultRow}>
        <Text style={styles.label}>Classification:</Text>
        <Text style={[styles.value, styles.classification]}>{results.classification}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: COLORS.white,
    borderRadius: 10,
  },
  title: {
    color: COLORS.textDark,
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  label: {
    color: COLORS.textDark,
  },
  value: {
    fontWeight: "bold",
    color: COLORS.textDark,
  },
  classification: {
    color: COLORS.primary,
  },
});
