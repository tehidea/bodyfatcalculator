'use client'

import { Container } from '@/components/Container'
import { Layout } from '@/components/Layout'
import { CirclesBackground } from '@/components/CirclesBackground'
import { motion } from 'framer-motion'

export default function Accuracy() {
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
              Body Fat Measurement Accuracy & Validation
            </h1>
            <p className="mt-4 text-base text-gray-400">
              In-depth analysis of measurement accuracy, error sources, and
              confidence intervals, based on comprehensive research studies and
              meta-analyses. Includes practical guidelines for maximizing
              measurement precision.
            </p>
          </motion.div>

          <div className="space-y-12">
            {/* Accuracy Overview */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">
                  Method Accuracy & Confidence Intervals
                </h2>
                <div className="mt-8">
                  <div className="overflow-x-auto rounded-lg bg-black/20 ring-1 ring-white/10">
                    <table className="min-w-full">
                      <thead>
                        <tr>
                          <th className="border-b border-white/10 px-6 py-3 text-left text-sm font-semibold text-white">
                            Method
                          </th>
                          <th className="border-b border-white/10 px-6 py-3 text-left text-sm font-semibold text-white">
                            95% CI
                          </th>
                          <th className="border-b border-white/10 px-6 py-3 text-left text-sm font-semibold text-white">
                            Standard Error
                          </th>
                          <th className="border-b border-white/10 px-6 py-3 text-left text-sm font-semibold text-white">
                            Reliability
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            7-Site Skinfold
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            ±3.0-4.0%
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            1.7%
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            ICC = 0.94
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            3-Site Skinfold
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            ±4.0-5.0%
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            2.2%
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            ICC = 0.91
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Navy Method
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            ±4.5-6.0%
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            2.5%
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            ICC = 0.85
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            YMCA Method
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            ±5.0-7.0%
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            3.1%
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            ICC = 0.82
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-4 text-sm text-gray-400">
                    CI = Confidence Interval, ICC = Intraclass Correlation
                    Coefficient
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Error Sources */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">
                  Sources of Measurement Error
                </h2>
                <div className="mt-8 space-y-8">
                  <article>
                    <h3 className="text-lg font-semibold text-white">
                      Technical Errors
                    </h3>
                    <div className="mt-4 space-y-4">
                      <ul className="list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                        <li>Incorrect site location (±1.5-2.5% error)</li>
                        <li>Inconsistent measurement pressure (±1.0-2.0%)</li>
                        <li>Tool calibration issues (±0.5-1.5%)</li>
                        <li>Recording/calculation errors (±0.5-1.0%)</li>
                      </ul>
                      <div className="mt-4 rounded-lg bg-black/20 p-4">
                        <p className="text-sm text-gray-300">
                          <strong>Impact:</strong> Technical errors can
                          compound, potentially increasing total error by 2-4%
                          body fat percentage points.
                        </p>
                      </div>
                    </div>
                  </article>

                  <article>
                    <h3 className="text-lg font-semibold text-white">
                      Biological Variations
                    </h3>
                    <div className="mt-4 space-y-4">
                      <ul className="list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                        <li>Hydration status (±1.0-2.0% variation)</li>
                        <li>Time of day fluctuations (±0.5-1.5%)</li>
                        <li>Recent exercise effects (±1.0-2.0%)</li>
                        <li>Hormonal influences (±0.5-1.5%)</li>
                      </ul>
                      <div className="mt-4 rounded-lg bg-black/20 p-4">
                        <p className="text-sm text-gray-300">
                          <strong>Impact:</strong> Biological variations can
                          affect measurements by up to 3% body fat percentage
                          points throughout the day.
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </motion.section>

            {/* Population-Specific Accuracy */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">
                  Population-Specific Accuracy Analysis
                </h2>
                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Athletic Population
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>7-Site method most accurate (±2.8-3.4%)</li>
                      <li>Skinfold methods preferred over circumference</li>
                      <li>Lower accuracy in very lean individuals</li>
                      <li>Sport-specific equations available</li>
                      <li>Consider muscle mass distribution</li>
                    </ul>
                    <div className="mt-4 rounded-lg bg-black/20 p-4">
                      <p className="text-sm text-gray-300">
                        <strong>Best Practice:</strong> Use sport-specific
                        equations when available, with multiple measurements
                        over time.
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      General Population
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>Navy method highly reliable (±4.0-5.5%)</li>
                      <li>YMCA method suitable for tracking</li>
                      <li>Age-specific equations recommended</li>
                      <li>Gender-specific formulas essential</li>
                      <li>Consider ethnic variations</li>
                    </ul>
                    <div className="mt-4 rounded-lg bg-black/20 p-4">
                      <p className="text-sm text-gray-300">
                        <strong>Best Practice:</strong> Use age and
                        gender-specific equations, focusing on trend analysis
                        over time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Accuracy Optimization */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">
                  Maximizing Measurement Accuracy
                </h2>
                <div className="mt-8 space-y-6">
                  <div className="grid gap-8 sm:grid-cols-2">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        Measurement Protocol
                      </h3>
                      <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                        <li>Take measurements in the morning</li>
                        <li>Standardize measurement sites</li>
                        <li>Use right side of body</li>
                        <li>Take 2-3 measurements per site</li>
                        <li>Record to nearest 0.5mm</li>
                      </ul>
                      <div className="mt-4 rounded-lg bg-black/20 p-4">
                        <p className="text-sm text-gray-300">
                          <strong>Key Point:</strong> Consistent protocol can
                          reduce measurement error by up to 50%.
                        </p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        Subject Preparation
                      </h3>
                      <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                        <li>8-hour fasting recommended</li>
                        <li>Normal hydration status</li>
                        <li>No exercise for 12 hours</li>
                        <li>Room temperature 21-23°C</li>
                        <li>Standing relaxed position</li>
                      </ul>
                      <div className="mt-4 rounded-lg bg-black/20 p-4">
                        <p className="text-sm text-gray-300">
                          <strong>Key Point:</strong> Proper preparation can
                          improve measurement accuracy by 20-30%.
                        </p>
                      </div>
                    </div>
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
