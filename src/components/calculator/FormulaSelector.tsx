import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Modal, FlatList, Alert } from "react-native";
import { Text, Icon, Button } from "@rneui/themed";
import { useCalculatorStore } from "../../store/calculatorStore";
import { usePremiumStore } from "../../store/premiumStore";
import { Formula } from "../../types/calculator";
import { FORMULA_REQUIREMENTS } from "../../constants/formulas";
import { COLORS } from "../../constants/theme";
import { SkinfoldIcon } from "../icons/SkinfoldIcon";
import { BodyWeightScalesIcon } from "../icons/BodyWeightScalesIcon";
import { CalendarIcon } from "../icons/CalendarIcon";
import { MeasurementVerticalIcon } from "../icons/MeasurementVerticalIcon";
import { MeasuringTapeIcon } from "../icons/MeasuringTapeIcon";
import { getMarginOfError } from "../../utils/accuracy";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePurchase } from "../../hooks/usePurchase";
import { PremiumFormulaModal } from "./PremiumFormulaModal";

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
    case "circumference":
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

const getMeasurementTypes = (fields: (typeof FORMULA_REQUIREMENTS)[Formula]["fields"]) => {
  const types = new Set<string>();

  fields.forEach(field => {
    if (field.key.includes("Skinfold")) types.add("skinfold");
    else if (field.key.includes("Circumference")) types.add("circumference");
    else if (field.key === "weight") types.add("weight");
    else if (field.key === "height") types.add("height");
    else if (field.key === "age") types.add("age");
  });

  return Array.from(types);
};

export const FormulaSelector = () => {
  const { formula, setFormula } = useCalculatorStore();
  const { pro, isLoading, checkEntitlements } = usePremiumStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPremiumModalVisible, setIsPremiumModalVisible] = useState(false);
  const [pendingFormula, setPendingFormula] = useState<Formula | null>(null);
  const [checkError, setCheckError] = useState<string | null>(null);

  const { handlePurchase, isProcessing } = usePurchase({
    onSuccess: () => {
      // First close the premium modal
      setIsPremiumModalVisible(false);
      // Then update the formula if needed
      if (pendingFormula) {
        setTimeout(() => {
          setFormula(pendingFormula);
          setPendingFormula(null);
          // Finally close the formula selector modal
          setTimeout(() => {
            setIsModalVisible(false);
          }, 100);
        }, 100);
      }
    },
    successMessage: "Thank you for upgrading! You now have access to all PRO Formulas!",
    onCancel: () => {
      setIsPremiumModalVisible(false);
      setPendingFormula(null);
      setTimeout(() => {
        setIsModalVisible(false);
      }, 100);
    },
    onError: () => {
      setIsPremiumModalVisible(false);
      setPendingFormula(null);
      setTimeout(() => {
        setIsModalVisible(false);
      }, 100);
    },
  });

  const formulas = Object.entries(FORMULA_REQUIREMENTS).map(([key, value]) => ({
    key: key as Formula,
    name: value.name,
    description: value.description,
    premium: value.premium || false,
  }));

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

    // Check immediately
    console.log("FormulaSelector - Initial entitlements check");
    checkWithErrorHandling();

    // Check every 5 minutes
    const interval = setInterval(checkWithErrorHandling, 5 * 60 * 1000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [checkEntitlements]);

  // Show error if entitlement check fails
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
    const currentFormula = formulas.find(f => f.key === formula);
    console.log("FormulaSelector - PRO status:", pro);
    console.log("FormulaSelector - Current formula:", formula);
    console.log("FormulaSelector - Selected formula premium:", currentFormula?.premium);

    if (!pro && currentFormula?.premium) {
      setFormula("ymca");
    }
  }, [pro, formula, setFormula]);

  const getAccuracyColor = (formula: Formula) => {
    const error = getMarginOfError(formula);
    if (!error) return COLORS.textLight;

    const errorValue = error ?? "0";
    const lowerBound = parseFloat(errorValue.split("-")[0]);

    if (lowerBound >= 5) {
      return COLORS.error;
    } else if (lowerBound >= 4) {
      return COLORS.warning;
    } else {
      return COLORS.success;
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

  const selectedFormula = FORMULA_REQUIREMENTS[formula];

  const handleFormulaSelect = (selectedKey: Formula, isPremiumFormula: boolean) => {
    if (isLoading || isProcessing) return;

    console.log("handleFormulaSelect - Selected formula:", selectedKey);
    console.log("handleFormulaSelect - Is premium formula:", isPremiumFormula);
    console.log("handleFormulaSelect - Current PRO status:", pro);

    // Check for Coming Soon formulas
    if (["jack3", "jack4", "jack7", "parrillo", "durnin"].includes(selectedKey)) {
      Alert.alert("Coming Soon", "This formula will be available in a future update. Stay tuned!", [
        { text: "OK" },
      ]);
      return;
    }

    if (!isPremiumFormula || pro) {
      setFormula(selectedKey);
      setIsModalVisible(false);
    } else {
      // First close the formula selector modal
      setIsModalVisible(false);
      // Wait for the first modal to close before showing the premium modal
      setTimeout(() => {
        setPendingFormula(selectedKey);
        setIsPremiumModalVisible(true);
      }, 300);
    }
  };

  const handleMaybeLater = () => {
    // First close the premium modal
    setIsPremiumModalVisible(false);
    // Clear the pending formula
    setPendingFormula(null);
    // Wait a bit before closing the formula selector modal
    setTimeout(() => {
      setIsModalVisible(false);
    }, 100);
  };

  const isComingSoon = (formulaKey: Formula) =>
    ["jack3", "jack4", "jack7", "parrillo", "durnin"].includes(formulaKey);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setIsModalVisible(true)}
        activeOpacity={0.7}
      >
        <View style={styles.labelRow}>
          <Text style={styles.selectorHint}>Select Formula</Text>
          <View style={styles.chevronContainer}>
            <Icon name="chevron-down" type="feather" color={COLORS.text} size={20} />
          </View>
        </View>
        <View style={styles.selectedFormula}>
          <Text style={styles.formulaName}>{selectedFormula.name}</Text>
          {selectedFormula.premium === true && !pro && (
            <View style={styles.premiumBadge}>
              <Icon name="lock" type="feather" color="#666" size={14} />
              <Text style={styles.premiumBadgeText}>PRO</Text>
            </View>
          )}
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description} numberOfLines={2}>
            {selectedFormula.description}
            {selectedFormula.premium !== true && ` (±${getMarginOfError(formula)})`}
          </Text>
          {isComingSoon(formula) && (
            <View style={[styles.premiumBadge, styles.comingSoonBadge]}>
              <Text style={styles.premiumBadgeText}>COMING SOON</Text>
            </View>
          )}
        </View>
        <View style={styles.measurementIcons}>
          {getMeasurementTypes(selectedFormula.fields).map(type => (
            <MeasurementIcon key={type} size={12} type={type} color="#fff" />
          ))}
        </View>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {}}
      >
        <View style={styles.modalContainer}>
          <SafeAreaView edges={["top"]} style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Formula</Text>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Icon name="x" type="feather" color={COLORS.textDark} size={24} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={[
                ...formulas,
                { key: "accuracy_info", name: "", description: "", premium: false },
              ]}
              keyExtractor={item => item.key}
              style={styles.formulaList}
              renderItem={({ item }) => {
                if (item.key === "accuracy_info") {
                  return renderAccuracyInfo();
                }
                return (
                  <TouchableOpacity
                    style={[
                      styles.formulaItem,
                      item.key === formula && styles.activeFormula,
                      item.premium && !pro && styles.premiumFormula,
                    ]}
                    onPress={() => handleFormulaSelect(item.key as Formula, item.premium && !pro)}
                  >
                    <View style={styles.formulaItemHeader}>
                      <View style={styles.formulaItemNameContainer}>
                        <Text
                          style={[
                            styles.formulaItemName,
                            item.key === formula && styles.activeFormulaText,
                            item.premium && !pro && styles.premiumFormulaText,
                          ]}
                        >
                          {item.name}
                        </Text>
                        <View style={styles.formulaMetadata}>
                          <View
                            style={[
                              styles.accuracyIndicator,
                              { backgroundColor: getAccuracyColor(item.key as Formula) },
                            ]}
                          />
                          <Text style={styles.accuracyText}>
                            ±{getMarginOfError(item.key as Formula)}
                          </Text>
                        </View>
                      </View>
                      {item.premium && !pro && (
                        <View style={styles.premiumBadge}>
                          <Icon name="lock" type="feather" color="#666" size={14} />
                          <Text style={styles.premiumBadgeText}>PRO</Text>
                        </View>
                      )}
                    </View>
                    <View style={styles.descriptionContainer}>
                      <Text
                        style={[
                          styles.formulaItemDescription,
                          item.premium && !pro && styles.premiumFormulaText,
                        ]}
                        numberOfLines={3}
                      >
                        {item.description}
                      </Text>
                      {isComingSoon(item.key as Formula) && (
                        <View style={[styles.premiumBadge, styles.comingSoonBadge]}>
                          <Text style={styles.premiumBadgeText}>COMING SOON</Text>
                        </View>
                      )}
                    </View>
                    <View style={styles.measurementIcons}>
                      {getMeasurementTypes(FORMULA_REQUIREMENTS[item.key as Formula].fields).map(
                        type => (
                          <MeasurementIcon key={type} size={12} type={type} color="#666" />
                        )
                      )}
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </SafeAreaView>
        </View>
      </Modal>

      <PremiumFormulaModal
        visible={isPremiumModalVisible}
        isProcessing={isProcessing}
        onUpgrade={handlePurchase}
        onClose={handleMaybeLater}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  selector: {
    backgroundColor: "#444",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  selectedFormula: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },
  formulaName: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  descriptionContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginTop: 4,
  },
  description: {
    color: COLORS.text,
    fontSize: 12,
    opacity: 0.8,
    flex: 1,
    marginRight: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: "85%",
    flex: 1,
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
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.textDark,
  },
  formulaItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  formulaItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  activeFormula: {
    backgroundColor: COLORS.primary + "10",
  },
  premiumFormula: {
    backgroundColor: "#f8f8f8",
  },
  formulaItemNameContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  formulaItemNameText: {
    fontSize: 16,
    color: COLORS.textDark,
  },
  activeFormulaText: {
    color: COLORS.primary,
    fontWeight: "bold",
  },
  premiumFormulaText: {
    color: "#666",
  },
  formulaItemDescription: {
    flex: 1,
    fontSize: 12,
    color: "#666",
  },
  premiumBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  premiumBadgeText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#666",
    marginLeft: 4,
  },
  measurementIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
    opacity: 0.6,
  },
  formulaItemName: {
    fontSize: 16,
    color: COLORS.textDark,
    flex: 1,
  },
  accuracyInfoWrapper: {
    backgroundColor: COLORS.white,
    marginBottom: 16,
  },
  accuracyInfo: {
    padding: 16,
    paddingTop: 20,
    backgroundColor: COLORS.white,
  },
  accuracyInfoTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.textDark,
    marginBottom: 12,
    textAlign: "center",
  },
  accuracyLevels: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  accuracyLevel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  accuracyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  accuracyText: {
    fontSize: 12,
    color: "#666",
  },
  accuracyNote: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    fontStyle: "italic",
  },
  formulaMetadata: {
    flexDirection: "row",
    alignItems: "center",
  },
  accuracyIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  formulaList: {
    flex: 1,
  },
  comingSoonBadge: {
    // marginLeft: 4,
    flexShrink: 0,
  },
  selectorHint: {
    color: COLORS.text,
    fontSize: 12,
    opacity: 0.6,
    textAlign: "left",
    textTransform: "uppercase",
    letterSpacing: 1,
    fontWeight: "bold",
  },
  chevronContainer: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 8,
    paddingHorizontal: 2,
    paddingTop: 3,
    paddingBottom: 1,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
