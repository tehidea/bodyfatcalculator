import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Modal, FlatList, Alert } from "react-native";
import { Text, Icon, Button } from "@rneui/themed";
import { useCalculatorStore } from "../../store/calculatorStore";
import { usePremiumStore } from "../../store/premiumStore";
import { Formula } from "../../types/calculator";
import { COLORS } from "../../constants/theme";
import { SkinfoldIcon } from "../icons/SkinfoldIcon";
import { BodyWeightScalesIcon } from "../icons/BodyWeightScalesIcon";
import { CalendarIcon } from "../icons/CalendarIcon";
import { MeasurementVerticalIcon } from "../icons/MeasurementVerticalIcon";
import { MeasuringTapeIcon } from "../icons/MeasuringTapeIcon";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePurchase } from "../../hooks/usePurchase";
import { PremiumFormulaModal } from "./PremiumFormulaModal";
import {
  getFormula,
  getFormulaDescription,
  getRequiredFields,
  getSkinfoldFormulas,
  getCircumferenceFormulas,
  getFormulasForAgeRange,
  getFormulaReferences,
} from "../../formulas";

export const MeasurementIcon = ({
  type,
  size,
  color,
}: {
  type: string;
  size: number;
  color: string;
}) => {
  switch (type) {
    case "weight":
      return <BodyWeightScalesIcon size={size} color={color} />;
    case "length":
      return <MeasuringTapeIcon size={size} color={color} />;
    case "skinfold":
      return <SkinfoldIcon size={size} color={color} />;
    case "height":
      return <MeasurementVerticalIcon size={size} color={color} />;
    case "age":
      return <CalendarIcon size={size} color={color} />;
    default:
      return null;
  }
};

const getMeasurementTypes = (formula: Formula) => {
  const fields = getRequiredFields(formula);
  const types = new Set<string>();

  fields.forEach(field => {
    if (field.includes("Skinfold")) types.add("skinfold");
    else if (
      field.includes("Circumference") ||
      ["neck", "waist", "hips", "chest", "thigh", "calf", "forearm", "wrist"].includes(field)
    )
      types.add("length");
    else if (field === "weight") types.add("weight");
    else if (field === "height") types.add("height");
    else if (field === "age") types.add("age");
  });

  return Array.from(types);
};

export const FormulaSelector = () => {
  const { formula, setFormula } = useCalculatorStore();
  const { pro, isLoading, checkEntitlements } = usePremiumStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isProModalVisible, setIsProModalVisible] = useState(false);
  const [pendingFormula, setPendingFormula] = useState<Formula | null>(null);
  const [checkError, setCheckError] = useState<string | null>(null);

  const { handlePurchase, isProcessing } = usePurchase({
    onSuccess: () => {
      setIsProModalVisible(false);
      if (pendingFormula) {
        setTimeout(() => {
          setFormula(pendingFormula);
          setPendingFormula(null);
          setTimeout(() => {
            setIsModalVisible(false);
          }, 100);
        }, 100);
      }
    },
    successMessage: "Thank you for upgrading! You now have access to all PRO Formulas!",
    onCancel: () => {
      setIsProModalVisible(false);
      setPendingFormula(null);
      setTimeout(() => {
        setIsModalVisible(false);
      }, 100);
    },
    onError: () => {
      setIsProModalVisible(false);
      setPendingFormula(null);
      setTimeout(() => {
        setIsModalVisible(false);
      }, 100);
    },
  });

  // Define which formulas are premium
  const PREMIUM_FORMULAS: Formula[] = ["durnin", "jack7", "jack4", "jack3", "parrillo"];

  const formulas = Object.entries(PREMIUM_FORMULAS).map(([_, formulaKey]) => {
    const formulaImpl = getFormula(formulaKey as Formula);
    return {
      key: formulaKey as Formula,
      name: formulaImpl.name || formulaKey,
      description: formulaImpl.description,
      premium: PREMIUM_FORMULAS.includes(formulaKey as Formula),
    };
  });

  // Initial and periodic entitlement check
  useEffect(() => {
    let isMounted = true;

    const checkWithErrorHandling = async () => {
      if (!isMounted) return;

      try {
        setCheckError(null);
        await checkEntitlements();
      } catch (error) {
        if (!isMounted) return;
        console.error("FormulaSelector - Entitlement check failed:", error);
        setCheckError("Failed to verify PRO status");
      }
    };

    console.log("FormulaSelector - Initial entitlements check");
    checkWithErrorHandling();

    const interval = setInterval(checkWithErrorHandling, 5 * 60 * 1000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [checkEntitlements]);

  useEffect(() => {
    if (checkError) {
      Alert.alert(
        "Verification Error",
        "Unable to verify PRO status. Some features may be unavailable.",
        [{ text: "Retry", onPress: () => checkEntitlements() }]
      );
    }
  }, [checkError]);

  // Safeguard for premium formula without PRO status
  useEffect(() => {
    const isPremium = PREMIUM_FORMULAS.includes(formula);
    console.log("FormulaSelector - PRO status:", pro);
    console.log("FormulaSelector - Current formula:", formula);
    console.log("FormulaSelector - Selected formula premium:", isPremium);

    if (!pro && isPremium) {
      setFormula("ymca");
    }
  }, [pro, formula, setFormula]);

  const getAccuracyLevel = (formula: Formula) => {
    const isSkinfold = getSkinfoldFormulas().includes(formula);
    const measurementCount = getRequiredFields(formula).length;

    if (isSkinfold && measurementCount >= 7) return "high";
    if (isSkinfold && measurementCount >= 4) return "medium";
    return "low";
  };

  const getAccuracyColor = (formula: Formula) => {
    const accuracy = getAccuracyLevel(formula);
    switch (accuracy) {
      case "high":
        return COLORS.success;
      case "medium":
        return COLORS.warning;
      case "low":
        return COLORS.error;
      default:
        return COLORS.textLight;
    }
  };

  const renderAccuracyInfo = () => (
    <View style={styles.accuracyInfoWrapper}>
      <View style={styles.accuracyInfo}>
        <Text style={styles.accuracyInfoTitle}>About Accuracy</Text>
        <View style={styles.accuracyLevels}>
          <View style={styles.accuracyLevel}>
            <View style={[styles.accuracyDot, { backgroundColor: COLORS.error }]} />
            <Text style={styles.accuracyText}>±5-7%</Text>
          </View>
          <Icon name="arrow-right" type="feather" color="#666" size={16} />
          <View style={styles.accuracyLevel}>
            <View style={[styles.accuracyDot, { backgroundColor: COLORS.warning }]} />
            <Text style={styles.accuracyText}>±4-5%</Text>
          </View>
          <Icon name="arrow-right" type="feather" color="#666" size={16} />
          <View style={styles.accuracyLevel}>
            <View style={[styles.accuracyDot, { backgroundColor: COLORS.success }]} />
            <Text style={styles.accuracyText}>±3-4%</Text>
          </View>
        </View>
        <Text style={styles.accuracyNote}>
          Lower % means more accurate results.{"\n"}PRO formulas typically offer better accuracy.
        </Text>
      </View>
    </View>
  );

  const selectedFormula = getFormula(formula);

  const handleFormulaSelect = (selectedKey: Formula, isPremiumFormula: boolean) => {
    if (isLoading || isProcessing) return;

    console.log("handleFormulaSelect - Selected formula:", selectedKey);
    console.log("handleFormulaSelect - Is premium formula:", isPremiumFormula);
    console.log("handleFormulaSelect - Current PRO status:", pro);

    if (!isPremiumFormula || pro) {
      setFormula(selectedKey);
      setIsModalVisible(false);
    } else {
      setIsModalVisible(false);
      setTimeout(() => {
        setPendingFormula(selectedKey);
        setIsProModalVisible(true);
      }, 300);
    }
  };

  const handleMaybeLater = () => {
    setIsProModalVisible(false);
    setPendingFormula(null);
    setTimeout(() => {
      setIsModalVisible(false);
    }, 100);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setIsModalVisible(true)}
        accessibilityLabel="Select formula"
        accessibilityHint="Opens formula selection modal"
      >
        <View style={styles.selectorContent}>
          <View>
            <Text style={styles.selectorTitle}>{selectedFormula.name || formula}</Text>
            <Text style={styles.selectorDescription} numberOfLines={2}>
              {selectedFormula.description}
            </Text>
          </View>
          <View style={styles.selectorRight}>
            <View style={styles.measurementTypes}>
              {getMeasurementTypes(formula).map(type => (
                <View key={type} style={styles.measurementType}>
                  <MeasurementIcon type={type} size={16} color={COLORS.textDark} />
                </View>
              ))}
            </View>
            <Icon name="chevron-right" type="feather" color={COLORS.textLight} size={24} />
          </View>
        </View>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Formula</Text>
            <TouchableOpacity
              onPress={() => setIsModalVisible(false)}
              accessibilityLabel="Close formula selector"
              accessibilityRole="button"
            >
              <Icon name="x" type="feather" size={24} />
            </TouchableOpacity>
          </View>

          {renderAccuracyInfo()}

          <FlatList
            data={formulas}
            keyExtractor={item => item.key}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.formulaItem, formula === item.key && styles.selectedFormulaItem]}
                onPress={() => handleFormulaSelect(item.key, item.premium)}
                accessibilityLabel={`Select ${item.name} formula`}
                accessibilityRole="button"
                accessibilityState={{ selected: formula === item.key }}
              >
                <View style={styles.formulaContent}>
                  <View style={styles.formulaHeader}>
                    <Text style={styles.formulaName}>{item.name}</Text>
                    {item.premium && (
                      <View style={styles.premiumBadge}>
                        <Text style={styles.premiumText}>PRO</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.formulaDescription} numberOfLines={2}>
                    {item.description}
                  </Text>
                  <View style={styles.formulaFooter}>
                    <View style={styles.measurementTypes}>
                      {getMeasurementTypes(item.key).map(type => (
                        <View key={type} style={styles.measurementType}>
                          <MeasurementIcon type={type} size={16} color={COLORS.textDark} />
                        </View>
                      ))}
                    </View>
                    <View
                      style={[
                        styles.accuracyIndicator,
                        { backgroundColor: getAccuracyColor(item.key) },
                      ]}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </SafeAreaView>
      </Modal>

      <PremiumFormulaModal
        visible={isProModalVisible}
        isProcessing={isProcessing}
        onUpgrade={handlePurchase}
        onMaybeLater={handleMaybeLater}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  selector: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectorContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectorTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  selectorDescription: {
    fontSize: 14,
    color: COLORS.textLight,
    maxWidth: "80%",
  },
  selectorRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  measurementTypes: {
    flexDirection: "row",
    marginRight: 8,
  },
  measurementType: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -8,
    borderWidth: 2,
    borderColor: "#fff",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  accuracyInfoWrapper: {
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  accuracyInfo: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
  },
  accuracyInfoTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  accuracyLevels: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  accuracyLevel: {
    flexDirection: "row",
    alignItems: "center",
  },
  accuracyDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 4,
  },
  accuracyText: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  accuracyNote: {
    fontSize: 12,
    color: COLORS.textLight,
    textAlign: "center",
  },
  formulaItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  selectedFormulaItem: {
    backgroundColor: "#f5f5f5",
  },
  formulaContent: {
    flex: 1,
  },
  formulaHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  formulaName: {
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
  premiumBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  premiumText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  formulaDescription: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 8,
  },
  formulaFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  accuracyIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
