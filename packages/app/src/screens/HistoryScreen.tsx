import { Icon, Text } from '@rneui/themed'
import { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BrandHeader } from '../components/BrandHeader'
import { PaywallModal } from '../components/calculator/PaywallModal'
import { MeasurementList } from '../components/history/MeasurementList'
import { ChartSection } from '../components/history/ProgressChart'
import { COLORS } from '../constants/theme'
import { useCloudSync } from '../hooks/useCloudSync'
import { useCollapsibleHeader } from '../hooks/useCollapsibleHeader'
import { useHistoryStore } from '../store/historyStore'
import { usePremiumStore } from '../store/premiumStore'
import { useResponsive } from '../utils/responsiveContext'

export function HistoryScreen() {
  const { isProPlus } = usePremiumStore()
  const { getActiveMeasurements, deleteMeasurement } = useHistoryStore()
  const { status: syncStatus, isEnabled: syncEnabled, sync } = useCloudSync()
  const { getResponsiveTypography, getLineHeight, getResponsiveSpacing } = useResponsive()
  const styles = createStyles(getResponsiveTypography, getLineHeight, getResponsiveSpacing)
  const { scrollY, scrollHandler } = useCollapsibleHeader()
  const [showPaywall, setShowPaywall] = useState(false)

  const measurements = getActiveMeasurements()

  const headerRightElement = isProPlus ? (
    <View style={styles.headerRight}>
      {syncEnabled && (
        <TouchableOpacity onPress={sync} disabled={syncStatus === 'syncing'} hitSlop={8}>
          <Icon
            name={syncStatus === 'error' ? 'alert-circle' : 'cloud'}
            type="feather"
            color={
              syncStatus === 'syncing'
                ? '#ccc'
                : syncStatus === 'error'
                  ? '#FF5722'
                  : COLORS.success
            }
            size={18}
          />
        </TouchableOpacity>
      )}
    </View>
  ) : undefined

  if (!isProPlus) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.innerContainer}>
          <BrandHeader title="History" variant="compact" scrollY={scrollY} />
          <View style={styles.emptyState}>
            <Icon name="lock" type="feather" color="rgba(255,255,255,0.4)" size={48} />
            <Text style={styles.emptyTitle}>PRO+ Feature</Text>
            <Text style={styles.emptySubtitle}>Upgrade to PRO+ to track your measurements</Text>
            <TouchableOpacity style={styles.upgradeButton} onPress={() => setShowPaywall(true)}>
              <Text style={styles.upgradeButtonText}>Unlock PRO+</Text>
            </TouchableOpacity>
          </View>
          <PaywallModal
            visible={showPaywall}
            variant="precision"
            onClose={() => setShowPaywall(false)}
          />
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.innerContainer}>
        <BrandHeader
          title="History"
          variant="compact"
          rightElement={headerRightElement}
          scrollY={scrollY}
        />

        {measurements.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="clock" type="feather" color="rgba(255,255,255,0.4)" size={48} />
            <Text style={styles.emptyTitle}>No Measurements Yet</Text>
            <Text style={styles.emptySubtitle}>Your saved measurements will appear here</Text>
          </View>
        ) : (
          <Animated.ScrollView
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <ChartSection measurements={measurements} />
            <MeasurementList measurements={measurements} onDelete={deleteMeasurement} />
          </Animated.ScrollView>
        )}
      </View>
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
      backgroundColor: COLORS.white,
    },
    innerContainer: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    headerRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: getResponsiveSpacing(12),
    },
    scrollContent: {
      padding: getResponsiveSpacing(16),
      gap: getResponsiveSpacing(16),
      paddingBottom: getResponsiveSpacing(32),
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: getResponsiveSpacing(40),
      gap: getResponsiveSpacing(12),
    },
    emptyTitle: {
      fontSize: getResponsiveTypography('lg'),
      lineHeight: getLineHeight('lg'),
      fontWeight: '600',
      color: COLORS.text,
      marginTop: getResponsiveSpacing(8),
    },
    emptySubtitle: {
      fontSize: getResponsiveTypography('sm'),
      lineHeight: getLineHeight('sm'),
      color: 'rgba(255,255,255,0.6)',
      textAlign: 'center',
    },
    upgradeButton: {
      backgroundColor: COLORS.primary,
      paddingHorizontal: getResponsiveSpacing(24),
      paddingVertical: getResponsiveSpacing(12),
      borderRadius: 12,
      marginTop: getResponsiveSpacing(8),
    },
    upgradeButtonText: {
      color: COLORS.white,
      fontSize: getResponsiveTypography('md'),
      lineHeight: getLineHeight('md'),
      fontWeight: '600',
    },
  })
