'use client'

import { Container } from '@/components/Container'
import { Layout } from '@/components/Layout'
import { CirclesBackground } from '@/components/CirclesBackground'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'react-feather'

export default function CovertBaileyMethod() {
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
              Covert Bailey Method
            </h1>
            <p className="mt-4 text-base text-gray-400">
              Comprehensive analysis of the Covert Bailey body fat assessment
              method, known for its practical approach to fitness and body
              composition measurement. Explore its development, validation
              studies, and applications in general fitness assessment.
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
                      Development of the Covert Bailey method through fitness
                      research and practical application:
                    </p>
                    <ul className="list-inside list-disc space-y-2 text-gray-300">
                      <li>Developed in the late 1970s</li>
                      <li>Focus on practical fitness assessment</li>
                      <li>Integration with metabolic studies</li>
                      <li>Emphasis on accessibility</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Method Evolution
                  </h3>
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-300">
                      Refinement and validation over time:
                    </p>
                    <div className="rounded-lg bg-black/20 p-4">
                      <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                        <li>Initial fitness center implementation</li>
                        <li>Research validation studies</li>
                        <li>Integration with fitness programs</li>
                        <li>Modern adaptations</li>
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
                          Primary Measurements
                        </h4>
                        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                          <li>Waist circumference</li>
                          <li>Hip circumference</li>
                          <li>Thigh circumference</li>
                          <li>Upper arm circumference</li>
                          <li>Wrist circumference</li>
                        </ul>
                      </div>
                      <div className="rounded-lg bg-black/20 p-4">
                        <h4 className="font-medium text-white">
                          Additional Factors
                        </h4>
                        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                          <li>Age considerations</li>
                          <li>Gender adjustments</li>
                          <li>Activity level</li>
                          <li>Body frame size</li>
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
                          Initial Studies
                        </h4>
                        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                          <li>Correlation with HW: r = 0.85</li>
                          <li>SEE: ±4-5% body fat</li>
                          <li>Test-retest reliability: r = 0.93</li>
                          <li>Sample size: 800+ individuals</li>
                        </ul>
                      </div>
                      <div className="rounded-lg bg-black/20 p-4">
                        <h4 className="font-medium text-white">
                          Follow-up Research
                        </h4>
                        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                          <li>DEXA comparisons</li>
                          <li>Population studies</li>
                          <li>Gender-specific validation</li>
                          <li>Age-group analysis</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Practical Applications */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10"
            >
              <h2 className="text-2xl font-semibold text-white">
                Practical Applications
              </h2>
              <div className="mt-6 space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg bg-black/20 p-4">
                    <h3 className="text-lg font-semibold text-white">
                      Fitness Assessment
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300">
                      <li>General health screening</li>
                      <li>Fitness program design</li>
                      <li>Progress monitoring</li>
                      <li>Goal setting</li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-black/20 p-4">
                    <h3 className="text-lg font-semibold text-white">
                      Health Applications
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300">
                      <li>Weight management</li>
                      <li>Health risk assessment</li>
                      <li>Lifestyle modification</li>
                      <li>Nutritional planning</li>
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
                      <li>Simple to perform</li>
                      <li>Minimal equipment needed</li>
                      <li>Non-invasive measurements</li>
                      <li>Suitable for most populations</li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-black/20 p-4">
                    <h3 className="text-lg font-semibold text-white">
                      Limitations
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300">
                      <li>Moderate accuracy</li>
                      <li>Body type variations</li>
                      <li>Age-related factors</li>
                      <li>Limited athletic application</li>
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
                    Bailey, C. (1991). &ldquo;Smart Exercise: Burning Fat,
                    Getting Fit.&rdquo; Houghton Mifflin.
                  </li>
                  <li>
                    Bailey, C., & Bishop, P. (1987). &ldquo;Fit or Fat? A New
                    Way to Live.&rdquo; Houghton Mifflin.
                  </li>
                  <li>
                    Williams, M.H. (2002). &ldquo;Nutrition for Health, Fitness,
                    and Sport.&rdquo; McGraw-Hill, 6th Edition.
                  </li>
                  <li>
                    McArdle, W.D., et al. (2010). &ldquo;Exercise Physiology:
                    Nutrition, Energy, and Human Performance.&rdquo; Lippincott
                    Williams & Wilkins, 7th Edition.
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
