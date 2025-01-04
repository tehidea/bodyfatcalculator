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

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      References
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>
                        YMCA. (1989). YMCA Fitness Testing and Assessment
                        Manual, 4th Edition. Human Kinetics.
                      </li>
                      <li>
                        Golding, L.A. (2000). The Y's Way to Physical Fitness.
                        Human Kinetics.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Modified YMCA Method */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">
                  Modified YMCA Method
                </h2>
                <div className="mt-8 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Research Background
                    </h3>
                    <p className="mt-4 text-gray-300">
                      An enhanced version of the YMCA method developed to
                      improve accuracy for women. Incorporates additional
                      measurements to account for different body composition
                      patterns between genders.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Formula for Men
                    </h3>
                    <div className="mt-4 rounded-lg bg-black/20 p-6 ring-1 ring-white/10">
                      <p className="font-mono text-sm text-gray-300">
                        Same as YMCA formula
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Formula for Women
                    </h3>
                    <div className="mt-4 rounded-lg bg-black/20 p-6 ring-1 ring-white/10">
                      <p className="font-mono text-sm text-gray-300">
                        Body Fat % = ((4.15 × W) + (0.082 × B) - (0.15 × H) -
                        76.76) / B × 100
                      </p>
                      <p className="mt-4 text-sm text-gray-400">
                        Where:
                        <br />
                        W = Waist circumference (inches)
                        <br />
                        B = Body weight (pounds)
                        <br />H = Hip circumference (inches)
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Validation & Accuracy
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>
                        Accuracy range: ±4-6% compared to hydrostatic weighing
                      </li>
                      <li>
                        Improved accuracy for women compared to original YMCA
                        method
                      </li>
                      <li>Validated on diverse female populations</li>
                      <li>
                        Accounts for gender-specific fat distribution patterns
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      References
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>
                        YMCA. (2000). YMCA Body Composition and Additional
                        Analyses Manual. Human Kinetics.
                      </li>
                      <li>
                        Heyward, V.H., & Wagner, D.R. (2004). Applied Body
                        Composition Assessment. Human Kinetics.
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
              transition={{ duration: 0.5, delay: 0.3 }}
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
                      Validation & Accuracy
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

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      References
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>
                        Hodgdon, J.A., & Beckett, M.B. (1984). Prediction of
                        percent body fat for U.S. Navy men and women from body
                        circumferences and height. Naval Health Research Center
                        Report No. 84-29.
                      </li>
                      <li>
                        Friedl, K.E., & Vogel, J.A. (1997). Validity of percent
                        body fat predicted from circumferences: classification
                        of men for weight control regulations. Military
                        Medicine, 162(3), 194-200.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Covert Bailey Method */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">
                  Covert Bailey Method
                </h2>
                <div className="mt-8 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Research Background
                    </h3>
                    <p className="mt-4 text-gray-300">
                      Developed by fitness researcher Covert Bailey to provide
                      accurate body fat estimates using multiple body
                      measurements. The method accounts for age and gender
                      differences in body composition.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Formula for Men
                    </h3>
                    <div className="mt-4 rounded-lg bg-black/20 p-6 ring-1 ring-white/10">
                      <p className="font-mono text-sm text-gray-300">
                        Body Fat % = (0.13 × W) + (0.19 × B) - (0.12 × H) +
                        (0.15 × A) - 5.8
                      </p>
                      <p className="mt-4 text-sm text-gray-400">
                        Where:
                        <br />
                        W = Waist circumference (inches)
                        <br />
                        B = Body weight (pounds)
                        <br />
                        H = Height (inches)
                        <br />A = Age in years
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Formula for Women
                    </h3>
                    <div className="mt-4 rounded-lg bg-black/20 p-6 ring-1 ring-white/10">
                      <p className="font-mono text-sm text-gray-300">
                        Body Fat % = (0.11 × W) + (0.23 × B) - (0.13 × H) +
                        (0.14 × A) - 8.9
                      </p>
                      <p className="mt-4 text-sm text-gray-400">
                        Where:
                        <br />
                        W = Waist circumference (inches)
                        <br />
                        B = Body weight (pounds)
                        <br />
                        H = Height (inches)
                        <br />A = Age in years
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Validation & Accuracy
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>
                        Accuracy range: ±4-5% compared to hydrostatic weighing
                      </li>
                      <li>
                        Validated across different age groups and body types
                      </li>
                      <li>
                        Accounts for age-related changes in body composition
                      </li>
                      <li>
                        Effective for both athletic and general populations
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      References
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>
                        Bailey, C. (1994). Smart Exercise: Burning Fat, Getting
                        Fit. Houghton Mifflin.
                      </li>
                      <li>
                        Bailey, C. (1991). The New Fit or Fat. Houghton Mifflin.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Jackson & Pollock 3-Site Method */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">
                  Jackson & Pollock 3-Site Method
                </h2>
                <div className="mt-8 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Research Background
                    </h3>
                    <p className="mt-4 text-gray-300">
                      A simplified version of the 7-site method, developed to
                      provide quick but accurate body fat measurements.
                      Published in 1978, it has been extensively validated in
                      both research and clinical settings.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Formula
                    </h3>
                    <div className="mt-4 rounded-lg bg-black/20 p-6 ring-1 ring-white/10">
                      <p className="font-mono text-sm text-gray-300">
                        Men: Body Density = 1.10938 - (0.0008267 × Sum) +
                        (0.0000016 × Sum²) - (0.0002574 × Age)
                        <br />
                        Women: Body Density = 1.0994921 - (0.0009929 × Sum) +
                        (0.0000023 × Sum²) - (0.0001392 × Age)
                      </p>
                      <p className="mt-4 text-sm text-gray-400">
                        Where:
                        <br />
                        Sum = Sum of three skinfold measurements (mm)
                        <br />
                        Age = age in years
                        <br />
                        Body Fat % = (495 / Body Density) - 450
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Validation & Accuracy
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>
                        Accuracy range: ±4-5% compared to hydrostatic weighing
                      </li>
                      <li>Validated on 1,500+ subjects</li>
                      <li>
                        Strong correlation with 7-site method (r {'>'} 0.90)
                      </li>
                      <li>Excellent for tracking changes over time</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      References
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>
                        Jackson, A.S., & Pollock, M.L. (1978). Generalized
                        equations for predicting body density of men. British
                        Journal of Nutrition, 40(3), 497-504.
                      </li>
                      <li>
                        Jackson, A.S., Pollock, M.L., & Ward, A. (1980).
                        Generalized equations for predicting body density of
                        women. Medicine and Science in Sports and Exercise,
                        12(3), 175-181.
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
              transition={{ duration: 0.5, delay: 0.6 }}
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
                      Published in 1974, this method pioneered age-specific
                      equations for body fat calculation. Based on research with
                      481 subjects aged 16-72 years and validated against
                      hydrostatic weighing.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Formula
                    </h3>
                    <div className="mt-4 rounded-lg bg-black/20 p-6 ring-1 ring-white/10">
                      <p className="font-mono text-sm text-gray-300">
                        Body Density = C - [M × log₁₀(Sum of 4 Skinfolds)]
                        <br />
                        Where C and M vary by age and gender
                      </p>
                      <p className="mt-4 text-sm text-gray-400">
                        Skinfold sites:
                        <br />
                        - Biceps
                        <br />
                        - Triceps
                        <br />
                        - Subscapular
                        <br />
                        - Suprailiac
                        <br />
                        Body Fat % = (495 / Body Density) - 450
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Validation & Accuracy
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>
                        Accuracy range: ±3.5-5% compared to hydrostatic weighing
                      </li>
                      <li>Age and gender-specific equations</li>
                      <li>Validated across five age groups</li>
                      <li>
                        Accounts for age-related changes in body composition
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      References
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>
                        Durnin, J.V.G.A., & Womersley, J. (1974). Body fat
                        assessed from total body density and its estimation from
                        skinfold thickness: measurements on 481 men and women
                        aged from 16 to 72 years. British Journal of Nutrition,
                        32(1), 77-97.
                      </li>
                      <li>
                        Durnin, J.V.G.A., & Rahaman, M.M. (1967). The assessment
                        of the amount of fat in the human body from measurements
                        of skinfold thickness. British Journal of Nutrition,
                        21(3), 681-689.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Jackson & Pollock 4-Site Method */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">
                  Jackson & Pollock 4-Site Method
                </h2>
                <div className="mt-8 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Research Background
                    </h3>
                    <p className="mt-4 text-gray-300">
                      An intermediate version between the 3-site and 7-site
                      methods, offering improved accuracy while maintaining
                      practical efficiency. Developed through the same research
                      program as other Jackson & Pollock methods.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Formula
                    </h3>
                    <div className="mt-4 rounded-lg bg-black/20 p-6 ring-1 ring-white/10">
                      <p className="font-mono text-sm text-gray-300">
                        Men: Body Density = 1.10938 - (0.0008267 × Sum) +
                        (0.0000016 × Sum²) - (0.0002574 × Age)
                        <br />
                        Women: Body Density = 1.0994921 - (0.0009929 × Sum) +
                        (0.0000023 × Sum²) - (0.0001392 × Age)
                      </p>
                      <p className="mt-4 text-sm text-gray-400">
                        Where:
                        <br />
                        Sum = Sum of four skinfold measurements (mm)
                        <br />
                        Age = age in years
                        <br />
                        Body Fat % = (495 / Body Density) - 450
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Validation & Accuracy
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>
                        Accuracy range: ±3.5-4.5% compared to hydrostatic
                        weighing
                      </li>
                      <li>Validated on 1,500+ subjects</li>
                      <li>Better accuracy than 3-site method</li>
                      <li>Excellent balance of accuracy and practicality</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      References
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>
                        Jackson, A.S., & Pollock, M.L. (1985). Practical
                        assessment of body composition. The Physician and
                        Sportsmedicine, 13(5), 76-90.
                      </li>
                      <li>
                        Jackson, A.S., Pollock, M.L., & Gettman, L.R. (1978).
                        Intertester reliability of selected skinfold and
                        circumference measurements and percent fat estimates.
                        Research Quarterly, 49(4), 546-551.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Jackson & Pollock 7-Site Method */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">
                  Jackson & Pollock 7-Site Method
                </h2>
                <div className="mt-8 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Research Background
                    </h3>
                    <p className="mt-4 text-gray-300">
                      The gold standard in skinfold-based body fat assessment,
                      published in 1978. Extensively validated against
                      hydrostatic weighing with correlation coefficients
                      exceeding 0.94.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Formula
                    </h3>
                    <div className="mt-4 rounded-lg bg-black/20 p-6 ring-1 ring-white/10">
                      <p className="font-mono text-sm text-gray-300">
                        Body Density = 1.112 - (0.00043499 × Sum) + (0.00000055
                        × Sum²) - (0.00028826 × Age)
                      </p>
                      <p className="mt-4 text-sm text-gray-400">
                        Where:
                        <br />
                        Sum = Sum of chest, midaxillary, triceps, subscapular,
                        abdomen, suprailiac, and thigh skinfolds (mm)
                        <br />
                        Age = age in years
                        <br />
                        Body Fat % = (495 / Body Density) - 450
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Validation & Accuracy
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>
                        Accuracy range: ±3-4% compared to hydrostatic weighing
                      </li>
                      <li>Highest correlation with hydrostatic weighing</li>
                      <li>Most comprehensive skinfold method available</li>
                      <li>Excellent for research and clinical applications</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      References
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>
                        Jackson, A.S., & Pollock, M.L. (1978). Generalized
                        equations for predicting body density of men. British
                        Journal of Nutrition, 40(3), 497-504.
                      </li>
                      <li>
                        Pollock, M.L., Schmidt, D.H., & Jackson, A.S. (1980).
                        Measurement of cardiorespiratory fitness and body
                        composition in the clinical setting. Comprehensive
                        Therapy, 6(9), 12-27.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Parrillo Method */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">
                  Parrillo Method
                </h2>
                <div className="mt-8 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Research Background
                    </h3>
                    <p className="mt-4 text-gray-300">
                      Developed by John Parrillo specifically for bodybuilding
                      applications. Uses nine skinfold sites to account for
                      various fat distribution patterns, particularly effective
                      for athletic populations.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Formula
                    </h3>
                    <div className="mt-4 rounded-lg bg-black/20 p-6 ring-1 ring-white/10">
                      <p className="font-mono text-sm text-gray-300">
                        Body Fat % = ((Sum of 9 Sites × 27) / Weight) × 100
                      </p>
                      <p className="mt-4 text-sm text-gray-400">
                        Where:
                        <br />
                        Sites = cheek, chin, pectoral, tricep, subscapular,
                        abdominal, suprailiac, quadriceps, knee (mm)
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
                        Accuracy range: ±3-4% compared to hydrostatic weighing
                      </li>
                      <li>Specifically validated for athletic populations</li>
                      <li>Most comprehensive site selection</li>
                      <li>Excellent for bodybuilding applications</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      References
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>
                        Parrillo, J. (1993). High-Performance Body-Building.
                        Perigee Books.
                      </li>
                      <li>
                        Parrillo, J., & Greenwood-Robinson, M. (1997).
                        BodyBuilding Nutrition. Parrillo Performance Press.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Body Density & Body Fat Conversion */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.95 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">
                  Body Density & Body Fat Conversion
                </h2>
                <div className="mt-8 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Research Background
                    </h3>
                    <p className="mt-4 text-gray-300">
                      Most skinfold methods calculate body density first, which
                      is then converted to body fat percentage. This two-step
                      process has been extensively validated through hydrostatic
                      weighing studies and forms the foundation of modern body
                      composition assessment.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Conversion Formulas
                    </h3>
                    <div className="mt-4 rounded-lg bg-black/20 p-6 ring-1 ring-white/10">
                      <p className="font-mono text-sm text-gray-300">
                        Siri (1956): Body Fat % = (495 / Body Density) - 450
                        <br />
                        <br />
                        Brozek (1963): Body Fat % = (457 / Body Density) - 414.2
                        <br />
                        <br />
                        Schutte (1984, for African American men): Body Fat % =
                        (437.4 / Body Density) - 392.8
                        <br />
                        <br />
                        Wagner & Heyward (2001, for African American men): Body
                        Fat % = (485 / Body Density) - 439
                      </p>
                      <p className="mt-4 text-sm text-gray-400">
                        Note: Siri and Brozek equations are most commonly used
                        and generally provide similar results (within ±1%) for
                        most populations.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Population-Specific Considerations
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>
                        Siri equation assumes body density of fat = 0.900 g/cm³
                      </li>
                      <li>
                        Brozek equation uses slightly different assumed
                        densities
                      </li>
                      <li>
                        Schutte and Wagner equations account for differences in
                        bone density and body composition in African American
                        populations
                      </li>
                      <li>
                        Age, ethnicity, and athletic status may affect accuracy
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      References
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>
                        Siri, W.E. (1956). The gross composition of the body.
                        Advances in Biological and Medical Physics, 4, 239-280.
                      </li>
                      <li>
                        Brozek, J., et al. (1963). Densitometric analysis of
                        body composition: Revision of some quantitative
                        assumptions. Annals of the New York Academy of Sciences,
                        110, 113-140.
                      </li>
                      <li>
                        Wagner, D.R., & Heyward, V.H. (2001). Validity of
                        two-component models for estimating body fat of black
                        men. Journal of Applied Physiology, 90(2), 649-656.
                      </li>
                      <li>
                        Schutte, J.E., et al. (1984). Density of lean body mass
                        is greater in blacks than in whites. Journal of Applied
                        Physiology, 56(6), 1647-1649.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Other Methods and Their Limitations */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
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
                      BMI (Body Mass Index)
                    </h3>
                    <p className="mt-4 text-gray-300">
                      While widely used, BMI is not a measure of body fat
                      percentage. It only considers height and weight, making it
                      inaccurate for athletes, elderly, and those with unusual
                      body compositions. Error range can exceed ±10% for body
                      fat estimation.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Bioelectrical Impedance (BIA)
                    </h3>
                    <p className="mt-4 text-gray-300">
                      Consumer-grade BIA devices can have error ranges of
                      ±8-12%. Results are highly influenced by hydration status,
                      recent exercise, meal timing, and environmental factors.
                      Professional multi-frequency devices can achieve better
                      accuracy but are expensive and require trained operators.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Near-Infrared
                    </h3>
                    <p className="mt-4 text-gray-300">
                      Uses infrared light reflection to estimate body fat. While
                      non-invasive, it has limited research validation and
                      accuracy can vary significantly (±7-11%) depending on skin
                      color, hydration, and measurement site.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Air Displacement (Bod Pod)
                    </h3>
                    <p className="mt-4 text-gray-300">
                      More accurate than the above methods (±2-3%) but requires
                      expensive equipment and controlled conditions. Results can
                      be affected by facial hair, moisture, and temperature.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      DEXA (Dual-Energy X-ray Absorptiometry)
                    </h3>
                    <p className="mt-4 text-gray-300">
                      Considered the current gold standard (±1-2% accuracy) but
                      requires expensive equipment, trained operators, and
                      exposes subjects to small amounts of radiation. Not
                      practical for regular tracking.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      References
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>
                        Lee, S.Y., & Gallagher, D. (2008). Assessment methods in
                        human body composition. Current Opinion in Clinical
                        Nutrition and Metabolic Care, 11(5), 566-572.
                      </li>
                      <li>
                        Wagner, D.R., & Heyward, V.H. (1999). Techniques of body
                        composition assessment: a review of laboratory and field
                        methods. Research Quarterly for Exercise and Sport,
                        70(2), 135-149.
                      </li>
                      <li>
                        Ackland, T.R., et al. (2012). Current status of body
                        composition assessment in sport. Sports Medicine, 42(3),
                        227-249.
                      </li>
                    </ul>
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
