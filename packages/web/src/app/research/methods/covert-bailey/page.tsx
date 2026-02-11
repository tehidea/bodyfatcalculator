'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'react-feather'
import { CirclesBackground } from '@/components/CirclesBackground'
import { Container } from '@/components/Container'
import { Layout } from '@/components/Layout'

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
              Comprehensive analysis of the Covert Bailey body fat assessment method, known for its
              practical approach to circumference-based body composition measurement. Explore its
              development and applications in general fitness assessment.
            </p>
            <p className="mt-2 text-sm text-gray-500">Content last reviewed: February 11, 2026</p>
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
                      Development of the Covert Bailey method through fitness research and practical
                      application:
                    </p>
                    <ul className="list-inside list-disc space-y-2 text-gray-300">
                      <li>Developed as a practical fitness assessment method</li>
                      <li>Focus on accessible field measurements</li>
                      <li>Designed for general fitness settings</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white">Method Evolution</h3>
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-300">Adoption in fitness settings:</p>
                    <div className="rounded-lg bg-black/20 p-4">
                      <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                        <li>Initial fitness center implementation</li>
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
              <h2 className="text-2xl font-semibold text-white">Method Details</h2>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">Measurement Protocol</h3>
                  <div className="mt-4 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-lg bg-black/20 p-4">
                        <h4 className="font-medium text-white">Primary Measurements</h4>
                        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                          <li>Age</li>
                          <li>Wrist circumference</li>
                          <li>Hip circumference</li>
                          <li>Waist circumference</li>
                          <li>Forearm circumference (men)</li>
                          <li>Thigh circumference (women)</li>
                          <li>Calf circumference (women)</li>
                        </ul>
                      </div>
                      <div className="rounded-lg bg-black/20 p-4">
                        <h4 className="font-medium text-white">Additional Factors</h4>
                        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                          <li>Age considerations</li>
                          <li>Gender-specific equations</li>
                          <li>Consistency in measurement technique</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white">Accuracy Estimates</h3>
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-300">
                      Estimated accuracy ranges (no peer-reviewed validation studies exist):
                    </p>
                    <ul className="list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>
                        Estimated accuracy range: ±4-5% (author&apos;s claim, not independently
                        verified)
                      </li>
                      <li>Age- and gender-specific equations</li>
                      <li>Requires precise measurement technique</li>
                    </ul>
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
              <h2 className="text-2xl font-semibold text-white">Practical Applications</h2>
              <div className="mt-6 space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg bg-black/20 p-4">
                    <h3 className="text-lg font-semibold text-white">Fitness Assessment</h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300">
                      <li>General health screening</li>
                      <li>Fitness program design</li>
                      <li>Progress monitoring</li>
                      <li>Goal setting</li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-black/20 p-4">
                    <h3 className="text-lg font-semibold text-white">Health Applications</h3>
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
              <h2 className="text-2xl font-semibold text-white">Advantages and Limitations</h2>
              <div className="mt-6 space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg bg-black/20 p-4">
                    <h3 className="text-lg font-semibold text-white">Key Advantages</h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300">
                      <li>Simple to perform</li>
                      <li>Minimal equipment needed</li>
                      <li>Non-invasive measurements</li>
                      <li>Suitable for most populations</li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-black/20 p-4">
                    <h3 className="text-lg font-semibold text-white">Limitations</h3>
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
                    Bailey, C. (1999). &ldquo;The Ultimate Fit or Fat: Get in Shape and Stay in
                    Shape with America&apos;s Best-Loved and Most Effective Fitness Teacher.&rdquo;
                    Houghton Mifflin Harcourt.
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
