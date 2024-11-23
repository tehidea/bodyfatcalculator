# Body Fat Calculator

This calculator implements various methods for estimating body fat percentage.

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

Where:

- Waist<sub>in</sub> = waist circumference in inches
- Weight<sub>lb</sub> = body weight in pounds

**For Women:**

$$\left(\frac{0.268 \times Weight_{lb} - 0.318 \times Wrist_{in} + 0.157 \times Waist_{in} + 0.245 \times Hips_{in} - 0.434 \times Forearm_{in} - 8.987}{Weight_{lb}}\right) \times 100$$

Where:

- Wrist<sub>in</sub> = wrist circumference in inches
- Waist<sub>in</sub> = waist circumference in inches
- Hips<sub>in</sub> = hip circumference in inches
- Forearm<sub>in</sub> = forearm circumference in inches
- Weight<sub>lb</sub> = body weight in pounds

### Body Fat Classification

#### Men

| Classification | Body Fat Percentage |
| -------------- | ------------------- |
| Essential Fat  | 2-5%                |
| Athletes       | 6-13%               |
| Fitness        | 14-17%              |
| Acceptable     | 18-25%              |
| Obese          | > 25%               |

#### Women

| Classification | Body Fat Percentage |
| -------------- | ------------------- |
| Essential Fat  | 10-13%              |
| Athletes       | 14-20%              |
| Fitness        | 21-24%              |
| Acceptable     | 25-31%              |
| Obese          | > 31%               |

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

1. Source: [OwlCalculator Body Fat Calculator](https://owlcalculator.com/health/body-fat-calculator)
2. YMCA formula validation studies
3. Modified YMCA formula improvements and validation

## Implementation Details

The calculator supports multiple measurement systems:

- Metric (kg, cm, mm)
- Imperial (lbs, inches)

All calculations are performed in imperial units, with automatic conversion from metric inputs.
