import React from "react";
import { View, ActivityIndicator } from "react-native";
import { useCalculatorStore } from "../store/calculatorStore";

interface Props {
  children: React.ReactNode;
}

export const HydrationWrapper: React.FC<Props> = ({ children }) => {
  const hasHydrated = useCalculatorStore(state => state._hasHydrated);

  if (!hasHydrated) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <>{children}</>;
};
