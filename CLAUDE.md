# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Ecosystem

This is the **Next.js website** component of the Body Fat Calculator project. There's also a companion **React Native mobile app** at `../bodyfatcalculator-app/` that provides:
- Cross-platform mobile app (iOS/Android) with native UI
- Premium subscription features via RevenueCat
- Offline calculation capabilities
- Push notifications and app-specific features
- Advanced formula implementations with paywall

**Cross-Platform Integration:**
- Both projects use **PostHog** for analytics with shared user tracking
- Website serves as marketing funnel driving app downloads
- Shared calculation formulas and scientific research base
- Website provides attribution tracking for app installs
- Common branding and user experience design

## Commands

### Development
- `pnpm dev` - Start development server on localhost:3000
- `pnpm build` - Build for production
- `pnpm postbuild` - Generate sitemap (runs automatically after build)
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

### Package Management
- This project uses `pnpm` as specified in package.json. Use pnpm commands instead of npm.

## Architecture Overview

This is a Next.js 14 App Router application for body fat calculation using multiple scientifically validated methods.

### Key Architecture Elements

**Body Fat Calculation Methods**
- Multiple calculation methods defined in `src/FORMULA_REQUIREMENTS.ts`
- Methods include: YMCA, Modified YMCA, US Navy, Covert Bailey, Jackson & Pollock variants, Durnin & Womersley, Parrillo
- Each method has specific field requirements and some are marked as premium

**App Router Structure**
- Main app layout in `src/app/layout.tsx`
- Home page at `src/app/(main)/page.tsx`
- Method-specific pages at `src/app/methods/[method]/page.tsx`
- Research content at `src/app/research/**`
- Legal pages: privacy-policy, terms-of-service, faq

**Component Architecture**
- Reusable UI components in `src/components/`
- Key components: `Formula.tsx` for math rendering, `ConsentManager.tsx` for privacy compliance
- Layout components: `Header.tsx`, `Footer.tsx`, `Layout.tsx`
- Interactive components: `Fields.tsx` for form inputs, `Button.tsx` for actions

**Third-Party Integrations**
- **Analytics**: Umami (privacy-focused) and PostHog
- **Ads**: Google AdSense with consent management
- **Consent Management**: Klaro system with extensive configuration in layout.tsx
- **Math Rendering**: KaTeX via react-katex for formulas
- **Styling**: Tailwind CSS with custom design system

### Technical Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript with interfaces preferred over types
- **Styling**: Tailwind CSS with Montserrat font
- **UI Components**: Headless UI, Heroicons
- **Math**: KaTeX for formula rendering
- **Package Manager**: pnpm

### Code Style Guidelines (from .cursorrules)
- Use functional and declarative programming patterns
- Prefer iteration and modularization over code duplication
- Use lowercase with dashes for directories (e.g., components/auth-wizard)
- Use TypeScript interfaces over types, avoid enums
- Minimize 'use client', favor React Server Components
- Use descriptive variable names with auxiliary verbs (isLoading, hasError)

### Content Guidelines
- All body fat calculation content must be based on scientifically validated research
- Extensive list of 50+ canonical research papers specified in .cursorrules
- Citations must be verifiable with DOIs when possible
- No fabricated statistics or sources allowed

### Privacy & Compliance
- Comprehensive consent management with Klaro
- GDPR-compliant cookie handling
- Analytics tools are privacy-focused (Umami, PostHog)
- Consent required for advertising but analytics run without cookies

### Performance Optimizations
- Font preloading and display optimization
- DNS prefetching for third-party resources
- Responsive design with mobile-first approach
- Image optimization guidelines in place