export interface Feature {
  id: string;
  name: string;
  description?: string;
  availability: "free" | "pro" | "premium";
}

export const FEATURES: Feature[] = [
  // Free Features
  {
    id: "basic_formulas",
    name: "Basic Formulas",
    description: "YMCA, Modified YMCA, and U.S. Navy methods",
    availability: "free",
  },
  {
    id: "unit_conversion",
    name: "Unit Conversion",
    description: "Switch between metric and imperial units",
    availability: "free",
  },
  {
    id: "basic_results",
    name: "Basic Results",
    description: "Body fat percentage and classification",
    availability: "free",
  },

  // Pro Features
  {
    id: "advanced_formulas",
    name: "Advanced Formulas",
    description: "Jackson & Pollock, Durnin & Womersley, and more",
    availability: "pro",
  },
  {
    id: "unlimited_local",
    name: "Unlimited Local Storage",
    description: "Store as many measurements as you want",
    availability: "pro",
  },
  {
    id: "detailed_analysis",
    name: "Detailed Analysis",
    description: "In-depth body composition insights",
    availability: "pro",
  },
  {
    id: "offline_access",
    name: "Offline Access",
    description: "Use all formulas without internet connection",
    availability: "pro",
  },
  {
    id: "basic_export",
    name: "Basic Export",
    description: "Export your measurements in simple format",
    availability: "pro",
  },
  {
    id: "family_sharing",
    name: "Family Sharing",
    description: "Share PRO access with up to 5 family members",
    availability: "pro",
  },

  // Premium Features
  {
    id: "cloud_sync",
    name: "Cloud Sync",
    description: "Access your data across all your devices",
    availability: "premium",
  },
  {
    id: "progress_tracking",
    name: "Progress Tracking",
    description: "Visual graphs and trend analysis",
    availability: "premium",
  },
  {
    id: "photos",
    name: "Progress Photos",
    description: "Track visual progress with measurements",
    availability: "premium",
  },
  {
    id: "advanced_export",
    name: "Advanced Export",
    description: "Export detailed reports in CSV and PDF formats",
    availability: "premium",
  },
  {
    id: "presets",
    name: "Custom Presets",
    description: "Save your frequently used measurement combinations",
    availability: "premium",
  },
  {
    id: "priority_support",
    name: "Priority Support",
    description: "Get help faster when you need it",
    availability: "premium",
  },
  {
    id: "early_access",
    name: "Early Access",
    description: "Try new features before everyone else",
    availability: "premium",
  },
];

export const PRICING = {
  pro: {
    price: "£10",
    type: "one-time",
  },
  premium: {
    monthly: {
      price: "£3",
      type: "monthly",
    },
    annual: {
      price: "£18",
      type: "annual",
      savings: "50%",
    },
  },
  bundles: {
    proWithPremium: {
      price: "£25",
      type: "bundle",
      savings: "£3",
    },
    lifetime: {
      price: "£49",
      type: "lifetime",
    },
  },
} as const;
