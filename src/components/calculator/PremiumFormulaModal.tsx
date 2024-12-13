import React from "react";
import { View, Modal, StyleSheet } from "react-native";
import { Text, Button, Icon } from "@rneui/themed";
import { COLORS } from "../../constants/theme";

interface PremiumFormulaModalProps {
  visible: boolean;
  isProcessing: boolean;
  onUpgrade: () => void;
  onClose: () => void;
}

export function PremiumFormulaModal({
  visible,
  isProcessing,
  onUpgrade,
  onClose,
}: PremiumFormulaModalProps) {
  return (
    <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <View style={[styles.iconWrapper]}>
              <View style={styles.iconContainer}>
                <Icon name="lock" type="feather" color={COLORS.primary} size={32} />
              </View>
              <View style={styles.iconGlow} />
            </View>
            <Text style={styles.modalTitle}>
              <Text style={styles.highlight}>PRO</Text> Formulas{"\n"}
              <Text style={styles.titleSecondary}>Enhanced Accuracy & Precision</Text>
            </Text>
          </View>

          <View style={styles.featureList}>
            <View style={styles.feature}>
              <View style={styles.featureIconContainer}>
                <Icon name="percent" type="feather" color={COLORS.primary} size={20} />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Higher Accuracy</Text>
                <Text style={styles.featureDescription}>±2.5-4% margin of error range</Text>
              </View>
            </View>

            <View style={styles.feature}>
              <View style={styles.featureIconContainer}>
                <Icon name="book" type="feather" color={COLORS.primary} size={20} />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Research Methods</Text>
                <Text style={styles.featureDescription}>Scientifically validated formulas</Text>
              </View>
            </View>

            <View style={styles.feature}>
              <View style={styles.featureIconContainer}>
                <Icon name="target" type="feather" color={COLORS.primary} size={20} />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Sport-Specific</Text>
                <Text style={styles.featureDescription}>Formulas tailored to athletes</Text>
              </View>
            </View>

            <View style={styles.feature}>
              <View style={styles.featureIconContainer}>
                <Icon name="clipboard" type="feather" color={COLORS.primary} size={20} />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Detailed Guides</Text>
                <Text style={styles.featureDescription}>Step-by-step measurement instructions</Text>
              </View>
            </View>
          </View>

          <View style={styles.ctaContainer}>
            <Button
              title={isProcessing ? "Processing..." : "Upgrade to PRO"}
              buttonStyle={styles.upgradeButton}
              titleStyle={styles.upgradeButtonText}
              onPress={onUpgrade}
              disabled={isProcessing}
            />
            <Button
              title="Maybe Later"
              type="clear"
              titleStyle={styles.cancelButtonText}
              onPress={onClose}
            />
          </View>
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
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 20,
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 28,
    width: "100%",
    maxWidth: 340,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    padding: 24,
    paddingTop: 36,
    paddingBottom: 32,
    alignItems: "center",
    backgroundColor: `${COLORS.primary}08`,
  },
  iconWrapper: {
    marginTop: 18,
    marginBottom: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  iconGlow: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: `${COLORS.primary}20`,
    transform: [{ scale: 1.2 }],
  },
  modalTitle: {
    fontSize: 24,
    marginTop: 12,
    color: COLORS.textDark,
    fontFamily: "Montserrat-Medium",
    textAlign: "center",
    lineHeight: 24,
  },
  highlight: {
    color: COLORS.primary,
    fontWeight: "bold",
  },
  titleSecondary: {
    fontSize: 16,
    color: "#666",
    fontFamily: "Montserrat-Light",
  },
  featureList: {
    padding: 24,
  },
  feature: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  featureIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: `${COLORS.primary}10`,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textDark,
    marginBottom: 2,
  },
  featureDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  ctaContainer: {
    padding: 24,
    paddingTop: 8,
    alignItems: "center",
  },
  upgradeButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingHorizontal: 32,
    paddingVertical: 16,
    width: "100%",
    marginBottom: 12,
  },
  upgradeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 15,
  },
});
