import React from "react";
import { View, Modal, StyleSheet } from "react-native";
import { Text, Button, Icon } from "@rneui/themed";
import { COLORS } from "../../constants/theme";

interface ProUpgradeModalProps {
  visible: boolean;
  onUpgrade: () => void;
  onClose: () => void;
}

export function ProUpgradeModal({ visible, onUpgrade, onClose }: ProUpgradeModalProps) {
  return (
    <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Icon name="lock" type="feather" color={COLORS.primary} size={48} />
          <Text style={styles.modalTitle}>Unlock Decimal Precision</Text>
          <Text style={styles.modalDescription}>
            Upgrade to PRO to access decimal precision and get more accurate body fat calculations:
            {"\n\n"}• Decimal precision for all measurements
            {"\n"}• Advanced calculation formulas
            {"\n"}• Skinfold measurement methods
            {"\n"}• More accurate results
            {"\n"}• Family Sharing enabled
          </Text>
          <Button title="Upgrade to PRO" buttonStyle={styles.upgradeButton} onPress={onUpgrade} />
          <Button
            title="Maybe Later"
            type="clear"
            titleStyle={styles.cancelButtonText}
            onPress={onClose}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    width: "100%",
    maxWidth: 320,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.textDark,
    marginTop: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  modalDescription: {
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
});
