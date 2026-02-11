import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications'
import { Platform } from 'react-native'

export type ReminderFrequency = 'daily' | 'weekly' | 'monthly'

export interface ReminderSettings {
  enabled: boolean
  frequency: ReminderFrequency
  hour: number
  minute: number
  weekday: number // 1=Sunday, 2=Monday, ..., 7=Saturday
  day: number // 1–28, day of month for monthly reminders
}

const REMINDER_SETTINGS_KEY = 'reminder_settings'
const NOTIFICATION_ID_KEY = 'reminder_notification_id'

const DEFAULT_SETTINGS: ReminderSettings = {
  enabled: false,
  frequency: 'weekly',
  hour: 9,
  minute: 0,
  weekday: 2, // Monday
  day: 1, // 1st of the month
}

export async function requestNotificationPermissions(): Promise<boolean> {
  const { status: existing } = await Notifications.getPermissionsAsync()
  if (existing === 'granted') return true

  const { status } = await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
    },
  })
  return status === 'granted'
}

export async function getReminderSettings(): Promise<ReminderSettings> {
  const stored = await AsyncStorage.getItem(REMINDER_SETTINGS_KEY)
  if (!stored) return DEFAULT_SETTINGS
  return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) }
}

export async function saveReminderSettings(settings: ReminderSettings): Promise<void> {
  await AsyncStorage.setItem(REMINDER_SETTINGS_KEY, JSON.stringify(settings))
}

async function cancelExistingReminder(): Promise<void> {
  const existingId = await AsyncStorage.getItem(NOTIFICATION_ID_KEY)
  if (existingId) {
    await Notifications.cancelScheduledNotificationAsync(existingId)
    await AsyncStorage.removeItem(NOTIFICATION_ID_KEY)
  }
}

function getTrigger(settings: ReminderSettings): Notifications.NotificationTriggerInput {
  const { frequency, hour, minute, weekday } = settings

  switch (frequency) {
    case 'daily':
      return {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour,
        minute,
      }

    case 'weekly':
      return {
        type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
        weekday,
        hour,
        minute,
      }

    case 'monthly':
      return {
        type: Notifications.SchedulableTriggerInputTypes.MONTHLY,
        day: settings.day,
        hour,
        minute,
      }
  }
}

export async function scheduleReminder(settings: ReminderSettings): Promise<string | null> {
  await cancelExistingReminder()

  if (!settings.enabled) return null

  const granted = await requestNotificationPermissions()
  if (!granted) return null

  const trigger = getTrigger(settings)

  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Time to Measure',
      body: 'Track your body fat percentage to monitor your progress.',
      ...(Platform.OS === 'android' && { channelId: 'reminders' }),
    },
    trigger,
  })

  await AsyncStorage.setItem(NOTIFICATION_ID_KEY, id)
  return id
}

export async function cancelReminder(): Promise<void> {
  await cancelExistingReminder()
}

// Set up notification handler so notifications show when app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})

// Set up Android notification channel
if (Platform.OS === 'android') {
  Notifications.setNotificationChannelAsync('reminders', {
    name: 'Measurement Reminders',
    importance: Notifications.AndroidImportance.DEFAULT,
    sound: 'default',
  })
}
