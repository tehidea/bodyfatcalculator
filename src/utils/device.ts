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

// Helper function to get dynamic font size based on device type
export function getResponsiveFontSize(base: number): number {
  if (isIPad) return base * 1.2;
  return base;
}
