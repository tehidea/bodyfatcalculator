import { useCallback, useState } from 'react'
import { ActionSheetIOS, Alert, Platform } from 'react-native'
import { syncAll } from '../services/cloudSync'
import {
  deleteLocalPhoto,
  getLocalPhotoPath,
  pickPhoto,
  processAndSavePhoto,
  takePhoto,
} from '../services/photoService'
import { useHistoryStore } from '../store/historyStore'

export function useProgressPhoto(clientId: string | null) {
  const [isProcessing, setIsProcessing] = useState(false)
  const measurement = useHistoryStore((s) => s.measurements.find((m) => m.clientId === clientId))
  const setPhotoUri = useHistoryStore((s) => s.setPhotoUri)
  const cloudSyncEnabled = useHistoryStore((s) => s.cloudSyncEnabled)

  const photoUri = measurement?.photoUri ?? null
  const hasPhoto = measurement?.hasPhoto ?? false

  const handleAddPhoto = useCallback(
    async (source: 'camera' | 'gallery') => {
      if (!clientId) return

      try {
        setIsProcessing(true)
        const uri = source === 'camera' ? await takePhoto() : await pickPhoto()
        if (!uri) return

        const relativePath = await processAndSavePhoto(uri, clientId)
        setPhotoUri(clientId, relativePath)

        if (cloudSyncEnabled) {
          syncAll().catch((error) => console.warn('Sync after photo add failed:', error))
        }
      } catch (error) {
        console.warn('Failed to add photo:', error)
        Alert.alert('Error', 'Failed to save the photo. Please try again.')
      } finally {
        setIsProcessing(false)
      }
    },
    [clientId, setPhotoUri, cloudSyncEnabled],
  )

  const promptAddPhoto = useCallback(() => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Take Photo', 'Choose from Library'],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) handleAddPhoto('camera')
          else if (buttonIndex === 2) handleAddPhoto('gallery')
        },
      )
    } else {
      Alert.alert('Add Progress Photo', 'Choose a source', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Take Photo', onPress: () => handleAddPhoto('camera') },
        { text: 'Choose from Library', onPress: () => handleAddPhoto('gallery') },
      ])
    }
  }, [handleAddPhoto])

  const removePhoto = useCallback(() => {
    if (!clientId || !hasPhoto) return

    Alert.alert('Remove Photo', 'Are you sure you want to remove this progress photo?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => {
          setPhotoUri(clientId, null)
          deleteLocalPhoto(clientId)

          if (cloudSyncEnabled) {
            syncAll().catch((error) => console.warn('Sync after photo remove failed:', error))
          }
        },
      },
    ])
  }, [clientId, hasPhoto, setPhotoUri, cloudSyncEnabled])

  const localPhotoPath = clientId && hasPhoto ? getLocalPhotoPath(clientId) : null

  return {
    photoUri,
    hasPhoto,
    localPhotoPath,
    isProcessing,
    promptAddPhoto,
    removePhoto,
  }
}
