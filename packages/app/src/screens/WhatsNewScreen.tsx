import { Icon, Text } from '@rneui/themed'
import { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BrandHeader } from '../components/BrandHeader'
import { PaywallModal } from '../components/calculator/PaywallModal'
import { COLORS } from '../constants/theme'
import { CHANGELOG } from '../data/changelog'
import { useCollapsibleHeader } from '../hooks/useCollapsibleHeader'
import { usePremiumStore } from '../store/premiumStore'
import { useResponsive } from '../utils/responsiveContext'

export function WhatsNewScreen({ navigation }: { navigation: any }) {
  const isLegacyPro = usePremiumStore((state) => state.isLegacyPro)
  const [showPaywall, setShowPaywall] = useState(false)
  const { scrollY, scrollHandler } = useCollapsibleHeader()
  const { getResponsiveSpacing, getResponsiveTypography, getLineHeight } = useResponsive()
  const styles = createStyles(getResponsiveSpacing, getResponsiveTypography, getLineHeight)

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.innerContainer}>
        <BrandHeader
          title="What's New"
          variant="compact"
          scrollY={scrollY}
          leftElement={
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Icon name="arrow-left" type="feather" color={COLORS.textDark} size={20} />
              <Text style={styles.backText}>Settings</Text>
            </TouchableOpacity>
          }
        />

        <Animated.ScrollView
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {CHANGELOG.map((entry) => (
            <View key={entry.version} style={styles.versionSection}>
              <View style={styles.versionHeader}>
                <View style={styles.versionBadge}>
                  <Text style={styles.versionBadgeText}>{entry.version}</Text>
                </View>
                <Text style={styles.versionDate}>{entry.date}</Text>
              </View>
              <Text style={styles.versionTitle}>{entry.title}</Text>

              <View style={styles.highlightList}>
                {entry.highlights.map((highlight) => (
                  <View key={highlight.title} style={styles.highlightRow}>
                    <View style={styles.highlightIconContainer}>
                      <Icon name={highlight.icon} type="feather" color={COLORS.primary} size={16} />
                    </View>
                    <View style={styles.highlightContent}>
                      <Text style={styles.highlightTitle}>{highlight.title}</Text>
                      <Text style={styles.highlightDescription}>{highlight.description}</Text>
                    </View>
                  </View>
                ))}
              </View>

              {isLegacyPro && entry.legacyProInfo && (
                <View style={styles.legacyProSection}>
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

                  <TouchableOpacity
                    style={styles.legacyProCtaButton}
                    onPress={() => setShowPaywall(true)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.legacyProCtaText}>{entry.legacyProInfo.cta}</Text>
                    <Icon name="chevron-right" type="feather" size={14} color={COLORS.white} />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
        </Animated.ScrollView>
        <PaywallModal
          visible={showPaywall}
          variant="precision"
          onClose={() => setShowPaywall(false)}
        />
      </View>
    </SafeAreaView>
  )
}

const createStyles = (
  getResponsiveSpacing: (base: number) => number,
  getResponsiveTypography: (size: any) => number,
  getLineHeight: (size: any) => number,
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
    },
    innerContainer: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: getResponsiveSpacing(6),
    },
    backText: {
      color: COLORS.textDark,
      fontSize: getResponsiveTypography('sm'),
      lineHeight: getLineHeight('sm'),
    },
    content: {
      padding: getResponsiveSpacing(16),
      gap: getResponsiveSpacing(16),
    },
    versionSection: {
      backgroundColor: COLORS.white,
      borderRadius: 12,
      padding: getResponsiveSpacing(16),
    },
    versionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: getResponsiveSpacing(10),
      marginBottom: getResponsiveSpacing(8),
    },
    versionBadge: {
      backgroundColor: COLORS.primary,
      borderRadius: 6,
      paddingHorizontal: getResponsiveSpacing(8),
      paddingVertical: getResponsiveSpacing(3),
    },
    versionBadgeText: {
      color: COLORS.white,
      fontSize: getResponsiveTypography('xs'),
      lineHeight: getLineHeight('xs'),
      fontWeight: '700',
    },
    versionDate: {
      color: '#999',
      fontSize: getResponsiveTypography('xs'),
      lineHeight: getLineHeight('xs'),
    },
    versionTitle: {
      fontSize: getResponsiveTypography('lg'),
      lineHeight: getLineHeight('lg'),
      fontWeight: '700',
      color: COLORS.textDark,
      marginBottom: getResponsiveSpacing(12),
    },
    highlightList: {
      gap: getResponsiveSpacing(8),
    },
    highlightRow: {
      flexDirection: 'row',
      alignItems: 'center',
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
      fontSize: getResponsiveTypography('md'),
      lineHeight: getLineHeight('md'),
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
      marginTop: getResponsiveSpacing(12),
      padding: getResponsiveSpacing(12),
      backgroundColor: `${COLORS.success}08`,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: `${COLORS.success}20`,
      gap: getResponsiveSpacing(10),
    },
    legacyProMessage: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: getResponsiveSpacing(8),
    },
    legacyProMessageText: {
      flex: 1,
      fontSize: getResponsiveTypography('sm'),
      lineHeight: getLineHeight('sm'),
      color: '#555',
    },
    comparisonTable: {
      borderRadius: 8,
      overflow: 'hidden',
    },
    comparisonHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: getResponsiveSpacing(6),
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: `${COLORS.success}30`,
    },
    comparisonHeaderText: {
      fontSize: getResponsiveTypography('xs'),
      lineHeight: getLineHeight('xs'),
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
      paddingVertical: getResponsiveSpacing(4),
    },
    comparisonCell: {
      width: 60,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
    },
    comparisonFeatureCell: {
      flex: 1,
      fontSize: getResponsiveTypography('sm'),
      lineHeight: getLineHeight('sm'),
      color: '#666',
    },
    legacyProCtaButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: COLORS.primary,
      borderRadius: 8,
      paddingVertical: getResponsiveSpacing(8),
      paddingHorizontal: getResponsiveSpacing(12),
      gap: 4,
    },
    legacyProCtaText: {
      fontSize: getResponsiveTypography('sm'),
      lineHeight: getLineHeight('sm'),
      color: COLORS.white,
      fontWeight: '600',
      textAlign: 'center',
      flex: 1,
    },
  })
