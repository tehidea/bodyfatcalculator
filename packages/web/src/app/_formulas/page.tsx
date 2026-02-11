'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CirclesBackground } from '@/components/CirclesBackground'
import { Container } from '@/components/Container'
import { Formula } from '@/components/Formula'
import { Layout } from '@/components/Layout'

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
              Comprehensive documentation of published research-backed formulas and equations used in
              body fat calculation, including research validation, error ranges, and practical
              applications.
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
                <h2 className="text-2xl font-semibold text-white">YMCA Method</h2>
                <div className="mt-8 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Historical Context</h3>
                    <p className="mt-4 text-gray-300">
                      Developed by the YMCA as a simple, accessible method for estimating body fat
                      percentage and used in many fitness settings.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">Formula for Men</h3>
                    <div className="mt-4 rounded-lg bg-black/20 p-6 ring-1 ring-white/10">
                      <Formula
                        formula={`\\text{Body Fat}\\% = \\frac{4.15 \\times \\text{Waist}_{in} - 0.082 \\times \\text{Weight}_{lb} - 98.42}{\\text{Weight}_{lb}} \\times 100`}
                      />
                      <p className="mt-4 text-sm text-gray-400">
                        Where:
                        <br />
                        <Formula inline formula="\\text{Waist}_{in}" /> = waist circumference in
                        inches
                        <br />
                        <Formula inline formula="\\text{Weight}_{lb}" /> = body weight in pounds
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">Formula for Women</h3>
                    <div className="mt-4 rounded-lg bg-black/20 p-6 ring-1 ring-white/10">
                      <Formula
                        formula={`\\text{Body Fat}\\% = \\frac{4.15 \\times \\text{Waist}_{in} - 0.082 \\times \\text{Weight}_{lb} - 76.76}{\\text{Weight}_{lb}} \\times 100`}
                      />
                      <p className="mt-4 text-sm text-gray-400">
                        Where:
                        <br />
                        <Formula inline formula="\\text{Waist}_{in}" /> = waist circumference in
                        inches
                        <br />
                        <Formula inline formula="\\text{Weight}_{lb}" /> = body weight in pounds
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">Validation & Accuracy</h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>Accuracy range: ±5-7% with proper technique</li>
                      <li>
                        Designed for general-population estimates; accuracy can drop at extremes
                      </li>
                      <li>May be less accurate for athletic or highly muscular individuals</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">References</h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>
                        YMCA. (1989). YMCA Fitness Testing and Assessment Manual, 4th Edition. Human
                        Kinetics.
                      </li>
                      <li>
                        Golding, L.A. (2000). The Y&apos;s Way to Physical Fitness. Human Kinetics.
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
                <h2 className="text-2xl font-semibold text-white">Modified YMCA Method</h2>
                <div className="mt-8 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Research Background</h3>
                    <p className="mt-4 text-gray-300">
                      An adapted version of the YMCA method that adds additional measurements for
                      the women&apos;s equation.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">Formula for Men</h3>
                    <div className="mt-4 rounded-lg bg-black/20 p-6 ring-1 ring-white/10">
                      <Formula
                        formula={`\\text{Body Fat}\\% = \\frac{4.15 \\times \\text{Waist}_{in} - 0.082 \\times \\text{Weight}_{lb} - 94.42}{\\text{Weight}_{lb}} \\times 100`}
                      />
                      <p className="mt-4 text-sm text-gray-400">
                        Where:
                        <br />
                        <Formula inline formula="\\text{Waist}_{in}" /> = waist circumference in
                        inches
                        <br />
                        <Formula inline formula="\\text{Weight}_{lb}" /> = body weight in pounds
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">Formula for Women</h3>
                    <div className="mt-4 rounded-lg bg-black/20 p-6 ring-1 ring-white/10">
                      <Formula
                        formula={`\\text{Body Fat}\\% = \\frac{0.268 \\times \\text{Weight}_{lb} - 0.318 \\times \\text{Wrist}_{in} + 0.157 \\times \\text{Waist}_{in} + 0.245 \\times \\text{Hips}_{in} - 0.434 \\times \\text{Forearm}_{in} - 8.987}{\\text{Weight}_{lb}} \\times 100`}
                      />
                      <p className="mt-4 text-sm text-gray-400">
                        Where:
                        <br />
                        <Formula inline formula="\\text{Weight}_{lb}" /> = body weight in pounds
                        <br />
                        <Formula inline formula="\\text{Wrist}_{in}" /> = wrist circumference in
                        inches
                        <br />
                        <Formula inline formula="\\text{Waist}_{in}" /> = waist circumference in
                        inches
                        <br />
                        <Formula inline formula="\\text{Hips}_{in}" /> = hip circumference in inches
                        <br />
                        <Formula inline formula="\\text{Forearm}_{in}" /> = forearm circumference in
                        inches
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">Validation & Accuracy</h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>Accuracy range: ±4-6% with proper technique</li>
                      <li>Additional measurements for the women&apos;s equation</li>
                      <li>Consistent site placement improves repeatability</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">References</h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>
                        YMCA. (2000). YMCA Body Composition and Additional Analyses Manual. Human
                        Kinetics.
                      </li>
                      <li>
                        Heyward, V.H., & Wagner, D.R. (2004). Applied Body Composition Assessment.
                        Human Kinetics.
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
                <h2 className="text-2xl font-semibold text-white">U.S. Navy Method</h2>
                <div className="mt-8 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Research Background</h3>
                    <p className="mt-4 text-gray-300">
                      Developed by Hodgdon and Beckett at the Naval Health Research Center for U.S.
                      Navy body fat screening.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">Formula for Men</h3>
                    <div className="mt-4 rounded-lg bg-black/20 p-6 ring-1 ring-white/10">
                      <Formula
                        formula={`\\text{Body Fat}\\% = 86.010 \\times \\log_{10}(\\text{Waist}_{in} - \\text{Neck}_{in}) - 70.041 \\times \\log_{10}(\\text{Height}_{in}) + 36.76`}
                      />
                      <p className="mt-4 text-sm text-gray-400">
                        Where:
                        <br />
                        <Formula inline formula="\\text{Waist}_{in}" /> = waist circumference in
                        inches
                        <br />
                        <Formula inline formula="\\text{Neck}_{in}" /> = neck circumference in
                        inches
                        <br />
                        <Formula inline formula="\\text{Height}_{in}" /> = height in inches
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">Formula for Women</h3>
                    <div className="mt-4 rounded-lg bg-black/20 p-6 ring-1 ring-white/10">
                      <Formula
                        formula={`\\text{Body Fat}\\% = 163.205 \\times \\log_{10}(\\text{Waist}_{in} + \\text{Hip}_{in} - \\text{Neck}_{in}) - 97.684 \\times \\log_{10}(\\text{Height}_{in}) - 78.387`}
                      />
                      <p className="mt-4 text-sm text-gray-400">
                        Where:
                        <br />
                        <Formula inline formula="\\text{Waist}_{in}" /> = waist circumference in
                        inches
                        <br />
                        <Formula inline formula="\\text{Hip}_{in}" /> = hip circumference in inches
                        <br />
                        <Formula inline formula="\\text{Neck}_{in}" /> = neck circumference in
                        inches
                        <br />
                        <Formula inline formula="\\text{Height}_{in}" /> = height in inches
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">Validation & Accuracy</h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>Accuracy range: ±4-6% with proper technique</li>
                      <li>Designed for population-level screening</li>
                      <li>Simple circumference measurements, no calipers</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">References</h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>
                        Hodgdon, J.A., & Beckett, M.B. (1984). Prediction of percent body fat for
                        U.S. Navy men and women from body circumferences and height. Naval Health
                        Research Center Report No. 84-29.
                      </li>
                      <li>
                        Friedl, K.E., & Vogel, J.A. (1997). Validity of percent body fat predicted
                        from circumferences: classification of men for weight control regulations.
                        Military Medicine, 162(3), 194-200.
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
                <h2 className="text-2xl font-semibold text-white">Covert Bailey Method</h2>
                <div className="mt-8 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Research Background</h3>
                    <p className="mt-4 text-gray-300">
                      Developed by fitness researcher Covert Bailey to estimate body fat using
                      multiple body measurements. The method uses age and gender-specific equations.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">Formula for Men</h3>
                    <div className="mt-4 rounded-lg bg-black/20 p-6 ring-1 ring-white/10">
                      <p className="mb-4 text-sm text-gray-400">For age {'≤'} 30:</p>
                      <Formula
                        formula={`\\text{Body Fat}\\% = \\text{Waist}_{in} + 0.5 \\times \\text{Hips}_{in} - 3 \\times \\text{Forearm}_{in} - \\text{Wrist}_{in}`}
                      />
                      <p className="mb-4 mt-4 text-sm text-gray-400">For age {'>'} 30:</p>
                      <Formula
                        formula={`\\text{Body Fat}\\% = \\text{Waist}_{in} + 0.5 \\times \\text{Hips}_{in} - 2.7 \\times \\text{Forearm}_{in} - \\text{Wrist}_{in}`}
                      />
                      <p className="mt-4 text-sm text-gray-400">
                        Where:
                        <br />
                        <Formula inline formula="\\text{Waist}_{in}" /> = waist circumference at
                        navel
                        <br />
                        <Formula inline formula="\\text{Hips}_{in}" /> = hip circumference at widest
                        point
                        <br />
                        <Formula inline formula="\\text{Forearm}_{in}" /> = forearm circumference at
                        widest point
                        <br />
                        <Formula inline formula="\\text{Wrist}_{in}" /> = wrist circumference at
                        smallest point
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">Formula for Women</h3>
                    <div className="mt-4 rounded-lg bg-black/20 p-6 ring-1 ring-white/10">
                      <p className="mb-4 text-sm text-gray-400">For age {'≤'} 30:</p>
                      <Formula
                        formula={`\\text{Body Fat}\\% = \\text{Hips}_{in} + 0.8 \\times \\text{Thigh}_{in} - 2 \\times \\text{Calf}_{in} - \\text{Wrist}_{in}`}
                      />
                      <p className="mb-4 mt-4 text-sm text-gray-400">For age {'>'} 30:</p>
                      <Formula
                        formula={`\\text{Body Fat}\\% = \\text{Hips}_{in} + \\text{Thigh}_{in} - 2 \\times \\text{Calf}_{in} - \\text{Wrist}_{in}`}
                      />
                      <p className="mt-4 text-sm text-gray-400">
                        Where:
                        <br />
                        <Formula inline formula="\\text{Hips}_{in}" /> = hip circumference at widest
                        point
                        <br />
                        <Formula inline formula="\\text{Thigh}_{in}" /> = thigh circumference at
                        widest point
                        <br />
                        <Formula inline formula="\\text{Calf}_{in}" /> = calf circumference at
                        widest point
                        <br />
                        <Formula inline formula="\\text{Wrist}_{in}" /> = wrist circumference at
                        smallest point
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">Validation & Accuracy</h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>Accuracy range: ±4-5% with proper technique</li>
                      <li>Uses age-specific equations</li>
                      <li>Different measurement sites for men and women</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">References</h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>
                        Bailey, C. (1994). Smart Exercise: Burning Fat, Getting Fit. Houghton
                        Mifflin.
                      </li>
                      <li>Bailey, C. (1991). The New Fit or Fat. Houghton Mifflin.</li>
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
                    <h3 className="text-lg font-semibold text-white">Research Background</h3>
                    <p className="mt-4 text-gray-300">
                      A simplified version of the 7-site method, developed to provide quicker body
                      fat measurements in field settings.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">Formula</h3>
                    <div className="mt-4 rounded-lg bg-black/20 p-6 ring-1 ring-white/10">
                      <p className="mb-4 text-sm text-gray-400">For men:</p>
                      <Formula
                        formula={`\\text{Body Density} = 1.10938 - (0.0008267 \\times \\sum\\text{SF}) + (0.0000016 \\times \\sum\\text{SF}^2) - (0.0002574 \\times \\text{Age})`}
                      />
                      <p className="mb-4 mt-4 text-sm text-gray-400">For women:</p>
                      <Formula
                        formula={`\\text{Body Density} = 1.0994921 - (0.0009929 \\times \\sum\\text{SF}) + (0.0000023 \\times \\sum\\text{SF}^2) - (0.0001392 \\times \\text{Age})`}
                      />
                      <p className="mt-4 text-sm text-gray-400">
                        Where:
                        <br />
                        <Formula inline formula="\\sum\\text{SF}" /> = Sum of three skinfold
                        measurements (mm)
                        <br />
                        For men: chest, abdomen, thigh
                        <br />
                        For women: tricep, suprailiac, thigh
                        <br />
                        <Formula inline formula="\\text{Age}" /> = age in years
                      </p>
                      <div className="mt-4 border-t border-white/10 pt-4">
                        <p className="text-sm text-gray-400">
                          Convert to body fat percentage using Siri&apos;s equation:
                        </p>
                        <Formula
                          formula={`\\text{Body Fat}\\% = \\frac{495}{\\text{Body Density}} - 450`}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">Validation & Accuracy</h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>Accuracy range: ±4-5% with proper technique</li>
                      <li>Consistent site placement improves repeatability</li>
                      <li>Useful for tracking changes over time</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">References</h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>
                        Jackson, A.S., & Pollock, M.L. (1978). Generalized equations for predicting
                        body density of men. British Journal of Nutrition, 40(3), 497-504.
                      </li>
                      <li>
                        Jackson, A.S., Pollock, M.L., & Ward, A. (1980). Generalized equations for
                        predicting body density of women. Medicine and Science in Sports and
                        Exercise, 12(3), 175-181.
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
                <h2 className="text-2xl font-semibold text-white">Durnin & Womersley Method</h2>
                <div className="mt-8 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Research Background</h3>
                    <p className="mt-4 text-gray-300">
                      Published in 1974, this method pioneered age-specific equations for body fat
                      calculation based on four skinfold sites.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">Formula</h3>
                    <div className="mt-4 rounded-lg bg-black/20 p-6 ring-1 ring-white/10">
                      <Formula
                        formula={`\\text{Body Density} = c - m \\times \\log_{10}(\\sum\\text{SF})`}
                      />
                      <p className="mt-4 text-sm text-gray-400">
                        Where:
                        <br />
                        <Formula inline formula="\\sum\\text{SF}" /> = Sum of bicep, tricep,
                        subscapular, and suprailiac skinfolds (mm)
                        <br />
                        <Formula inline formula="c" /> and <Formula inline formula="m" /> are age
                        and gender-specific coefficients:
                      </p>
                      <div className="mt-4 overflow-x-auto">
                        <table className="min-w-full text-sm">
                          <thead>
                            <tr className="border-b border-white/10">
                              <th className="py-2 text-left text-gray-300">Age</th>
                              <th className="py-2 text-left text-gray-300">Men (c, m)</th>
                              <th className="py-2 text-left text-gray-300">Women (c, m)</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/10">
                            <tr>
                              <td className="py-2 text-gray-400">Under 17</td>
                              <td className="py-2 text-gray-400">1.1533, 0.0643</td>
                              <td className="py-2 text-gray-400">1.1369, 0.0598</td>
                            </tr>
                            <tr>
                              <td className="py-2 text-gray-400">17-19</td>
                              <td className="py-2 text-gray-400">1.1620, 0.0630</td>
                              <td className="py-2 text-gray-400">1.1549, 0.0678</td>
                            </tr>
                            <tr>
                              <td className="py-2 text-gray-400">20-29</td>
                              <td className="py-2 text-gray-400">1.1631, 0.0632</td>
                              <td className="py-2 text-gray-400">1.1599, 0.0717</td>
                            </tr>
                            <tr>
                              <td className="py-2 text-gray-400">30-39</td>
                              <td className="py-2 text-gray-400">1.1422, 0.0544</td>
                              <td className="py-2 text-gray-400">1.1423, 0.0632</td>
                            </tr>
                            <tr>
                              <td className="py-2 text-gray-400">40-49</td>
                              <td className="py-2 text-gray-400">1.1620, 0.0700</td>
                              <td className="py-2 text-gray-400">1.1333, 0.0612</td>
                            </tr>
                            <tr>
                              <td className="py-2 text-gray-400">50+</td>
                              <td className="py-2 text-gray-400">1.1715, 0.0779</td>
                              <td className="py-2 text-gray-400">1.1339, 0.0645</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="mt-4 border-t border-white/10 pt-4">
                        <p className="text-sm text-gray-400">
                          Convert to body fat percentage using Siri&apos;s equation:
                        </p>
                        <Formula
                          formula={`\\text{Body Fat}\\% = \\frac{495}{\\text{Body Density}} - 450`}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">Validation & Accuracy</h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>Accuracy range: ±3.5-5% with proper technique</li>
                      <li>Age and gender-specific equations</li>
                      <li>Uses four-site skinfold measurements</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">References</h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>
                        Durnin, J.V.G.A., & Womersley, J. (1974). Body fat assessed from total body
                        density and its estimation from skinfold thickness: measurements on 481 men
                        and women aged from 16 to 72 years. British Journal of Nutrition, 32(1),
                        77-97.
                      </li>
                      <li>
                        Durnin, J.V.G.A., & Rahaman, M.M. (1967). The assessment of the amount of
                        fat in the human body from measurements of skinfold thickness. British
                        Journal of Nutrition, 21(3), 681-689.
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
                    <h3 className="text-lg font-semibold text-white">Research Background</h3>
                    <p className="mt-4 text-gray-300">
                      An intermediate version between the 3-site and 7-site methods, offering
                      improved accuracy while maintaining practical efficiency. Developed through
                      the same research program as other Jackson & Pollock methods.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">Formula</h3>
                    <div className="mt-4 rounded-lg bg-black/20 p-6 ring-1 ring-white/10">
                      <p className="mb-4 text-sm text-gray-400">For men:</p>
                      <Formula
                        formula={`\\text{Body Fat}\\% = 0.29288 \\times \\sum\\text{SF} - 0.0005 \\times \\sum\\text{SF}^2 + 0.15845 \\times \\text{Age} - 5.76377`}
                      />
                      <p className="mb-4 mt-4 text-sm text-gray-400">For women:</p>
                      <Formula
                        formula={`\\text{Body Fat}\\% = 0.29669 \\times \\sum\\text{SF} - 0.00043 \\times \\sum\\text{SF}^2 + 0.02963 \\times \\text{Age} + 1.4072`}
                      />
                      <p className="mt-4 text-sm text-gray-400">
                        Where:
                        <br />
                        <Formula inline formula="\\sum\\text{SF}" /> = Sum of four skinfold
                        measurements (mm)
                        <br />
                        triceps, abdomen, suprailiac, and thigh
                        <br />
                        <Formula inline formula="\\text{Age}" /> = age in years
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">Validation & Accuracy</h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>Accuracy range: ±3.5-4.5% with proper technique</li>
                      <li>Uses four-site skinfold sum with age adjustment</li>
                      <li>Often chosen for a balance of detail and time</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">References</h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>
                        Jackson, A.S., & Pollock, M.L. (1985). Practical assessment of body
                        composition. The Physician and Sportsmedicine, 13(5), 76-90.
                      </li>
                      <li>
                        Jackson, A.S., Pollock, M.L., & Gettman, L.R. (1978). Intertester
                        reliability of selected skinfold and circumference measurements and percent
                        fat estimates. Research Quarterly, 49(4), 546-551.
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
                    <h3 className="text-lg font-semibold text-white">Research Background</h3>
                    <p className="mt-4 text-gray-300">
                      Published in 1978 as the full 7-site Jackson & Pollock protocol for estimating
                      body density.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">Formula</h3>
                    <div className="mt-4 rounded-lg bg-black/20 p-6 ring-1 ring-white/10">
                      <p className="mb-4 text-sm text-gray-400">For men:</p>
                      <Formula
                        formula={`\\text{Body Density} = 1.112 - (0.00043499 \\times \\sum\\text{SF}) + (0.00000055 \\times \\sum\\text{SF}^2) - (0.00028826 \\times \\text{Age})`}
                      />
                      <p className="mb-4 mt-4 text-sm text-gray-400">For women:</p>
                      <Formula
                        formula={`\\text{Body Density} = 1.097 - (0.00046971 \\times \\sum\\text{SF}) + (0.00000056 \\times \\sum\\text{SF}^2) - (0.00012828 \\times \\text{Age})`}
                      />
                      <p className="mt-4 text-sm text-gray-400">
                        Where:
                        <br />
                        <Formula inline formula="\\sum\\text{SF}" /> = Sum of seven skinfold
                        measurements (mm):
                        <br />
                        chest, midaxillary, triceps, subscapular, abdomen, suprailiac, and thigh
                        <br />
                        <Formula inline formula="\\text{Age}" /> = age in years
                      </p>
                      <div className="mt-4 border-t border-white/10 pt-4">
                        <p className="text-sm text-gray-400">
                          Convert to body fat percentage using Siri&apos;s equation:
                        </p>
                        <Formula
                          formula={`\\text{Body Fat}\\% = \\frac{495}{\\text{Body Density}} - 450`}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">Validation & Accuracy</h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>Accuracy range: ±3-4% with proper technique</li>
                      <li>Most comprehensive of the Jackson & Pollock methods</li>
                      <li>Requires consistent site location and caliper use</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">References</h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>
                        Jackson, A.S., & Pollock, M.L. (1978). Generalized equations for predicting
                        body density of men. British Journal of Nutrition, 40(3), 497-504.
                      </li>
                      <li>
                        Pollock, M.L., Schmidt, D.H., & Jackson, A.S. (1980). Measurement of
                        cardiorespiratory fitness and body composition in the clinical setting.
                        Comprehensive Therapy, 6(9), 12-27.
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
                <h2 className="text-2xl font-semibold text-white">Parrillo Method</h2>
                <div className="mt-8 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Research Background</h3>
                    <p className="mt-4 text-gray-300">
                      Developed by John Parrillo specifically for bodybuilding applications. Uses
                      nine skinfold sites to account for various fat distribution patterns in
                      bodybuilding contexts.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">Formula</h3>
                    <div className="mt-4 rounded-lg bg-black/20 p-6 ring-1 ring-white/10">
                      <Formula
                        formula={`\\text{Body Fat}\\% = \\frac{\\sum\\text{SF} \\times 27}{\\text{Weight}_{lb}}`}
                      />
                      <p className="mt-4 text-sm text-gray-400">
                        Where:
                        <br />
                        <Formula inline formula="\\sum\\text{SF}" /> = Sum of nine skinfold
                        measurements (mm):
                        <br />
                        chest, abdomen, thigh, bicep, tricep, subscapular, suprailiac, lower back,
                        calf
                        <br />
                        <Formula inline formula="\\text{Weight}_{lb}" /> = body weight in pounds
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">Validation & Accuracy</h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>Accuracy range: ±3-4% with proper technique</li>
                      <li>Uses nine-site skinfold sum</li>
                      <li>Commonly used for bodybuilding tracking</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">References</h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>Parrillo, J. (1993). High-Performance Body-Building. Perigee Books.</li>
                      <li>
                        Parrillo, J., & Greenwood-Robinson, M. (1997). BodyBuilding Nutrition.
                        Parrillo Performance Press.
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
                    <h3 className="text-lg font-semibold text-white">Research Background</h3>
                    <p className="mt-4 text-gray-300">
                      Many skinfold methods calculate body density first, then convert it to body
                      fat percentage using a standard equation.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">Conversion Formulas</h3>
                    <div className="mt-4 rounded-lg bg-black/20 p-6 ring-1 ring-white/10">
                      <p className="mb-4 text-sm text-gray-400">Siri (1956):</p>
                      <Formula
                        formula={`\\text{Body Fat}\\% = \\frac{495}{\\text{Body Density}} - 450`}
                      />

                      <p className="mb-4 mt-6 text-sm text-gray-400">Brozek (1963):</p>
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
                        Note: Siri and Brozek equations are commonly used and generally provide
                        similar results for many users.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Formula-Specific Limitations
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div>
                        <h4 className="font-medium text-white">Brozek (1963)</h4>
                        <ul className="mt-2 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                          <li>Derived from a two-component body density model</li>
                          <li>Assumes constant densities of fat and fat-free mass</li>
                          <li>Can diverge for very lean or very muscular individuals</li>
                          <li>
                            Population differences in bone density or hydration can shift results
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-white">Schutte (1984)</h4>
                        <ul className="mt-2 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                          <li>
                            Developed for a specific population; applicability outside that group is
                            uncertain
                          </li>
                          <li>
                            Focused on African American men; not validated for women or other groups
                          </li>
                          <li>Smaller cohorts can limit generalizability</li>
                          <li>Use with caution outside the intended population</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-white">Wagner & Heyward (2001)</h4>
                        <ul className="mt-2 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                          <li>
                            Developed for a specific population; not validated for women or other
                            groups
                          </li>
                          <li>Evidence outside the intended population is limited</li>
                          <li>May be less accurate at extreme body compositions</li>
                          <li>Use with caution outside the intended population</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Why We Use Siri&apos;s Equation
                    </h3>
                    <p className="mt-4 text-gray-300">
                      We chose Siri&apos;s equation as our primary conversion formula for several
                      reasons:
                    </p>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>Widely cited in body composition literature</li>
                      <li>
                        Original equation used in the development and validation of Jackson &
                        Pollock methods
                      </li>
                      <li>
                        Simpler coefficients (495/450) make it easier to remember and calculate
                        manually
                      </li>
                      <li>Provides similar results to Brozek for many users</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Population-Specific Considerations
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>These equations assume constant densities of fat and fat-free mass</li>
                      <li>Alternative equations exist for specific populations</li>
                      <li>Age, ethnicity, and athletic status can affect results</li>
                      <li>Choose the equation that matches the intended population</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">References</h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>
                        Siri, W.E. (1956). The gross composition of the body. Advances in Biological
                        and Medical Physics, 4, 239-280.
                      </li>
                      <li>
                        Brozek, J., et al. (1963). Densitometric analysis of body composition:
                        Revision of some quantitative assumptions. Annals of the New York Academy of
                        Sciences, 110, 113-140.
                      </li>
                      <li>
                        Wagner, D.R., & Heyward, V.H. (2001). Validity of two-component models for
                        estimating body fat of black men. Journal of Applied Physiology, 90(2),
                        649-656.
                      </li>
                      <li>
                        Schutte, J.E., et al. (1984). Density of lean body mass is greater in blacks
                        than in whites. Journal of Applied Physiology, 56(6), 1647-1649.
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
                    <h3 className="text-lg font-semibold text-white">BMI (Body Mass Index)</h3>
                    <p className="mt-4 text-gray-300">
                      While widely used, BMI is not a measure of body fat percentage. It only
                      considers height and weight, making it prone to misclassification for
                      muscular, older, or atypical body compositions.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Bioelectrical Impedance (BIA)
                    </h3>
                    <p className="mt-4 text-gray-300">
                      Consumer-grade BIA devices can vary widely in accuracy. Results are influenced
                      by hydration status, recent exercise, meal timing, and environmental factors.
                      Professional multi-frequency devices can be more consistent but require
                      trained operators and controlled conditions.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">Near-Infrared</h3>
                    <p className="mt-4 text-gray-300">
                      Uses infrared light reflection to estimate body fat. While non-invasive,
                      published validation is limited and results can vary with skin tone,
                      hydration, and measurement site.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">Air Displacement (Bod Pod)</h3>
                    <p className="mt-4 text-gray-300">
                      Requires specialized equipment and controlled conditions. Results can be
                      affected by factors like facial hair, moisture, clothing, and temperature.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      DEXA (Dual-Energy X-ray Absorptiometry)
                    </h3>
                    <p className="mt-4 text-gray-300">
                      A laboratory reference method that requires expensive equipment and trained
                      operators, and involves low-dose radiation. Not practical for frequent
                      tracking.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">References</h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>
                        Lee, S.Y., & Gallagher, D. (2008). Assessment methods in human body
                        composition. Current Opinion in Clinical Nutrition and Metabolic Care,
                        11(5), 566-572.
                      </li>
                      <li>
                        Wagner, D.R., & Heyward, V.H. (1999). Techniques of body composition
                        assessment: a review of laboratory and field methods. Research Quarterly for
                        Exercise and Sport, 70(2), 135-149.
                      </li>
                      <li>
                        Ackland, T.R., et al. (2012). Current status of body composition assessment
                        in sport. Sports Medicine, 42(3), 227-249.
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
