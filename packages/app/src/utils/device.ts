import { Dimensions, Platform, useWindowDimensions } from 'react-native'

// Static platform detection
export const isIPad = Platform.OS === 'ios' && Platform.isPad
export const isIOS = Platform.OS === 'ios'
export const isAndroid = Platform.OS === 'android'

// Static screen dimensions (for reference)
export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen')

export const SCREEN_DIMENSIONS = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
}

// Common breakpoints for responsive design
export const BREAKPOINTS = {
  phone: 0,
  tablet: 768,
  desktop: 1024,
}

// Hook for dynamic window dimensions (iPadOS 26 windowing support)
export function useResponsiveDimensions() {
  const { width: windowWidth, height: windowHeight, fontScale, scale } = useWindowDimensions()

  // Debug logging for iPadOS testing
  console.log('🔍 useResponsiveDimensions called:', {
    windowWidth,
    windowHeight,
    fontScale,
    scale,
    timestamp: new Date().toISOString(),
  })

  return {
    width: windowWidth,
    height: windowHeight,
    fontScale,
    scale,
    isLandscape: windowWidth > windowHeight,
    deviceType: getDeviceTypeFromWidth(windowWidth),
    // Legacy compatibility
    WINDOW_DIMENSIONS: {
      width: windowWidth,
      height: windowHeight,
    },
  }
}

// Helper function to get device type from width
export function getDeviceTypeFromWidth(width: number): 'phone' | 'tablet' | 'desktop' {
  if (width >= BREAKPOINTS.desktop) return 'desktop'
  if (width >= BREAKPOINTS.tablet) return 'tablet'
  return 'phone'
}

// Legacy static functions (deprecated - use hooks instead)
const legacyDimensions = Dimensions.get('window')
export const WINDOW_WIDTH = legacyDimensions.width
export const WINDOW_HEIGHT = legacyDimensions.height
export const WINDOW_DIMENSIONS = {
  width: WINDOW_WIDTH,
  height: WINDOW_HEIGHT,
}

// Legacy helper functions (use hooks for dynamic behavior)
export function isLandscape(): boolean {
  return WINDOW_WIDTH > WINDOW_HEIGHT
}

export function getDeviceType(): 'phone' | 'tablet' | 'desktop' {
  return getDeviceTypeFromWidth(WINDOW_WIDTH)
}

// Typography scale factors based on device type
const TYPOGRAPHY_SCALE = {
  phone: 1,
  tablet: 1.2,
  desktop: 1.3,
} as const

// Base typography sizes
export const BASE_TYPOGRAPHY = {
  xxxs: 10,
  xxs: 11,
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 42,
  '6xl': 48,
} as const

// Line heights for each typography size
const LINE_HEIGHTS = {
  xxxs: 12,
  xxs: 13,
  xs: 17,
  sm: 17,
  md: 19,
  lg: 22,
  xl: 24,
  '2xl': 29,
  '3xl': 36,
  '4xl': 43,
  '5xl': 50,
  '6xl': 58,
} as const

// Hook for responsive spacing and typography with proper fontScale support
export function useResponsiveDesign() {
  const { width, deviceType, fontScale } = useResponsiveDimensions()

  return {
    // Responsive spacing
    getResponsiveSpacing: (base: number) => {
      // For iPad, add extra scaling if window is large enough
      if (isIPad && width >= BREAKPOINTS.tablet) {
        return base * 1.5
      }
      return base
    },

    // Responsive typography with accessibility font scaling
    getResponsiveTypography: (size: keyof typeof BASE_TYPOGRAPHY) => {
      const baseSize = BASE_TYPOGRAPHY[size]
      const scaleFactor = TYPOGRAPHY_SCALE[deviceType]

      // Apply device scaling, then respect user's accessibility font scale
      const scaledSize = baseSize * scaleFactor

      // Apply fontScale but limit extreme scaling to prevent UI breakage
      const fontScaleAdjusted = scaledSize * Math.min(fontScale, 1.3)

      return Math.max(fontScaleAdjusted, BASE_TYPOGRAPHY.xxxs)
    },

    // Responsive line height with font scale consideration
    getLineHeight: (size: number | keyof typeof BASE_TYPOGRAPHY) => {
      if (typeof size === 'number') {
        const scaleFactor = TYPOGRAPHY_SCALE[deviceType]
        const scaledSize = size * scaleFactor
        const fontScaleAdjusted = scaledSize * Math.min(fontScale, 1.3)
        return Math.max(fontScaleAdjusted * 1.2, LINE_HEIGHTS.xxxs) // 1.2 is standard line-height ratio
      }

      const baseLineHeight = LINE_HEIGHTS[size]
      const scaleFactor = TYPOGRAPHY_SCALE[deviceType]
      const scaledHeight = baseLineHeight * scaleFactor
      const fontScaleAdjusted = scaledHeight * Math.min(fontScale, 1.3)
      return Math.max(fontScaleAdjusted, LINE_HEIGHTS.xxxs)
    },

    // Letter spacing (scales with font size)
    getLetterSpacing: (fontSize: number) => fontSize * 0.02,

    // Direct access to responsive values
    deviceType,
    width,
    fontScale,
  }
}

// Legacy functions (deprecated - use hooks instead)
export function getResponsiveSpacing(base: number): number {
  if (isIPad) return base * 1.5
  return base
}

export function getResponsiveTypography(size: keyof typeof BASE_TYPOGRAPHY): number {
  const baseSize = BASE_TYPOGRAPHY[size]
  const deviceType = getDeviceType()
  const scaleFactor = TYPOGRAPHY_SCALE[deviceType]
  return Math.max(baseSize * scaleFactor, BASE_TYPOGRAPHY.xxxs)
}

export function getLineHeight(size: number | keyof typeof BASE_TYPOGRAPHY): number {
  if (typeof size === 'number') {
    const deviceType = getDeviceType()
    const scaleFactor = TYPOGRAPHY_SCALE[deviceType]
    return Math.max(size * scaleFactor, LINE_HEIGHTS.xxxs)
  }

  const baseLineHeight = LINE_HEIGHTS[size]
  const deviceType = getDeviceType()
  const scaleFactor = TYPOGRAPHY_SCALE[deviceType]
  return Math.max(baseLineHeight * scaleFactor, LINE_HEIGHTS.xxxs)
}

export function getLetterSpacing(fontSize: number): number {
  return fontSize * 0.02
}
