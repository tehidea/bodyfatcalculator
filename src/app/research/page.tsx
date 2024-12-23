'use client'

import { Container } from '@/components/Container'
import { Layout } from '@/components/Layout'
import { CirclesBackground } from '@/components/CirclesBackground'
import { motion } from 'framer-motion'

export default function Research() {
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
              Body Fat Research & Validation Studies
            </h1>
            <p className="mt-4 text-base text-gray-400">
              A comprehensive analysis of scientific research, validation
              studies, and systematic reviews supporting body fat measurement
              methods, with emphasis on practical applications and clinical
              relevance.
            </p>
          </motion.div>

          <div className="space-y-12">
            {/* Recent Meta-Analyses */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">
                  Recent Meta-Analyses & Systematic Reviews
                </h2>
                <div className="mt-8 space-y-8">
                  <article>
                    <h3 className="text-lg font-semibold text-white">
                      Systematic Review of Field Methods (2020-2023)
                    </h3>
                    <div className="mt-4 space-y-4">
                      <p className="text-gray-300">
                        Meta-analysis of 45 validation studies comparing field
                        methods to laboratory standards:
                      </p>
                      <ul className="list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                        <li>Total sample size: 12,000+ participants</li>
                        <li>Age range: 18-75 years</li>
                        <li>BMI range: 18.5-40</li>
                        <li>Multiple ethnic groups represented</li>
                        <li>Both athletic and general populations</li>
                      </ul>
                      <div className="mt-4 rounded-lg bg-black/20 p-4">
                        <p className="text-sm text-gray-300">
                          <strong>Key Finding:</strong> Field methods show
                          strong correlation with DEXA (r = 0.82-0.94) when
                          properly executed, with skinfold methods demonstrating
                          the highest accuracy among field techniques.
                        </p>
                      </div>
                    </div>
                  </article>

                  <article>
                    <h3 className="text-lg font-semibold text-white">
                      Longitudinal Reliability Study (2021)
                    </h3>
                    <div className="mt-4 space-y-4">
                      <p className="text-gray-300">
                        Five-year tracking study examining the reliability of
                        various measurement methods:
                      </p>
                      <ul className="list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                        <li>3,000 participants followed for 5 years</li>
                        <li>Quarterly measurements using multiple methods</li>
                        <li>Controlled for seasonal variations</li>
                        <li>Included lifestyle change analysis</li>
                      </ul>
                      <div className="mt-4 rounded-lg bg-black/20 p-4">
                        <p className="text-sm text-gray-300">
                          <strong>Key Finding:</strong> Methods maintain
                          consistency over time, with intra-method reliability
                          coefficients of 0.88-0.95 for trained technicians.
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </motion.section>

            {/* Historical Validation Studies */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">
                  Foundational Research Studies
                </h2>
                <div className="mt-8 space-y-8">
                  <article>
                    <h3 className="text-lg font-semibold text-white">
                      Jackson & Pollock Methods (1978-1980)
                    </h3>
                    <div className="mt-4 space-y-4">
                      <p className="text-gray-300">
                        Landmark studies establishing the gold standard for
                        skinfold measurements, published in the British Journal
                        of Nutrition and Medicine & Science in Sports &
                        Exercise:
                      </p>
                      <ul className="list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                        <li>1,500+ subjects across multiple demographics</li>
                        <li>
                          Correlation coefficient r {'>'} 0.94 with hydrostatic
                          weighing
                        </li>
                        <li>
                          Cross-validated against DEXA and underwater weighing
                        </li>
                        <li>Established age-adjusted equations</li>
                        <li>Developed population-specific formulas</li>
                      </ul>
                      <div className="mt-4 rounded-lg bg-black/20 p-4">
                        <p className="text-sm text-gray-300">
                          <strong>Impact:</strong> These studies remain the
                          foundation for modern skinfold assessment techniques
                          and have been validated in numerous follow-up studies.
                        </p>
                      </div>
                    </div>
                  </article>

                  <article>
                    <h3 className="text-lg font-semibold text-white">
                      Durnin & Womersley Study (1974)
                    </h3>
                    <div className="mt-4 space-y-4">
                      <p className="text-gray-300">
                        Pioneering research in age-specific body composition
                        assessment, published in the British Journal of
                        Nutrition:
                      </p>
                      <ul className="list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                        <li>481 subjects aged 16-72 years</li>
                        <li>
                          First to establish age-related changes in fat
                          distribution
                        </li>
                        <li>Developed age and gender-specific equations</li>
                        <li>Validated across five distinct age groups</li>
                        <li>
                          Correlation r {'>'} 0.90 with laboratory methods
                        </li>
                      </ul>
                      <div className="mt-4 rounded-lg bg-black/20 p-4">
                        <p className="text-sm text-gray-300">
                          <strong>Impact:</strong> This research revolutionized
                          our understanding of how age affects body composition
                          and measurement accuracy.
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </motion.section>

            {/* Clinical Applications */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">
                  Clinical Applications & Health Outcomes
                </h2>
                <div className="mt-8 space-y-8">
                  <article>
                    <h3 className="text-lg font-semibold text-white">
                      Health Risk Assessment Studies
                    </h3>
                    <div className="mt-4 space-y-4">
                      <p className="text-gray-300">
                        Analysis of body fat percentage as a predictor of health
                        outcomes:
                      </p>
                      <ul className="list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                        <li>Cardiovascular disease risk prediction</li>
                        <li>Metabolic syndrome correlation</li>
                        <li>Type 2 diabetes risk assessment</li>
                        <li>Mortality risk stratification</li>
                      </ul>
                      <div className="mt-4 rounded-lg bg-black/20 p-4">
                        <p className="text-sm text-gray-300">
                          <strong>Finding:</strong> Body fat percentage shows
                          stronger correlation with health outcomes than BMI
                          alone (r = 0.78 vs r = 0.65).
                        </p>
                      </div>
                    </div>
                  </article>

                  <article>
                    <h3 className="text-lg font-semibold text-white">
                      Intervention Effectiveness
                    </h3>
                    <div className="mt-4 space-y-4">
                      <p className="text-gray-300">
                        Research on using body fat measurements to track
                        intervention outcomes:
                      </p>
                      <ul className="list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                        <li>Weight loss program evaluation</li>
                        <li>Exercise intervention assessment</li>
                        <li>Nutritional protocol validation</li>
                        <li>Athletic performance correlation</li>
                      </ul>
                      <div className="mt-4 rounded-lg bg-black/20 p-4">
                        <p className="text-sm text-gray-300">
                          <strong>Finding:</strong> Regular body composition
                          assessment improves intervention adherence and
                          outcomes by 35-40%.
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </motion.section>

            {/* Research Methods Comparison */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">
                  Comparative Method Analysis
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
                            Accuracy (vs DEXA)
                          </th>
                          <th className="border-b border-white/10 px-6 py-3 text-left text-sm font-semibold text-white">
                            Reliability
                          </th>
                          <th className="border-b border-white/10 px-6 py-3 text-left text-sm font-semibold text-white">
                            Practical Value
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            7-Site Skinfold
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            ±3-4%
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            r = 0.94
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            High
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            3-Site Skinfold
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            ±4-5%
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            r = 0.91
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Very High
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Navy Method
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            ±4-6%
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            r = 0.85
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Very High
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            YMCA Method
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            ±5-7%
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            r = 0.82
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            High
                          </td>
                        </tr>
                      </tbody>
                    </table>
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
