import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import { Text, Card, LinearProgress, Icon } from "@rneui/themed";
import { useCalculatorStore } from "../../store/calculatorStore";
import { usePremiumStore } from "../../store/premiumStore";
import { getUnitLabel } from "../../constants/formulas";
import { COLORS } from "../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import { getMarginOfError } from "../../utils/accuracy";
import { usePurchase } from "../../hooks/usePurchase";
import { ProUpgradeModal } from "./ProUpgradeModal";

const { width } = Dimensions.get("window");

interface ResultsDisplayProps {
  scrollViewRef: React.RefObject<ScrollView>;
}

export const ResultsDisplay = ({ scrollViewRef }: ResultsDisplayProps) => {
  const { results, measurementSystem, isResultsStale, gender, formula } = useCalculatorStore();
  const { pro } = usePremiumStore();
  const [showProModal, setShowProModal] = useState(false);
  const navigation = useNavigation();

  const { handlePurchase, isProcessing } = usePurchase({
    successMessage:
      "Thank you for upgrading! You now have access to decimal precision and PRO formulas!",
    onSuccess: () => {
      const timer = setTimeout(() => {
        setShowProModal(false);
      }, 100);
      return () => clearTimeout(timer);
    },
    onCancel: () => {
      const timer = setTimeout(() => {
        setShowProModal(false);
      }, 100);
      return () => clearTimeout(timer);
    },
    onError: () => {
      const timer = setTimeout(() => {
        setShowProModal(false);
      }, 100);
      return () => clearTimeout(timer);
    },
  });

  useEffect(() => {
    let isMounted = true;

    if (results && !isResultsStale && isMounted) {
      // Give a small delay to ensure the results are rendered
      const timer = setTimeout(() => {
        if (isMounted && scrollViewRef.current) {
          scrollViewRef.current.scrollToEnd({ animated: true });
        }
      }, 100);

      return () => {
        isMounted = false;
        clearTimeout(timer);
      };
    }

    return () => {
      isMounted = false;
    };
  }, [results, isResultsStale, scrollViewRef]);

  if (!results || isResultsStale) return null;

  const weightUnit = getUnitLabel("kg", measurementSystem);

  // Calculate progress values
  const maxBodyFat = gender === "male" ? 35 : 45;
  const bodyFatProgress = Math.min(results.bodyFatPercentage / maxBodyFat, 1);
  const leanMassPercentage = 100 - results.bodyFatPercentage;

  // Get color based on classification
  const getClassificationColor = (classification: string) => {
    if (classification.includes("Athletic")) return "#4CAF50";
    if (classification.includes("Fitness")) return "#8BC34A";
    if (classification.includes("Acceptable")) return "#FFC107";
    if (classification.includes("Essential")) return "#2196F3";
    return "#FF5722"; // Obese
  };

  const classificationColor = getClassificationColor(results.classification);

  // Split body fat into whole and decimal parts
  const wholeNumber = Math.floor(results.bodyFatPercentage);
  const decimal = (results.bodyFatPercentage % 1).toFixed(1).substring(1);

  const handleMaybeLater = () => {
    // Add a small delay before closing the modal
    setTimeout(() => {
      setShowProModal(false);
    }, 100);
  };

  return (
    <>
      <Card containerStyle={styles.container}>
        <Card.Title style={styles.title}>Your Body Composition</Card.Title>

        {/* Body Fat Percentage with Progress Bar */}
        <View style={styles.mainResult}>
          <View style={styles.mainValueContainer}>
            <Text style={styles.mainValue}>{pro ? `${wholeNumber}` : `~${wholeNumber}%`}</Text>
            {pro && <Text style={styles.mainValue}>{decimal}%</Text>}
          </View>
          {!pro && (
            <TouchableOpacity style={styles.premiumBadge} onPress={() => setShowProModal(true)}>
              <Icon name="lock" type="feather" color="#666" size={14} />
              <Text style={styles.premiumBadgeText}>Get more accurate results with PRO</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.mainLabel}>
            Body Fat {pro ? `(±${getMarginOfError(formula)})` : "(estimated)"}
          </Text>
          <LinearProgress
            style={styles.progressBar}
            value={bodyFatProgress}
            color={classificationColor}
            variant="determinate"
          />
        </View>

        {/* Classification */}
        <View
          style={[styles.classificationContainer, { backgroundColor: `${classificationColor}15` }]}
        >
          <Text style={[styles.classification, { color: classificationColor }]}>
            {results.classification}
          </Text>
        </View>

        {/* Detailed Breakdown */}
        <View style={styles.breakdownContainer}>
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownValue}>
              {pro ? results.fatMass.toFixed(1) : Math.round(results.fatMass)} {weightUnit}
            </Text>
            <Text style={styles.breakdownLabel}>Fat Mass</Text>
            <Text style={styles.breakdownPercentage}>
              {pro ? results.bodyFatPercentage.toFixed(1) : Math.round(results.bodyFatPercentage)}%
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownValue}>
              {pro ? results.leanMass.toFixed(1) : Math.round(results.leanMass)} {weightUnit}
            </Text>
            <Text style={styles.breakdownLabel}>Lean Mass</Text>
            <Text style={styles.breakdownPercentage}>
              {pro ? leanMassPercentage.toFixed(1) : Math.round(leanMassPercentage)}%
            </Text>
          </View>
        </View>

        {/* Formula Name */}
        <Text style={styles.formulaName}>{formula.toUpperCase()} Formula</Text>
      </Card>

      <ProUpgradeModal
        visible={showProModal}
        isProcessing={isProcessing}
        onUpgrade={handlePurchase}
        onClose={handleMaybeLater}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    width: width - 32,
    alignSelf: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    color: COLORS.textDark,
    fontSize: 20,
    marginBottom: 16,
  },
  mainResult: {
    alignItems: "center",
    marginBottom: 20,
  },
  mainValueContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  mainValue: {
    fontSize: 48,
    fontWeight: "bold",
    color: COLORS.textDark,
  },
  premiumBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 12,
  },
  premiumBadgeText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#666",
    marginLeft: 4,
  },
  mainLabel: {
    fontSize: 16,
    color: COLORS.textLight,
    marginBottom: 8,
  },
  progressBar: {
    width: "100%",
    height: 8,
    borderRadius: 4,
    marginTop: 8,
  },
  classificationContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
  },
  classification: {
    fontSize: 16,
    fontWeight: "600",
  },
  breakdownContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  breakdownItem: {
    flex: 1,
    alignItems: "center",
  },
  divider: {
    width: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    marginHorizontal: 16,
  },
  breakdownValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.textDark,
    marginBottom: 4,
  },
  breakdownLabel: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  breakdownPercentage: {
    fontSize: 16,
    color: COLORS.textDark,
    opacity: 0.8,
  },
  formulaName: {
    fontSize: 12,
    color: COLORS.textDark,
    opacity: 0.4,
    textAlign: "center",
    marginTop: 20,
    fontFamily: "Montserrat-Light",
  },
});
