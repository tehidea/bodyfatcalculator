// Mock expo-font
jest.mock("expo-font", () => ({
  useFonts: () => [true, null],
}));

// Mock expo-splash-screen
jest.mock("expo-splash-screen", () => ({
  preventAutoHideAsync: jest.fn(),
  hideAsync: jest.fn(),
}));

// Mock AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
}));

// Mock RevenueCat configuration
jest.mock("./src/config/store", () => ({
  API_KEYS: {
    apple: "mock-apple-key",
    google: "mock-google-key",
  },
  ENTITLEMENTS: {
    pro: "pro",
    premium: "premium",
  },
}));

// Mock navigation
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
}));

// Mock @rneui/themed
jest.mock("@rneui/themed", () => {
  const React = require("react");
  const { Text: RNText, Pressable } = require("react-native");

  return {
    Icon: () => null,
    Text: ({ children, style }) => React.createElement(RNText, { style }, children),
    Button: ({ title, onPress, testID }) =>
      React.createElement(Pressable, { onPress, testID }, React.createElement(RNText, null, title)),
    createTheme: () => ({
      theme: {
        colors: {
          primary: "#000000",
        },
      },
    }),
  };
});

// Mock @expo/vector-icons
jest.mock("@expo/vector-icons", () => ({
  Feather: "Feather",
}));

// Mock React Native's Alert
jest.mock("react-native/Libraries/Alert/Alert", () => ({
  alert: jest.fn(),
}));

// Mock React Native's Platform
jest.mock("react-native/Libraries/Utilities/Platform", () => ({
  OS: "ios",
  select: jest.fn(obj => obj.ios),
}));

// Mock Expo's Constants
jest.mock("expo-constants", () => ({
  default: {
    expoConfig: {
      extra: {
        EXPO_PUBLIC_REVENUECAT_IOS_KEY: "test_key",
      },
    },
  },
}));

// Mock RevenueCat's Purchases
jest.mock("react-native-purchases", () => ({
  default: {
    configure: jest.fn(),
    setLogLevel: jest.fn(),
    getCustomerInfo: jest.fn(),
    getOfferings: jest.fn(),
    purchasePackage: jest.fn(),
  },
  LOG_LEVEL: {
    DEBUG: "DEBUG",
  },
}));
