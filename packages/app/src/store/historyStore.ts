import type { Formula, Gender, MeasurementSystem, StandardizedInputs } from '@bodyfat/shared/types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'
import { Platform } from 'react-native'
import { v4 as uuidv4 } from 'uuid'
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
}

interface HistoryStore {
  measurements: MeasurementRecord[]
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
  setHasHydrated: (state: boolean) => void
}

export const useHistoryStore = create<HistoryStore>()(
  persist(
    (set, get) => ({
      measurements: [],
      _hasHydrated: false,

      addMeasurement: (params) => {
        const now = new Date().toISOString()
        const record: MeasurementRecord = {
          clientId: uuidv4(),
          ...params,
          measuredAt: now,
          deletedAt: null,
          version: now,
          appVersion: Constants.expoConfig?.version || 'unknown',
          platform: Platform.OS,
        }
        set((state) => ({
          measurements: [record, ...state.measurements],
        }))
        return record
      },

      deleteMeasurement: (clientId) => {
        set((state) => ({
          measurements: state.measurements.map((m) =>
            m.clientId === clientId ? { ...m, deletedAt: new Date().toISOString() } : m,
          ),
        }))
      },

      getActiveMeasurements: () => {
        return get().measurements.filter((m) => m.deletedAt === null)
      },

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
