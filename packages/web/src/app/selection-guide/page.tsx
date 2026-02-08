'use client'

import { Container } from '@/components/Container'
import { Layout } from '@/components/Layout'
import { CirclesBackground } from '@/components/CirclesBackground'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Lock } from 'react-feather'

export default function SelectionGuide() {
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
              Method Selection Guide
            </h1>
            <p className="mt-4 text-base text-gray-400">
              Find the most suitable method based on your needs, available
              equipment, and accuracy requirements.
            </p>
          </motion.div>

          <div className="space-y-12">
            {/* For Athletes */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10"
            >
              <h2 className="text-2xl font-semibold text-white">
                For Athletes & Bodybuilders
              </h2>
              <p className="mt-4 text-gray-300">
                When maximum precision is required for competition or detailed
                progress tracking.
              </p>
              <div className="mt-6 space-y-4">
                <Link href="/methods/parrillo" className="block">
                  <div className="flex items-center justify-between rounded-lg bg-black/20 p-4 transition-colors duration-200 hover:bg-black/30">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-white">
                          Parrillo Method
                        </h3>
                        <span className="inline-flex items-center gap-1 rounded-full bg-gray-100/10 px-2 py-1 text-xs font-medium text-gray-400">
                          <Lock size={10} /> PRO
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-400">
                        9-site skinfold method used in bodybuilding contexts
                      </p>
                    </div>
                    <span className="text-[#4CAF50]">±3-4%</span>
                  </div>
                </Link>
                <Link href="/methods/jackson-pollock-7" className="block">
                  <div className="flex items-center justify-between rounded-lg bg-black/20 p-4 transition-colors duration-200 hover:bg-black/30">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-white">
                          Jackson & Pollock 7-Site
                        </h3>
                        <span className="inline-flex items-center gap-1 rounded-full bg-gray-100/10 px-2 py-1 text-xs font-medium text-gray-400">
                          <Lock size={10} /> PRO
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-400">
                        Comprehensive 7-site skinfold protocol
                      </p>
                    </div>
                    <span className="text-[#4CAF50]">±3-4%</span>
                  </div>
                </Link>
                <div className="mt-6 rounded-lg bg-black/20 p-4">
                  <h4 className="font-medium text-white">
                    Research & Validation
                  </h4>
                  <div className="mt-3 space-y-2">
                    <Link
                      href="/research/methods/parrillo"
                      className="block text-sm text-gray-400 hover:text-white"
                    >
                      • Parrillo Method Validation Studies
                    </Link>
                    <Link
                      href="/research/methods/jackson-pollock"
                      className="block text-sm text-gray-400 hover:text-white"
                    >
                      • Jackson & Pollock Research
                    </Link>
                    <Link
                      href="/research/comparison"
                      className="block text-sm text-gray-400 hover:text-white"
                    >
                      • Method Comparison Studies
                    </Link>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* For Regular Tracking */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10"
            >
              <h2 className="text-2xl font-semibold text-white">
                For Regular Progress Tracking
              </h2>
              <p className="mt-4 text-gray-300">
                When you need a good balance between accuracy and convenience.
              </p>
              <div className="mt-6 space-y-4">
                <Link href="/methods/jackson-pollock-3" className="block">
                  <div className="flex items-center justify-between rounded-lg bg-black/20 p-4 transition-colors duration-200 hover:bg-black/30">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-white">
                          Jackson & Pollock 3-Site
                        </h3>
                        <span className="inline-flex items-center gap-1 rounded-full bg-gray-100/10 px-2 py-1 text-xs font-medium text-gray-400">
                          <Lock size={10} /> PRO
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-400">
                        Quick skinfold method for regular tracking
                      </p>
                    </div>
                    <span className="text-[#FFC107]">±4-5%</span>
                  </div>
                </Link>
                <Link href="/methods/us-navy" className="block">
                  <div className="flex items-center justify-between rounded-lg bg-black/20 p-4 transition-colors duration-200 hover:bg-black/30">
                    <div>
                      <h3 className="font-medium text-white">US Navy Method</h3>
                      <p className="mt-1 text-sm text-gray-400">
                        Simple circumference measurements
                      </p>
                    </div>
                    <span className="text-[#FFC107]">±4-6%</span>
                  </div>
                </Link>
                <div className="mt-6 rounded-lg bg-black/20 p-4">
                  <h4 className="font-medium text-white">
                    Research & Validation
                  </h4>
                  <div className="mt-3 space-y-2">
                    <Link
                      href="/research/methods/jackson-pollock"
                      className="block text-sm text-gray-400 hover:text-white"
                    >
                      • Jackson & Pollock 3-Site Studies
                    </Link>
                    <Link
                      href="/research/methods/us-navy"
                      className="block text-sm text-gray-400 hover:text-white"
                    >
                      • US Navy Method Research
                    </Link>
                    <Link
                      href="/research/clinical-applications"
                      className="block text-sm text-gray-400 hover:text-white"
                    >
                      • Clinical Applications
                    </Link>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* For Quick Checks */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10"
            >
              <h2 className="text-2xl font-semibold text-white">
                For Quick Assessments
              </h2>
              <p className="mt-4 text-gray-300">
                When speed and simplicity are priorities over maximum precision.
              </p>
              <div className="mt-6 space-y-4">
                <Link href="/methods/ymca-modified" className="block">
                  <div className="flex items-center justify-between rounded-lg bg-black/20 p-4 transition-colors duration-200 hover:bg-black/30">
                    <div>
                      <h3 className="font-medium text-white">Modified YMCA</h3>
                      <p className="mt-1 text-sm text-gray-400">
                        Adds extra measurements compared to YMCA
                      </p>
                    </div>
                    <span className="text-[#FF5722]">±4-6%</span>
                  </div>
                </Link>
                <Link href="/methods/ymca" className="block">
                  <div className="flex items-center justify-between rounded-lg bg-black/20 p-4 transition-colors duration-200 hover:bg-black/30">
                    <div>
                      <h3 className="font-medium text-white">YMCA Method</h3>
                      <p className="mt-1 text-sm text-gray-400">
                        Simple basic screening method
                      </p>
                    </div>
                    <span className="text-[#FF5722]">±5-7%</span>
                  </div>
                </Link>
                <div className="mt-6 rounded-lg bg-black/20 p-4">
                  <h4 className="font-medium text-white">
                    Research & Validation
                  </h4>
                  <div className="mt-3 space-y-2">
                    <Link
                      href="/research/methods/ymca"
                      className="block text-sm text-gray-400 hover:text-white"
                    >
                      • YMCA Methods Research
                    </Link>
                    <Link
                      href="/research/comparison"
                      className="block text-sm text-gray-400 hover:text-white"
                    >
                      • Comparative Analysis
                    </Link>
                  </div>
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </Container>
    </Layout>
  )
}
