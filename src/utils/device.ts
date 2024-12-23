import { Platform, Dimensions } from "react-native";

export const isIPad = Platform.OS === "ios" && Platform.isPad;
export const isIOS = Platform.OS === "ios";
export const isAndroid = Platform.OS === "android";

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");
export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

export const WINDOW_DIMENSIONS = {
  width: WINDOW_WIDTH,
  height: WINDOW_HEIGHT,
};

export const SCREEN_DIMENSIONS = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
};

// Common breakpoints for responsive design
export const BREAKPOINTS = {
  phone: 0,
  tablet: 768,
  desktop: 1024,
};

// Helper function to determine if the device is in landscape mode
export function isLandscape(): boolean {
  return WINDOW_WIDTH > WINDOW_HEIGHT;
}

// Helper function to get the current device type based on screen width
export function getDeviceType(): "phone" | "tablet" | "desktop" {
  if (WINDOW_WIDTH >= BREAKPOINTS.desktop) return "desktop";
  if (WINDOW_WIDTH >= BREAKPOINTS.tablet) return "tablet";
  return "phone";
}

// Helper function to get dynamic spacing based on device type
export function getResponsiveSpacing(base: number): number {
  if (isIPad) return base * 1.5;
  return base;
}

// Typography scale factors based on device type
const TYPOGRAPHY_SCALE = {
  phone: 1,
  tablet: 1.2,
  desktop: 1.3,
} as const;

// Base typography sizes
export const BASE_TYPOGRAPHY = {
  xxxs: 10,
  xxs: 11,
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  "2xl": 24,
  "3xl": 30,
  "4xl": 36,
  "5xl": 42,
  "6xl": 48,
} as const;

// Helper function to get responsive typography size
export function getResponsiveTypography(size: keyof typeof BASE_TYPOGRAPHY): number {
  const baseSize = BASE_TYPOGRAPHY[size];
  const deviceType = getDeviceType();
  const scaleFactor = TYPOGRAPHY_SCALE[deviceType];

  // Scale based on device type and apply minimum size protection
  return Math.max(baseSize * scaleFactor, BASE_TYPOGRAPHY.xxxs);
}

// Line heights for each typography size
const LINE_HEIGHTS = {
  xxxs: 12,
  xxs: 13,
  xs: 17,
  sm: 17,
  md: 19,
  lg: 22,
  xl: 24,
  "2xl": 29,
  "3xl": 36,
  "4xl": 43,
  "5xl": 50,
  "6xl": 58,
} as const;

// Helper function to get dynamic line height based on font size
export function getLineHeight(size: number | keyof typeof BASE_TYPOGRAPHY): number {
  // If a number is passed, use it directly with device scaling
  if (typeof size === "number") {
    const deviceType = getDeviceType();
    const scaleFactor = TYPOGRAPHY_SCALE[deviceType];
    return Math.max(size * scaleFactor, LINE_HEIGHTS.xxxs);
  }

  // Get the line height for the typography key and apply device scaling
  const baseLineHeight = LINE_HEIGHTS[size];
  const deviceType = getDeviceType();
  const scaleFactor = TYPOGRAPHY_SCALE[deviceType];
  return Math.max(baseLineHeight * scaleFactor, LINE_HEIGHTS.xxxs);
}

// Helper function to get letter spacing based on font size
export function getLetterSpacing(fontSize: number): number {
  return fontSize * 0.02;
}
