import {
  Montserrat_200ExtraLight,
  Montserrat_300Light,
  Montserrat_400Regular,
  useFonts,
} from '@expo-google-fonts/montserrat'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native'
import { ThemeProvider } from '@rneui/themed'
import { registerRootComponent } from 'expo'
import Constants from 'expo-constants'
import * as Linking from 'expo-linking'
import * as Notifications from 'expo-notifications'
import * as SplashScreen from 'expo-splash-screen'
import { PostHogProvider, usePostHog } from 'posthog-react-native'
import { useCallback, useEffect, useRef, useState } from 'react'
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
    const initializeIdentity = async () => {
      if (!posthog) return

      try {
        let installId = await AsyncStorage.getItem('installId')

        if (!installId) {
          // First launch — generate a stable install ID
          installId = `install_${Date.now()}_${Math.random().toString(36).substring(2)}`
          await AsyncStorage.setItem('installId', installId)

          // Get initial URL for attribution tracking
          const initialUrl = await Linking.getInitialURL()
          let attribution: Record<string, string | null> = { source: 'direct_install' }

          if (initialUrl) {
            const url = new URL(initialUrl)
            attribution = {
              source: 'deep_link',
              utm_source: url.searchParams.get('utm_source'),
              utm_medium: url.searchParams.get('utm_medium'),
              utm_campaign: url.searchParams.get('utm_campaign'),
            }
          }

          posthog.capture('app_installed', {
            platform: Constants.platform?.ios ? 'ios' : 'android',
            initial_url: initialUrl,
            ...attribution,
          })
        }

        // Identify on every launch — idempotent, ensures PostHog distinct_id = installId
        posthog.identify(installId, {
          platform: 'mobile',
          app_version: Constants.expoConfig?.version ?? 'unknown',
          user_type: 'mobile_user',
        })
      } catch (error) {
        console.warn('Error initializing PostHog identity:', error)
      }
    }

    initializeIdentity()
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
  const navigationRef = useNavigationContainerRef()
  const notificationResponseListener = useRef<Notifications.EventSubscription | null>(null)
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

  useEffect(() => {
    notificationResponseListener.current = Notifications.addNotificationResponseReceivedListener(
      () => {
        // Navigate to Calculator tab when user taps a reminder notification
        if (navigationRef.isReady()) {
          navigationRef.navigate('Calculator' as never)
        }
      },
    )

    // Handle cold-start: notification tap that launched the app fires before
    // the listener is registered, so we check for it explicitly
    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (response && navigationRef.isReady()) {
        navigationRef.navigate('Calculator' as never)
      }
    })

    return () => {
      if (notificationResponseListener.current) {
        notificationResponseListener.current.remove()
      }
    }
  }, [navigationRef])

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
      <NavigationContainer ref={navigationRef}>
        <PostHogProvider
          apiKey={process.env.EXPO_PUBLIC_POSTHOG_API_KEY!}
          options={{
            host: 'https://eu.i.posthog.com',
            disabled: __DEV__,
            captureNativeAppLifecycleEvents: true,
          }}
          autocapture={{
            captureScreens: false,
          }}
        >
          <AppNavigator />
        </PostHogProvider>
      </NavigationContainer>
    </View>
  )
}

registerRootComponent(App)
