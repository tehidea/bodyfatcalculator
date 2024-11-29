import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeProvider } from "@rneui/themed";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { CalculatorScreen } from "./src/screens/CalculatorScreen";
import { theme } from "./src/constants/theme";
import { initializeStore } from "./src/config/store";

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

// Create the navigator
const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded, error] = useFonts({
    "Montserrat-ExtraLight": require("./assets/fonts/Montserrat-ExtraLight.ttf"),
    "Montserrat-Light": require("./assets/fonts/Montserrat-Light.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  useEffect(() => {
    initializeStore().catch(console.error);
  }, []);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              animation: "slide_from_right",
            }}
          >
            <Stack.Screen name="Calculator" component={CalculatorScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
