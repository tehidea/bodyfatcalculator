import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeProvider, createTheme } from "@rneui/themed";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { CalculatorScreen } from "./src/screens/CalculatorScreen";
import { COLORS } from "./src/constants/theme";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

const theme = createTheme({
  components: {
    Button: {
      // raised: true,
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

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Calculator"
              component={CalculatorScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
