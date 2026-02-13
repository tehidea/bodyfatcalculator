import { createContext, type ReactNode, useContext } from 'react'
import { useResponsiveDesign, useResponsiveDimensions } from './device'

interface ResponsiveContextType {
  width: number
  height: number
  isLandscape: boolean
  deviceType: 'phone' | 'tablet' | 'desktop'
  getResponsiveSpacing: (base: number) => number
  getResponsiveTypography: (size: keyof typeof import('./device').BASE_TYPOGRAPHY) => number
  getLineHeight: (size: number | keyof typeof import('./device').BASE_TYPOGRAPHY) => number
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

  const contextValue: ResponsiveContextType = {
    width: dimensions.width,
    height: dimensions.height,
    isLandscape: dimensions.isLandscape,
    deviceType: dimensions.deviceType,
    getResponsiveSpacing: design.getResponsiveSpacing,
    getResponsiveTypography: design.getResponsiveTypography,
    getLineHeight: design.getLineHeight,
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
