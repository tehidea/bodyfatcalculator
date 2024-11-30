import { StyleSheet } from "react-native";
import { COLORS } from "../constants/theme";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    padding: 16,
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
    fontSize: 42,
    color: COLORS.black,
    textTransform: "uppercase",
    marginTop: -6,
  },
  strapline: {
    fontSize: 10,
    color: COLORS.black,
    marginTop: -6,
    marginLeft: 4,
    fontFamily: "Montserrat-Light",
    textTransform: "uppercase",
  },
  logo: {
    width: 60,
    aspectRatio: 1,
    marginRight: 8,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: 16,
  },
  selectors: {
    marginBottom: 24,
  },
  description: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
  },
  buttonContainer: {
    marginTop: 24,
    marginBottom: 16,
  },
  resetButton: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#444",
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  resetButtonText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
  },
  selectorRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
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
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 14,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 24,
    marginBottom: 16,
  },
  primaryButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },
  disabledButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    backgroundColor: COLORS.primary + "80",
  },
  buttonTitle: {
    fontWeight: "bold",
  },
  outlineButtonTitle: {
    color: COLORS.primary,
    fontWeight: "bold",
  },
  errorContainer: {
    backgroundColor: "#ffebee",
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  errorText: {
    color: "#c62828",
    fontSize: 14,
  },
});
