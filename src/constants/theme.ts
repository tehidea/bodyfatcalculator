import { createTheme } from "@rneui/themed";

export const COLORS = {
  primary: "#FF0000", // Red
  background: "#333333", // Dark grey
  white: "#FFFFFF",
  black: "#000000",
  text: "#FFFFFF", // White text for dark background
  textDark: "#000000", // Black text for light backgrounds
} as const;

export const theme = createTheme({
  components: {
    Button: {
      color: COLORS.primary,
    },
  },
  lightColors: {
    primary: COLORS.primary,
    background: COLORS.white,
  },
  darkColors: {
    primary: COLORS.primary,
    background: COLORS.background,
  },
});
