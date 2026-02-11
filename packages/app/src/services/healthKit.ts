import type { MeasurementSystem } from '@bodyfat/shared/types'
import { Platform } from 'react-native'

export interface BodyFatSample {
  value: number
  startDate: string
  endDate: string
}

export interface HealthWriteData {
  bodyFatPercentage: number
  weight?: number | undefined
  height?: number | undefined
  waist?: number | undefined
  leanMass?: number | undefined
  bmi?: number | undefined
  measurementSystem: MeasurementSystem
}

export type HealthMetric = 'weight' | 'height' | 'waist' | 'leanMass' | 'bmi'

// ── iOS HealthKit ──────────────────────────────────────────────

async function iosRequestPermissions(): Promise<boolean> {
  const AppleHealthKit = require('react-native-health').default
  const { HealthKitDataType } = require('react-native-health')

  return new Promise((resolve) => {
    const permissions = {
      permissions: {
        read: [HealthKitDataType.BodyFatPercentage],
        write: [
          HealthKitDataType.BodyFatPercentage,
          HealthKitDataType.Weight,
          HealthKitDataType.Height,
          HealthKitDataType.WaistCircumference,
          HealthKitDataType.LeanBodyMass,
          HealthKitDataType.BodyMassIndex,
        ],
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

async function iosWriteWeight(value: number, system: MeasurementSystem): Promise<boolean> {
  const AppleHealthKit = require('react-native-health').default
  return new Promise((resolve) => {
    const options =
      system === 'metric' ? { value: value * 1000, unit: 'gram' } : { value, unit: 'pound' }
    AppleHealthKit.saveWeight(options, (error: string) => {
      if (error) {
        console.warn('HealthKit saveWeight error:', error)
        resolve(false)
        return
      }
      resolve(true)
    })
  })
}

async function iosWriteHeight(value: number, system: MeasurementSystem): Promise<boolean> {
  const AppleHealthKit = require('react-native-health').default
  return new Promise((resolve) => {
    const options =
      system === 'metric' ? { value: value / 100, unit: 'meter' } : { value, unit: 'inch' }
    AppleHealthKit.saveHeight(options, (error: string) => {
      if (error) {
        console.warn('HealthKit saveHeight error:', error)
        resolve(false)
        return
      }
      resolve(true)
    })
  })
}

async function iosWriteWaist(value: number, system: MeasurementSystem): Promise<boolean> {
  const AppleHealthKit = require('react-native-health').default
  return new Promise((resolve) => {
    const options =
      system === 'metric' ? { value: value / 100, unit: 'meter' } : { value, unit: 'inch' }
    AppleHealthKit.saveWaistCircumference(options, (error: string) => {
      if (error) {
        console.warn('HealthKit saveWaistCircumference error:', error)
        resolve(false)
        return
      }
      resolve(true)
    })
  })
}

async function iosWriteLeanMass(value: number, system: MeasurementSystem): Promise<boolean> {
  const AppleHealthKit = require('react-native-health').default
  return new Promise((resolve) => {
    const options =
      system === 'metric' ? { value: value * 1000, unit: 'gram' } : { value, unit: 'pound' }
    AppleHealthKit.saveLeanBodyMass(options, (error: string) => {
      if (error) {
        console.warn('HealthKit saveLeanBodyMass error:', error)
        resolve(false)
        return
      }
      resolve(true)
    })
  })
}

async function iosWriteBmi(value: number): Promise<boolean> {
  const AppleHealthKit = require('react-native-health').default
  return new Promise((resolve) => {
    AppleHealthKit.saveBmi({ value }, (error: string) => {
      if (error) {
        console.warn('HealthKit saveBmi error:', error)
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

// ── Android Health Connect ─────────────────────────────────────

async function androidRequestPermissions(): Promise<boolean> {
  try {
    const { initialize, requestPermission } = require('react-native-health-connect')

    const initialized = await initialize()
    if (!initialized) return false

    const granted = await requestPermission([
      { accessType: 'read', recordType: 'BodyFat' },
      { accessType: 'write', recordType: 'BodyFat' },
      { accessType: 'write', recordType: 'Weight' },
      { accessType: 'write', recordType: 'Height' },
      { accessType: 'write', recordType: 'LeanBodyMass' },
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

async function androidWriteWeight(value: number, system: MeasurementSystem): Promise<boolean> {
  try {
    const { insertRecords } = require('react-native-health-connect')
    const now = new Date().toISOString()
    await insertRecords([
      {
        recordType: 'Weight',
        weight: { value, unit: system === 'metric' ? 'kilograms' : 'pounds' },
        time: now,
      },
    ])
    return true
  } catch (error) {
    console.warn('Health Connect writeWeight error:', error)
    return false
  }
}

async function androidWriteHeight(value: number, system: MeasurementSystem): Promise<boolean> {
  try {
    const { insertRecords } = require('react-native-health-connect')
    const now = new Date().toISOString()
    await insertRecords([
      {
        recordType: 'Height',
        height: {
          value: system === 'metric' ? value / 100 : value,
          unit: system === 'metric' ? 'meters' : 'inches',
        },
        time: now,
      },
    ])
    return true
  } catch (error) {
    console.warn('Health Connect writeHeight error:', error)
    return false
  }
}

async function androidWriteLeanMass(value: number, system: MeasurementSystem): Promise<boolean> {
  try {
    const { insertRecords } = require('react-native-health-connect')
    const now = new Date().toISOString()
    await insertRecords([
      {
        recordType: 'LeanBodyMass',
        mass: { value, unit: system === 'metric' ? 'kilograms' : 'pounds' },
        time: now,
      },
    ])
    return true
  } catch (error) {
    console.warn('Health Connect writeLeanMass error:', error)
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

// ── Internal platform dispatchers ──────────────────────────────

async function writeWeight(value: number, system: MeasurementSystem): Promise<boolean> {
  if (Platform.OS === 'ios') return iosWriteWeight(value, system)
  if (Platform.OS === 'android') return androidWriteWeight(value, system)
  return false
}

async function writeHeight(value: number, system: MeasurementSystem): Promise<boolean> {
  if (Platform.OS === 'ios') return iosWriteHeight(value, system)
  if (Platform.OS === 'android') return androidWriteHeight(value, system)
  return false
}

async function writeWaist(value: number, system: MeasurementSystem): Promise<boolean> {
  if (Platform.OS === 'ios') return iosWriteWaist(value, system)
  // Waist circumference not available on Android Health Connect
  return false
}

async function writeLeanMass(value: number, system: MeasurementSystem): Promise<boolean> {
  if (Platform.OS === 'ios') return iosWriteLeanMass(value, system)
  if (Platform.OS === 'android') return androidWriteLeanMass(value, system)
  return false
}

async function writeBmi(value: number): Promise<boolean> {
  if (Platform.OS === 'ios') return iosWriteBmi(value)
  // BMI not available on Android Health Connect
  return false
}

// ── Unified platform-abstracted API ────────────────────────────

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

export async function writeHealthData(
  data: HealthWriteData,
  enabledMetrics: Record<HealthMetric, boolean>,
): Promise<boolean> {
  const results: boolean[] = []

  try {
    results.push(await writeBodyFatPercentage(data.bodyFatPercentage))
  } catch {
    results.push(false)
  }

  if (enabledMetrics.weight && data.weight != null) {
    try {
      results.push(await writeWeight(data.weight, data.measurementSystem))
    } catch {
      results.push(false)
    }
  }

  if (enabledMetrics.height && data.height != null) {
    try {
      results.push(await writeHeight(data.height, data.measurementSystem))
    } catch {
      results.push(false)
    }
  }

  if (enabledMetrics.waist && data.waist != null) {
    try {
      results.push(await writeWaist(data.waist, data.measurementSystem))
    } catch {
      results.push(false)
    }
  }

  if (enabledMetrics.leanMass && data.leanMass != null) {
    try {
      results.push(await writeLeanMass(data.leanMass, data.measurementSystem))
    } catch {
      results.push(false)
    }
  }

  if (enabledMetrics.bmi && data.bmi != null) {
    try {
      results.push(await writeBmi(data.bmi))
    } catch {
      results.push(false)
    }
  }

  return results.length > 0 && results.every(Boolean)
}
