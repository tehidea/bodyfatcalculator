import { Icon, Text } from '@rneui/themed'
import { useMemo } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { PACKAGE_TYPE, type PurchasesPackage } from 'react-native-purchases'
import { LEGACY_PRICING, PRICING } from '../../constants/features'
import { COLORS } from '../../constants/theme'
import type { PlanType } from '../../hooks/usePaywall'
import { useResponsive } from '../../utils/responsiveContext'

interface PlanSelectorProps {
  selectedPlan: PlanType
  onSelectPlan: (plan: PlanType) => void
  isLegacyPro: boolean
  packages: PurchasesPackage[]
}

const PLANS: PlanType[] = ['monthly', 'annual', 'lifetime']

function getPlanLabel(plan: PlanType): string {
  switch (plan) {
    case 'monthly':
      return 'Monthly'
    case 'annual':
      return 'Annual'
    case 'lifetime':
      return 'Lifetime'
  }
}

function getPlanDescription(plan: PlanType): string {
  switch (plan) {
    case 'monthly':
      return 'Billed monthly'
    case 'annual':
      return 'Billed annually'
    case 'lifetime':
      return 'One-time purchase'
  }
}

export function PlanSelector({
  selectedPlan,
  onSelectPlan,
  isLegacyPro,
  packages,
}: PlanSelectorProps) {
  const { getResponsiveTypography, getLineHeight, getResponsiveSpacing } = useResponsive()
  const styles = createStyles(getResponsiveTypography, getLineHeight, getResponsiveSpacing)
  const pricing = isLegacyPro ? LEGACY_PRICING : PRICING

  const priceMap = useMemo(() => {
    const map: Partial<Record<PlanType, PurchasesPackage>> = {}
    for (const pkg of packages) {
      if (pkg.packageType === PACKAGE_TYPE.MONTHLY) map.monthly = pkg
      else if (pkg.packageType === PACKAGE_TYPE.ANNUAL) map.annual = pkg
      else if (pkg.packageType === PACKAGE_TYPE.LIFETIME) map.lifetime = pkg
    }
    return map
  }, [packages])

  const savingsPercent = useMemo(() => {
    const monthly = priceMap.monthly?.product.price
    const annual = priceMap.annual?.product.price
    if (!monthly || !annual) return null
    return Math.round((1 - annual / (monthly * 12)) * 100)
  }, [priceMap])

  return (
    <View style={styles.container}>
      {isLegacyPro && (
        <View style={styles.loyaltyBadge}>
          <Icon name="heart" type="feather" color={COLORS.primary} size={14} />
          <Text style={styles.loyaltyBadgeText}>Loyal Customer — 50% off</Text>
        </View>
      )}

      {PLANS.map((plan) => {
        const isSelected = selectedPlan === plan
        const planPricing = pricing[plan]
        const isBestValue = plan === 'annual'
        const price = priceMap[plan]?.product.priceString ?? planPricing.price
        const savings =
          plan === 'annual'
            ? savingsPercent != null
              ? `${savingsPercent}%`
              : 'savings' in planPricing
                ? planPricing.savings
                : null
            : null

        return (
          <TouchableOpacity
            key={plan}
            style={[
              styles.planCard,
              isSelected && styles.planCardSelected,
              isBestValue && styles.planCardBestValue,
            ]}
            onPress={() => onSelectPlan(plan)}
            activeOpacity={0.7}
          >
            {isBestValue && (
              <View style={styles.bestValueBadge}>
                <Text style={styles.bestValueText}>BEST VALUE</Text>
              </View>
            )}

            <View style={styles.planContent}>
              <View style={styles.radioContainer}>
                <View style={[styles.radio, isSelected && styles.radioSelected]}>
                  {isSelected && <View style={styles.radioInner} />}
                </View>
              </View>

              <View style={styles.planInfo}>
                <View style={styles.planLabelRow}>
                  <Text style={[styles.planLabel, isSelected && styles.planLabelSelected]}>
                    {getPlanLabel(plan)}
                  </Text>
                  {savings && (
                    <View style={styles.savingsBadge}>
                      <Text style={styles.savingsText}>Save {savings}</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.planDescription}>{getPlanDescription(plan)}</Text>
              </View>

              <View style={styles.priceContainer}>
                <Text style={[styles.planPrice, isSelected && styles.planPriceSelected]}>
                  {price}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const createStyles = (
  getResponsiveTypography: (size: any) => number,
  getLineHeight: (size: any) => number,
  getResponsiveSpacing: (base: number) => number,
) =>
  StyleSheet.create({
    container: {
      gap: getResponsiveSpacing(6),
    },
    loyaltyBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: `${COLORS.primary}10`,
      paddingVertical: getResponsiveSpacing(8),
      paddingHorizontal: getResponsiveSpacing(16),
      borderRadius: 12,
      marginBottom: getResponsiveSpacing(4),
      gap: getResponsiveSpacing(6),
    },
    loyaltyBadgeText: {
      fontSize: getResponsiveTypography('sm'),
      lineHeight: getLineHeight('sm'),
      fontWeight: '600',
      color: COLORS.primary,
    },
    planCard: {
      borderWidth: 2,
      borderColor: '#e0e0e0',
      borderRadius: 12,
      paddingVertical: getResponsiveSpacing(10),
      paddingHorizontal: getResponsiveSpacing(16),
    },
    planCardSelected: {
      borderColor: COLORS.primary,
      backgroundColor: `${COLORS.primary}05`,
    },
    planCardBestValue: {
      overflow: 'visible',
    },
    bestValueBadge: {
      position: 'absolute',
      top: -10,
      alignSelf: 'center',
      backgroundColor: COLORS.primary,
      paddingHorizontal: getResponsiveSpacing(10),
      paddingVertical: getResponsiveSpacing(2),
      borderRadius: 8,
    },
    bestValueText: {
      color: COLORS.white,
      fontSize: getResponsiveTypography('xxxs'),
      lineHeight: getLineHeight('xxxs'),
      fontWeight: 'bold',
      letterSpacing: 0.5,
    },
    planContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    radioContainer: {
      marginRight: getResponsiveSpacing(12),
    },
    radio: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: '#ccc',
      alignItems: 'center',
      justifyContent: 'center',
    },
    radioSelected: {
      borderColor: COLORS.primary,
    },
    radioInner: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: COLORS.primary,
    },
    planInfo: {
      flex: 1,
    },
    planLabel: {
      fontSize: getResponsiveTypography('md'),
      lineHeight: getLineHeight('md'),
      fontWeight: '600',
      color: COLORS.textDark,
    },
    planLabelSelected: {
      color: COLORS.primary,
    },
    planLabelRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: getResponsiveSpacing(6),
    },
    planDescription: {
      fontSize: getResponsiveTypography('xs'),
      lineHeight: getLineHeight('xs'),
      color: '#666',
    },
    priceContainer: {
      alignItems: 'flex-end',
    },
    planPrice: {
      fontSize: getResponsiveTypography('lg'),
      lineHeight: getLineHeight('lg'),
      fontWeight: 'bold',
      color: COLORS.textDark,
    },
    planPriceSelected: {
      color: COLORS.primary,
    },
    savingsBadge: {
      backgroundColor: `${COLORS.success}15`,
      paddingHorizontal: getResponsiveSpacing(6),
      paddingVertical: getResponsiveSpacing(1),
      borderRadius: 4,
    },
    savingsText: {
      fontSize: getResponsiveTypography('xxxs'),
      lineHeight: getLineHeight('xxxs'),
      fontWeight: '600',
      color: COLORS.success,
    },
  })
