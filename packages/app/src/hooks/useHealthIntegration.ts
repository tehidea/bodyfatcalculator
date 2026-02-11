import AsyncStorage from '@react-native-async-storage/async-storage'
import { useCallback, useEffect, useState } from 'react'
import {
  type BodyFatSample,
  type HealthMetric,
  type HealthWriteData,
  isHealthAvailable,
  readBodyFatHistory,
  requestPermissions,
  writeBodyFatPercentage,
  writeHealthData,
} from '../services/healthKit'
import { usePremiumStore } from '../store/premiumStore'

const HEALTH_ENABLED_KEY = 'health_integration_enabled'
const HEALTH_PERMISSIONS_KEY = 'health_permissions_granted'
const HEALTH_METRICS_KEY = 'health_sync_metrics'

type SyncMetrics = Record<HealthMetric, boolean>

const DEFAULT_SYNC_METRICS: SyncMetrics = {
  weight: true,
  height: true,
  waist: true,
  leanMass: true,
  bmi: true,
}

export function useHealthIntegration() {
  const { isProPlus } = usePremiumStore()
  const [isEnabled, setIsEnabled] = useState(false)
  const [hasPermissions, setHasPermissions] = useState(false)
  const [available, setAvailable] = useState<boolean | null>(null)
  const [history, setHistory] = useState<BodyFatSample[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [syncMetrics, setSyncMetrics] = useState<SyncMetrics>(DEFAULT_SYNC_METRICS)

  // Load saved state on mount
  useEffect(() => {
    async function load() {
      const [enabledStr, permStr, metricsStr] = await Promise.all([
        AsyncStorage.getItem(HEALTH_ENABLED_KEY),
        AsyncStorage.getItem(HEALTH_PERMISSIONS_KEY),
        AsyncStorage.getItem(HEALTH_METRICS_KEY),
      ])
      setIsEnabled(enabledStr === 'true')
      setHasPermissions(permStr === 'true')

      if (metricsStr) {
        try {
          setSyncMetrics({ ...DEFAULT_SYNC_METRICS, ...JSON.parse(metricsStr) })
        } catch {
          // Keep defaults if parsing fails
        }
      }

      const avail = await isHealthAvailable()
      setAvailable(avail)
    }
    load()
  }, [])

  const enable = useCallback(async (): Promise<boolean> => {
    if (!isProPlus) return false

    setIsLoading(true)
    try {
      const granted = await requestPermissions()
      setHasPermissions(granted)
      await AsyncStorage.setItem(HEALTH_PERMISSIONS_KEY, String(granted))

      if (granted) {
        setIsEnabled(true)
        await AsyncStorage.setItem(HEALTH_ENABLED_KEY, 'true')
      }
      return granted
    } finally {
      setIsLoading(false)
    }
  }, [isProPlus])

  const disable = useCallback(async () => {
    setIsEnabled(false)
    await AsyncStorage.setItem(HEALTH_ENABLED_KEY, 'false')
  }, [])

  const writeBodyFat = useCallback(
    async (percentage: number): Promise<boolean> => {
      if (!isProPlus || !isEnabled || !hasPermissions) return false
      return writeBodyFatPercentage(percentage)
    },
    [isProPlus, isEnabled, hasPermissions],
  )

  const writeAllHealthData = useCallback(
    async (data: HealthWriteData): Promise<boolean> => {
      if (!isProPlus || !isEnabled || !hasPermissions) return false
      return writeHealthData(data, syncMetrics)
    },
    [isProPlus, isEnabled, hasPermissions, syncMetrics],
  )

  const setSyncMetric = useCallback(async (metric: HealthMetric, enabled: boolean) => {
    setSyncMetrics((prev) => {
      const updated = { ...prev, [metric]: enabled }
      AsyncStorage.setItem(HEALTH_METRICS_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const loadHistory = useCallback(
    async (days = 90) => {
      if (!isProPlus || !hasPermissions) return
      setIsLoading(true)
      try {
        const samples = await readBodyFatHistory(days)
        setHistory(samples)
      } finally {
        setIsLoading(false)
      }
    },
    [isProPlus, hasPermissions],
  )

  return {
    isEnabled: isEnabled && isProPlus,
    hasPermissions,
    available,
    history,
    isLoading,
    syncMetrics,
    enable,
    disable,
    writeBodyFat,
    writeAllHealthData,
    setSyncMetric,
    loadHistory,
  }
}
