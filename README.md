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
  - YMCA: A simple method using weight and waist measurements (±4-6% margin of error)
  - Modified YMCA: Enhanced version with additional measurements for women (±3.5-5.5% margin of error)
  - U.S. Navy: Military standard using key body measurements (±3-4% margin of error)
- [x] Unit Conversion (metric/imperial)
- [x] Basic Results (body fat percentage and classification)
- [x] Standard Precision (1 decimal place)

### PRO Tier (£10)

- [ ] Advanced Methods
  - Covert Bailey: Comprehensive method with multiple measurements (±3.5-4.5% margin of error)
  - Durnin & Womersley: Scientific skinfold method (±3-4% when done properly)
  - Jackson & Pollock (3-site): Quick but accurate skinfold method (±3.5-4% when done properly)
  - Jackson & Pollock (4-site): Balanced skinfold approach (±3-3.5% when done properly)
  - Jackson & Pollock (7-site): Most thorough skinfold method (±2.5-3% when done properly)
  - Parrillo: Bodybuilding-focused nine-site method (±2.5-3% when done properly)
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

1. Heyward, V.H., & Wagner, D.R. (2004). Applied Body Composition Assessment (2nd ed.). Human Kinetics. pp. 87-98.
2. Hodgdon, J.A., & Beckett, M.B. (1984). Prediction of percent body fat for U.S. Navy men and women from body circumferences and height. Naval Health Research Center Report No. 84-29.
3. Bailey, Covert. (1991). The Ultimate Fit or Fat. Houghton Mifflin Harcourt. pp. 179-187.
4. Durnin, J.V.G.A., & Womersley, J. (1974). Body fat assessed from total body density and its estimation from skinfold thickness: measurements on 481 men and women aged from 16 to 72 years. British Journal of Nutrition, 32(1), 77-97.
5. Jackson, A.S., & Pollock, M.L. (1985). Practical assessment of body composition. The Physician and Sportsmedicine, 13(5), 76-90.
6. Parrillo, J., & Greenwood-Robinson, M. (1993). High-Performance Body-Building. Perigee Books. pp. 304-309.
7. Wang, Z.M., Pierson, R.N., & Heymsfield, S.B. (1992). The five-level model: a new approach to organizing body-composition research. The American Journal of Clinical Nutrition, 56(1), 19-28.
8. Lohman, T.G. (1992). Advances in Body Composition Assessment. Human Kinetics Publishers. pp. 65-77.

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
xcrun simctl list devices | grep -o '[A-Z0-9]\{8\}-[A-Z0-9]\{4\}-[A-Z0-9]\{4\}-[A-Z0-9]\{4\}-[A-Z0-9]\{12\}' | while read -r device; do xcrun simctl status_bar "$device" override --time "13:37" --cellularBars 4; done
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

## Website

[Body Fat Calculator Website](https://bodyfatcalculator.pro)
