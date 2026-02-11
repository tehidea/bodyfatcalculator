import { useNavigation } from '@react-navigation/native'
import { Icon, Text } from '@rneui/themed'
import Constants from 'expo-constants'
import { useState } from 'react'
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BrandHeader } from '../components/BrandHeader'
import { PaywallModal } from '../components/calculator/PaywallModal'
import FemaleIcon from '../components/icons/FemaleIcon'
import MaleIcon from '../components/icons/MaleIcon'
import { ReminderSettings } from '../components/settings/ReminderSettings'
import { COLORS } from '../constants/theme'
import { useCloudSync } from '../hooks/useCloudSync'
import { useHealthIntegration } from '../hooks/useHealthIntegration'
import type { Gender } from '../schemas/calculator'
import { useCalculatorStore } from '../store/calculatorStore'
import { useHistoryStore } from '../store/historyStore'
import { usePremiumStore } from '../store/premiumStore'
import { useWhatsNewStore } from '../store/whatsNewStore'
import { hapticSelection } from '../utils/haptics'
import { useResponsive } from '../utils/responsiveContext'
import { generateSeedMeasurements } from '../utils/seedData'

function SettingsRow({
  icon,
  label,
  value,
  onPress,
  showChevron = false,
  rightElement,
}: {
  icon: string
  label: string
  value?: string | undefined
  onPress?: (() => void) | (() => Promise<void>) | undefined
  showChevron?: boolean | undefined
  rightElement?: React.ReactNode | undefined
}) {
  const { getResponsiveTypography, getLineHeight, getResponsiveSpacing } = useResponsive()
  const styles = createRowStyles(getResponsiveTypography, getLineHeight, getResponsiveSpacing)

  const content = (
    <View style={styles.row}>
      <Icon name={icon} type="feather" color="#666" size={20} />
      <Text style={styles.label}>{label}</Text>
      <View style={styles.rightSide}>
        {value && <Text style={styles.value}>{value}</Text>}
        {rightElement}
        {showChevron && <Icon name="chevron-right" type="feather" color="#ccc" size={20} />}
      </View>
    </View>
  )

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
        {content}
      </TouchableOpacity>
    )
  }

  return content
}

function SettingsSection({ title, children }: { title: string; children: React.ReactNode }) {
  const { getResponsiveTypography, getLineHeight, getResponsiveSpacing } = useResponsive()
  const styles = createSectionStyles(getResponsiveTypography, getLineHeight, getResponsiveSpacing)

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContent}>{children}</View>
    </View>
  )
}

function formatLastSynced(isoString: string | null): string {
  if (!isoString) return 'Never'
  const date = new Date(isoString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `${diffHours}h ago`
  return date.toLocaleDateString()
}

export function SettingsScreen() {
  const { isProPlus, isLegacyPro, restorePurchases, isLoading } = usePremiumStore()
  const { gender, setGender, setResults, measurementSystem, setMeasurementSystem } =
    useCalculatorStore()
  const { cloudSyncEnabled, setCloudSyncEnabled } = useHistoryStore()
  const { status: syncStatus, lastSyncedAt, sync, cloudAvailable } = useCloudSync()
  const {
    isEnabled: healthEnabled,
    available: healthAvailable,
    syncMetrics,
    enable: enableHealth,
    disable: disableHealth,
    setSyncMetric,
  } = useHealthIntegration()
  const navigation = useNavigation<any>()
  const { getResponsiveTypography, getLineHeight, getResponsiveSpacing } = useResponsive()
  const styles = createStyles(getResponsiveTypography, getLineHeight, getResponsiveSpacing)
  const [showPaywall, setShowPaywall] = useState(false)

  const isMetric = measurementSystem === 'metric'

  const handleGenderChange = (newGender: Gender) => {
    hapticSelection()
    setGender(newGender)
    setResults(null)
  }

  const handleRestore = async () => {
    await restorePurchases()
  }

  const handleToggleCloudSync = () => {
    if (!isProPlus) {
      setShowPaywall(true)
      return
    }
    const newEnabled = !cloudSyncEnabled
    setCloudSyncEnabled(newEnabled)
    if (newEnabled) {
      sync()
    }
  }

  const handleSyncNow = async () => {
    if (!isProPlus) {
      setShowPaywall(true)
      return
    }
    const result = await sync()
    if (result && result.errors.length === 0) {
      Alert.alert('Sync Complete', `Pushed ${result.pushed}, pulled ${result.pulled} measurements.`)
    } else if (result && result.errors.length > 0) {
      Alert.alert('Sync Partial', `Completed with ${result.errors.length} error(s).`)
    }
  }

  const handleToggleHealth = async () => {
    if (!isProPlus) {
      setShowPaywall(true)
      return
    }
    if (healthEnabled) {
      disableHealth()
    } else {
      const granted = await enableHealth()
      if (!granted) {
        Alert.alert(
          'Permission Required',
          `Please allow access to ${Platform.OS === 'ios' ? 'Apple Health' : 'Health Connect'} to enable this feature.`,
          [{ text: 'OK' }],
        )
      }
    }
  }

  const version = Constants.expoConfig?.version || '?.?.?'
  const buildNumber =
    Platform.select({
      ios: Constants.expoConfig?.ios?.buildNumber,
      android: Constants.expoConfig?.android?.versionCode?.toString(),
    }) || null

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.innerContainer}>
        <BrandHeader subtitle="Settings" variant="compact" />

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {isProPlus ? (
            <View style={styles.premiumStatus}>
              <Icon name="check-circle" type="feather" color={COLORS.success} size={20} />
              <Text style={styles.premiumStatusText}>PRO+ Active</Text>
            </View>
          ) : isLegacyPro ? (
            <>
              <View style={[styles.premiumStatus, { backgroundColor: '#FFC10720' }]}>
                <Icon name="award" type="feather" color="#FFC107" size={20} />
                <Text style={[styles.premiumStatusText, { color: '#FFC107' }]}>PRO</Text>
              </View>
              <TouchableOpacity style={styles.premiumBanner} onPress={() => setShowPaywall(true)}>
                <View style={styles.premiumBannerContent}>
                  <Icon name="star" type="feather" color={COLORS.primary} size={24} />
                  <View style={styles.premiumBannerText}>
                    <Text style={styles.premiumBannerTitle}>Upgrade to PRO+</Text>
                    <Text style={styles.premiumBannerSubtitle}>
                      Unlock history, cloud sync, and more
                    </Text>
                  </View>
                </View>
                <Icon name="chevron-right" type="feather" color={COLORS.primary} size={20} />
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={styles.premiumBanner} onPress={() => setShowPaywall(true)}>
              <View style={styles.premiumBannerContent}>
                <Icon name="star" type="feather" color={COLORS.primary} size={24} />
                <View style={styles.premiumBannerText}>
                  <Text style={styles.premiumBannerTitle}>Upgrade to PRO+</Text>
                  <Text style={styles.premiumBannerSubtitle}>
                    Unlock history, cloud sync, and more
                  </Text>
                </View>
              </View>
              <Icon name="chevron-right" type="feather" color={COLORS.primary} size={20} />
            </TouchableOpacity>
          )}

          <SettingsSection title="General">
            <SettingsRow
              icon="user"
              label="Gender"
              rightElement={
                <View style={styles.segmentedControl}>
                  <TouchableOpacity
                    style={[styles.segment, gender === 'male' && styles.segmentActive]}
                    onPress={() => handleGenderChange('male')}
                    activeOpacity={0.7}
                  >
                    <MaleIcon size={12} color={gender === 'male' ? '#fff' : '#666'} />
                    <Text
                      style={[styles.segmentText, gender === 'male' && styles.segmentTextActive]}
                    >
                      Male
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.segment, gender === 'female' && styles.segmentActive]}
                    onPress={() => handleGenderChange('female')}
                    activeOpacity={0.7}
                  >
                    <FemaleIcon size={12} color={gender === 'female' ? '#fff' : '#666'} />
                    <Text
                      style={[styles.segmentText, gender === 'female' && styles.segmentTextActive]}
                    >
                      Female
                    </Text>
                  </TouchableOpacity>
                </View>
              }
            />
            <SettingsRow
              icon="globe"
              label="Units"
              rightElement={
                <View style={styles.segmentedControl}>
                  <TouchableOpacity
                    style={[styles.segment, isMetric && styles.segmentActive]}
                    onPress={() => {
                      hapticSelection()
                      setMeasurementSystem('metric')
                    }}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.segmentText, isMetric && styles.segmentTextActive]}>
                      kg / cm
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.segment, !isMetric && styles.segmentActive]}
                    onPress={() => {
                      hapticSelection()
                      setMeasurementSystem('imperial')
                    }}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.segmentText, !isMetric && styles.segmentTextActive]}>
                      lb / in
                    </Text>
                  </TouchableOpacity>
                </View>
              }
            />
          </SettingsSection>

          <SettingsSection title="PRO+">
            <SettingsRow
              icon="cloud"
              label="Enable Cloud Sync"
              rightElement={
                <Switch
                  value={cloudSyncEnabled && isProPlus}
                  onValueChange={handleToggleCloudSync}
                  trackColor={{ false: '#e0e0e0', true: `${COLORS.primary}80` }}
                  thumbColor={cloudSyncEnabled && isProPlus ? COLORS.primary : '#f4f3f4'}
                />
              }
            />
            {cloudSyncEnabled && isProPlus && (
              <>
                <SettingsRow
                  icon="refresh-cw"
                  label="Sync Now"
                  value={syncStatus === 'syncing' ? 'Syncing...' : formatLastSynced(lastSyncedAt)}
                  onPress={handleSyncNow}
                />
                {cloudAvailable === false && (
                  <SettingsRow
                    icon="alert-circle"
                    label="Cloud Not Available"
                    value={Platform.OS === 'ios' ? 'Sign in to iCloud' : 'Sign in to Google'}
                  />
                )}
              </>
            )}
            <ReminderSettings isProPlus={isProPlus} onShowPaywall={() => setShowPaywall(true)} />
            {healthAvailable !== false && (
              <>
                <SettingsRow
                  icon="heart"
                  label={Platform.OS === 'ios' ? 'Apple Health' : 'Health Connect'}
                  rightElement={
                    <Switch
                      value={healthEnabled}
                      onValueChange={handleToggleHealth}
                      trackColor={{ false: '#e0e0e0', true: `${COLORS.primary}80` }}
                      thumbColor={healthEnabled ? COLORS.primary : '#f4f3f4'}
                    />
                  }
                />
                {healthEnabled && (
                  <>
                    <Text style={styles.healthMetricsHint}>
                      Choose which measurements to sync to{' '}
                      {Platform.OS === 'ios' ? 'Apple Health' : 'Health Connect'}
                    </Text>
                    <SettingsRow
                      icon="activity"
                      label="Sync Weight"
                      rightElement={
                        <Switch
                          value={syncMetrics.weight}
                          onValueChange={(v) => setSyncMetric('weight', v)}
                          trackColor={{ false: '#e0e0e0', true: `${COLORS.primary}80` }}
                          thumbColor={syncMetrics.weight ? COLORS.primary : '#f4f3f4'}
                        />
                      }
                    />
                    <SettingsRow
                      icon="activity"
                      label="Sync Height"
                      rightElement={
                        <Switch
                          value={syncMetrics.height}
                          onValueChange={(v) => setSyncMetric('height', v)}
                          trackColor={{ false: '#e0e0e0', true: `${COLORS.primary}80` }}
                          thumbColor={syncMetrics.height ? COLORS.primary : '#f4f3f4'}
                        />
                      }
                    />
                    {Platform.OS === 'ios' && (
                      <SettingsRow
                        icon="activity"
                        label="Sync Waist Circumference"
                        rightElement={
                          <Switch
                            value={syncMetrics.waist}
                            onValueChange={(v) => setSyncMetric('waist', v)}
                            trackColor={{ false: '#e0e0e0', true: `${COLORS.primary}80` }}
                            thumbColor={syncMetrics.waist ? COLORS.primary : '#f4f3f4'}
                          />
                        }
                      />
                    )}
                    <SettingsRow
                      icon="activity"
                      label="Sync Lean Body Mass"
                      rightElement={
                        <Switch
                          value={syncMetrics.leanMass}
                          onValueChange={(v) => setSyncMetric('leanMass', v)}
                          trackColor={{ false: '#e0e0e0', true: `${COLORS.primary}80` }}
                          thumbColor={syncMetrics.leanMass ? COLORS.primary : '#f4f3f4'}
                        />
                      }
                    />
                    {Platform.OS === 'ios' && (
                      <SettingsRow
                        icon="activity"
                        label="Sync BMI"
                        rightElement={
                          <Switch
                            value={syncMetrics.bmi}
                            onValueChange={(v) => setSyncMetric('bmi', v)}
                            trackColor={{ false: '#e0e0e0', true: `${COLORS.primary}80` }}
                            thumbColor={syncMetrics.bmi ? COLORS.primary : '#f4f3f4'}
                          />
                        }
                      />
                    )}
                  </>
                )}
              </>
            )}
          </SettingsSection>

          <SettingsSection title="Account">
            <SettingsRow
              icon="refresh-cw"
              label="Restore Purchases"
              onPress={handleRestore}
              showChevron={!isLoading}
              value={isLoading ? 'Restoring...' : undefined}
            />
          </SettingsSection>

          <SettingsSection title="About">
            <SettingsRow
              icon="info"
              label="Version"
              value={`${version}${buildNumber ? ` (${buildNumber})` : ''}`}
              onPress={() => navigation.navigate('WhatsNew')}
              showChevron
            />
          </SettingsSection>

          {__DEV__ && (
            <SettingsSection title="Developer">
              <SettingsRow
                icon="image"
                label="Illustration Gallery"
                onPress={() => navigation.navigate('IllustrationGallery')}
                showChevron
              />
              <SettingsRow
                icon="gift"
                label="Reset What's New"
                onPress={() => {
                  useWhatsNewStore.getState().setLastSeenVersion(null)
                  Alert.alert('Done', "What's New modal will show on next app launch.")
                }}
                showChevron
              />
              <SettingsRow
                icon="database"
                label="Generate Sample Data"
                onPress={() => {
                  const records = generateSeedMeasurements()
                  useHistoryStore.setState({ measurements: records })
                  Alert.alert('Done', `Generated ${records.length} sample measurements.`)
                }}
                showChevron
              />
              <SettingsRow
                icon="trash-2"
                label="Clear All Data"
                onPress={() => {
                  Alert.alert('Clear All Data', 'This will delete all measurement history.', [
                    { text: 'Cancel', style: 'cancel' },
                    {
                      text: 'Clear',
                      style: 'destructive',
                      onPress: () => {
                        useHistoryStore.setState({ measurements: [] })
                        Alert.alert('Done', 'All measurements cleared.')
                      },
                    },
                  ])
                }}
                showChevron
              />
              <SettingsRow
                icon="star"
                label="Toggle PRO+"
                value={isProPlus ? 'ON' : 'OFF'}
                onPress={() => {
                  const store = usePremiumStore.getState()
                  usePremiumStore.setState({ isProPlus: !store.isProPlus })
                }}
              />
              <SettingsRow
                icon="award"
                label="Toggle Legacy PRO"
                value={isLegacyPro ? 'ON' : 'OFF'}
                onPress={() => {
                  const store = usePremiumStore.getState()
                  usePremiumStore.setState({ isLegacyPro: !store.isLegacyPro })
                }}
              />
            </SettingsSection>
          )}
        </ScrollView>

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
    content: {
      padding: getResponsiveSpacing(16),
      gap: getResponsiveSpacing(16),
    },
    premiumBanner: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: COLORS.white,
      borderRadius: 12,
      padding: getResponsiveSpacing(16),
      borderWidth: 2,
      borderColor: COLORS.primary,
    },
    premiumBannerContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: getResponsiveSpacing(12),
    },
    premiumBannerText: {
      gap: getResponsiveSpacing(2),
    },
    premiumBannerTitle: {
      fontSize: getResponsiveTypography('md'),
      lineHeight: getLineHeight('md'),
      fontWeight: '600',
      color: COLORS.textDark,
    },
    premiumBannerSubtitle: {
      fontSize: getResponsiveTypography('sm'),
      lineHeight: getLineHeight('sm'),
      color: '#666',
    },
    premiumStatus: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: `${COLORS.success}20`,
      borderRadius: 12,
      padding: getResponsiveSpacing(12),
      gap: getResponsiveSpacing(8),
    },
    premiumStatusText: {
      fontSize: getResponsiveTypography('sm'),
      lineHeight: getLineHeight('sm'),
      fontWeight: '600',
      color: COLORS.success,
    },
    segmentedControl: {
      flexDirection: 'row',
      backgroundColor: '#e0e0e0',
      borderRadius: 8,
      padding: 2,
    },
    segment: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      paddingVertical: 4,
      paddingHorizontal: 10,
      borderRadius: 6,
    },
    segmentActive: {
      backgroundColor: COLORS.primary,
    },
    segmentText: {
      fontSize: getResponsiveTypography('xs'),
      lineHeight: getLineHeight('xs'),
      color: '#666',
    },
    segmentTextActive: {
      color: '#fff',
      fontWeight: '600',
    },
    healthMetricsHint: {
      fontSize: getResponsiveTypography('xs'),
      lineHeight: getLineHeight('xs'),
      color: '#999',
      paddingHorizontal: getResponsiveSpacing(16),
      paddingVertical: getResponsiveSpacing(8),
    },
  })

const createSectionStyles = (
  getResponsiveTypography: (size: any) => number,
  getLineHeight: (size: any) => number,
  getResponsiveSpacing: (base: number) => number,
) =>
  StyleSheet.create({
    section: {
      gap: getResponsiveSpacing(4),
    },
    sectionTitle: {
      fontSize: getResponsiveTypography('xs'),
      lineHeight: getLineHeight('xs'),
      fontWeight: '600',
      color: 'rgba(255,255,255,0.5)',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      paddingHorizontal: getResponsiveSpacing(4),
      marginBottom: getResponsiveSpacing(4),
    },
    sectionContent: {
      backgroundColor: COLORS.white,
      borderRadius: 12,
      overflow: 'hidden',
    },
  })

const createRowStyles = (
  getResponsiveTypography: (size: any) => number,
  getLineHeight: (size: any) => number,
  getResponsiveSpacing: (base: number) => number,
) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: getResponsiveSpacing(16),
      paddingVertical: getResponsiveSpacing(14),
      gap: getResponsiveSpacing(12),
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#e0e0e0',
    },
    label: {
      flex: 1,
      fontSize: getResponsiveTypography('md'),
      lineHeight: getLineHeight('md'),
      color: COLORS.textDark,
    },
    rightSide: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: getResponsiveSpacing(8),
    },
    value: {
      fontSize: getResponsiveTypography('sm'),
      lineHeight: getLineHeight('sm'),
      color: '#999',
    },
  })
