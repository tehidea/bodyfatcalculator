import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Modal, FlatList, Alert } from "react-native";
import { Text, Icon, Button } from "@rneui/themed";
import { useCalculatorStore } from "../../store/calculatorStore";
import { usePremiumStore } from "../../store/premiumStore";
import { Formula } from "../../types/calculator";
import { FORMULA_REQUIREMENTS } from "../../constants/formulas";
import { COLORS } from "../../constants/theme";
import { purchasePremium } from "../../config/store";
import { SkinfoldIcon } from "../icons/SkinfoldIcon";
import { BodyWeightScalesIcon } from "../icons/BodyWeightScalesIcon";
import { CalendarIcon } from "../icons/CalendarIcon";
import { MeasurementVerticalIcon } from "../icons/MeasurementVerticalIcon";
import { MeasuringTapeIcon } from "../icons/MeasuringTapeIcon";
import { getMarginOfError } from "../../utils/accuracy";

export const MeasurementIcon = ({ type, color }: { type: string; color: string }) => {
  switch (type) {
    case "weight":
      return <BodyWeightScalesIcon size={12} color={color} />;
    case "circumference":
      return <MeasuringTapeIcon size={12} color={color} />;
    case "skinfold":
      return <SkinfoldIcon size={12} color={color} />;
    case "height":
      return <MeasurementVerticalIcon size={12} color={color} />;
    case "age":
      return <CalendarIcon size={12} color={color} />;
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
  const { isPremium, isLoading, checkPremiumStatus, setPremiumStatus } = usePremiumStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPremiumModalVisible, setIsPremiumModalVisible] = useState(false);
  const [purchaseLoading, setPurchaseLoading] = useState(false);

  useEffect(() => {
    // TODO: Re-enable when premium features are ready
    // checkPremiumStatus();
  }, []);

  const formulas = Object.entries(FORMULA_REQUIREMENTS).map(([key, value]) => ({
    key: key as Formula,
    name: value.name,
    description: value.description,
    premium: value.premium,
  }));

  const selectedFormula = FORMULA_REQUIREMENTS[formula];

  const handleFormulaSelect = (selectedKey: Formula, isPremiumFormula: boolean | undefined) => {
    if (!isPremiumFormula || isPremium) {
      setFormula(selectedKey);
      setIsModalVisible(false);
    } else {
      setIsPremiumModalVisible(true);
    }
  };

  const handlePurchase = async () => {
    setPurchaseLoading(true);
    try {
      const success = await purchasePremium();
      if (success) {
        setPremiumStatus(true);
        setIsPremiumModalVisible(false);
        setIsModalVisible(false);
        Alert.alert(
          "Success!",
          "Thank you for upgrading! You now have access to all PRO formulas.",
          [{ text: "OK" }]
        );
      }
    } catch (error) {
      Alert.alert(
        "Purchase Failed",
        "There was an error processing your purchase. Please try again.",
        [{ text: "OK" }]
      );
    } finally {
      setPurchaseLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.selector} onPress={() => setIsModalVisible(true)}>
        <View style={styles.selectedFormula}>
          <Text style={styles.formulaName}>{selectedFormula.name}</Text>
          {selectedFormula.premium && !isPremium && (
            <View style={styles.premiumBadge}>
              <Icon name="lock" type="feather" color="#666" size={14} />
              <Text style={styles.premiumBadgeText}>PRO</Text>
            </View>
          )}
          <Icon name="chevron-down" type="feather" color={COLORS.text} size={20} />
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {selectedFormula.description}
        </Text>
        <View style={styles.measurementIcons}>
          {getMeasurementTypes(selectedFormula.fields).map(type => (
            <MeasurementIcon key={type} type={type} color="#fff" />
          ))}
        </View>
      </TouchableOpacity>

      {/* Formula Selection Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Formula</Text>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Icon name="x" type="feather" color={COLORS.textDark} size={24} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={formulas}
              keyExtractor={item => item.key}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.formulaItem,
                    item.key === formula && styles.activeFormula,
                    item.premium && !isPremium && styles.premiumFormula,
                  ]}
                  onPress={() => handleFormulaSelect(item.key, item.premium && !isPremium)}
                >
                  <View style={styles.formulaItemHeader}>
                    <Text
                      style={[
                        styles.formulaItemName,
                        item.key === formula && styles.activeFormulaText,
                        item.premium && !isPremium && styles.premiumFormulaText,
                      ]}
                    >
                      {item.name}
                    </Text>
                    {item.premium && !isPremium && (
                      <View style={styles.premiumBadge}>
                        <Icon name="lock" type="feather" color="#666" size={14} />
                        <Text style={styles.premiumBadgeText}>PRO</Text>
                      </View>
                    )}
                  </View>
                  <Text
                    style={[
                      styles.formulaItemDescription,
                      item.premium && !isPremium && styles.premiumFormulaText,
                    ]}
                    numberOfLines={2}
                  >
                    {item.description}
                    {item.premium && !isPremium ? "" : ` (±${getMarginOfError(item.key)})`}
                  </Text>
                  <View style={styles.measurementIcons}>
                    {getMeasurementTypes(FORMULA_REQUIREMENTS[item.key].fields).map(type => (
                      <MeasurementIcon key={type} type={type} color="#666" />
                    ))}
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Premium Feature Modal */}
      <Modal
        visible={isPremiumModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsPremiumModalVisible(false)}
      >
        <View style={styles.premiumModalContainer}>
          <View style={styles.premiumModalContent}>
            <Icon name="lock" type="feather" color={COLORS.primary} size={48} />
            <Text style={styles.premiumModalTitle}>PRO Feature</Text>
            <Text style={styles.premiumModalDescription}>
              Upgrade to PRO to unlock advanced formulas with higher accuracy:
              {"\n\n"}• Research-grade formulas (±2.5-4% margin of error)
              {"\n"}• Skinfold measurement methods for precision
              {"\n"}• Detailed measurement guides
              {"\n"}• 2 decimal places for all measurements
              {"\n"}• Sport-specific body fat ranges
            </Text>
            <Button
              title={purchaseLoading ? "Processing..." : "Upgrade to PRO"}
              buttonStyle={styles.upgradeButton}
              loading={purchaseLoading}
              disabled={purchaseLoading}
              onPress={handlePurchase}
            />
            <Button
              title="Maybe Later"
              type="clear"
              titleStyle={styles.cancelButtonText}
              onPress={() => setIsPremiumModalVisible(false)}
              disabled={purchaseLoading}
            />
          </View>
        </View>
      </Modal>
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
  },
  selectedFormula: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  formulaName: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    color: COLORS.text,
    fontSize: 12,
    marginTop: 4,
    opacity: 0.8,
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
  premiumModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
  },
  premiumModalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    width: "100%",
    maxWidth: 320,
  },
  premiumModalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.textDark,
    marginTop: 16,
    marginBottom: 8,
  },
  premiumModalDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },
  upgradeButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingHorizontal: 32,
    paddingVertical: 12,
    marginBottom: 8,
  },
  cancelButtonText: {
    color: "#666",
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
});
