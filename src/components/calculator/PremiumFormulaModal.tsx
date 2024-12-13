import React, { useEffect } from "react";
import { View, Modal, StyleSheet } from "react-native";
import { Text, Button, Icon } from "@rneui/themed";
import { COLORS } from "../../constants/theme";
import Animated, {
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
  useSharedValue,
} from "react-native-reanimated";

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
  const rotation = useSharedValue("0deg");

  useEffect(() => {
    if (visible) {
      // Reset and start animation when modal becomes visible
      rotation.value = "0deg";
      rotation.value = withDelay(
        300, // Delay to ensure modal is fully mounted
        withSpring("5deg", {
          damping: 12,
          stiffness: 100,
        })
      );
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: rotation.value }],
  }));

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
                <Icon name="activity" type="feather" color={COLORS.primary} size={20} />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Skinfold Methods</Text>
                <Text style={styles.featureDescription}>Professional measurement techniques</Text>
              </View>
            </View>
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
                <Icon name="sliders" type="feather" color={COLORS.primary} size={20} />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Decimal Precision</Text>
                <Text style={styles.featureDescription}>
                  Get exact measurements to&nbsp;2&nbsp;decimal places
                </Text>
              </View>
            </View>

            <View style={styles.feature}>
              <View style={styles.featureIconContainer}>
                <Icon name="users" type="feather" color={COLORS.primary} size={20} />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Family Sharing</Text>
                <Text style={styles.featureDescription}>Share with up to 5 family members</Text>
              </View>
            </View>
          </View>

          <View style={styles.ctaContainer}>
            <Animated.Text style={[styles.lifetimeBadge, animatedStyle]}>
              LIFETIME ACCESS
            </Animated.Text>

            <Button
              title={isProcessing ? "Processing..." : "Upgrade to PRO"}
              buttonStyle={styles.upgradeButton}
              titleStyle={styles.upgradeButtonText}
              onPress={onUpgrade}
              disabled={isProcessing}
            />

            <Text style={styles.lifetimeText}>One-time purchase • No subscription</Text>

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
    marginBottom: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 56,
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
  lifetimeBadge: {
    color: COLORS.primary,
    backgroundColor: `${COLORS.primary}15`,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    fontSize: 11,
    letterSpacing: 0.75,
    alignSelf: "flex-end",
    marginBottom: -2,
  },
  lifetimeText: {
    alignItems: "center",
    marginBottom: 16,
    fontSize: 12,
    color: "#666",
    fontFamily: "Montserrat-Light",
  },
  modalTitle: {
    fontSize: 24,
    marginTop: 24,
    color: COLORS.textDark,
    fontFamily: "Montserrat-Regular",
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
    paddingHorizontal: 40,
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
    paddingTop: 0,
    marginTop: -12,
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
    fontSize: 18,
    fontWeight: "bold",
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 15,
  },
});
