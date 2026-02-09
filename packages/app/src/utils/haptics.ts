import * as Haptics from 'expo-haptics'

export function hapticImpact() {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
}

export function hapticSelection() {
  Haptics.selectionAsync()
}

export function hapticSuccess() {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
}
