# Body Fat Calculator

This calculator implements various methods for estimating body fat percentage.

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

- [x] Advanced Methods
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
- [x] Unlimited Local Storage
- [x] Detailed Analysis
- [x] Basic Export
- [x] Offline Access

### Premium Tier (£3/month or £18/year)

- [ ] Cloud Sync
- [ ] Progress Tracking
- [ ] Progress Photos
- [ ] Advanced Export
- [ ] Custom Presets
- [ ] Priority Support
- [ ] Early Access

## Development Roadmap

### Q4 2024

- [ ] Professional Features
  - [ ] Client management
  - [ ] Batch measurements
  - [ ] Professional reports
- [ ] Advanced Export & Sharing
  - [ ] Customizable PDF reports
  - [ ] Data visualization export
  - [ ] Secure sharing options
- [ ] Smart Device Integration
  - [ ] Smart scale support
  - [ ] Bluetooth caliper support

### Q1 2025

- [ ] AI & Machine Learning
  - [ ] Body composition predictions
  - [ ] Personalized recommendations
  - [ ] Trend forecasting
- [ ] Community Features
  - [ ] Anonymous comparisons
  - [ ] Progress challenges
  - [ ] Achievement system
- [ ] Nutrition Integration
  - [ ] Macro tracking
  - [ ] Meal planning
  - [ ] Body composition impact

### Q2 2025

- [ ] Advanced Health Integration
  - [ ] Workout tracking
  - [ ] Sleep analysis
  - [ ] Recovery metrics
- [ ] Team Features
  - [ ] Trainer-client relationships
  - [ ] Group challenges
  - [ ] Team analytics
- [ ] Advanced AI Features
  - [ ] Custom recommendations
  - [ ] Progress predictions
  - [ ] Automated insights

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

### Jackson & Pollock 7-Site Formula

Uses seven skinfold measurements. First calculates body density, then converts to body fat percentage.

**Body Density Formula for Men:**

$$1.112 - 0.00043499(X) + 0.00000055(X^2) - 0.00028826(Age)$$

**Body Density Formula for Women:**

$$1.097 - 0.00046971(X) + 0.00000056(X^2) - 0.00012828(Age)$$

Where X = Sum of chest, abdomen, thigh, tricep, subscapular, suprailiac, and midaxillary skinfolds (mm)

### Jackson & Pollock 4-Site Formula

Uses four skinfold measurements for a simplified version of the 7-site method.

**Body Density Formula for Men:**

$$1.10938 - 0.0008267(X) + 0.0000016(X^2) - 0.0002574(Age)$$

**Body Density Formula for Women:**

$$1.096095 - 0.0006952(X) + 0.0000011(X^2) - 0.0000714(Age)$$

Where X = Sum of abdomen, thigh, tricep, and suprailiac skinfolds (mm)

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

1. Jackson, A.S., & Pollock, M.L. (1978). Generalized equations for predicting body density of men. British Journal of Nutrition, 40(3), 497-504.
2. Jackson, A.S., Pollock, M.L., & Ward, A. (1980). Generalized equations for predicting body density of women. Medicine and Science in Sports and Exercise, 12(3), 175-181.
3. Durnin, J.V.G.A., & Womersley, J. (1974). Body fat assessed from total body density and its estimation from skinfold thickness. British Journal of Nutrition, 32(1), 77-97.
4. Hodgdon, J.A., & Beckett, M.B. (1984). Prediction of percent body fat for U.S. Navy men and women from body circumferences and height. Naval Health Research Center Report No. 84-29.

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
