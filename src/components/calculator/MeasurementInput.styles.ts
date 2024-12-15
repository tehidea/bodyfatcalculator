import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";
import { getResponsiveSpacing, getResponsiveFontSize } from "../../utils/device";

export const styles = StyleSheet.create({
  container: {
    marginBottom: getResponsiveSpacing(16),
  },
  label: {
    marginBottom: getResponsiveSpacing(8),
    color: COLORS.text,
    fontSize: getResponsiveFontSize(14),
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: getResponsiveSpacing(12),
    gap: getResponsiveSpacing(8),
    height: getResponsiveSpacing(40),
  },
  iconContainer: {
    width: getResponsiveSpacing(18),
    height: getResponsiveSpacing(18),
    justifyContent: "center",
    alignItems: "flex-start",
  },
  input: {
    flex: 1,
    height: getResponsiveSpacing(40),
    color: COLORS.textDark,
    fontSize: getResponsiveFontSize(16),
  },
  inputError: {
    borderColor: "red",
    borderWidth: 1,
  },
  unit: {
    color: COLORS.textDark,
    fontSize: getResponsiveFontSize(14),
  },
  error: {
    color: "red",
    fontSize: getResponsiveFontSize(12),
    marginTop: getResponsiveSpacing(4),
  },
});
