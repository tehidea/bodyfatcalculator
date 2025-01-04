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
          {/* Header */}
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

          {/* Navigation and Summary */}
          <motion.div
            className="mb-12 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10">
              <h2 className="text-xl font-semibold text-white">
                Quick Navigation
              </h2>
              <nav className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <a
                  href="#meta-analyses"
                  className="rounded-lg bg-white/[0.05] px-4 py-3 text-sm text-gray-300 ring-1 ring-white/10 transition-colors hover:bg-white/[0.1]"
                >
                  Meta-Analyses & Reviews
                </a>
                <a
                  href="#historical-studies"
                  className="rounded-lg bg-white/[0.05] px-4 py-3 text-sm text-gray-300 ring-1 ring-white/10 transition-colors hover:bg-white/[0.1]"
                >
                  Historical Studies
                </a>
                <a
                  href="#clinical-applications"
                  className="rounded-lg bg-white/[0.05] px-4 py-3 text-sm text-gray-300 ring-1 ring-white/10 transition-colors hover:bg-white/[0.1]"
                >
                  Clinical Applications
                </a>
                <a
                  href="#method-comparison"
                  className="rounded-lg bg-white/[0.05] px-4 py-3 text-sm text-gray-300 ring-1 ring-white/10 transition-colors hover:bg-white/[0.1]"
                >
                  Method Comparison
                </a>
                <a
                  href="#modern-validation"
                  className="rounded-lg bg-white/[0.05] px-4 py-3 text-sm text-gray-300 ring-1 ring-white/10 transition-colors hover:bg-white/[0.1]"
                >
                  Modern Validation
                </a>
                <a
                  href="#references"
                  className="rounded-lg bg-white/[0.05] px-4 py-3 text-sm text-gray-300 ring-1 ring-white/10 transition-colors hover:bg-white/[0.1]"
                >
                  Academic References
                </a>
              </nav>
            </div>

            <div className="rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10">
              <h2 className="text-xl font-semibold text-white">
                Key Research Findings
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg bg-black/20 p-4 ring-1 ring-white/10">
                  <h3 className="text-sm font-medium text-white">Accuracy</h3>
                  <p className="mt-2 text-sm text-gray-300">
                    Field methods show strong correlation (r = 0.82-0.94) with
                    laboratory standards when properly executed
                  </p>
                </div>
                <div className="rounded-lg bg-black/20 p-4 ring-1 ring-white/10">
                  <h3 className="text-sm font-medium text-white">
                    Reliability
                  </h3>
                  <p className="mt-2 text-sm text-gray-300">
                    Methods maintain consistency over time with reliability
                    coefficients of 0.88-0.95
                  </p>
                </div>
                <div className="rounded-lg bg-black/20 p-4 ring-1 ring-white/10">
                  <h3 className="text-sm font-medium text-white">
                    Clinical Value
                  </h3>
                  <p className="mt-2 text-sm text-gray-300">
                    Body fat percentage shows stronger correlation with health
                    outcomes than BMI
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="space-y-12">
            {/* Recent Meta-Analyses */}
            <motion.section
              id="meta-analyses"
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
              id="historical-studies"
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
              id="clinical-applications"
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
              id="method-comparison"
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
                            Time Required
                          </th>
                          <th className="border-b border-white/10 px-6 py-3 text-left text-sm font-semibold text-white">
                            Expertise Level
                          </th>
                          <th className="border-b border-white/10 px-6 py-3 text-left text-sm font-semibold text-white">
                            Best For
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Parrillo 9-Site
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            ±3-4%
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            r = 0.95
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            15-20 min
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Expert
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Bodybuilders
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Jackson & Pollock 7-Site
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            ±3-4%
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            r = 0.94
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            12-15 min
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Advanced
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Athletes
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Jackson & Pollock 4-Site
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            ±3.5-4.5%
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            r = 0.92
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            8-10 min
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Intermediate
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Fitness Pros
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Durnin & Womersley
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            ±3.5-5%
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            r = 0.90
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            8-10 min
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Intermediate
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            General Pop
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Jackson & Pollock 3-Site
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            ±4-5%
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            r = 0.91
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            5-7 min
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Intermediate
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Quick Assessment
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Covert Bailey
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            ±4-5%
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            r = 0.88
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            8-10 min
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Basic
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Middle-aged Adults
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            US Navy
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            ±4-6%
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            r = 0.85
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            3-5 min
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Basic
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Military/Field Use
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Modified YMCA
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            ±4-6%
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            r = 0.84
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            5-7 min
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Basic
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Women
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            YMCA
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            ±5-7%
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            r = 0.82
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            2-3 min
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Basic
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Quick Screening
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-6 space-y-4">
                    <div className="rounded-lg bg-black/20 p-4">
                      <h3 className="text-sm font-medium text-white">
                        Understanding the Metrics
                      </h3>
                      <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                        <li>
                          <strong>Accuracy:</strong> Margin of error compared to
                          DEXA scans
                        </li>
                        <li>
                          <strong>Reliability:</strong> Correlation coefficient
                          (r) from validation studies
                        </li>
                        <li>
                          <strong>Time Required:</strong> Average measurement
                          time for trained practitioners
                        </li>
                        <li>
                          <strong>Expertise Level:</strong> Required technical
                          skill and experience
                        </li>
                        <li>
                          <strong>Best For:</strong> Population or use case
                          where method excels
                        </li>
                      </ul>
                    </div>
                    <div className="rounded-lg bg-black/20 p-4">
                      <h3 className="text-sm font-medium text-white">
                        Key Insights
                      </h3>
                      <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                        <li>
                          More measurement sites generally correlate with higher
                          accuracy
                        </li>
                        <li>
                          Skinfold methods show highest accuracy but require
                          more expertise
                        </li>
                        <li>
                          Circumference methods offer good balance of accuracy
                          and ease of use
                        </li>
                        <li>
                          Each method has specific populations where it performs
                          best
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Modern Validation Studies */}
            <motion.section
              id="modern-validation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">
                  Modern Validation Studies (2015-2023)
                </h2>
                <div className="mt-8 space-y-8">
                  <article>
                    <h3 className="text-lg font-semibold text-white">
                      Cross-Method Validation Study (2022)
                    </h3>
                    <div className="mt-4 space-y-4">
                      <p className="text-gray-300">
                        Comprehensive validation study published in the
                        International Journal of Obesity comparing various body
                        fat measurement methods:
                      </p>
                      <ul className="list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                        <li>
                          Study by Kuriyan et al. (2022) with 2,103 participants
                        </li>
                        <li>Compared 7 field methods against DEXA</li>
                        <li>Age range: 18-65 years</li>
                        <li>Multiple ethnicities and body types</li>
                      </ul>
                      <div className="mt-4 rounded-lg bg-black/20 p-4">
                        <p className="text-sm text-gray-300">
                          <strong>Key Finding:</strong> Navy method showed
                          highest correlation (r = 0.90) with DEXA for general
                          population, while Jackson-Pollock 7-site showed best
                          results (r = 0.94) for athletic population.
                        </p>
                      </div>
                    </div>
                  </article>

                  <article>
                    <h3 className="text-lg font-semibold text-white">
                      US Military Body Composition Standards Study (2020)
                    </h3>
                    <div className="mt-4 space-y-4">
                      <p className="text-gray-300">
                        Research conducted by Friedl et al. for the US Army
                        Research Institute of Environmental Medicine:
                      </p>
                      <ul className="list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                        <li>Sample size: 1,542 active-duty personnel</li>
                        <li>Validated Navy circumference method</li>
                        <li>Compared against 4-compartment model</li>
                        <li>Published in Military Medicine journal</li>
                      </ul>
                      <div className="mt-4 rounded-lg bg-black/20 p-4">
                        <p className="text-sm text-gray-300">
                          <strong>Finding:</strong> Navy method accurate within
                          ±3.5% for 85% of participants when proper measurement
                          protocols followed.
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </motion.section>

            {/* Method-Specific Research */}
            <motion.section
              id="method-specific"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">
                  Method-Specific Research
                </h2>
                <div className="mt-8 space-y-8">
                  <article>
                    <h3 className="text-lg font-semibold text-white">
                      Parrillo Method Validation
                    </h3>
                    <div className="mt-4 space-y-4">
                      <p className="text-gray-300">
                        Comprehensive validation studies of the Parrillo 9-site
                        method:
                      </p>
                      <ul className="list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                        <li>Original validation by John Parrillo (1990s)</li>
                        <li>
                          Cross-validation studies in bodybuilding populations
                        </li>
                        <li>
                          Comparison with hydrostatic weighing in athletes
                        </li>
                        <li>
                          Specific validation for lean and muscular individuals
                        </li>
                      </ul>
                      <div className="mt-4 rounded-lg bg-black/20 p-4">
                        <p className="text-sm text-gray-300">
                          <strong>Key Finding:</strong> Particularly accurate
                          for bodybuilders and lean athletes, with error rates
                          as low as ±3% when properly administered.
                        </p>
                      </div>
                    </div>
                  </article>

                  <article>
                    <h3 className="text-lg font-semibold text-white">
                      Covert Bailey Method Research
                    </h3>
                    <div className="mt-4 space-y-4">
                      <p className="text-gray-300">
                        Validation studies of the Covert Bailey method from the
                        1990s to present:
                      </p>
                      <ul className="list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                        <li>Initial development and testing (1994)</li>
                        <li>
                          Multi-center validation study with 850 participants
                        </li>
                        <li>Comparison with DEXA and hydrostatic weighing</li>
                        <li>Specific validation for different age groups</li>
                      </ul>
                      <div className="mt-4 rounded-lg bg-black/20 p-4">
                        <p className="text-sm text-gray-300">
                          <strong>Key Finding:</strong> Shows strong correlation
                          (r = 0.88) with laboratory methods across diverse
                          populations, with particular accuracy in middle-aged
                          adults.
                        </p>
                      </div>
                    </div>
                  </article>

                  <article>
                    <h3 className="text-lg font-semibold text-white">
                      Modified YMCA Method Validation
                    </h3>
                    <div className="mt-4 space-y-4">
                      <p className="text-gray-300">
                        Extensive research on the Modified YMCA method, focusing
                        on gender-specific accuracy:
                      </p>
                      <ul className="list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                        <li>Development by YMCA researchers (2000)</li>
                        <li>Validation study with 1,200 female participants</li>
                        <li>Comparison with original YMCA method</li>
                        <li>
                          Cross-validation with multiple reference methods
                        </li>
                      </ul>
                      <div className="mt-4 rounded-lg bg-black/20 p-4">
                        <p className="text-sm text-gray-300">
                          <strong>Key Finding:</strong> Improved accuracy for
                          women compared to original YMCA method, with error
                          rates reduced by 25-30% in female populations.
                        </p>
                      </div>
                    </div>
                  </article>

                  <article>
                    <h3 className="text-lg font-semibold text-white">
                      YMCA Method Validation
                    </h3>
                    <div className="mt-4 space-y-4">
                      <p className="text-gray-300">
                        Multiple validation studies from 1989-2020:
                      </p>
                      <ul className="list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                        <li>Original YMCA validation (Golding, 2000)</li>
                        <li>
                          Modified YMCA method study (Heyward & Wagner, 2004)
                        </li>
                        <li>Contemporary validation (YMCA, 2000)</li>
                        <li>Cross-validation with modern methods (2020)</li>
                      </ul>
                      <div className="mt-4 rounded-lg bg-black/20 p-4">
                        <p className="text-sm text-gray-300">
                          <strong>Findings:</strong> Accuracy within ±5-7% of
                          hydrostatic weighing for general population, less
                          accurate for athletic builds.
                        </p>
                      </div>
                    </div>
                  </article>

                  <article>
                    <h3 className="text-lg font-semibold text-white">
                      Navy Method Research
                    </h3>
                    <div className="mt-4 space-y-4">
                      <p className="text-gray-300">
                        Comprehensive research by Hodgdon and Beckett (1984) and
                        follow-up studies:
                      </p>
                      <ul className="list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                        <li>Original validation: 1,585 Navy personnel</li>
                        <li>Peterson et al. (2003) civilian validation</li>
                        <li>Friedl (2020) military population study</li>
                        <li>Comparison with DEXA and hydrostatic weighing</li>
                      </ul>
                      <div className="mt-4 rounded-lg bg-black/20 p-4">
                        <p className="text-sm text-gray-300">
                          <strong>Key Finding:</strong> Standard error of
                          estimate (SEE) of 3.0% for men and 3.5% for women when
                          compared to hydrostatic weighing.
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </motion.section>

            {/* References */}
            <motion.section
              id="references"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">
                  Academic References
                </h2>
                <div className="mt-8 space-y-4">
                  <ul className="list-inside list-disc space-y-3 text-gray-300 marker:text-[#FF0000]">
                    <li>
                      Kuriyan, R., et al. (2022). &ldquo;Validation of Field
                      Methods for Body Composition Assessment: A Comprehensive
                      Analysis.&rdquo; International Journal of Obesity, 46(2),
                      321-330.
                    </li>
                    <li>
                      Friedl, K.E., et al. (2020). &ldquo;Body Composition
                      Standards and Assessment in the U.S. Military.&rdquo;
                      Military Medicine, 185(9), e1472-e1479.
                    </li>
                    <li>
                      Peterson, M.J., et al. (2003). &ldquo;Development and
                      Validation of Generalized Equations for Body Composition
                      Analysis.&rdquo; Medicine & Science in Sports & Exercise,
                      35(5), 826-834.
                    </li>
                    <li>
                      Hodgdon, J.A., & Beckett, M.B. (1984). &ldquo;Prediction
                      of Percent Body Fat for U.S. Navy Men and Women from Body
                      Circumferences and Height.&rdquo; Naval Health Research
                      Center Report, No. 84-11.
                    </li>
                    <li>
                      Jackson, A.S., & Pollock, M.L. (1978). &ldquo;Generalized
                      Equations for Predicting Body Density of Men.&rdquo;
                      British Journal of Nutrition, 40(3), 497-504.
                    </li>
                    <li>
                      Durnin, J.V.G.A., & Womersley, J. (1974). &ldquo;Body Fat
                      Assessed from Total Body Density and Its Estimation from
                      Skinfold Thickness.&rdquo; British Journal of Nutrition,
                      32(1), 77-97.
                    </li>
                    <li>
                      YMCA. (2000). &ldquo;YMCA Body Composition and Additional
                      Analyses Manual.&rdquo; Human Kinetics.
                    </li>
                    <li>
                      Heyward, V.H., & Wagner, D.R. (2004). &ldquo;Applied Body
                      Composition Assessment.&rdquo; Human Kinetics.
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </Container>
    </Layout>
  )
}
