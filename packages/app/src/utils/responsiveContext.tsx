import { createContext, type ReactNode, useContext } from 'react'
import { useResponsiveDesign, useResponsiveDimensions } from './device'

// Context type definition
interface ResponsiveContextType {
  // Dimensions
  width: number
  height: number
  fontScale: number
  pixelScale: number
  isLandscape: boolean
  deviceType: 'phone' | 'tablet' | 'desktop'

  // Legacy responsive functions (for backward compatibility)
  getResponsiveSpacing: (base: number) => number
  getResponsiveTypography: (size: keyof typeof import('./device').BASE_TYPOGRAPHY) => number
  getLineHeight: (size: number | keyof typeof import('./device').BASE_TYPOGRAPHY) => number
  getLetterSpacing: (fontSize: number) => number

  // Simplified library API
  scale: (base: number) => number
  scaleText: (size: keyof typeof import('./device').BASE_TYPOGRAPHY) => number
  scaleLineHeight: (size: number | keyof typeof import('./device').BASE_TYPOGRAPHY) => number

  // Convenience breakpoint checks
  isPhone: boolean
  isTablet: boolean
  isDesktop: boolean

  // Breakpoints
  breakpoints: {
    phone: number
    tablet: number
    desktop: number
  }
}

// Create context
const ResponsiveContext = createContext<ResponsiveContextType | undefined>(undefined)

// Provider component
interface ResponsiveProviderProps {
  children: ReactNode
}

export function ResponsiveProvider({ children }: ResponsiveProviderProps) {
  const dimensions = useResponsiveDimensions()
  const design = useResponsiveDesign()

  // Debug logging
  console.log('🎯 ResponsiveProvider render:', {
    width: dimensions.width,
    height: dimensions.height,
    deviceType: dimensions.deviceType,
    timestamp: new Date().toISOString(),
  })

  const contextValue: ResponsiveContextType = {
    // Dimensions
    width: dimensions.width,
    height: dimensions.height,
    fontScale: dimensions.fontScale,
    pixelScale: dimensions.scale,
    isLandscape: dimensions.isLandscape,
    deviceType: dimensions.deviceType,

    // Legacy API (for backward compatibility)
    getResponsiveSpacing: design.getResponsiveSpacing,
    getResponsiveTypography: design.getResponsiveTypography,
    getLineHeight: design.getLineHeight,
    getLetterSpacing: design.getLetterSpacing,

    // Simplified library API
    scale: design.getResponsiveSpacing,
    scaleText: design.getResponsiveTypography,
    scaleLineHeight: design.getLineHeight,

    // Convenience breakpoint checks
    isPhone: dimensions.deviceType === 'phone',
    isTablet: dimensions.deviceType === 'tablet',
    isDesktop: dimensions.deviceType === 'desktop',

    // Breakpoints
    breakpoints: {
      phone: 0,
      tablet: 768,
      desktop: 1024,
    },
  }

  return <ResponsiveContext.Provider value={contextValue}>{children}</ResponsiveContext.Provider>
}

// Custom hook to use responsive context
export function useResponsive(): ResponsiveContextType {
  const context = useContext(ResponsiveContext)
  if (context === undefined) {
    throw new Error('useResponsive must be used within a ResponsiveProvider')
  }
  return context
}

// Convenience hooks for specific use cases
export function useDeviceType(): 'phone' | 'tablet' | 'desktop' {
  const { deviceType } = useResponsive()
  return deviceType
}

export function useIsLandscape(): boolean {
  const { isLandscape } = useResponsive()
  return isLandscape
}

export function useResponsiveSpacing(): (base: number) => number {
  const { getResponsiveSpacing } = useResponsive()
  return getResponsiveSpacing
}

export function useResponsiveTypography(): (
  size: keyof typeof import('./device').BASE_TYPOGRAPHY,
) => number {
  const { getResponsiveTypography } = useResponsive()
  return getResponsiveTypography
}
