import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Icon } from '@rneui/themed'
import { COLORS } from '../constants/theme'
import { CalculatorScreen } from '../screens/CalculatorScreen'
import { HistoryScreen } from '../screens/HistoryScreen'
import { PaywallScreen } from '../screens/PaywallScreen'
import { SettingsScreen } from '../screens/SettingsScreen'

const Tab = createBottomTabNavigator()
const CalculatorStack = createNativeStackNavigator()
const HistoryStack = createNativeStackNavigator()
const SettingsStack = createNativeStackNavigator()

function CalculatorStackScreen() {
  return (
    <CalculatorStack.Navigator screenOptions={{ headerShown: false }}>
      <CalculatorStack.Screen name="CalculatorMain" component={CalculatorScreen} />
      <CalculatorStack.Screen
        name="Paywall"
        component={PaywallScreen}
        options={{ animation: 'slide_from_right' }}
      />
    </CalculatorStack.Navigator>
  )
}

function HistoryStackScreen() {
  return (
    <HistoryStack.Navigator screenOptions={{ headerShown: false }}>
      <HistoryStack.Screen name="HistoryMain" component={HistoryScreen} />
    </HistoryStack.Navigator>
  )
}

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
      <SettingsStack.Screen name="SettingsMain" component={SettingsScreen} />
      <SettingsStack.Screen
        name="Paywall"
        component={PaywallScreen}
        options={{ animation: 'slide_from_right' }}
      />
    </SettingsStack.Navigator>
  )
}

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          borderTopColor: '#e0e0e0',
          backgroundColor: COLORS.white,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Calculator"
        component={CalculatorStackScreen}
        options={{
          tabBarLabel: 'Calculator',
          tabBarIcon: ({ color, size }) => (
            <Icon name="sliders" type="feather" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryStackScreen}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({ color, size }) => (
            <Icon name="clock" type="feather" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStackScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Icon name="settings" type="feather" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
