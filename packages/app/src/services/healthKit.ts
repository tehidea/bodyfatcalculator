import { Platform } from 'react-native'

export interface BodyFatSample {
  value: number
  startDate: string
  endDate: string
}

// iOS HealthKit implementation
async function iosRequestPermissions(): Promise<boolean> {
  const AppleHealthKit = require('react-native-health').default
  const { HealthKitDataType } = require('react-native-health')

  return new Promise((resolve) => {
    const permissions = {
      permissions: {
        read: [HealthKitDataType.BodyFatPercentage],
        write: [HealthKitDataType.BodyFatPercentage],
      },
    }

    AppleHealthKit.initHealthKit(permissions, (error: string) => {
      if (error) {
        console.warn('HealthKit init error:', error)
        resolve(false)
        return
      }
      resolve(true)
    })
  })
}

async function iosWriteBodyFat(percentage: number): Promise<boolean> {
  const AppleHealthKit = require('react-native-health').default

  return new Promise((resolve) => {
    AppleHealthKit.saveBodyFatPercentage({ value: percentage }, (error: string) => {
      if (error) {
        console.warn('HealthKit save error:', error)
        resolve(false)
        return
      }
      resolve(true)
    })
  })
}

async function iosReadBodyFatHistory(days = 90): Promise<BodyFatSample[]> {
  const AppleHealthKit = require('react-native-health').default

  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  return new Promise((resolve) => {
    AppleHealthKit.getBodyFatPercentageSamples(
      {
        startDate: startDate.toISOString(),
        endDate: new Date().toISOString(),
        ascending: false,
      },
      (error: string, results: Array<{ value: number; startDate: string; endDate: string }>) => {
        if (error) {
          console.warn('HealthKit read error:', error)
          resolve([])
          return
        }
        resolve(
          results.map((r) => ({
            value: r.value,
            startDate: r.startDate,
            endDate: r.endDate,
          })),
        )
      },
    )
  })
}

async function iosIsAvailable(): Promise<boolean> {
  try {
    const AppleHealthKit = require('react-native-health').default
    return new Promise((resolve) => {
      AppleHealthKit.isAvailable((error: string, available: boolean) => {
        resolve(!error && available)
      })
    })
  } catch {
    return false
  }
}

// Android Health Connect implementation
async function androidRequestPermissions(): Promise<boolean> {
  try {
    const { initialize, requestPermission } = require('react-native-health-connect')

    const initialized = await initialize()
    if (!initialized) return false

    const granted = await requestPermission([
      { accessType: 'read', recordType: 'BodyFat' },
      { accessType: 'write', recordType: 'BodyFat' },
    ])

    return granted.length > 0
  } catch (error) {
    console.warn('Health Connect permission error:', error)
    return false
  }
}

async function androidWriteBodyFat(percentage: number): Promise<boolean> {
  try {
    const { insertRecords } = require('react-native-health-connect')

    const now = new Date().toISOString()
    await insertRecords([
      {
        recordType: 'BodyFat',
        percentage,
        time: now,
      },
    ])
    return true
  } catch (error) {
    console.warn('Health Connect write error:', error)
    return false
  }
}

async function androidReadBodyFatHistory(days = 90): Promise<BodyFatSample[]> {
  try {
    const { readRecords } = require('react-native-health-connect')

    const endTime = new Date().toISOString()
    const startTime = new Date()
    startTime.setDate(startTime.getDate() - days)

    const result = await readRecords('BodyFat', {
      timeRangeFilter: {
        operator: 'between',
        startTime: startTime.toISOString(),
        endTime,
      },
    })

    return result.records.map(
      (r: { percentage: number; time: string; metadata?: { lastModifiedTime?: string } }) => ({
        value: r.percentage,
        startDate: r.time,
        endDate: r.metadata?.lastModifiedTime || r.time,
      }),
    )
  } catch (error) {
    console.warn('Health Connect read error:', error)
    return []
  }
}

async function androidIsAvailable(): Promise<boolean> {
  try {
    const { getSdkStatus, SdkAvailabilityStatus } = require('react-native-health-connect')
    const status = await getSdkStatus()
    return status === SdkAvailabilityStatus.SDK_AVAILABLE
  } catch {
    return false
  }
}

// Unified platform-abstracted API
export async function requestPermissions(): Promise<boolean> {
  if (Platform.OS === 'ios') return iosRequestPermissions()
  if (Platform.OS === 'android') return androidRequestPermissions()
  return false
}

export async function writeBodyFatPercentage(percentage: number): Promise<boolean> {
  if (Platform.OS === 'ios') return iosWriteBodyFat(percentage)
  if (Platform.OS === 'android') return androidWriteBodyFat(percentage)
  return false
}

export async function readBodyFatHistory(days = 90): Promise<BodyFatSample[]> {
  if (Platform.OS === 'ios') return iosReadBodyFatHistory(days)
  if (Platform.OS === 'android') return androidReadBodyFatHistory(days)
  return []
}

export async function isHealthAvailable(): Promise<boolean> {
  if (Platform.OS === 'ios') return iosIsAvailable()
  if (Platform.OS === 'android') return androidIsAvailable()
  return false
}
