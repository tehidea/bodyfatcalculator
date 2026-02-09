import {
  Montserrat_200ExtraLight,
  Montserrat_300Light,
  Montserrat_400Regular,
  useFonts,
} from '@expo-google-fonts/montserrat'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native'
import { ThemeProvider } from '@rneui/themed'
import { registerRootComponent } from 'expo'
import Constants from 'expo-constants'
import * as Linking from 'expo-linking'
import * as SplashScreen from 'expo-splash-screen'
import { PostHogProvider, usePostHog } from 'posthog-react-native'
import { useCallback, useEffect, useState } from 'react'
import { View } from 'react-native'
import { KeyboardProvider } from 'react-native-keyboard-controller'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { initializeStore, setPostHogInstance } from './src/config/store'
import { theme } from './src/constants/theme'
import { TabNavigator } from './src/navigation/TabNavigator'
import { ResponsiveProvider } from './src/utils/responsiveContext'

// Configure splash screen options
SplashScreen.setOptions({
  duration: 600,
  fade: true,
})

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
})

function AppNavigator() {
  const posthog = usePostHog()

  useEffect(() => {
    // Set PostHog instance for purchase tracking
    if (posthog) {
      setPostHogInstance(posthog)
    }
  }, [posthog])

  useEffect(() => {
    const trackInstallAttribution = async () => {
      if (!posthog) return

      try {
        // Check if this is the first app launch
        const hasLaunchedBefore = await AsyncStorage.getItem('hasLaunchedBefore')

        if (!hasLaunchedBefore) {
          // Mark that we've launched before
          await AsyncStorage.setItem('hasLaunchedBefore', 'true')

          // Get initial URL (if app was opened via deep link)
          const initialUrl = await Linking.getInitialURL()

          // Parse attribution from initial URL
          let attribution = {
            source: 'direct_install',
            utm_source: null,
            utm_medium: null,
            utm_campaign: null,
          }

          if (initialUrl) {
            const url = new URL(initialUrl)
            attribution = {
              source: 'deep_link',
              utm_source: url.searchParams.get('utm_source'),
              utm_medium: url.searchParams.get('utm_medium'),
              utm_campaign: url.searchParams.get('utm_campaign'),
            }
          }

          // Track the install event with attribution data
          posthog.capture('app_installed', {
            platform: Constants.platform?.ios ? 'ios' : 'android',
            initial_url: initialUrl,
            ...attribution,
            timestamp: new Date().toISOString(),
          })

          // Create a unique install ID for cross-platform tracking
          const installId = `install_${Date.now()}_${Math.random().toString(36).substring(2)}`
          await AsyncStorage.setItem('installId', installId)

          // Set user properties for cross-platform identification
          posthog.identify(installId, {
            platform: 'mobile',
            app_version: Constants.expoConfig?.version,
            install_source: attribution.source,
            user_type: 'mobile_user',
            ...attribution,
          })
        }
      } catch (error) {
        console.warn('Error tracking install attribution:', error)
      }
    }

    // Delay to ensure PostHog is initialized
    setTimeout(trackInstallAttribution, 1000)
  }, [posthog])

  return (
    <KeyboardProvider statusBarTranslucent>
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <ResponsiveProvider>
            <TabNavigator />
          </ResponsiveProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </KeyboardProvider>
  )
}

function App() {
  const [appIsReady, setAppIsReady] = useState(false)
  const [fontsLoaded, fontError] = useFonts({
    'Montserrat-ExtraLight': Montserrat_200ExtraLight,
    'Montserrat-Light': Montserrat_300Light,
    'Montserrat-Regular': Montserrat_400Regular,
  })

  useEffect(() => {
    async function prepare() {
      try {
        // Initialize any resources, load data, etc.
        await initializeStore()

        // Artificially delay for two seconds to simulate a slow loading
        // await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e)
      } finally {
        // Tell the application to render
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && (fontsLoaded || fontError)) {
      // This tells the splash screen to hide immediately
      await SplashScreen.hideAsync()
    }
  }, [appIsReady, fontsLoaded, fontError])

  // Don't render anything until the app is ready
  if (!appIsReady || (!fontsLoaded && !fontError)) {
    return null
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <PostHogProvider
          apiKey={Constants.expoConfig?.extra?.POSTHOG_API_KEY || 'your_fallback_posthog_api_key'}
          options={{
            host: 'https://eu.i.posthog.com',
            disabled: __DEV__,
            // Enable cross-platform user tracking
            bootstrap: {
              distinctID: `mobile_${Constants.platform?.ios ? 'ios' : 'android'}_${Date.now()}`,
            },
            persistence: 'memory',
          }}
          autocapture={{
            captureScreens: false, // Disable automatic screen tracking to prevent navigation hook errors
            captureLifecycleEvents: false, // Disable lifecycle event tracking
          }}
        >
          <AppNavigator />
        </PostHogProvider>
      </NavigationContainer>
    </View>
  )
}

registerRootComponent(App)
