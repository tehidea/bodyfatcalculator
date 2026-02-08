import { createTheme } from "@rneui/themed";

export const COLORS = {
  primary: "#FF0000", // Red
  background: "#333333", // Dark grey
  white: "#FFFFFF",
  black: "#000000",
  text: "#FFFFFF", // White text for dark background
  textLight: "#333333", // Dark grey text
  textDark: "#000000", // Black text for light backgrounds
  success: "#4CAF50", // Green for high accuracy
  warning: "#FFC107", // Yellow for medium accuracy
  error: "#FF5722", // Orange for basic accuracy
} as const;

export const theme = createTheme({
  components: {
    Button: {
      color: COLORS.primary,
    },
  },
  lightColors: {
    ...COLORS,
  },
  darkColors: {
    ...COLORS,
  },
});
