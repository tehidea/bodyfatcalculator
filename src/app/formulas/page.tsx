'use client'

import { Container } from '@/components/Container'
import { Layout } from '@/components/Layout'
import { CirclesBackground } from '@/components/CirclesBackground'
import { motion } from 'framer-motion'
import { Formula } from '@/components/Formula'
import Link from 'next/link'

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
                      <Formula
                        formula={`\\text{Body Fat}\\% = \\frac{4.15 \\times \\text{Waist}_{in} - 0.082 \\times \\text{Weight}_{lb} - 98.42}{\\text{Weight}_{lb}} \\times 100`}
                      />
                      <p className="mt-4 text-sm text-gray-400">
                        Where:
                        <br />
                        <Formula inline formula="\\text{Waist}_{in}" /> = waist
                        circumference in inches
                        <br />
                        <Formula inline formula="\\text{Weight}_{lb}" /> = body
                        weight in pounds
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Formula for Women
                    </h3>
                    <div className="mt-4 rounded-lg bg-black/20 p-6 ring-1 ring-white/10">
                      <Formula
                        formula={`\\text{Body Fat}\\% = \\frac{4.15 \\times \\text{Waist}_{in} - 0.082 \\times \\text{Weight}_{lb} - 76.76}{\\text{Weight}_{lb}} \\times 100`}
                      />
                      <p className="mt-4 text-sm text-gray-400">
                        Where:
                        <br />
                        <Formula inline formula="\\text{Waist}_{in}" /> = waist
                        circumference in inches
                        <br />
                        <Formula inline formula="\\text{Weight}_{lb}" /> = body
                        weight in pounds
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
                        Golding, L.A. (2000). The Y&apos;s Way to Physical
                        Fitness. Human Kinetics.
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
                      <Formula
                        formula={`\\text{Body Fat}\\% = \\frac{4.15 \\times \\text{Waist}_{in} - 0.082 \\times \\text{Weight}_{lb} - 94.42}{\\text{Weight}_{lb}} \\times 100`}
                      />
                      <p className="mt-4 text-sm text-gray-400">
                        Where:
                        <br />
                        <Formula inline formula="\\text{Waist}_{in}" /> = waist
                        circumference in inches
                        <br />
                        <Formula inline formula="\\text{Weight}_{lb}" /> = body
                        weight in pounds
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Formula for Women
                    </h3>
                    <div className="mt-4 rounded-lg bg-black/20 p-6 ring-1 ring-white/10">
                      <Formula
                        formula={`\\text{Body Fat}\\% = \\frac{0.268 \\times \\text{Weight}_{lb} - 0.318 \\times \\text{Wrist}_{in} + 0.157 \\times \\text{Waist}_{in} + 0.245 \\times \\text{Hips}_{in} - 0.434 \\times \\text{Forearm}_{in} - 8.987}{\\text{Weight}_{lb}} \\times 100`}
                      />
                      <p className="mt-4 text-sm text-gray-400">
                        Where:
                        <br />
                        <Formula inline formula="\\text{Weight}_{lb}" /> = body
                        weight in pounds
                        <br />
                        <Formula inline formula="\\text{Wrist}_{in}" /> = wrist
                        circumference in inches
                        <br />
                        <Formula inline formula="\\text{Waist}_{in}" /> = waist
                        circumference in inches
                        <br />
                        <Formula inline formula="\\text{Hips}_{in}" /> = hip
                        circumference in inches
                        <br />
                        <Formula inline formula="\\text{Forearm}_{in}" /> =
                        forearm circumference in inches
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
                      <Formula
                        formula={`\\text{Body Fat}\\% = 86.010 \\times \\log_{10}(\\text{Waist}_{in} - \\text{Neck}_{in}) - 70.041 \\times \\log_{10}(\\text{Height}_{in}) + 36.76`}
                      />
                      <p className="mt-4 text-sm text-gray-400">
                        Where:
                        <br />
                        <Formula inline formula="\\text{Waist}_{in}" /> = waist
                        circumference in inches
                        <br />
                        <Formula inline formula="\\text{Neck}_{in}" /> = neck
                        circumference in inches
                        <br />
                        <Formula inline formula="\\text{Height}_{in}" /> =
                        height in inches
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Formula for Women
                    </h3>
                    <div className="mt-4 rounded-lg bg-black/20 p-6 ring-1 ring-white/10">
                      <Formula
                        formula={`\\text{Body Fat}\\% = 163.205 \\times \\log_{10}(\\text{Waist}_{in} + \\text{Hip}_{in} - \\text{Neck}_{in}) - 97.684 \\times \\log_{10}(\\text{Height}_{in}) - 78.387`}
                      />
                      <p className="mt-4 text-sm text-gray-400">
                        Where:
                        <br />
                        <Formula inline formula="\\text{Waist}_{in}" /> = waist
                        circumference in inches
                        <br />
                        <Formula inline formula="\\text{Hip}_{in}" /> = hip
                        circumference in inches
                        <br />
                        <Formula inline formula="\\text{Neck}_{in}" /> = neck
                        circumference in inches
                        <br />
                        <Formula inline formula="\\text{Height}_{in}" /> =
                        height in inches
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
                      <p className="mb-4 text-sm text-gray-400">
                        For age {'≤'} 30:
                      </p>
                      <Formula
                        formula={`\\text{Body Fat}\\% = \\text{Waist}_{in} + 0.5 \\times \\text{Hips}_{in} - 3 \\times \\text{Forearm}_{in} - \\text{Wrist}_{in}`}
                      />
                      <p className="mb-4 mt-4 text-sm text-gray-400">
                        For age {'>'} 30:
                      </p>
                      <Formula
                        formula={`\\text{Body Fat}\\% = \\text{Waist}_{in} + 0.5 \\times \\text{Hips}_{in} - 2.7 \\times \\text{Forearm}_{in} - \\text{Wrist}_{in}`}
                      />
                      <p className="mt-4 text-sm text-gray-400">
                        Where:
                        <br />
                        <Formula inline formula="\\text{Waist}_{in}" /> = waist
                        circumference at navel
                        <br />
                        <Formula inline formula="\\text{Hips}_{in}" /> = hip
                        circumference at widest point
                        <br />
                        <Formula inline formula="\\text{Forearm}_{in}" /> =
                        forearm circumference at widest point
                        <br />
                        <Formula inline formula="\\text{Wrist}_{in}" /> = wrist
                        circumference at smallest point
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Formula for Women
                    </h3>
                    <div className="mt-4 rounded-lg bg-black/20 p-6 ring-1 ring-white/10">
                      <p className="mb-4 text-sm text-gray-400">
                        For age {'≤'} 30:
                      </p>
                      <Formula
                        formula={`\\text{Body Fat}\\% = \\text{Hips}_{in} + 0.8 \\times \\text{Thigh}_{in} - 2 \\times \\text{Calf}_{in} - \\text{Wrist}_{in}`}
                      />
                      <p className="mb-4 mt-4 text-sm text-gray-400">
                        For age {'>'} 30:
                      </p>
                      <Formula
                        formula={`\\text{Body Fat}\\% = \\text{Hips}_{in} + \\text{Thigh}_{in} - 2 \\times \\text{Calf}_{in} - \\text{Wrist}_{in}`}
                      />
                      <p className="mt-4 text-sm text-gray-400">
                        Where:
                        <br />
                        <Formula inline formula="\\text{Hips}_{in}" /> = hip
                        circumference at widest point
                        <br />
                        <Formula inline formula="\\text{Thigh}_{in}" /> = thigh
                        circumference at widest point
                        <br />
                        <Formula inline formula="\\text{Calf}_{in}" /> = calf
                        circumference at widest point
                        <br />
                        <Formula inline formula="\\text{Wrist}_{in}" /> = wrist
                        circumference at smallest point
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
                      <p className="mb-4 text-sm text-gray-400">For men:</p>
                      <Formula
                        formula={`\\text{Body Density} = 1.10938 - (0.0008267 \\times \\sum\\text{SF}) + (0.0000016 \\times \\sum\\text{SF}^2) - (0.0002574 \\times \\text{Age})`}
                      />
                      <p className="mb-4 mt-4 text-sm text-gray-400">
                        For women:
                      </p>
                      <Formula
                        formula={`\\text{Body Density} = 1.0994921 - (0.0009929 \\times \\sum\\text{SF}) + (0.0000023 \\times \\sum\\text{SF}^2) - (0.0001392 \\times \\text{Age})`}
                      />
                      <p className="mt-4 text-sm text-gray-400">
                        Where:
                        <br />
                        <Formula inline formula="\\sum\\text{SF}" /> = Sum of
                        three skinfold measurements (mm)
                        <br />
                        For men: chest, abdomen, thigh
                        <br />
                        For women: tricep, suprailiac, thigh
                        <br />
                        <Formula inline formula="\\text{Age}" /> = age in years
                      </p>
                      <div className="mt-4 border-t border-white/10 pt-4">
                        <p className="text-sm text-gray-400">
                          Convert to body fat percentage using Siri&apos;s
                          equation:
                        </p>
                        <Formula
                          formula={`\\text{Body Fat}\\% = \\frac{495}{\\text{Body Density}} - 450`}
                        />
                      </div>
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
                      <Formula
                        formula={`\\text{Body Density} = c - m \\times \\log_{10}(\\sum\\text{SF})`}
                      />
                      <p className="mt-4 text-sm text-gray-400">
                        Where:
                        <br />
                        <Formula inline formula="\\sum\\text{SF}" /> = Sum of
                        bicep, tricep, subscapular, and suprailiac skinfolds
                        (mm)
                        <br />
                        <Formula inline formula="c" /> and{' '}
                        <Formula inline formula="m" /> are age and
                        gender-specific coefficients:
                      </p>
                      <div className="mt-4 overflow-x-auto">
                        <table className="min-w-full text-sm">
                          <thead>
                            <tr className="border-b border-white/10">
                              <th className="py-2 text-left text-gray-300">
                                Age
                              </th>
                              <th className="py-2 text-left text-gray-300">
                                Men (c, m)
                              </th>
                              <th className="py-2 text-left text-gray-300">
                                Women (c, m)
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/10">
                            <tr>
                              <td className="py-2 text-gray-400">17-19</td>
                              <td className="py-2 text-gray-400">
                                1.1620, 0.0630
                              </td>
                              <td className="py-2 text-gray-400">
                                1.1549, 0.0678
                              </td>
                            </tr>
                            <tr>
                              <td className="py-2 text-gray-400">20-29</td>
                              <td className="py-2 text-gray-400">
                                1.1631, 0.0632
                              </td>
                              <td className="py-2 text-gray-400">
                                1.1599, 0.0717
                              </td>
                            </tr>
                            <tr>
                              <td className="py-2 text-gray-400">30-39</td>
                              <td className="py-2 text-gray-400">
                                1.1422, 0.0544
                              </td>
                              <td className="py-2 text-gray-400">
                                1.1423, 0.0632
                              </td>
                            </tr>
                            <tr>
                              <td className="py-2 text-gray-400">40-49</td>
                              <td className="py-2 text-gray-400">
                                1.1620, 0.0700
                              </td>
                              <td className="py-2 text-gray-400">
                                1.1333, 0.0612
                              </td>
                            </tr>
                            <tr>
                              <td className="py-2 text-gray-400">50+</td>
                              <td className="py-2 text-gray-400">
                                1.1715, 0.0779
                              </td>
                              <td className="py-2 text-gray-400">
                                1.1339, 0.0645
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="mt-4 border-t border-white/10 pt-4">
                        <p className="text-sm text-gray-400">
                          Convert to body fat percentage using Siri&apos;s
                          equation:
                        </p>
                        <Formula
                          formula={`\\text{Body Fat}\\% = \\frac{495}{\\text{Body Density}} - 450`}
                        />
                      </div>
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
                      <p className="mb-4 text-sm text-gray-400">For men:</p>
                      <Formula
                        formula={`\\text{Body Density} = 1.10938 - (0.0008267 \\times \\sum\\text{SF}) + (0.0000016 \\times \\sum\\text{SF}^2) - (0.0002574 \\times \\text{Age})`}
                      />
                      <p className="mb-4 mt-4 text-sm text-gray-400">
                        For women:
                      </p>
                      <Formula
                        formula={`\\text{Body Density} = 1.0994921 - (0.0009929 \\times \\sum\\text{SF}) + (0.0000023 \\times \\sum\\text{SF}^2) - (0.0001392 \\times \\text{Age})`}
                      />
                      <p className="mt-4 text-sm text-gray-400">
                        Where:
                        <br />
                        <Formula inline formula="\\sum\\text{SF}" /> = Sum of
                        four skinfold measurements (mm)
                        <br />
                        For men: triceps, subscapular, suprailiac, abdomen
                        <br />
                        For women: triceps, subscapular, suprailiac, thigh
                        <br />
                        <Formula inline formula="\\text{Age}" /> = age in years
                      </p>
                      <div className="mt-4 border-t border-white/10 pt-4">
                        <p className="text-sm text-gray-400">
                          Convert to body fat percentage using Siri&apos;s
                          equation:
                        </p>
                        <Formula
                          formula={`\\text{Body Fat}\\% = \\frac{495}{\\text{Body Density}} - 450`}
                        />
                      </div>
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
                      <Formula
                        formula={`\\text{Body Density} = 1.112 - (0.00043499 \\times \\sum\\text{SF}) + (0.00000055 \\times \\sum\\text{SF}^2) - (0.00028826 \\times \\text{Age})`}
                      />
                      <p className="mt-4 text-sm text-gray-400">
                        Where:
                        <br />
                        <Formula inline formula="\\sum\\text{SF}" /> = Sum of
                        seven skinfold measurements (mm):
                        <br />
                        chest, midaxillary, triceps, subscapular, abdomen,
                        suprailiac, and thigh
                        <br />
                        <Formula inline formula="\\text{Age}" /> = age in years
                      </p>
                      <div className="mt-4 border-t border-white/10 pt-4">
                        <p className="text-sm text-gray-400">
                          Convert to body fat percentage using Siri&apos;s
                          equation:
                        </p>
                        <Formula
                          formula={`\\text{Body Fat}\\% = \\frac{495}{\\text{Body Density}} - 450`}
                        />
                      </div>
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
                      <Formula
                        formula={`\\text{Body Fat}\\% = \\frac{\\sum\\text{SF} \\times 27}{\\text{Weight}_{lb}} \\times 100`}
                      />
                      <p className="mt-4 text-sm text-gray-400">
                        Where:
                        <br />
                        <Formula inline formula="\\sum\\text{SF}" /> = Sum of
                        nine skinfold measurements (mm):
                        <br />
                        cheek, chin, pectoral, tricep, subscapular, abdominal,
                        suprailiac, quadriceps, knee
                        <br />
                        <Formula inline formula="\\text{Weight}_{lb}" /> = body
                        weight in pounds
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
                      <p className="mb-4 text-sm text-gray-400">Siri (1956):</p>
                      <Formula
                        formula={`\\text{Body Fat}\\% = \\frac{495}{\\text{Body Density}} - 450`}
                      />

                      <p className="mb-4 mt-6 text-sm text-gray-400">
                        Brozek (1963):
                      </p>
                      <Formula
                        formula={`\\text{Body Fat}\\% = \\frac{457}{\\text{Body Density}} - 414.2`}
                      />

                      <p className="mb-4 mt-6 text-sm text-gray-400">
                        Schutte (1984, for African American men):
                      </p>
                      <Formula
                        formula={`\\text{Body Fat}\\% = \\frac{437.4}{\\text{Body Density}} - 392.8`}
                      />

                      <p className="mb-4 mt-6 text-sm text-gray-400">
                        Wagner & Heyward (2001, for African American men):
                      </p>
                      <Formula
                        formula={`\\text{Body Fat}\\% = \\frac{485}{\\text{Body Density}} - 439`}
                      />

                      <p className="mt-6 text-sm text-gray-400">
                        Note: Siri and Brozek equations are most commonly used
                        and generally provide similar results (within ±1%) for
                        most populations.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Formula-Specific Limitations
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div>
                        <h4 className="font-medium text-white">
                          Brozek (1963)
                        </h4>
                        <ul className="mt-2 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                          <li>
                            Based on analysis of only 4 cadavers, limiting its
                            generalizability
                          </li>
                          <li>
                            Assumes constant densities of fat (0.9007 g/cm³) and
                            fat-free mass (1.1000 g/cm³)
                          </li>
                          <li>
                            May underestimate body fat in very lean individuals
                            (&lt;8%)
                          </li>
                          <li>
                            Less accurate for populations with different bone
                            densities or muscle mass
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-white">
                          Schutte (1984)
                        </h4>
                        <ul className="mt-2 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                          <li>
                            Study based on small sample size (n=19) of African
                            American men
                          </li>
                          <li>
                            Limited to college-aged subjects (17-25 years)
                          </li>
                          <li>
                            No validation for women or other ethnic groups
                          </li>
                          <li>
                            May not account for variations within African
                            American populations
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-white">
                          Wagner & Heyward (2001)
                        </h4>
                        <ul className="mt-2 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                          <li>
                            Validated only on African American men aged 19-45
                            years
                          </li>
                          <li>Sample excluded highly trained athletes</li>
                          <li>
                            May not be accurate for individuals with extreme
                            body compositions
                          </li>
                          <li>
                            Limited cross-validation with modern imaging
                            techniques
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Why We Use Siri&apos;s Equation
                    </h3>
                    <p className="mt-4 text-gray-300">
                      We chose Siri&apos;s equation as our primary conversion
                      formula for several reasons:
                    </p>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>
                        Most widely used and validated in research settings
                      </li>
                      <li>
                        Original equation used in the development and validation
                        of Jackson & Pollock methods
                      </li>
                      <li>
                        Simpler coefficients (495/450) make it easier to
                        remember and calculate manually
                      </li>
                      <li>
                        More extensively cross-validated against modern methods
                        like DEXA
                      </li>
                      <li>
                        Provides nearly identical results to Brozek for body fat
                        ranges of 6-30%, which covers most users
                      </li>
                    </ul>
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

          {/* Breadcrumb Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 flex justify-center"
          >
            <ol className="flex items-center space-x-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li className="text-white">Formulas</li>
            </ol>
          </motion.nav>
        </div>
      </Container>
    </Layout>
  )
}
