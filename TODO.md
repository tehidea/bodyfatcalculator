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

## Package Updates

### Done

| Package | From | To | Notes |
|---------|------|----|-------|
| `@expo-google-fonts/montserrat` | 0.2.3 | 0.4.2 | Drop-in, zero API changes — just updated font files |
| `react-native-purchases` | 8.12.0 | 9.10.3 | No JS API changes. Android now uses Play Billing Library 8 (can no longer query expired subscriptions — not an issue for this app) |

### Remaining — each needs a spike branch

#### `posthog-react-native` 3.x → 4.x (Moderate effort)

- `usePostHog()` no longer returns `undefined` — null guards become unnecessary but harmless
- `captureNativeAppLifecycleEvents` renamed to `captureAppLifecycleEvents`
- `personProperties` / `groupProperties` removed from `capture()` — use `setPersonPropertiesForFlags()` instead
- `capture()`, `identify()` return `void` instead of `this`
- Package moved to `posthog-js` monorepo (old repo archived, npm package still works)
- Touch 5+ files but no business logic rewrites

#### `zod` 3.x → 4.x (Significant effort — defer)

- Major API rewrite: `z.string().email()` → `z.email()`, `.strict()` → `z.strictObject()`, `ZodError.errors` removed
- **Risk:** the `.meta()` prototype patch in `src/schemas/calculator.ts` may break under v4 internals
- Codemod available: [nicoespeon/zod-v3-to-v4](https://github.com/nicoespeon/zod-v3-to-v4)
- v4 ships a `zod/v4` subpath for incremental migration
- Shared package schemas also need auditing

#### `@rneui/themed` + `@rneui/base` 4.0.0-rc.8 → 5.0.0 (Significant effort — defer)

- Never shipped stable 4.0.0 — jumped to 5.0.0
- **Icon system completely changed:** monolithic `react-native-vector-icons` replaced with scoped `@react-native-vector-icons/feather` etc.
- Unclear whether Expo's bundled `@expo/vector-icons` satisfies v5's new requirements — needs hands-on testing
- Every `<Icon type="feather">` across 6+ screens could break silently (renders empty)
- `Button`, `Text`, `ThemeProvider`, `createTheme` APIs appear unchanged
