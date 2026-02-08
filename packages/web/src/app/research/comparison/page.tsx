'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'react-feather'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { CirclesBackground } from '@/components/CirclesBackground'
import { Container } from '@/components/Container'
import { Layout } from '@/components/Layout'

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
              Comparison of body fat measurement methods based on published research and commonly
              reported accuracy ranges.
            </p>
          </motion.div>

          {/* Content */}
          <div className="space-y-12">
            {/* Method Selection Guide */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10"
            >
              <h2 className="text-2xl font-semibold text-white">Method Selection Guide</h2>
              <div className="mt-6 space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg bg-black/20 p-4">
                    <h3 className="text-lg font-semibold text-white">General Population Methods</h3>
                    <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                      <li>Durnin-Womersley (age-specific equations)</li>
                      <li>U.S. Navy Method (field-friendly circumference)</li>
                      <li>Jackson-Pollock 3-Site (Balance of accuracy and time)</li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-black/20 p-4">
                    <h3 className="text-lg font-semibold text-white">Research-Grade Methods</h3>
                    <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                      <li>Jackson-Pollock 7-Site (Comprehensive assessment)</li>
                      <li>DEXA (Laboratory reference method)</li>
                      <li>Hydrostatic Weighing (Traditional reference)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Method Comparison */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10"
            >
              <h2 className="text-2xl font-semibold text-white">Validated Methods Comparison</h2>
              <p className="mb-6 mt-4 text-gray-400">
                Comparison based on reported accuracy ranges and method requirements. Results depend
                on measurement technique.
              </p>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[800px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-4 py-3 text-sm font-semibold text-white">Method</th>
                      <th className="px-4 py-3 text-sm font-semibold text-white">Accuracy Range</th>
                      <th className="px-4 py-3 text-sm font-semibold text-white">Sites</th>
                      <th className="px-4 py-3 text-sm font-semibold text-white">Equipment</th>
                      <th className="px-4 py-3 text-sm font-semibold text-white">Source</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    <tr>
                      <td className="px-4 py-3">
                        <div className="font-medium text-white">Jackson-Pollock 7-Site</div>
                      </td>
                      <td className="px-4 py-3 text-[#4CAF50]">±3-4%</td>
                      <td className="px-4 py-3 text-gray-300">7 skinfolds</td>
                      <td className="px-4 py-3 text-gray-300">Calipers</td>
                      <td className="px-4 py-3 text-gray-300">Jackson & Pollock (1978)</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">
                        <div className="font-medium text-white">Durnin-Womersley</div>
                      </td>
                      <td className="px-4 py-3 text-[#4CAF50]">±3.5-5%</td>
                      <td className="px-4 py-3 text-gray-300">4 skinfolds</td>
                      <td className="px-4 py-3 text-gray-300">Calipers</td>
                      <td className="px-4 py-3 text-gray-300">Durnin & Womersley (1974)</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">
                        <div className="font-medium text-white">Jackson-Pollock 3-Site</div>
                      </td>
                      <td className="px-4 py-3 text-[#FFC107]">±4-5%</td>
                      <td className="px-4 py-3 text-gray-300">3 skinfolds</td>
                      <td className="px-4 py-3 text-gray-300">Calipers</td>
                      <td className="px-4 py-3 text-gray-300">Jackson & Pollock (1978)</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">
                        <div className="font-medium text-white">US Navy</div>
                      </td>
                      <td className="px-4 py-3 text-[#FFC107]">±4-6%</td>
                      <td className="px-4 py-3 text-gray-300">Circumferences</td>
                      <td className="px-4 py-3 text-gray-300">Tape measure</td>
                      <td className="px-4 py-3 text-gray-300">Hodgdon & Beckett (1984)</td>
                    </tr>
                  </tbody>
                </table>
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
                    Wagner, D.R., & Heyward, V.H. (1999). &ldquo;Techniques of body composition
                    assessment: a review of laboratory and field methods.&rdquo; Research Quarterly
                    for Exercise and Sport, 70(2), 135-149.
                  </li>
                  <li>
                    Jackson, A.S., & Pollock, M.L. (1978). &ldquo;Generalized equations for
                    predicting body density of men.&rdquo; British Journal of Nutrition, 40(3),
                    497-504.
                  </li>
                  <li>
                    Durnin, J.V.G.A., & Womersley, J. (1974). &ldquo;Body fat assessed from total
                    body density and its estimation from skinfold thickness.&rdquo; British Journal
                    of Nutrition, 32(1), 77-97.
                  </li>
                  <li>
                    Hodgdon, J.A., & Beckett, M.B. (1984). &ldquo;Prediction of percent body fat for
                    U.S. Navy men and women.&rdquo; Naval Health Research Center Report, No. 84-29.
                  </li>
                </ul>
              </div>
            </motion.section>

            <Breadcrumbs
              items={[
                {
                  label: 'Research',
                  href: '/research',
                },
                {
                  label: 'Method Comparison',
                  href: '/research/comparison',
                },
              ]}
            />
          </div>
        </div>
      </Container>
    </Layout>
  )
}
