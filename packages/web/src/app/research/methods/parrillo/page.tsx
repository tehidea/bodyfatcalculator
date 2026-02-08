'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'react-feather'
import { CirclesBackground } from '@/components/CirclesBackground'
import { Container } from '@/components/Container'
import { Layout } from '@/components/Layout'

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
              Comprehensive analysis of the Parrillo body fat assessment method, developed for
              bodybuilding contexts. Explore its nine-site approach and its use for tracking changes
              in trained individuals.
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
              <h2 className="text-2xl font-semibold text-white">Historical Development</h2>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">Method Origins</h3>
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-300">
                      Development of the Parrillo method through competitive bodybuilding
                      experience:
                    </p>
                    <ul className="list-inside list-disc space-y-2 text-gray-300">
                      <li>Developed for bodybuilding-focused assessment</li>
                      <li>Uses multiple skinfold sites for detail</li>
                      <li>Best suited to tracking trained individuals</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white">Method Evolution</h3>
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-300">Refinement through practical application:</p>
                    <div className="rounded-lg bg-black/20 p-4">
                      <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                        <li>Bodybuilding-focused origins</li>
                        <li>Adopted for tracking changes in trained athletes</li>
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
              <h2 className="text-2xl font-semibold text-white">Method Details</h2>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">Measurement Protocol</h3>
                  <div className="mt-4 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-lg bg-black/20 p-4">
                        <h4 className="font-medium text-white">Measurement Sites</h4>
                        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                          <li>Chest</li>
                          <li>Abdomen</li>
                          <li>Thigh</li>
                          <li>Bicep</li>
                          <li>Triceps</li>
                          <li>Subscapular</li>
                          <li>Suprailiac</li>
                          <li>Lower back</li>
                          <li>Calf</li>
                        </ul>
                      </div>
                      <div className="rounded-lg bg-black/20 p-4">
                        <h4 className="font-medium text-white">Special Considerations</h4>
                        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                          <li>Multiple site measurements</li>
                          <li>Consistent site location and technique</li>
                          <li>Caliper quality and calibration</li>
                          <li>Hydration status can affect readings</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white">Statistical Validation</h3>
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-300">Reported accuracy range and practical notes:</p>
                    <ul className="list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>Typical accuracy range: ±3-4%</li>
                      <li>Best for tracking changes in trained individuals</li>
                      <li>Requires consistent technique across all sites</li>
                    </ul>
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
              <h2 className="text-2xl font-semibold text-white">Athletic Applications</h2>
              <div className="mt-6 space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg bg-black/20 p-4">
                    <h3 className="text-lg font-semibold text-white">Competition Preparation</h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300">
                      <li>Peak week monitoring</li>
                      <li>Progress tracking</li>
                      <li>Diet adjustments</li>
                      <li>Conditioning assessment</li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-black/20 p-4">
                    <h3 className="text-lg font-semibold text-white">Training Applications</h3>
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
              <h2 className="text-2xl font-semibold text-white">Advantages and Limitations</h2>
              <div className="mt-6 space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg bg-black/20 p-4">
                    <h3 className="text-lg font-semibold text-white">Key Advantages</h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300">
                      <li>Comprehensive nine-site assessment</li>
                      <li>Useful for tracking changes in trained individuals</li>
                      <li>Detailed subcutaneous fat mapping</li>
                      <li>Works best with consistent technique</li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-black/20 p-4">
                    <h3 className="text-lg font-semibold text-white">Limitations</h3>
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
                    Parrillo, J., & Greenwood-Robinson, M. (1993). &ldquo;High-Performance
                    Body-Building.&rdquo; Perigee Books.
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
