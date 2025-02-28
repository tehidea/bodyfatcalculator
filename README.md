# Body Fat Calculator (PRO)

A professional-grade body fat measurement web application with multiple scientifically validated methods. This Next.js application provides accurate body fat percentage calculations using various established measurement techniques.

## Features

- Multiple scientifically validated body fat calculation methods
- Professional-grade accuracy based on peer-reviewed research
- Modern, responsive UI built with Tailwind CSS
- Privacy-focused with configurable consent management
- Analytics integration with Plausible and PostHog
- Google AdSense integration

## Getting started

To get started with this project, first install the npm dependencies:

```bash
npm install
```

Next, run the development server:

```bash
npm run dev
```

Finally, open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

## Consent Management System

This project includes a comprehensive consent management system using Klaro. The system ensures that users are only prompted for consent when necessary, and their preferences are remembered across visits.

### How to Use the Consent Manager

The ConsentManager component provides an easy way to manage user consent in your application:

```tsx
// Import the ConsentManager component
import { ConsentManager } from '@/components/ConsentManager'

// Basic usage with policy version
<ConsentManager policyVersion="1.0" />

// Force show the consent modal
<ConsentManager forceShow />

// Reset all consent settings
<ConsentManager resetConsent />
```

### Policy Version Management

When you update your privacy policy, simply increment the policy version to automatically prompt users to review their consent settings:

```tsx
// Before policy update
<ConsentManager policyVersion="1.0" />

// After policy update
<ConsentManager policyVersion="1.1" />
```

### Programmatic Control

You can also control the consent modal programmatically from anywhere in your code:

```typescript
// Show the consent modal
window.manageConsent?.showModal()

// Reset consent settings
window.manageConsent?.resetConsent()

// Check if a service has consent
const hasAnalyticsConsent = window.manageConsent?.hasConsent('posthog')
```

## Customizing

You can start editing this project by modifying the files in the `/src` folder. The site will auto-update as you edit these files.

## License

This site template is a commercial product and is licensed under the [Tailwind UI license](https://tailwindui.com/license).

## Learn more

To learn more about the technologies used in this project, see the following resources:

- [Next.js](https://nextjs.org/docs) - the React framework for production
- [Tailwind CSS](https://tailwindcss.com/docs) - the utility-first CSS framework
- [Klaro](https://heyklaro.com/docs/) - the consent management platform
- [PostHog](https://posthog.com/docs) - product analytics platform
- [Plausible](https://plausible.io/docs) - privacy-friendly analytics
