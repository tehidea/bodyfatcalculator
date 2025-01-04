'use client'

import { Container } from '@/components/Container'
import { Layout } from '@/components/Layout'
import { CirclesBackground } from '@/components/CirclesBackground'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'react-feather'

export default function ParrilloMethod() {
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
              Parrillo Method
            </h1>
            <p className="mt-4 text-base text-gray-400">
              Comprehensive analysis of the Parrillo body fat assessment method,
              developed specifically for bodybuilders and athletes. Explore its
              unique approach to measuring body composition in lean individuals
              and its applications in competitive sports.
            </p>
          </motion.div>

          {/* Content */}
          <div className="space-y-12">
            {/* Historical Development */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10"
            >
              <h2 className="text-2xl font-semibold text-white">
                Historical Development
              </h2>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Method Origins
                  </h3>
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-300">
                      Development of the Parrillo method through competitive
                      bodybuilding experience:
                    </p>
                    <ul className="list-inside list-disc space-y-2 text-gray-300">
                      <li>Created by John Parrillo in the 1980s</li>
                      <li>Focus on competitive bodybuilders</li>
                      <li>Emphasis on lean mass assessment</li>
                      <li>Integration with training protocols</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Method Evolution
                  </h3>
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-300">
                      Refinement through practical application:
                    </p>
                    <div className="rounded-lg bg-black/20 p-4">
                      <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                        <li>Initial bodybuilding focus</li>
                        <li>Expansion to other sports</li>
                        <li>Competition preparation protocols</li>
                        <li>Integration with nutrition planning</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Method Details */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10"
            >
              <h2 className="text-2xl font-semibold text-white">
                Method Details
              </h2>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Measurement Protocol
                  </h3>
                  <div className="mt-4 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-lg bg-black/20 p-4">
                        <h4 className="font-medium text-white">
                          Measurement Sites
                        </h4>
                        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                          <li>Quadriceps</li>
                          <li>Hamstrings</li>
                          <li>Suprailiac</li>
                          <li>Lower back</li>
                          <li>Abdominal</li>
                          <li>Chest</li>
                          <li>Triceps</li>
                          <li>Subscapular</li>
                          <li>Axilla</li>
                        </ul>
                      </div>
                      <div className="rounded-lg bg-black/20 p-4">
                        <h4 className="font-medium text-white">
                          Special Considerations
                        </h4>
                        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                          <li>Multiple site measurements</li>
                          <li>Lean tissue emphasis</li>
                          <li>Competition timing</li>
                          <li>Hydration status</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Statistical Validation
                  </h3>
                  <div className="mt-4 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-lg bg-black/20 p-4">
                        <h4 className="font-medium text-white">
                          Athletic Population
                        </h4>
                        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                          <li>Correlation with DEXA: r = 0.94</li>
                          <li>SEE: ±1.5-2% body fat</li>
                          <li>Test-retest reliability: r = 0.98</li>
                          <li>Sample size: 500+ athletes</li>
                        </ul>
                      </div>
                      <div className="rounded-lg bg-black/20 p-4">
                        <h4 className="font-medium text-white">
                          General Population
                        </h4>
                        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                          <li>Correlation with HW: r = 0.86</li>
                          <li>SEE: ±3-4% body fat</li>
                          <li>Test-retest reliability: r = 0.95</li>
                          <li>Sample size: 300+ individuals</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Athletic Applications */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10"
            >
              <h2 className="text-2xl font-semibold text-white">
                Athletic Applications
              </h2>
              <div className="mt-6 space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg bg-black/20 p-4">
                    <h3 className="text-lg font-semibold text-white">
                      Competition Preparation
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300">
                      <li>Peak week monitoring</li>
                      <li>Progress tracking</li>
                      <li>Diet adjustments</li>
                      <li>Conditioning assessment</li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-black/20 p-4">
                    <h3 className="text-lg font-semibold text-white">
                      Training Applications
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300">
                      <li>Program optimization</li>
                      <li>Nutrition planning</li>
                      <li>Recovery monitoring</li>
                      <li>Performance enhancement</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Advantages and Limitations */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10"
            >
              <h2 className="text-2xl font-semibold text-white">
                Advantages and Limitations
              </h2>
              <div className="mt-6 space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg bg-black/20 p-4">
                    <h3 className="text-lg font-semibold text-white">
                      Key Advantages
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300">
                      <li>High accuracy for athletes</li>
                      <li>Comprehensive assessment</li>
                      <li>Competition-specific</li>
                      <li>Detailed body mapping</li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-black/20 p-4">
                    <h3 className="text-lg font-semibold text-white">
                      Limitations
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300">
                      <li>Time-intensive protocol</li>
                      <li>Requires expertise</li>
                      <li>Equipment dependent</li>
                      <li>Less suitable for general population</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* References */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10"
            >
              <h2 className="text-2xl font-semibold text-white">References</h2>
              <div className="mt-6">
                <ul className="list-inside space-y-3 text-sm text-gray-300">
                  <li>
                    Parrillo, J. (1993). &ldquo;High-Performance
                    Body-Building.&rdquo; Parrillo Performance Press.
                  </li>
                  <li>
                    Clark, N., et al. (2000). &ldquo;Comparison of the Parrillo
                    method with hydrostatic weighing in competitive
                    bodybuilders.&rdquo; Journal of Strength and Conditioning
                    Research, 14(4), 457-461.
                  </li>
                  <li>
                    Norton, L., & Wilson, G. (2009). &ldquo;Optimal body
                    composition measurements in athletes.&rdquo; Strength and
                    Conditioning Journal, 31(1), 78-85.
                  </li>
                  <li>
                    Helms, E., et al. (2014). &ldquo;Evidence-based
                    recommendations for natural bodybuilding contest
                    preparation.&rdquo; Journal of the International Society of
                    Sports Nutrition, 11(1), 20.
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
