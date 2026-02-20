import { Platform } from 'react-native'

export interface ChangelogHighlight {
  icon: string
  title: string
  description: string
}

export interface LegacyProComparisonRow {
  feature: string
  pro: boolean
  proPlus: boolean
}

export interface LegacyProInfo {
  message: string
  comparison: LegacyProComparisonRow[]
  cta: string
}

export interface ChangelogEntry {
  version: string
  title: string
  highlights: ChangelogHighlight[]
  legacyProInfo?: LegacyProInfo | undefined
}

/**
 * Newest-first. To add a release, prepend an entry.
 * `icon` values are Feather icon names (used with @rneui/themed Icon).
 */
export const CHANGELOG: ChangelogEntry[] = [
  {
    version: '2.0.0',
    title: 'Introducing PRO+',
    legacyProInfo: {
      message:
        'Your PRO lifetime purchase is safe — you keep all your existing features. The new features below are part of the PRO+ subscription, available to you at 50% off as a loyal customer.',
      comparison: [
        { feature: 'Advanced Formulas', pro: true, proPlus: true },
        { feature: 'Decimal Precision', pro: true, proPlus: true },
        { feature: 'Measurement History', pro: false, proPlus: true },
        { feature: 'Cloud Sync', pro: false, proPlus: true },
        { feature: 'Health Integration', pro: false, proPlus: true },
        { feature: 'Reminders', pro: false, proPlus: true },
      ],
      cta: 'Upgrade to PRO+ at 50% off — your loyalty discount is applied automatically.',
    },
    highlights: [
      {
        icon: 'clock',
        title: 'Measurement History',
        description: 'Track every measurement and visualize your progress over time.',
      },
      {
        icon: 'cloud',
        title: 'Cloud Sync',
        description: Platform.select({
          ios: 'Seamlessly sync your data across devices with iCloud.',
          default: 'Seamlessly sync your data across devices with Google Drive.',
        }),
      },
      {
        icon: 'heart',
        title: 'Health Integration',
        description: Platform.select({
          ios: 'Send results to Apple Health automatically.',
          default: 'Send results to Google Health Connect automatically.',
        }),
      },
      {
        icon: 'bell',
        title: 'Reminders',
        description: 'Set recurring notifications so you never miss a measurement.',
      },
      {
        icon: 'user',
        title: 'Body Illustrations',
        description: 'Anatomical guides show exactly where to take each measurement.',
      },
    ],
  },
  {
    version: '1.4.3',
    title: 'Tablet & Foldable Support',
    highlights: [
      {
        icon: 'tablet',
        title: 'Layout Optimization',
        description: 'Enhanced layout for larger displays, tablets, and foldable devices.',
      },
    ],
  },
  {
    version: '1.4.2',
    title: 'Android Launch',
    highlights: [
      {
        icon: 'smartphone',
        title: 'Public Android Release',
        description: 'Now available on Android devices worldwide.',
      },
      {
        icon: 'save',
        title: 'Persistent Measurements',
        description: 'Measurements are now kept when switching between formulas.',
      },
    ],
  },
  {
    version: '1.4.0',
    title: 'iOS Launch',
    highlights: [
      {
        icon: 'smartphone',
        title: 'Public iOS Release',
        description: 'Official App Store launch for iPhone and iPad.',
      },
    ],
  },
]
