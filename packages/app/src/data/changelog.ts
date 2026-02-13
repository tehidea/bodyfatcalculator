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
  date: string
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
    date: '2025-06-01',
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
        description: 'Seamlessly sync your data across devices with iCloud or Google Drive.',
      },
      {
        icon: 'heart',
        title: 'Health Integration',
        description: 'Send results to Apple Health or Google Health Connect automatically.',
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
    date: '2025-02-20',
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
    date: '2025-02-01',
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
    date: '2025-01-15',
    title: 'iOS Launch',
    highlights: [
      {
        icon: 'smartphone',
        title: 'Public iOS Release',
        description: 'Official App Store launch for iPhone and iPad.',
      },
      {
        icon: 'refresh-cw',
        title: 'Restore Purchases',
        description: 'Added ability to restore previous purchases on new devices.',
      },
    ],
  },
  {
    version: '1.3.0',
    date: '2024-12-10',
    title: 'Scientific References',
    highlights: [
      {
        icon: 'book-open',
        title: 'Formula References',
        description: 'Added scientific references and educational content for each formula.',
      },
    ],
  },
  {
    version: '1.2.0',
    date: '2024-11-20',
    title: 'More Formulas',
    highlights: [
      {
        icon: 'plus-circle',
        title: 'Additional Formulas',
        description: 'Added new calculation methods for more accuracy options.',
      },
      {
        icon: 'help-circle',
        title: 'Measurement Tooltips',
        description: 'Helpful tooltips explain where and how to take each measurement.',
      },
    ],
  },
  {
    version: '1.1.0',
    date: '2024-11-01',
    title: 'Polish & Performance',
    highlights: [
      {
        icon: 'type',
        title: 'Better Readability',
        description: 'Enhanced typography scaling across all screen sizes.',
      },
      {
        icon: 'zap',
        title: 'Smooth Animations',
        description: 'Added transitions and improved overall performance.',
      },
    ],
  },
  {
    version: '1.0.0',
    date: '2024-10-01',
    title: 'Initial Release',
    highlights: [
      {
        icon: 'activity',
        title: 'Body Fat Calculator',
        description: 'Core calculation features with basic and PRO measurement methods.',
      },
    ],
  },
]
