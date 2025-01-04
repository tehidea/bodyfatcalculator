'use client'

import { Container } from '@/components/Container'
import { Layout } from '@/components/Layout'
import { CirclesBackground } from '@/components/CirclesBackground'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'react-feather'

export default function USNavyMethod() {
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
              US Navy Method
            </h1>
            <p className="mt-4 text-base text-gray-400">
              A practical circumference-based method developed by the US Navy
              for field use. Requires only a tape measure and provides reliable
              body fat estimates without the need for specialized equipment.
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
                  Developed by Hodgdon and Beckett (1984) at the Naval Health
                  Research Center. Uses circumference measurements and height to
                  estimate body fat percentage. Validated against hydrostatic
                  weighing with correlation coefficients of 0.85-0.88.
                </p>
                <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                  <li>Accuracy: ±4-6% compared to hydrostatic weighing</li>
                  <li>Validated on 5,000+ military personnel</li>
                  <li>Gender-specific equations</li>
                  <li>Accounts for body shape variations</li>
                  <li>Used in military fitness assessments</li>
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
                      <h4 className="font-medium text-white">For Men:</h4>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>Height</li>
                        <li>Neck circumference</li>
                        <li>Waist circumference (at navel)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">For Women:</h4>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>Height</li>
                        <li>Neck circumference</li>
                        <li>Waist circumference (at navel)</li>
                        <li>Hip circumference (at widest point)</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="mt-6 rounded-lg bg-black/20 p-4 text-sm text-gray-300">
                  <strong>Measurement Tips:</strong>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li>Measure in the morning before eating</li>
                    <li>Stand straight with muscles relaxed</li>
                    <li>Ensure tape is snug but not compressing the skin</li>
                    <li>Take measurements twice for accuracy</li>
                    <li>Keep tape measure parallel to the floor</li>
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
                  href="/research/methods/us-navy"
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
