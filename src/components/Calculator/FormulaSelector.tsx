import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Modal, FlatList } from "react-native";
import { Text, Icon } from "@rneui/themed";
import { useCalculatorStore } from "../../store/calculatorStore";
import { Formula } from "../../types/calculator";
import { FORMULA_REQUIREMENTS } from "../../constants/formulas";
import { COLORS } from "../../constants/theme";

export const FormulaSelector = () => {
  const { formula, setFormula } = useCalculatorStore();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const formulas = Object.entries(FORMULA_REQUIREMENTS).map(([key, value]) => ({
    key: key as Formula,
    name: value.name,
    description: value.description,
  }));

  const selectedFormula = FORMULA_REQUIREMENTS[formula];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.selector} onPress={() => setIsModalVisible(true)}>
        <View style={styles.selectedFormula}>
          <Text style={styles.formulaName}>{selectedFormula.name}</Text>
          <Icon name="chevron-down" type="feather" color={COLORS.text} size={20} />
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {selectedFormula.description}
        </Text>
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
                  style={[styles.formulaItem, item.key === formula && styles.activeFormula]}
                  onPress={() => {
                    setFormula(item.key);
                    setIsModalVisible(false);
                  }}
                >
                  <Text
                    style={[
                      styles.formulaItemName,
                      item.key === formula && styles.activeFormulaText,
                    ]}
                  >
                    {item.name}
                  </Text>
                  <Text style={styles.formulaItemDescription} numberOfLines={2}>
                    {item.description}
                  </Text>
                </TouchableOpacity>
              )}
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
    borderRadius: 10,
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
    maxHeight: "80%",
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  activeFormula: {
    backgroundColor: COLORS.primary + "10",
  },
  formulaItemName: {
    fontSize: 16,
    color: COLORS.textDark,
    marginBottom: 4,
  },
  activeFormulaText: {
    color: COLORS.primary,
    fontWeight: "bold",
  },
  formulaItemDescription: {
    fontSize: 12,
    color: "#666",
  },
});
