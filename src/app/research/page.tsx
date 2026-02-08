'use client'

import { Container } from '@/components/Container'
import { Layout } from '@/components/Layout'
import { CirclesBackground } from '@/components/CirclesBackground'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/Breadcrumbs'

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
              Comprehensive scientific research, validation studies, and
              systematic reviews of body fat measurement methods. Explore
              detailed analyses of accuracy, reliability, and practical
              applications.
            </p>
          </motion.div>

          {/* Research Categories */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Meta-Analyses & Reviews */}
            <Link
              href="/research/meta-analyses"
              className="group relative overflow-hidden rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-all duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF0000]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative">
                <h2 className="text-xl font-semibold text-white">
                  Meta-Analyses & Reviews
                </h2>
                <p className="mt-2 text-sm text-gray-400">
                  Systematic reviews and meta-analyses of body fat measurement
                  methods, synthesizing findings across multiple studies.
                </p>
              </div>
            </Link>

            {/* Validation Studies */}
            <Link
              href="/research/validation-studies"
              className="group relative overflow-hidden rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-all duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF0000]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative">
                <h2 className="text-xl font-semibold text-white">
                  Validation Studies
                </h2>
                <p className="mt-2 text-sm text-gray-400">
                  Historical and modern validation studies comparing field
                  methods against laboratory standards.
                </p>
              </div>
            </Link>

            {/* Clinical Applications */}
            <Link
              href="/research/clinical-applications"
              className="group relative overflow-hidden rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-all duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF0000]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative">
                <h2 className="text-xl font-semibold text-white">
                  Clinical Applications
                </h2>
                <p className="mt-2 text-sm text-gray-400">
                  Practical applications in healthcare, fitness, and sports
                  medicine.
                </p>
              </div>
            </Link>

            {/* Method Comparison */}
            <Link
              href="/research/comparison"
              className="group relative overflow-hidden rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-all duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF0000]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative">
                <h2 className="text-xl font-semibold text-white">
                  Method Comparison
                </h2>
                <p className="mt-2 text-sm text-gray-400">
                  Comparison of methods, including accuracy ranges and
                  practical considerations.
                </p>
              </div>
            </Link>
          </div>

          {/* Method-Specific Research */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold text-white">
              Method-Specific Research
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: 'Parrillo Method',
                  href: '/research/methods/parrillo',
                  description:
                    'Nine-site method optimized for trained individuals',
                  accuracy: '±3-4%',
                },
                {
                  name: 'Jackson & Pollock',
                  href: '/research/methods/jackson-pollock',
                  description:
                    'Foundational 3-site, 4-site, and 7-site protocols',
                  accuracy: '±3-5%',
                },
                {
                  name: 'Durnin & Womersley',
                  href: '/research/methods/durnin-womersley',
                  description:
                    'Age-specific four-site skinfold equations',
                  accuracy: '±3.5-5%',
                },
                {
                  name: 'Covert Bailey',
                  href: '/research/methods/covert-bailey',
                  description: 'Age- and gender-specific circumference method',
                  accuracy: '±4-5%',
                },
                {
                  name: 'US Navy Method',
                  href: '/research/methods/us-navy',
                  description:
                    'Circumference method using height and key measurements',
                  accuracy: '±4-6%',
                },
                {
                  name: 'YMCA Method',
                  href: '/research/methods/ymca',
                  description: 'Simple circumference-based assessment',
                  accuracy: '±5-7%',
                },
              ].map((method) => (
                <Link
                  key={method.name}
                  href={method.href}
                  className="group relative overflow-hidden rounded-lg bg-white/[0.02] p-4 ring-1 ring-white/10 transition-all duration-300 hover:bg-white/[0.04]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF0000]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-white">
                        {method.name}
                      </h3>
                      <span className="text-xs text-[#4CAF50]">
                        {method.accuracy}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-gray-400">
                      {method.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Research Summary Table */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl font-semibold text-white">
              Research Overview
            </h2>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[800px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-4 py-3 text-sm font-semibold text-white">
                      Category
                    </th>
                    <th className="px-4 py-3 text-sm font-semibold text-white">
                      Scope
                    </th>
                    <th className="px-4 py-3 text-sm font-semibold text-white">
                      Sources
                    </th>
                    <th className="px-4 py-3 text-sm font-semibold text-white">
                      Topics
                    </th>
                    <th className="px-4 py-3 text-sm font-semibold text-white">
                      Timeframe
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  <tr>
                    <td className="px-4 py-3">
                      <Link
                        href="/research/meta-analyses"
                        className="font-medium text-white hover:text-gray-300"
                      >
                        Meta-Analyses
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-gray-300">Major reviews</td>
                    <td className="px-4 py-3 text-gray-300">
                      Multiple cohorts
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      Field vs laboratory method comparisons
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      Recent and foundational reviews
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">
                      <Link
                        href="/research/validation-studies"
                        className="font-medium text-white hover:text-gray-300"
                      >
                        Validation Studies
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      Original and follow-up studies
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      Multiple populations
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      Accuracy ranges and method limitations
                    </td>
                    <td className="px-4 py-3 text-gray-300">1970s-present</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">
                      <Link
                        href="/research/clinical-applications"
                        className="font-medium text-white hover:text-gray-300"
                      >
                        Clinical Applications
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      Clinical and population studies
                    </td>
                    <td className="px-4 py-3 text-gray-300">Various cohorts</td>
                    <td className="px-4 py-3 text-gray-300">
                      Screening and monitoring use cases
                    </td>
                    <td className="px-4 py-3 text-gray-300">Ongoing</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">
                      <Link
                        href="/research/comparison"
                        className="font-medium text-white hover:text-gray-300"
                      >
                        Method Comparisons
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      Comparative reviews
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      Multiple methods
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      Trade-offs in accuracy, time, and equipment
                    </td>
                    <td className="px-4 py-3 text-gray-300">Ongoing</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </Container>
    </Layout>
  )
}
