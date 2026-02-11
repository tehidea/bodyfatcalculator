import { Platform } from 'react-native'
import { CloudStorage, CloudStorageScope } from 'react-native-cloud-storage'
import type { MeasurementRecord } from '../store/historyStore'
import { useHistoryStore } from '../store/historyStore'

const MEASUREMENTS_DIR = '/measurements'
const SCOPE = CloudStorageScope.AppData

export type SyncStatus = 'idle' | 'syncing' | 'synced' | 'error'

export interface SyncResult {
  pushed: number
  pulled: number
  errors: string[]
}

async function ensureMeasurementsDir(): Promise<void> {
  const exists = await CloudStorage.exists(MEASUREMENTS_DIR, SCOPE)
  if (!exists) {
    await CloudStorage.mkdir(MEASUREMENTS_DIR, SCOPE)
  }
}

function getFilePath(clientId: string): string {
  return `${MEASUREMENTS_DIR}/${clientId}.json`
}

export async function isCloudAvailable(): Promise<boolean> {
  try {
    return await CloudStorage.isCloudAvailable()
  } catch {
    return false
  }
}

export async function pushToCloud(): Promise<{ pushed: number; errors: string[] }> {
  const { getUnsyncedMeasurements, markSynced } = useHistoryStore.getState()
  const unsynced = getUnsyncedMeasurements()

  if (unsynced.length === 0) {
    return { pushed: 0, errors: [] }
  }

  await ensureMeasurementsDir()

  const errors: string[] = []
  const syncedIds: string[] = []

  for (const record of unsynced) {
    try {
      const filePath = getFilePath(record.clientId)
      await CloudStorage.writeFile(filePath, JSON.stringify(record), SCOPE)
      syncedIds.push(record.clientId)
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Unknown error'
      errors.push(`Failed to push ${record.clientId}: ${msg}`)
      console.warn(`cloudSync push error for ${record.clientId}:`, error)
    }
  }

  if (syncedIds.length > 0) {
    markSynced(syncedIds)
  }

  return { pushed: syncedIds.length, errors }
}

export async function pullFromCloud(): Promise<{ pulled: number; errors: string[] }> {
  const { measurements, mergeFromCloud } = useHistoryStore.getState()

  const dirExists = await CloudStorage.exists(MEASUREMENTS_DIR, SCOPE)
  if (!dirExists) {
    return { pulled: 0, errors: [] }
  }

  const files = await CloudStorage.readdir(MEASUREMENTS_DIR, SCOPE)
  const errors: string[] = []
  const newRecords: MeasurementRecord[] = []

  for (const fileName of files) {
    if (!fileName.endsWith('.json')) continue

    const clientId = fileName.replace('.json', '')

    // Skip files we already have (unless we need to check for cloud-side deletions)
    const localRecord = measurements.find((m) => m.clientId === clientId)
    if (localRecord?.syncedAt && !localRecord.deletedAt) {
      // Already synced and not locally deleted — skip unless cloud has deletion
      continue
    }

    try {
      const filePath = `${MEASUREMENTS_DIR}/${fileName}`

      // On iOS, trigger download from iCloud if file is a stub
      if (Platform.OS === 'ios') {
        await CloudStorage.triggerSync(filePath, SCOPE)
      }

      const content = await CloudStorage.readFile(filePath, SCOPE)
      const record: MeasurementRecord = JSON.parse(content)
      newRecords.push(record)
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Unknown error'
      errors.push(`Failed to pull ${clientId}: ${msg}`)
      console.warn(`cloudSync pull error for ${clientId}:`, error)
    }
  }

  if (newRecords.length > 0) {
    mergeFromCloud(newRecords)
  }

  return { pulled: newRecords.length, errors }
}

async function garbageCollect(): Promise<void> {
  const purgedIds = useHistoryStore.getState().purgeOldDeleted()
  for (const clientId of purgedIds) {
    try {
      await CloudStorage.unlink(getFilePath(clientId), SCOPE)
    } catch {
      // File may already be gone — ignore
    }
  }
}

export async function syncAll(): Promise<SyncResult> {
  const pushResult = await pushToCloud()
  const pullResult = await pullFromCloud()

  const now = new Date().toISOString()
  useHistoryStore.getState().setLastSyncedAt(now)

  await garbageCollect()

  return {
    pushed: pushResult.pushed,
    pulled: pullResult.pulled,
    errors: [...pushResult.errors, ...pullResult.errors],
  }
}
