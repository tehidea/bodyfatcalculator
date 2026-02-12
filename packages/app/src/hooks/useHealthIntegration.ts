import AsyncStorage from '@react-native-async-storage/async-storage'
import { useCallback, useEffect, useState } from 'react'
import {
  type BodyFatSample,
  getWriteStatuses,
  type HealthWriteData,
  isHealthAvailable,
  readBodyFatHistory,
  requestPermissions,
  type WriteStatuses,
  writeBodyFatPercentage,
  writeHealthData,
} from '../services/healthKit'
import { usePremiumStore } from '../store/premiumStore'

const HEALTH_ENABLED_KEY = 'health_integration_enabled'
const HEALTH_PERMISSIONS_KEY = 'health_permissions_granted'

const DEFAULT_WRITE_STATUSES: WriteStatuses = {
  bodyFat: 'notDetermined',
  weight: 'notDetermined',
  height: 'notDetermined',
  waist: 'notDetermined',
  leanMass: 'notDetermined',
  bmi: 'notDetermined',
}

export function useHealthIntegration() {
  const { isProPlus } = usePremiumStore()
  const [isEnabled, setIsEnabled] = useState(false)
  const [hasPermissions, setHasPermissions] = useState(false)
  const [available, setAvailable] = useState<boolean | null>(null)
  const [history, setHistory] = useState<BodyFatSample[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [writeStatuses, setWriteStatuses] = useState<WriteStatuses>(DEFAULT_WRITE_STATUSES)

  // Load saved state and authorization statuses on mount
  useEffect(() => {
    async function load() {
      const [enabledStr, permStr] = await Promise.all([
        AsyncStorage.getItem(HEALTH_ENABLED_KEY),
        AsyncStorage.getItem(HEALTH_PERMISSIONS_KEY),
      ])
      setIsEnabled(enabledStr === 'true')
      setHasPermissions(permStr === 'true')

      const avail = await isHealthAvailable()
      setAvailable(avail)

      if (permStr === 'true') {
        const statuses = await getWriteStatuses()
        setWriteStatuses(statuses)
      }
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
        const statuses = await getWriteStatuses()
        setWriteStatuses(statuses)
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

  const refreshPermissions = useCallback(async () => {
    await requestPermissions()
    const statuses = await getWriteStatuses()
    setWriteStatuses(statuses)
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
      return writeHealthData(data)
    },
    [isProPlus, isEnabled, hasPermissions],
  )

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
    writeStatuses,
    enable,
    disable,
    refreshPermissions,
    writeBodyFat,
    writeAllHealthData,
    loadHistory,
  }
}
