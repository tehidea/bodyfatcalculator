import { Directory, File, Paths } from 'expo-file-system'
import { SaveFormat, manipulateAsync } from 'expo-image-manipulator'
import * as ImagePicker from 'expo-image-picker'

const PHOTOS_DIR = 'photos'
const MAX_WIDTH = 1200
const JPEG_QUALITY = 0.7

function getPhotosDirectory(): Directory {
  return new Directory(Paths.document, PHOTOS_DIR)
}

export function getLocalPhotoPath(clientId: string): string {
  return new File(Paths.document, PHOTOS_DIR, `${clientId}.jpg`).uri
}

export function getRelativePhotoPath(clientId: string): string {
  return `${PHOTOS_DIR}/${clientId}.jpg`
}

function ensurePhotosDir(): void {
  const dir = getPhotosDirectory()
  if (!dir.exists) {
    dir.create({ intermediates: true })
  }
}

const PICKER_OPTIONS: ImagePicker.ImagePickerOptions = {
  mediaTypes: ['images'],
  allowsEditing: true,
  aspect: [3, 4],
  quality: 1,
}

export async function pickPhoto(): Promise<string | null> {
  const result = await ImagePicker.launchImageLibraryAsync(PICKER_OPTIONS)
  if (result.canceled) return null
  return result.assets[0]?.uri ?? null
}

export async function takePhoto(): Promise<string | null> {
  const { status } = await ImagePicker.requestCameraPermissionsAsync()
  if (status !== 'granted') return null

  const result = await ImagePicker.launchCameraAsync(PICKER_OPTIONS)
  if (result.canceled) return null
  return result.assets[0]?.uri ?? null
}

export async function processAndSavePhoto(sourceUri: string, clientId: string): Promise<string> {
  ensurePhotosDir()

  const result = await manipulateAsync(
    sourceUri,
    [{ resize: { width: MAX_WIDTH } }],
    { format: SaveFormat.JPEG, compress: JPEG_QUALITY },
  )

  const dest = new File(Paths.document, PHOTOS_DIR, `${clientId}.jpg`)
  const source = new File(result.uri)
  source.move(dest)

  return getRelativePhotoPath(clientId)
}

export function deleteLocalPhoto(clientId: string): void {
  const file = new File(Paths.document, PHOTOS_DIR, `${clientId}.jpg`)
  if (file.exists) {
    file.delete()
  }
}
