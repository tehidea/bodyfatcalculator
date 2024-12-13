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
          <View style={styles.iconContainer}>
            <Icon name="lock" type="feather" color={COLORS.primary} size={48} />
          </View>
          <Text style={styles.modalTitle}>
            Unlock <Text style={styles.highlight}>Decimal{"\n"}Precision</Text>
          </Text>
          <Text style={styles.modalSubtitle}>Get more accurate body fat calculations</Text>
          <View style={styles.featureList}>
            <Text style={styles.featureTitle}>PRO Features:</Text>
            <View style={styles.feature}>
              <Icon
                name="check"
                type="feather"
                color={COLORS.success}
                size={16}
                style={styles.featureIcon}
              />
              <Text style={styles.featureText}>Decimal precision for all measurements</Text>
            </View>
            <View style={styles.feature}>
              <Icon
                name="check"
                type="feather"
                color={COLORS.success}
                size={16}
                style={styles.featureIcon}
              />
              <Text style={styles.featureText}>Advanced calculation formulas</Text>
            </View>
            <View style={styles.feature}>
              <Icon
                name="check"
                type="feather"
                color={COLORS.success}
                size={16}
                style={styles.featureIcon}
              />
              <Text style={styles.featureText}>Skinfold measurement methods</Text>
            </View>
            <View style={styles.feature}>
              <Icon
                name="check"
                type="feather"
                color={COLORS.success}
                size={16}
                style={styles.featureIcon}
              />
              <Text style={styles.featureText}>More accurate results</Text>
            </View>
            <View style={styles.feature}>
              <Icon
                name="check"
                type="feather"
                color={COLORS.success}
                size={16}
                style={styles.featureIcon}
              />
              <Text style={styles.featureText}>Family Sharing enabled</Text>
            </View>
          </View>
          <Button
            title="Upgrade to PRO"
            buttonStyle={styles.upgradeButton}
            titleStyle={styles.upgradeButtonText}
            onPress={onUpgrade}
          />
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
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    width: "100%",
    maxWidth: 320,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    backgroundColor: `${COLORS.primary}10`,
    borderRadius: 50,
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 28,
    color: COLORS.textDark,
    marginBottom: 8,
    textAlign: "center",
    lineHeight: 34,
  },
  highlight: {
    color: COLORS.primary,
    fontWeight: "bold",
  },
  modalSubtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
    textAlign: "center",
  },
  featureList: {
    alignSelf: "stretch",
    marginBottom: 24,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.textDark,
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  feature: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  featureIcon: {
    marginRight: 12,
  },
  featureText: {
    fontSize: 15,
    color: COLORS.textDark,
    flex: 1,
  },
  upgradeButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingHorizontal: 32,
    paddingVertical: 14,
    marginBottom: 8,
    width: "100%",
  },
  upgradeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 15,
  },
});
