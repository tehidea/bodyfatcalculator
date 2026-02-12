# Local EAS Builds

Build and submit the app locally instead of waiting for the EAS free tier cloud queue (~70 min).

## Prerequisites

```bash
# Authenticate with EAS
pnpx eas login

# Verify credentials
pnpx eas whoami
```

### iOS

- **Xcode** — latest stable version with command line tools
- **CocoaPods** — `sudo gem install cocoapods` (or via Homebrew)
- **fastlane** — `brew install fastlane` (used internally by EAS for code signing)
- **Apple Developer account** — with valid provisioning profiles and certificates

### Android

- **Android SDK** — via Android Studio (API level matching `compileSdkVersion`)
- **Java 17** — `brew install openjdk@17`
- **Android NDK** — installed via Android Studio SDK Manager

### Both

- **Node.js 22.11.0** — managed via `mise`
- **pnpm** — package manager

## iOS Build + Submit

### Build

```bash
pnpx eas build --platform ios --profile production --local
```

Output: `build-{timestamp}.ipa` in the project root (e.g., `build-1770852282343.ipa`).

### Submit to App Store Connect

```bash
pnpx eas submit --platform ios --path ./build-{timestamp}.ipa
```

Replace `{timestamp}` with the actual filename from the build output.

### eas.json submit config for iOS

Add `ascAppId` (App Store Connect App ID) to the submit config:

```jsonc
"submit": {
  "production": {
    "ios": {
      "ascAppId": "YOUR_ASC_APP_ID"
    },
    "android": {
      "serviceAccountKeyPath": "../Expo/Google/body-fat-calculator-445413-49ea032c4367.json",
      "track": "internal"
    }
  }
}
```

Find your `ascAppId` in [App Store Connect](https://appstoreconnect.apple.com) → App Information → Apple ID (the numeric ID, e.g., `6446627392`).

## Android Build + Submit

### Build

```bash
pnpx eas build --platform android --profile production --local
```

Output: `build-{timestamp}.aab` in the project root.

### Submit to Google Play

```bash
pnpx eas submit --platform android --path ./build-{timestamp}.aab
```

The existing `eas.json` submit config with `serviceAccountKeyPath` and `track: "internal"` handles Android submission.

## Limitations of `--local`

| Feature | Cloud Build | Local Build |
|---|---|---|
| `--auto-submit` | Yes | **No** — must build and submit separately |
| `--platform all` | Yes | **No** — must build each platform separately |
| Build caching | Yes | **No** — full rebuild every time |
| EAS Secrets | Injected automatically | **No** — must set env vars manually |
| Build artifacts | Stored in EAS dashboard | Only the local `.ipa`/`.aab` file |

## Debugging

Preserve build artifacts for debugging by setting environment variables:

```bash
# Keep the iOS build directory after build
EAS_LOCAL_BUILD_SKIP_CLEANUP=1 pnpx eas build --platform ios --profile production --local

# Increase build log verbosity
EAS_LOCAL_BUILD_WORKINGDIR=./build-output pnpx eas build --platform ios --profile production --local
```

## Fallback: Native Build + EAS Submit

If `eas build --local` fails, build natively and still use EAS for submission.

### iOS (Xcode)

```bash
# Generate native project
pnpx expo prebuild --platform ios --clean

# Open in Xcode, archive, and export .ipa
open ios/*.xcworkspace

# Submit the exported .ipa via EAS
pnpx eas submit --platform ios --path /path/to/exported.ipa
```

### Android (Gradle)

```bash
# Generate native project
pnpx expo prebuild --platform android --clean

# Build release AAB
cd android && ./gradlew bundleRelease && cd ..

# Submit the .aab via EAS
pnpx eas submit --platform android --path android/app/build/outputs/bundle/release/app-release.aab
```

## Quick Reference

```bash
# Full iOS flow
pnpx eas build --platform ios --profile production --local
pnpx eas submit --platform ios --path ./build-*.ipa

# Full Android flow
pnpx eas build --platform android --profile production --local
pnpx eas submit --platform android --path ./build-*.aab
```
