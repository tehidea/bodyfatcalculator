import { Platform } from 'react-native'
import { CloudStorage, CloudStorageScope } from 'react-native-cloud-storage'
import type { MeasurementRecord } from '../store/historyStore'
import { useHistoryStore } from '../store/historyStore'
import { deleteLocalPhoto, getLocalPhotoPath } from './photoService'

const MEASUREMENTS_DIR = '/measurements'
const PHOTOS_DIR = '/photos'
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

function getCloudPhotoPath(clientId: string): string {
  return `${PHOTOS_DIR}/${clientId}.jpg`
}

async function ensurePhotosDir(): Promise<void> {
  const exists = await CloudStorage.exists(PHOTOS_DIR, SCOPE)
  if (!exists) {
    await CloudStorage.mkdir(PHOTOS_DIR, SCOPE)
  }
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

export async function pullFromCloud(): Promise<{
  pulled: number
  errors: string[]
  newRecords: MeasurementRecord[]
}> {
  const { measurements, mergeFromCloud } = useHistoryStore.getState()

  const dirExists = await CloudStorage.exists(MEASUREMENTS_DIR, SCOPE)
  if (!dirExists) {
    return { pulled: 0, errors: [], newRecords: [] }
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

  return { pulled: newRecords.length, errors, newRecords }
}

async function pushPhotosToCloud(): Promise<void> {
  const { measurements } = useHistoryStore.getState()
  const withPhotos = measurements.filter(
    (m) => m.hasPhoto && m.photoUri && m.syncedAt === null && !m.deletedAt,
  )

  if (withPhotos.length === 0) return

  await ensurePhotosDir()

  for (const record of withPhotos) {
    try {
      const localPath = getLocalPhotoPath(record.clientId)
      const remotePath = getCloudPhotoPath(record.clientId)
      await CloudStorage.uploadFile(remotePath, localPath, { mimeType: 'image/jpeg' }, SCOPE)
    } catch (error) {
      console.warn(`cloudSync photo push error for ${record.clientId}:`, error)
    }
  }
}

async function pullPhotosFromCloud(newRecords: MeasurementRecord[]): Promise<void> {
  const withPhotos = newRecords.filter((r) => r.hasPhoto && !r.deletedAt)
  if (withPhotos.length === 0) return

  const { setPhotoUri } = useHistoryStore.getState()

  for (const record of withPhotos) {
    try {
      const remotePath = getCloudPhotoPath(record.clientId)

      const remoteExists = await CloudStorage.exists(remotePath, SCOPE)
      if (!remoteExists) continue

      if (Platform.OS === 'ios') {
        await CloudStorage.triggerSync(remotePath, SCOPE)
      }

      const localPath = getLocalPhotoPath(record.clientId)
      await CloudStorage.downloadFile(remotePath, localPath, SCOPE)
      setPhotoUri(record.clientId, `photos/${record.clientId}.jpg`)
    } catch (error) {
      console.warn(`cloudSync photo pull error for ${record.clientId}:`, error)
    }
  }
}

async function garbageCollect(): Promise<void> {
  const purgedIds = useHistoryStore.getState().purgeOldDeleted()
  for (const clientId of purgedIds) {
    try {
      await CloudStorage.unlink(getFilePath(clientId), SCOPE)
    } catch {
      // File may already be gone — ignore
    }
    try {
      await CloudStorage.unlink(getCloudPhotoPath(clientId), SCOPE)
    } catch {
      // Photo may not exist — ignore
    }
    try {
      deleteLocalPhoto(clientId)
    } catch {
      // Local photo may not exist — ignore
    }
  }
}

export async function syncAll(): Promise<SyncResult> {
  const pushResult = await pushToCloud()
  const pullResult = await pullFromCloud()

  // Photo sync is best-effort — errors don't block measurement sync
  try {
    await pushPhotosToCloud()
  } catch (error) {
    console.warn('cloudSync photo push failed:', error)
  }
  try {
    await pullPhotosFromCloud(pullResult.newRecords)
  } catch (error) {
    console.warn('cloudSync photo pull failed:', error)
  }

  const now = new Date().toISOString()
  useHistoryStore.getState().setLastSyncedAt(now)

  await garbageCollect()

  return {
    pushed: pushResult.pushed,
    pulled: pullResult.pulled,
    errors: [...pushResult.errors, ...pullResult.errors],
  }
}
