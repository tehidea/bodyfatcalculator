import React, { useEffect, useState, useCallback } from "react";
import { View, Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { Text, Button, Icon } from "@rneui/themed";
import { COLORS } from "../../constants/theme";
import Animated, {
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
  useSharedValue,
  FadeIn,
} from "react-native-reanimated";
import { usePurchaseRestore } from "../../hooks/usePurchaseRestore";
import { usePremiumStore } from "../../store/premiumStore";
import { getLineHeight, getResponsiveTypography } from "../../utils/device";

const FEATURE_ICONS = {
  pro: ["sliders", "trending-up", "activity", "users"] as const,
  formula: ["activity", "percent", "sliders", "users"] as const,
};

const FEATURE_CONTENT = {
  pro: [
    {
      title: "Decimal Precision",
      description: "Get exact measurements to 2 decimal places",
    },
    {
      title: "Advanced Formulas",
      description: "Research-grade calculation methods",
    },
    {
      title: "Skinfold Methods",
      description: "Professional measurement techniques",
    },
    {
      title: "Family Sharing",
      description: "Share with up to 5 family members",
    },
  ],
  formula: [
    {
      title: "Skinfold Methods",
      description: "Professional measurement techniques",
    },
    {
      title: "Higher Accuracy",
      description: "±2.5-4% margin of error range",
    },
    {
      title: "Decimal Precision",
      description: "Get exact measurements to 2 decimal places",
    },
    {
      title: "Family Sharing",
      description: "Share with up to 5 family members",
    },
  ],
};

interface UpgradeModalProps {
  visible: boolean;
  isProcessing: boolean;
  variant: "pro" | "formula";
  onUpgrade: () => void;
  onClose: () => void;
}

export function UpgradeModal({
  visible,
  isProcessing,
  variant,
  onUpgrade,
  onClose,
}: UpgradeModalProps) {
  const { isRestoring, handleRestore } = usePurchaseRestore();
  const isPro = usePremiumStore(state => state.pro);
  const [isClosing, setIsClosing] = useState(false);
  const rotation = useSharedValue("0deg");
  const scale = useSharedValue(0.95);
  const opacity = useSharedValue(0);
  const backdropOpacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      // Reset values immediately
      scale.value = 0.95;
      opacity.value = 0;
      backdropOpacity.value = 0;
      rotation.value = "0deg";

      // Start animations
      backdropOpacity.value = withTiming(1, { duration: 150 });
      scale.value = withSpring(1, { damping: 20, stiffness: 90 });
      opacity.value = withTiming(1, { duration: 200 });
      rotation.value = withDelay(
        200,
        withSpring("5deg", {
          damping: 15,
          stiffness: 100,
        })
      );
    }
  }, [visible]);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const animatedBackdropStyle = useAnimatedStyle(() => ({
    backgroundColor: "rgba(0,0,0,0.6)",
    opacity: backdropOpacity.value,
  }));

  const animatedBadgeStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: rotation.value }],
  }));

  // Handle restore action
  const handleRestorePress = useCallback(async () => {
    const result = await handleRestore();

    if (result.success && result.wasUpgraded) {
      // If successfully upgraded, wait for alert to be seen
      setIsClosing(true);
      setTimeout(() => {
        setIsClosing(false);
        onClose();
      }, 1500);
    }
  }, [handleRestore, onClose]);

  // Handle modal close request
  const handleClose = useCallback(() => {
    if (isProcessing || isRestoring || isClosing) return;
    onClose();
  }, [isProcessing, isRestoring, isClosing, onClose]);

  // Handle upgrade action
  const handleUpgradePress = useCallback(() => {
    if (isProcessing || isRestoring || isClosing) return;
    onUpgrade();
  }, [isProcessing, isRestoring, isClosing, onUpgrade]);

  if (!visible) return null;

  const features = FEATURE_CONTENT[variant];
  const icons = FEATURE_ICONS[variant];

  return (
    <Modal visible={visible} transparent={true} onRequestClose={handleClose} animationType="none">
      <View style={styles.modalContainer}>
        <Animated.View style={[styles.backdrop, animatedBackdropStyle]}>
          <TouchableWithoutFeedback onPress={handleClose}>
            <View style={StyleSheet.absoluteFill} />
          </TouchableWithoutFeedback>
        </Animated.View>

        <Animated.View style={[styles.modalContent, animatedContainerStyle]}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleClose}
            hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <Icon name="x" type="feather" size={20} color="rgba(0,0,0,0.25)" />
          </TouchableOpacity>

          <View style={styles.header}>
            <View style={[styles.iconWrapper]}>
              <Animated.View entering={FadeIn.duration(600)} style={styles.iconContainer}>
                <Icon name="lock" type="feather" color={COLORS.primary} size={32} />
              </Animated.View>
              <View style={styles.iconGlow} />
            </View>

            <Text style={styles.modalTitle}>
              <Text style={styles.highlight}>PRO</Text>{" "}
              {variant === "pro" ? "Precision" : "Formulas"}
              {"\n"}
              <Text style={styles.titleSecondary}>
                {variant === "pro" ? "Unlock Your Full Potential" : "Enhanced Accuracy & Precision"}
              </Text>
            </Text>
          </View>

          <View style={styles.featureList}>
            {features.map((feature, index) => (
              <Animated.View
                key={index}
                entering={FadeIn.delay(300 + index * 50).duration(400)}
                style={styles.feature}
              >
                <View style={styles.featureIconContainer}>
                  <Icon
                    name={icons[index % icons.length]}
                    type="feather"
                    color={COLORS.primary}
                    size={20}
                  />
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </View>
              </Animated.View>
            ))}
          </View>

          <Animated.View entering={FadeIn.delay(500).duration(400)} style={styles.ctaContainer}>
            <Animated.Text style={[styles.lifetimeBadge, animatedBadgeStyle]}>
              LIFETIME ACCESS
            </Animated.Text>

            <Button
              title={isProcessing ? "Processing..." : "Upgrade to PRO"}
              buttonStyle={[styles.upgradeButton]}
              titleStyle={styles.upgradeButtonText}
              onPress={handleUpgradePress}
              disabled={isProcessing || isRestoring || isClosing}
            />

            <Text style={styles.lifetimeText}>One-time purchase • No subscription</Text>

            <View style={styles.secondaryButtonsContainer}>
              <Button
                title="Maybe Later"
                type="clear"
                titleStyle={styles.secondaryButtonText}
                onPress={handleClose}
                disabled={isProcessing || isRestoring || isClosing}
                containerStyle={styles.secondaryButtonContainer}
                icon={{
                  name: "corner-up-left",
                  type: "feather",
                  size: 16,
                  color: COLORS.textLight + "80",
                }}
                iconPosition="left"
              />

              {!isPro && (
                <Button
                  title="Restore Purchases"
                  type="clear"
                  loading={isRestoring}
                  disabled={isProcessing || isRestoring || isClosing}
                  onPress={handleRestorePress}
                  titleStyle={styles.secondaryButtonText}
                  icon={{
                    name: "refresh-ccw",
                    type: "feather",
                    size: 16,
                    color: COLORS.textLight + "80",
                  }}
                  iconPosition="left"
                  containerStyle={styles.secondaryButtonContainer}
                />
              )}
            </View>
          </Animated.View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
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
    margin: 20,
  },
  closeButton: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 1,
    padding: 8,
    opacity: 0.6,
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
    padding: 20,
    paddingHorizontal: 40,
  },
  feature: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
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
    fontSize: getResponsiveTypography("sm"),
    lineHeight: getLineHeight("sm"),
    color: "#666",
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
    paddingHorizontal: 48,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  upgradeButtonText: {
    fontSize: getResponsiveTypography("lg"),
    lineHeight: getLineHeight("lg"),
    fontWeight: "bold",
  },
  secondaryButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    marginTop: 8,
  },
  secondaryButtonContainer: {
    minWidth: 120,
  },
  secondaryButtonText: {
    color: COLORS.textLight + "80",
    fontSize: getResponsiveTypography("xs"),
    lineHeight: getLineHeight("xs"),
    fontWeight: "600",
  },
  buttonTitleFix: {
    textAlign: "center",
    textAlignVertical: "center",
    includeFontPadding: false,
    padding: 0,
  },
});
