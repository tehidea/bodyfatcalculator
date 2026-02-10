import { Icon, Text } from '@rneui/themed'
import { useCallback, useEffect, useState } from 'react'
import { Alert, StyleSheet, Switch, TouchableOpacity, View } from 'react-native'
import { COLORS } from '../../constants/theme'
import {
  cancelReminder,
  getReminderSettings,
  type ReminderFrequency,
  type ReminderSettings as ReminderSettingsType,
  requestNotificationPermissions,
  saveReminderSettings,
  scheduleReminder,
} from '../../services/reminders'
import { useResponsive } from '../../utils/responsiveContext'

const FREQUENCY_OPTIONS: { value: ReminderFrequency; label: string }[] = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'biweekly', label: 'Every 2 Weeks' },
  { value: 'monthly', label: 'Monthly' },
]

const HOUR_OPTIONS = Array.from({ length: 24 }, (_, i) => {
  const hour12 = i % 12 || 12
  const ampm = i < 12 ? 'AM' : 'PM'
  return { value: i, label: `${hour12}:00 ${ampm}` }
})

interface ReminderSettingsProps {
  isProPlus: boolean
  onShowPaywall: () => void
}

export function ReminderSettings({ isProPlus, onShowPaywall }: ReminderSettingsProps) {
  const { getResponsiveTypography, getLineHeight, getResponsiveSpacing } = useResponsive()
  const styles = createStyles(getResponsiveTypography, getLineHeight, getResponsiveSpacing)
  const [settings, setSettings] = useState<ReminderSettingsType | null>(null)
  const [showFrequency, setShowFrequency] = useState(false)
  const [showTime, setShowTime] = useState(false)

  useEffect(() => {
    getReminderSettings().then(setSettings)
  }, [])

  const updateSettings = useCallback(
    async (updates: Partial<ReminderSettingsType>) => {
      if (!settings) return
      const updated = { ...settings, ...updates }
      setSettings(updated)
      await saveReminderSettings(updated)
      if (updated.enabled) {
        await scheduleReminder(updated)
      }
    },
    [settings],
  )

  const handleToggleEnabled = useCallback(async () => {
    if (!isProPlus) {
      onShowPaywall()
      return
    }
    if (!settings) return

    if (!settings.enabled) {
      const granted = await requestNotificationPermissions()
      if (!granted) {
        Alert.alert(
          'Notifications Disabled',
          'Please enable notifications in your device settings to use reminders.',
          [{ text: 'OK' }],
        )
        return
      }
      const updated = { ...settings, enabled: true }
      setSettings(updated)
      await saveReminderSettings(updated)
      await scheduleReminder(updated)
    } else {
      const updated = { ...settings, enabled: false }
      setSettings(updated)
      await saveReminderSettings(updated)
      await cancelReminder()
    }
  }, [isProPlus, onShowPaywall, settings])

  if (!settings) return null

  const selectedFrequency = FREQUENCY_OPTIONS.find((o) => o.value === settings.frequency)
  const selectedTime = HOUR_OPTIONS.find((o) => o.value === settings.hour)

  return (
    <>
      {/* Enable Toggle */}
      <View style={styles.row}>
        <Icon name="bell" type="feather" color="#666" size={20} />
        <Text style={styles.label}>Reminders</Text>
        <View style={styles.rightSide}>
          <Switch
            value={settings.enabled && isProPlus}
            onValueChange={handleToggleEnabled}
            trackColor={{ false: '#e0e0e0', true: `${COLORS.primary}80` }}
            thumbColor={settings.enabled && isProPlus ? COLORS.primary : '#f4f3f4'}
          />
        </View>
      </View>

      {settings.enabled && isProPlus && (
        <>
          {/* Frequency */}
          <TouchableOpacity
            style={styles.row}
            onPress={() => {
              setShowFrequency(!showFrequency)
              setShowTime(false)
            }}
            activeOpacity={0.6}
          >
            <Icon name="repeat" type="feather" color="#666" size={20} />
            <Text style={styles.label}>Frequency</Text>
            <View style={styles.rightSide}>
              <Text style={styles.value}>{selectedFrequency?.label}</Text>
              <Icon name="chevron-right" type="feather" color="#ccc" size={20} />
            </View>
          </TouchableOpacity>

          {showFrequency && (
            <View style={styles.optionsContainer}>
              {FREQUENCY_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.optionRow,
                    settings.frequency === option.value && styles.optionRowSelected,
                  ]}
                  onPress={() => {
                    updateSettings({ frequency: option.value })
                    setShowFrequency(false)
                  }}
                  activeOpacity={0.6}
                >
                  <Text
                    style={[
                      styles.optionText,
                      settings.frequency === option.value && styles.optionTextSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                  {settings.frequency === option.value && (
                    <Icon name="check" type="feather" color={COLORS.primary} size={18} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Time */}
          <TouchableOpacity
            style={styles.row}
            onPress={() => {
              setShowTime(!showTime)
              setShowFrequency(false)
            }}
            activeOpacity={0.6}
          >
            <Icon name="clock" type="feather" color="#666" size={20} />
            <Text style={styles.label}>Time</Text>
            <View style={styles.rightSide}>
              <Text style={styles.value}>{selectedTime?.label}</Text>
              <Icon name="chevron-right" type="feather" color="#ccc" size={20} />
            </View>
          </TouchableOpacity>

          {showTime && (
            <View style={styles.optionsContainer}>
              {HOUR_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.optionRow,
                    settings.hour === option.value && styles.optionRowSelected,
                  ]}
                  onPress={() => {
                    updateSettings({ hour: option.value, minute: 0 })
                    setShowTime(false)
                  }}
                  activeOpacity={0.6}
                >
                  <Text
                    style={[
                      styles.optionText,
                      settings.hour === option.value && styles.optionTextSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                  {settings.hour === option.value && (
                    <Icon name="check" type="feather" color={COLORS.primary} size={18} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </>
      )}
    </>
  )
}

const createStyles = (
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
    optionsContainer: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#e0e0e0',
    },
    optionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: getResponsiveSpacing(48),
      paddingVertical: getResponsiveSpacing(12),
      backgroundColor: '#fafafa',
    },
    optionRowSelected: {
      backgroundColor: `${COLORS.primary}08`,
    },
    optionText: {
      fontSize: getResponsiveTypography('sm'),
      lineHeight: getLineHeight('sm'),
      color: COLORS.textDark,
    },
    optionTextSelected: {
      color: COLORS.primary,
      fontWeight: '600',
    },
  })
