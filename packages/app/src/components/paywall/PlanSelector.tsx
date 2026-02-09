import { Icon, Text } from '@rneui/themed'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import type { PurchasesPackage } from 'react-native-purchases'
import { GRANDFATHERED_PRICING, PRICING } from '../../constants/features'
import { COLORS } from '../../constants/theme'
import type { PlanType } from '../../hooks/usePaywall'
import { useResponsive } from '../../utils/responsiveContext'

interface PlanSelectorProps {
  selectedPlan: PlanType
  onSelectPlan: (plan: PlanType) => void
  isLegacyPro: boolean
  packages: PurchasesPackage[]
}

const PLANS: PlanType[] = ['monthly', 'yearly', 'lifetime']

function getPlanLabel(plan: PlanType): string {
  switch (plan) {
    case 'monthly':
      return 'Monthly'
    case 'yearly':
      return 'Annual'
    case 'lifetime':
      return 'Lifetime'
  }
}

function getPlanDescription(plan: PlanType): string {
  switch (plan) {
    case 'monthly':
      return 'Billed monthly'
    case 'yearly':
      return 'Billed annually'
    case 'lifetime':
      return 'One-time purchase'
  }
}

export function PlanSelector({
  selectedPlan,
  onSelectPlan,
  isLegacyPro,
  packages: _packages,
}: PlanSelectorProps) {
  const { getResponsiveTypography, getLineHeight, getResponsiveSpacing } = useResponsive()
  const styles = createStyles(getResponsiveTypography, getLineHeight, getResponsiveSpacing)
  const pricing = isLegacyPro ? GRANDFATHERED_PRICING : PRICING

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
        const price = pricing[plan].price
        const period = pricing[plan].period
        const isBestValue = plan === 'yearly'

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
                <Text style={[styles.planLabel, isSelected && styles.planLabelSelected]}>
                  {getPlanLabel(plan)}
                </Text>
                <Text style={styles.planDescription}>{getPlanDescription(plan)}</Text>
              </View>

              <View style={styles.priceContainer}>
                <Text style={[styles.planPrice, isSelected && styles.planPriceSelected]}>
                  {price}
                </Text>
                {plan !== 'lifetime' && <Text style={styles.planPeriod}>/{period}</Text>}
                {'savings' in pricing[plan] && (
                  <View style={styles.savingsBadge}>
                    <Text style={styles.savingsText}>
                      Save {(pricing[plan] as { savings: string }).savings}
                    </Text>
                  </View>
                )}
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
      gap: getResponsiveSpacing(8),
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
      paddingVertical: getResponsiveSpacing(14),
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
    planPeriod: {
      fontSize: getResponsiveTypography('xs'),
      lineHeight: getLineHeight('xs'),
      color: '#666',
    },
    savingsBadge: {
      backgroundColor: `${COLORS.success}15`,
      paddingHorizontal: getResponsiveSpacing(6),
      paddingVertical: getResponsiveSpacing(1),
      borderRadius: 4,
      marginTop: getResponsiveSpacing(2),
    },
    savingsText: {
      fontSize: getResponsiveTypography('xxxs'),
      lineHeight: getLineHeight('xxxs'),
      fontWeight: '600',
      color: COLORS.success,
    },
  })
