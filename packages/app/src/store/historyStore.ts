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
            } else {
              newRecords.push({ ...record, syncedAt: new Date().toISOString() })
            }
          }

          return {
            measurements: [...newRecords, ...state.measurements].sort(
              (a, b) => new Date(b.measuredAt).getTime() - new Date(a.measuredAt).getTime(),
            ),
          }
        })
      },

      setCloudSyncEnabled: (enabled) => set({ cloudSyncEnabled: enabled }),
      setLastSyncedAt: (timestamp) => set({ lastSyncedAt: timestamp }),
      setHasHydrated: (state: boolean) => set({ _hasHydrated: state }),
    }),
    {
      name: 'history-storage',
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error('History hydration failed:', error)
        }
        state?.setHasHydrated(true)
      },
    },
  ),
)
