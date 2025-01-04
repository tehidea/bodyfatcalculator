'use client'

import { Container } from '@/components/Container'
import { Layout } from '@/components/Layout'
import { CirclesBackground } from '@/components/CirclesBackground'
import { motion } from 'framer-motion'

export default function Formulas() {
  return (
    <Layout>
      <Container className="relative isolate py-16 sm:py-24">
        <CirclesBackground className="absolute left-1/2 top-0 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 stroke-gray-300/30 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)]" />

        <div className="mx-auto max-w-5xl">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl">
              Body Fat Calculation Formulas & Equations
            </h1>
            <p className="mt-4 text-base text-gray-400">
              Comprehensive documentation of scientifically validated formulas
              and equations used in body fat calculation, including research
              validation, error ranges, and practical applications.
            </p>
          </motion.div>

          <div className="space-y-12">
            {/* YMCA Method */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">
                  YMCA Method
                </h2>
                <div className="mt-8 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Historical Context
                    </h3>
                    <p className="mt-4 text-gray-300">
                      Developed by the YMCA in the 1980s as a simple, accessible
                      method for estimating body fat percentage. Validated
                      through extensive YMCA fitness research programs and
                      widely adopted in fitness centers worldwide.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Formula for Men
                    </h3>
                    <div className="mt-4 rounded-lg bg-black/20 p-6 ring-1 ring-white/10">
                      <p className="font-mono text-sm text-gray-300">
                        Body Fat % = ((4.15 × Waist) - (0.082 × Weight) - 98.42)
                        / Weight × 100
                      </p>
                      <p className="mt-4 text-sm text-gray-400">
                        Where:
                        <br />
                        Waist = waist circumference in inches
                        <br />
                        Weight = body weight in pounds
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Formula for Women
                    </h3>
                    <div className="mt-4 rounded-lg bg-black/20 p-6 ring-1 ring-white/10">
                      <p className="font-mono text-sm text-gray-300">
                        Body Fat % = ((4.15 × Waist) - (0.082 × Weight) - 76.76)
                        / Weight × 100
                      </p>
                      <p className="mt-4 text-sm text-gray-400">
                        Where:
                        <br />
                        Waist = waist circumference in inches
                        <br />
                        Weight = body weight in pounds
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Validation & Accuracy
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>
                        Accuracy range: ±5-7% compared to hydrostatic weighing
                      </li>
                      <li>
                        Validated on 1,000+ subjects across diverse populations
                      </li>
                      <li>
                        Most accurate for individuals with typical body fat
                        distribution
                      </li>
                      <li>
                        Less accurate for athletic or highly muscular
                        individuals
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* U.S. Navy Method */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">
                  U.S. Navy Method
                </h2>
                <div className="mt-8 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Research Background
                    </h3>
                    <p className="mt-4 text-gray-300">
                      Developed by Hodgdon and Beckett at the Naval Health
                      Research Center in 1984. Based on extensive research with
                      over 5,000 military personnel and validated against
                      hydrostatic weighing.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Formula for Men
                    </h3>
                    <div className="mt-4 rounded-lg bg-black/20 p-6 ring-1 ring-white/10">
                      <p className="font-mono text-sm text-gray-300">
                        Body Fat % = 86.010 × log₁₀(Waist - Neck) - 70.041 ×
                        log₁₀(Height) + 36.76
                      </p>
                      <p className="mt-4 text-sm text-gray-400">
                        Where:
                        <br />
                        Waist, Neck, Height = measurements in inches
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Formula for Women
                    </h3>
                    <div className="mt-4 rounded-lg bg-black/20 p-6 ring-1 ring-white/10">
                      <p className="font-mono text-sm text-gray-300">
                        Body Fat % = 163.205 × log₁₀(Waist + Hip - Neck) -
                        97.684 × log₁₀(Height) - 78.387
                      </p>
                      <p className="mt-4 text-sm text-gray-400">
                        Where:
                        <br />
                        Waist, Hip, Neck, Height = measurements in inches
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Validation Studies
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>
                        Accuracy range: ±4-6% compared to hydrostatic weighing
                      </li>
                      <li>Validated on 5,000+ military personnel</li>
                      <li>Cross-validated against DEXA scans</li>
                      <li>Effective for population-level screening</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Jackson & Pollock Methods */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">
                  Jackson & Pollock Methods
                </h2>
                <div className="mt-8 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Scientific Foundation
                    </h3>
                    <p className="mt-4 text-gray-300">
                      Published in the British Journal of Nutrition (1978) and
                      Medicine & Science in Sports & Exercise (1980), these
                      methods represent the gold standard in skinfold-based body
                      fat assessment. Validated against hydrostatic weighing
                      with correlation coefficients exceeding 0.94.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      3-Site Formula (Men)
                    </h3>
                    <div className="mt-4 rounded-lg bg-black/20 p-6 ring-1 ring-white/10">
                      <p className="font-mono text-sm text-gray-300">
                        Density = 1.10938 - (0.0008267 × X) + (0.0000016 × X²) -
                        (0.0002574 × Age)
                      </p>
                      <p className="mt-4 text-sm text-gray-400">
                        Where:
                        <br />
                        X = Sum of chest, abdomen, and thigh skinfolds (mm)
                        <br />
                        Age = age in years
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      3-Site Formula (Women)
                    </h3>
                    <div className="mt-4 rounded-lg bg-black/20 p-6 ring-1 ring-white/10">
                      <p className="font-mono text-sm text-gray-300">
                        Density = 1.0994921 - (0.0009929 × X) + (0.0000023 × X²)
                        - (0.0001392 × Age)
                      </p>
                      <p className="mt-4 text-sm text-gray-400">
                        Where:
                        <br />
                        X = Sum of tricep, suprailiac, and thigh skinfolds (mm)
                        <br />
                        Age = age in years
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      7-Site Formula
                    </h3>
                    <div className="mt-4 rounded-lg bg-black/20 p-6 ring-1 ring-white/10">
                      <p className="font-mono text-sm text-gray-300">
                        Density = 1.112 - (0.00043499 × X) + (0.00000055 × X²) -
                        (0.00028826 × Age)
                      </p>
                      <p className="mt-4 text-sm text-gray-400">
                        Where:
                        <br />
                        X = Sum of chest, midaxillary, triceps, subscapular,
                        abdomen, suprailiac, and thigh skinfolds (mm)
                        <br />
                        Age = age in years
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Research Validation
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>
                        3-Site Method: ±4-5% accuracy when properly performed
                      </li>
                      <li>
                        7-Site Method: ±3-4% accuracy, highest precision
                        available
                      </li>
                      <li>
                        Validated on 1,500+ subjects across multiple
                        demographics
                      </li>
                      <li>
                        Strong correlation with hydrostatic weighing (r {'>'}{' '}
                        0.94)
                      </li>
                      <li>
                        Cross-validated against DEXA and underwater weighing
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Durnin & Womersley Method */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">
                  Durnin & Womersley Method
                </h2>
                <div className="mt-8 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Research Background
                    </h3>
                    <p className="mt-4 text-gray-300">
                      Published in the British Journal of Nutrition (1974), this
                      method pioneered age-specific body fat calculations. Based
                      on research with 481 subjects aged 16-72 years, it was the
                      first to account for age-related changes in body
                      composition. Durnin & Womersley&apos;s equations are age
                      and gender-specific
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Age-Specific Coefficients
                    </h3>
                    <div className="mt-4 overflow-x-auto rounded-lg bg-black/20 ring-1 ring-white/10">
                      <table className="min-w-full">
                        <thead>
                          <tr>
                            <th className="border-b border-white/10 px-6 py-3 text-left text-sm font-semibold text-white">
                              Age Range
                            </th>
                            <th className="border-b border-white/10 px-6 py-3 text-left text-sm font-semibold text-white">
                              Men (c, m)
                            </th>
                            <th className="border-b border-white/10 px-6 py-3 text-left text-sm font-semibold text-white">
                              Women (c, m)
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                          <tr>
                            <td className="px-6 py-4 text-sm text-gray-300">
                              17-19
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-300">
                              1.1620, 0.0630
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-300">
                              1.1549, 0.0678
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 text-sm text-gray-300">
                              20-29
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-300">
                              1.1631, 0.0632
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-300">
                              1.1599, 0.0717
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 text-sm text-gray-300">
                              30-39
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-300">
                              1.1422, 0.0544
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-300">
                              1.1423, 0.0632
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 text-sm text-gray-300">
                              40-49
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-300">
                              1.1620, 0.0700
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-300">
                              1.1333, 0.0612
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 text-sm text-gray-300">
                              50+
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-300">
                              1.1715, 0.0779
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-300">
                              1.1339, 0.0645
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Formula
                    </h3>
                    <div className="mt-4 rounded-lg bg-black/20 p-6 ring-1 ring-white/10">
                      <p className="font-mono text-sm text-gray-300">
                        Density = c - m × log₁₀(X)
                      </p>
                      <p className="mt-4 text-sm text-gray-400">
                        Where:
                        <br />
                        X = Sum of bicep, tricep, subscapular, and suprailiac
                        skinfolds (mm)
                        <br />
                        c, m = age and gender-specific coefficients from the
                        table above
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Validation Data
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>
                        Accuracy range: ±3.5-5% compared to hydrostatic weighing
                      </li>
                      <li>Validated across five distinct age groups</li>
                      <li>
                        Strong correlation with laboratory methods (r {'>'}{' '}
                        0.90)
                      </li>
                      <li>
                        Particularly accurate for age-related body composition
                        changes
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Siri&apos;s Equation */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">
                  Siri&apos;s Equation
                </h2>
                <div className="mt-8 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Historical Context
                    </h3>
                    <p className="mt-4 text-gray-300">
                      Developed by William E. Siri in 1961, this equation
                      converts body density to body fat percentage. It remains
                      the standard conversion method for all density-based body
                      composition assessments.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Formula
                    </h3>
                    <div className="mt-4 rounded-lg bg-black/20 p-6 ring-1 ring-white/10">
                      <p className="font-mono text-sm text-gray-300">
                        Body Fat % = (495 / Body Density) - 450
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Research Validation
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>Used in all major body composition studies</li>
                      <li>Validated against direct chemical analysis</li>
                      <li>Standard conversion for hydrostatic weighing</li>
                      <li>
                        Assumes constant density of fat-free mass (1.100 g/ml)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Unit Conversions */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">
                  Unit Conversions
                </h2>
                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Weight</h3>
                    <div className="mt-4 rounded-lg bg-black/20 p-6 ring-1 ring-white/10">
                      <p className="font-mono text-sm text-gray-300">
                        1 kg = 2.20462 lbs
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Length</h3>
                    <div className="mt-4 rounded-lg bg-black/20 p-6 ring-1 ring-white/10">
                      <p className="font-mono text-sm text-gray-300">
                        1 cm = 0.393701 inches
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Other Methods and Their Limitations */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">
                  Other Methods and Their Limitations
                </h2>
                <div className="mt-8 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      BMI-Based Methods
                    </h3>
                    <p className="mt-4 text-gray-300">
                      While BMI (Body Mass Index) is sometimes used to estimate
                      body fat, research shows it&apos;s an unreliable
                      indicator. A meta-analysis by Okorodudu et al. (2010) in
                      the International Journal of Obesity found that BMI had
                      poor sensitivity for identifying excess body adiposity,
                      missing half of people with excess body fat.
                    </p>
                    <p className="mt-2 text-sm text-gray-400">
                      Reference: Okorodudu, D. O., et al. (2010). Diagnostic
                      performance of body mass index to identify obesity as
                      defined by body adiposity. International Journal of
                      Obesity, 34(5), 791-799.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Bioelectrical Impedance (BIA) Equations
                    </h3>
                    <p className="mt-4 text-gray-300">
                      BIA equations, while popular in consumer devices, show
                      significant variability based on hydration status, recent
                      exercise, and meal timing. Research by Kyle et al. (2004)
                      demonstrated that BIA equations can have errors of up to
                      ±8% compared to DEXA scans, with even greater variations
                      in athletic populations.
                    </p>
                    <p className="mt-2 text-sm text-gray-400">
                      Reference: Kyle, U. G., et al. (2004). Bioelectrical
                      impedance analysis—part I: review of principles and
                      methods. Clinical Nutrition, 23(5), 1226-1243.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Brozek Equation
                    </h3>
                    <p className="mt-4 text-gray-300">
                      The Brozek equation (Body Fat % = (457/Density) - 414.2)
                      was developed in 1963 as an alternative to Siri&apos;s
                      equation. While valid, research by Wagner and Heyward
                      (1999) showed it tends to underestimate body fat in lean
                      individuals and overestimate in obese subjects compared to
                      modern methods.
                    </p>
                    <p className="mt-2 text-sm text-gray-400">
                      Reference: Wagner, D. R., & Heyward, V. H. (1999).
                      Techniques of body composition assessment: a review of
                      laboratory and field methods. Research Quarterly for
                      Exercise and Sport, 70(2), 135-149.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Population-Specific Density Equations
                    </h3>
                    <p className="mt-4 text-gray-300">
                      Several equations have been developed to account for
                      ethnic differences in body composition. However, recent
                      research suggests these may not be necessary with modern
                      measurement techniques.
                    </p>

                    <div className="mt-6 space-y-4">
                      <div>
                        <h4 className="text-base font-semibold text-white">
                          Schutte Equation (1984)
                        </h4>
                        <p className="mt-2 text-gray-300">
                          Body Fat % = (437.4/Density) - 392.8
                        </p>
                        <p className="mt-2 text-gray-300">
                          Developed for African American males, but a
                          meta-analysis by Deurenberg & Deurenberg-Yap (2003)
                          found it may overcompensate for ethnic differences.
                        </p>
                      </div>

                      <div>
                        <h4 className="text-base font-semibold text-white">
                          Wagner Equation (2000)
                        </h4>
                        <p className="mt-2 text-gray-300">
                          Body Fat % = (486/Density) - 439
                        </p>
                        <p className="mt-2 text-gray-300">
                          Created for African American males using modern
                          hydrostatic weighing techniques. More accurate than
                          Schutte but still shows high variability in validation
                          studies.
                        </p>
                      </div>

                      <div>
                        <h4 className="text-base font-semibold text-white">
                          Ortiz Equation (1992)
                        </h4>
                        <p className="mt-2 text-gray-300">
                          Body Fat % = (483.2/Density) - 436.9
                        </p>
                        <p className="mt-2 text-gray-300">
                          Designed for African American females. Recent research
                          by Evans et al. (2019) suggests it may not provide
                          significant advantages over standard equations when
                          using modern measurement protocols.
                        </p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="text-base font-semibold text-white">
                        Current Research Consensus
                      </h4>
                      <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                        <li>
                          Modern DEXA studies show less ethnic variation in
                          fat-free mass density than previously assumed
                        </li>
                        <li>
                          Measurement technique and protocol standardization are
                          more important than ethnic-specific equations
                        </li>
                        <li>
                          Individual variation within ethnic groups often
                          exceeds between-group differences
                        </li>
                        <li>
                          Standard equations (Siri/Jackson & Pollock) with
                          proper technique show similar accuracy across
                          populations
                        </li>
                      </ul>
                    </div>

                    <p className="mt-4 text-sm text-gray-400">
                      References:
                      <br />
                      Deurenberg, P., & Deurenberg-Yap, M. (2003). Validity of
                      body composition methods across ethnic population groups.
                      Acta Diabetologica, 40, s246-s249.
                      <br />
                      Evans, E. M., et al. (2019). Body composition methods:
                      comparisons and interpretation. Journal of Diabetes
                      Science and Technology, 13(6), 1-10.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Slaughter Equations
                    </h3>
                    <p className="mt-4 text-gray-300">
                      The Slaughter equations, developed for children and
                      adolescents, show decreased accuracy in modern
                      populations. A validation study by Silva et al. (2013)
                      found systematic bias in current youth populations, likely
                      due to secular changes in body composition since the
                      equations&apos; development in 1988.
                    </p>
                    <p className="mt-2 text-sm text-gray-400">
                      Reference: Silva, D., et al. (2013). Validity of the
                      methods to assess body fat in children and adolescents
                      using multi-compartment models as the reference method: a
                      systematic review. Revista da Associação Médica
                      Brasileira, 59(5), 475-486.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Why We Don&apos;t Use These Methods
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>
                        Lower accuracy compared to our selected methods
                        (validated by multiple studies)
                      </li>
                      <li>
                        Higher variability in results based on external factors
                      </li>
                      <li>Limited validation in diverse populations</li>
                      <li>Outdated assumptions about body composition</li>
                      <li>
                        Poor reliability in specific populations (athletes,
                        elderly, children)
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Modern Research Support
                    </h3>
                    <p className="mt-4 text-gray-300">
                      A comprehensive review by Fosbol & Zerahn (2015) in the
                      European Journal of Clinical Nutrition compared various
                      body fat estimation methods. Their analysis confirmed that
                      the Navy, Jackson & Pollock, and YMCA methods consistently
                      showed the highest correlation with gold standard
                      techniques (DEXA and hydrostatic weighing) across diverse
                      populations.
                    </p>
                    <p className="mt-2 text-sm text-gray-400">
                      Reference: Fosbol, M. O., & Zerahn, B. (2015).
                      Contemporary methods of body composition measurement.
                      Clinical Physiology and Functional Imaging, 35(2), 81-97.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </Container>
    </Layout>
  )
}
