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
              Comprehensive analysis of scientific research, validation studies, and academic references
              supporting our body fat measurement methods.
            </p>
          </motion.div>

          <div className="space-y-12">
            {/* Validation Studies */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">
                  Key Validation Studies
                </h2>
                <div className="mt-8 space-y-8">
                  <article>
                    <h3 className="text-lg font-semibold text-white">
                      Jackson & Pollock Methods (1978-1980)
                    </h3>
                    <div className="mt-4 space-y-4">
                      <p className="text-gray-300">
                        Landmark studies establishing the gold standard for skinfold measurements:
                      </p>
                      <ul className="list-inside list-disc space-y-2 marker:text-[#FF0000] text-gray-300">
                        <li>1,500+ subjects across multiple demographics</li>
                        <li>Correlation coefficient r > 0.94 with hydrostatic weighing</li>
                        <li>Cross-validated against DEXA and underwater weighing</li>
                        <li>Age ranges: 18-61 years</li>
                        <li>BMI ranges: 19-35</li>
                      </ul>
                    </div>
                  </article>

                  <article>
                    <h3 className="text-lg font-semibold text-white">
                      Durnin & Womersley Study (1974)
                    </h3>
                    <div className="mt-4 space-y-4">
                      <p className="text-gray-300">
                        Comprehensive age and gender-specific research:
                      </p>
                      <ul className="list-inside list-disc space-y-2 marker:text-[#FF0000] text-gray-300">
                        <li>481 subjects aged 16-72 years</li>
                        <li>First study to account for age-related changes</li>
                        <li>Validated across five age groups</li>
                        <li>Established age-specific regression equations</li>
                        <li>Correlation r > 0.90 with laboratory methods</li>
                      </ul>
                    </div>
                  </article>

                  <article>
                    <h3 className="text-lg font-semibold text-white">
                      U.S. Navy Research Program (1984)
                    </h3>
                    <div className="mt-4 space-y-4">
                      <p className="text-gray-300">
                        Military population validation study:
                      </p>
                      <ul className="list-inside list-disc space-y-2 marker:text-[#FF0000] text-gray-300">
                        <li>5,000+ active duty personnel</li>
                        <li>Diverse ethnic backgrounds</li>
                        <li>Multiple body composition types</li>
                        <li>Standardized measurement protocols</li>
                        <li>Field-tested in various conditions</li>
                      </ul>
                    </div>
                  </article>
                </div>
              </div>
            </motion.section>

            {/* Methodology Comparison */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">
                  Research Methodology Comparison
                </h2>
                <div className="mt-8">
                  <div className="overflow-x-auto rounded-lg bg-black/20 ring-1 ring-white/10">
                    <table className="min-w-full">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-white border-b border-white/10">
                            Study Type
                          </th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-white border-b border-white/10">
                            Sample Size
                          </th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-white border-b border-white/10">
                            Validation Method
                          </th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-white border-b border-white/10">
                            Key Findings
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Clinical Trials
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">2,500+</td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Hydrostatic Weighing
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            High correlation (r > 0.94)
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Field Studies
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">5,000+</td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            DEXA Comparison
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            ±3-4% accuracy range
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Longitudinal Studies
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">1,000+</td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Multi-method Comparison
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Consistent over time
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Research Impact */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">
                  Research Impact & Applications
                </h2>
                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Clinical Applications
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 marker:text-[#FF0000] text-gray-300">
                      <li>Health risk assessment</li>
                      <li>Nutritional status monitoring</li>
                      <li>Disease prevention strategies</li>
                      <li>Treatment outcome tracking</li>
                      <li>Population health screening</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Research Applications
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 marker:text-[#FF0000] text-gray-300">
                      <li>Epidemiological studies</li>
                      <li>Intervention research</li>
                      <li>Longitudinal tracking</li>
                      <li>Cross-sectional analysis</li>
                      <li>Method validation studies</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Academic References */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">
                  Academic References & Citations
                </h2>
                <div className="mt-8 space-y-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        Primary Research Papers
                      </h3>
                      <ul className="mt-4 list-inside list-disc space-y-2 marker:text-[#FF0000] text-gray-300">
                        <li>Jackson & Pollock (1978) - British Journal of Nutrition</li>
                        <li>Durnin & Womersley (1974) - British Journal of Nutrition</li>
                        <li>Wang et al. (1992) - American Journal of Clinical Nutrition</li>
                        <li>Hodgdon & Beckett (1984) - Naval Health Research Center</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        Meta-Analyses & Reviews
                      </h3>
                      <ul className="mt-4 list-inside list-disc space-y-2 marker:text-[#FF0000] text-gray-300">
                        <li>Systematic review of body composition methods</li>
                        <li>Comparative analysis of field techniques</li>
                        <li>Population-specific validation studies</li>
                        <li>Long-term reliability assessments</li>
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