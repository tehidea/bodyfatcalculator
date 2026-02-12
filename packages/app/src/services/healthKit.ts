import type { MeasurementSystem } from '@bodyfat/shared/types'
import {
  AuthorizationStatus,
  authorizationStatusFor,
  isHealthDataAvailable,
  queryQuantitySamples,
  requestAuthorization,
  saveQuantitySample,
} from '@kingstinct/react-native-healthkit'
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

export type HealthMetric = 'bodyFat' | 'weight' | 'height' | 'waist' | 'leanMass' | 'bmi'

export type WriteStatus = 'authorized' | 'denied' | 'notDetermined'
export type WriteStatuses = Record<HealthMetric, WriteStatus>

const DEFAULT_WRITE_STATUSES: WriteStatuses = {
  bodyFat: 'notDetermined',
  weight: 'notDetermined',
  height: 'notDetermined',
  waist: 'notDetermined',
  leanMass: 'notDetermined',
  bmi: 'notDetermined',
}

const HEALTHKIT_WRITE_IDENTIFIERS: Record<HealthMetric, string> = {
  bodyFat: 'HKQuantityTypeIdentifierBodyFatPercentage',
  weight: 'HKQuantityTypeIdentifierBodyMass',
  height: 'HKQuantityTypeIdentifierHeight',
  waist: 'HKQuantityTypeIdentifierWaistCircumference',
  leanMass: 'HKQuantityTypeIdentifierLeanBodyMass',
  bmi: 'HKQuantityTypeIdentifierBodyMassIndex',
}

// ── iOS HealthKit ──────────────────────────────────────────────

async function iosRequestPermissions(): Promise<boolean> {
  try {
    await requestAuthorization({
      toRead: ['HKQuantityTypeIdentifierBodyFatPercentage'],
      toShare: [
        'HKQuantityTypeIdentifierBodyFatPercentage',
        'HKQuantityTypeIdentifierBodyMass',
        'HKQuantityTypeIdentifierHeight',
        'HKQuantityTypeIdentifierWaistCircumference',
        'HKQuantityTypeIdentifierLeanBodyMass',
        'HKQuantityTypeIdentifierBodyMassIndex',
      ],
    })
    return true
  } catch (error) {
    console.warn('HealthKit authorization error:', error)
    return false
  }
}

async function iosWriteBodyFat(percentage: number): Promise<boolean> {
  try {
    await saveQuantitySample('HKQuantityTypeIdentifierBodyFatPercentage', '%', percentage / 100)
    return true
  } catch (error) {
    console.warn('HealthKit save error:', error)
    return false
  }
}

async function iosWriteWeight(value: number, system: MeasurementSystem): Promise<boolean> {
  try {
    const unit = system === 'metric' ? 'kg' : 'lb'
    await saveQuantitySample('HKQuantityTypeIdentifierBodyMass', unit, value)
    return true
  } catch (error) {
    console.warn('HealthKit saveWeight error:', error)
    return false
  }
}

async function iosWriteHeight(value: number, system: MeasurementSystem): Promise<boolean> {
  try {
    const unit = system === 'metric' ? 'cm' : 'in'
    await saveQuantitySample('HKQuantityTypeIdentifierHeight', unit, value)
    return true
  } catch (error) {
    console.warn('HealthKit saveHeight error:', error)
    return false
  }
}

async function iosWriteWaist(value: number, system: MeasurementSystem): Promise<boolean> {
  try {
    const unit = system === 'metric' ? 'cm' : 'in'
    await saveQuantitySample('HKQuantityTypeIdentifierWaistCircumference', unit, value)
    return true
  } catch (error) {
    console.warn('HealthKit saveWaist error:', error)
    return false
  }
}

async function iosWriteLeanMass(value: number, system: MeasurementSystem): Promise<boolean> {
  try {
    const unit = system === 'metric' ? 'kg' : 'lb'
    await saveQuantitySample('HKQuantityTypeIdentifierLeanBodyMass', unit, value)
    return true
  } catch (error) {
    console.warn('HealthKit saveLeanMass error:', error)
    return false
  }
}

async function iosWriteBmi(value: number): Promise<boolean> {
  try {
    await saveQuantitySample('HKQuantityTypeIdentifierBodyMassIndex', 'count', value)
    return true
  } catch (error) {
    console.warn('HealthKit saveBmi error:', error)
    return false
  }
}

async function iosReadBodyFatHistory(days = 90): Promise<BodyFatSample[]> {
  try {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    const samples = await queryQuantitySamples('HKQuantityTypeIdentifierBodyFatPercentage', {
      ascending: false,
      filter: {
        startDate,
        endDate: new Date(),
      },
    })

    return samples.map((s) => ({
      value: s.quantity * 100,
      startDate: new Date(s.startDate).toISOString(),
      endDate: new Date(s.endDate).toISOString(),
    }))
  } catch (error) {
    console.warn('HealthKit read error:', error)
    return []
  }
}

async function iosIsAvailable(): Promise<boolean> {
  try {
    return await isHealthDataAvailable()
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

// ── Write authorization status ─────────────────────────────────

function iosGetWriteStatuses(): WriteStatuses {
  const statuses = { ...DEFAULT_WRITE_STATUSES }
  for (const [metric, identifier] of Object.entries(HEALTHKIT_WRITE_IDENTIFIERS)) {
    const status = authorizationStatusFor(identifier as any)
    if (status === AuthorizationStatus.sharingAuthorized) {
      statuses[metric as HealthMetric] = 'authorized'
    } else if (status === AuthorizationStatus.sharingDenied) {
      statuses[metric as HealthMetric] = 'denied'
    }
  }
  return statuses
}

async function androidGetWriteStatuses(): Promise<WriteStatuses> {
  try {
    const { getGrantedPermissions } = require('react-native-health-connect')
    const granted = await getGrantedPermissions()
    const statuses = { ...DEFAULT_WRITE_STATUSES }
    const writeMap: Partial<Record<HealthMetric, string>> = {
      bodyFat: 'BodyFat',
      weight: 'Weight',
      height: 'Height',
      leanMass: 'LeanBodyMass',
    }
    for (const [metric, recordType] of Object.entries(writeMap)) {
      const isGranted = granted.some(
        (p: { accessType: string; recordType: string }) =>
          p.accessType === 'write' && p.recordType === recordType,
      )
      statuses[metric as HealthMetric] = isGranted ? 'authorized' : 'denied'
    }
    return statuses
  } catch {
    return DEFAULT_WRITE_STATUSES
  }
}

// ── Unified platform-abstracted API ────────────────────────────

export async function getWriteStatuses(): Promise<WriteStatuses> {
  if (Platform.OS === 'ios') return iosGetWriteStatuses()
  if (Platform.OS === 'android') return androidGetWriteStatuses()
  return DEFAULT_WRITE_STATUSES
}

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

export async function writeHealthData(data: HealthWriteData): Promise<boolean> {
  const results: boolean[] = []

  try {
    results.push(await writeBodyFatPercentage(data.bodyFatPercentage))
  } catch {
    results.push(false)
  }

  if (data.weight != null) {
    try {
      results.push(await writeWeight(data.weight, data.measurementSystem))
    } catch {
      results.push(false)
    }
  }

  if (data.height != null) {
    try {
      results.push(await writeHeight(data.height, data.measurementSystem))
    } catch {
      results.push(false)
    }
  }

  if (data.waist != null) {
    try {
      results.push(await writeWaist(data.waist, data.measurementSystem))
    } catch {
      results.push(false)
    }
  }

  if (data.leanMass != null) {
    try {
      results.push(await writeLeanMass(data.leanMass, data.measurementSystem))
    } catch {
      results.push(false)
    }
  }

  if (data.bmi != null) {
    try {
      results.push(await writeBmi(data.bmi))
    } catch {
      results.push(false)
    }
  }

  return results.length > 0 && results.every(Boolean)
}
