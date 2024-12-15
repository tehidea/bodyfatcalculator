import { StyleSheet } from "react-native";
import { COLORS } from "../constants/theme";
import { getResponsiveSpacing, getResponsiveTypography, isIPad } from "../utils/device";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    padding: getResponsiveSpacing(16),
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  headerTextContainer: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: "row",
  },
  headerTitle: {
    fontSize: getResponsiveTypography("5xl"),
    color: COLORS.black,
    textTransform: "uppercase",
    letterSpacing: -2,
    paddingRight: 2,
    marginTop: -6,
  },
  strapline: {
    fontSize: getResponsiveTypography("xxxs"),
    color: COLORS.black,
    marginTop: -6,
    marginLeft: getResponsiveSpacing(4),
    fontFamily: "Montserrat-Light",
    textTransform: "uppercase",
  },
  logo: {
    width: getResponsiveSpacing(60),
    aspectRatio: 1,
    marginRight: getResponsiveSpacing(8),
  },
  scrollContent: {
    flexGrow: 1,
    padding: getResponsiveSpacing(16),
    maxWidth: isIPad ? 800 : undefined,
    alignSelf: "center",
    width: "100%",
  },
  selectors: {
    marginBottom: getResponsiveSpacing(24),
  },
  description: {
    marginBottom: getResponsiveSpacing(16),
    padding: getResponsiveSpacing(12),
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
  },
  buttonContainer: {
    marginTop: getResponsiveSpacing(24),
    marginBottom: getResponsiveSpacing(16),
  },
  resetButton: {
    borderRadius: 12,
    borderWidth: 0,
    overflow: "hidden",
    backgroundColor: "#444",
    paddingVertical: getResponsiveSpacing(12),
    paddingHorizontal: getResponsiveSpacing(24),
  },
  resetButtonText: {
    color: COLORS.white,
    fontSize: getResponsiveTypography("lg"),
  },
  selectorRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: getResponsiveSpacing(8),
  },
  halfWidth: {
    flex: 1,
  },
  buttonWrapper: {
    borderRadius: 12,
    overflow: "hidden",
  },
  buttonWrapperFlex: {
    borderRadius: 12,
    overflow: "hidden",
    flex: 1,
  },
  button: {
    paddingVertical: getResponsiveSpacing(12),
    paddingHorizontal: getResponsiveSpacing(24),
    borderRadius: 14,
  },
  buttonRow: {
    flexDirection: "row",
    gap: getResponsiveSpacing(8),
    marginTop: getResponsiveSpacing(24),
    marginBottom: getResponsiveSpacing(16),
  },
  primaryButton: {
    paddingVertical: getResponsiveSpacing(12),
    paddingHorizontal: getResponsiveSpacing(24),
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },
  primaryButtonText: {
    color: COLORS.white,
    fontSize: getResponsiveTypography("lg"),
    fontWeight: "bold",
  },
  disabledButton: {
    paddingVertical: getResponsiveSpacing(12),
    paddingHorizontal: getResponsiveSpacing(24),
    borderRadius: 10,
    backgroundColor: COLORS.primary + "80",
  },
  buttonTitle: {
    fontWeight: "bold",
    fontSize: getResponsiveTypography("sm"),
  },
  outlineButtonTitle: {
    color: COLORS.primary,
    fontWeight: "bold",
    fontSize: getResponsiveTypography("sm"),
  },
  errorContainer: {
    borderWidth: 2,
    borderColor: "#c62828",
    padding: getResponsiveSpacing(12),
    borderRadius: 12,
    marginBottom: getResponsiveSpacing(16),
  },
  errorText: {
    color: "#c62828",
    fontSize: getResponsiveTypography("sm"),
    fontWeight: "bold",
  },
  versionText: {
    textAlign: "center",
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: getResponsiveTypography("xs"),
    marginTop: getResponsiveSpacing(32),
    marginBottom: getResponsiveSpacing(8),
    fontFamily: "Montserrat-Light",
  },
  toolbarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#f8f8f8",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#d8d8d8",
  },
});
