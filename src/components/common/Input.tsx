import React, { forwardRef, useImperativeHandle, useRef } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  ReturnKeyTypeOptions,
  InputAccessoryView,
  Keyboard,
  Button,
  Platform,
} from "react-native";
import { COLORS } from "../../constants/theme";

interface Props extends TextInputProps {
  label: string;
  unit: string;
  error?: string;
  onSubmitEditing?: () => void;
  returnKeyType?: ReturnKeyTypeOptions;
}

export interface InputRef {
  focus: () => void;
}

export const Input = forwardRef<InputRef, Props>(
  ({ label, unit, error, style, onSubmitEditing, returnKeyType = "next", ...props }, ref) => {
    const inputRef = useRef<TextInput>(null);
    const inputAccessoryViewID = `${label.replace(/\s/g, "")}_input`;

    useImperativeHandle(ref, () => ({
      focus: () => {
        console.log(`[Input] Attempting to focus input: ${label}`);
        if (inputRef.current) {
          inputRef.current.focus();
          console.log(`[Input] Focus called on input: ${label}`);
        } else {
          console.log(`[Input] Input ref is null for: ${label}`);
        }
      },
    }));

    const handleToolbarPress = () => {
      console.log(`[Input] Toolbar button pressed for: ${label}`);
      if (returnKeyType === "done") {
        Keyboard.dismiss();
      }
      if (onSubmitEditing) {
        onSubmitEditing();
      }
    };

    return (
      <>
        {Platform.OS === "ios" && (
          <InputAccessoryView nativeID={inputAccessoryViewID}>
            <View style={styles.toolbar}>
              <Button
                onPress={handleToolbarPress}
                title={returnKeyType === "next" ? "Next" : "Done"}
              />
            </View>
          </InputAccessoryView>
        )}
        <View style={[styles.container, style]}>
          <Text style={styles.label}>{label}</Text>
          <View style={styles.inputContainer}>
            <TextInput
              {...props}
              ref={inputRef}
              style={[styles.input, error && styles.inputError]}
              placeholderTextColor="#999"
              accessibilityLabel={label}
              accessibilityHint={`Enter ${label.toLowerCase()}`}
              accessibilityRole="spinbutton"
              inputAccessoryViewID={inputAccessoryViewID}
              keyboardType="decimal-pad"
              onFocus={() => console.log(`[Input] Input focused: ${label}`)}
              onBlur={() => console.log(`[Input] Input blurred: ${label}`)}
            />
            <Text style={styles.unit}>{unit}</Text>
          </View>
          {error && <Text style={styles.error}>{error}</Text>}
        </View>
      </>
    );
  }
);

const styles = StyleSheet.create({
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
  },
  input: {
    flex: 1,
    height: 40,
    color: COLORS.textDark,
  },
  inputError: {
    borderColor: "red",
  },
  unit: {
    color: COLORS.primary,
    marginLeft: 8,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
  toolbar: {
    backgroundColor: "#f8f8f8",
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: "#dedede",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
