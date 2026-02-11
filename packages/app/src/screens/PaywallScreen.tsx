import { useNavigation } from '@react-navigation/native'
import { Button, Icon, Text } from '@rneui/themed'
import { usePostHog } from 'posthog-react-native'
import { useEffect } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PlanSelector } from '../components/paywall/PlanSelector'
import { FEATURES } from '../constants/features'
import { COLORS } from '../constants/theme'
import { usePaywall } from '../hooks/usePaywall'
import { usePurchaseRestore } from '../hooks/usePurchaseRestore'
import { usePremiumStore } from '../store/premiumStore'
import { useResponsive } from '../utils/responsiveContext'

export const PaywallScreen = () => {
  const posthog = usePostHog()
  const navigation = useNavigation()
  const { isProPlus, isLegacyPro } = usePremiumStore()
  const { isRestoring, handleRestore } = usePurchaseRestore()
  const {
    isProcessing,
    isLoading,
    packages,
    selectedPlan,
    setSelectedPlan,
    fetchOfferings,
    handlePurchase,
  } = usePaywall({
    onSuccess: () => navigation.goBack(),
  })

  const { getResponsiveTypography, getLineHeight, getResponsiveSpacing } = useResponsive()
  const styles = createStyles(getResponsiveTypography, getLineHeight, getResponsiveSpacing)

  useEffect(() => {
    fetchOfferings()
  }, [fetchOfferings])

  const handleRestorePurchases = async () => {
    if (posthog) {
      posthog.capture('restore_purchases_tapped')
    }
    await handleRestore()
  }

  const renderFeature = ({ id, name, description, availability }: (typeof FEATURES)[0]) => {
    const isAvailable =
      availability === 'free' ||
      (availability === 'pro' && (isProPlus || isLegacyPro)) ||
      (availability === 'pro_plus' && isProPlus)

    return (
      <View key={id} style={styles.featureRow}>
        <View style={styles.featureInfo}>
          <Text style={styles.featureName}>{name}</Text>
          {description && <Text style={styles.featureDescription}>{description}</Text>}
        </View>
        <View style={styles.availabilityIndicator}>
          {isAvailable ? (
            <Icon name="check" type="feather" color={COLORS.primary} size={20} />
          ) : (
            <Icon name="lock" type="feather" color="#666" size={20} />
          )}
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 16, right: 16, bottom: 16, left: 16 }}
        >
          <Icon name="arrow-left" type="feather" color={COLORS.textDark} size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Go PRO+</Text>
          <Text style={styles.description}>
            Unlock advanced formulas, decimal precision, and measurement tracking
          </Text>
        </View>

        {/* Accuracy comparison */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Formula Accuracy</Text>
          <View style={styles.accuracyComparison}>
            <View style={styles.accuracyColumn}>
              <Text style={styles.planLabel}>FREE</Text>
              <Text style={styles.accuracyRange}>±4-6%</Text>
              <Text style={styles.accuracyNote}>Basic formulas</Text>
              <View style={styles.methodList}>
                <Text style={styles.methodItem}>YMCA (±5-7%)</Text>
                <Text style={styles.methodItem}>Modified YMCA (±4-6%)</Text>
                <Text style={styles.methodItem}>U.S. Navy (±4-6%)</Text>
              </View>
            </View>
            <View style={[styles.accuracyColumn, styles.premiumColumn]}>
              <Text style={styles.planLabel}>PRO+</Text>
              <Text style={[styles.accuracyRange, { color: COLORS.primary }]}>±3-5%</Text>
              <Text style={styles.accuracyNote}>Research-grade formulas</Text>
              <View style={styles.methodList}>
                <Text style={styles.methodItem}>Covert Bailey (±4-5%)</Text>
                <Text style={styles.methodItem}>Durnin & Womersley (±3.5-5%)</Text>
                <Text style={styles.methodItem}>Jackson & Pollock 3-Site (±4-5%)</Text>
                <Text style={styles.methodItem}>Jackson & Pollock 4-Site (±3.5-4.5%)</Text>
                <Text style={styles.methodItem}>Jackson & Pollock 7-Site (±3-4%)</Text>
                <Text style={styles.methodItem}>Parrillo 9-Site (±3-4%)</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Plan Selector */}
        {!isProPlus && (
          <View style={styles.section}>
            <PlanSelector
              selectedPlan={selectedPlan}
              onSelectPlan={setSelectedPlan}
              isLegacyPro={isLegacyPro}
              packages={packages}
            />

            <Button
              title={isProcessing ? 'Processing...' : 'Continue'}
              loading={isProcessing || isLoading}
              disabled={isProcessing || isLoading}
              buttonStyle={styles.buyButton}
              titleStyle={styles.buyButtonText}
              containerStyle={styles.buyButtonContainer}
              onPress={() => handlePurchase()}
            />
          </View>
        )}

        {/* Feature list */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>All Features</Text>
          {FEATURES.map(renderFeature)}
        </View>

        {/* Restore Purchases */}
        <View style={styles.restoreContainer}>
          <Button
            title="Restore Purchases"
            type="clear"
            loading={isRestoring}
            onPress={handleRestorePurchases}
            titleStyle={styles.restoreButtonText}
            icon={{
              name: 'refresh-ccw',
              type: 'feather',
              size: 16,
              color: COLORS.primary,
            }}
            iconPosition="left"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const createStyles = (
  getResponsiveTypography: (size: any) => number,
  getLineHeight: (size: any) => number,
  getResponsiveSpacing: (base: number) => number,
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    headerBar: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: getResponsiveSpacing(16),
      paddingVertical: getResponsiveSpacing(8),
    },
    backButton: {
      padding: getResponsiveSpacing(4),
    },
    scrollContent: {
      paddingBottom: getResponsiveSpacing(32),
    },
    header: {
      padding: getResponsiveSpacing(20),
      alignItems: 'center',
    },
    title: {
      fontSize: getResponsiveTypography('2xl'),
      lineHeight: getLineHeight('2xl'),
      fontWeight: 'bold',
      color: COLORS.textDark,
      marginBottom: getResponsiveSpacing(8),
    },
    description: {
      fontSize: getResponsiveTypography('md'),
      lineHeight: getLineHeight('md'),
      color: '#666',
      textAlign: 'center',
      marginBottom: getResponsiveSpacing(8),
    },
    section: {
      paddingHorizontal: getResponsiveSpacing(20),
      marginBottom: getResponsiveSpacing(24),
    },
    sectionTitle: {
      fontSize: getResponsiveTypography('xl'),
      lineHeight: getLineHeight('xl'),
      fontWeight: 'bold',
      color: COLORS.textDark,
      marginBottom: getResponsiveSpacing(16),
    },
    accuracyComparison: {
      flexDirection: 'row',
      backgroundColor: '#f8f8f8',
      borderRadius: 12,
      padding: getResponsiveSpacing(12),
      gap: getResponsiveSpacing(12),
    },
    accuracyColumn: {
      flex: 1,
      alignItems: 'center',
      padding: getResponsiveSpacing(12),
      backgroundColor: '#fff',
      borderRadius: 8,
      elevation: 1,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    premiumColumn: {
      borderWidth: 1,
      borderColor: `${COLORS.primary}30`,
    },
    planLabel: {
      fontSize: getResponsiveTypography('sm'),
      fontWeight: 'bold',
      color: COLORS.textDark,
      marginBottom: getResponsiveSpacing(4),
    },
    accuracyRange: {
      fontSize: getResponsiveTypography('2xl'),
      fontWeight: 'bold',
      color: COLORS.textDark,
      marginBottom: getResponsiveSpacing(4),
    },
    accuracyNote: {
      fontSize: getResponsiveTypography('xs'),
      lineHeight: getLineHeight('xs'),
      color: '#666',
      marginBottom: getResponsiveSpacing(12),
    },
    methodList: {
      width: '100%',
      alignItems: 'flex-start',
    },
    methodItem: {
      fontSize: getResponsiveTypography('xs'),
      lineHeight: getLineHeight('xs'),
      color: '#666',
      marginBottom: getResponsiveSpacing(4),
    },
    buyButton: {
      backgroundColor: COLORS.primary,
      borderRadius: 16,
      paddingVertical: getResponsiveSpacing(16),
    },
    buyButtonText: {
      fontSize: getResponsiveTypography('lg'),
      lineHeight: getLineHeight('lg'),
      fontWeight: 'bold',
    },
    buyButtonContainer: {
      marginTop: getResponsiveSpacing(16),
    },
    featuresSection: {
      paddingHorizontal: getResponsiveSpacing(20),
    },
    featureRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: getResponsiveSpacing(12),
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    featureInfo: {
      flex: 1,
    },
    featureName: {
      fontSize: getResponsiveTypography('md'),
      lineHeight: getLineHeight('md'),
      color: COLORS.textDark,
      marginBottom: getResponsiveSpacing(2),
    },
    featureDescription: {
      fontSize: getResponsiveTypography('xs'),
      lineHeight: getLineHeight('xs'),
      color: '#666',
    },
    availabilityIndicator: {
      marginLeft: getResponsiveSpacing(16),
    },
    restoreContainer: {
      alignItems: 'center',
      paddingVertical: getResponsiveSpacing(20),
      marginTop: getResponsiveSpacing(10),
    },
    restoreButtonText: {
      color: COLORS.primary,
      fontSize: getResponsiveTypography('xs'),
      lineHeight: getLineHeight('xs'),
      marginLeft: getResponsiveSpacing(8),
    },
  })
