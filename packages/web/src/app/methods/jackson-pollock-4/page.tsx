'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Lock } from 'react-feather'
import { CirclesBackground } from '@/components/CirclesBackground'
import { Container } from '@/components/Container'
import { Layout } from '@/components/Layout'

export default function JacksonPollock4() {
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
                Jackson & Pollock 4-Site Method
              </h1>
              <span className="inline-flex items-center gap-1 rounded-full bg-gray-100/10 px-2 py-1 text-sm font-medium text-gray-400">
                <Lock size={14} /> PRO
              </span>
            </div>
            <p className="mt-4 text-base text-gray-400">
              A balanced approach between accuracy and practicality, using four skinfold sites.
              Designed to balance detail and time compared to the 7-site method.
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
              <h2 className="text-2xl font-semibold text-white">Method Overview</h2>
              <div className="mt-6">
                <p className="text-gray-300">
                  The 4-site method provides a practical compromise between the comprehensive 7-site
                  protocol and the quicker 3-site version. It balances accuracy and measurement
                  time, making it suitable for regular tracking.
                </p>
                <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                  <li>Accuracy: ±3.5-4.5% with proper technique</li>
                  <li>Gender-specific equations</li>
                  <li>Useful for tracking changes</li>
                  <li>Good balance of time and precision</li>
                </ul>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10"
            >
              <h2 className="text-2xl font-semibold text-white">Measurement Protocol</h2>
              <div className="mt-6">
                <div className="rounded-lg bg-black/20 p-4 text-gray-300">
                  <h3 className="text-lg font-semibold text-white">Measurement Sites</h3>
                  <div className="mt-4 space-y-6">
                    <div>
                      <h4 className="font-medium text-white">For Men:</h4>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>Triceps</li>
                        <li>Abdomen</li>
                        <li>Suprailiac</li>
                        <li>Thigh</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">For Women:</h4>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>Triceps</li>
                        <li>Abdomen</li>
                        <li>Suprailiac</li>
                        <li>Thigh</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="mt-6 rounded-lg bg-black/20 p-4 text-sm text-gray-300">
                  <strong>Measurement Tips:</strong>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li>Take measurements on the right side</li>
                    <li>Pinch skin and fat only, not muscle</li>
                    <li>Hold caliper perpendicular to skinfold</li>
                    <li>Wait briefly before reading the caliper</li>
                    <li>Take multiple measurements at each site</li>
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
              <h2 className="text-2xl font-semibold text-white">Research & Validation</h2>
              <div className="mt-6">
                <Link
                  href="/research/methods/jackson-pollock"
                  className="group block rounded-lg bg-black/20 p-4 transition-colors duration-200 hover:bg-black/30"
                >
                  <h3 className="text-lg font-semibold text-white">View Research Studies</h3>
                  <p className="mt-2 text-sm text-gray-400">
                    Access detailed validation studies, accuracy assessments, and comparative
                    analyses.
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
