'use client'

import { Container } from '@/components/Container'
import { CirclesBackground } from '@/components/CirclesBackground'
import { motion } from 'framer-motion'
import { Layout } from '@/components/Layout'
import Link from 'next/link'

export default function Guides() {
  return (
    <Layout>
      <Container className="relative isolate py-16 sm:py-24">
        <CirclesBackground className="absolute left-1/2 top-0 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 stroke-gray-300/30 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)]" />

        <div className="mx-auto max-w-5xl">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl">
              Measurement Guides
            </h1>
            <p className="mt-4 text-base text-gray-400">
              Comprehensive guides for accurate body fat measurements using
              various methods and tools.
            </p>
          </motion.div>

          <div className="space-y-12">
            {/* General Guidelines */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">
                  General Guidelines
                </h2>
                <div className="mt-8 space-y-6">
                  <p className="text-gray-300">
                    Follow these general guidelines for all measurement methods:
                  </p>
                  <ul className="list-disc pl-6 text-gray-300 marker:text-[#FF0000]">
                    <li>Measure in the morning before eating or drinking</li>
                    <li>Avoid measuring immediately after exercise</li>
                    <li>Use the same measurement tools consistently</li>
                    <li>Take measurements on the right side of the body</li>
                    <li>Take multiple measurements and average the results</li>
                    <li>Record measurements immediately</li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Skinfold Measurements */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">
                  Skinfold Measurements
                </h2>
                <div className="mt-8 space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      Caliper Technique
                    </h3>
                    <ul className="mt-4 list-decimal pl-6 text-gray-300">
                      <li>
                        Grasp the skin and fat firmly between thumb and
                        forefinger
                      </li>
                      <li>Pull the fold away from the underlying muscle</li>
                      <li>
                        Place caliper jaws perpendicular to the fold,
                        slightly below your fingers
                      </li>
                      <li>Release caliper pressure and read after a brief pause</li>
                      <li>Take multiple measurements at each site</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      Measurement Sites
                    </h3>
                    <div className="mt-6 grid gap-8 sm:grid-cols-2">
                      <div>
                        <h4 className="font-medium text-white">
                          Upper Body Sites
                        </h4>
                        <ul className="mt-4 list-disc pl-6 text-gray-300 marker:text-[#FF0000]">
                          <li>
                            Triceps: Vertical fold on back of upper arm, halfway
                            between shoulder and elbow
                          </li>
                          <li>
                            Biceps: Vertical fold on front of upper arm, at peak
                            of biceps
                          </li>
                          <li>
                            Subscapular: Diagonal fold just below shoulder blade
                          </li>
                          <li>
                            Chest: Diagonal fold halfway between nipple and
                            armpit
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-white">
                          Lower Body Sites
                        </h4>
                        <ul className="mt-4 list-disc pl-6 text-gray-300 marker:text-[#FF0000]">
                          <li>Suprailiac: Diagonal fold just above hip bone</li>
                          <li>
                            Abdominal: Vertical fold near the navel
                          </li>
                          <li>
                            Thigh: Vertical fold on front of thigh, halfway
                            between hip and knee
                          </li>
                          <li>
                            Calf: Vertical fold on inside of calf at maximum
                            circumference
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Circumference Measurements */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">
                  Circumference Measurements
                </h2>
                <div className="mt-8 space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      Tape Measure Technique
                    </h3>
                    <ul className="mt-4 list-decimal pl-6 text-gray-300">
                      <li>Keep the tape measure level around the body</li>
                      <li>
                        Apply consistent tension (snug but not compressing the
                        skin)
                      </li>
                      <li>Take measurements at the end of a normal exhale</li>
                      <li>Read the tape measure at eye level</li>
                      <li>Avoid clothing when possible</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      Measurement Locations
                    </h3>
                    <ul className="mt-4 list-disc pl-6 text-gray-300 marker:text-[#FF0000]">
                      <li>
                        Neck: Around the neck at the larynx (Adam&apos;s apple),
                        keeping the tape level
                      </li>
                      <li>
                        Waist: At the narrowest point, typically just above the
                        belly button
                      </li>
                      <li>Hip: At the widest point around the buttocks</li>
                      <li>
                        Chest: At nipple level for men, at the fullest part for
                        women
                      </li>
                      <li>
                        Arms: At the midpoint between shoulder and elbow,
                        relaxed
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Common Mistakes */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">
                  Common Mistakes to Avoid
                </h2>
                <div className="mt-8">
                  <ul className="list-disc pl-6 text-gray-300 marker:text-[#FF0000]">
                    <li>Pulling the tape measure or caliper too tight</li>
                    <li>Taking measurements immediately after exercise</li>
                    <li>Measuring through thick or loose clothing</li>
                    <li>Inconsistent measurement locations between sessions</li>
                    <li>
                      Not maintaining a neutral posture during measurements
                    </li>
                    <li>Taking only single measurements instead of averages</li>
                    <li>Using different measurement tools between sessions</li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Tips for Accuracy */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">
                  Tips for Maximum Accuracy
                </h2>
                <div className="mt-8">
                  <ul className="list-disc pl-6 text-gray-300 marker:text-[#FF0000]">
                    <li>
                      Practice the measurement techniques before recording
                      results
                    </li>
                    <li>
                      Use anatomical landmarks to ensure consistent measurement
                      locations
                    </li>
                    <li>
                      Document the exact measurement locations for future
                      reference
                    </li>
                    <li>
                      Consider having measurements taken by a trained
                      professional initially
                    </li>
                    <li>
                      Keep a log of measurements with dates and conditions
                    </li>
                    <li>
                      Use high-quality measurement tools and maintain them
                      properly
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>
          </div>

          {/* Breadcrumb Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 flex justify-center"
          >
            <ol className="flex items-center space-x-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li className="text-white">Guides</li>
            </ol>
          </motion.nav>
        </div>
      </Container>
    </Layout>
  )
}
