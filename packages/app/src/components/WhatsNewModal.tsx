import { Button, Icon, Text } from '@rneui/themed'
import { useCallback, useEffect } from 'react'
import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { COLORS } from '../constants/theme'
import type { ChangelogEntry } from '../data/changelog'
import { usePremiumStore } from '../store/premiumStore'
import { useResponsive } from '../utils/responsiveContext'

interface WhatsNewModalProps {
  visible: boolean
  entry: ChangelogEntry | null
  onClose: () => void
}

export function WhatsNewModal({ visible, entry, onClose }: WhatsNewModalProps) {
  const isLegacyPro = usePremiumStore((state) => state.isLegacyPro)
  const { getResponsiveTypography, getLineHeight, getResponsiveSpacing, deviceType } =
    useResponsive()
  const styles = createStyles(
    getResponsiveTypography,
    getLineHeight,
    getResponsiveSpacing,
    deviceType,
  )

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
    }
  }, [visible, backdropOpacity, opacity, scale])

  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }))

  const animatedBackdropStyle = useAnimatedStyle(() => ({
    backgroundColor: 'rgba(0,0,0,0.6)',
    opacity: backdropOpacity.value,
  }))

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  if (!visible || !entry) return null

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

          <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
            <View style={styles.header}>
              <View style={styles.iconWrapper}>
                <Animated.View entering={FadeIn.duration(600)} style={styles.iconContainer}>
                  <Icon name="gift" type="feather" color={COLORS.primary} size={24} />
                </Animated.View>
                <View style={styles.iconGlow} />
              </View>

              <Text style={styles.modalTitle}>
                <Text style={styles.highlight}>What's New</Text> in {entry.version}
              </Text>
              <Text style={styles.titleSecondary}>{entry.title}</Text>
            </View>

            <View style={styles.highlightList}>
              {entry.highlights.map((highlight, index) => (
                <Animated.View
                  key={highlight.title}
                  entering={FadeIn.delay(300 + index * 50).duration(400)}
                  style={styles.highlightRow}
                >
                  <View style={styles.highlightIconContainer}>
                    <Icon name={highlight.icon} type="feather" color={COLORS.primary} size={16} />
                  </View>
                  <View style={styles.highlightContent}>
                    <Text style={styles.highlightTitle}>{highlight.title}</Text>
                    <Text style={styles.highlightDescription}>{highlight.description}</Text>
                  </View>
                </Animated.View>
              ))}
            </View>

            {isLegacyPro && entry.legacyProInfo && (
              <Animated.View
                entering={FadeIn.delay(300 + entry.highlights.length * 50).duration(400)}
                style={styles.legacyProSection}
              >
                <View style={styles.legacyProMessage}>
                  <Icon name="award" type="feather" color={COLORS.success} size={16} />
                  <Text style={styles.legacyProMessageText}>{entry.legacyProInfo.message}</Text>
                </View>

                <View style={styles.comparisonTable}>
                  <View style={styles.comparisonHeader}>
                    <Text style={[styles.comparisonCell, styles.comparisonFeatureCell]} />
                    <Text style={[styles.comparisonCell, styles.comparisonHeaderText]}>PRO</Text>
                    <Text
                      style={[
                        styles.comparisonCell,
                        styles.comparisonHeaderText,
                        styles.comparisonPremiumHeader,
                      ]}
                    >
                      PRO+
                    </Text>
                  </View>
                  {entry.legacyProInfo.comparison.map((row) => (
                    <View key={row.feature} style={styles.comparisonRow}>
                      <Text style={[styles.comparisonCell, styles.comparisonFeatureCell]}>
                        {row.feature}
                      </Text>
                      <View style={styles.comparisonCell}>
                        <Icon
                          name={row.pro ? 'check' : 'minus'}
                          type="feather"
                          size={14}
                          color={row.pro ? COLORS.success : '#ccc'}
                        />
                      </View>
                      <View style={styles.comparisonCell}>
                        <Icon name="check" type="feather" size={14} color={COLORS.success} />
                      </View>
                    </View>
                  ))}
                </View>

                <Text style={styles.legacyProCta}>{entry.legacyProInfo.cta}</Text>
              </Animated.View>
            )}

            <Animated.View entering={FadeIn.delay(500).duration(400)} style={styles.ctaContainer}>
              <Button
                title="Got it"
                buttonStyle={styles.gotItButton}
                titleStyle={styles.gotItButtonText}
                onPress={handleClose}
              />
            </Animated.View>
          </ScrollView>
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

const createStyles = (
  getResponsiveTypography: (size: any) => number,
  getLineHeight: (size: any) => number,
  getResponsiveSpacing: (base: number) => number,
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
      paddingTop: 28,
      paddingBottom: 14,
      alignItems: 'center',
      backgroundColor: `${COLORS.primary}08`,
    },
    iconWrapper: {
      marginTop: 8,
      marginBottom: 14,
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconContainer: {
      backgroundColor: COLORS.white,
      borderRadius: 22,
      width: 44,
      height: 44,
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
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: `${COLORS.primary}20`,
      transform: [{ scale: 1.2 }],
    },
    modalTitle: {
      fontSize: 24,
      marginTop: 10,
      color: COLORS.textDark,
      fontFamily: 'Montserrat-Regular',
      textAlign: 'center',
    },
    highlight: {
      color: COLORS.primary,
      fontWeight: 'bold',
    },
    titleSecondary: {
      fontSize: 16,
      marginTop: 2,
      color: '#666',
      fontFamily: 'Montserrat-Light',
      textAlign: 'center',
    },
    highlightList: {
      padding: 14,
      paddingHorizontal: 12 + getResponsiveSpacing(16),
    },
    highlightRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    highlightIconContainer: {
      width: 30,
      height: 30,
      borderRadius: 8,
      backgroundColor: `${COLORS.primary}10`,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: getResponsiveSpacing(12),
    },
    highlightContent: {
      flex: 1,
    },
    highlightTitle: {
      fontSize: 15,
      fontWeight: '600',
      color: COLORS.textDark,
      marginBottom: 1,
    },
    highlightDescription: {
      fontSize: getResponsiveTypography('sm'),
      lineHeight: getLineHeight('sm'),
      color: '#666',
    },
    legacyProSection: {
      marginHorizontal: 12 + getResponsiveSpacing(16),
      marginBottom: 4,
      padding: getResponsiveSpacing(10),
      backgroundColor: `${COLORS.success}08`,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: `${COLORS.success}20`,
      gap: getResponsiveSpacing(8),
    },
    legacyProMessage: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: getResponsiveSpacing(8),
    },
    legacyProMessageText: {
      flex: 1,
      fontSize: getResponsiveTypography('xs'),
      lineHeight: getLineHeight('xs'),
      color: '#555',
    },
    comparisonTable: {
      borderRadius: 8,
      overflow: 'hidden',
    },
    comparisonHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: getResponsiveSpacing(4),
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: `${COLORS.success}30`,
    },
    comparisonHeaderText: {
      fontSize: getResponsiveTypography('xxs'),
      lineHeight: getLineHeight('xxs'),
      fontWeight: '700',
      color: '#555',
      textAlign: 'center',
    },
    comparisonPremiumHeader: {
      color: COLORS.primary,
    },
    comparisonRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: getResponsiveSpacing(3),
    },
    comparisonCell: {
      width: 52,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
    },
    comparisonFeatureCell: {
      flex: 1,
      fontSize: getResponsiveTypography('xxs'),
      lineHeight: getLineHeight('xxs'),
      color: '#666',
    },
    legacyProCta: {
      fontSize: getResponsiveTypography('xxs'),
      lineHeight: getLineHeight('xxs'),
      color: COLORS.primary,
      fontWeight: '600',
      textAlign: 'center',
    },
    ctaContainer: {
      padding: 20,
      paddingTop: 6,
    },
    gotItButton: {
      backgroundColor: COLORS.primary,
      borderRadius: 16,
      paddingVertical: 14,
    },
    gotItButtonText: {
      fontSize: getResponsiveTypography('lg'),
      lineHeight: getLineHeight('lg'),
      fontWeight: 'bold',
    },
  })
