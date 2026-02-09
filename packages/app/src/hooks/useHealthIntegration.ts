import AsyncStorage from '@react-native-async-storage/async-storage'
import { useCallback, useEffect, useState } from 'react'
import {
  type BodyFatSample,
  isHealthAvailable,
  readBodyFatHistory,
  requestPermissions,
  writeBodyFatPercentage,
} from '../services/healthKit'
import { usePremiumStore } from '../store/premiumStore'

const HEALTH_ENABLED_KEY = 'health_integration_enabled'
const HEALTH_PERMISSIONS_KEY = 'health_permissions_granted'

export function useHealthIntegration() {
  const { isPremium } = usePremiumStore()
  const [isEnabled, setIsEnabled] = useState(false)
  const [hasPermissions, setHasPermissions] = useState(false)
  const [available, setAvailable] = useState<boolean | null>(null)
  const [history, setHistory] = useState<BodyFatSample[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Load saved state on mount
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
    }
    load()
  }, [])

  const enable = useCallback(async (): Promise<boolean> => {
    if (!isPremium) return false

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
  }, [isPremium])

  const disable = useCallback(async () => {
    setIsEnabled(false)
    await AsyncStorage.setItem(HEALTH_ENABLED_KEY, 'false')
  }, [])

  const writeBodyFat = useCallback(
    async (percentage: number): Promise<boolean> => {
      if (!isPremium || !isEnabled || !hasPermissions) return false
      return writeBodyFatPercentage(percentage)
    },
    [isPremium, isEnabled, hasPermissions],
  )

  const loadHistory = useCallback(
    async (days = 90) => {
      if (!isPremium || !hasPermissions) return
      setIsLoading(true)
      try {
        const samples = await readBodyFatHistory(days)
        setHistory(samples)
      } finally {
        setIsLoading(false)
      }
    },
    [isPremium, hasPermissions],
  )

  return {
    isEnabled: isEnabled && isPremium,
    hasPermissions,
    available,
    history,
    isLoading,
    enable,
    disable,
    writeBodyFat,
    loadHistory,
  }
}
