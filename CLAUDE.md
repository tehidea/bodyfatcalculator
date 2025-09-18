# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Ecosystem

This is the **React Native mobile app** component of the Body Fat Calculator project. There's also a companion **Next.js website** at `../bodyfatcalculator-web/` that serves as:

- Marketing landing page with app store download links
- Support documentation and FAQ
- Web-based calculator for users who prefer browser access
- Research content and scientific references

**Cross-Platform Integration:**

- Both projects use **PostHog** for analytics with shared user tracking
- Mobile app uses **RevenueCat** for premium subscriptions
- Website drives app downloads via attribution tracking
- Shared formula implementations and calculation logic
- Common branding and user experience

## Development Commands

### Build & Run

- `npm start` - Start Expo development server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run web` - Run on web

### Code Quality

- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

### Testing

- `npm test` - Run Jest tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

### Other

- `npm run check-versions` - Check Node.js version requirements

## Architecture Overview

This is a React Native Expo app that calculates body fat percentage using various scientific formulas.

### Key Technologies

- **React Native + Expo**: Cross-platform mobile development
- **TypeScript**: Type safety throughout
- **Zustand**: State management with persistence via AsyncStorage
- **Zod**: Runtime validation and schema definitions
- **React Navigation**: Screen navigation
- **React Native Elements (@rneui/themed)**: UI components
- **RevenueCat**: In-app purchase management
- **PostHog**: Analytics tracking

### State Management Architecture

The app uses **Zustand** for state management with two main stores:

1. **CalculatorStore** (`src/store/calculatorStore.ts`):

   - Manages formula selection, user inputs, calculations, and results
   - Handles unit conversion between metric/imperial systems
   - Persists data to AsyncStorage
   - Always converts to metric for calculations, displays in user's preferred system

2. **PremiumStore** (`src/store/premiumStore.ts`):
   - Manages RevenueCat integration for premium features
   - Tracks purchase status and entitlements

### Formula System

- **Formula implementations**: Located in `src/formulas/` directory
- **Validation schemas**: Defined in `src/schemas/calculator.ts` using Zod
- **Available formulas**: YMCA, Modified YMCA, US Navy, Covert Bailey, Jackson & Pollock variants, Durnin & Womersley, Parillo
- **Free vs Premium**: Basic formulas (YMCA, Modified YMCA, US Navy) are free; advanced formulas require premium

### Unit Conversion

- All calculations performed in metric units internally
- User can toggle between metric/imperial display
- Conversion handled automatically in `useCalculatorStore`
- Skinfold measurements always in millimeters (no conversion)

### Component Structure

- **Screens**: `CalculatorScreen` (main calculator) and `FeatureComparisonScreen` (premium purchase)
- **Calculator components**: Located in `src/components/calculator/`
- **Responsive design**: Uses `ResponsiveProvider` context for adaptive layouts

### Testing

- **Jest + React Native Testing Library** for unit/component tests
- Tests located in `src/__tests__/` directory
- Formula validation tests ensure accuracy
- Store tests verify state management behavior

### Environment Setup

- Node.js version: 22.11.0 (specified in package.json engines)
- Package manager: NPM
- Environment variables stored in `.env` files
- RevenueCat API keys configured via Expo config

### Revenue & Analytics

- **RevenueCat**: Handles premium subscriptions and one-time purchases
- **PostHog**: Tracks user analytics and conversion events
- **AdMob integration**: Configured for banner ads (iOS/Android)

### Key Development Patterns

- Functional components with hooks (no classes)
- Strict TypeScript with interfaces preferred over types
- Zod schemas for all data validation
- Responsive design using Flexbox
- Safe area management with react-native-safe-area-context

### Important Files

- `App.tsx`: Main app entry point with providers
- `.cursorrules`: Development guidelines and conventions
- `app.json`: Expo configuration
- `src/constants/features.ts`: Feature flags and premium feature definitions
