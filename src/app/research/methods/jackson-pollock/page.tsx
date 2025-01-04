'use client'

import { Container } from '@/components/Container'
import { Layout } from '@/components/Layout'
import { CirclesBackground } from '@/components/CirclesBackground'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'react-feather'

export default function JacksonPollock() {
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
              Jackson & Pollock Methods
            </h1>
            <p className="mt-4 text-base text-gray-400">
              Comprehensive analysis of the Jackson & Pollock skinfold
              protocols, including their development, validation, and practical
              applications. Explore the scientific basis and accuracy of the
              7-site, 4-site, and 3-site methods.
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
                    Original Research (1978-1980)
                  </h3>
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-300">
                      Development of generalized body density equations through
                      comprehensive research:
                    </p>
                    <ul className="list-inside list-disc space-y-2 text-gray-300">
                      <li>Over 1,500 subjects studied</li>
                      <li>Age range: 18-61 years</li>
                      <li>Multiple ethnic groups included</li>
                      <li>Validated against hydrostatic weighing</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Method Evolution
                  </h3>
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-300">
                      Progressive development of simplified protocols:
                    </p>
                    <div className="rounded-lg bg-black/20 p-4">
                      <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                        <li>
                          7-site method (1978): Original comprehensive protocol
                        </li>
                        <li>4-site method (1979): Optimized for efficiency</li>
                        <li>3-site method (1980): Simplified for field use</li>
                        <li>Population-specific equations (1985)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Protocol Details */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10"
            >
              <h2 className="text-2xl font-semibold text-white">
                Protocol Details
              </h2>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    7-Site Protocol
                  </h3>
                  <div className="mt-4 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-lg bg-black/20 p-4">
                        <h4 className="font-medium text-white">
                          Measurement Sites
                        </h4>
                        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                          <li>Chest</li>
                          <li>Midaxillary</li>
                          <li>Triceps</li>
                          <li>Subscapular</li>
                          <li>Abdomen</li>
                          <li>Suprailiac</li>
                          <li>Thigh</li>
                        </ul>
                      </div>
                      <div className="rounded-lg bg-black/20 p-4">
                        <h4 className="font-medium text-white">
                          Statistical Validity
                        </h4>
                        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                          <li>R² = 0.90-0.92</li>
                          <li>SEE: ±3.0% body fat</li>
                          <li>Test-retest reliability: r = 0.98</li>
                          <li>Cross-validated with DEXA</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white">
                    4-Site Protocol
                  </h3>
                  <div className="mt-4 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-lg bg-black/20 p-4">
                        <h4 className="font-medium text-white">
                          Measurement Sites
                        </h4>
                        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                          <li>Abdomen</li>
                          <li>Triceps</li>
                          <li>Suprailiac</li>
                          <li>Thigh</li>
                        </ul>
                      </div>
                      <div className="rounded-lg bg-black/20 p-4">
                        <h4 className="font-medium text-white">
                          Statistical Validity
                        </h4>
                        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                          <li>R² = 0.88-0.90</li>
                          <li>SEE: ±3.4% body fat</li>
                          <li>Test-retest reliability: r = 0.96</li>
                          <li>Validated across populations</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white">
                    3-Site Protocol
                  </h3>
                  <div className="mt-4 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-lg bg-black/20 p-4">
                        <h4 className="font-medium text-white">
                          Measurement Sites
                        </h4>
                        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                          <li>Chest (men) / Triceps (women)</li>
                          <li>Abdomen (men) / Suprailiac (women)</li>
                          <li>Thigh (both)</li>
                        </ul>
                      </div>
                      <div className="rounded-lg bg-black/20 p-4">
                        <h4 className="font-medium text-white">
                          Statistical Validity
                        </h4>
                        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                          <li>R² = 0.85-0.88</li>
                          <li>SEE: ±3.9% body fat</li>
                          <li>Test-retest reliability: r = 0.94</li>
                          <li>Good field reliability</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Modern Applications */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10"
            >
              <h2 className="text-2xl font-semibold text-white">
                Modern Applications
              </h2>
              <div className="mt-6 space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg bg-black/20 p-4">
                    <h3 className="text-lg font-semibold text-white">
                      Clinical Settings
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300">
                      <li>Health risk assessment</li>
                      <li>Nutritional counseling</li>
                      <li>Treatment monitoring</li>
                      <li>Research applications</li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-black/20 p-4">
                    <h3 className="text-lg font-semibold text-white">
                      Athletic Applications
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300">
                      <li>Performance optimization</li>
                      <li>Training program design</li>
                      <li>Competition preparation</li>
                      <li>Recovery monitoring</li>
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
                    Jackson, A.S., & Pollock, M.L. (1978). &ldquo;Generalized
                    equations for predicting body density of men.&rdquo; British
                    Journal of Nutrition, 40(3), 497-504.
                  </li>
                  <li>
                    Jackson, A.S., Pollock, M.L., & Ward, A. (1980).
                    &ldquo;Generalized equations for predicting body density of
                    women.&rdquo; Medicine and Science in Sports and Exercise,
                    12(3), 175-182.
                  </li>
                  <li>
                    Peterson, M.J., et al. (2003). &ldquo;Development and
                    Validation of Skinfold-Thickness Prediction Equations with a
                    4-Compartment Model.&rdquo; American Journal of Clinical
                    Nutrition, 77(5), 1186-1191.
                  </li>
                  <li>
                    Eston, R.G., & Reilly, T. (2009). &ldquo;Kinanthropometry
                    and Exercise Physiology Laboratory Manual: Tests, Procedures
                    and Data.&rdquo; Routledge, 3rd Edition.
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
