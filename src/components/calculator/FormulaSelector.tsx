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
import { getFormula, getRequiredFields, getAvailableFormulas } from "../../formulas";
import { getIconTypes } from "../../utils/fields";
import {
  isIPad,
  getResponsiveSpacing,
  getResponsiveFontSize,
  getResponsiveTypography,
  getLineHeight,
  getLetterSpacing,
} from "../../utils/device";

type IconType = "weight" | "circumference" | "skinfold" | "height" | "age";

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

const getFormulaTypes = (formula: Formula): IconType[] => {
  if (!formula) return [];

  const fields = getRequiredFields(formula);
  if (!fields || !fields.length) return [];

  return getIconTypes(fields);
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

  const formulas = getAvailableFormulas().map(formulaKey => {
    const formulaImpl = getFormula(formulaKey);
    return {
      key: formulaKey,
      name: formulaImpl.name || formulaKey,
      description: formulaImpl.description,
      premium: PREMIUM_FORMULAS.includes(formulaKey),
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
    const formulaImpl = getFormula(formula);
    const error = formulaImpl.marginOfError;
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
          <Icon name="arrow-right" type="feather" color="#666" size={getResponsiveSpacing(16)} />
          <View style={styles.accuracyLevel}>
            <View style={[styles.accuracyDot, { backgroundColor: COLORS.warning }]} />
            <Text style={styles.accuracyText}>±4-5%</Text>
          </View>
          <Icon name="arrow-right" type="feather" color="#666" size={getResponsiveSpacing(16)} />
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

  const selectedFormulaImpl = getFormula(formula);

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
        activeOpacity={0.7}
      >
        <View style={styles.labelRow}>
          <Text style={styles.selectorHint}>Select Formula</Text>
          <View style={styles.chevronContainer}>
            <Icon
              name="chevron-down"
              type="feather"
              color={COLORS.text}
              size={getResponsiveSpacing(20)}
            />
          </View>
        </View>
        <View style={styles.selectedFormula}>
          <Text style={styles.formulaName}>{selectedFormulaImpl.name}</Text>
          {PREMIUM_FORMULAS.includes(formula) && !pro && (
            <View style={styles.premiumBadge}>
              <Icon name="lock" type="feather" color="#666" size={getResponsiveSpacing(14)} />
              <Text style={styles.premiumBadgeText}>PRO</Text>
            </View>
          )}
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description} numberOfLines={6}>
            {selectedFormulaImpl.description}
            {!PREMIUM_FORMULAS.includes(formula) && ` (±${selectedFormulaImpl.marginOfError})`}
          </Text>
        </View>
        <View style={styles.measurementIcons}>
          {getIconTypes(getRequiredFields(formula)).map((type: string) => (
            <MeasurementIcon key={type} size={getResponsiveSpacing(12)} type={type} color="#fff" />
          ))}
        </View>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>SELECT FORMULA</Text>
              <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
                <Icon
                  name="x"
                  type="feather"
                  color={COLORS.textDark}
                  size={getResponsiveSpacing(24)}
                />
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

                const formulaImpl = getFormula(item.key as Formula);
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
                          {formulaImpl.name}
                        </Text>
                        <View style={styles.formulaMetadata}>
                          <View
                            style={[
                              styles.accuracyIndicator,
                              { backgroundColor: getAccuracyColor(item.key as Formula) },
                            ]}
                          />
                          <Text style={styles.accuracyText}>±{formulaImpl.marginOfError}</Text>
                        </View>
                      </View>
                      {item.premium && !pro && (
                        <View style={styles.premiumBadge}>
                          <Icon
                            name="lock"
                            type="feather"
                            color="#666"
                            size={getResponsiveSpacing(14)}
                          />
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
                        numberOfLines={6}
                      >
                        {formulaImpl.description}
                      </Text>
                    </View>
                    <View style={styles.measurementIcons}>
                      {getIconTypes(getRequiredFields(item.key as Formula)).map((type: string) => (
                        <MeasurementIcon
                          key={type}
                          size={getResponsiveSpacing(12)}
                          type={type}
                          color="#666"
                        />
                      ))}
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </Modal>

      <PremiumFormulaModal
        visible={isProModalVisible}
        isProcessing={isProcessing}
        onUpgrade={handlePurchase}
        onClose={handleMaybeLater}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: getResponsiveSpacing(16),
  },
  selector: {
    backgroundColor: "#444",
    borderRadius: 12,
    padding: getResponsiveSpacing(12),
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  selectedFormula: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: getResponsiveSpacing(4),
  },
  formulaName: {
    color: COLORS.text,
    fontSize: getResponsiveTypography("lg"),
    fontWeight: "bold",
    flex: 1,
  },
  descriptionContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  description: {
    color: COLORS.text,
    fontSize: getResponsiveTypography("xs"),
    opacity: 0.8,
    flex: 1,
    marginRight: getResponsiveSpacing(8),
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "transparent",
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    height: isIPad ? "75%" : "85%",
    maxWidth: isIPad ? 800 : undefined,
    alignSelf: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -12 },
    shadowOpacity: 0.75,
    shadowRadius: 300,
    elevation: 50,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: getResponsiveSpacing(14),
    paddingHorizontal: getResponsiveSpacing(16),
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  closeButton: {
    padding: getResponsiveSpacing(8),
  },
  formulaItem: {
    paddingVertical: getResponsiveSpacing(14),
    paddingHorizontal: getResponsiveSpacing(16),
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
  activeFormulaText: {
    color: COLORS.primary,
    fontWeight: "bold",
  },
  premiumFormulaText: {
    color: "#666",
  },
  formulaItemDescription: {
    flex: 1,
    fontSize: getResponsiveTypography("xs"),
    color: "#666",
  },
  premiumBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: getResponsiveSpacing(8),
    paddingVertical: getResponsiveSpacing(4),
    borderRadius: 12,
    marginLeft: getResponsiveSpacing(8),
  },
  premiumBadgeText: {
    fontSize: getResponsiveFontSize(10),
    fontWeight: "bold",
    color: "#666",
    marginLeft: getResponsiveSpacing(4),
  },
  measurementIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: getResponsiveSpacing(8),
    marginTop: getResponsiveSpacing(8),
    opacity: 0.6,
  },
  formulaItemName: {
    fontSize: getResponsiveFontSize(16),
    color: COLORS.textDark,
    flex: 1,
  },
  accuracyInfoWrapper: {
    backgroundColor: COLORS.white,
    marginBottom: getResponsiveSpacing(16),
  },
  accuracyInfo: {
    padding: getResponsiveSpacing(16),
    paddingTop: getResponsiveSpacing(20),
    backgroundColor: COLORS.white,
  },
  accuracyInfoTitle: {
    fontSize: getResponsiveFontSize(14),
    fontWeight: "bold",
    color: COLORS.textDark,
    marginBottom: getResponsiveSpacing(12),
    textAlign: "center",
  },
  accuracyLevels: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: getResponsiveSpacing(8),
    marginBottom: getResponsiveSpacing(12),
  },
  accuracyLevel: {
    flexDirection: "row",
    alignItems: "center",
    gap: getResponsiveSpacing(4),
  },
  accuracyDot: {
    width: getResponsiveSpacing(8),
    height: getResponsiveSpacing(8),
    borderRadius: getResponsiveSpacing(4),
  },
  accuracyText: {
    fontSize: getResponsiveTypography("xs"),
    color: "#666",
  },
  accuracyNote: {
    fontSize: getResponsiveTypography("xs"),
    color: "#666",
    textAlign: "center",
    fontStyle: "italic",
  },
  formulaMetadata: {
    flexDirection: "row",
    alignItems: "center",
  },
  accuracyIndicator: {
    width: getResponsiveSpacing(8),
    height: getResponsiveSpacing(8),
    borderRadius: getResponsiveSpacing(4),
    marginRight: getResponsiveSpacing(6),
  },
  formulaList: {
    flex: 1,
  },
  selectorHint: {
    color: COLORS.text,
    fontSize: getResponsiveTypography("xs"),
    opacity: 0.6,
    textAlign: "left",
    textTransform: "uppercase",
    letterSpacing: 1,
    fontWeight: "bold",
  },
  chevronContainer: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: getResponsiveSpacing(8),
    paddingHorizontal: getResponsiveSpacing(4),
    paddingTop: getResponsiveSpacing(4),
    paddingBottom: getResponsiveSpacing(2),
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: getResponsiveTypography("sm"),
    color: COLORS.textDark,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
