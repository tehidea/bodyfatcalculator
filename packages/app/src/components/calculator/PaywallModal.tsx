import { Button, Icon, Text } from '@rneui/themed'
import { useCallback, useEffect, useState } from 'react'
import { Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { COLORS } from '../../constants/theme'
import { usePaywall } from '../../hooks/usePaywall'
import { usePurchaseRestore } from '../../hooks/usePurchaseRestore'
import { usePremiumStore } from '../../store/premiumStore'
import { useResponsive } from '../../utils/responsiveContext'
import { PlanSelector } from '../paywall/PlanSelector'

const FEATURE_ICONS = {
  precision: ['sliders', 'trending-up', 'activity', 'users'] as const,
  formula: ['activity', 'percent', 'sliders', 'users'] as const,
}

const FEATURE_CONTENT = {
  precision: [
    {
      title: 'Decimal Precision',
      description: 'Get exact measurements to\u00A02\u00A0decimal places',
    },
    {
      title: 'Advanced Formulas',
      description: 'Research-grade calculation methods',
    },
    {
      title: 'Measurement History',
      description: 'Track your progress over time',
    },
    {
      title: 'Cloud Sync',
      description: 'Access your data across devices',
    },
  ],
  formula: [
    {
      title: 'Skinfold Methods',
      description: 'Professional measurement techniques',
    },
    {
      title: 'Higher Accuracy',
      description: '±2.5-4% margin of error range',
    },
    {
      title: 'Decimal Precision',
      description: 'Get exact measurements to\u00A02\u00A0decimal places',
    },
    {
      title: 'Progress Tracking',
      description: 'Visual graphs and trend analysis',
    },
  ],
}

interface PaywallModalProps {
  visible: boolean
  variant: 'precision' | 'formula'
  onClose: () => void
}

export function PaywallModal({ visible, variant, onClose }: PaywallModalProps) {
  const {
    isLegacyPro,
    isProcessing,
    packages,
    selectedPlan,
    setSelectedPlan,
    fetchOfferings,
    handlePurchase,
  } = usePaywall({
    onSuccess: () => onClose(),
    onCancel: () => onClose(),
    onError: () => onClose(),
  })

  const { isRestoring, handleRestore } = usePurchaseRestore()
  const isPremium = usePremiumStore((state) => state.isPremium)
  const [isClosing, setIsClosing] = useState(false)
  const { getResponsiveTypography, getLineHeight, deviceType } = useResponsive()

  const styles = createPaywallModalStyles(getResponsiveTypography, getLineHeight, deviceType)
  const scale = useSharedValue(0.95)
  const opacity = useSharedValue(0)
  const backdropOpacity = useSharedValue(0)

  useEffect(() => {
    if (visible) {
      scale.value = 0.95
      opacity.value = 0
      backdropOpacity.value = 0

      backdropOpacity.value = withTiming(1, { duration: 150 })
      scale.value = withSpring(1, { damping: 20, stiffness: 90 })
      opacity.value = withTiming(1, { duration: 200 })

      fetchOfferings()
    }
  }, [visible, backdropOpacity, opacity, scale, fetchOfferings])

  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }))

  const animatedBackdropStyle = useAnimatedStyle(() => ({
    backgroundColor: 'rgba(0,0,0,0.6)',
    opacity: backdropOpacity.value,
  }))

  const handleRestorePress = useCallback(async () => {
    const result = await handleRestore()
    if (result.success && result.wasUpgraded) {
      setIsClosing(true)
      setTimeout(() => {
        setIsClosing(false)
        onClose()
      }, 1500)
    }
  }, [handleRestore, onClose])

  const handleClose = useCallback(() => {
    if (isProcessing || isRestoring || isClosing) return
    onClose()
  }, [isProcessing, isRestoring, isClosing, onClose])

  const handleContinue = useCallback(() => {
    if (isProcessing || isRestoring || isClosing) return
    handlePurchase()
  }, [isProcessing, isRestoring, isClosing, handlePurchase])

  if (!visible) return null

  const features = FEATURE_CONTENT[variant]
  const icons = FEATURE_ICONS[variant]

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
            <View style={styles.iconWrapper}>
              <Animated.View entering={FadeIn.duration(600)} style={styles.iconContainer}>
                <Icon name="star" type="feather" color={COLORS.primary} size={32} />
              </Animated.View>
              <View style={styles.iconGlow} />
            </View>

            <Text style={styles.modalTitle}>
              <Text style={styles.highlight}>Premium</Text>{' '}
              {variant === 'precision' ? 'Precision' : 'Formulas'}
              {'\n'}
              <Text style={styles.titleSecondary}>
                {variant === 'precision'
                  ? 'Unlock Your Full Potential'
                  : 'Enhanced Accuracy & Precision'}
              </Text>
            </Text>
          </View>

          <View style={styles.featureList}>
            {features.map((feature, index) => (
              <Animated.View
                key={feature.title}
                entering={FadeIn.delay(300 + index * 50).duration(400)}
                style={styles.feature}
              >
                <View style={styles.featureIconContainer}>
                  <Icon
                    name={icons[index % icons.length] as string}
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
            <PlanSelector
              selectedPlan={selectedPlan}
              onSelectPlan={setSelectedPlan}
              isLegacyPro={isLegacyPro}
              packages={packages}
            />

            <Button
              title={isProcessing ? 'Processing...' : 'Continue'}
              buttonStyle={styles.upgradeButton}
              titleStyle={styles.upgradeButtonText}
              onPress={handleContinue}
              disabled={isProcessing || isRestoring || isClosing}
              loading={isProcessing}
            />

            <View style={styles.secondaryButtonsContainer}>
              <Button
                title="Maybe Later"
                type="clear"
                titleStyle={styles.secondaryButtonText}
                onPress={handleClose}
                disabled={isProcessing || isRestoring || isClosing}
                containerStyle={styles.secondaryButtonContainer}
                icon={{
                  name: 'corner-up-left',
                  type: 'feather',
                  size: 16,
                  color: `${COLORS.textLight}80`,
                }}
                iconPosition="left"
              />

              {!isPremium && (
                <Button
                  title="Restore Purchases"
                  type="clear"
                  loading={isRestoring}
                  disabled={isProcessing || isRestoring || isClosing}
                  onPress={handleRestorePress}
                  titleStyle={styles.secondaryButtonText}
                  icon={{
                    name: 'refresh-ccw',
                    type: 'feather',
                    size: 16,
                    color: `${COLORS.textLight}80`,
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
  )
}

const BASE_MODAL_WIDTH = 360

function getModalMaxWidth(deviceType: string): number {
  if (deviceType === 'desktop' || deviceType === 'tablet') {
    return BASE_MODAL_WIDTH * 1.5
  }
  return BASE_MODAL_WIDTH
}

const createPaywallModalStyles = (
  getResponsiveTypography: (size: any) => number,
  getLineHeight: (size: any) => number,
  deviceType: string,
) =>
  StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    backdrop: {
      ...StyleSheet.absoluteFillObject,
    },
    modalContent: {
      backgroundColor: COLORS.white,
      borderRadius: 28,
      width: '100%',
      maxWidth: getModalMaxWidth(deviceType),
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
      margin: 20,
      maxHeight: '90%',
    },
    closeButton: {
      position: 'absolute',
      top: 12,
      right: 12,
      zIndex: 1,
      padding: 8,
      opacity: 0.6,
    },
    header: {
      padding: 24,
      paddingTop: 36,
      paddingBottom: 20,
      alignItems: 'center',
      backgroundColor: `${COLORS.primary}08`,
    },
    iconWrapper: {
      marginTop: 18,
      marginBottom: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconContainer: {
      backgroundColor: COLORS.white,
      borderRadius: 56,
      width: 56,
      height: 56,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: COLORS.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
    iconGlow: {
      position: 'absolute',
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: `${COLORS.primary}20`,
      transform: [{ scale: 1.2 }],
    },
    modalTitle: {
      fontSize: 24,
      marginTop: 16,
      color: COLORS.textDark,
      fontFamily: 'Montserrat-Regular',
      textAlign: 'center',
      lineHeight: 24,
    },
    highlight: {
      color: COLORS.primary,
      fontWeight: 'bold',
    },
    titleSecondary: {
      fontSize: 16,
      color: '#666',
      fontFamily: 'Montserrat-Light',
    },
    featureList: {
      padding: 20,
      paddingHorizontal: 32,
    },
    feature: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    featureIconContainer: {
      width: 36,
      height: 36,
      borderRadius: 10,
      backgroundColor: `${COLORS.primary}10`,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    featureContent: {
      flex: 1,
    },
    featureTitle: {
      fontSize: 15,
      fontWeight: '600',
      color: COLORS.textDark,
      marginBottom: 1,
    },
    featureDescription: {
      fontSize: getResponsiveTypography('sm'),
      lineHeight: getLineHeight('sm'),
      color: '#666',
    },
    ctaContainer: {
      padding: 20,
      paddingTop: 0,
    },
    upgradeButton: {
      backgroundColor: COLORS.primary,
      borderRadius: 16,
      paddingVertical: 16,
      marginTop: 16,
    },
    upgradeButtonText: {
      fontSize: getResponsiveTypography('lg'),
      lineHeight: getLineHeight('lg'),
      fontWeight: 'bold',
    },
    secondaryButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 16,
      marginTop: 8,
    },
    secondaryButtonContainer: {
      minWidth: 120,
    },
    secondaryButtonText: {
      color: `${COLORS.textLight}80`,
      fontSize: getResponsiveTypography('xs'),
      lineHeight: getLineHeight('xs'),
      fontWeight: '600',
    },
  })
