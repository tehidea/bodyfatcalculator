# Body Fat Calculator

This calculator implements various methods for estimating body fat percentage, providing accurate measurements using both caliper and circumference-based methods.

## Methods Overview

### Caliper Methods

Skinfold caliper measurements are considered one of the most accurate field methods for body fat estimation, with accuracy rates comparable to hydrostatic weighing when performed correctly. The method involves measuring skinfold thickness at specific body sites using calipers.

Key advantages:

- High accuracy (±3-4% when done properly)
- Non-invasive
- Quick and portable
- Cost-effective compared to advanced methods

Limitations:

- Requires proper technique
- Accuracy depends on tester's skill
- May be less accurate for very lean or obese individuals

### Circumference Methods (US Navy)

The US Navy method uses body circumference measurements to estimate body fat percentage. While not as precise as caliper measurements, it's a reliable method when proper caliper measurements aren't possible.

Key advantages:

- No special equipment needed beyond a tape measure
- Easy to perform
- Good for tracking changes over time
- More consistent between different testers

Limitations:

- Less accurate than caliper methods
- May not account for different body types well
- Can be affected by recent meals or hydration

## Features by Tier

### Free Tier

- [x] Basic Methods
  - YMCA: A simple method using weight and waist measurements (±5-7% margin of error)
  - Modified YMCA: Enhanced version with additional measurements for women (±4-6% margin of error)
  - U.S. Navy: Military standard using key body measurements (±4-6% margin of error)
- [x] Unit Conversion (metric/imperial)
- [x] Basic Results (body fat percentage and classification)
- [x] Standard Precision (1 decimal place)

### PRO Tier (£10)

- [ ] Advanced Methods
  - Covert Bailey: Circumference method from fitness literature (±4-5% estimated, not peer-reviewed)
  - Durnin & Womersley: Scientific skinfold method (±3.5-5% when done properly)
  - Jackson & Pollock (3-site): Quick but accurate skinfold method (±4-5% when done properly)
  - Jackson & Pollock (4-site): Balanced skinfold approach (±3.5-4.5% when done properly)
  - Jackson & Pollock (7-site): Most thorough skinfold method (±3-4% when done properly)
  - Parrillo: Bodybuilding-focused nine-site method (±3-4% estimated, not peer-reviewed)
- [x] Enhanced Precision
  - 2 decimal places for all measurements
  - Access to research-grade formulas
  - Detailed measurement guides
- [ ] Unlimited Local Storage
- [ ] Detailed Analysis
- [ ] Basic Export

## Formulas and Their Accuracy

Each formula has an inherent margin of error, which varies based on multiple factors including measurement technique, individual body composition, and population specifics. The following accuracy ranges are based on recent meta-analyses and validation studies:

### Free Methods

1. YMCA (±5-7%)[1]

   - Simple method using weight and waist measurements
   - Higher margin of error due to minimal measurements
   - Best for tracking personal trends rather than absolute values
   - Less accurate for athletic or non-standard body types

2. Modified YMCA (±4-6%)[1]

   - Enhanced version with additional measurements for women
   - Improved accuracy over basic YMCA
   - More reliable for women due to gender-specific calculations
   - Still affected by non-standard fat distribution

3. U.S. Navy (±4-6%)[2]

   - Military standard using key body measurements
   - Most accurate for individuals near population averages
   - Less reliable for very lean (<8%) or obese (>30%) individuals
   - Accuracy depends heavily on measurement technique

### PRO Methods

1. Covert Bailey (±4-5%)[3]

   - Comprehensive method with multiple measurements
   - Age and gender-specific calculations
   - More reliable across different body types
   - Requires precise measurement technique

2. Durnin & Womersley (±3.5-5%)[4]

   - Scientific skinfold method
   - Age and gender-specific equations
   - Accuracy heavily dependent on technician skill
   - Requires proper caliper technique and calibration

3. Jackson & Pollock Methods[5]

   - 3-Site (±4-5% when done properly)
   - 4-Site (±3.5-4.5% when done properly)
   - 7-Site (±3-4% when done properly)
   - Industry standard for skinfold measurements
   - Accuracy improves with more measurement sites
   - Requires significant technical expertise

4. Parrillo (±3-4% when done properly)[6]

   - Bodybuilding-focused nine-site method
   - Most comprehensive skinfold method
   - Requires significant expertise and consistent technique
   - Best for tracking changes in trained individuals

### Important Notes on Accuracy

- All methods are estimates and should be used as guidance rather than absolute values
- Accuracy ranges assume proper measurement technique and calibrated tools
- Individual results may vary based on:
  - Body type and fat distribution
  - Hydration levels
  - Time of day
  - Recent physical activity
  - Measurement skill and consistency
- For best results:
  - Take measurements at the same time of day
  - Use consistent technique
  - Track trends over time rather than focusing on single measurements
  - Consider using multiple methods for verification

## Formulas

### YMCA Body Fat Formula

The YMCA formula uses weight and waist measurements to estimate body fat percentage.

**For Men:**

$$\left(\frac{4.15 \times Waist_{in} - 0.082 \times Weight_{lb} - 98.42}{Weight_{lb}}\right) \times 100$$

Where:

- Waist<sub>in</sub> = waist circumference in inches
- Weight<sub>lb</sub> = body weight in pounds

**For Women:**

$$\left(\frac{4.15 \times Waist_{in} - 0.082 \times Weight_{lb} - 76.76}{Weight_{lb}}\right) \times 100$$

Where:

- Waist<sub>in</sub> = waist circumference in inches
- Weight<sub>lb</sub> = body weight in pounds

### Modified YMCA Body Fat Formula

An improved version of the YMCA formula that includes additional measurements for better accuracy.

**For Men:**

$$\left(\frac{4.15 \times Waist_{in} - 0.082 \times Weight_{lb} - 94.42}{Weight_{lb}}\right) \times 100$$

**For Women:**

$$\left(\frac{0.268 \times Weight_{lb} - 0.318 \times Wrist_{in} + 0.157 \times Waist_{in} + 0.245 \times Hips_{in} - 0.434 \times Forearm_{in} - 8.987}{Weight_{lb}}\right) \times 100$$

### Covert Bailey Formula

An age-specific method that uses multiple body measurements to estimate body fat percentage. The formula varies by both gender and age group.

**For Men:**

- Age ≤ 30: Body Fat% = B + 0.5A - 3C - D
- Age > 30: Body Fat% = B + 0.5A - 2.7C - D

Where:

- A = Hips circumference (widest point)
- B = Waist circumference (at navel)
- C = Forearm circumference (widest point)
- D = Wrist circumference (smallest point)

**For Women:**

- Age ≤ 30: Body Fat% = A + 0.8B - 2C - D
- Age > 30: Body Fat% = A + B - 2C - D

Where:

- A = Hips circumference (widest point)
- B = Thigh circumference (widest point)
- C = Calf circumference (widest point)
- D = Wrist circumference (smallest point)

All measurements should be taken in inches. The calculator automatically converts metric measurements.

Reference: Bailey, Covert. Fit or Fat. Houghton Mifflin Harcourt.

### U.S. Navy Formula

Uses circumference measurements to estimate body fat percentage.

**For Men:**

$$86.010 \times \log_{10}(Waist_{in} - Neck_{in}) - 70.041 \times \log_{10}(Height_{in}) + 36.76$$

**For Women:**

$$163.205 \times \log_{10}(Waist_{in} + Hip_{in} - Neck_{in}) - 97.684 \times \log_{10}(Height_{in}) - 78.387$$

### Jackson & Pollock Methods

All Jackson & Pollock formulas use a two-step process:

1. Calculate body density using skinfold measurements and age
2. Convert body density to body fat percentage using Siri's equation

#### Jackson & Pollock 3-Site Formula

Uses three gender-specific skinfold sites:

- Men: chest, abdomen, thigh
- Women: tricep, suprailiac, thigh

**Body Density Formula for Men:**

$$1.10938 - 0.0008267(X) + 0.0000016(X^2) - 0.0002574(Age)$$

**Body Density Formula for Women:**

$$1.0994921 - 0.0009929(X) + 0.0000023(X^2) - 0.0001392(Age)$$

Where X = Sum of skinfolds (mm)

#### Jackson & Pollock 4-Site Formula

Uses four skinfold measurements (abdomen, thigh, tricep, suprailiac).

**Body Density Formula for Men:**

$$1.10938 - 0.0008267(X) + 0.0000016(X^2) - 0.0002574(Age)$$

**Body Density Formula for Women:**

$$1.096095 - 0.0006952(X) + 0.0000011(X^2) - 0.0000714(Age)$$

Where X = Sum of skinfolds (mm)

#### Jackson & Pollock 7-Site Formula

Uses seven skinfold measurements (chest, abdomen, thigh, tricep, subscapular, suprailiac, midaxillary).

**Body Density Formula for Men:**

$$1.112 - 0.00043499(X) + 0.00000055(X^2) - 0.00028826(Age)$$

**Body Density Formula for Women:**

$$1.097 - 0.00046971(X) + 0.00000056(X^2) - 0.00012828(Age)$$

Where X = Sum of skinfolds (mm)

For all Jackson & Pollock formulas, convert body density to body fat percentage using Siri's equation:

$$Body Fat\% = \left(\frac{495}{Body Density} - 450\right)$$

### Durnin & Womersley Formula

Uses four skinfold measurements with age and gender-specific coefficients.

First calculate body density:

$$Density = c - m \times \log_{10}(X)$$

Where X = Sum of bicep, tricep, subscapular, and suprailiac skinfolds (mm)

The coefficients c and m vary by age and gender:

| Age   | Men (c, m)     | Women (c, m)   |
| ----- | -------------- | -------------- |
| 17-19 | 1.1620, 0.0630 | 1.1549, 0.0678 |
| 20-29 | 1.1631, 0.0632 | 1.1599, 0.0717 |
| 30-39 | 1.1422, 0.0544 | 1.1423, 0.0632 |
| 40-49 | 1.1620, 0.0700 | 1.1333, 0.0612 |
| 50+   | 1.1715, 0.0779 | 1.1339, 0.0645 |

### Converting Body Density to Body Fat Percentage

For all formulas that calculate body density, convert to body fat percentage using Siri's equation:

$$Body Fat\% = \left(\frac{495}{Body Density} - 450\right)$$

### Parrillo Formula

Uses nine skinfold measurements (chest, abdomen, thigh, bicep, tricep, subscapular, suprailiac, lower back, calf) and body weight.

$$Body Fat\% = \frac{Sum\ of\ skinfolds\ (mm) \times 27}{Weight\ (lbs)}$$

Note: Weight must be in pounds. The calculator automatically converts from kilograms.

## Unit Conversions

### Weight

- 1 kg = 2.20462 lbs

### Length

- 1 cm = 0.393701 inches

## Notes

- All measurements should be taken in a relaxed state
- For most accurate results, take measurements in the morning before eating
- Consistency in measurement technique is crucial for tracking progress
- These formulas provide estimates and may not be as accurate as other methods like DEXA scans or hydrostatic weighing

## References

### Primary Sources

1. **YMCA & Modified YMCA**

   - Primary source:
     - Golding Lawrence A., Myers Clayton R., Sinning Wayne E. (1999). Y's Way to Physical Fitness: The Complete Guide to Fitness Testing and Instruction. Human Kinetics.
     - ISBN: 0-87322-214-8
     - Full Text: [Archive.org](https://archive.org/details/yswaytophysicalf00gold/)
   - Validation source:
     - YMCA of the USA. (2000). YMCA Fitness Testing and Assessment Manual (4th ed.). YMCA of the USA.
     - ISBN: 978-0736033169
     - Preview: [Google Books](https://books.google.co.uk/books?id=rmNyQgAACAAJ)
   - _Note: Uses weight and waist circumference for basic formula; adds wrist, forearm, and hip measurements for women in modified version_
   - Accuracy: 5-7% (basic), 4-6% (modified)

2. **U.S. Navy**

   - Primary source:
     - Hodgdon, J.A., & Beckett, M.B. (1984). Prediction of percent body fat for U.S. Navy men and women from body circumferences and height. Naval Health Research Center Report No. 84-29.
     - Full text: [Archive.org](https://archive.org/details/DTIC_ADA143890)
   - _Note: Technical report archived by Defense Technical Information Center_
   - Accuracy: 4-6%

3. **Covert Bailey**

   - Primary source:
     - Bailey, C. (1999). The Ultimate Fit or Fat: Get in Shape and Stay in Shape with America's Best-Loved and Most Effective Fitness Teacher. Houghton Mifflin Harcourt.
     - ISBN: 978-0395959411
     - Preview: [Google Books](https://books.google.co.uk/books?id=X3qbN6DNb_oC)
   - _Note: Updated edition of the 1991 original_
   - Accuracy: 4-5%

4. **Jackson & Pollock 3-Site**

   - For men:
     - Jackson, A.S., & Pollock, M.L. (1978). Generalized equations for predicting body density of men. British Journal of Nutrition, 40(3), 497-504.
     - **DOI:** [10.1079/BJN19780152](https://doi.org/10.1079/BJN19780152)
     - _Note: Original 1978 publication, digitized by Cambridge Core in 2007_
   - For women:
     - Jackson, A.S., Pollock, M.L., & Ward, A. (1980). Generalized equations for predicting body density of women. Medicine and Science in Sports and Exercise, 12(3), 175-182.
     - **DOI:** [10.1249/00005768-198023000-00009](https://doi.org/10.1249/00005768-198023000-00009)
   - Accuracy: 4-5%

5. **Jackson & Pollock 4-Site and 7-Site**

   - Primary source:
     - Jackson, A.S., & Pollock, M.L. (1985). Practical assessment of body composition. The Physician and Sportsmedicine, 13(5), 76-90.
     - **DOI:** [10.1080/00913847.1985.11708790](https://doi.org/10.1080/00913847.1985.11708790)
     - _Note: Original 1985 publication, digitized by Taylor & Francis in 2016_
   - Accuracy: 3.5-4.5% (4-site), 3-4% (7-site)

6. **Durnin & Womersley**

   - Primary source:
     - Durnin, J.V.G.A., & Womersley, J. (1974). Body fat assessed from total body density and its estimation from skinfold thickness: measurements on 481 men and women aged from 16 to 72 years. British Journal of Nutrition, 32(1), 77-97.
     - **DOI:** [10.1079/BJN19740060](https://doi.org/10.1079/BJN19740060)
     - _Note: Original 1974 publication, digitized by Cambridge Core_
   - Accuracy: 3.5-5%

7. **Parrillo**
   - Primary source:
     - Parrillo, J., & Greenwood-Robinson, M. (1993). High-Performance Body-Building. Perigee Books.
     - ISBN: 978-0399517716
     - Pages: 185 total
     - Preview: [Google Books](https://books.google.co.uk/books?id=7nETOQAACAAJ)
     - _Note: Verification needed for exact location of body fat measurement method_
   - Accuracy: 3-4%

### General Validation Studies

1. **General Methodology**

   - Wang, Z.M., Pierson, R.N., & Heymsfield, S.B. (1992). The five-level model: a new approach to organizing body-composition research. The American Journal of Clinical Nutrition, 56(1), 19-28.
   - **DOI:** [10.1093/ajcn/56.1.19](https://doi.org/10.1093/ajcn/56.1.19)
   - _Note: Original 1992 publication, digitized by Oxford Academic_

2. **Comprehensive Validation**

   - Heyward, V.H., & Wagner, D.R. (2004). Applied Body Composition Assessment (2nd ed.). Human Kinetics.
   - ISBN: 978-0736046305
   - Pages: 87-98
   - Preview: [Google Books](https://books.google.co.uk/books?id=rZQe0Yz_IyQC)

3. **Assessment Methods**
   - Lohman, T.G. (1992). Advances in Body Composition Assessment. Human Kinetics Publishers.
   - ISBN: 978-0873223928
   - Preview: [Google Books](https://books.google.co.uk/books?id=Vr8rAQAAMAAJ)

### Additional Academic References

1. **Meta-Analysis of Methods**

   - Wagner, D.R., & Heyward, V.H. (1999). Techniques of body composition assessment: a review of laboratory and field methods. Research Quarterly for Exercise and Sport, 70(2), 135-149.
   - DOI: 10.1080/02701367.1999.10608031

2. **Skinfold Validation Studies**

   - Martin, A.D., et al. (1985). The use of skinfold calipers for predicting body fatness: A review and practice guide. Sports Medicine, 2(1), 29-46.
   - DOI: 10.2165/00007256-198502010-00004

3. **Method Comparison Studies**

   - Ackland, T.R., et al. (2012). Current status of body composition assessment in sport. Sports Medicine, 42(3), 227-249.
   - DOI: 10.2165/11597140-000000000-00000

4. **Navy Method Validation** _(Note: this reference appears incorrect/fabricated — the listed authors, year, and DOI do not align and should be removed or replaced with a verifiable Navy-validation source)_

   - Wellens, R.I., et al. (2014). Body-composition differences between African American and white women: relation to resting energy requirements. The American Journal of Clinical Nutrition, 99(1), 71-76.
   - DOI: 10.3945/ajcn.113.063974

5. **Modern Validation Studies**
   - Fosbol, M.O., & Zerahn, B. (2015). Contemporary methods of body composition measurement. Clinical Physiology and Functional Imaging, 35(2), 81-97.
   - DOI: 10.1111/cpf.12152

## Implementation Details

The calculator supports multiple measurement systems:

- Metric (kg, cm, mm)
- Imperial (lbs, inches)

All calculations are performed in imperial units, with automatic conversion from metric inputs.

### Body Fat Classification

These ranges are based on research by the American Council on Exercise (ACE) and other scientific bodies. Note that individual factors like age, genetics, and athletic background can influence what's optimal for you.

#### Men

| Classification | Body Fat % | Notes                                                      |
| -------------- | ---------- | ---------------------------------------------------------- |
| Essential Fat  | 2-5%       | Rarely sustainable, typically only during peak competition |
| Athletic       | 6-13%      | Common among competitive athletes                          |
| Fitness        | 14-17%     | Generally achievable with consistent training              |
| Acceptable     | 18-24%     | Typical healthy range                                      |
| Obese          | 25%+       | Increased health risk                                      |

#### Women

| Classification | Body Fat % | Notes                                                      |
| -------------- | ---------- | ---------------------------------------------------------- |
| Essential Fat  | 10-13%     | Rarely sustainable, typically only during peak competition |
| Athletic       | 14-20%     | Common among competitive athletes                          |
| Fitness        | 21-24%     | Generally achievable with consistent training              |
| Acceptable     | 25-31%     | Typical healthy range                                      |
| Obese          | 32%+       | Increased health risk                                      |

Note: These classifications are general guidelines. Athletes in different sports may have different optimal ranges:

- Bodybuilders: 3-7% (men), 8-12% (women) during competition
- Distance Runners: 5-12% (men), 10-15% (women)
- Swimmers: 9-12% (men), 14-19% (women)
- Team Sports: 11-14% (men), 16-20% (women)

## Icons used:

- [Body Weight Scales](https://uxwing.com/body-weight-scales-icon/)
- [Calendar](https://uxwing.com/calendar-line-icon/)
- [Measurement Vertical](https://uxwing.com/measurement-vertical-icon/)
- [Measuring Tape](https://uxwing.com/measuring-tape-icon/)
- [Male Icon](https://uxwing.com/male-symbol-icon/)
- [Female Icon](https://uxwing.com/woman-symbol-icon/)
- Body Calipers (custom made SVG)

## Sources

1. Original research papers and military documentation
2. [FitLifeRegime's comprehensive guide](https://fitliferegime.com/body-fat-percentage-calculator-based-on-caliper-and-us-navy/) on body fat measurement methods
3. Clinical studies on measurement accuracy
4. Professional fitness industry standards

## RevenueCat Setup

### Development Environment

1. Create `.env` in the root directory:

   ```
   EXPO_PUBLIC_REVENUECAT_IOS_KEY=your_ios_key_here
   ```

2. Configure RevenueCat Dashboard:
   - Create entitlement `pro_features`
   - Create product `pro_lifetime`
   - Create an offering named "current"
   - Add product to the offering with package ID "lifetime"

### Testing In-App Purchases

The app uses RevenueCat's sandbox environment for testing:

1. **Create Sandbox Tester Account**

   - Go to App Store Connect > Users and Access > Sandbox > Testers
   - Create new tester with unused email
   - Save the credentials

2. **Development Testing**

   ```
   # Testing Flow
   1. Run app: npx expo start
   2. Sign in with Sandbox Account:
      - Simulator: Features > Game Center > Sign In
      - Real Device: Settings > App Store > Sign In
   3. When making a purchase:
      - Simulator: Purchase flow is automated
      - Real device: Use sandbox account
   4. RevenueCat automatically detects sandbox environment
   5. All purchases are free in sandbox
   ```

3. **Common Sign-in Issues**

   - "No active account" error means no Apple ID is signed in
   - Make sure to sign out of regular Apple ID first
   - For Simulator: Can also sign in via Settings > Sign in to your iPhone
   - For Real Device: Sign in specifically in App Store settings
   - If issues persist, try:
     1. Force quit Simulator/app
     2. Clear App Store cache
     3. Restart Simulator/device

4. **Sandbox Behavior**

   - Purchases complete instantly
   - Subscription time is accelerated:
     - 1 minute = 1 hour
     - 5 minutes = 1 day
     - 15 minutes = 1 week
     - 1 hour = 1 month
     - 5 hours = 1 year
   - Billing retry happens every 5 minutes
   - Introductory offers reset every 6 hours

5. **Common Issues**
   - Sign out of regular Apple ID before testing
   - Use sandbox account when prompted
   - If purchase fails:
     1. Check RevenueCat logs
     2. Verify you're signed in with sandbox account
     3. Try force-quitting and reopening the app
     4. Clear App Store cache if needed

### Production Setup

1. Create `.env.production` with production API key
2. Set up production products in RevenueCat:

   - Product ID: `pro_lifetime`
   - Entitlement: `pro_features`
   - Price: £10
   - Family Sharing: Enabled (up to 5 family members)

3. For TestFlight Testing:
   - Use sandbox accounts
   - Verify receipt validation
   - Test the complete purchase flow

## Advertising

### AdMob

#### Banner iOS

Complete the instructions in the [Google Mobile Ads SDK guide](https://developers.google.com/admob/android/quick-start#import_the_mobile_ads_sdk) using this app ID:
`ca-app-pub-2117029955778880~2123412137`

Follow the [banner implementation guide](https://developers.google.com/admob/android/banner) to integrate the SDK. You'll specify ad type, size and placement when you integrate the code using this ad unit ID:
`Bannerca-app-pub-2117029955778880/3850297476`

#### Banner Android

Complete the instructions in the [Google Mobile Ads SDK guide](https://developers.google.com/admob/android/quick-start#import_the_mobile_ads_sdk) using this app ID:
`ca-app-pub-2117029955778880~1499174729`

Follow the [banner implementation guide](https://developers.google.com/admob/android/banner) to integrate the SDK. You'll specify ad type, size and placement when you integrate the code using this ad unit ID:
`Banner Androidca-app-pub-2117029955778880/5756046138`

### Troubleshooting

- Check RevenueCat dashboard for purchase logs
- Enable debug mode in development for detailed logs
- Verify API key is correctly set in environment files
- Ensure products and entitlements match the configured IDs

## Screenshots

When taking screenshots for the website, use iPhone 12 simulator since that's the device shown on the website.

### Simulator Status Bar Configuration

To set a consistent status bar appearance across all running iOS simulators (useful for screenshots and demos), use:

```bash
xcrun simctl list devices | grep "Booted" | sed -E 's/.*\(([-A-Z0-9]+)\).*/\1/' | while read -r device; do
    xcrun simctl status_bar "$device" override --time "13:37" --cellularBars 4
done
```

This command will:

- Find all booted simulators
- Set the time to 13:37
- Set cellular signal to maximum strength
- Apply these settings across all active simulator devices

You can customize the status bar further with additional options:

- `--time "HH:MM"` - Set custom time
- `--cellularBars 0-4` - Set cellular signal strength
- `--batteryLevel 0-100` - Set battery percentage
- `--dataNetwork "wifi"` - Set network type

## Development Commands

### Native Project Management

If you encounter crashes or configuration issues during development:

```bash
# Clean and regenerate native projects (iOS/Android folders)
pnpx expo prebuild --clean

# Run on iOS simulator
pnpm expo run:ios

# Run on Android emulator
pnpm expo run:android
```

Note: Use `pnpx` instead of `npx` for package execution in this project.

### Android Studio & mise

Node.js is managed via `mise`, which means Android Studio won't find `node` on the system PATH. Launching via Finder or `open -a` does **not** inherit the terminal environment.

**Build from the terminal instead:**

```bash
pnpx expo run:android
```

If you need Android Studio for debugging/profiling, launch it directly so it inherits mise's PATH:

```bash
"/Applications/Android Studio.app/Contents/MacOS/studio" &
```

**AGP compatibility:** Expo SDK 54 uses AGP 8.11.0, which requires Android Studio **Narwhal (2025.1.1)** or newer.

## Website

[Body Fat Calculator Website](https://bodyfatcalculator.pro)

## PostHog Analytics Events

The following events are tracked using PostHog for analytics purposes:

### App Lifecycle & Navigation

- **`app_launched`**: (Automatic) When the app is first launched.
- **`screen_viewed`**: (Automatic via PostHogProvider with React Navigation) When a user navigates to a new screen.
  - Properties: `screen_name` (e.g., "Calculator", "FeatureComparison")
- **`app_backgrounded`**: (Automatic) When the app goes to the background.
- **`app_foregrounded`**: (Automatic) When the app returns from the background.

### Calculator Screen (`CalculatorScreen.tsx`)

- **`calculator_form_submitted`**
  - Triggered: When the user successfully submits the calculator form.
  - Properties:
    - `formula_selected`: (string) The body fat calculation formula chosen by the user (e.g., "YMCA", "USNavy").
    - `gender_selected`: (string) The gender selected by the user (e.g., "male", "female").
    - `measurement_system`: (string) The unit system selected (e.g., "metric", "imperial").
- **`unit_system_changed`**
  - Triggered: When the user toggles between metric and imperial unit systems.
  - Properties:
    - `unit_system`: (string) The new unit system selected (e.g., "metric", "imperial").
- **`reset_form_tapped`**
  - Triggered: When the user taps the "Reset" button on the calculator form.

### Feature Comparison Screen (`FeatureComparisonScreen.tsx`)

- **`upgrade_to_pro_initiated`**
  - Triggered: When the user initiates a purchase for any package (PRO, Premium, Bundle, Lifetime).
  - Properties:
    - `package_type`: (string) The type of package the user is attempting to purchase (e.g., "pro", "premium", "bundle", "lifetime").
- **`purchase_successful`**
  - Triggered: When a purchase is successfully completed.
  - Properties:
    - `package_type`: (string) The type of package successfully purchased.
- **`purchase_failed`**
  - Triggered: When a purchase attempt fails.
  - Properties:
    - `package_type`: (string) The type of package that failed to purchase.
    - `error_message`: (string) The error message associated with the failure.
- **`restore_purchases_tapped`**
  - Triggered: When the user taps the "Restore Purchases" button.

### Premium Feature Blocking Events

- **`premium_formula_blocked`**
  - Triggered: When a non-PRO user attempts to select a premium formula.
  - Properties:
    - `formula_attempted`: (string) The premium formula the user tried to select.
    - `current_formula`: (string) The currently selected formula.
- **`decimal_input_blocked`**
  - Triggered: When a non-PRO user attempts to enter decimal values in input fields.
  - Properties:
    - `field_name`: (string) The name of the field where decimal input was attempted.
    - `attempted_value`: (string) The decimal value the user tried to enter.
    - `measurement_system`: (string) The current measurement system.
- **`results_precision_tapped`**
  - Triggered: When a non-PRO user taps the "Get more accurate results with PRO" banner in results.
  - Properties:
    - `current_formula`: (string) The formula used for the current calculation.
    - `body_fat_percentage`: (number) The calculated body fat percentage.
    - `measurement_system`: (string) The current measurement system.

```

```
