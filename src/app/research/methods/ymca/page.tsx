'use client'

import { Container } from '@/components/Container'
import { Layout } from '@/components/Layout'
import { CirclesBackground } from '@/components/CirclesBackground'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'react-feather'

export default function YMCAMethod() {
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
              YMCA Method
            </h1>
            <p className="mt-4 text-base text-gray-400">
              Comprehensive analysis of the YMCA body fat assessment method,
              including both original and modified protocols. Explore its
              development, validation studies, and widespread adoption in
              fitness and health assessment settings.
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
                    Original Protocol Development
                  </h3>
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-300">
                      Evolution of the YMCA method through research and
                      practical application:
                    </p>
                    <ul className="list-inside list-disc space-y-2 text-gray-300">
                      <li>Initial development in the 1980s</li>
                      <li>Focus on practical field testing</li>
                      <li>Validation against hydrostatic weighing</li>
                      <li>Implementation in YMCA facilities</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Modified Protocol Development
                  </h3>
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-300">
                      Enhancement of the original method:
                    </p>
                    <div className="rounded-lg bg-black/20 p-4">
                      <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                        <li>1990s: Gender-specific modifications</li>
                        <li>2000s: Enhanced accuracy protocols</li>
                        <li>2010s: Digital integration</li>
                        <li>2020s: Remote assessment adaptations</li>
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
                    Original YMCA Protocol
                  </h3>
                  <div className="mt-4 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-lg bg-black/20 p-4">
                        <h4 className="font-medium text-white">
                          Basic Measurements
                        </h4>
                        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                          <li>Height measurement</li>
                          <li>Weight measurement</li>
                          <li>Waist circumference</li>
                          <li>Hip circumference (women)</li>
                        </ul>
                      </div>
                      <div className="rounded-lg bg-black/20 p-4">
                        <h4 className="font-medium text-white">
                          Calculation Factors
                        </h4>
                        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                          <li>Gender-specific equations</li>
                          <li>Basic age adjustments</li>
                          <li>Height-weight ratio</li>
                          <li>Body frame considerations</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Modified YMCA Protocol
                  </h3>
                  <div className="mt-4 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-lg bg-black/20 p-4">
                        <h4 className="font-medium text-white">
                          Enhanced Measurements
                        </h4>
                        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                          <li>Additional circumference sites</li>
                          <li>Standardized measurement points</li>
                          <li>Multiple measurements per site</li>
                          <li>Precise anatomical landmarks</li>
                          <li>Quality control procedures</li>
                        </ul>
                      </div>
                      <div className="rounded-lg bg-black/20 p-4">
                        <h4 className="font-medium text-white">
                          Advanced Factors
                        </h4>
                        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                          <li>Refined gender equations</li>
                          <li>Detailed age stratification</li>
                          <li>Activity level adjustments</li>
                          <li>Body type considerations</li>
                          <li>Ethnic-specific factors</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Protocol Improvements
                  </h3>
                  <div className="mt-4 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-lg bg-black/20 p-4">
                        <h4 className="font-medium text-white">
                          Measurement Enhancements
                        </h4>
                        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                          <li>Improved measurement accuracy</li>
                          <li>Reduced inter-tester variation</li>
                          <li>Better site identification</li>
                          <li>Enhanced reproducibility</li>
                        </ul>
                      </div>
                      <div className="rounded-lg bg-black/20 p-4">
                        <h4 className="font-medium text-white">
                          Calculation Refinements
                        </h4>
                        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                          <li>Updated regression equations</li>
                          <li>Population-specific adjustments</li>
                          <li>Improved accuracy ranges</li>
                          <li>Better error correction</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Statistical Validation */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10"
            >
              <h2 className="text-2xl font-semibold text-white">
                Statistical Validation
              </h2>
              <div className="mt-6 space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg bg-black/20 p-4">
                    <h3 className="text-lg font-semibold text-white">
                      Original Method Validation
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300">
                      <li>Correlation with HW: r = 0.82</li>
                      <li>SEE: ±5-7% body fat</li>
                      <li>Test-retest reliability: r = 0.92</li>
                      <li>Population size: 1,200+</li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-black/20 p-4">
                    <h3 className="text-lg font-semibold text-white">
                      Modified Method Validation
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300">
                      <li>Correlation with HW: r = 0.88</li>
                      <li>SEE: ±4-6% body fat</li>
                      <li>Test-retest reliability: r = 0.95</li>
                      <li>Population size: 1,500+</li>
                      <li>Cross-validation studies</li>
                      <li>Multi-ethnic validation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Practical Applications */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10"
            >
              <h2 className="text-2xl font-semibold text-white">
                Practical Applications
              </h2>
              <div className="mt-6 space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg bg-black/20 p-4">
                    <h3 className="text-lg font-semibold text-white">
                      Fitness Centers
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300">
                      <li>Initial fitness assessments</li>
                      <li>Progress monitoring</li>
                      <li>Program design guidance</li>
                      <li>Client education</li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-black/20 p-4">
                    <h3 className="text-lg font-semibold text-white">
                      Health Screening
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300">
                      <li>Wellness programs</li>
                      <li>Corporate health initiatives</li>
                      <li>School fitness testing</li>
                      <li>Community health surveys</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Advantages and Limitations */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
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
                      <li>Quick assessment time</li>
                      <li>Good for large populations</li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-black/20 p-4">
                    <h3 className="text-lg font-semibold text-white">
                      Limitations
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300">
                      <li>Lower accuracy than skinfold</li>
                      <li>Affected by body shape</li>
                      <li>Limited for athletes</li>
                      <li>Gender-specific issues</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* References */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10"
            >
              <h2 className="text-2xl font-semibold text-white">References</h2>
              <div className="mt-6">
                <ul className="list-inside space-y-3 text-sm text-gray-300">
                  <li>
                    YMCA of the USA. (2000). &ldquo;YMCA Fitness Testing and
                    Assessment Manual.&rdquo; Human Kinetics, 4th Edition.
                  </li>
                  <li>
                    Golding, L.A., et al. (1989). &ldquo;Y&apos;s Way to
                    Physical Fitness: The Complete Guide to Fitness Testing and
                    Instruction.&rdquo; Human Kinetics.
                  </li>
                  <li>
                    Heyward, V.H., & Gibson, A.L. (2014). &ldquo;Advanced
                    Fitness Assessment and Exercise Prescription.&rdquo; Human
                    Kinetics, 7th Edition.
                  </li>
                  <li>
                    Thompson, W.R., et al. (2010). &ldquo;ACSM&apos;s Guidelines
                    for Exercise Testing and Prescription.&rdquo; Lippincott
                    Williams & Wilkins, 8th Edition.
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
