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
              Comprehensive analysis of body fat measurement methods, their scientific validation,
              and real-world accuracy based on extensive research studies and clinical trials.
            </p>
          </motion.div>

          <div className="space-y-12">
            {/* Research-Validated Methods */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">
                  Research-Validated Methods
                </h2>
                <div className="mt-8">
                  <div className="overflow-x-auto rounded-lg bg-black/20 ring-1 ring-white/10">
                    <table className="min-w-full">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-white border-b border-white/10">
                            Method
                          </th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-white border-b border-white/10">
                            Accuracy Range
                          </th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-white border-b border-white/10">
                            Validation Studies
                          </th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-white border-b border-white/10">
                            Best Use Case
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Jackson & Pollock 7-Site
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">±3-4%</td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            1,500+ subjects, r > 0.94 correlation
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Research & professional assessment
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Durnin & Womersley
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">±3.5-5%</td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            481 subjects aged 16-72
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Clinical research & age-specific assessment
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            U.S. Navy Method
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">±4-6%</td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            5,000+ military personnel
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Population-level screening
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            YMCA Method
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">±5-7%</td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            YMCA fitness research database
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            General tracking & trends
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Scientific Validation */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">
                  Scientific Validation & Research
                </h2>
                <div className="mt-8 space-y-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        Primary Research Studies
                      </h3>
                      <p className="mt-2 text-gray-300">
                        Our methods are backed by peer-reviewed research published in leading journals:
                      </p>
                      <ul className="mt-4 list-inside list-disc space-y-2 marker:text-[#FF0000] text-gray-300">
                        <li>British Journal of Nutrition (1978): Original Jackson & Pollock validation</li>
                        <li>Medicine & Science in Sports & Exercise (1980): Gender-specific equations</li>
                        <li>American Journal of Clinical Nutrition (1992): Five-level model validation</li>
                        <li>Naval Health Research Center Report (1984): U.S. Navy method development</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        Population Studies
                      </h3>
                      <p className="mt-2 text-gray-300">
                        Extensive validation across diverse populations:
                      </p>
                      <ul className="mt-4 list-inside list-disc space-y-2 marker:text-[#FF0000] text-gray-300">
                        <li>Age ranges: 16-72 years</li>
                        <li>Body types: Athletic to obese</li>
                        <li>Gender-specific validations</li>
                        <li>Multiple ethnic groups</li>
                        <li>Various fitness levels</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Method-Specific Accuracy */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">
                  Method-Specific Accuracy Analysis
                </h2>
                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Skinfold Methods
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 marker:text-[#FF0000] text-gray-300">
                      <li>Highest accuracy when properly performed</li>
                      <li>Strong correlation with hydrostatic weighing</li>
                      <li>Requires standardized measurement sites</li>
                      <li>Technician skill significantly impacts results</li>
                      <li>Multiple measurements improve reliability</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Circumference Methods
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 marker:text-[#FF0000] text-gray-300">
                      <li>More consistent between testers</li>
                      <li>Less affected by hydration status</li>
                      <li>Validated for population screening</li>
                      <li>Limited by body-type variations</li>
                      <li>Ideal for tracking changes over time</li>
                    </ul>
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
                  Accuracy Optimization Guidelines
                </h2>
                <div className="mt-8 space-y-6">
                  <p className="text-gray-300">
                    Research-based recommendations for maximizing measurement accuracy:
                  </p>
                  <div className="grid gap-8 sm:grid-cols-2">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        Technical Optimization
                      </h3>
                      <ul className="mt-4 list-inside list-disc space-y-2 marker:text-[#FF0000] text-gray-300">
                        <li>Use calibrated measurement tools</li>
                        <li>Follow standardized protocols</li>
                        <li>Maintain consistent measurement sites</li>
                        <li>Take multiple measurements</li>
                        <li>Average repeated measurements</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        Physiological Considerations
                      </h3>
                      <ul className="mt-4 list-inside list-disc space-y-2 marker:text-[#FF0000] text-gray-300">
                        <li>Measure at same time of day</li>
                        <li>Control for hydration status</li>
                        <li>Account for recent exercise</li>
                        <li>Consider menstrual cycle effects</li>
                        <li>Note seasonal variations</li>
                      </ul>
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