# TODO

## High Priority (Store Approval & Revenue)

### 1. Update App Store Connect & Google Play privacy declarations

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
- [ ] **Diagnostics**
  - Data Type: Diagnostics → Crash Data, Performance Data
  - Data Use: App Functionality
  - Linked to User: No
  - Used for Tracking: No
- [ ] Verify privacy labels match actual data collection behavior
- [ ] Ensure third-party SDKs (RevenueCat, PostHog, Sentry) are properly disclosed

#### Google Play Console — Data Safety Section

- [ ] **Personal Info Collection**
  - User IDs: Yes (install IDs, RevenueCat user IDs)
  - Other: Yes (analytics identifiers)
- [ ] **App Activity**
  - App interactions: Yes (PostHog analytics)
  - Other actions: Yes (purchase events, formula selections)
- [ ] **App Info and Performance**
  - Crash logs: Yes (Sentry crash reporting)
  - Diagnostics: Yes (error tracking, Sentry session replay)
  - Other performance data: Yes (analytics)
- [ ] Data Usage Purposes: App functionality, Analytics, Developer communications
- [ ] Data Sharing: RevenueCat (purchase processing), PostHog (analytics processing), Sentry (crash reporting)

#### Action Items

- [ ] Update App Store Connect privacy labels
- [ ] Update Google Play Console data safety section
- [ ] Review privacy policy covers RevenueCat, PostHog, and Sentry data usage
- [ ] Configure PostHog data retention according to privacy policy
- [ ] Verify RevenueCat purchase data retention settings

## Medium Priority (Quality & Polish)

### 2. Add onboarding flow

No first-launch detection. Users land on the calculator with no guidance. 2–3 screens explaining the app + pre-setting gender/units would improve activation and conversion to premium.

### 3. Improve accessibility

Minimal `accessibilityLabel` usage across the app. Settings rows, history items, paywall buttons, tab bar, formula selector, and results display all lack accessibility markup. Start with the `SettingsRow` component since it renders all settings items.

## Low Priority (Future Ideas)

### 4. Localization / i18n

`expo-localization` installed but unused. All strings are hardcoded English. Large effort — defer until targeting non-English markets.

### 5. Android edge-to-edge

No edge-to-edge config. App uses safe area insets already so it likely works, but could be polished for a more modern Android look.

### 6. A/B test paywall

PostHog supports feature flags. Test headline copy, feature ordering, pricing display. Needs sufficient traffic volume first to reach statistical significance.

## Package Updates to Evaluate

| Package | Current | Target | Notes |
|---------|---------|--------|-------|
| `posthog-react-native` | 3.15.4 | 4.x | Major — check migration guide, test provider/hook API changes |
| `react-native-purchases` | 8.9.6 | 9.x | Major — sensitive, affects revenue. Test purchase flows exhaustively |
| `zod` | 3.23.8 | 4.x | Major — may break `.meta()` prototype patching in `src/schemas/calculator.ts` |
| `@expo-google-fonts/montserrat` | 0.2.3 | 0.4.2 | Minor — likely non-breaking |
| `@rneui/themed` | 4.0.0-rc.8 | stable | Monitor for stable 4.0.0 release |
