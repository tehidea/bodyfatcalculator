import { ExpoConfig } from "expo/config";

export default {
  name: "Body Fat Calculator",
  slug: "body-fat-calculator",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.tehidea.bodyfatcalculator",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: "com.tehidea.bodyfatcalculator",
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  extra: {
    revenuecat: {
      ios: process.env.REVENUECAT_IOS_KEY || "default_ios_key",
      android: process.env.REVENUECAT_ANDROID_KEY || "default_android_key",
    },
    environment: process.env.APP_ENV || "development",
  },
  plugins: ["expo-font"],
} satisfies ExpoConfig;
