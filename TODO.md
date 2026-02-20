# TODO

## High Priority (Store Approval & Revenue)

### 1. Fix privacy manifest `NSPrivacyCollectedDataTypes`

`ios/BodyFat/PrivacyInfo.xcprivacy:43` declares an empty `<array/>` for collected data types despite collecting data via PostHog (analytics events, device info, install IDs) and RevenueCat (purchase history, subscriber IDs). Apple rejects apps with inaccurate privacy declarations.

### 2. Add privacy policy & terms links to paywall

`PaywallScreen.tsx` has no legal links. Apple requires privacy policy and terms of use links on subscription purchase screens.

### 3. Update App Store Connect & Google Play privacy declarations

Store-level privacy declarations need to match actual data collection. Both stores have strengthened enforcement — accurate disclosure is critical for app approval.

#### Apple App Store Connect — Privacy Labels

- [ ] **Purchase History**
  - Data Type: Purchases → Purchase History
  - Data Use: App Functionality, Analytics
  - Linked to User: Yes (custom app user IDs)
  - Used for Tracking: No
- [ ] **Identifiers**
  - Data Type: Identifiers → User ID
  - Data Use: App Functionality, Analytics, Developer Communications
  - Linked to User: Yes
  - Used for Tracking: No
- [ ] **Usage Data**
  - Data Type: Usage Data → Product Interaction, Analytics Data
  - Data Use: Analytics, App Functionality
  - Linked to User: Yes (linked to install ID)
  - Used for Tracking: No
- [ ] Verify privacy labels match actual data collection behavior
- [ ] Ensure third-party SDKs (RevenueCat, PostHog) are properly disclosed

#### Google Play Console — Data Safety Section

- [ ] **Personal Info Collection**
  - User IDs: Yes (install IDs, RevenueCat user IDs)
  - Other: Yes (analytics identifiers)
- [ ] **App Activity**
  - App interactions: Yes (PostHog analytics)
  - Other actions: Yes (purchase events, formula selections)
- [ ] **App Info and Performance**
  - Crash logs: No (no crash reporting yet — see item 5)
  - Diagnostics: Yes (error tracking)
  - Other performance data: Yes (analytics)
- [ ] Data Usage Purposes: App functionality, Analytics, Developer communications
- [ ] Data Sharing: RevenueCat (purchase processing), PostHog (analytics processing)

#### Action Items

- [ ] Update App Store Connect privacy labels
- [ ] Update Google Play Console data safety section
- [ ] Review privacy policy covers RevenueCat and PostHog data usage
- [ ] Configure PostHog data retention according to privacy policy
- [ ] Verify RevenueCat purchase data retention settings

### 4. Add error boundary

Zero error boundaries in the app. Any uncaught JS error results in a white screen crash. Wrap `AppNavigator` in `App.tsx` with a recovery UI that shows a friendly error message and a "Restart" button.

### 5. Add crash reporting (Sentry)

No production error visibility. Only `console.warn/error` which is silently swallowed when `__DEV__` is false. `@sentry/react-native` has first-class Expo support. Essential for diagnosing issues users encounter in the wild.

### 6. Add app store rating prompt

No rating prompt exists. Use `expo-store-review` after 3rd–5th calculation or measurement save. Direct impact on App Store ranking and organic discovery.

## Medium Priority (Quality & Polish)

### 7. Fix `userInterfaceStyle` in app.json

Set to `"light"` at `app.json:15` but the app uses a dark theme (`#333333` background). System status bar, keyboard, and dialogs mismatch the actual UI. Change to `"dark"`.

### 8. Add onboarding flow

No first-launch detection. Users land on the calculator with no guidance. 2–3 screens explaining the app + pre-setting gender/units would improve activation and conversion to premium.

### 9. Improve accessibility

Minimal `accessibilityLabel` usage across the app. Settings rows, history items, paywall buttons, tab bar, formula selector, and results display all lack accessibility markup. Start with the `SettingsRow` component since it renders all settings items.

### 10. Enable React Compiler

Empty `plugins` array in `babel.config.js:12`. SDK 54 + React 19.1 supports the React Compiler. Free performance improvement, especially for the calculator screen with many input re-renders.

### 11. Add in-app support/feedback

No way to contact support from the app. Add a "Send Feedback" row in Settings that opens a `mailto:` link. Trivial effort, prevents negative reviews from users who can't reach you.

## Low Priority (Future Ideas)

### 12. Expose measurement tutorials

`IllustrationGalleryScreen` with 20+ body measurement illustrations exists but is gated behind `__DEV__` in `SettingsScreen.tsx:443`. Could be surfaced as a "How to Measure" guide for all users.

### 13. Localization / i18n

`expo-localization` installed but unused. All strings are hardcoded English. Large effort — defer until targeting non-English markets.

### 14. Android edge-to-edge

No edge-to-edge config. App uses safe area insets already so it likely works, but could be polished for a more modern Android look.

### 15. A/B test paywall

PostHog supports feature flags. Test headline copy, feature ordering, pricing display. Needs sufficient traffic volume first to reach statistical significance.

### 16. Custom formula creation

Niche power-user feature. Most users want accuracy from established scientific formulas rather than building their own.

## Package Updates to Evaluate

| Package | Current | Target | Notes |
|---------|---------|--------|-------|
| `posthog-react-native` | 3.15.4 | 4.x | Major — check migration guide, test provider/hook API changes |
| `react-native-purchases` | 8.9.6 | 9.x | Major — sensitive, affects revenue. Test purchase flows exhaustively |
| `zod` | 3.23.8 | 4.x | Major — may break `.meta()` prototype patching in `src/schemas/calculator.ts` |
| `@expo-google-fonts/montserrat` | 0.2.3 | 0.4.2 | Minor — likely non-breaking |
| `@rneui/themed` | 4.0.0-rc.8 | stable | Monitor for stable 4.0.0 release |
