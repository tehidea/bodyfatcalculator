// TODO: This isn't technically implemented yet

import { Button, Icon, Text } from '@rneui/themed'
import { usePostHog } from 'posthog-react-native'
import { useState } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getOfferings, purchasePackage } from '../config/store'
import { FEATURES, PRICING } from '../constants/features'
import { COLORS } from '../constants/theme'
import { usePremiumStore } from '../store/premiumStore'
import { getLineHeight, getResponsiveSpacing, getResponsiveTypography } from '../utils/device'

export const FeatureComparisonScreen = () => {
  const posthog = usePostHog()
  const { pro, setEntitlements } = usePremiumStore()
  const [loading, setLoading] = useState(false)
  const { restorePurchases } = usePremiumStore()

  const handlePurchase = async (type: 'pro' | 'premium' | 'bundle' | 'lifetime') => {
    setLoading(true)
    if (posthog) {
      posthog.capture('upgrade_to_pro_initiated', { package_type: type })
    }
    try {
      const offerings = await getOfferings()
      let targetPackage

      switch (type) {
        case 'pro':
          targetPackage = offerings.find((p) => p.identifier === 'pro_lifetime')
          break
        case 'premium':
          targetPackage = offerings.find((p) => p.identifier === 'premium_annual')
          break
        case 'bundle':
          targetPackage = offerings.find((p) => p.identifier === 'pro_premium_bundle')
          break
        case 'lifetime':
          targetPackage = offerings.find((p) => p.identifier === 'premium_lifetime')
          break
      }

      if (!targetPackage) {
        throw new Error('Package not found')
      }

      const entitlements = await purchasePackage(targetPackage)
      setEntitlements(entitlements)
      if (posthog) {
        posthog.capture('purchase_successful', { package_type: type })
      }
    } catch (error) {
      console.error('Purchase failed:', error)
      if (posthog) {
        posthog.capture('purchase_failed', {
          package_type: type,
          error_message: error instanceof Error ? error.message : String(error),
        })
      }
    } finally {
      setLoading(false)
    }
  }

  const handleRestorePurchases = async () => {
    if (posthog) {
      posthog.capture('restore_purchases_tapped')
    }
    await restorePurchases()
  }

  const renderFeature = ({ id, name, description, availability }: (typeof FEATURES)[0]) => {
    const isAvailable =
      availability === 'free' ||
      (availability === 'pro' && pro) ||
      (availability === 'premium' && pro)

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
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Choose Your Plan</Text>
          <Text style={styles.description}>
            Get more accurate body fat calculations with advanced formulas
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Formula Accuracy</Text>
          <View style={styles.accuracyComparison}>
            <View style={styles.accuracyColumn}>
              <Text style={styles.planLabel}>FREE</Text>
              <Text style={styles.accuracyRange}>±4-6%</Text>
              <Text style={styles.accuracyNote}>Basic formulas</Text>
              <View style={styles.methodList}>
                <Text style={styles.methodItem}>• YMCA (±5-7%)</Text>
                <Text style={styles.methodItem}>• Modified YMCA (±4-6%)</Text>
                <Text style={styles.methodItem}>• U.S. Navy (±4-6%)</Text>
              </View>
            </View>
            <View style={styles.accuracyColumn}>
              <Text style={styles.planLabel}>PRO</Text>
              <Text style={styles.accuracyRange}>±3-5%</Text>
              <Text style={styles.accuracyNote}>Research-grade formulas</Text>
              <View style={styles.methodList}>
                <Text style={styles.methodItem}>• Covert Bailey (±4-5%)</Text>
                <Text style={styles.methodItem}>• Durnin & Womersley (±3.5-5%)</Text>
                <Text style={styles.methodItem}>• Jackson & Pollock 3-Site (±4-5%)</Text>
                <Text style={styles.methodItem}>• Jackson & Pollock 4-Site (±3.5-4.5%)</Text>
                <Text style={styles.methodItem}>• Jackson & Pollock 7-Site (±3-4%)</Text>
                <Text style={styles.methodItem}>• Parillo 9-Site (±3-4%)</Text>
              </View>
            </View>
          </View>
          <Text style={styles.accuracyDisclaimer}>
            * Accuracy ranges assume proper measurement technique and calibrated tools. Individual
            results may vary based on body type, hydration levels, and measurement skill.
          </Text>
        </View>

        <View style={styles.pricingCards}>
          {/* PRO Card */}
          <TouchableOpacity
            style={[styles.pricingCard, pro && styles.activeCard]}
            onPress={() => !pro && handlePurchase('pro')}
            disabled={pro || loading}
          >
            <Text style={styles.planName}>PRO</Text>
            <Text style={styles.planPrice}>{PRICING.pro.price}</Text>
            <Text style={styles.planType}>One-time purchase</Text>
            <View style={styles.keyFeatures}>
              <Text style={styles.keyFeature}>• Advanced formulas (±3-5%)</Text>
              <Text style={styles.keyFeature}>• Skinfold measurement methods</Text>
              <Text style={styles.keyFeature}>• Decimal precision</Text>
              <Text style={styles.keyFeature}>• Detailed measurement guides</Text>
              <Text style={styles.keyFeature}>• Sport-specific ranges</Text>
              <Text style={styles.keyFeature}>• Family Sharing enabled</Text>
            </View>
            <Button
              title={pro ? 'Purchased' : 'Buy Now'}
              disabled={pro || loading}
              loading={loading}
              buttonStyle={[styles.buyButton, pro && styles.purchasedButton]}
              onPress={() => handlePurchase('pro')}
            />
          </TouchableOpacity>

          {/* Premium Card */}
          <TouchableOpacity
            style={[styles.pricingCard, pro && styles.activeCard]}
            onPress={() => !pro && handlePurchase('premium')}
            disabled={pro || loading}
          >
            <Text style={styles.planName}>PREMIUM</Text>
            <Text style={styles.planPrice}>{PRICING.premium.annual.price}</Text>
            <Text style={styles.planType}>Per year (save 50%)</Text>
            <Text style={styles.monthlyPrice}>or {PRICING.premium.monthly.price}/month</Text>
            <View style={styles.keyFeatures}>
              <Text style={styles.keyFeature}>• Everything in PRO</Text>
              <Text style={styles.keyFeature}>• Cloud sync across devices</Text>
              <Text style={styles.keyFeature}>• Progress tracking & photos</Text>
              <Text style={styles.keyFeature}>• Advanced export (CSV/PDF)</Text>
              <Text style={styles.keyFeature}>• Priority support</Text>
            </View>
            <Button
              title={pro ? 'Subscribed' : 'Subscribe'}
              disabled={pro || loading}
              loading={loading}
              buttonStyle={[styles.buyButton, pro && styles.purchasedButton]}
              onPress={() => handlePurchase('premium')}
            />
          </TouchableOpacity>

          {/* Bundle Card */}
          {!pro && (
            <TouchableOpacity
              style={[styles.pricingCard, styles.bundleCard]}
              onPress={() => handlePurchase('bundle')}
              disabled={loading}
            >
              <View style={styles.saveBadge}>
                <Text style={styles.saveBadgeText}>BEST VALUE</Text>
              </View>
              <Text style={styles.planName}>PRO + 1 YEAR PREMIUM</Text>
              <Text style={styles.planPrice}>{PRICING.bundles.proWithPremium.price}</Text>
              <Text style={styles.planType}>Save {PRICING.bundles.proWithPremium.savings}</Text>
              <View style={styles.keyFeatures}>
                <Text style={styles.keyFeature}>• Lifetime PRO access</Text>
                <Text style={styles.keyFeature}>• 1 year of Premium features</Text>
                <Text style={styles.keyFeature}>• All advanced formulas</Text>
                <Text style={styles.keyFeature}>• All premium features</Text>
                <Text style={styles.keyFeature}>• Best value for serious users</Text>
              </View>
              <Button
                title="Get Bundle"
                loading={loading}
                buttonStyle={styles.buyButton}
                onPress={() => handlePurchase('bundle')}
              />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Features</Text>
          {FEATURES.map(renderFeature)}
        </View>

        {/* Restore Purchases Button */}
        <View style={styles.restoreContainer}>
          <Button
            title="Restore Purchases"
            type="clear"
            loading={loading}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
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
    marginBottom: getResponsiveSpacing(24),
  },
  section: {
    padding: 16,
    marginBottom: 16,
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
    padding: 16,
    gap: 16,
  },
  accuracyColumn: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  planLabel: {
    fontSize: getResponsiveTypography('sm'),
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: 4,
  },
  accuracyRange: {
    fontSize: getResponsiveTypography('2xl'),
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
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
  accuracyDisclaimer: {
    fontSize: getResponsiveTypography('xs'),
    lineHeight: getLineHeight('xs'),
    color: '#666',
    fontStyle: 'italic',
    marginTop: getResponsiveSpacing(12),
    textAlign: 'center',
    paddingHorizontal: getResponsiveSpacing(16),
  },
  pricingCards: {
    padding: 20,
  },
  pricingCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
  },
  activeCard: {
    backgroundColor: `${COLORS.primary}10`,
  },
  bundleCard: {
    backgroundColor: '#f0f8ff',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  planName: {
    fontSize: getResponsiveTypography('xl'),
    lineHeight: getLineHeight('xl'),
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: getResponsiveSpacing(8),
  },
  planPrice: {
    fontSize: getResponsiveTypography('3xl'),
    lineHeight: getLineHeight('3xl'),
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: getResponsiveSpacing(4),
  },
  planType: {
    fontSize: getResponsiveTypography('sm'),
    lineHeight: getLineHeight('sm'),
    color: '#666',
    marginBottom: getResponsiveSpacing(16),
  },
  monthlyPrice: {
    fontSize: getResponsiveTypography('xs'),
    lineHeight: getLineHeight('xs'),
    color: '#666',
    marginBottom: getResponsiveSpacing(16),
  },
  keyFeatures: {
    width: '100%',
    marginBottom: 16,
  },
  keyFeature: {
    fontSize: getResponsiveTypography('sm'),
    lineHeight: getLineHeight('sm'),
    color: '#444',
    marginBottom: getResponsiveSpacing(4),
  },
  buyButton: {
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  purchasedButton: {
    backgroundColor: '#4CAF50',
  },
  saveBadge: {
    position: 'absolute',
    top: -12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
  },
  saveBadgeText: {
    color: '#fff',
    fontSize: getResponsiveTypography('xs'),
    lineHeight: getLineHeight('xs'),
    fontWeight: 'bold',
  },
  featuresSection: {
    padding: 20,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
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
    marginLeft: 16,
  },
  restoreContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: 10,
  },
  restoreButtonText: {
    color: COLORS.primary,
    fontSize: getResponsiveTypography('xs'),
    lineHeight: getLineHeight('xs'),
    marginLeft: getResponsiveSpacing(8),
  },
})
