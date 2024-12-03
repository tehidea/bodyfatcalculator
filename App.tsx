import React, { useEffect, useCallback, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeProvider } from "@rneui/themed";
import {
  useFonts,
  Montserrat_200ExtraLight,
  Montserrat_300Light,
} from "@expo-google-fonts/montserrat";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardProvider, KeyboardToolbar } from "react-native-keyboard-controller";
import { CalculatorScreen } from "./src/screens/CalculatorScreen";
import { FeatureComparisonScreen } from "./src/screens/FeatureComparisonScreen";
import { theme } from "./src/constants/theme";
import { initializeStore } from "./src/config/store";
import { View } from "react-native";
import { registerRootComponent } from "expo";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
});

// Create the navigator
const Stack = createNativeStackNavigator();

function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded, fontError] = useFonts({
    "Montserrat-ExtraLight": Montserrat_200ExtraLight,
    "Montserrat-Light": Montserrat_300Light,
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Initialize any resources, load data, etc.
        await initializeStore();

        // Artificially delay for two seconds to simulate a slow loading
        // await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && (fontsLoaded || fontError)) {
      // This tells the splash screen to hide immediately
      await SplashScreen.hideAsync();
    }
  }, [appIsReady, fontsLoaded, fontError]);

  // Don't render anything until the app is ready
  if (!appIsReady || (!fontsLoaded && !fontError)) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
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
              <Stack.Screen name="FeatureComparison" component={FeatureComparisonScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </ThemeProvider>
      </SafeAreaProvider>
    </View>
  );
}

registerRootComponent(App);
