import { createTheme } from "@rneui/themed";

export const COLORS = {
  primary: "#FF3B30",
  text: "#FFFFFF",
  textDark: "#000000",
  white: "#FFFFFF",
} as const;

export const theme = createTheme({
  components: {
    Button: {
      color: COLORS.primary,
    },
  },
  lightColors: {
    primary: COLORS.primary,
  },
  darkColors: {
    primary: COLORS.primary,
  },
});
