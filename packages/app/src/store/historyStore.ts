import type { Formula, Gender, MeasurementSystem, StandardizedInputs } from '@bodyfat/shared/types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'
import { randomUUID } from 'expo-crypto'
import { Platform } from 'react-native'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface MeasurementRecord {
  clientId: string
  formula: Formula
  gender: Gender
  measurementSystem: MeasurementSystem
  inputs: StandardizedInputs
  bodyFatPercentage: number
  fatMass: number
  leanMass: number
  classification: string
  measuredAt: string
  deletedAt: string | null
  version: string
  appVersion: string
  platform: string
  syncedAt: string | null
  photoUri: string | null
  hasPhoto: boolean
}

interface HistoryStore {
  measurements: MeasurementRecord[]
  cloudSyncEnabled: boolean
  lastSyncedAt: string | null
  _hasHydrated: boolean

  addMeasurement: (params: {
    formula: Formula
    gender: Gender
    measurementSystem: MeasurementSystem
    inputs: StandardizedInputs
    bodyFatPercentage: number
    fatMass: number
    leanMass: number
    classification: string
  }) => MeasurementRecord

  deleteMeasurement: (clientId: string) => void
  getActiveMeasurements: () => MeasurementRecord[]
  getUnsyncedMeasurements: () => MeasurementRecord[]
  markSynced: (clientIds: string[]) => void
  mergeFromCloud: (records: MeasurementRecord[]) => void
  setPhotoUri: (clientId: string, photoUri: string | null) => void
  purgeOldDeleted: () => string[]
  setCloudSyncEnabled: (enabled: boolean) => void
  setLastSyncedAt: (timestamp: string) => void
  setHasHydrated: (state: boolean) => void
}

export const useHistoryStore = create<HistoryStore>()(
  persist(
    (set, get) => ({
      measurements: [],
      cloudSyncEnabled: false,
      lastSyncedAt: null,
      _hasHydrated: false,

      addMeasurement: (params) => {
        const now = new Date().toISOString()
        const record: MeasurementRecord = {
          clientId: randomUUID(),
          ...params,
          measuredAt: now,
          deletedAt: null,
          version: now,
          appVersion: Constants.expoConfig?.version || 'unknown',
          platform: Platform.OS,
          syncedAt: null,
          photoUri: null,
          hasPhoto: false,
        }
        set((state) => ({
          measurements: [record, ...state.measurements],
        }))
        return record
      },

      deleteMeasurement: (clientId) => {
        set((state) => ({
          measurements: state.measurements.map((m) =>
            m.clientId === clientId
              ? { ...m, deletedAt: new Date().toISOString(), syncedAt: null }
              : m,
          ),
        }))
      },

      getActiveMeasurements: () => {
        return get().measurements.filter((m) => m.deletedAt === null)
      },

      getUnsyncedMeasurements: () => {
        return get().measurements.filter((m) => m.syncedAt === null)
      },

      markSynced: (clientIds) => {
        const now = new Date().toISOString()
        set((state) => ({
          measurements: state.measurements.map((m) =>
            clientIds.includes(m.clientId) ? { ...m, syncedAt: now } : m,
          ),
        }))
      },

      mergeFromCloud: (records) => {
        set((state) => {
          const existingIds = new Set(state.measurements.map((m) => m.clientId))
          const newRecords: MeasurementRecord[] = []

          for (const record of records) {
            if (existingIds.has(record.clientId)) {
              // Update existing: apply cloud deletedAt if newer
              const existing = state.measurements.find((m) => m.clientId === record.clientId)
              if (existing && record.deletedAt && !existing.deletedAt) {
                // Cloud says deleted, local doesn't — apply deletion
                existing.deletedAt = record.deletedAt
                existing.syncedAt = new Date().toISOString()
              }
              // Apply photo metadata from cloud if local doesn't have a photo
              if (existing && record.hasPhoto && !existing.hasPhoto) {
                existing.hasPhoto = true
                existing.photoUri = record.photoUri
              }
            } else {
              newRecords.push({
                ...record,
                photoUri: record.photoUri ?? null,
                hasPhoto: record.hasPhoto ?? false,
                syncedAt: new Date().toISOString(),
              })
            }
          }

          return {
            measurements: [...newRecords, ...state.measurements].sort(
              (a, b) => new Date(b.measuredAt).getTime() - new Date(a.measuredAt).getTime(),
            ),
          }
        })
      },

      setPhotoUri: (clientId, photoUri) => {
        set((state) => ({
          measurements: state.measurements.map((m) =>
            m.clientId === clientId
              ? { ...m, photoUri, hasPhoto: photoUri !== null, syncedAt: null }
              : m,
          ),
        }))
      },

      purgeOldDeleted: () => {
        const cutoff = Date.now() - 365 * 24 * 60 * 60 * 1000
        const purgedIds: string[] = []
        set((state) => ({
          measurements: state.measurements.filter((m) => {
            if (m.deletedAt && m.syncedAt && new Date(m.deletedAt).getTime() < cutoff) {
              purgedIds.push(m.clientId)
              return false
            }
            return true
          }),
        }))
        return purgedIds
      },

      setCloudSyncEnabled: (enabled) => set({ cloudSyncEnabled: enabled }),
      setLastSyncedAt: (timestamp) => set({ lastSyncedAt: timestamp }),
      setHasHydrated: (state: boolean) => set({ _hasHydrated: state }),
    }),
    {
      name: 'history-storage',
      version: 2,
      storage: createJSONStorage(() => AsyncStorage),
      migrate: (persisted, version) => {
        const state = persisted as HistoryStore
        if (version < 2) {
          // Add photoUri and hasPhoto to existing records
          state.measurements = state.measurements.map((m) => ({
            ...m,
            photoUri: m.photoUri ?? null,
            hasPhoto: m.hasPhoto ?? false,
          }))
        }
        return state
      },
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error('History hydration failed:', error)
        }
        state?.setHasHydrated(true)
      },
    },
  ),
)
