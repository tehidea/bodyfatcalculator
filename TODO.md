# TODO - Future Improvements

## 🎯 Missing Features (Numbered for Priority Selection)

### Core Features
1. **What's New/Changelog Screen** - Show new features after app updates
2. **User Settings/Preferences Screen** - Centralized settings management
3. **Measurement History Tracking** - Track body fat % over time with charts
4. **Export/Share Results** - Share calculations via image or text
5. **User Profile Management** - Save user details (age, gender) for quick access

### User Experience
6. **Onboarding Tutorial** - First-time user guidance
7. **Offline Mode Handling** - Better network state management and offline messaging
8. **Dark Mode Support** - System-wide dark theme
9. **Haptic Feedback** - Tactile responses for interactions
10. **Pull-to-Refresh** - Refresh data on main screen

### Technical Improvements
11. **Error Boundary Implementation** - Graceful error handling and recovery
12. **Deep Linking Configuration** - Handle specific app URLs and navigation
13. **App Version Management** - Display version info and check for updates
14. **Crash Reporting** - Integrate Sentry or similar for error tracking
15. **Performance Monitoring** - Track app performance metrics

### Accessibility
16. **Screen Reader Support** - Full VoiceOver/TalkBack compatibility
17. **Dynamic Font Scaling** - Respect system font size preferences
18. **High Contrast Mode** - Better visibility for visually impaired users
19. **Keyboard Navigation** - Full keyboard support for all features

### Analytics & Engagement
20. **In-App Feedback/Support** - Direct support contact from app
21. **Rating Prompt System** - Smart app store rating requests
22. **Push Notifications** - Engagement and reminder notifications
23. **A/B Testing Framework** - Test feature variations
24. **User Surveys** - Collect user feedback in-app

### Premium Features
25. **Cloud Sync** - Sync data across devices
26. **Advanced Charts & Trends** - Detailed analytics and predictions
27. **Custom Formula Creation** - Let users create their own formulas
28. **Photo Progress Tracking** - Visual body composition tracking
29. **Export to Health Apps** - Apple Health/Google Fit integration

### Content & Education
30. **Tips & Educational Content** - Body fat percentage explanations
31. **Video Tutorials** - How to take accurate measurements
32. **FAQ Section** - Common questions and answers
33. **Research Articles** - Link to scientific studies
34. **Comparison Tool** - Compare different formula results

---

## 🚨 URGENT: Privacy Updates Required for Store Listings

### Apple App Store Connect - Privacy Labels

#### Required Data Types to Declare

- [ ] **Purchase History**
  - Data Type: Purchases → Purchase History
  - Data Use: App Functionality, Analytics
  - Linked to User: Yes (you use custom app user IDs)
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

#### Privacy Manifest Requirements for 2025
- [ ] Verify privacy labels match actual data collection behavior
- [ ] Ensure third-party SDKs (RevenueCat, PostHog) are properly disclosed

### Google Play Console - Data Safety Section

#### Required Disclosures

- [ ] **Personal Info Collection**
  - User IDs: Yes (install IDs, RevenueCat user IDs)
  - Other: Yes (analytics identifiers)

- [ ] **App Activity**
  - App interactions: Yes (PostHog analytics)
  - In-app search history: No
  - Installed apps: No
  - Other actions: Yes (purchase events, formula selections)

- [ ] **App Info and Performance**
  - Crash logs: No
  - Diagnostics: Yes (error tracking)
  - Other performance data: Yes (analytics)

#### Data Usage Purposes
- [ ] App functionality ✓
- [ ] Analytics ✓
- [ ] Developer communications ✓
- [ ] Advertising or marketing ✗
- [ ] Fraud prevention, security, and compliance ✗ (unless needed)

#### Data Sharing
- [ ] **RevenueCat**: Service provider (purchase processing)
- [ ] **PostHog**: Service provider (analytics processing)

### Critical Action Items

- [ ] **Update App Store Connect immediately** - Privacy labels are checked automatically by Apple
- [ ] **Update Google Play Console** - Required for all app updates
- [ ] **Review your privacy policy** - Ensure it covers RevenueCat and PostHog data usage
- [ ] **Consider implementing user consent flows** - For EU users especially

### Data Collection Summary

Your app currently collects:
- [ ] Install attribution data (UTM parameters, initial URLs)
- [ ] User interaction events (formula changes, purchases, form submissions)
- [ ] Purchase history and premium status
- [ ] Device information (platform, app version)
- [ ] Custom user identifiers (install IDs)
- [ ] Error logs and debugging information

### Data Retention Configuration
- [ ] Configure PostHog data retention according to your privacy policy
- [ ] Verify RevenueCat purchase data retention settings
- [ ] Document AsyncStorage data persistence policy

**Note**: This guidance is based on your current SDK versions (RevenueCat v8.9.6, PostHog v3.15.4) and 2025 privacy requirements. Both stores have strengthened enforcement, so accurate disclosure is critical for app approval.

---

## SDK Enhancement Opportunities

### File System Upgrade
- **Consider upgrading to `expo-file-system/next`** for the new object-oriented API
- Current: Using legacy file system API
- Benefit: More modern, type-safe file operations

### Security Enhancement
- **Add `expo-app-integrity` package** for enhanced security
- Benefit: Verify app installation authenticity and detect tampering
- Useful for protecting premium features and user data

### UI/UX Enhancements (SDK 54 New Features)
- **Consider `expo-glass-effect`** for iOS Liquid Glass views
- Benefit: Modern iOS 18+ visual effects for premium UI polish
- **Explore enhanced `expo-maps`** with new styling options (if location features needed)
- **Consider Expo Router v6** for link previews and native tabs (if navigation upgrade needed)

### Performance Optimizations
- **Review React Compiler benefits** (enabled by default in SDK 54)
- Current: Already benefiting from React 19 and precompiled frameworks
- Monitor: Build times and runtime performance improvements

### Localization Enhancement
- **Consider adding `supportedLocales` configuration** in app.json
- Current: Basic expo-localization plugin enabled
- Benefit: Better control over app language from device settings

## Deprecated Items to Monitor

### SDK 55 Preparation
- **Monitor `expo-av` removal** in SDK 55 (not currently used, but good to track)
- **Stay updated on New Architecture** requirements (already enabled: `"newArchEnabled": true`)

### Long-term Considerations
- **Edge-to-edge Android design** - review UI for Android edge-to-edge support (now always enabled in SDK 54)
- **Predictive back gesture** - consider implementing Android predictive back (opt-in available)
- **iOS build performance** - already benefiting from precompiled React Native XCFrameworks (up to 10x faster builds)
- **Xcode 26 compatibility** - test with recommended Xcode version for SDK 54

## Package Updates Available
Recent updates completed:
- ✅ `@expo/vector-icons`: 14.1.0 → 15.0.2
- ✅ `@react-native-async-storage/async-storage`: 2.1.2 → 2.2.0
- ✅ All Expo packages updated to SDK 54 versions
- ✅ React updated: 19.0.0 → 19.1.0
- ✅ React Native updated: 0.81.0 → 0.81.4
- ✅ TypeScript updated: ~5.8.3 → ~5.9.2
- ✅ React Native Reanimated updated: ~3.17.4 → ~4.1.0
- ✅ Added `react-native-worklets`: ^0.5.1 (for enhanced performance)
- ✅ Many other packages auto-updated

Still consider updating:
- `@expo-google-fonts/montserrat`: 0.2.3 → 0.4.2
- `posthog-react-native`: 3.15.4 → 4.6.0 (major version jump - test carefully)
- `react-native-purchases`: 8.9.6 → 9.4.3 (major version jump - check breaking changes)
- `zod`: 3.23.8 → 4.1.9 (major version jump - review migration guide)

## Configuration Updates

### Package.json Optimizations
- **Review `react-native-svg` exclusion** in expo.install.exclude
- Current: `"exclude": ["react-native-svg"]` added to package.json
- Consider: Whether this exclusion is still needed or can be removed

### Development Experience
- **Enhanced Expo CLI with ESM support** - already available in SDK 54
- **Improved import stack traces** - monitor for better debugging experience
- **Revamped expo-dev-launcher UI** - explore new development tools

## Low Priority
- **Review React Native Elements updates** - currently using RC versions
- **Monitor TypeScript 5.8.3+** compatibility with latest React Native
- **Consider removing unused dependencies** identified during linting
- **Node.js version** - consider updating from 22.11.0 to 20.19.4 (SDK 54 minimum) or newer