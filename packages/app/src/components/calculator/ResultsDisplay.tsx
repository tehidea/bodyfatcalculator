import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import { Text, Card, LinearProgress, Icon } from "@rneui/themed";
import { useCalculatorStore } from "../../store/calculatorStore";
import { usePremiumStore } from "../../store/premiumStore";
import { COLORS } from "../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import { usePurchase } from "../../hooks/usePurchase";
import { UpgradeModal } from "./UpgradeModal";
import { getFormula } from "../../formulas";
import { useResponsive } from "../../utils/responsiveContext";
import { usePostHog } from "posthog-react-native";

interface ResultsDisplayProps {
  scrollViewRef: React.RefObject<ScrollView>;
}

export const ResultsDisplay = ({ scrollViewRef }: ResultsDisplayProps) => {
  const { results, measurementSystem, isResultsStale, gender, formula } = useCalculatorStore();
  const { pro } = usePremiumStore();
  const [showProModal, setShowProModal] = useState(false);
  const navigation = useNavigation();
  const { getResponsiveTypography, getLineHeight, width } = useResponsive();
  const posthog = usePostHog();

  // Create styles with responsive values
  const styles = createStyles(getResponsiveTypography, getLineHeight, width);

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

  const weightUnit = measurementSystem === "imperial" ? "lbs" : "kg";

  // Calculate progress values
  const maxBodyFat = gender === "male" ? 35 : 45;
  const calculateProgress = (value: number, max: number) => {
    // Convert to integer math (multiply by 1000 for 3 decimal precision equivalent)
    const progress = Math.floor((value * 1000) / (max * 1000));
    return Math.min(progress, 1);
  };
  const bodyFatProgress = calculateProgress(results.bodyFatPercentage, maxBodyFat);
  const leanMassPercentage = 100 - results.bodyFatPercentage;

  // Get color based on body fat percentage
  const getClassificationColor = (bodyFatPercentage: number) => {
    if (gender === "male") {
      if (bodyFatPercentage < 6) return "#2196F3"; // Essential fat
      if (bodyFatPercentage < 14) return "#4CAF50"; // Athletic
      if (bodyFatPercentage < 18) return "#8BC34A"; // Fitness
      if (bodyFatPercentage < 25) return "#FFC107"; // Acceptable
      return "#FF5722"; // Obese
    } else {
      if (bodyFatPercentage < 14) return "#2196F3"; // Essential fat
      if (bodyFatPercentage < 21) return "#4CAF50"; // Athletic
      if (bodyFatPercentage < 25) return "#8BC34A"; // Fitness
      if (bodyFatPercentage < 32) return "#FFC107"; // Acceptable
      return "#FF5722"; // Obese
    }
  };

  const getClassification = (bodyFatPercentage: number) => {
    if (gender === "male") {
      if (bodyFatPercentage < 6) return "Essential Fat";
      if (bodyFatPercentage < 14) return "Athletic";
      if (bodyFatPercentage < 18) return "Fitness";
      if (bodyFatPercentage < 25) return "Acceptable";
      return "Obese";
    } else {
      if (bodyFatPercentage < 14) return "Essential Fat";
      if (bodyFatPercentage < 21) return "Athletic";
      if (bodyFatPercentage < 25) return "Fitness";
      if (bodyFatPercentage < 32) return "Acceptable";
      return "Obese";
    }
  };

  const classificationColor = getClassificationColor(results.bodyFatPercentage);
  const classification = getClassification(results.bodyFatPercentage);

  // Split body fat into whole and decimal parts
  const wholeNumber = Math.floor(results.bodyFatPercentage);
  const decimal = (results.bodyFatPercentage % 1).toFixed(2).substring(1);

  const handleMaybeLater = () => {
    setTimeout(() => {
      setShowProModal(false);
    }, 100);
  };

  const formulaImpl = getFormula(formula);
  const marginOfError = formulaImpl.marginOfError || "3-7";

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
            <TouchableOpacity
              style={styles.premiumBadge}
              onPress={() => {
                // Track results precision banner tapped
                if (posthog) {
                  posthog.capture("results_precision_tapped", {
                    current_formula: formula,
                    body_fat_percentage: results?.bodyFatPercentage,
                    measurement_system: measurementSystem,
                  });
                }
                setShowProModal(true);
              }}
            >
              <Icon name="lock" type="feather" color="#666" size={14} />
              <Text style={styles.premiumBadgeText}>Get more accurate results with PRO</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.mainLabel}>
            Body Fat {pro ? `(±${marginOfError}%)` : "(estimated)"}
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
            {classification}
          </Text>
        </View>

        {/* Detailed Breakdown */}
        <View style={styles.breakdownContainer}>
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownValue}>
              {pro ? results.fatMass.toFixed(2) : Math.round(results.fatMass)} {weightUnit}
            </Text>
            <Text style={styles.breakdownLabel}>Fat Mass</Text>
            <Text style={styles.breakdownPercentage}>
              {pro ? results.bodyFatPercentage.toFixed(2) : Math.round(results.bodyFatPercentage)}%
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownValue}>
              {pro ? results.leanMass.toFixed(2) : Math.round(results.leanMass)} {weightUnit}
            </Text>
            <Text style={styles.breakdownLabel}>Lean Mass</Text>
            <Text style={styles.breakdownPercentage}>
              {pro ? leanMassPercentage.toFixed(2) : Math.round(leanMassPercentage)}%
            </Text>
          </View>
        </View>

        {/* Formula Name */}
        <Text style={styles.formulaName}>{formulaImpl.name || formula.toUpperCase()}</Text>
      </Card>

      <UpgradeModal
        visible={showProModal}
        isProcessing={isProcessing}
        variant="pro"
        onUpgrade={handlePurchase}
        onClose={handleMaybeLater}
      />
    </>
  );
};

const createStyles = (
  getResponsiveTypography: (size: any) => number,
  getLineHeight: (size: any) => number,
  width: number
) =>
  StyleSheet.create({
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
      fontSize: getResponsiveTypography("xl"),
      marginBottom: 16,
      lineHeight: getLineHeight("xl"),
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
      fontSize: getResponsiveTypography("6xl"),
      fontWeight: "bold",
      color: COLORS.textDark,
      lineHeight: getLineHeight("6xl"),
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
      fontSize: getResponsiveTypography("xxxs"),
      fontWeight: "bold",
      color: "#666",
      marginLeft: 4,
      lineHeight: getLineHeight("xxxs"),
    },
    mainLabel: {
      fontSize: getResponsiveTypography("md"),
      color: COLORS.textLight,
      marginBottom: 8,
      lineHeight: getLineHeight("md"),
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
      fontSize: getResponsiveTypography("md"),
      fontWeight: "600",
      lineHeight: getLineHeight("md"),
    },
    breakdownContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "stretch",
      marginBottom: 16,
    },
    breakdownItem: {
      flex: 1,
      alignItems: "center",
    },
    breakdownValue: {
      fontSize: getResponsiveTypography("xl"),
      fontWeight: "600",
      color: COLORS.textDark,
      marginBottom: 4,
      lineHeight: getLineHeight("xl"),
    },
    breakdownLabel: {
      fontSize: getResponsiveTypography("sm"),
      color: COLORS.textLight,
      marginBottom: 4,
      lineHeight: getLineHeight("sm"),
    },
    breakdownPercentage: {
      fontSize: getResponsiveTypography("md"),
      color: COLORS.textDark,
      lineHeight: getLineHeight("md"),
    },
    divider: {
      width: 1,
      backgroundColor: "#eee",
      marginHorizontal: 16,
    },
    formulaName: {
      fontSize: getResponsiveTypography("xs"),
      color: COLORS.textLight,
      textAlign: "center",
      marginTop: 8,
      lineHeight: getLineHeight("xs"),
    },
  });
