'use client'

import { Container } from '@/components/Container'
import { Layout } from '@/components/Layout'
import { CirclesBackground } from '@/components/CirclesBackground'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Lock } from 'react-feather'

export default function JacksonPollock7() {
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
            <div className="flex items-center gap-3">
              <h1 className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl">
                Jackson & Pollock 7-Site Method
              </h1>
              <span className="inline-flex items-center gap-1 rounded-full bg-gray-100/10 px-2 py-1 text-sm font-medium text-gray-400">
                <Lock size={14} /> PRO
              </span>
            </div>
            <p className="mt-4 text-base text-gray-400">
              A comprehensive skinfold-based method using seven measurement
              sites for a more detailed assessment. Commonly used in field
              assessments.
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
                  Developed by Jackson and Pollock, this method represents the
                  comprehensive approach to skinfold-based body fat
                  assessment. Uses seven strategic measurement sites to account
                  for various fat distribution patterns.
                </p>
                <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                  <li>Accuracy: ±3-4% with proper technique</li>
                  <li>Comprehensive skinfold method</li>
                  <li>Commonly used in field assessments</li>
                  <li>Requires consistent technique across sites</li>
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
                  <ul className="mt-4 list-inside list-disc space-y-2">
                    <li>Chest</li>
                    <li>Midaxillary (side of torso)</li>
                    <li>Triceps</li>
                    <li>Subscapular (below shoulder blade)</li>
                    <li>Abdomen</li>
                    <li>Suprailiac (above hip bone)</li>
                    <li>Thigh</li>
                  </ul>
                </div>
                <div className="mt-6 rounded-lg bg-black/20 p-4 text-sm text-gray-300">
                  <strong>Measurement Tips:</strong>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li>
                      Grasp skinfolds firmly between thumb and index finger
                    </li>
                    <li>Apply caliper perpendicular to skinfold</li>
                    <li>Take measurements on the right side of the body</li>
                    <li>Wait briefly after applying the caliper before reading</li>
                    <li>
                      Take multiple measurements at each site for accuracy
                    </li>
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
                  href="/research/methods/jackson-pollock"
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
