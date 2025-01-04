'use client'

import { Container } from '@/components/Container'
import { Layout } from '@/components/Layout'
import { CirclesBackground } from '@/components/CirclesBackground'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'react-feather'

export default function ModifiedYMCAMethod() {
  return (
    <Layout>
      <Container className="relative isolate py-16 sm:py-24">
        <CirclesBackground className="absolute left-1/2 top-0 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 stroke-gray-300/30 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)]" />

        <div className="mx-auto max-w-5xl">
          {/* Navigation */}
          <div className="mb-8">
            <Link
              href="/methods"
              className="inline-flex items-center text-sm text-gray-400 hover:text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Methods
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
              Modified YMCA Method
            </h1>
            <p className="mt-4 text-base text-gray-400">
              An enhanced version of the YMCA method, incorporating additional
              measurements for improved accuracy. Designed to provide better
              results while maintaining the simplicity of circumference
              measurements.
            </p>
          </motion.div>

          {/* Content */}
          <div className="space-y-12">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10"
            >
              <h2 className="text-2xl font-semibold text-white">
                Method Overview
              </h2>
              <div className="mt-6">
                <p className="text-gray-300">
                  An enhanced version of the YMCA method, incorporating
                  additional measurements for improved accuracy, particularly
                  for women. Validated against hydrostatic weighing with
                  correlation coefficients of 0.80-0.85.
                </p>
                <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                  <li>Accuracy: ±4-6% compared to DEXA</li>
                  <li>Enhanced accuracy for women</li>
                  <li>Accounts for body frame size</li>
                  <li>Uses multiple circumference measurements</li>
                  <li>Better for diverse body types</li>
                </ul>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10"
            >
              <h2 className="text-2xl font-semibold text-white">
                Measurement Protocol
              </h2>
              <div className="mt-6">
                <div className="rounded-lg bg-black/20 p-4 text-gray-300">
                  <h3 className="text-lg font-semibold text-white">
                    Measurement Sites
                  </h3>
                  <div className="mt-4 space-y-6">
                    <div>
                      <h4 className="font-medium text-white">
                        Required Measurements:
                      </h4>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>Height</li>
                        <li>Weight</li>
                        <li>Waist circumference (at narrowest point)</li>
                        <li>Hip circumference (at widest point)</li>
                        <li>Forearm circumference (at widest point)</li>
                        <li>Wrist circumference (for frame size)</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="mt-6 rounded-lg bg-black/20 p-4 text-sm text-gray-300">
                  <strong>Measurement Tips:</strong>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li>Take all measurements in the same order each time</li>
                    <li>Ensure consistent tension on the measuring tape</li>
                    <li>Measure at the specified anatomical points</li>
                    <li>Record measurements to the nearest 0.5 cm</li>
                    <li>Take each measurement twice for accuracy</li>
                  </ul>
                </div>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10"
            >
              <h2 className="text-2xl font-semibold text-white">
                Research & Validation
              </h2>
              <div className="mt-6">
                <Link
                  href="/research/methods/ymca"
                  className="group block rounded-lg bg-black/20 p-4 transition-colors duration-200 hover:bg-black/30"
                >
                  <h3 className="text-lg font-semibold text-white">
                    View Research Studies
                  </h3>
                  <p className="mt-2 text-sm text-gray-400">
                    Access detailed validation studies, accuracy assessments,
                    and comparative analyses.
                  </p>
                </Link>
              </div>
            </motion.section>
          </div>
        </div>
      </Container>
    </Layout>
  )
}
