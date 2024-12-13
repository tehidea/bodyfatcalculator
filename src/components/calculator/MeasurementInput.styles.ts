import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    color: COLORS.text,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: 12,
    gap: 8,
  },
  iconContainer: {
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  input: {
    flex: 1,
    height: 40,
    color: COLORS.textDark,
  },
  inputError: {
    borderColor: "red",
    borderWidth: 1,
  },
  unit: {
    color: COLORS.textDark,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});
