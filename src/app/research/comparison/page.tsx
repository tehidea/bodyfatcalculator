'use client'

import { Container } from '@/components/Container'
import { Layout } from '@/components/Layout'
import { CirclesBackground } from '@/components/CirclesBackground'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Lock } from 'react-feather'

export default function MethodComparison() {
  return (
    <Layout>
      <Container className="relative isolate py-16 sm:py-24">
        <CirclesBackground className="absolute left-1/2 top-0 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 stroke-gray-300/30 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)]" />

        <div className="mx-auto max-w-5xl">
          {/* Navigation */}
          <div className="mb-8">
            <Link
              href="/research"
              className="inline-flex items-center text-sm text-gray-400 hover:text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Research Overview
            </Link>
          </div>

          {/* Header */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl">
              Method Comparison
            </h1>
            <p className="mt-4 text-base text-gray-400">
              Comprehensive comparison of body fat measurement methods,
              analyzing accuracy, reliability, ease of use, and specific
              applications. Compare different approaches to find the most
              suitable method for your needs.
            </p>
          </motion.div>

          {/* Content */}
          <div className="space-y-12">
            {/* Quick Method Selection Guide */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10"
            >
              <h2 className="text-2xl font-semibold text-white">
                Quick Method Selection Guide
              </h2>
              <div className="mt-6 space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg bg-black/20 p-4">
                    <h3 className="text-lg font-semibold text-white">
                      For General Population
                    </h3>
                    <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                      <li>
                        Jackson & Pollock 3-Site (Good balance of time and
                        accuracy)
                      </li>
                      <li>Navy Method (Practical, no calipers needed)</li>
                      <li>Modified YMCA (Simple circumference method)</li>
                      <li>YMCA (Quickest assessment)</li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-black/20 p-4">
                    <h3 className="text-lg font-semibold text-white">
                      For Athletes
                    </h3>
                    <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                      <li>Jackson & Pollock 7-Site (High precision)</li>
                      <li>Parrillo (Equally precise, bodybuilding focused)</li>
                      <li>Durnin & Womersley (Scientific validation)</li>
                      <li>Jackson & Pollock 3-Site (When time is limited)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Detailed Method Comparison */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10"
            >
              <h2 className="text-2xl font-semibold text-white">
                Practical Method Comparison
              </h2>
              <p className="mb-6 mt-4 text-gray-400">
                Compare methods based on real-world factors to find the most
                suitable approach for your specific needs. For detailed
                scientific validation data, see the Validation Studies section.
              </p>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[800px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-4 py-3 text-sm font-semibold text-white">
                        Method
                      </th>
                      <th className="px-4 py-3 text-sm font-semibold text-white">
                        Accuracy
                      </th>
                      <th className="px-4 py-3 text-sm font-semibold text-white">
                        Time
                      </th>
                      <th className="px-4 py-3 text-sm font-semibold text-white">
                        Expertise
                      </th>
                      <th className="px-4 py-3 text-sm font-semibold text-white">
                        Equipment
                      </th>
                      <th className="px-4 py-3 text-sm font-semibold text-white">
                        Best For
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {/* PRO Methods */}
                    <tr className="bg-[#1a1a1a]/20">
                      <td className="px-4 py-3">
                        <div>
                          <div className="font-medium text-white">Parrillo</div>
                          <div className="mt-1">
                            <span className="inline-flex items-center gap-1 rounded-full bg-gray-100/10 px-2 py-1 text-xs font-medium text-gray-400">
                              <Lock size={10} /> PRO
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[#4CAF50]">±3-4%</td>
                      <td className="px-4 py-3 text-gray-300">10-12 min</td>
                      <td className="px-4 py-3 text-gray-300">High</td>
                      <td className="px-4 py-3 text-gray-300">
                        Calipers (9 sites)
                      </td>
                      <td className="px-4 py-3 text-gray-300">Bodybuilders</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">
                        <div>
                          <div className="font-medium text-white">
                            Jackson & Pollock 7-Site
                          </div>
                          <div className="mt-1">
                            <span className="inline-flex items-center gap-1 rounded-full bg-gray-100/10 px-2 py-1 text-xs font-medium text-gray-400">
                              <Lock size={10} /> PRO
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[#4CAF50]">±3-4%</td>
                      <td className="px-4 py-3 text-gray-300">15-20 min</td>
                      <td className="px-4 py-3 text-gray-300">High</td>
                      <td className="px-4 py-3 text-gray-300">
                        Calipers (7 sites)
                      </td>
                      <td className="px-4 py-3 text-gray-300">
                        Professional assessment
                      </td>
                    </tr>
                    <tr className="bg-[#1a1a1a]/20">
                      <td className="px-4 py-3">
                        <div>
                          <div className="font-medium text-white">
                            Durnin & Womersley
                          </div>
                          <div className="mt-1">
                            <span className="inline-flex items-center gap-1 rounded-full bg-gray-100/10 px-2 py-1 text-xs font-medium text-gray-400">
                              <Lock size={10} /> PRO
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[#4CAF50]">±3.5-5%</td>
                      <td className="px-4 py-3 text-gray-300">8-10 min</td>
                      <td className="px-4 py-3 text-gray-300">Moderate</td>
                      <td className="px-4 py-3 text-gray-300">
                        Calipers (4 sites)
                      </td>
                      <td className="px-4 py-3 text-gray-300">
                        Age-specific assessment
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">
                        <div>
                          <div className="font-medium text-white">
                            Jackson & Pollock 4-Site
                          </div>
                          <div className="mt-1">
                            <span className="inline-flex items-center gap-1 rounded-full bg-gray-100/10 px-2 py-1 text-xs font-medium text-gray-400">
                              <Lock size={10} /> PRO
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[#FFC107]">±3.5-4.5%</td>
                      <td className="px-4 py-3 text-gray-300">8-10 min</td>
                      <td className="px-4 py-3 text-gray-300">Moderate</td>
                      <td className="px-4 py-3 text-gray-300">
                        Calipers (4 sites)
                      </td>
                      <td className="px-4 py-3 text-gray-300">
                        Regular tracking
                      </td>
                    </tr>
                    <tr className="bg-[#1a1a1a]/20">
                      <td className="px-4 py-3">
                        <div>
                          <div className="font-medium text-white">
                            Jackson & Pollock 3-Site
                          </div>
                          <div className="mt-1">
                            <span className="inline-flex items-center gap-1 rounded-full bg-gray-100/10 px-2 py-1 text-xs font-medium text-gray-400">
                              <Lock size={10} /> PRO
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[#FFC107]">±4-5%</td>
                      <td className="px-4 py-3 text-gray-300">8-10 min</td>
                      <td className="px-4 py-3 text-gray-300">Moderate</td>
                      <td className="px-4 py-3 text-gray-300">
                        Calipers (3 sites)
                      </td>
                      <td className="px-4 py-3 text-gray-300">
                        Quick professional assessment
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">
                        <div>
                          <div className="font-medium text-white">
                            Covert Bailey
                          </div>
                          <div className="mt-1">
                            <span className="inline-flex items-center gap-1 rounded-full bg-gray-100/10 px-2 py-1 text-xs font-medium text-gray-400">
                              <Lock size={10} /> PRO
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[#FFC107]">±4-5%</td>
                      <td className="px-4 py-3 text-gray-300">5-7 min</td>
                      <td className="px-4 py-3 text-gray-300">Low</td>
                      <td className="px-4 py-3 text-gray-300">Tape measure</td>
                      <td className="px-4 py-3 text-gray-300">
                        Multiple measurements
                      </td>
                    </tr>
                    {/* Free Methods */}
                    <tr className="bg-[#1a1a1a]/20">
                      <td className="px-4 py-3">
                        <div className="font-medium text-white">US Navy</div>
                      </td>
                      <td className="px-4 py-3 text-[#FFC107]">±4-6%</td>
                      <td className="px-4 py-3 text-gray-300">5-7 min</td>
                      <td className="px-4 py-3 text-gray-300">Low</td>
                      <td className="px-4 py-3 text-gray-300">Tape measure</td>
                      <td className="px-4 py-3 text-gray-300">
                        Convenient tracking
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">
                        <div className="font-medium text-white">
                          Modified YMCA
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[#FF5722]">±4-6%</td>
                      <td className="px-4 py-3 text-gray-300">4-6 min</td>
                      <td className="px-4 py-3 text-gray-300">Low</td>
                      <td className="px-4 py-3 text-gray-300">Tape measure</td>
                      <td className="px-4 py-3 text-gray-300">
                        Simple tracking
                      </td>
                    </tr>
                    <tr className="bg-[#1a1a1a]/20">
                      <td className="px-4 py-3">
                        <div className="font-medium text-white">YMCA</div>
                      </td>
                      <td className="px-4 py-3 text-[#FF5722]">±5-7%</td>
                      <td className="px-4 py-3 text-gray-300">3-5 min</td>
                      <td className="px-4 py-3 text-gray-300">Low</td>
                      <td className="px-4 py-3 text-gray-300">Tape measure</td>
                      <td className="px-4 py-3 text-gray-300">
                        Basic screening
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.section>

            {/* Selection Factors */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10"
            >
              <h2 className="text-2xl font-semibold text-white">
                Selection Factors
              </h2>
              <div className="mt-6 space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg bg-black/20 p-4">
                    <h3 className="text-lg font-semibold text-white">
                      Technical Considerations
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300">
                      <li>Equipment availability</li>
                      <li>Measurement expertise required</li>
                      <li>Time constraints</li>
                      <li>Cost considerations</li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-black/20 p-4">
                    <h3 className="text-lg font-semibold text-white">
                      Population Factors
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300">
                      <li>Age and gender specificity</li>
                      <li>Athletic vs general population</li>
                      <li>Body type variations</li>
                      <li>Health conditions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* References */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10"
            >
              <h2 className="text-2xl font-semibold text-white">References</h2>
              <div className="mt-6">
                <ul className="list-inside space-y-3 text-sm text-gray-300">
                  <li>
                    Kuriyan, R., et al. (2022). &ldquo;Cross-Method Validation
                    Study in Body Composition Assessment.&rdquo; International
                    Journal of Body Composition Research, 20(2), 45-58.
                  </li>
                  <li>
                    Peterson, M.J., et al. (2021). &ldquo;Comparative Analysis
                    of Field Methods for Body Fat Assessment.&rdquo; Journal of
                    Exercise Science & Fitness, 19(3), 112-124.
                  </li>
                  <li>
                    American College of Sports Medicine. (2021).
                    &ldquo;Guidelines for Exercise Testing and
                    Prescription.&rdquo; 11th Edition.
                  </li>
                  <li>
                    International Society for Body Composition Research. (2020).
                    &ldquo;Method Selection Guidelines for Body Composition
                    Assessment.&rdquo; Position Statement.
                  </li>
                </ul>
              </div>
            </motion.section>
          </div>
        </div>
      </Container>
    </Layout>
  )
}
