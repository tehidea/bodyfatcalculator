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
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
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
